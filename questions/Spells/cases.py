cases = [
    TestCase(
        inputs=("Vivamus aliquet *regenulsis consieous* sit amet",),
        expected="regenulsis consieous",
    ),
    TestCase(
        inputs=("Fusce feugiat *curecto focuundis* sagittis aliquam",),
        expected="curecto focuundis",
    ),
    TestCase(
        inputs=("Praesent eu *depresegris consilegra* massa feugiat",),
        expected="depresegris consilegra",
    ),
    TestCase(
        inputs=("Suspendisse ullamcorper *clariecto virtinio* metus eget.",),
        expected="clariecto virtinio",
    ),
    TestCase(inputs=("*traio repellenta*",), expected="traio repellenta"),
    TestCase(
        inputs=("Aenean vulputate *ignitectum miniscundis* velit ac",),
        expected="ignitectum miniscundis",
    ),
    TestCase(inputs=("**",), expected=""),
]
