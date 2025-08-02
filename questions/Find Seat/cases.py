
cases = [
    TestCase(
        inputs=([True, True, True, True, True, False, False, True], 2),
        expected=5
    ),
    TestCase(
        inputs=([False, False, False], 0),
        expected=0
    ),
    TestCase(
        inputs=([True, False, False, False], 0),
        expected=1
    ),
    TestCase(
        inputs=([True, True, True, False, False], 1),
        expected=3
    ),
    TestCase(
        inputs=([True, True, True, True, False], 4),
        expected=4
    ),
    TestCase(
        inputs=([True, True, False, False, False], 1),
        expected=2
    ),
    TestCase(
        inputs=([True, True, True, False, False, False], 0),
        expected=3
    ),
]