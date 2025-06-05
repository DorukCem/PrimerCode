cases = [
    TestCase(inputs=("Word Search",), expected="word-search"),
    TestCase(inputs=("  Word Search  ",), expected="word-search"),
    TestCase(inputs=("   Word     Search   ",), expected="word-search"),
    TestCase(inputs=("Graph Traversal",), expected="graph-traversal"),
    TestCase(inputs=(" Dynamic Programming ",), expected="dynamic-programming"),
    TestCase(inputs=("word",), expected="word"),
    TestCase(inputs=("  WORD  ",), expected="word"),
    TestCase(inputs=("Hello World!",), expected="hello-world!"),
    TestCase(inputs=("Mixed CASE Input",), expected="mixed-case-input"),
    TestCase(inputs=("",), expected=""),
]
