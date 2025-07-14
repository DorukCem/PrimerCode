# Busiest Time
Our new automated factory line is a marvel of efficiency. But the Operations Chief isn't celebrating yet. 'A system under no stress shows no weakness,' she says. 'I want to know when it's screaming.' She believes that the moment of peak production, when the most units are moving at once, is precisely when a conveyor belt will snap or a robotic arm will jam. Find that single, most frantic moment of activity. That's our bottleneck, our breaking point, and our biggest risk

Your function takes a single input:
- `logs`: A multiline string, where each line represents a machine changing its state.

Each line follows this exact format:
```
[ID] [HH:MM] [Action]
```
- `[ID]`: A unique number or name identifying the machine.
- `[HH:MM]`: The timestamp in 24-hour format (e.g., 14:30).
- `[Action]`: Can be one of two values:
  - `Working`: This means the machine starts working at this exact time.
  - `Sleeping`: This means the machine stops working at this exact time.

Your should return longest continuous period of time where the maximum number of machines were working simultaneously.

For example
```py
logs = """M1 09:00 Working
M2 09:10 Working
M1 09:30 Sleeping
M3 09:40 Working
M2 10:00 Sleeping
M3 10:10 Sleeping
"""

assert(find_busiest(logs) == 20)
```
is correct because:

| Time Range  | Machines Working | Count    |
| ----------- | ---------------- | ---------|
| 09:00–09:10 | M1               | 1        |
| 09:10–09:30 | M1, M2           | 2 <- max |
| 09:30–09:40 | M2               | 1        |
| 09:40–10:00 | M2, M3           | 2 <- max |
| 10:00–10:10 | M3               | 1        |

- The maximum number of machines working at once was 2.
- That occurred during two periods: 09:10–09:30 and 09:40–10:00.
- Both periods lasted 20 minutes.
- So the answer is 20.

Notes: the logs are chronological