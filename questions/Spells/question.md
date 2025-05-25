# Spells
To cast a spell, a wizard must say a few special words.
However, wizards often make their spells sound longer to appear more sophisticated.

Your function takes a single input spell, which is a string.
Return the part between the asterisk (*) symbols — this is the actual magical phrase.

For example
```py
assert(cast_spell("Nam in *clariecto virtinio* porta urna") == "clariecto virtinio")
```
is correct

Notes: There will always be two asterisk (*) symbols present in the string