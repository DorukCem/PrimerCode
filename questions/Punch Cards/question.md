# Punch Cards
The **Legacy Toymaking** department is in a bit of a pickle.
They’ve uncovered a schematic for a classic wind-up robot, but the design is stored on a stack of extremely old punch cards.
The mechanical reader, unused since the old days, produces **gibberish** when trying to read the cards one at a time.
Fortunately, you find the **original manual** for the reader, which clearly states that the punch cards must be **fed as a complete stack**, not individually.

Your function takes one input:

- `cards`: a list of strings. Each string represents a card. The card is made up of `"0"`s and `"1"`s, where:
    - `"0"` means there is a **hole** in that position,
    - `"1"` means the card is **solid** at that position.

All the strings in the list are the same length.

When the cards are stacked on top of each other, a column is considered:
- a hole (`"0"`) only if all cards have a hole (`"0"`) in that column.
- filled (`"1"`) otherwise (i.e., if any card has a `"1"` at that position).

Your function should return a single string with the same format that shows the **final pattern** when the cards are stacked.

For example
```py
cards = [
    "01001",
    "01101"
    "10000"
]

assert(read_pattern(cards) == "11101")
```
is correct because:
- Column 0: `"0"`, `"0"`, `"1"` → at least one `"1"` → filled → `"1"`
- Column 1: `"1"`, `"1"`, `"0"` → at least one `"1"` → filled → `"1"`
- Column 2: `"0"`, `"1"`, `"0"` → at least one `"1"` → filled → `"1"`
- Column 3: `"0"`, `"0"`, `"0"` → all `"0"`s → hole → `"0"`
- Column 4: `"1"`, `"1"`, `"0"` → at least one `"1"` → filled → `"1"`

Final result: "11101"