# Mimic Checksums


You’ve finally found the treasure you’ve been searching for!
However, it seems that some chests **are** [Mimics](https://en.wikipedia.org/wiki/Mimic_%28Dungeons_%26_Dragons%29) 
disguised as loot, waiting to devour greedy adventurers.
Thankfully, you came equipped with a checksum formula to **identify** them. Each **real chest** has a **name** and a **checksum** on it.
The Mimics haven’t figured out how to generate valid checksums; they just stamp on random numbers. 

## Task
Your task is to use the name and checksum to tell which chests are real.

## Input
Your function takes a single input:
- `chests`: a multiline string, where each line follows the following format:
```
[name] [checksum]
```

## Rules
- A checksum for a chest is created by measuring the absolute alphabetical distance between each consecutive pair of letters in the name, and joining the results together.
  - The distance between two letters is the absolute difference of their positions in the alphabet. (For example: a=1, b=2, ..., z=26)
- Each name consists of lowercase letters and has at least two characters

## Output
Return a list of names that have a valid checksum in the order they appear in the input `chests`.

# Example
```py
chests = """anna 13013
jack 928
dory 14151
"""

assert(valid_chests(chests) == ["anna", "jack"])
```
is correct because:
- "anna": 
    -a(1), n(14) , n(14) , a(1)
    - Distances: 13, 0, 13
    - Checksum: "13013" is correct

- "jack": 
  - j(10) , a(1) , c(3) , k(11)
  - Distances: 9, 2, 8
  - Checksum: "928" is correct

- "dory":
  -  d(4) , o(15) , r(18) , y(25)
  - Distances: 11, 3, 7
  - Checksum: "14151" is incorrect as it should be "1137" 
  
So we get the final answer `["anna", "jack"]`