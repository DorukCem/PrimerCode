```py
def search(grid: list[list[str]], word: str):
    len_row = len(grid[0])
    len_col = len(grid)
    count = 0

    # all horizontal
    for row in grid:
        for i in range(0, (len_row-len(word))+1):
            current = "".join(row[i:i+len(word)])
            if current == word:
                count += 1

    # all vertical
    for col in range(len_row):
        current = []
        for i in range(0, (len_col-len(word))+1):
            current = []  
            for j in range(len(word)): 
                current.append(grid[i+j][col])
            current = "".join(current)
            if current == word:
                    count += 1

    return count 
```