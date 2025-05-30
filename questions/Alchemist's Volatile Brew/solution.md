```py
def brew(ingredients: list[str], threshold: int):
    total_potency = 0
    ingredients_added = 0
    while total_potency < threshold:
        idx = ingredients_added % len(ingredients)
        next_ingredient = ingredients[idx]
        ingredients_added += 1
        potency = len(next_ingredient) * ingredients_added 
        total_potency += potency
    return total_potency - threshold
```