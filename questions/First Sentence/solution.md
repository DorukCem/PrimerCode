```py
def first_sentence(text: str):
    idx = text.find(".")
    first = text[:idx+1]
    return first
```