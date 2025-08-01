# Spells
To cast a spell, a wizard must say a few special words.
However, wizards often **make their spells sound longer to appear more sophisticated**.

## Input
Your function takes a single input 
- `spell`, which is a string.

## Output
Return the part between the asterisk (`*`) symbols inside the string `spell`; this is the actual magical phrase.

## Rules
- There will always be two asterisk (`*`) symbols present in the string

## Example
```py
assert(cast_spell("Nam in *clariecto virtinio* porta urna") == "clariecto virtinio")
```
is correct
