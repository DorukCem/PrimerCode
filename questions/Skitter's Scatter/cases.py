cases = [
    TestCase(
        inputs=([1, 2, 3],),
        expected=lambda x: x // 14  # 1^2 + 2^2 + 3^2 = 14 (divisible by 2)
    ),
    TestCase(
        inputs=([2, 2, 2],),
        expected=lambda x: x // 12  # 4+4+4=12 (divisible by 2)
    ),
    TestCase(
        inputs=([1, 1, 1, 1, 2],),
        expected=lambda x: x // 8  # 1+1+1+1+4=8 (divisible by 2)
    ),
    TestCase(
        inputs=([3, 3],),
        expected=lambda x: x // 18  # 9+9=18 (divisible by 2)
    ),
    TestCase(
        inputs=([1, 1, 1],),
        expected=lambda x: x + 3  # 1+1+1=3 (divisible by 3 but not 2)
    ),
    TestCase(
        inputs=([2, 1, 1],),
        expected=lambda x: x // 6  # 4+1+1=6 (divisible by 2)
    ),
    TestCase(
        inputs=([5],),
        expected=lambda x: x % 25  # 25 (neither divisible by 2 nor 3)
    ),
    TestCase(
        inputs=([1, 2, 4],),
        expected=lambda x: x + 21  # 1+4+16=21 (divisible by 3 but not 2)
    ),
    TestCase(
        inputs=([4, 2, 1],),
        expected=lambda x: x + 21  # 16+4+1=21 (divisible by 3 but not 2)
    ),
    TestCase(
        inputs=([7],),
        expected=lambda x: x % 49  # 
    ),
]