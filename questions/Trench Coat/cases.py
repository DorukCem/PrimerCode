cases = [
    TestCase(inputs=([42, 30, 58, 70], (140, 160)), expected=True),
    # Simple 2-elf combo fits
    TestCase(inputs=([50, 60, 70], (110, 120)), expected=True),

    # Single elf already fits
    TestCase(inputs=([120, 130, 140], (120, 120)), expected=True),

    # Multiple combinations possible, first one fits
    TestCase(inputs=([42, 30, 58, 70], (140, 160)), expected=True),

    # Just enough to hit upper bound
    TestCase(inputs=([100, 45, 15], (130, 160)), expected=True),

    # Largest possible combination barely fits
    TestCase(inputs=([10, 20, 30, 40, 50], (149, 150)), expected=True),
     # All elves too short
    TestCase(inputs=([20, 25, 30], (100, 110)), expected=False),

    # All combinations too tall
    TestCase(inputs=([90, 100, 120], (50, 80)), expected=False),

    # All combos outside range
    TestCase(inputs=([30, 40, 50], (150, 160)), expected=False),

    # Range too narrow to hit with any subset
    TestCase(inputs=([25, 25, 25], (74, 74)), expected=False),
    # Elf exactly at lower bound
    TestCase(inputs=([150], (150, 160)), expected=True),

    # Elf exactly at upper bound
    TestCase(inputs=([160], (150, 160)), expected=True),

    # Just above upper bound
    TestCase(inputs=([161], (150, 160)), expected=False),
]
