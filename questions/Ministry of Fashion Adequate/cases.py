cases = [
    TestCase(
        inputs=("""BAN Hat
REQUIRE Boots
Jack : Hat, Shorts, Gloves
Steve : Trousers, Monocle
Jill : Boots, Cape""",),
        expected=["Jack", "Steve"],
    ),
    TestCase(
        inputs=("""BAN Scarf
REQUIRE Monocle
Penelope : Scarf, Hat
Hubert : Gloves
UNBAN Scarf
UNREQUIRE Monocle
Joey : Scarf, Hat
Herald : Gloves""",),
        expected=["Penelope", "Hubert"],
    ),
    TestCase(
        inputs=("""REQUIRE Cape
BAN Gloves
Martha : Cape, Boots
Winston : Cape, Hat
Agnes : Trousers, Cape""",),
        expected=[],
    ),
    TestCase(
        inputs=("""BAN Spats
Steve : Spats, Boots
REQUIRE Hat
Sam : Boots, Gloves
Jill : Hat, Boots""",),
        expected=["Steve", "Sam"],
    ),
    TestCase(
        inputs=("""REQUIRE Suit
BAN Bowtie
Jack : Suit
Steve : Suit, Bowtie
UNREQUIRE Suit
BAN Boots
Jack : Boots
REQUIRE Hat
Jill : Trousers
Sam : Hat, Gloves""",),
        expected=["Steve", "Jack", "Jill"],
    ),
]
