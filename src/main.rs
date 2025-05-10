use axum::{
    Json, Router,
    http::StatusCode,
    response::{IntoResponse, Response},
    routing::{get, post},
};
use serde_json::json;
use tower_http::cors::{Any, CorsLayer};
use types::CodeInput;

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
        .route("/submit_code", post(post_submit_code))
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

async fn post_submit_code(Json(payload): Json<CodeInput>) -> impl IntoResponse {
    let content = payload.content;
    let language = "python";
    let version = "3.10.0";
    let piston_url = "https://emkc.org/api/v2/piston/execute"; // Piston API endpoint

    // Construct the payload for piston
    let piston_payload = json!({
        "language": language,
        "version": version,
        "files": [
            {
                "name": "main",
                "content": content
            }
        ]
    });

    let client = reqwest::Client::new();

    match client.post(piston_url).json(&piston_payload).send().await {
        Ok(response) => match response.text().await {
            Ok(text) => Response::builder()
                .status(StatusCode::OK)
                .header("Content-Type", "text/plain")
                .body(text)
                .unwrap(),
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
