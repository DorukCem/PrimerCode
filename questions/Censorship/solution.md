```py
def censor(file: str, names: list[str]):
   
    result = file
    
    # Replace each name with asterisks of the same length
    for name in names:
        # Replace all occurrences of the name with asterisks
        result = result.replace(name, "*" * len(name))
    
    return result
```