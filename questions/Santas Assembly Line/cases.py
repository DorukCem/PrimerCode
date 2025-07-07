cases = [
    
    TestCase(inputs=("|AB:CD| -> |CD:XZ| -> |MN:KZ|",), expected="XZ"),

    TestCase(
        inputs=("|A:B| -> |B:C| -> |C:D| -> |D:E|",),
        expected="E"
    ),
    TestCase(
        inputs=("|A:B| -> |X:Y| -> |Y:Z|",),
        expected="B"  
    ),
    TestCase(
        inputs=("|START:MID| -> |MID:END|",),
        expected="END"
    ),
    TestCase(
        inputs=("|AA:BB| -> |BB:CC| -> |DD:EE|",),
        expected="CC"
    ),
    TestCase(
        inputs=("|X:Y|",),
        expected="Y"  
    ),
    TestCase(
        inputs=("|AB:CD| -> |CD:AB| -> |AB:CD| -> |CD:AB|",),
        expected="AB"  
    ),
    TestCase(
    inputs=( "|A:B| -> |B:C| -> |C:D| -> |D:E| -> |E:F| -> |F:G| -> |G:H| -> |H:I| -> |I:J| -> |J:K| -> |K:L| -> |L:M| -> |M:N| -> |N:O| -> |O:P| -> |P:Q| -> |Q:R| -> |R:S| -> |S:T| -> |T:U| -> |U:V| -> |V:W| -> |W:X| -> |X:Y| -> |Y:Z|",),
    expected="Z"
)
]
