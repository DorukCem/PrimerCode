use anyhow::Context;
use axum::{
    Json, Router,
    extract::{Path, State},
    response::{IntoResponse, Response},
    routing::{get, post},
};
use db::DbPool;
use diesel::{dsl::insert_or_ignore_into, prelude::*};
use dotenvy::dotenv;
use http::Method;
use models::{Question, QuestionSummary};
use reqwest::{StatusCode, header};
use serde_json::json;
use std::env;
use tower_http::cors::CorsLayer;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};
use types::{
    CodeInput, CodeSubmissionResponse, PistonResponse, QuestionList, QuestionMDResponse, TestResult,
};

use crate::{
    auth::{AppState, AuthUser, create_redis_store, oauth_client},
    models::NewSolved,
    types::{QuestionIds, QuestionOverview},
};

mod auth;
mod db;
pub mod models;
pub mod schema;
mod types;


// TODO fix app name / remove wilderness from everywhere
// TODO Stop exposing backend port publicly
// TODO CORS (maybe supposed to be handled by nginx)
// TODO public keys?? 
// TODO add stat solving question now to about page
// * Not urgent
// TODO mobile view

pub fn establish_connection() -> SqliteConnection {
    dotenv().ok();

    let database_url = dotenvy::var("DATABASE_URL").expect("DATABASE_URL must be set");
    SqliteConnection::establish(&database_url)
        .unwrap_or_else(|_| panic!("Error connecting to {}", database_url))
}

pub fn get_question_summaries(conn: &mut SqliteConnection) -> QueryResult<Vec<QuestionSummary>> {
    use crate::schema::questions::dsl::*;
    questions
        .select((id, title, slug, tags))
        .order_by(rank.asc())
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

    let store = create_redis_store().expect("Expected to connect to redis");
    let oauth_client = oauth_client().expect("Expected to create successfully oauth client");
    let app_state = AppState {
        store,
        oauth_client,
        pool: pool.clone(),
    };

    let cors = CorsLayer::new()
        // .allow_origin([
        //     dotenvy::var("FRONTEND_ORIGIN")
        //         .expect("Expected to find FRONTEND_ORIGIN in env")
        //         .parse::<HeaderValue>()
        //         .expect("Expected to parse origin"),
        //     dotenvy::var("LAN_IP")
        //         .expect("Expected to find LAN_IP in env")
        //         .parse::<HeaderValue>()
        //         .expect("Expected to parse origin"),
        // ])
        .allow_methods([Method::GET, Method::POST, Method::OPTIONS])
        .allow_headers([header::CONTENT_TYPE, header::AUTHORIZATION, header::COOKIE])
        .allow_credentials(true); // This is crucial for cookies to work

    let router = Router::new()
        .route("/", get(auth::index))
        .route("/all-questions", get(get_all_questions))
        .route("/user-questions", get(get_all_user_questions))
        .route("/boilerplate/{slug}", get(get_question_boilerplate))
        .route("/question/{slug}", get(get_question_md))
        .route("/submit_code/{slug}", post(post_submit_code))
        .route("/auth/google", get(auth::google_auth))
        .route("/auth/authorized", get(auth::login_authorized))
        .route("/protected", get(auth::protected))
        .route("/logout", get(auth::logout))
        .route("/auth/me", get(auth::get_current_user))
        .route("/auth/status", get(auth::auth_status))
        .route("/sync-questions", post(sync_solved_questions))
        .with_state(app_state)
        .layer(cors);

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000")
        .await
        .expect("Expected to create tcp server");
    println!(
        "listening on http://0.0.0.0:{}",
        listener
            .local_addr()
            .expect("Expected to get local address")
            .port()
    );

    axum::serve::serve(listener, router)
        .await
        .expect("Expected to start axum server");
}

async fn get_all_questions(State(pool): State<DbPool>) -> impl IntoResponse {
    let conn = &mut pool.get().expect("Couldn't get db connection from pool");

    match get_question_summaries(conn) {
        Ok(summaries) => {
            let questions = summaries
                .into_iter()
                .map(|s| QuestionOverview {
                    id: s.id,
                    slug: s.slug,
                    title: s.title,
                    tags: serde_json::from_str::<Vec<String>>(&s.tags)
                        .expect("Should never be invalid JSON"),
                })
                .collect();
            Json(QuestionList { questions }).into_response()
        }
        Err(err) => (
            axum::http::StatusCode::INTERNAL_SERVER_ERROR,
            format!("Error: {:?}", err),
        )
            .into_response(),
    }
}

async fn sync_solved_questions(
    user: AuthUser,
    State(pool): State<DbPool>,
    Json(payload): Json<QuestionIds>,
) -> Result<impl IntoResponse, AppError> {
    for x in payload.ids.into_iter() {
        insert_solved_question_to_db(x, &user, &pool)?;
    }
    Ok(Json(json!({ "status": "success" })))
}

