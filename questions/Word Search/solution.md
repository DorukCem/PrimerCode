```py
def search(grid: list[list[str]], word):
    if not grid or not grid[0] or not word:
        return 0

    count = 0
    word = list(word)  # For easier comparison
    rows = len(grid)
    cols = len(grid[0])

    for j in range(rows):
        for i in range(cols - len(word) + 1):
            horizontal = grid[j][i : i + len(word)]
            if horizontal == word:
                count += 1

            if j > cols - len(word):
                continue 
            vertical = [grid[k][i] for k in range(j, j + len(word))]
            if vertical == word:
                count += 1

    return count
```