import sqlite3
import json
from pathlib import Path
from collections import namedtuple

""" This script moves all files from /questions into a SQLite database, after first
loading them into an intermediate data structure. """

# Configuration
DB_PATH = "database.db"
QUESTIONS_DIR = Path("questions")

# Connect to SQLite
conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()


# List to hold all question data before DB insertion
folder_data = []
database_data = []

Question = namedtuple(
    "Question",
    [
        "slug",
        "title",
        "function_name",
        "function_args",
        "question_md",
        "hint_md",
        "solution_md",
        "cases",
        "test_strategy",
    ],
)

# Traverse each question folder
for folder in QUESTIONS_DIR.iterdir():
    if not folder.is_dir():
        continue

    title = folder.name
    slug = "-".join(folder.name.strip().split()).lower()

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
        function_args = json.dumps(boiler["function_args"])  # Store as JSON string

        # Load markdown content
        with open(question_md_path, "r") as f:
            question_md = f.read()
        with open(hint_md_path, "r") as f:
            hint_md = f.read()
        with open(solution_md_path, "r") as f:
            solution_md = f.read()
        with open(cases_py_path, "r") as f:
            cases = f.read()

        # Load optional metadata.json
        test_strategy = None
        if metadata_path.exists():
            with open(metadata_path, "r") as f:
                metadata = json.load(f)
                test_strategy = metadata.get("test_strategy")

        # Add data to the list
        folder_data.append(
            Question(
                slug=slug,
                title=title,
                function_name=function_name,
                function_args=function_args,
                question_md=question_md,
                hint_md=hint_md,
                solution_md=solution_md,
                cases=cases,
                test_strategy=test_strategy,
            )
        )

    except Exception as e:
        print(f"[ERROR] Failed to load '{slug}': {e}")

cursor.execute(
    "SELECT slug, title, function_name, function_args, question_md, hint_md, solution_md, cases, test_strategy from questions"
)
items = cursor.fetchall()
for (
    slug,
    title,
    function_name,
    function_args,
    question_md,
    hint_md,
    solution_md,
    cases,
    test_strategy,
) in items:
    database_data.append(
        Question(
            slug=slug,
            title=title,
            function_name=function_name,
            function_args=function_args,
            question_md=question_md,
            hint_md=hint_md,
            solution_md=solution_md,
            cases=cases,
            test_strategy=test_strategy,
        )
    )

# Compare database data and folder data
common = list(set(folder_data).intersection(database_data))
folder_only = [x for x in folder_data if not x in common]
db_only = [x for x in database_data if not x in common]

common_slugs = set(q.slug for q in folder_data) & set(q.slug for q in database_data)
folder_slugs = set(q.slug for q in folder_data)
db_slugs = set(q.slug for q in database_data)

# Process common slugs (same slug in both, but maybe different content)
for slug in sorted(common_slugs):
    folder_q = next(q for q in folder_data if q.slug == slug)
    db_q = next(q for q in database_data if q.slug == slug)
    if folder_q != db_q:
        print(f"\n⚠️  Question '{slug}' differs between folder and database.")
        print("  - Folder Title:", folder_q.title)
        print("  - DB Title:", db_q.title)
        choice = (
            input("  Overwrite database with folder version? (y/n) ").strip().lower()
        )
        if choice == "y":
            cursor.execute(
                """
                UPDATE questions
                SET 
                    title = ?, 
                    function_name = ?, 
                    function_args = ?, 
                    question_md = ?, 
                    hint_md = ?, 
                    solution_md = ?, 
                    cases = ?, 
                    test_strategy = ?
                WHERE slug = ?
                """,
                (
                    folder_q.title,
                    folder_q.function_name,
                    folder_q.function_args,
                    folder_q.question_md,
                    folder_q.hint_md,
                    folder_q.solution_md,
                    folder_q.cases,
                    folder_q.test_strategy,
                    folder_q.slug,
                ),
            )

            print(f"✅ Updated question '{slug}' in database.")
        else:
            print(f"⏭️  Skipped updating '{slug}'.")

# Process questions only in folders (new additions)
for slug in sorted(folder_slugs - db_slugs):
    folder_q = next(q for q in folder_data if q.slug == slug)
    print(f"\n🆕 New question '{slug}' found in folders.")
    choice = input("  Add to database? (y/n) ").strip().lower()
    if choice == "y":
        cursor.execute(
            """
            INSERT INTO questions (
                slug, title, function_name, function_args,
                question_md, hint_md, solution_md, cases, test_strategy
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
            folder_q,
        )
        print(f"✅ Added question '{slug}' to database.")
    else:
        print(f"⏭️  Skipped adding '{slug}'.")

# Process questions only in database (deleted from folders)
for slug in sorted(db_slugs - folder_slugs):
    db_q = next(q for q in database_data if q.slug == slug)
    print(f"\n❌ Question '{slug}' exists in database but not in folders.")
    choice = input("  Delete from database? (y/n) ").strip().lower()
    if choice == "y":
        cursor.execute("DELETE FROM questions WHERE slug = ?", (slug,))
        print(f"✅ Deleted question '{slug}' from database.")
    else:
        print(f"⏭️  Skipped deleting '{slug}'.")

# Commit changes
conn.commit()
conn.close()
print("✅ All done.")
