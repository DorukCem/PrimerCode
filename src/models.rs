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
    pub test_strategy: Option<String>,
    pub rank: Option<i32>,
    pub category: Option<String>,
}

#[derive(Queryable, Debug)]
#[derive(TS,  Deserialize, Serialize)]
#[ts(export)]
pub struct QuestionSummary {
    pub id: i32,
    pub title: String,
    pub slug: String,
}

#[derive(Queryable, Debug)]
pub struct QuestionBoilerplate {
    pub function_name: String,
    pub function_args: String,
}

#[derive(Queryable, Selectable)]
#[diesel(table_name = crate::schema::users)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct User{
    pub id: String,
    pub user_name: String,
    pub email: String,
}

#[derive(Queryable, Selectable, Identifiable, Associations, Debug, PartialEq)]
#[diesel(primary_key(user_id, question_id))]
#[diesel(belongs_to(User))]
#[diesel(belongs_to(Question))]
#[diesel(table_name = crate::schema::user_solved_questions)]
pub struct UserSolvedQuestions{
    pub user_id : String,
    pub question_id : i32,
}


#[derive(Insertable)]
#[diesel(table_name = crate::schema::users)]
pub struct NewUser<'a> {
    pub id: &'a str,
    pub user_name: &'a str,
    pub email: &'a str,
}


#[derive(Insertable)]
#[diesel(table_name = crate::schema::user_solved_questions)]
pub struct NewSolved<'a> {
    pub user_id : &'a str,
    pub question_id : i32,
}