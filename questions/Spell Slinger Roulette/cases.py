cases = [
    TestCase(inputs=([1, 4, 3, 2], lambda x: x // 2), expected=[0, 2, 1, 1]),
    TestCase(inputs=([10, 20, 30], lambda x: x + 5), expected=[15, 25, 35]),
    TestCase(inputs=([5, 1, 0, 3], lambda x: x * 2), expected=[10, 2, 0, 6]),
    TestCase(inputs=([9, 8, 7], lambda x: x - 1), expected=[8, 7, 6]),
    TestCase(inputs=([], lambda x: x + 1), expected=[]),
    TestCase(inputs=([0, 0, 0], lambda x: x + 10), expected=[10, 10, 10]),
    TestCase(inputs=([1, 2, 3], lambda x: x), expected=[1, 2, 3]),
    TestCase(inputs=([1, 2, 3, 4], lambda x: x**2), expected=[1, 4, 9, 16]),
    TestCase(inputs=([2, 3, 4, 5], lambda x: x - 2 if x % 2 == 0 else x), expected=[0, 3, 2, 5]),
    TestCase(inputs=([0, 1, 2, 3], lambda x: x % 2), expected=[0, 1, 0, 1]),
]
