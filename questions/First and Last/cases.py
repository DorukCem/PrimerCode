cases = [
    TestCase(inputs=([5],), expected=False),
    TestCase(inputs=([9, 7],), expected=True),
    TestCase(inputs=([3, 7],), expected=False),
    TestCase(inputs=([4, 2, 1, 6],), expected=False),
    TestCase(inputs=([7, 5, 9, 3, 6, 3, 2],), expected=True),
    TestCase(inputs=([10, 5, 9, 4],), expected=True),
    TestCase(inputs=([7, 5, 9, 3, 6, 3, 2],), expected=True),
    TestCase(inputs=([6, 6, 8, 3, 10, 3, 1, 9],), expected=False),
    TestCase(inputs=([0, 6, 7, 6, 0, 7, 5],), expected=False),
    TestCase(inputs=([4, 6, 10, 9],), expected=False),
]
