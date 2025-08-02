# Average Decline



Unsatisfied with his last experiment, our critic from last time still has his suspicions that the quality of dishes in restaurants decline over time.
This time he intends to use a "better" method.


## Input
Your function takes a single input:
- `reviews`, which is a list of numbers representing the quality ratings of each dish.

## Output
Return `True` if average of the first half of the reviews is greater than the average of the second half of the reviews. Otherwise return `False`.

## Rules
- For lists with odd number of items, the middle element is part of the first half


## Example

```py
assert(avg_decline([4, 3, 5, 8, 6, 1, 2]) == True)
```

is correct because (4+3+5+8)/4 > (6+1+2)/3