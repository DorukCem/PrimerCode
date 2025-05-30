```py
def generate_spell(entropy: list[int]):
    output = sum([x*x for x in entropy])
    if output % 2 == 0:
        return lambda x : x//output
    if output % 3 == 0:
        return lambda x : x + output
    
    return lambda x : x % output
```