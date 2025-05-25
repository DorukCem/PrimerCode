```py
def hash_avoidance(table: list[int], numbers_to_add: list[int]):
    for num in numbers_to_add:
        idx = int(num)/2
        while table[idx] != None:
            idx += 1
        table[idx] = num
```