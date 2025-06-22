-- Your SQL goes here
-- Rename old table
ALTER TABLE users RENAME TO users_old;

-- Recreate table with NOT NULL constraint on id
CREATE TABLE users (
    id TEXT NOT NULL PRIMARY KEY,
    user_name TEXT NOT NULL,
    email TEXT NOT NULL
);

-- Copy data
INSERT INTO users (id, user_name, email)
SELECT id, user_name, email FROM users_old;

-- Drop old table
DROP TABLE users_old;
