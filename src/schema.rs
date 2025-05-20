// @generated automatically by Diesel CLI.

diesel::table! {
    questions (id) {
        id -> Integer,
        slug -> Text,
        title -> Text,
        function_name -> Text,
        function_args -> Text,
        question_md -> Text,
        hint_md -> Text,
        solution_md -> Text,
        cases -> Text,
    }
}
