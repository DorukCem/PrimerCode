cases = [
    TestCase(
        inputs=("Agent Alice met Agent Bob.", ["Alice", "Bob"]),
        expected="Agent ***** met Agent ***."
    ),
    TestCase(
        inputs=("Alice and Bob went undercover.", ["Alice", "Bob"]),
        expected="***** and *** went undercover."
    ),
    TestCase(
        inputs=("Nothing to hide here.", ["Alice", "Bob"]),
        expected="Nothing to hide here."
    ),
    TestCase(
        inputs=("Top agents: Alice, Bob, and Charlie.", ["Charlie"]),
        expected="Top agents: Alice, Bob, and *******."
    ),
    TestCase(
        inputs=("AliceAliceAlice", ["Alice"]),
        expected="***************"  
    ),
    TestCase(
        inputs=("", ["Alice"]),
        expected=""
    ),
    TestCase(
        inputs=("Agent ALICE met agent bob.", ["ALICE", "bob"]),
        expected="Agent ***** met agent ***." 
    ),
    TestCase(
        inputs=(
            "Alice reported to Bob about Charlie's disappearance. Bob was shocked. Charlie was last seen with Alice.",
            ["Alice", "Bob", "Charlie"]
        ),
        expected="***** reported to *** about *******'s disappearance. *** was shocked. ******* was last seen with *****."
    ),
]