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
        test_strategy -> Nullable<Text>,
        rank -> Nullable<Integer>,
        category -> Nullable<Text>,
    }
}

diesel::table! {
    user_solved_questions (user_id, question_id) {
        user_id -> Text,
        question_id -> Integer,
    }
}

diesel::table! {
    users (id) {
        id -> Text,
        user_name -> Text,
        email -> Text,
    }
}

diesel::joinable!(user_solved_questions -> questions (question_id));

diesel::allow_tables_to_appear_in_same_query!(
    questions,
    user_solved_questions,
    users,
);
