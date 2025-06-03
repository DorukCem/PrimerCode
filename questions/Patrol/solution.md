```py
class Officer:
    def __init__(self, direction, position):
        self.direction = direction
        self.position = position


def patrol_result(grid: list[list[str]], num_intervals: int):
    width = len(grid[0])
    height = len(grid)

    officers: list[Officer] = []
    for j, row in enumerate(grid):
        for i, tile in enumerate(row):
            if tile in ["<", ">", "v", "^"]:
                direction = tile
                position = (i, j)
                officers.append(Officer(direction, position))
    for _ in range(num_intervals):
        for officer in officers:
            x, y = officer.position
            match officer.direction:
                case "<":
                    if x == 0:
                        officer.direction = ">"
                    else:
                        officer.position = (x - 1, y)
                case ">":
                    if x == width - 1:
                        officer.direction = "<"
                    else:
                        officer.position = (x + 1, y)
                case "^":
                    if y == 0:
                        officer.direction = "v"
                    else:
                        officer.position = (x, y - 1)
                case "v":
                    if y == height - 1:
                        officer.direction = "^"
                    else:
                        officer.position = (x, y + 1)

    result = [["." for _ in range(width)] for _ in range(height)]
    for officer in officers:
        x, y = officer.position
        result[y][x] = "X"
    return result
```