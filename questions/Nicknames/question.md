# Nicknames
Orc squads are selecting nicknames among themselves. The orc hierarchy for each squad will be based on how good their nickname is. The quality of an orc's nickname is determined by how many words it contains. More words mean a better nickname, as it signifies the orc has many remarkable traits!

Your function takes a single input squad, which is a dictionary where:
- The keys are orc names (strings)
- The values are their chosen nicknames (also strings)

You should return a list of orc names, sorted by the number of words in their nickname, in descending order.
That is, orcs with more words in their nickname should appear earlier in the list.

All orcs will have a unique number of words in their nickname — so no two orcs will be tied.

For example
```py
assert(orc_hierarchy({"Wrug" : "The Champion", "Hig" : "the Maddest One", "Marfu" : "the One and Only ", "Gunug": "Destroyer"}) == ["Marfu", "Hig", "Wrug", "Gunug"])
```
is correct