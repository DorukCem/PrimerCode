use async_session::MemoryStore;
use axum::{
    Json, Router,
    extract::{Path, State},
    response::IntoResponse,
    routing::{get, post},
};
use db::DbPool;
use diesel::prelude::*;
use dotenvy::dotenv;
use http::{HeaderValue, Method};
use models::{Question, QuestionSummary};
use reqwest::{StatusCode, header};
use serde_json::json;
use std::env;
use tower_http::cors::{Any, CorsLayer};
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};
use types::{
    CodeInput, CodeSubmissionResponse, PistonResponse, QuestionList, QuestionMDResponse, TestResult,
};

use crate::auth::{AppState, User, oauth_client};

mod auth;
mod db;
pub mod models;
pub mod schema;
mod types;

// TODO add Authentication and User to DB
// TODO add persistent login with localstorage
// TODO check for timeouts
// TODO home page
// TODO navbar
// TODO Production Setup: In production, you'll want to use proper domain names and ensure cookies are properly configured with the Secure flag for HTTPS

pub fn establish_connection() -> SqliteConnection {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    SqliteConnection::establish(&database_url)
        .unwrap_or_else(|_| panic!("Error connecting to {}", database_url))
}

pub fn get_question_summaries(conn: &mut SqliteConnection) -> QueryResult<Vec<QuestionSummary>> {
    use crate::schema::questions::dsl::*;
    questions
        .select((id, title, slug))
        .load::<QuestionSummary>(conn)
}

#[tokio::main]
async fn main() {
    dotenvy::dotenv().ok();
    types::export_all_types();

    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| format!("{}=debug", env!("CARGO_CRATE_NAME")).into()),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();

    let pool: diesel::r2d2::Pool<diesel::r2d2::ConnectionManager<SqliteConnection>> =
        db::establish_pool();

    let store = MemoryStore::new();
    let oauth_client = oauth_client().unwrap();
    let app_state = AppState {
        store,
        oauth_client,
        pool: pool.clone(),
    };

    let cors = CorsLayer::new()
        .allow_origin("http://127.0.0.1:5173".parse::<HeaderValue>().unwrap())
        .allow_methods([Method::GET, Method::POST, Method::OPTIONS])
        .allow_headers([header::CONTENT_TYPE, header::AUTHORIZATION, header::COOKIE])
        .allow_credentials(true); // This is crucial for cookies to work

    let router = Router::new()
        .route("/", get(auth::index))
        .route("/all-questions", get(get_all_questions))
        .route("/boilerplate/{slug}", get(get_question_boilerplate))
        .route("/question/{slug}", get(get_question_md))
        .route("/submit_code/{slug}", post(post_submit_code))
        .route("/auth/google", get(auth::google_auth))
        .route("/auth/authorized", get(auth::login_authorized))
        .route("/protected", get(auth::protected))
        .route("/logout", get(auth::logout))
        .route("/auth/me", get(auth::get_current_user))
        .route("/auth/status", get(auth::auth_status))
        .with_state(app_state)
        .layer(cors);

    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000")
        .await
        .unwrap();
    println!(
        "listening on http://127.0.0.1:{}",
        listener.local_addr().unwrap().port()
    );

    axum::serve::serve(listener, router).await.unwrap();
}

async fn get_all_questions(State(pool): State<DbPool>, user: Option<User>) -> impl IntoResponse {
    let conn = &mut pool.get().expect("Couldn't get db connection from pool");

    println!("{user:?}");

    match get_question_summaries(conn) {
        Ok(summaries) => Json(QuestionList {
            questions: summaries,
        })
        .into_response(),
        Err(err) => (
            axum::http::StatusCode::INTERNAL_SERVER_ERROR,
            format!("Error: {:?}", err),
        )
            .into_response(),
    }
}
#[must_use]
#[allow(dead_code)]
fn get_single_question_by_pk(
    question_id: i32,
    db_pool: DbPool,
) -> Result<Question, diesel::result::Error> {
    let conn = &mut db_pool.get().expect("Failed to get DB connection");
    use crate::schema::questions::dsl::*;
    questions
        .find(question_id)
        .select(Question::as_select())
        .first(conn)
}

fn get_single_question(
    slug_name: &str,
    db_pool: DbPool,
) -> Result<Question, diesel::result::Error> {
    let conn = &mut db_pool.get().expect("Failed to get DB connection");
    use crate::schema::questions::dsl::*;
    questions.filter(slug.eq(slug_name)).first(conn)
}

async fn get_question_boilerplate(
    State(pool): State<DbPool>,
    Path(slug): Path<String>,
) -> impl IntoResponse {
    let question = get_single_question(&slug, pool);

    match question {
        Ok(question) => {
            let name = question.function_name;
            let args: Vec<String> =
                serde_json::from_str(&question.function_args).unwrap_or_default();
            let args_joined = args.join(", ");
            let signature = format!(
                "class Solution:\n    def {}({}):\n        pass",
                name, args_joined
            );
            signature.into_response()
        }
        Err(e) => {
            eprintln!("{e}");
            (
                StatusCode::NOT_FOUND,
                format!("No question with slug {slug} found. {e}"),
            )
                .into_response()
        }
    }
}

