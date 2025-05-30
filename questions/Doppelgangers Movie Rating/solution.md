```py
def average_rating(ratings: list[tuple[str, int]]):
    total_ratings = {}
    doppel_count = {}

    for name, rating in ratings:
        if name not in total_ratings:
            total_ratings[name] = rating
        else:
            total_ratings[name] += rating

        if name not in doppel_count:
            doppel_count[name] = 1
        else:
            doppel_count[name] += 1

    unique_ratings = []
    for name, total_rating in total_ratings.items():
        count = doppel_count[name]
        average = total_rating / count
        unique_ratings.append(average)

    total_average = sum(unique_ratings) / len(unique_ratings)
    return total_average
```
