cases = [
    TestCase(
        inputs=(3, ["GENERATE", "DOUBLE", "VANISH", "DOUBLE", "VANISH", "STABILIZE", "DOUBLE", "DOUBLE", "GENERATE", "VANISH", "VANISH"]),
        expected=13,
    ),
    TestCase(
        inputs=(1, ["DOUBLE", "DOUBLE", "STABILIZE", "DOUBLE"]),
        expected=4,
    ),
    TestCase(
        inputs=(2, ["VANISH", "VANISH"]),
        expected=0,
    ),
    TestCase(
        inputs=(5, ["STABILIZE", "DOUBLE", "VANISH"]),
        expected=5,
    ),
    TestCase(
        inputs=(0, ["GENERATE", "DOUBLE", "STABILIZE", "VANISH"]),
        expected=2,
    ),
    TestCase(
        inputs=(10, ["DOUBLE", "DOUBLE", "VANISH", "STABILIZE", "VANISH", "GENERATE"]),
        expected=39,
    ),
    TestCase(
        inputs=(7, []),
        expected=7,
    ),
    TestCase(
        inputs=(3, ["STABILIZE"]),
        expected=3,
    ),
    TestCase(
        inputs=(3, ["DOUBLE", "STABILIZE", "STABILIZE", "STABILIZE"]),
        expected=6,
    ),
    TestCase(
        inputs=(1, ["VANISH", "STABILIZE", "DOUBLE", "GENERATE"]),
        expected=0,
    ),
]
