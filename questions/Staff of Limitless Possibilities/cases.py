cases = [
    TestCase(inputs=("bTrue",), expected=True),
    TestCase(inputs=("bFalse",), expected=False),
    TestCase(inputs=("i0",), expected=0),
    TestCase(inputs=("i-123",), expected=-123),
    TestCase(inputs=("f0.0",), expected=0.0),
    TestCase(inputs=("f-3.1415",), expected=-3.1415),
    TestCase(inputs=("sHello, World!",), expected="Hello, World!"),
    TestCase(inputs=("s",), expected=""),  # empty string case
    TestCase(inputs=("i007",), expected=7),  # leading zero
    TestCase(inputs=("f2.71828",), expected=2.71828),
]
