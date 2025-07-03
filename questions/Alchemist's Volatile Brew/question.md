# Alchemist's Volatile Brew
You are an alchemist, searching for the Potion of Unstable Power. 
To brew it, you must carefully add ingredients from the available stock, building its magical potency in the process.
You have a specific sequence of ingredients you plan to use. The potion is delicate. 
As soon as its total potency reaches the **activation threshold**, it starts to bubble violently and no more ingredients can be safely added, and the brewing process stops immediately. 
You have discovered that any potency achieved beyond this **activation threshold** is not wasted; it crystallizes into a rare substance which you call 'Volatile Essence.You theorize that this is crucial component needed to ultimately stabilize and complete the Potion of Unstable Power.

Your task is to write a function that simulates this brewing process and calculates the amount of 'Volatile Essence' produced.
The function will take two inputs:
- ingredients_to_add: A list of strings, representing the alchemist's cyclic sequence of ingredients.
- activation_threshold: An integer, the potency level at which the potion activates and stops accepting ingredients.

Brewing Process and Rules:
- Initial State: The potion starts with a potency of 0.
- Ingredient Selection: Ingredients are added one by one from the ingredients_to_add list. If the end of the list is reached, the process continues from the beginning of the list (cyclically)
- Potency Calculation for Each Ingredient:The potency gained from the current ingredient is: length of the ingredient multiplied by the number of total ingredients added counting this one
-  After an ingredient is added  if the total potency of the potion meets or exceeds the activation_threshold, the brewing process stops immediately. No further ingredients are added.

The function should return the amount of 'Volatile Essence' created, which is the total potency minus the activation_threshold after the process stops.

For example
```py
assert(brew(["BAT WINGS", "FROG LEGS", "RAVENS EYE", "CATS TAIL"], 30) == 27)
```
is correct because `1*9 + 2*9 + 3*10 = 57` (The last ingredient is not added because we have already exceeded the threshold)