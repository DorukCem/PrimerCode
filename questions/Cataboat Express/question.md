Cataboat Express
The **Cataboat Express** prides itself on its signature two-part express journey:
Passengers first cross a river by boat.
Once across, the boat is loaded into a catapult and launched to its final destination.
But today, the river currents have taken over.
Fortunately, the current flows **perpendicular** to the boat’s intended path,
so it won’t slow the boat down, it just **shifts it sideways** as it moves forward.
The only problem?
The catapult must be set up **exactly where** the boat lands in order to keep the express service running on time.
Maybe you can help calculate where the boat will land, so the **Cataboat Express'** name remains untainted.

Your function takes two inputs:
- **distance** which is an integer representing how many forward steps it will take the boat to pass the river.
- **currents** which is aa dictionary mapping integers to integers representing the current's strength at each horizontal position. 
    - The key is the current x-position of the boat, and the value is how much the boat drifts horizontally (left or right) after moving one step forward

The boat starts at position x = 0 and moves forward exactly distance steps. At each step:
1. The boat moves forward by one unit.
2. Then, it checks the current at its horizontal position (x) by looking it up in currents (if it exists), and adjusts its horizontal position accordingly.

Return the final horizontal position of the boat after all forward steps.

For example:
```py
distance = 4
currents = {0: 3, 1: 1,  3:-2}
assert(cataboat_landing(distance, currents) == 3)
```
We will take 4 steps because `distance = 4`
- Start: x = 0
- Step 1: We are at x = 0, currents[0] is equal to 3. Our new x position is 0 + 3 = 3. 
- Step 2: We are at x = 3, currents[3] is equal to -2. Our new x position is 3 - 2 = 1. 
- Step 3: We are at x = 1, currents[1] is equal to 1. Our new x position is 1 + 1 = 2. 
- Step 4: We are at x = 2, the current at that position is 0 since 2 is not a key in our dictionary. Our new x position is 2 + 0 = 2. 
