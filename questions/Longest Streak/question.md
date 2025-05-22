# Longest Streak
In a tribe, warriors earn their reputation through wrestling matches. The warrior with the longest unbroken streak of wins or draws is considered the highest-ranking.

Your function takes a single input matches, which is a list of booleans. In this list, `True` represents a win or draw, while `False` represents a loss.
Write a function to find the longest consecutive sequence of `True` values in the list.

For example
```py
assert(longest_streak([True, False, True, True, True, False]) == 3)
```
must be correct because the longest streak of wins is 3 starting at index 2