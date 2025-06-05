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
