import sqlite3
import os
import json
from pathlib import Path

# TODO turn this into a tool for creating db entries

DB_PATH = "database.db"  # Change this if needed
QUESTIONS_DIR = Path("questions")

conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()

def load_cases(py_file_path):
    namespace = {}
    with open(py_file_path) as f:
        exec(f.read(), {}, namespace)
    return namespace['cases']

for question_folder in QUESTIONS_DIR.iterdir():
    if not question_folder.is_dir():
        continue

    slug = question_folder.name
    title = slug.replace('-', ' ').title()

    with open(question_folder / "boilerplate.json") as f:
        boiler = json.load(f)
    function_name = boiler["function_name"]
    function_args = json.dumps(boiler["function_args"])  # store as JSON string

    with open(question_folder / "question.md") as f:
        question_md = f.read()
    with open(question_folder / "hint.md") as f:
        hint_md = f.read()
    with open(question_folder / "solution.md") as f:
        solution_md = f.read()

    cases_dict = load_cases(question_folder / "cases.py")
    cases_json = json.dumps({str(k): v for k, v in cases_dict.items()})  # serialize tuple keys as strings

    cursor.execute("""
        INSERT INTO questions (
            slug, title, function_name, function_args,
            question_md, hint_md, solution_md, cases
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        slug, title, function_name, function_args,
        question_md, hint_md, solution_md, cases_json
    ))
    print(f"Imported: {title}")

conn.commit()
conn.close()
