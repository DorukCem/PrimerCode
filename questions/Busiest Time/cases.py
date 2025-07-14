cases = [
    TestCase(
        inputs=(
            """M1 09:00 Working
M2 09:10 Working
M1 09:30 Sleeping
M3 09:40 Working
M2 10:00 Sleeping
M3 10:10 Sleeping
""",
        ),
        expected=20,
    ),

    TestCase(inputs=("""M1 08:00 Working
M1 08:30 Sleeping""",), expected=30),

    TestCase(inputs=("""M1 08:00 Working
M2 08:15 Working
M1 08:45 Sleeping
M2 09:00 Sleeping""",), expected=30),

TestCase(inputs=("""M1 07:00 Working
M1 07:30 Sleeping
M2 07:30 Working
M2 08:00 Sleeping""",), expected=30),

TestCase(inputs=("""M1 10:00 Working
M2 10:10 Working
M1 10:20 Sleeping
M3 10:30 Working
M2 10:50 Sleeping
M3 11:10 Sleeping""",), expected=20),

TestCase(inputs=("""A 00:00 Working
B 00:00 Working
C 00:00 Working
A 00:30 Sleeping
B 00:30 Sleeping
C 00:30 Sleeping""",), expected=30),


TestCase(inputs=("""A 08:00 Working
B 08:05 Working
C 08:10 Working
D 08:15 Working
A 08:45 Sleeping
B 09:00 Sleeping
C 09:15 Sleeping
D 09:30 Sleeping
E 09:40 Working
F 09:50 Working
G 10:00 Working
E 10:30 Sleeping
F 10:40 Sleeping
G 10:50 Sleeping""",), expected=30),
]
