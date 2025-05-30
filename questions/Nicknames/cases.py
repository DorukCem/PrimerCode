cases = [
    TestCase(
        inputs=({
            "Grash": "Breaker of Chains",
            "Thok": "the Sickly",
            "Brog": "The Loud Thunder Roar",
            "Zarg": "Whisper"
        },),
        expected=["Brog", "Grash", "Thok", "Zarg"],
    ),
    TestCase(
        inputs=({
            "Mug": "First of His Kind",
            "Drok": "the Unburnt and Unbroken Killer",
            "Rag": "Crusher",
            "Nog": "Worm Killer",
        },),
        expected=["Drok", "Mug", "Nog", "Rag"],
    ),
    TestCase(
        inputs=({
            "Urn": "One",
            "Lok": "Born of Fire",
            "Hak": "The Relentless Fury of War",
            "Fen": "Shadow Walker"
        },),
        expected=["Hak", "Lok", "Fen", "Urn"],
    ),
    TestCase(
        inputs=({
            "Nar": "Doom",
            "Zok": "the Ripper",
            "Bar": "The Wielder of Storms Eternal",
            "Tor": "The Silent Blade"
        },),
        expected=["Bar", "Tor", "Zok", "Nar"],
    ),
    TestCase(
        inputs=({
            "Kil": "Roar",
            "Zul": "Howler of the Deep Caves",
            "Mor": "Dread Whisperer",
            "Tal": "The Eternal Flame of the Ancients"
        },),
        expected=["Tal", "Zul", "Mor", "Kil"],
    ),
]
