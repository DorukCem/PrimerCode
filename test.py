from dataclasses import dataclass

@dataclass
class TestCase:
    inputs: tuple
    expected: ...

class Solution:
    def repeat(sound: str, n: int):
        return sound*n

__some_function = Solution.repeat

cases = [
    TestCase(inputs=("whyy", 3), expected="whyywhyywhyy"),
    TestCase(inputs=("AaAA", 2), expected="AaAAAaAA"),
    TestCase(inputs=("NOOO", 1), expected="NOOO"),
    TestCase(inputs=("nooo", 5), expected="nooonooonooonooonooo"),
    TestCase(inputs=("", 8), expected=""),
    TestCase(inputs=("?", 0), expected=""),
    TestCase(inputs=("", 0), expected=""),
    TestCase(inputs=("A", 50), expected="A" * 50),
]


import io
from contextlib import redirect_stdout
import json

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
            correct = result == expected
        except Exception as e:
            error = e

        function_stdout = buf.getvalue()
        case_signature = {"args": str(args), "expected": str(expected), "result": str(result)}
        test_results.append(
            {"is_correct": correct, "case_stdout": function_stdout, "error": error, "case_signature": case_signature}
        )
print(json.dumps(test_results, default=str))  # Ensures exceptions are stringified