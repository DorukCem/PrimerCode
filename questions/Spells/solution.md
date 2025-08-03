Loop approach
```py
def cast_spell(spell: str):
    result = ""
    search = False
    for x in spell:
        if x == "*":
            search = not search
            continue
        if search:
            result += x
    return result
```