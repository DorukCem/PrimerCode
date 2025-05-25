```py
def impression(places: list[int|str]):
    result = 0
    for x in places:
        if type(x) is str:
            result += len(x) * 10
        else:
            result += x
    return result
```