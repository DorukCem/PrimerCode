cases = [
    TestCase(
        inputs=(
            "WIRE is RED and CURLY",
            """WIRE is RED and LONG and UGLY
WIRE is GREEN and SHORT
WIRE is BLACK
WIRE is RED and CURLY and LONG
""",
        ),
        expected=1,
    ),
    TestCase(
        inputs=(
            "WIRE is UGLY and GREEN and CURLY",
            """WIRE is STRAIGHT and LONG and SHORT and PRETTY
WIRE is SHORT and STRAIGHT
WIRE is UGLY and CURLY
WIRE is SHORT and WHITE and RED and BLUE""",
        ),
        expected=0,
    ),
    TestCase(
        inputs=(
            "WIRE is RED",
            """WIRE is RED and BLUE and CURLY and LONG
WIRE is BLUE and GREEN and STRAIGHT and BLACK and UGLY
WIRE is BLACK and UGLY
WIRE is CURLY and LONG and WHITE
WIRE is PRETTY and RED and LONG and GREEN
WIRE is STRAIGHT and BLACK and PRETTY and SHORT and CURLY
WIRE is CURLY and BLUE and SHORT and LONG and BLACK
WIRE is BLUE and BLACK
WIRE is STRAIGHT and LONG and RED
WIRE is BLUE and UGLY and BLACK
WIRE is UGLY and BLACK and LONG""",
        ),
        expected=3,
    ),
    TestCase(
        inputs=(
            "WIRE is BLACK and UGLY",
            """WIRE is SHORT
WIRE is UGLY and PRETTY and STRAIGHT and BLACK and RED
WIRE is SHORT and WHITE and BLUE
WIRE is BLUE and GREEN
WIRE is CURLY and LONG
WIRE is PRETTY
WIRE is UGLY and RED and BLUE and PRETTY and SHORT
WIRE is RED and GREEN and CURLY and UGLY
WIRE is STRAIGHT and PRETTY and SHORT and CURLY""",
        ),
        expected=1,
    ),
    TestCase(
        inputs=(
            "WIRE is WHITE and SHORT",
            """WIRE is GREEN and RED and BLUE
WIRE is UGLY and SHORT
WIRE is GREEN and BLUE
WIRE is STRAIGHT and BLACK and WHITE and PRETTY
WIRE is GREEN and RED and LONG and PRETTY
WIRE is BLACK and BLUE and UGLY
WIRE is GREEN""",
        ),
        expected=0,
    ),
]
