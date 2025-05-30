cases = [
    TestCase(
        inputs=(["Arthur", "Ford", "Trillian", "Ford", "Ford", "Zaphod", "Ford", "Marvin", "Zaphod", "Trillian", "Marvin"],),
        expected=["Arthur", "Ford", "Trillian", "Zaphod", "Marvin"],
    ),
    TestCase(
        inputs=(["Zaphod", "Zaphod", "Zaphod", "Zaphod"],),
        expected=["Zaphod"],
    ),
    TestCase(
        inputs=(["Arthur", "Ford", "Trillian", "Zaphod", "Marvin"],),
        expected=["Arthur", "Ford", "Trillian", "Zaphod", "Marvin"],  
    ),
    TestCase(
        inputs=([],),
        expected=[],
    ),
    TestCase(
        inputs=(["Trillian", "Marvin", "Trillian", "Arthur", "Marvin", "Ford"],),
        expected=["Trillian", "Marvin", "Arthur", "Ford"],
    ),
    TestCase(
        inputs=(["Ford", "Ford", "Ford", "Ford", "Ford", "Ford", "Ford"],),
        expected=["Ford"],
    ),
    TestCase(
        inputs=(["Marvin", "Ford", "Marvin", "Ford", "Marvin", "Ford"],),
        expected=["Marvin", "Ford"],
    ),
]
