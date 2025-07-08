```py
def read_pattern(cards: list[str]):
    num_bits = len(cards[0])
    nums = [int(num, 2) for num in cards]
    result = 0
    for num in nums:
        result = num | result

    binary_string = f"{result:0{num_bits}b}"

    return binary_string
```