cases = [
    TestCase(inputs=([],), expected={}),
    TestCase(inputs=(["owl", "jay", "hen"],), expected={3: {"owl", "jay", "hen"}}),
    TestCase(
        inputs=(["sparrow", "owl", "finch", "hawk", "swallow", "jay"],),
        expected={
            3: {"owl", "jay"},
            4: {"hawk"},
            5: {"finch"},
            7: {"sparrow"},
            7: {"sparrow", "swallow"},
        },
    ),
    TestCase(
        inputs=(["crane", "duck", "crane", "duck", "heron"],),
        expected={5: {"crane", "heron"}, 4: {"duck"}},
    ),
    TestCase(
        inputs=(["egret", "ibis", "egret", "eagle", "auk", "hawk"],),
        expected={5: {"egret", "eagle"}, 4: {"ibis", "hawk"}, 3: {"auk"}},
    ),
]
