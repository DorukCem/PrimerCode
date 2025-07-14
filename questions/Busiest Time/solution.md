```py
def find_busiest(logs: str):
    working = set()
    prev_time = None

    slots = []

    for line in logs.splitlines():
        machine_id, time, action = line.split()
        time = [int(x) for x in time.split(":")]
        num_workers = len(working)

        if action == "Working":
            working.add(machine_id)
        else:
            working.discard(machine_id)

        if prev_time == None:
            prev_time = time
            continue

        time_diff = 60 * (time[0] - prev_time[0]) + (time[1] - prev_time[1])

        slots.append((num_workers, time_diff))

        prev_time = time

    max_slot = max(slots)
    max_time = max_slot[1]
    return max_time
```