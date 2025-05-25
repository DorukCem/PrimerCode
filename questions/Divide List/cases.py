cases = [
    TestCase(inputs=([1, 2, 3, 4, 5],), expected=([1, 2, 3], [4, 5])),
    TestCase(inputs=([2, 4, 6, 8],), expected=([2, 4], [6, 8])),
    TestCase(inputs=([3, 3, 3, 3],), expected=([3, 3, 3, 3], [])),
    TestCase(inputs=([-5, -3, -1, 0, 2],), expected=([-5, -3, -1], [0, 2])),
    TestCase(inputs=([-10, 0, 10, 20],), expected=([-10, 0], [10, 20])),
    TestCase(inputs=([1, 2, 3, 3, 4, 5],), expected=([1, 2, 3, 3], [4, 5])),
    TestCase(inputs=([],), expected=([], [])),
    TestCase(inputs=([5],), expected=([5], [])),
]
