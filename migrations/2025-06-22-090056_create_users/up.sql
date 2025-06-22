-- Your SQL goes here
CREATE TABLE users ( 
    id TEXT PRIMARY KEY,
    user_name TEXT NOT NULL,
    email TEXT NOT NULL
);


CREATE TABLE user_solved_questions (
    user_id TEXT NOT NULL,
    question_id INTEGER NOT NULL,
    PRIMARY KEY (user_id, question_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (question_id) REFERENCES questions(id)
);