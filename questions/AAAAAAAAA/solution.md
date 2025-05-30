```py
def repeat(sound : str, n : int):
    return sound * n
```

Loop approach
```py
def repeat(sound : str, n : int):
    s = ""
    for n in range(n):
        s = s + sound
    return s
```
