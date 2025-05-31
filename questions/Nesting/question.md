It’s Christmas, and you’re about to open your gift from your aunt. However, as you start unwrapping it, you encounter a challenge:
Not only does the package contain other packages, but those inner packages may also contain more packages, all nested inside each other!

Your task is to unpack all these layers to reveal the innermost items.

Your function takes a single input `gift`, which is a deeply nested list of lists.
You should return a flat list containing only the innermost items.

For example
```py
assert(flatten([["plushy"], [["Igor CD"],["Blonde CD"],["TPAB CD"]], ["socks", "underwear"]]) == ['plushy', 'Igor CD', 'Blonde CD', 'TPAB CD', 'socks', 'underwear'])
```