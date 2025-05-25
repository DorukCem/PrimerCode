cases = [
    TestCase(inputs=(True, True, True), expected=True),
    TestCase(inputs=(True, True, False), expected=True),
    TestCase(inputs=(True, False, True), expected=True),
    TestCase(inputs=(True, False, False), expected=False),
    TestCase(inputs=(False, False, False), expected=False),
    TestCase(inputs=(False, True, False), expected=False),
    TestCase(inputs=(False, True, True), expected=False),
    TestCase(inputs=(False, False, True), expected=False),
]
