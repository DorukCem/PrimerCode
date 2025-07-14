```py
def tribute_paperwork(items: list[str], compliment: str):
    item_order = []
    item_count = {}

    for item in items:
        if item in item_count:
            item_count[item] += 1
            continue
        item_order.append(item)
        item_count[item] = 1

    result = ""

    for item in item_order:
        count = item_count[item]
        result += f"{item} * {count}\n"
    result += compliment

    return result
```