```py
def get_crops(farm: list[list[int]]):
    height = len(farm)
    width = len(farm[0])

    def get_neighbor_coords(x, y):
        coords = []
        for i in range(x - 1, x + 2):
            for j in range(y - 1, y + 2):
                if i >= width or i < 0 or j >= height or j < 0:
                    continue
                if i == x and j == y:
                    continue

                coords.append((i, j))
        return coords

    avg = sum([sum(row) for row in farm]) / (width * height)

    count = 0
    for y, row in enumerate(farm):
        for x, berry in enumerate(row):
            neighbor_brightnesses = [
                farm[ny][nx] for nx, ny in get_neighbor_coords(x, y)
            ]
            avg_neighbor = sum(neighbor_brightnesses) / len(neighbor_brightnesses)
            if berry > max(neighbor_brightnesses) and avg_neighbor > avg:
                count += 1
    return count
```
