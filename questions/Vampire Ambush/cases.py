cases = [
    TestCase(
        inputs=(
            """03:53 37*22 RED
04:32 34*10 BROWN
14:00 38*14 BROWN
17:06 25*16 RED""",
        ),
        expected=["03:53"],
    ),
    TestCase(
        inputs=(
            """00:51 29*24 BROWN
04:08 36*16 BROWN
04:37 30*21 RED
06:17 33*16 RED
07:51 30*11 BLACK
08:57 29*12 RED
09:17 36*11 BLACK
10:53 37*19 BROWN
15:29 29*20 BLACK
19:29 25*21 BROWN
19:44 37*18 BLACK
21:17 24*25 BLACK""",
        ),
        expected=["04:37", "06:17"],
    ),
    TestCase(
        inputs=(
            """02:25 35*14 BLACK
07:52 40*19 RED
09:32 27*15 BROWN
10:50 27*25 BROWN
11:10 26*24 BROWN
14:04 26*23 BLACK
14:39 31*19 RED""",
        ),
        expected=["07:52", "14:39"],
    ),
    TestCase(
        inputs=(
            """01:34 35*12 RED
04:03 20*20 BROWN
07:24 34*15 BROWN
15:11 33*21 BLACK
16:24 20*19 BROWN
17:33 20*16 RED
21:20 24*13 RED
21:50 20*22 BROWN""",
        ),
        expected=["01:34"],
    ),
    TestCase(
        inputs=(
            """00:24 37*21 BLACK
02:46 36*19 BLACK
08:30 38*12 RED
09:41 36*16 RED
12:00 38*21 BROWN
14:43 33*20 BLACK
15:19 30*23 BROWN
16:02 39*10 BLACK
20:05 25*25 BLACK
21:52 35*10 BROWN
21:57 26*10 RED
22:07 25*20 RED""",
        ),
        expected=["08:30", "09:41", "22:07"],
    ),
    TestCase(
        inputs=(
            """07:47 39*19 BROWN
09:30 27*11 BROWN
12:04 32*10 RED
13:12 30*22 BLACK
15:13 30*16 BROWN
23:20 36*10 BLACK""",
        ),
        expected=[],
    ),
]
