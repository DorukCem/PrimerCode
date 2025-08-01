# Word Search
Grandma really enjoys completing word search puzzles after every 30 she finishes, she gets a special coupon.
Lately, though, her eyesight isn’t what it used to be, and she’s been having trouble finding all the words in the puzzle.

## Input
Your function takes two inputs: 
- `grid`: a 2D list of single-character strings.
- `word`: your target word
The word can appear either left-to-right in a row or top-to-bottom in a column.

## Output
Return the number of times the word appears in the grid.

## Example
```py
grid =  [
            ["O", "O", "O", "K"],
            ["K", "O", "K", "K"],
            ["O", "O", "K", "O"],
            ["O", "K", "K", "O"],
        ],
                
assert(search(grid, "OK") == 7)
```
is correct