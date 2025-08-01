# Largest Diff


At the end of a board game night, the players compare their final scores.
You are shocked to see how big the gap is between 
the winner and the last-place player. Clearly, some are much better at the game than others.

## Input
Your function takes a single input
- `scores`: a list of integers representing each player's final score.

## Output
Return the difference between the highest and lowest scores, this is called the [range](https://en.wikipedia.org/wiki/Range_(statistics)).

## Example
```py
assert(largest_diff([7, 2, 5, 13, 18, 4, 15, 10]) == 16)
```
is correct because 18 (highest) - 2 (lowest) = 16.