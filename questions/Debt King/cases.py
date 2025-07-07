cases = [
    TestCase(
        inputs=(
            """Alice owes Bob 10 coins
Bob owes Charlie 5 coins
Charlie owes Alice 3 coins
""",
        ),
        expected=7,
    ),
    TestCase(
        inputs=(
            """Tom owes Jerry 5 coins
Jerry owes Spike 5 coins
Spike owes Tom 5 coins""",
        ),
        expected=0,
    ),
    TestCase(
        inputs=(
            """John owes Paul 50 coins
Paul owes George 30 coins
George owes Ringo 20 coins
Ringo owes John 10 coins""",
        ),
        expected=40,
    ),
    TestCase(
        inputs=(
            """A owes B 100 coins
B owes C 50 coins
C owes D 25 coins
D owes E 10 coins
E owes A 5 coins""",
        ),
        expected=95,
    ),
    TestCase(
        inputs=(
            """Alice owes Bob 30 coins
Bob owes Charlie 10 coins
Charlie owes Dana 15 coins
Dana owes Eva 5 coins
Eva owes Frank 25 coins
Frank owes Grace 20 coins
Grace owes Henry 10 coins
Henry owes Alice 5 coins
Bob owes Eva 15 coins
Charlie owes Alice 10 coins
Eva owes Alice 5 coins
Frank owes Dana 10 coins
Grace owes Charlie 5 coins
Dana owes Bob 10 coins
Henry owes Frank 5 coins
""",
        ),
        expected=30,
    ),
]
