```py
def chunk_by(birds: list[str]):
    result = {}
    for bird in birds:
        length = len(bird)
        if length not in result:
            result[length] = set()

        result[length].add(bird)
    return result
```
Using `defaultdict`
```py
def chunk_by(birds: list):
    from collections import defaultdict
    result = defaultdict(set)
    for bird in birds:
        result[len(bird)].add(bird)

    return result
```