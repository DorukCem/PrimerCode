cases = [
    TestCase(
        inputs=(
            [
                ("Arthur", 4),
                ("Ford", 5),
                ("Ford", 3),
                ("Trillian", 4),
                ("Marvin", 1),
                ("Trillian", 3),
                ("Arthur", 5),
                ("Zaphod", 4),
                ("Zaphod", 4),
                ("Ford", 5),
                ("Ford", 1),
            ]
        ),
        expected=3.3,
    ),

    TestCase(
        inputs=([("Arthur", 4), ("Ford", 5), ("Trillian", 3)],),
        expected=4.0,
    ),
    TestCase(
        inputs=(
            [
                ("Arthur", 4),
                ("Ford", 3),
                ("Ford", 5),
                ("Trillian", 2),
                ("Arthur", 5),
                ("Marvin", 1),
            ],
        ),
        expected=2.875,
    ),
    TestCase(
        inputs=([("Zaphod", 5), ("Zaphod", 1), ("Zaphod", 2), ("Zaphod", 4)],),
        expected=3.0,
    ),
    TestCase(
        inputs=(
            [("Arthur", 5), ("Ford", 5), ("Trillian", 5), ("Arthur", 5), ("Ford", 5)],
        ),
        expected=5.0,
    ),
    TestCase(
        inputs=([("Trillian", 3)],),
        expected=3.0,
    ),
]
