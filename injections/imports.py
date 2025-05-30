from dataclasses import dataclass

@dataclass
class TestCase:
    inputs: tuple
    expected: ...