async fn get_question_md(
    State(pool): State<DbPool>,
    Path(slug): Path<String>,
) -> impl IntoResponse {
    let question = get_single_question(&slug, pool);

    match question {
        Ok(q) => {
            let response = QuestionMDResponse {
                question: q.question_md,
                hint: q.hint_md,
                solution: q.solution_md,
            };
            ([(header::CONTENT_TYPE, "application/json")], Json(response)).into_response()
        }
        Err(e) => {
            eprintln!("{e}");
            (
                StatusCode::NOT_FOUND,
                format!("No question with slug {slug} found. {e}"),
            )
                .into_response()
        }
    }
}

fn inject_code(content: String, question: Question) -> String {
    let imports = std::fs::read_to_string("injections/imports.py").unwrap();
    let change_name = format!("__some_function = Solution.{}", question.function_name);
    let cases = question.cases;

    let strategy = match question.test_strategy.as_ref().map(String::as_ref) {
        Some("func_output") => "func_output",
        Some(x) => panic!("Unexpected data in database: test_strategy= {x}"),
        None => "standard",
    };
    let py_runner = std::fs::read_to_string(format!("injections/{strategy}.py")).unwrap(); // ! hardcoded

    format!("{imports}\n\n{content}\n\n{change_name}\n\n{cases}\n\n{py_runner}")
}

async fn post_submit_code(
    user: Option<User>,
    State(pool): State<DbPool>,
    Path(slug): Path<String>,
    Json(payload): Json<CodeInput>,
) -> impl IntoResponse {
    let content = payload.content;
    let language = "python";
    let version = "3.10.0";
    // let piston_url = "https://emkc.org/api/v2/piston/execute";
    let piston_url = "http://localhost:2000/api/v2/execute"; // Piston API endpoint

    let question = get_single_question(&slug, pool).expect("Expected to find question");
    let question_id = question.id;
    let injected_code = inject_code(content, question);
    // std::fs::write("test.py", &injected_code).unwrap(); // debug the created python file

    println!("{user:?}");

    // Construct the payload for piston
    let piston_payload = json!({
        "language": language,
        "version": version,
        "files": [
            {
                "name": "main",
                "content": injected_code
            }
        ]
    });

    let client = reqwest::Client::new();

    match client.post(piston_url).json(&piston_payload).send().await {
        Ok(response) => match response.text().await {
            Ok(text) => {
                match serde_json::from_str::<PistonResponse>(&text) {
                    Ok(piston_response) => {
                        if !piston_response.run.stderr.is_empty() {
                            // User has entered something that cannot be parsed by python
                            return Json(CodeSubmissionResponse {
                                question_id,
                                success: false,
                                message: format!(
                                    "Execution error: {}, signal: {:?}, stdout: {}",
                                    format_stderr(&piston_response.run.stderr),
                                    piston_response.run.signal,
                                    piston_response.run.stdout
                                ),
                                results: Vec::new(),
                            })
                            .into_response();
                        }

                        if let Some(signal) = piston_response.run.signal {
                            if signal == "SIGKILL" {
                                return Json(CodeSubmissionResponse {
                                    question_id,
                                    success: false,
                                    message: "Code timed out".to_string(),
                                    results: Vec::new(),
                                })
                                .into_response();
                            }
                        }

                        // Parse the stdout to get our test results
                        match serde_json::from_str::<Vec<TestResult>>(&piston_response.run.stdout) {
                            Ok(parsed_results) => {
                                // Check if all tests passed
                                let all_passed =
                                    parsed_results.iter().all(|result| result.is_correct);

                                let message = if all_passed {
                                    "Code executed successfully".to_string()
                                } else {
                                    "Some tests failed".to_string()
                                };

                                let submission_response = CodeSubmissionResponse {
                                    question_id,
                                    success: all_passed,
                                    results: parsed_results,
                                    message,
                                };

                                Json(submission_response).into_response()
                            }
                            Err(e) => Json(CodeSubmissionResponse {
                                question_id,
                                success: false,
                                message: format!("Failed to parse test results: {}", e),
                                results: Vec::new(),
                            })
                            .into_response(),
                        }
                    }
                    Err(e) => Json(CodeSubmissionResponse {
                        question_id,
                        success: false,
                        message: format!("Failed to parse Piston API response: {}", e),
                        results: Vec::new(),
                    })
                    .into_response(),
                }
            }
            Err(e) => Json(CodeSubmissionResponse {
                question_id,
                success: false,
                message: format!("Failed to read response: {}", e),
                results: Vec::new(),
            })
            .into_response(),
        },
        Err(e) => Json(CodeSubmissionResponse {
            question_id,
            success: false,
            message: format!("Failed to contact Piston API: {}", e),
            results: Vec::new(),
        })
        .into_response(),
    }
}

/// This skips the "File: piston/jobs/main.py, ..." part
fn format_stderr(s: &str) -> &str {
    if let Some(idx) = s.find(",") {
        &s[idx + 1..]
    } else {
        &s
    }
}
