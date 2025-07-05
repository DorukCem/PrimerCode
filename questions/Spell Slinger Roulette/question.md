# Spell Slinger Roulette
After your victorious exit from the Spellslingers Casino with your reward in hand: 
the "Staff of Limitless Possibilities", you’re suddenly ambushed by a band of goblin thieves.
You do not have your trusted staff on you so your new reward might become useful. The only problem is that it is impossible to predict what the staff will
do once you give it some targets. Given that it is your only chance, you might want to roll the dice once more.

Your function takes two inputs
- `goblins`: A list of integers, representing the health points of each goblin
- `spell`: A function that takes in an integer and returns another integer

You should return the result of applying the spell function to each goblin's health in order and return the transformed list.

For example
```py
assert(cast_spell([1, 4, 3, 2], lambda x: x//2) == [0, 2, 1, 1])
```