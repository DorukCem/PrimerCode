use serde::{Deserialize, Serialize};
use ts_rs::TS;

use crate::models::QuestionSummary;

#[derive(TS, Serialize, Deserialize)]
#[ts(export)]
pub struct CodeInput {
    pub content: String,
}

#[derive(TS, Debug, Deserialize, Serialize)]
#[ts(export)]
pub struct CaseSignature {
    pub args: String,
    pub expected: String,
    pub result: String,
}

#[derive(TS, Debug, Deserialize, Serialize)]
#[ts(export)]
pub struct TestResult {
    pub is_correct: bool,
    pub case_stdout: String,
    pub error: Option<String>,
    pub case_signature: CaseSignature,
}

#[derive(TS, Debug, Deserialize, Serialize)]
#[ts(export)]
pub struct CodeSubmissionResponse {
    pub success: bool,
    pub message: String,
    pub results: Vec<TestResult>,
}

#[derive(TS, Debug, Deserialize, Serialize)]
#[ts(export)]
pub struct QuestionMDResponse {
    pub question: String,
    pub hint: String,
    pub solution: String,
}

#[derive(TS, Debug, Deserialize, Serialize)]
#[ts(export)]
pub struct QuestionList {
    pub questions: Vec<QuestionSummary>,
}

pub fn export_all_types() {
    CodeInput::export().unwrap();
    CaseSignature::export().unwrap();
    TestResult::export().unwrap();
    CodeSubmissionResponse::export().unwrap();
    QuestionMDResponse::export().unwrap();
    QuestionSummary::export().unwrap();
    QuestionList::export().unwrap();
}

// Piston API response types
#[derive(Debug, Deserialize, Serialize)]
pub struct PistonResponse {
    pub language: String,
    pub version: String,
    pub run: RunResult,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct RunResult {
    pub stdout: String,
    pub stderr: String,
    pub output: String,
    pub code: Option<i32>,
    pub signal: Option<String>,
}
