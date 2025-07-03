# Group Birds
Erg the Ogre loves watching birds but remembering all their names is no easy task for an ogre!
To help himself, Erg decides to group the birds based on how long their names are.

Your function takes one input, birds, which is a list of bird names (strings).
Return a dictionary where:
-Each key is a number representing the length of a bird's name.
- Each value is a set containing all bird names of that length.

For example
```py
assert chunk_by(["pigeon", "crow", "chicken", "flamingo", "raven", "eagle", "duck"]) == {
    6: {"pigeon"},
    4: {"duck", "crow"},
    7: {"chicken"},
    8: {"flamingo"},
    5: {"raven", "eagle"}
}
```
is correct