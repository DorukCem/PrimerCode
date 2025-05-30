-- create a new table without the test_strategy column
CREATE TABLE questions_temp (
    id INTEGER NOT NULL PRIMARY KEY,
    slug TEXT NOT NULL,
    title TEXT NOT NULL,
    function_name TEXT NOT NULL,
    function_args TEXT NOT NULL,
    question_md TEXT NOT NULL,
    hint_md TEXT NOT NULL,
    solution_md TEXT NOT NULL,
    cases TEXT NOT NULL
);

-- copy data from old table
INSERT INTO questions_temp (id, slug, title, function_name, function_args, question_md, hint_md, solution_md, cases)
SELECT id, slug, title, function_name, function_args, question_md, hint_md, solution_md, cases
FROM questions;

-- drop the old table
DROP TABLE questions;

-- rename the new table
ALTER TABLE questions_temp RENAME TO questions;

-- recreate the unique index
CREATE UNIQUE INDEX idx_questions_slug ON questions(slug);
