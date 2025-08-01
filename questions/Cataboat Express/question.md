# Cataboat Express



The **Cataboat Express** prides itself on its signature two-part express journey:
Passengers first cross a river by boat.
Once across, the boat is loaded into a catapult and launched to its final destination.
But today, the river currents have taken over.
Fortunately, the current flows **perpendicular** to the boat’s intended path,
so it won’t slow the boat down, it just **shifts it sideways** as it moves forward.
The only problem?
The catapult must be set up **exactly where** the boat lands in order to keep the express service running on time.
Maybe you can help calculate where the boat will land, so the **Cataboat Express'** name remains untainted.


## Task

Simulate the boat's horizontal position as it moves across the river, adjusting for side currents at each step.

## Input

* `distance`: an integer representing how many forward steps it will take the boat to pass the river.
* `currents`: a dictionary mapping integers to integers, representing the current's strength at each horizontal position.
  * The key is the boat’s **current** horizontal position `x`
  * The value is how much it drifts **left (-)** or **right (+)** after moving forward


## Rules

* The boat starts at `x = 0`
* For each of the `distance` steps:

  1. The boat moves forward (this does **not** affect `x`)
  2. Then the boat checks its **current** `x` position in `currents`

     * If a value exists, it drifts horizontally by that amount
     * If not, it stays on the same `x`


## Output

Return an integer, the **final horizontal position** of the boat after all steps.


## Example

```python
distance = 4
currents = {0: 3, 1: 1, 3: -2}

assert cataboat_landing(distance, currents) == 2
```

### Explanation:

| Step | Position `x` | Drift Source      | Drift | New `x` |
| ---- | ------------ | ----------------- | ----- | ------- |
| 1    | 0            | currents\[0] = 3  | +3    | 3       |
| 2    | 3            | currents\[3] = -2 | -2    | 1       |
| 3    | 1            | currents\[1] = 1  | +1    | 2       |
| 4    | 2            | no current        | +0    | 2       |

Final `x` position is `2`.
