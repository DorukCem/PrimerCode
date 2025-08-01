# Time Travel
You’ve discovered that an **intruder has been in your room** while you were away.
Even worse, they’ve tampered with your **time machine**.
The timeline is extremely fragile, and **any unauthorized jumps through time could lead to disaster**.
Fortunately, the machine keeps periodic logs.
If you can figure out **where time travel has occurred**, you might be able to **reverse the damage**.

## Input
- `logs`: a multiline string where **each line** represents a log entry in this format:
```
[DD/MM/YYYY] [Some text]
```
## Output
You need to count how many times the log entries **go back in time**, meaning the date is **earlier than the date on the previous line**.

In other words, every time a new log entry has a **date earlier** than the one before it, that’s a **time travel**.

Return a integer representing the **number of time travels** found in the logs.

## Example
```py
logs = """[01/01/2000] System started
[02/01/2000] User logged in
[02/01/2000] User restarted module
[01/01/2000] Error: Clock failure
[03/01/2000] User logged out
[02/01/2000] Unexpected reboot
"""

assert(count_time_travels(logs) == 2)
```
is correct because:
- `01/01/2000` comes after `02/01/2000` meaning that a time travel happened
- `02/01/2000` comes after `03/01/2000` meaning that a time travel happened