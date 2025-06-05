```py
def get_slug(title: str):
    return "-".join(title.strip().split()).lower()
```