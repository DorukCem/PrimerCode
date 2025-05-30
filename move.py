import sqlite3
import json
from pathlib import Path

""" This is a script to move all files from /questions into the database """

# Configuration
DB_PATH = "database.db"  # Replace with your actual path
QUESTIONS_DIR = Path("questions")  # Your folder structure

# Connect to SQLite
conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()


# Traverse each question folder
for folder in QUESTIONS_DIR.iterdir():
    if not folder.is_dir():
        continue

    slug = folder.name
    title = slug.replace("-", " ").title()

    boilerplate_path = folder / "boilerplate.json"
    question_md_path = folder / "question.md"
    hint_md_path = folder / "hint.md"
    solution_md_path = folder / "solution.md"
    cases_py_path = folder / "cases.py"
    metadata_path = folder / "metadata.json"


    try:
        # Load boilerplate.json
        with open(boilerplate_path, "r") as f:
            boiler = json.load(f)
        function_name = boiler["function_name"]
        function_args = json.dumps(boiler["function_args"])  # Store list as JSON string

        # Load markdown content
        with open(question_md_path, "r") as f:
            question_md = f.read()
        with open(hint_md_path, "r") as f:
            hint_md = f.read()
        with open(solution_md_path, "r") as f:
            solution_md = f.read()
        with open(cases_py_path, "r") as f:
            cases = f.read() # Put python file content as string

        # Load optional metadata.json
        test_strategy = None
        if metadata_path.exists():
            with open(metadata_path, "r") as f:
                metadata = json.load(f)
                test_strategy = metadata.get("test_strategy")

        # Insert into DB
        cursor.execute(
            """
            INSERT OR REPLACE INTO questions (
                slug, title, function_name, function_args,
                question_md, hint_md, solution_md, cases, test_strategy
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                slug,
                title,
                function_name,
                function_args,
                question_md,
                hint_md,
                solution_md,
                cases,
                test_strategy,
            ),
        )

        print(f"[OK] Imported question: {title}")

    except Exception as e:
        print(f"[ERROR] Failed to import '{slug}': {e}")

# Commit and close
conn.commit()
conn.close()
print("✅ All done.")
