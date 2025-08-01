# Skitter's Scatter 

It turns out that the Staff of Limitless Possibilities is not totally random, it **pseudo-random**. 
Its unpredictable nature stems from Skitter, a frazzled creature eternally bound to the artifact as punishment for an ancient gambling debt.
Each time a spell is cast, Skitter must perform the "Entropy Scramble": frantically collecting chaotic energies from the immediate surroundings. 
These energies manifest as numbers which Skitter shoves into the Staff's core.

## Input
Your function takes a single input 
- `entropy`: a list of integers.

## Task
Create and return a function following the rules

## Rules
- Square each number in the entropy list and sum the results to get a single **output** value.
- Based on the value of the **output**:
  - If the output is divisible by 2, return a function that performs **integer division** using this output as the divisor.
  - If the output is divisible by 3 (but not 2), return a function that **adds** the output to its input.
  - Otherwise, return a function that performs the **modulo** operator on its input using the output as the divisor.

## Output
Return a function that takes in an integer as an input and outputs another integer

## Example
```py
spell = generate_spell([1, 2, 3])
tester = lambda x : x//14
for i in range(100):
    assert(spell(i) == tester(i))
```
is correct because:
- output is equal to: `1*1 + 2*2 + 3*3 = 14`
- 14 is divisible by 2 so the first case applies
