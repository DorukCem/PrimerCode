cases = [
    TestCase(inputs=([False, True, False, True, True, False, True, True, True, False, True, True, True, True, False, False, True, True, False, True]), expected=4),
    TestCase(inputs=([True, True, False, True, True, True, True, True, True, False, True, True, True, True, True, True, False, False, True, True]), expected=6),
    TestCase(inputs=([False, True, True, True, False, True, True, False, False, True, False, True, False, True, False, True, False, False, True, False]), expected=3),
    TestCase(inputs=([True, True, False, True, True, True]), expected=3),
    TestCase(inputs=([True, True, True, True, False, True, False, True, True, True, True, True, False, True, True, True, True, True, True, True, True, True]), expected=9),
    TestCase(inputs=([True, True, True]), expected=3),
    TestCase(inputs=([False, False, False]), expected=0),
    TestCase(inputs=([]), expected=0),

]
