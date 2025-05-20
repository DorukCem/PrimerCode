We can loop through arr_1 and arr_2 while appending their elements to a list 
```py
def concat(arr_1, arr_2):
    result = []
    for x in arr_1:
        result.append(x)
    for x in arr_2:
        result.append(x):
    return result
```

We can also use the + operator to combine the lists:
```py
def concat(arr_1, arr_2):
    return arr_1 + arr_2
```
