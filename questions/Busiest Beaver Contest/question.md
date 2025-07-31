# Busiest Beaver Contest

## Story

The beavers are competing to see who can perform the longest routine.
You have been selected as a judge to find the [busiest beaver](https://en.wikipedia.org/wiki/Busy_beaver) — the one whose routine runs the longest.
However, once the routines begin, you quickly realize it's nearly impossible to follow what’s happening in real-time.
Thankfully, each beaver submitted their routine in advance.
Now, it’s your job to simulate each beaver's program and determine how busy they really are in order to give them a fair rating.


## Task

Simulate the program line by line and count how many instructions are executed before the program terminates.


## Input

* `beaver_program`: a multiline string where each line is an instruction. Each instruction is one of the following:

  * **Assignment**:
    - Format : `[variable] = [value]`
    - Example : `x = 1`
  * **Jump**:
    - Format : `IF [variable] is [value] JUMP [line number] ELSE [line number]`
    - Example : `IF x is 1 JUMP 3 ELSE 5`



## Rules

* Line numbers are **1-indexed**.
* Execution starts at **line 1**.
* A line is considered **executed** when it's evaluated.
* The program terminates when a jump goes to an invalid line (less than 1 or greater than number of lines).
* If a variable in a jump is **unassigned**, always take the **ELSE** path.



## Output

Return the total number of lines executed before the program terminates.


## Example

```python
beaver_program = """state = 0
IF state is 1 JUMP 6 ELSE 3
state = 1
IF state is 1 JUMP 2 ELSE 5
state = 99
state = 0"""

assert find_busy(beaver_program) == 6
```

Explanation:

1. Line 1: `state = 0`
2. Line 2: `state is 0`, so go to line 3
3. Line 3: `state = 1`
4. Line 4: `state is 1`, jump to line 2
5. Line 2: `state is 1`, jump to line 6
6. Line 6: `state = 0`

Program ends. Total instructions executed: **6**.
