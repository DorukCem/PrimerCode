```py
def find_shelter(grid: list[list[int]]):
    shelter_amount = {}
    height = len(grid)
    for y, row in enumerate(grid):
        for x, tile in enumerate(row):
            left = row[:x]
            right = row[x + 1 :]
            up = [grid[j][x] for j in range(y)]
            below = [grid[j][x] for j in range(y + 1, height)]

            shelter = 0

            if left:
                shelter += max(left) - tile
            if right:
                shelter += max(right) - tile  
            if up:
                shelter += max(up) - tile
            if below:
                shelter += max(below) - tile
                
            shelter_amount[(x, y)] = shelter

    return max(shelter_amount, key=shelter_amount.get)
```