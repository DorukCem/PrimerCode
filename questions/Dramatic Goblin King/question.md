# The Overly-Dramatic Goblin King
The Goblin King demands **tribute**, but he's a stickler for **paperwork**. 
All tribute reports must be a **string formatted with each item, its quantity, and a mandatory compliment**, or he'll throw a royal tantrum.

Your function takes two inputs:
- `items` : a list of strings representing tribute items, possibly with repeats
- `compliment`: a string representing a mandatory message to flatter the Goblin King

Return a string that follows this exact format:
Each item should appear once, in the order it first appears, followed by how many times it appeared in the list.
Each line should look like this:
```css
[item_name] * [item_count]
```
At the end, add a line with the compliment.

For example
```py
items = ["gold_stick", "silver coin", "sword", "silver coin"]
compliment = "To our great Goblin Lord"

expected = """gold_stick * 1
silver coin * 2
sword * 1
To our great Goblin Lord"""

assert(tribute_paperwork(items, compliment) == expected)
```
is correct