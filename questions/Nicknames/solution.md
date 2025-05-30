```py
def orc_hierarchy(squad : dict[str, str]):
    names = [name for name in squad]
    names.sort(key= lambda name : len(squad[name].split()), reverse= True)
    return names
```