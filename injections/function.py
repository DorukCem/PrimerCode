import io
from contextlib import redirect_stdout
import json

test_results = []
for case_id, (args, result) in enumerate(cases.items()):
    with io.StringIO() as buf, redirect_stdout(buf):
        error = None
        correct = False
        try:
            correct = __some_function(*args) == result
        except Exception as e:
            error = e

        function_stdout = buf.getvalue()
        case_signature = f"{str(args)} -> {str(result)}"
        test_results.append(
            {"is_correct": correct, "case_stdout": function_stdout, "error": error, "case_signature": case_signature}
        )
print(json.dumps(test_results, default=str))  # Ensures exceptions are stringified
