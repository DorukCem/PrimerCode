cases = [
    TestCase(inputs=("someWord",), expected="some_word"),
    TestCase(inputs=("camelCase",), expected="camel_case"),
    TestCase(inputs=("simpleTestCase",), expected="simple_test_case"),
    TestCase(inputs=("aBunchOfWords",), expected="a_bunch_of_words"),
    TestCase(inputs=("lowercase",), expected="lowercase"),
    TestCase(inputs=("HTMLParser",), expected="h_t_m_l_parser"),  # assumes each capital is separate
    TestCase(inputs=("word",), expected="word"),
    TestCase(inputs=("ThisIsATest",), expected="this_is_a_test"),
    TestCase(inputs=("ConvertThisString",), expected="convert_this_string"),
]