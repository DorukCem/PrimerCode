import io
from contextlib import redirect_stdout

test_results = {}
for case_id, (args, result) in enumerate(cases.items()):
    with io.StringIO() as buf, redirect_stdout(buf):
        error = None
        correct = False
        try:
            correct = __some_function(*args) == result 
        except Exception as e:
            error = e

        function_stdout = buf.getvalue()
        test_results[case_id] = {"is_correct": correct, "case_stdout": function_stdout, "error": error}

import json
print(json.dumps(test_results, default=str))  # Ensures exceptions are stringified
