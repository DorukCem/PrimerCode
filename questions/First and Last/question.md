# First and Last
A food critic suspects that restaurants serve better food at the beginning and gradually decline in quality over time.
To test this theory, the critic compares the first and last dish he was served at each restaurant.

Your function takes a single input reviews, which is a list of numbers representing the quality ratings of each dish.
Return `True` if the first rating in the list is greater than the last; otherwise, return `False`.

For example
```py
assert(first_last([3, 2, 1]) == True)
```
must be correct because the first element (3) is bigger than the last (1)