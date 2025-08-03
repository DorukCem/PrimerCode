# Sightseeing Impressions


While traveling, Lucy records her impressions of the places she visits. She usually rates them with a number from 0 to 10.
However, when she’s especially amazed, she might write an expression like “wow” instead of a number.

## Input
Your function takes a single input
- `places`, which is a list containing both numbers and strings. Each item represents how much Lucy liked a place.

## Rules
For each item:
- If the item is a number, it should be added as-is.
- If the item is a string, its value is equal to 10 times its length.

  
## Output  
Return the total sum of all values in the list calculated with the rules described above.

## Example
```py
assert(impression([5, 6, "wooow", 0, 3]) == 64)
```
Should be correct because: 5 + 6 + 10*5 + 0 + 3 = 64