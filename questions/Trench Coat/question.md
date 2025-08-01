# Trench Coat
The elves are at the theme park, eager to enjoy all the marvelous rides.
However, most rides have strict **height requirements**, with both upper and lower limits.
Luckily, the elves have brought a **trench coat**.
Maybe, they can **stack on top of each other** pretending to be a single person.
If their **combined height** fits within the allowed range, they might just get away with it.

## Input
Your function takes two inputs:
- `elves`: a list of integers representing the height of each elf
- `ride_range`: a tuple of two integers (min_height, max_height) representing the acceptable height range for the ride

## Output
Return `True` if **any combination of elves** (of any size, including just one) can stack to form a height that falls **within the ride's range**, inclusive.
Return `False` otherwise.

## Example
```py
gnomes = [42, 30, 58, 70]
ride_range = (140, 160)

assert(fits_range(gnomes, ride_range) == True)
```
is correct because: [30, 58, 70] sums to 158, which fits within (140, 160), so the answer is True. (There can be multiple valid combinations)