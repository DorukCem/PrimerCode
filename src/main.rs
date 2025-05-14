use std::{fs::File, io::BufReader};

use axum::{
    Json, Router,
    extract::Path,
    response::IntoResponse,
    routing::{get, post},
};
use serde::Deserialize;
use serde_json::json;
use tower_http::cors::{Any, CorsLayer};
use types::{CodeInput, CodeSubmissionResponse, PistonResponse, TestResult};

mod types;

#[tokio::main]
async fn main() {
    types::export_all_types();

    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    let router = Router::new()
        .route("/", get(root))
        .route("/boilerplate/{id}", get(get_question_boilerplate))
        .route("/submit_code/{id}", post(post_submit_code))
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

async fn get_question_boilerplate(Path(id): Path<u32>) -> String {
    let path = format!("questions/q{}/boilerplate.json", id);
    let file = File::open(path).unwrap(); // ! hard coded path
    let reader = BufReader::new(file);
    let data: FunctionBoilerPlate = serde_json::from_reader(reader).unwrap();
    // Join arguments for function signature
    let args = data.function_args.join(", ");
    // Generate the full function signature
    let signature = format!(
        "class Solution:\n    def {}({}):\n        pass",
        data.function_name, args
    );
    signature
}

#[derive(Debug, Deserialize)]
struct FunctionBoilerPlate {
    function_name: String,
    function_args: Vec<String>,
}

fn inject_code(content: String, question_id: u32) -> String {
    // Open the file
    let file = File::open(format!("questions/q{question_id}/boilerplate.json")).unwrap(); // ! hard coded path
    let reader = BufReader::new(file);
    let data: FunctionBoilerPlate = serde_json::from_reader(reader).unwrap();

    let change_name = format!("__some_function = Solution.{}", data.function_name);

    let py_runner = std::fs::read_to_string("injections/function.py").unwrap(); // ! hardcoded
    let cases = std::fs::read_to_string(format!("questions/q{question_id}/cases.py")).unwrap(); // ! hardcoded

    format!("{content}\n\n{change_name}\n\n{cases}\n\n{py_runner}")
}

async fn post_submit_code(
    Path(id): Path<u32>,
    Json(payload): Json<CodeInput>,
) -> impl IntoResponse {
    let content = payload.content;
    let language = "python";
    let version = "3.10.0";
    let piston_url = "https://emkc.org/api/v2/piston/execute"; // Piston API endpoint

    let injected_code = inject_code(content, id);
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
                                    "Execution error: {}",
                                    format_stderr(&piston_response.run.stderr)
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
        &s[idx+1..]
    } else {
        &s
    }
}
