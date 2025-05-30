cases = [
    -TestCase(
        inputs=(["DRAGON SCALE", "PHOENIX FEATHER", "UNICORN HORN"], 150),
        expected=51,
    ),
    TestCase(
        inputs=(["ANT", "BEE"], 4),
        expected=5,
    ),
    TestCase(
        inputs=(["FROG_LEGS", "EYE_OF_NEWT"], 50),
        expected=8,
    ),
    TestCase(inputs=(['SLIME', 'BAT WINGS', 'DRAGON SCALE', 'PHOENIX FEATHER', 'UNICORN HORN', 'FROG LEGS', 'RAVENS EYE', 'ANT', 'BEE', 'CATS TAIL'], 100000), expected=133),

    TestCase(inputs=(['BEE'], 1000000), expected=8),
]
