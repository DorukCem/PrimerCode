cases = [
    TestCase(inputs=(["book"],), expected=["book"]),
    TestCase(
        inputs=([["socks", "hat", "mittens"]],), expected=["socks", "hat", "mittens"]
    ),
    TestCase(
        inputs=([["car"], ["train"], ["bike"]],), expected=["car", "train", "bike"]
    ),
    TestCase(inputs=([[[[[["yo-yo"]]]]]],), expected=["yo-yo"]),
    TestCase(
        inputs=(
            [
                ["plushy"],
                [["Igor CD"], ["Blonde CD"], ["TPAB CD"]],
                ["socks", "underwear"],
            ],
        ),
        expected=["plushy", "Igor CD", "Blonde CD", "TPAB CD", "socks", "underwear"],
    ),
    TestCase(
        inputs=([["puzzle", ["game", ["cards"]]], ["lego"]],),
        expected=["puzzle", "game", "cards", "lego"],
    ),
    TestCase(inputs=([],), expected=[]),
    TestCase(inputs=([[], [[]], [[[]]]],), expected=[]),
    TestCase(
        inputs=([["ring"], ["necklace"], ["bracelet"]],),
        expected=["ring", "necklace", "bracelet"],
    ),
]
