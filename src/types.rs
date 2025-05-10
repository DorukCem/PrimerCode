use serde::{Deserialize, Serialize};
use ts_rs::TS;

#[derive(TS, Serialize, Deserialize)]
#[ts(export)]
pub struct CodeInput {
    pub content: String,
}

pub fn export_all_types() {
    CodeInput::export().unwrap();
}
