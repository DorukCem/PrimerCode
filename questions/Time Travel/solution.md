```py
def count_time_travel(logs: str):
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