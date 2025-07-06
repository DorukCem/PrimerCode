```py
def cataboat_landing(distance: int, currents: dict[int, int]):
    x = 0
    for _ in range(distance):
        drift = currents.get(x, 0)
        x += drift
    return x
```