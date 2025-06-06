# Shelter
You are the lead scout for a nomadic tribe searching for a new home.
Your tribe has been haunted by storms of magnificent size for ages, forcing them to constantly seek new shelter.
The survivability of any new settlement depends on how well it's shielded from the harsh, cutting winds.

Your function takes a single input grid, which is a 2D list of integers where each integer is the **height** of that tile.
We can determine how sheltered a tile is by summing:
- The difference between the tile’s height and the highest tile in the same column **above** the tile.
- The difference between the tile’s height and the highest tile in the same column **below** the tile.
- The difference between the tile’s height and the highest tile in the same row **to the left** of the tile.
- The difference between the tile’s height and the highest tile in the same row **to the right** of the tile.

Return the index (x, y) of the tile that has the maximum shelter score.

**Note**: If a tile has no other tiles in a particular direction, then the shelter score for that direction is 0.

For example
```py
grid = [
    [72, 61, 61, 91], 
    [91, 88, 97, 34], 
    [14, 68, 47, 82], 
    [10, 91, 65, 13]
]

assert(find_shelter(grid) == (3,1))
```
is correct because if we find the total shelter for each tile
```py
[
    [38, 71, 77, -28], 
    [-90, -12, -137, 168], 
    [141, 3, 124, -74], 
    [162, -110, 6, 156]
]
```
we can see that that index `(3, 1)` has the maximum amount of shelter
