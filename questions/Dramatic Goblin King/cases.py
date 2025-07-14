cases = [
    TestCase(
        inputs=(
            ["gold_stick", "silver coin", "sword", "silver coin"],
            "To our great Goblin Lord",
        ),
        expected="""gold_stick * 1
silver coin * 2
sword * 1
To our great Goblin Lord""",
    ),
    TestCase(
        inputs=(["emerald"], "Hail to the Goblin King!"),
        expected="""emerald * 1
Hail to the Goblin King!""",
    ),
    TestCase(
        inputs=(["goblet"] * 5, "You are the shiniest of all rulers"),
        expected="""goblet * 5
You are the shiniest of all rulers""",
    ),
    TestCase(
        inputs=([], "We dare not come empty-handed, but here we are"),
        expected="""We dare not come empty-handed, but here we are""",
    ),
    # Multiple distinct items
    TestCase(
        inputs=(
            ["gem", "gold", "gold", "gem", "scroll", "gem"],
            "May your reign be full of shinies",
        ),
        expected="""gem * 3
gold * 2
scroll * 1
May your reign be full of shinies""",
    ),
    TestCase(
        inputs=(
            [
                "ruby",
                "emerald",
                "emerald",
                "sapphire",
                "ruby",
                "gold coin",
                "ruby",
                "gold coin",
                "diamond",
                "emerald",
                "sapphire",
                "sapphire",
                "silver coin",
                "silver coin",
                "gold coin",
                "scroll",
                "scroll",
                "scroll",
                "scroll",
                "ancient gear",
            ],
            "All hail the Glorious Goblin King, Keeper of Shinies!",
        ),
        expected="""ruby * 3
emerald * 3
sapphire * 3
gold coin * 3
diamond * 1
silver coin * 2
scroll * 4
ancient gear * 1
All hail the Glorious Goblin King, Keeper of Shinies!""",
    ),
]
