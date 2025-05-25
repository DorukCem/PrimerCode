```py
def divide_list(arr: list[int]):
    if len(arr) <= 1:
        return (arr, [])

    if len(arr) % 2 == 1:
        mid = arr[len(arr) // 2 ]
    else:
        mid = (arr[len(arr) // 2-1] + arr[len(arr) // 2 ]) / 2

    left = []
    right = []
    for x in arr:
        if x <= mid:
            left.append(x)
        else:
            right.append(x)

    return left, right
```