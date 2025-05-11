# ---- Some function will be injected here
def some_function(x):
    print(f"x is {x}")
    if x == 13:
        raise Exception("Unlucky number")
    return x


# --- test cases will be injected here
cases = {(1,): 1, (2,): 2, (13,): 13}  # Key: tuple of args, Value: expected result

import io
from contextlib import redirect_stdout

test_results = {}
for case_id, (args, result) in enumerate(cases.items()):
    with io.StringIO() as buf, redirect_stdout(buf):
        error = None
        correct = False
        try:
            correct = some_function(*args) == result 
        except Exception as e:
            error = e

        function_stdout = buf.getvalue()
        test_results[case_id] = {"is_correct": correct, "stdout": function_stdout, "error": error}

# --- Since we can only get stdout back from PistonAPI 
print(test_results)