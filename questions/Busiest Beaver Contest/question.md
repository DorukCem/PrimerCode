# Busiest Beaver Contest
The beavers are competing to see who can perform the longest routine.
You have been selected as a judge to find the [busiest beaver](https://en.wikipedia.org/wiki/Busy_beaver), the one whose routine runs the longest.
However, once the routines begin, you quickly realize it's nearly impossible to follow what’s happening in real-time.
Thankfully, each beaver submitted their routine in advance.
Now, it’s your job to simulate each beaver's program and determine how busy they really are in order to give them a fair rating.

Your function takes a single input 
- **beaver_program**: a multiline string where each line is an instruction following a strict format.

There are two types of instructions:
1. Assignment statements
   - format:  `[variable name] = [value]`
   - This sets a variable to a specific value.
   - example: `x = 1`
2. Jump statements
   - format: `IF [variable name] is [value] JUMP [line number] ELSE [line number]`
   - This checks the value of a variable and jumps to a specific line based on the result.
   - example: `IF x is 1 JUMP 3 ELSE 5`. This means: If x is 1, go to line 3 next. Otherwise, go to line 5.

Rules:
- **Line numbers are 1-indexed**, the first instruction is line 1.
- Execution starts at the first line.
- An instruction is considered **executed** when it is evaluated (even if it just jumps).
- The program terminates if it tries to jump to a line number **outside the valid range** (less than 1 or greater than the number of lines).
- If a variable is used in a jump before it has been assigned, the jump statement will always follow the ELSE path.

Return the **total number of instructions** that were executed **before termination**.

For example:
```py
beaver_program = """state = 0
IF state is 1 JUMP 6 ELSE 3
state = 1
IF state is 1 JUMP 2 ELSE 5
state = 99
state = 0"""

assert(find_busy(beaver_program) == 6)
```
is correct because:
   1. Line 1: state becomes 0. 
   2. Line 2: state is 0, takes ELSE. Jumps to line 3. 
   3. Line 3: state becomes 1. 
   4. Line 4: state is 1, takes JUMP path. Jumps to line 2. 
   5. Line 2: state is 1, takes JUMP path. Jumps to line 6. 
   6. Line 6: state is 0.

Program has terminated with 6 lines executed.