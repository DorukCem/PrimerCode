use diesel::prelude::*;
use serde::{Deserialize, Serialize};
use ts_rs::TS;

#[derive(Queryable, Selectable)]
#[diesel(table_name = crate::schema::questions)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct Question {
    pub id: i32,
    pub slug: String,
    pub title: String,
    pub function_name: String,
    pub function_args: String, // stored as JSON array
    pub question_md: String,
    pub hint_md: String,
    pub solution_md: String,
    pub cases: String,
}

#[derive(Queryable, Debug)]
#[derive(TS,  Deserialize, Serialize)]
#[ts(export)]
pub struct QuestionSummary {
    pub id: i32,
    pub title: String,
}

#[derive(Queryable, Debug)]
pub struct QuestionBoilerplate {
    pub function_name: String,
    pub function_args: String,
}