# Patrol


You are planning a **grand heist**. The only problem is that the place is **patrolled** every night.
Thankfully, you have some insider information: you know the **exact time and location where each officer starts their patrol**.
These officers have been employed for ages and **rarely break their routine**, walking at the same pace their entire shift.
With a bit of calculation, you can **figure out where each officer will be** at heist time.

## Task
Find the final location of each officer in the grid

## Input
Your function takes two inputs:

- `grid`: a 2D list of strings where.
    - A dot `'.'` means that the space is unoccupied.
    - `'>'` means the officer is facing right.
    - `'<'` means the officer is facing left.
    - `'^'` means the officer is facing up.
    - `'v'` means the officer is facing down.
- `num_intervals`: an integer representing the number of time intervals to simulate.

## Rules
- At every interval
  - Every officer moves one tile in the direction they are facing.
  - If they would move out of bounds, instead of moving, they use that interval to turn around (i.e., reverse their direction) without moving.

## Output
You need to return the final state of the grid after applying these rules for `num_intervals` intervals.
Put a single `'X'` at every tile that is occupied by at least one officer and a single '.' to the rest.

## Example
```py
grid = 
        [
            ["v", ".", ".", ".", ".", "."],
            ["v", ".", ".", "<", ".", "."],
            [".", ".", ".", ".", ".", "<"],
            [".", ".", ".", ".", ".", "."],
        ]

result = 
        [
            [".", ".", ".", ".", ".", "."],
            ["X", "X", ".", ".", ".", "."],
            ["X", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", "."],
        ]

assert(patrol_results(grid, 5) == result)
    
```
is correct. We can se that x = 0, y = 2 has two officers but we still put a single 'X'.