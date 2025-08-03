```py
def count_time_travels(logs: str):
    date_length = len("[DD/MM/YYYY]")

    dates = []

    for log in logs.splitlines():
        date = log[1 : date_length - 1]  # 1 to len-1 so that we do not get the brackets
        day, month, year = date.split("/")
        date = (year, month, day) 
        dates.append(date)

    count = 0
    for i in range(1, len(dates)):
        prev = dates[i-1]
        current = dates[i]

        if prev > current: 
            count += 1
    return count
```

```py
def count_time_travels(logs: str):
    dates = []
    for line in logs.splitlines():
        date, *_rest = line.split()
        date = date.replace("[", "").replace("]", "")
        d,m,y =  date.split("/")
        dates.append((d,m,y))

    count = 0
    for i in range(1, len(dates)):
        prev = dates[i-1]
        current = dates[i]

        if prev > current:
            count += 1
    return count
```