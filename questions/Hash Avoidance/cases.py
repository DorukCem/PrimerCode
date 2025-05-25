cases = [
    TestCase(inputs=([1, None, None, 6, None], [1, 2, 2]), expected=[1, 1, 2, 2, 6]),
    TestCase(inputs=([None, None, None, None], [0, 2, 7]), expected=[0, 2, None, 7]),
    TestCase(inputs=([10, None, None], [0]), expected=[10, 0, None]),
    TestCase(inputs=([None, 1, 2, None, None], [2, 2]), expected=[None, 1, 2, 2, 2]),
    TestCase(inputs=([3, 5, 1, 7, None], [10]), expected=[3, 5, 1, 7, 10]),
    TestCase(inputs=([None, None, None, None, None, None], [2, 4, 6, 8]), expected=[None, 2, 4, 6, 8, None]),
]
