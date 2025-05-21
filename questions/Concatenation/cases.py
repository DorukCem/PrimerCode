cases = [
    TestCase(inputs=([], []), expected=[]),
    TestCase(inputs=([1], [2]), expected=[1, 2]),
    TestCase(inputs=([2], [1]), expected=[2, 1]),
    TestCase(inputs=([3, 2, 1], []), expected=[3, 2, 1]),
    TestCase(inputs=([], [1, 2, 3]), expected=[1, 2, 3]),
    TestCase(inputs=([2, 3], [6, 4, 2]), expected=[2, 3, 6, 4, 2]),
]
