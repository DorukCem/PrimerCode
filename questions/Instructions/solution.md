```py
def particle_count(particle_count : int, events : list["str"]):
    count = particle_count
    for event in events:
        if event == "STABILIZE":
            break
        elif event == "DOUBLE":
            count = count * 2
        elif event == "GENERATE":
            count += 1
        elif event == "VANISH":
            count -= 1
    return count
```