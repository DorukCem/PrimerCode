```py
def string_lang_to_py(token : str):
    prefix = token[0]
    rest = token[1:]

    if token == "b":
        return bool(rest)
    elif token == "i":
        return int(rest)
    elif token == "f":
        return float(rest)
    elif token == "s":
        return rest
```