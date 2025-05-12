use std::{collections::HashMap, fs::File, io::BufReader};

use axum::{
    Json, Router,
    extract::Path,
    http::StatusCode,
    response::{IntoResponse, Response},
    routing::{get, post},
};
use serde::Deserialize;
use serde_json::json;
use tower_http::cors::{Any, CorsLayer};
use types::{CodeInput, TestResult};

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
        "class Solution:\n    def {}({}):\n        ",
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
                let response_json: serde_json::Value = serde_json::from_str(&text).unwrap();
                if let Some(stdout_str) = response_json
                    .get("run")
                    .and_then(|run| run.get("stdout"))
                    .and_then(|stdout| stdout.as_str())
                {
                    let parsed_results: HashMap<String, TestResult> =
                        serde_json::from_str(stdout_str).unwrap();

                    let json_response = serde_json::to_string(&parsed_results).unwrap(); // ! Maybe just send json instead

                    Response::builder()
                        .status(StatusCode::OK)
                        .header("Content-Type", "application/json")
                        .body(json_response)
                        .unwrap()
                } else {
                    Response::builder()
                        .status(StatusCode::BAD_REQUEST)
                        .body("No stdout field in response".to_string())
                        .unwrap()
                }
            }
            Err(_) => Response::builder()
                .status(StatusCode::INTERNAL_SERVER_ERROR)
                .body("Failed to read response".to_string())
                .unwrap(),
        },
        Err(_) => Response::builder()
            .status(StatusCode::BAD_GATEWAY)
            .body("Failed to contact Piston API".to_string())
            .unwrap(),
    }
}
