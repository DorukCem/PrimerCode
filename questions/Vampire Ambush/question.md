# Vampire Ambush
A vampire has been terrorizing your town. Your aim is to 
**ambush him when he is in his bat form** to strike him when he is fragile. You are gathering 
**logs of all bat sightings** in the area to find the perfect time for the ambush.
Some of these bats are just normal bats but thankfully the vampire bat has some **distinctive qualities**.

## Input
Your function takes a single input 
- `logs` which is a string that follows a special format.

## Rules
The format for each line of `logs` is:
  - Each log is separated by a newline.
  - Each log starts with a time stamp, followed by the dimensions of the bat, followed by the color of the bats eyes

An example log:
```
12:37 23*47 RED
13:52 16*29 BLACK
```

For the above log:
- The first log indicates a bat sighting at `12:37` with dimensions `23*47` and eyes `RED`
- The second log indicates a bat sighting at `13:52` with dimensions `16*29` and eyes `BLACK`

A bat can be identified as vampire if both:
- Its eyes are `"RED"`
- And its total size (the product of its dimensions) is bigger than `400`


## Output
Return a list of all timestamps where the bat is a vampire. The time stamp should be in HH:MM format (same format as the logs)


## Example
```py
logs = """03:53 37*22 RED
04:32 34*10 BROWN
14:00 38*14 BROWN
17:06 25*16 RED"""

assert(find_vampire(logs) == ['03:53'])
```
Is correct because:
- The first bat has red eyes and dimensions `37*22` which means that it has size `37*22 = 814` which is larger than `400` therefore it must be a vampire.
- The second bat has brown eyes meaning that it cannot be vampire
- The third bat has brown eyes meaning that it cannot be vampire
- The fourth bat has red eyes and dimensions `25*16` which means that it has size `25*16 = 400` which is not larger than `400` therefore it cannot be vampire.
Therefore only the first time stamp which is `"03:53"` must be in the list that is returned