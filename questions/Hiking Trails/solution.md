```py
def is_completable(trail: str, jump_distance: int):
    count = 0
    for c in trail:
        if c == "#":
            count = 0
        else:
            count += 1
        if count > jump_distance:
            return False
    return True
```