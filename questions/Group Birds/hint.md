> You can use the add or append method of a dictionary value if it is present
> ```py
> d[x].add(y)
> ```

> When a key is not present
> you need to create an empty set for its value
> ```py
> if x not in d:
>   d[x] = set()
> ```