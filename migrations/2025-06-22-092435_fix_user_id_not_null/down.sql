-- This file should undo anything in `up.sql`
ALTER TABLE users RENAME TO users_new;

CREATE TABLE users (
    id TEXT PRIMARY KEY,
    user_name TEXT NOT NULL,
    email TEXT NOT NULL
);

INSERT INTO users (id, user_name, email)
SELECT id, user_name, email FROM users_new;

DROP TABLE users_new;
