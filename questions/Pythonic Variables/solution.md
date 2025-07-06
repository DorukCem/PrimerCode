```py
def to_snake(word: str):
    snake = word[0].lower() 

    for letter in word[1:]:
        if letter.isupper():
            snake += "_"
        snake += letter.lower()
    return snake
```