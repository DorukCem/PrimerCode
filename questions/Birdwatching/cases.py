cases = [
    TestCase(inputs=("NO BIRDS TODAY",), expected=0),
    TestCase(inputs=("THIS 1 CANT FLY",), expected=1),
    TestCase(inputs=("3 4 FUNNY BIRD63 14 7",), expected=28),
    TestCase(inputs=("1234567890",), expected=45),
    TestCase(inputs=("z0e0r0o",), expected=0),
    TestCase(inputs=("sp0tt3d3b1rd",), expected=7),
    TestCase(inputs=("NO BIRDS! Just 2 chicken and 6 hen.",), expected=8),
    TestCase(inputs=("",), expected=0),
]
