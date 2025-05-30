```py
def cast_spell(goblins: list[int], spell):
    return [spell(goblin) for goblin in goblins]
```