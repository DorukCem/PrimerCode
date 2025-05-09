use serde::{Deserialize, Serialize};
use ts_rs::TS;

#[derive(TS, Serialize, Deserialize)]
#[ts(export)]
pub struct Person {
    pub name: String,
    pub age: u32,
    pub favourite_food: Option<String>,
}

pub fn export_all_types(){
    Person::export().unwrap();
}