It's Christmas, and you're going to unwrap your gift from your aunt. But as you begin to unwrap it, you're faced with a dilemma:
Not only does the package consist of other packages, but even the inner packages may contain packages in them, all nested one inside the other!

Your task is to unpack all these layers to reveal the innermost items.

Your function takes a single input `gift`, which is a deeply nested list of lists.
You should return a flat list containing only the innermost items.

For example
```py
assert(flatten([["plushy"], [["Igor CD"],["Blonde CD"],["TPAB CD"]], ["socks", "underwear"]]) == ['plushy', 'Igor CD', 'Blonde CD', 'TPAB CD', 'socks', 'underwear'])
```