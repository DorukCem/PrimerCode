```py
def longest_streak(matches: list[bool]):
    count = 0
    max_count = 0
    for x in bool_list:
        if x:
            count +=1
        else:
            max_count = max(count, max_count)
            count = 0
    max_count= max(count, max_count) # We have to do this in case the streak does not end on a loss
    return max_count
```