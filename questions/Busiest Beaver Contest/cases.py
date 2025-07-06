cases = [
    TestCase(
        inputs=(
            """state = 0
IF state is 1 JUMP 6 ELSE 3
state = 1
IF state is 1 JUMP 2 ELSE 5
state = 99
state = 0"""
        ),
        expected=6,
    ),
    TestCase(
        inputs=(
            """x = 10
y = 20"""
        ),
        expected=2,
    ),
    TestCase(
        inputs=(
            """IF x is 1 JUMP 3 ELSE 2
x = 1
IF x is 1 JUMP 5 ELSE 1"""
        ),
        expected=3,
    ),
    TestCase(
        inputs=(
            """flag = 0
IF flag is 10 JUMP 5 ELSE 3
flag = 10
IF flag is 10 JUMP 2 ELSE 2
"""
        ),
        expected=5,
    ),
    TestCase(
        inputs=(
            """x = 1
IF x is 1 JUMP 100 ELSE 3"""
        ),
        expected=2,
    ),
    TestCase(inputs=("""IF state is START JUMP 2 ELSE 0"""), expected=1),
    TestCase(
        inputs=(
            """mode = A
IF mode is A JUMP 4 ELSE 3
mode = C
mode = B
IF mode is B JUMP 2 ELSE 7
IF mode is C JUMP 1 ELSE 1"""
        ),
        expected=5,
    ),
]
