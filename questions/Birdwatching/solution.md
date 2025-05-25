```py
def num_birds(birds: str):
    result = 0
    for letter in birds:
        if letter.isdigit():
            result += int(letter)
    
    return result
```