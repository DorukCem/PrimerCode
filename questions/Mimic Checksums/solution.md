```py
def valid_chests(chests : str):
    names = []
    for line in chests.splitlines():
        name, checksum = line.split()

        current_checksum = ""
        for i in range(1, len(name)):
            prev = name[i-1]
            current = name[i]
            diff = abs(ord(current) - ord(prev))
            current_checksum += str(diff)
        if current_checksum == checksum:
            names.append(name)
    return names
```

