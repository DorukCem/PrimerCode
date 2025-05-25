```py
def impression(text: str):
    idx = text.find(".")
    first_sentence = text[:idx+1]
    return first_sentence
```