# Word Search
Grandma really enjoys completing word search puzzles.
Lately, though, her eyesight isn’t what it used to be, and she’s been having trouble finding all the words in the puzzle.
Looking over her puzzle, you spot some words right away. Maybe you can complete the puzzle to get her closer to her coupon.

## Input
Your function takes two inputs: 
- `grid`: a 2D list of single-character strings.
- `word`: your target word

## Rules
The `word` can appear either left-to-right in a row or top-to-bottom in a column in the grid.

## Output
Return the number of times the word appears in the grid according to the rules.

## Example
```py
grid =  [
            ["O", "O", "O", "K"],
            ["K", "O", "K", "K"],
            ["O", "O", "K", "O"],
            ["O", "K", "K", "O"],
        ]
                
assert(search(grid, "OK") == 7)
```
is correct