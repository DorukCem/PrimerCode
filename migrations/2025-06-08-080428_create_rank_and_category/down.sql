-- This file should undo anything in `up.sql`
ALTER TABLE questions DROP COLUMN rank;
ALTER TABLE questions DROP COLUMN category;