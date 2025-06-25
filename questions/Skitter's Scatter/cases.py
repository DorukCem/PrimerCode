cases = [
    TestCase(
        inputs=([1, 2, 3],),
        expected=lambda x: x // 14  # Your function will probably be different from this, just make sure they produce the same output
    ),
    TestCase(
        inputs=([2, 2, 2],),
        expected=lambda x: x // 12  # Your function will probably be different from this, just make sure they produce the same output
    ),
    TestCase(
        inputs=([1, 1, 1, 1, 2],),
        expected=lambda x: x // 8  # Your function will probably be different from this, just make sure they produce the same output
    ),
    TestCase(
        inputs=([3, 3],),
        expected=lambda x: x // 18  # Your function will probably be different from this, just make sure they produce the same output
    ),
    TestCase(
        inputs=([1, 1, 1],),
        expected=lambda x: x + 3  # Your function will probably be different from this, just make sure they produce the same output
    ),
    TestCase(
        inputs=([2, 1, 1],),
        expected=lambda x: x // 6 # Your function will probably be different from this, just make sure they produce the same output
    ),
    TestCase(
        inputs=([5],),
        expected=lambda x: x % 25 # Your function will probably be different from this, just make sure they produce the same output
    ),
    TestCase(
        inputs=([1, 2, 4],),
        expected=lambda x: x + 21  # Your function will probably be different from this, just make sure they produce the same output
    ),
    TestCase(
        inputs=([4, 2, 1],),
        expected=lambda x: x + 21  # Your function will probably be different from this, just make sure they produce the same output
    ),
    TestCase(
        inputs=([7],),
        expected=lambda x: x % 49  # Your function will probably be different from this, just make sure they produce the same output
    ),
]