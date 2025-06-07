import io
from contextlib import redirect_stdout
import json
import inspect

def get_function_source(func):
    """Get source code of a function, with fallback for when source isn't available"""
    try:
        return inspect.getsource(func)
    except (OSError, TypeError):
        # Fallback for built-in functions, lambdas defined in REPL, etc.
        return str(func)

test_results = []
for case_id, test_case in enumerate(cases):
    args = test_case.inputs
    expected = test_case.expected
    result = None
    with io.StringIO() as buf, redirect_stdout(buf):
        error = None
        correct = False
        try:
            result = __some_function(*args)
            correct = all([result(i) == result(i) for i in range(100)])

        except Exception as e:
            error = e

        function_stdout = buf.getvalue()

        # Get source code instead of string representation
        result_source = get_function_source(result) 
        expected_source = get_function_source(expected)

        case_signature = {"args": str(args), "expected": str(expected_source), "result": str(result_source)}
        test_results.append(
            {"is_correct": correct, "case_stdout": function_stdout, "error": error, "case_signature": case_signature}
        )
print(json.dumps(test_results, default=str))  # Ensures exceptions are stringified