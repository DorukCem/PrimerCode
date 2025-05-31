# Bottom Dealing
Bigni the Imp has been summoned to the overworld to play poker. Seated at a table with the grandest wizards at the Spellslingers Casino, Bigni knows he’s outmatched.
Competing against wizards with minds already razor-sharp and now further amplified by potent 'Raise Intellect' spells he decides that he will have to
crate his own luck. Using his cunningness, he decides he’ll leave this table rich — thanks to a little trick called [Bottom Dealing](https://en.wikipedia.org/wiki/Bottom_dealing).

Your function takes a single input `cards`, which is a list of integers representing the card values. 
At each dealing turn:
- Bigni deals a card every fourth turn — that is, on turns 0, 4, 8, etc. (0-indexed).
    - On Bigni’s turns, he wants the highest card available between the top and bottom of the deck.
- On all other turns (the wizards’ turns):
    - They receive the lowest card available between the top and bottom of the deck.

At each step, remove only one card from either end of the deck. q
Return a list of the cards that Bigni deals himself, in the order he receives them.

For example
```py
assert(deal_cards([3, 1, 7, 5, 9, 2, 8, 6]) == [6, 8])
```
Is correct because:
- 0 : Bigni takes the highest of 6,3 to himself
- 1 : 3 < 8 so 3 is dealt to a wizard
- 2 : 3 < 8 so 1 is dealt to a wizard
- 3 : 3 < 8 so 7 is dealt to a wizard
- 4 : Bigni takes the highest of 8,5 to himself
- 5 : 2 is dealt
- 6 : 5 is dealt
- 7 : 9 is dealt