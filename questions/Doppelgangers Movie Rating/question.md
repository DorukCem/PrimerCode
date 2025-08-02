# Doppelgangers Movie Rating


After a failed attempt to remove the doppelgangers by the lonely unique crew members,
the crew has agreed that **all doppelgangers of the same person must now share a single vote**; one vote per unique person.

After every movie night, the movie is rated by all crew members to decide if it should be replayed in the future.
As time has passed, the doppelgangers have now evolved to the point **where each of them can rate the movie differently**.
Under the new voting system, it has been decided that the **average rating given by all doppelgangers of a person will be counted as that person’s final rating**.

## Task
Find the average rating for a movie while accounting for the rule for doppelgangers

## Input
Your function takes a single input ratings, which is a list of tuples, where for each tuple:
- The first element is the name of the person (string)
- The second element is the rating that person gave (a number)

## Output
You need to return the overall average rating, after collapsing all duplicate names by averaging their ratings into a single rating per unique person.

## Example
```py
assert(average_rating([("Arthur", 5), ("Ford", 7), ("Arthur", 7), ("Zaphod", 4), ("Arthur", 10), ("Zaphod", 2), ("Marvin", 4)]) == 6.0)
```
Is correct because `((5+7+10)/3 + 7  + (4+2) + 4) / 4  = 6.0`