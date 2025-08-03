```py
def string_lang_to_py(token: str):
    t, rest = token[0], token[1:]
    match t:
        case "b":
            return rest == "True"
        case "i":
            return int(rest)
        case "f":
            return float(rest)
        case "s":
            return rest
```