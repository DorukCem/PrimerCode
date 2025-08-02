cases = [
    TestCase(
        inputs=(
            ["go to 31415", "pick up briefcase"],
            ["drop briefcase to 15121", "return to hideout"],
        ),
        expected=[
            "go to 31415",
            "pick up briefcase",
            "drop briefcase to 15121",
            "return to hideout",
        ],
    ),
    TestCase(
        inputs=(["alpha", "beta"], ["gamma", "delta"]),
        expected=["alpha", "beta", "gamma", "delta"],
    ),
    TestCase(
        inputs=([], ["only partner's message"]), expected=["only partner's message"]
    ),
    TestCase(inputs=(["only my message"], []), expected=["only my message"]),
    TestCase(inputs=([], []), expected=[]),
    TestCase(
        inputs=(["first", "second"], ["third"]), expected=["first", "second", "third"]
    ),
    TestCase(inputs=(["a"], ["b", "c", "d"]), expected=["a", "b", "c", "d"]),
]
