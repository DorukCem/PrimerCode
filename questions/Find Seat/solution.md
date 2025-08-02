```py
def find_empty(seats: list[bool], idx: int):
    current = idx
    while seats[current] != False:
        current += 1
    return current
```