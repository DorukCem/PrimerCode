use axum::{http::StatusCode, response::IntoResponse, routing::get, Json, Router};
use tower_http::cors::{Any, CorsLayer};
use types::Person;

mod types;

#[tokio::main]
async fn main() {
    types::export_all_types();

    let cors = CorsLayer::new().allow_origin(Any); // should be more restrictive in production

    let router = Router::new()
        .route("/", get(root))
        .route("/people", get(get_people))
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

async fn get_people() -> impl IntoResponse {
    let people = vec![
        Person {
            name: String::from("Person A"),
            age: 36,
            favourite_food: Some(String::from("Pizza")),
        },
        Person {
            name: String::from("Person B"),
            age: 5,
            favourite_food: Some(String::from("Broccoli")),
        },
        Person {
            name: String::from("Person C"),
            age: 100,
            favourite_food: None,
        },
    ];

    (StatusCode::OK, Json(people))
}
