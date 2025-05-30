```py
def avg_decline(reviews: list[int]):
    mid = (len(reviews) + 1 )//2
    first_half = reviews[:mid]
    second_half = reviews[mid:]
    return sum(first_half) / len(first_half) > sum(second_half) / len(second_half)
```