# Bottom Dealing
The grandest wizards in the SpellSlingers Casino have summoned Bigni the Imp to the overworld to fill an empty seat at the poker table. 
Competing against wizards with sharp minds – which are now further amplified by 'Raise Intellect' spells – Bigni decides that he will have to
create his own luck. He decides to return to the underworld with riches thanks to a little trick called [Bottom Dealing](https://en.wikipedia.org/wiki/Bottom_dealing).

Your function takes a single input `cards`, which is a list of integers representing the card values. 
At each dealing turn:
- Bigni deals a card every fourth turn, that is, on turns 0, 4, 8, etc. (0-indexed).
    - On Bigni’s turns, he wants the highest card available between the top and bottom of the deck.
- On all other turns (the wizards’ turns):
    - They receive the lowest card available between the top and bottom of the deck.

At each step, remove only one card from either end of the deck.
Return a list of the cards that Bigni deals himself, in the order he receives them.

For example:
```py
assert(deal_cards([3, 1, 7, 5, 9, 2, 8, 6]) == [6, 8])
```
is correct because:
- 0 : Bigni takes the highest of 6,3 to himself
- 1 : 3 < 8 so 3 is dealt to a wizard
- 2 : 1 < 8 so 1 is dealt to a wizard
- 3 : 7 < 8 so 7 is dealt to a wizard
- 4 : Bigni takes the highest of 8,5 to himself
- 5 : 2 is dealt
- 6 : 5 is dealt
- 7 : 9 is dealt