import os

name = input("Enter question name: ")

files = ["boilerplate.json", "cases.py", "hint.md", "metadata.json", "question.md", "solution.md"]

try:
    os.mkdir(f"questions/{name}")
    for file_name in files:
        open(f"questions/{name}/{file_name}", 'a').close()

except FileExistsError:
    print(f"Error: Directory '{name}' already exists.")
except PermissionError:
    print(f"Permission denied: Unable to create '{name}'.")
except Exception as e:
    print(f"An error occurred: {e}")