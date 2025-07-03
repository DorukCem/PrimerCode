```py
def flatten(gift: list):
    t = []
    for i in gift:
        if not isinstance(i, list):
            t.append(i)
        else:
            t.extend(flatten(i))
    return t
```