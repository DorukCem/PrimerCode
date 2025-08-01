# Dough-tonator


You are on a mission bake the fluffiest sourdough ever thanks to your coworker's new invention: The **Dough-tonator 5000**.
But there’s a catch.
You quickly discover that the machine is set to **self-destruct** if the recipe is not followed with exact precision.
Apparently, this was designed to prevent unauthorized use.
Luckily, your coworker has also left behind a set of **defusal instructions** for the **Dough-tonator 5000**.
Can you follow them closely enough to bake your masterpiece and avoid a kitchen catastrophe?

## Task
Find all wires that fit the description in instructions

## Input
Your function takes two inputs:
- `instructions`: a string describing the required features of the correct wire (e.g. "WIRE is RED and CURLY").
- `wires`: a multi-line string where each line describes the features of a wire in the machine. Each wire follows the same format (e.g. "WIRE is RED and LONG and CURLY"). 

## Output
You should return the number of wires which fit the description in `instructions`.

## Rules
- A wire must contain every feature listed in the instructions to be considered a match.
- Wires can have additional features beyond what the instruction specifies. That’s okay.
- Matching is case-sensitive and feature order does not matter.

## Example
```py
instructions = "WIRE is RED and CURLY"

wires = """WIRE is RED and LONG and UGLY
WIRE is GREEN and SHORT
WIRE is BLACK
WIRE is RED and CURLY and LONG
"""
assert(defuse(instructions, wires) == 1)
```
is correct because:
- The instruction says the wire must be RED and CURLY.
- Wire 1: RED but not CURLY → Not a match
- Wire 2: GREEN and SHORT → Not a match
- Wire 3: BLACK → Not a match
- Wire 4: RED and CURLY (plus LONG) → 1 match