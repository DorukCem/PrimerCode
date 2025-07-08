cases = [
    TestCase(
        inputs=(
            """[01/01/2000] System started
[02/01/2000] User logged in
[01/01/2000] Error: Clock failure
[03/01/2000] User logged out
[02/01/2000] Unexpected reboot
""",
        ),
        expected=2,
    ),
    TestCase(
        inputs=(
            """[01/01/2000] Booted up
[02/01/2000] Entered lab
[03/01/2000] Started experiment
[02/01/2000] Something strange happened
[04/01/2000] Recovered
""",
        ),
        expected=1,
    ),
    TestCase(
        inputs=(
            """[01/01/2001] Initialization
[03/01/2001] Calibration
[02/01/2001] Reversed settings
[01/01/2001] Rebooted
[05/01/2001] Stable
""",
        ),
        expected=2,
    ),
    TestCase(
        inputs=(
            """[10/10/2020] Arrived
[11/10/2020] Logged progress
[12/10/2020] Success!
""",
        ),
        expected=0,
    ),
    TestCase(inputs=("""[25/12/1999] Power on""",), expected=0),
    TestCase(
        inputs=(
            """[01/01/2000] Phase 1
[01/01/2000] Phase 2
[02/01/2000] Phase 3
""",
        ),
        expected=0,
    ),
]
