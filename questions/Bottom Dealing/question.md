# Bottom Dealing



The grandest wizards in the SpellSlingers Casino have summoned Bigni the Imp to the overworld to fill an empty seat at the poker table.
Competing against wizards with sharp minds – now further amplified by *Raise Intellect* spells – Bigni decides he’ll need to create his own luck.
He plans to return to the underworld with riches, thanks to a little trick called [Bottom Dealing](https://en.wikipedia.org/wiki/Bottom_dealing).


## Task

Simulate the card dealing process and determine which cards Bigni deals to himself.


## Input

* `cards`: a list of integers representing the card values in the deck. Cards are dealt from either the **top (start)** or **bottom (end)** of the list.


## Rules

* The game proceeds in turns, starting at turn `0` (0-indexed).
* On every 4th turn (`0`, `4`, `8`, ...), it’s **Bigni’s turn**:

  * He takes the **higher** of the two cards available at the top and bottom.
* On all other turns, a wizard takes the **lower** of the two cards.
* Only one card is removed per turn, from either end.
* The process continues until no cards remain.


## Output

Return a list of the card values Bigni collects, in the order he takes them.


## Example

```python
assert deal_cards([3, 1, 7, 5, 9, 2, 8, 6]) == [6, 8]
```

Explanation:

* Turn 0 (Bigni): chooses max of `3` and `6` → takes `6`
* Turn 1 (Wizard): chooses min of `3` and `8` → takes `3`
* Turn 2 (Wizard): chooses min of `1` and `8` → takes `1`
* Turn 3 (Wizard): chooses min of `7` and `8` → takes `7`
* Turn 4 (Bigni): chooses max of `5` and `8` → takes `8`
* Turn 5 (Wizard): chooses min of `5` and `2` → takes `2`
* Turn 6 (Wizard): chooses min of `5` and `9` → takes `5`
* Turn 7 (Wizard): chooses min of `9` and `9` → takes `9`

Bigni's cards: `[6, 8]`
