```py
def distances(grid: list[list[str]]):
    import math
    distances = {}
    coordinates = {}
    for y, row in enumerate(grid):
        for x, name in enumerate(row):
            if len(name) == 0:
                continue
            if name not in coordinates:
                coordinates[name] = (x,y)
            else:
                x1,y1 = coordinates[name]
                dist = math.sqrt((x1-x)**2 + (y1-y)**2)
                distances[name] = int(dist)
    return distances
```