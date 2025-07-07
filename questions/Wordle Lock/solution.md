```py
def generate_password(answer : str, guesses : list[str]):
    results = []

    for guess in guesses:
        grid = ""
        for a,b in zip(guess, answer):
            if a == b:
                grid += "2"
            elif a in answer:
                grid += "1"
            else:
                grid += "0"
        results.append(grid)
        
    results = [int(r, 3) for r in results]

    product = 1
    for r in results:
        product *= r

    return product
```