cases = [
    TestCase(
        inputs=(
            ["chasing cars", "howling", "collecting bones"],
            ["sculpting", "collecting bones" ,"opera", "howling"],
        ),
        expected={"howling","collecting bones"},
    ),
    TestCase(
        inputs=(
            ["flying", "turning invisible", "eating garlic"],
            ["sunbathing", "eating garlic", "teleportation"],
        ),
        expected={"eating garlic"},
    ),
    TestCase(
        inputs=(
            ["haunting", "levitating", "glowing eyes"],
            ["levitating", "glowing eyes", "mirror dancing"],
        ),
        expected={"levitating", "glowing eyes"},
    ),
    TestCase(
        inputs=(
            ["climbing trees", "drinking tea"],
            ["sleeping upside down", "counting stars"],
        ),
        expected=set(),
    ),
    TestCase(inputs=([], ["fire-breathing", "gliding"]), expected=set()),
    TestCase(
        inputs=(
            ["screeching", "moon bathing", "howling"],
            ["howling", "screeching", "moon bathing"],
        ),
        expected={"howling", "screeching", "moon bathing"},
    ),
]
