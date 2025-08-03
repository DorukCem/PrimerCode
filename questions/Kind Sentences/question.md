# Kind sentences

You are programming a new state-of-the-art robot butler, "MannersBot 9000". This robot is designed to be the pinnacle of service, but it has one specific quirk in its personality core: it will only **follow commands it deems "polite."**

## Input
Your function takes a single input 
- `sentence`: a string.

Return `True` if the `sentence` contains the word `"please"`, **regardless of casing**. Otherwise, return `False`.

## Example
```py
assert(is_kind("Please help me") == True)
```
is correct because it has the word "please" in it