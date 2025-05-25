Loop approach
```py
def cast_spell(spell: str):
    result = ""
    searching = False
    for letter in spell:
        if letter == "*":
            start_search = not start_search
            continue

        if start_search:
            result += letter
    
    return result
```

Substring approach
```py
def cast_spell(spell: str):
    first = spell.find("*")
    second = spell[first+1:].find("*")

    return spell[first+1:second]
```