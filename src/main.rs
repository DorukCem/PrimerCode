
use axum::{
    Json, Router,
    extract::{Path, State},
    response::IntoResponse,
    routing::{get, post},
};
use db::DbPool;
use diesel::prelude::*;
use dotenvy::dotenv;
use models::{Question, QuestionSummary};
use reqwest::{StatusCode, header};
use serde_json::json;
use std::env;
use tower_http::cors::{Any, CorsLayer};
use types::{
    CodeInput, CodeSubmissionResponse, PistonResponse, QuestionList, QuestionMDResponse, TestResult,
};

mod db;
pub mod models;
pub mod schema;
mod types;

pub fn establish_connection() -> SqliteConnection {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    SqliteConnection::establish(&database_url)
        .unwrap_or_else(|_| panic!("Error connecting to {}", database_url))
}

pub fn get_question_summaries(conn: &mut SqliteConnection) -> QueryResult<Vec<QuestionSummary>> {
    use crate::schema::questions::dsl::*;
    questions.select((id, title)).load::<QuestionSummary>(conn)
}

#[tokio::main]
async fn main() {
    dotenvy::dotenv().ok();
    let pool = db::establish_pool();

    types::export_all_types();

    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    let router = Router::new()
        .route("/", get(root))
        .route("/all-questions", get(get_all_questions))
        .route("/boilerplate/{id}", get(get_question_boilerplate))
        .route("/question/{id}", get(get_question_md))
        .route("/submit_code/{id}", post(post_submit_code))
        .with_state(pool.clone()) // Share pool via state
        .layer(cors);

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    println!(
        "listening on http://localhost:{}",
        listener.local_addr().unwrap().port()
    );
    axum::serve::serve(listener, router).await.unwrap();
}

async fn root() -> &'static str {
    "Hello, World!"
}

async fn get_all_questions(State(pool): State<DbPool>) -> impl IntoResponse {
    let conn = &mut pool.get().expect("Couldn't get db connection from pool");

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
fn get_single_question(question_id: i32, db_pool: DbPool) -> Result<Question, diesel::result::Error> {
    let conn = &mut db_pool.get().expect("Failed to get DB connection");
    use crate::schema::questions::dsl::*;
    questions.find(question_id).select(Question::as_select()).first(conn)
}

async fn get_question_boilerplate(
    State(pool): State<DbPool>,
    Path(id): Path<i32>,
) -> impl IntoResponse {
    let question = get_single_question(id, pool);

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
                format!("No question with id {id} found. {e}"),
            )
                .into_response()
        }
    }
}

async fn get_question_md(State(pool): State<DbPool>, Path(id): Path<i32>) -> impl IntoResponse {
    let question = get_single_question(id, pool);

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
                format!("No question with id {id} found. {e}"),
            )
                .into_response()
        }
    }
}


fn inject_code(question_id: i32, content: String, db_pool: DbPool) -> String {
    let question= get_single_question(question_id, db_pool).expect("Expected to find question");
    
    let imports= std::fs::read_to_string("injections/imports.py").unwrap();
    let change_name = format!("__some_function = Solution.{}", question.function_name);
    let cases = question.cases;

    let strategy = match question.test_strategy.as_ref().map(String::as_ref)  {
        Some("func_output") => "func_output",
        Some(x) => panic!("Unexpected data in database: test_strategy= {x}"),
        None => "standard",
    };
    let py_runner = std::fs::read_to_string(format!("injections/{strategy}.py")).unwrap(); // ! hardcoded

    format!("{imports}\n\n{content}\n\n{change_name}\n\n{cases}\n\n{py_runner}")
}

async fn post_submit_code(State(pool): State<DbPool>,
    Path(id): Path<i32>,
    Json(payload): Json<CodeInput>,
) -> impl IntoResponse {
    let content = payload.content;
    let language = "python";
    let version = "3.10.0";
    // let piston_url = "https://emkc.org/api/v2/piston/execute";
    let piston_url = "http://localhost:2000/api/v2/execute"; // Piston API endpoint

    let injected_code = inject_code(id, content, pool);
    // std::fs::write("test.py", &injected_code).unwrap(); // debug the created python file    

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
                                success: false,
                                message: format!(
                                    "Execution error: {}, signal: {:?}, stdout: {}",
                                    format_stderr(&piston_response.run.stderr), piston_response.run.signal, piston_response.run.stdout
                                ),
                                results: Vec::new(),
                            })
                            .into_response();
                        }

                        if let Some(signal) = piston_response.run.signal {
                            if signal == "SIGKILL" {
                                return Json(CodeSubmissionResponse {
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
                                    success: all_passed,
                                    results: parsed_results,
                                    message,
                                };

                                Json(submission_response).into_response()
                            }
                            Err(e) => Json(CodeSubmissionResponse {
                                success: false,
                                message: format!("Failed to parse test results: {}", e),
                                results: Vec::new(),
                            })
                            .into_response(),
                        }
                    }
                    Err(e) => Json(CodeSubmissionResponse {
                        success: false,
                        message: format!("Failed to parse Piston API response: {}", e),
                        results: Vec::new(),
                    })
                    .into_response(),
                }
            }
            Err(e) => Json(CodeSubmissionResponse {
                success: false,
                message: format!("Failed to read response: {}", e),
                results: Vec::new(),
            })
            .into_response(),
        },
        Err(e) => Json(CodeSubmissionResponse {
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
