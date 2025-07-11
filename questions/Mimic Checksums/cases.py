cases = [
    TestCase(
        inputs=(
            """anna 13013
jack 928
dory 14151
""",
        ),
        expected=["anna", "jack"],
    ),
    TestCase(
        inputs=(
            """gold 839
silver 103101712
ruby 31924
""",
        ),
        expected=[],
    ),
    TestCase(
        inputs=(
            """golem 8378
chest 53140
mimic 4446
loot 304
""",
        ),
        expected=["golem", "mimic"],
    ),
    TestCase(
        inputs=(
            """ab 1
bd 2
""",
        ),
        expected=["ab", "bd"],
    ),
]
