use serde::{Deserialize, Serialize};
use ts_rs::TS;

#[derive(TS, Serialize, Deserialize)]
#[ts(export)]
pub struct CodeInput {
    pub content: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct TestResult {
    pub is_correct: bool,
    pub case_stdout: String,
    pub error: Option<String>,
}


pub fn export_all_types() {
    CodeInput::export().unwrap();
}
