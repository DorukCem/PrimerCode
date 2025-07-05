```py
def find_vampire(logs: str):
    result = []
    for log in logs.splitlines():
        time_stamp, dimensions, color = log.split()
        dimensions = [int(d) for d in dimensions.split("*")]
        size = dimensions[0] * dimensions[1]
        if size > 400 and color == "RED":
            result.append(time_stamp)
    return result
```