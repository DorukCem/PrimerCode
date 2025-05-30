```py
def remove_doppelgangers(crew_members : list[str]):
    unique = []
    seen = set()
    for member in crew_members:
        if member in seen:
            continue
        seen.add(member)
        unique.append(member)
    return unique
```
We could have also just checked `if member in unique` but as the number of unique members increase
a set becomes more efficient. 

However for small sample sizes both approaches are fine.

[More about sets vs lists](https://stackoverflow.com/questions/2831212/python-sets-vs-lists)
