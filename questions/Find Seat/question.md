# Find Seat

You're about to take your seat on **Hash Airlines**, but to your surprise, someone is already sitting there!
You were told that each passenger is assigned a seat based on their unique qualities.
However, you quickly discover that the airline uses something called [**Linear Probing**](https://en.wikipedia.org/wiki/Linear_probing) to resolve seating conflicts.

When a seat is taken, you must move forward one seat at a time until you find an available one.
Now it's up to you to find your seat before the plane takes off.


## Input

Your function takes two arguments:

* `seats`: a list of booleans indicating which seats are taken

  * `True` means the seat is **taken**
  * `False` means the seat is **available**
* `idx`: an integer representing the index of your **original assigned seat**


## Rules

* Start at your assigned seat (`idx`)
* If it is taken (`True`), check the next seat (`idx + 1`), and keep moving forward until you find a seat that is available (`False`)
* You are guaranteed that there is **at least one available seat**


## Output

Return the index of the first available seat you find.

## Example

```python
seats = [False, False, True, True, True, False, False, True] 
idx = 2

assert find_empty(seats, idx) == 5
```
is correct because: Your original seat (`idx = 2`) is taken, so you keep moving forward.
Seats at 2, 3, and 4 are taken, but the seat at index **5** is available.
