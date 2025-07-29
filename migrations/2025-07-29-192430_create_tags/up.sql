-- Add a JSON TEXT column with a default empty array and validate it's a JSON array
ALTER TABLE questions
  ADD COLUMN tags TEXT
  NOT NULL
  DEFAULT '[]'
  CHECK (json_valid(tags) AND json_type(tags) = 'array');
