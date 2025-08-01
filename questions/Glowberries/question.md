# Glowberries


You are a farmer growing Glowberries. Tourist have come over from the underground, obsessed with anything luminescent. 
These tourists are known to spend gold from their mines **generously on anything that shines**.
Your are expecting the crops to be ripe in two to three weeks, but the tourists **can’t wait that long**. 
Fortunately, you remember that tomorrow will be a moonless night. 
Your ancestors have taught you that some **crops can hold a lot of value even if they aren’t fully ripe.**
These are the berries that will **glow unusually**, even somewhat **illuminating the berries around them** which can only be spotted in the dark. 

## Input
Your function takes a single input:
- `farm` which is a 2D list of integers.

## Rules
- A Glowberry is considered special if:
  - It it brighter than all of its neighbors including diagonal neighbors
  - The average brightness of its neighbors is at least the average brightness of the entire farm.
- The farm will always be at least 2x2

## Output
Return the number of special crops that meet these criteria.

## Example
```py
farm = [
        [56, 39, 6, 8, 41],
        [24, 70, 45, 45, 26],
        [59, 6, 42, 46, 36],
        [6, 92, 37, 62, 69],
        [24, 29, 70, 43, 32],
        ]
assert(get_crops(farm) == 1)
```
is correct because there is only one Glowberry fitting this criteria which is 69 located at x = 4, y = 3