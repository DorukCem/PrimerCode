# Hiking Trails
As a hiking trail consultant, your job never ends.
People from all over the country rely on you to help them find a **safe** and **walkable** trail.

Lately, the fatigue is catching up with you, and you're worried you might overlook something important.
Thankfully, you've come up with a **simple rule** to determine if a trail is **completable**.
Now it's time to automate it.


## Task
You want to know if it's possible to complete the trail given how far a hiker can jump over gaps.

## Input
Your function takes two inputs:
- `trail`: a string made up of "#" and "." characters
- `jump_distance`: an integer that represents the maximum number of empty tiles the hiker can jump over
  
## Rules
- `trail` consists of two characters where:
  - `"#"` : Means that the path is filled
  - `"."` : Means that the path is empty

- The trail is completable if the hiker can jump over every gap without exceeding their jump limit.
  - Each gap is a sequence of one or more `"."` characters.
  - If any single gap is wider than jump_distance, the trail cannot be completed. 

## Output
Return `True` if the trial is completable otherwise `False`

## Example
```py
trail = "##.####..###...###"
jump_distance = 3
assert(is_completable(trail, 3) == True)
```
is correct because there are 3 gaps in the trail:
- One "." -> size 1
- One ".." -> size 2
- One "..."" -> size 3

All are within the hiker’s max jump distance of 3, so the trail is completable.