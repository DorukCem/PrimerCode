# Longest Streak

In a tribe, warriors earn their reputation through wrestling matches. The warrior with the longest unbroken streak of wins or draws is considered the highest-ranking.

## Input
Your function takes a single input 
- `matches`: a list of booleans representing the match results of a tribesmen.

## Rules
In this list, `True` represents a win or draw, while `False` represents a loss.

## Output
Return the longest consecutive sequence of `True` values in the list.

## Example
```py
assert(longest_streak([True, False, True, True, True, False]) == 3)
```
is correct because the longest streak of wins is 3 starting at index 2