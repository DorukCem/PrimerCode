cases = [
    TestCase(
        inputs=([4, 12, 11, 12, 10, 11, 7, 8, 10, 10, 7, 1, 2, 7, 4, 11, 3, 1, 7, 10]),
        expected=[10, 12, 11, 12, 10],
    ),
    TestCase(inputs=([8, 2, 2, 12, 5, 2, 13, 13, 11, 9, 11, 1, 6, 8, 13, 7]), expected=[8, 13, 12, 13]),
    TestCase(inputs=([9, 11, 7, 9, 12, 3, 12, 6, 9, 10, 10, 5, 11, 4, 13, 4, 3, 4, 7, 13, 11, 11, 4, 12]), expected=[12, 11, 13, 12, 13, 11]),
    TestCase(inputs=([9, 5, 7, 11, 3, 12, 11, 4, 11, 1, 4, 6]), expected=[9, 7, 11]),
    TestCase(inputs=([]), expected=[]),
    TestCase(
        inputs=[1],
        expected=[1]
    ),
    TestCase(
        inputs=[5, 4],
        expected=[5]
    ),
    TestCase(
        inputs=[8, 6, 4, 2],
        expected=[8]
    )
]