async fn get_all_user_questions(
    State(pool): State<DbPool>,
    user: Option<AuthUser>,
) -> Result<impl IntoResponse, AppError> {
    match user {
        Some(user) => {
            let conn = &mut pool.get().expect("Couldn't get db connection from pool");
            use crate::schema::user_solved_questions::dsl::*;

            let solved = user_solved_questions
                .filter(user_id.eq(user.id))
                .select(question_id)
                .load::<i32>(conn)?;

            Ok(Json(QuestionIds { ids: solved }))
        }
        None => Ok(Json(QuestionIds { ids: Vec::new() })),
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
    db_pool: &DbPool,
) -> Result<Question, diesel::result::Error> {
    let conn = &mut db_pool.get().expect("Failed to get DB connection");
    use crate::schema::questions::dsl::*;
    questions.filter(slug.eq(slug_name)).first(conn)
}

async fn get_question_boilerplate(
    State(pool): State<DbPool>,
    Path(slug): Path<String>,
) -> impl IntoResponse {
    let question = get_single_question(&slug, &pool);

    match question {
        Ok(question) => {
            let name = question.function_name;
            let args: Vec<String> =
                serde_json::from_str(&question.function_args).unwrap_or_default();
            let args_joined = args.join(", ");
            let signature = format!("def {}({}):\n    pass", name, args_joined);
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
    let question = get_single_question(&slug, &pool);

    match question {
        Ok(q) => {
            let response = QuestionMDResponse {
                question: q.question_md,
                hint: q.hint_md,
                solution: q.solution_md,
                id: q.id,
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
    let imports = std::fs::read_to_string("injections/imports.py")
        .expect("Expected to find injections folder");
    let change_name = format!("__some_function = {}", question.function_name);
    let cases = question.cases;

    let strategy = match question.test_strategy.as_ref().map(String::as_ref) {
        Some("func_output") => "func_output",
        Some(x) => panic!("Unexpected data in database: test_strategy= {x}"),
        None => "standard",
    };
    let py_runner = std::fs::read_to_string(format!("injections/{strategy}.py"))
        .expect("Expected to find injections folder");

    format!("{imports}\n\n{content}\n\n{change_name}\n\n{cases}\n\n{py_runner}")
}

async fn post_submit_code(
    user: Option<AuthUser>,
    State(pool): State<DbPool>,
    Path(slug): Path<String>,
    Json(payload): Json<CodeInput>,
) -> impl IntoResponse {
    let content = payload.content;
    let language = "python";
    let version = "3.10.0";
    // let piston_url = "https://emkc.org/api/v2/piston/execute";
    let piston_url = "http://piston_api:2000/api/v2/execute"; // Piston API endpoint

    let question = get_single_question(&slug, &pool).expect("Expected to find question");
    let question_id = question.id;
    let injected_code = inject_code(content, question);
    // std::fs::write("test.py", &injected_code).unwrap(); // debug the created python file

    // Construct the payload for piston
    let piston_payload = json!({
        "language": language,
        "version": version,
        "run_timeout": 5000,
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
                                    "Execution error: {} \nsignal: {:?} \nstdout: {}",
                                    format_stderr(&piston_response.run.stderr),
                                    piston_response.run.signal,
                                    piston_response.run.stdout
                                ),
                                results: Vec::new(),
                                synced: false,
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
                                    synced: false,
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

                                let mut sync = false;
                                if all_passed {
                                    if let Some(user) = user {
                                        match insert_solved_question_to_db(
                                            question_id,
                                            &user,
                                            &pool,
                                        ) {
                                            Ok(_) => (),
                                            Err(e) => eprintln!("{e:?}"),
                                        }
                                        sync = true
                                    }
                                }

                                let message = if all_passed {
                                    "All tests have passed".to_string()
                                } else {
                                    "Some tests failed".to_string()
                                };

                                let submission_response = CodeSubmissionResponse {
                                    question_id,
                                    success: all_passed,
                                    results: parsed_results,
                                    message,
                                    synced: sync,
                                };

                                Json(submission_response).into_response()
                            }
                            Err(e) => Json(CodeSubmissionResponse {
                                question_id,
                                success: false,
                                message: format!("Failed to parse test results: {}", e),
                                results: Vec::new(),
                                synced: false,
                            })
                            .into_response(),
                        }
                    }
                    Err(e) => Json(CodeSubmissionResponse {
                        question_id,
                        success: false,
                        message: format!("Failed to parse Piston API response: {}", e),
                        results: Vec::new(),
                        synced: false,
                    })
                    .into_response(),
                }
            }
            Err(e) => Json(CodeSubmissionResponse {
                question_id,
                success: false,
                message: format!("Failed to read response: {}", e),
                results: Vec::new(),
                synced: false,
            })
            .into_response(),
        },
        Err(e) => Json(CodeSubmissionResponse {
            question_id,
            success: false,
            message: format!("Failed to contact Piston API: {}", e),
            results: Vec::new(),
            synced: false,
        })
        .into_response(),
    }
}

fn insert_solved_question_to_db(
    q_id: i32,
    user: &AuthUser,
    pool: &diesel::r2d2::Pool<diesel::r2d2::ConnectionManager<SqliteConnection>>,
) -> Result<impl IntoResponse, AppError> {
    use crate::schema::user_solved_questions::dsl::*;
    let mut conn = pool.get().context("failed to get DB connection")?;

    let solved_q = NewSolved {
        user_id: &user.id,
        question_id: q_id,
    };

    insert_or_ignore_into(user_solved_questions)
        .values(solved_q)
        .execute(&mut conn)
        .context("failed to insert solved question for user")?;

    Ok(())
}

/// This skips the "File: piston/jobs/main.py, ..." part
fn format_stderr(s: &str) -> &str {
    if let Some(idx) = s.find(",") {
        &s[idx + 1..]
    } else {
        &s
    }
}

// Use anyhow, define error and enable '?'
// For a simplified example of using anyhow in axum check /examples/anyhow-error-response
#[derive(Debug)]
pub struct AppError(anyhow::Error);

// Tell axum how to convert `AppError` into a response.
impl IntoResponse for AppError {
    fn into_response(self) -> Response {
        tracing::error!("Application error: {:#}", self.0);

        (StatusCode::INTERNAL_SERVER_ERROR, "Something went wrong").into_response()
    }
}

// This enables using `?` on functions that return `Result<_, anyhow::Error>` to turn them into
// `Result<_, AppError>`. That way you don't need to do that manually.
impl<E> From<E> for AppError
where
    E: Into<anyhow::Error>,
{
    fn from(err: E) -> Self {
        Self(err.into())
    }
}
