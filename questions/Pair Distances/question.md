# Pair Distances


You are an archaeologist excavating relics from an ancient tribe. 
So far, for each relic that has been excavated another identical relic has also been found.
It seems that the stronger the relic, the further apart the tribe chose to place them.

## Task
Calculate the distance between each pair in the grid

## Input
Your function takes a single input:
- `grid`: a 2D list of strings. 

## Rules
- Each non-empty string is present two times in the grid.
- The distance between each pair is calculated as the [Euclidean Distance](https://en.wikipedia.org/wiki/Euclidean_distance) rounded down the nearest integer

## Output
Return a dictionary containing the distance between each pair.

## Example
```py
grid = [
        ['A', '' , '', '' , 'B'],
        ['' , '' , '', '' , '' ],
        ['' , '' , '', 'C', '' ],
        ['' , 'B', '', '' , '' ],
        ['C', '' , '', '' , 'A'],
        ]
assert(distances(grid) == {'A': 5, 'B': 4, 'C': 3})
```
is correct