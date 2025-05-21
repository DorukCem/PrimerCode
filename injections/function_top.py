from typing import *
from dataclasses import dataclass

@dataclass
class TestCase:
    inputs: tuple
    expected: Any