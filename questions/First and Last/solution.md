Using a negative index to get the last element is the simplest solution
```py
def first_last(reviews):
    first = reviews[0]
    last = reviews[-1]

    return first > last
```

We could also use the length of the array to get the last element since most other languages do not support negative indices.
```py
def first_last(reviews):
    first = reviews[0]
    last_idx = len(reviews)-1
    last = reviews[last_idx]

    return first > last
```