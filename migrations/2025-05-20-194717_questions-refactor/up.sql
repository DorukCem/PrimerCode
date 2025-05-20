-- Your SQL goes here
CREATE TABLE `questions`(
	`id` INTEGER NOT NULL PRIMARY KEY,
	`slug` TEXT NOT NULL,
	`title` TEXT NOT NULL,
	`function_name` TEXT NOT NULL,
	`function_args` TEXT NOT NULL,
	`question_md` TEXT NOT NULL,
	`hint_md` TEXT NOT NULL,
	`solution_md` TEXT NOT NULL,
	`cases` TEXT NOT NULL
);

