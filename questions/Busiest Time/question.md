# Busiest Time



Our new automated factory line is a marvel of efficiency. But the Operations Chief isn't celebrating yet. 'A system under no stress shows no weakness,' she says. 'I want to know when it's screaming.' She believes that the moment of peak production, when the most units are moving at once, is precisely when a conveyor belt will snap or a robotic arm will jam. 

Find that single, most frantic moment of activity. That's our bottleneck, our breaking point, and our biggest risk.

## Task

Track which machines are active at each moment and return the **longest continuous period** during which the **maximum number of machines were working simultaneously**.



## Input

* `logs`: a multiline string, each line following the format:
  `[ID] [HH:MM] [Action]`

Where:

* `ID` is a unique machine name or number
* `HH:MM` is a timestamp in 24-hour format
* `Action` is either:

  * `"Working"` — machine starts working at this time
  * `"Sleeping"` — machine stops working at this time

Logs are guaranteed to be in **chronological order**.



## Output

Return an integer, the length (in minutes) of the **longest continuous period** where the maximum number of machines were working.



## Example

```python
logs = """M1 09:00 Working
M2 09:10 Working
M1 09:30 Sleeping
M3 09:40 Working
M2 10:00 Sleeping
M3 10:10 Sleeping
"""

assert find_busiest(logs) == 20
```

### Explanation:

| Time Range  | Active Machines | Count   |
| ----------- | --------------- | ------- |
| 09:00–09:10 | M1              | 1       |
| 09:10–09:30 | M1, M2          | 2 ← max |
| 09:30–09:40 | M2              | 1       |
| 09:40–10:00 | M2, M3          | 2 ← max |
| 10:00–10:10 | M3              | 1       |

* The max number of working machines was **2**
* That happened during **two separate 20-minute periods**
* So the output is `20`
