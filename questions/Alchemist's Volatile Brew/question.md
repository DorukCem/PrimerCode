# Alchemist's Volatile Brew
Alia the Alchemist is on the verge of a breakthrough: creating the legendary Potion of Unstable Power. 
To brew it, she must carefully add ingredients from her available stock, one by one, to build its magical potency.
Alia has a specific sequence of ingredients she plans to use. She adds them in the order they appear in the list. If she reaches the end of her ingredients list and the potion isn't ready, she cycles back to the beginning of the list and continues adding ingredients.
The potion is delicate. As soon as its total potency meets or exceeds the activation threshold, it starts to bubble violently. 
At this exact moment, no more ingredients can be safely added, and the brewing process for this attempt stops immediately.
Alia has discovered that any potency achieved beyond this activation threshold is not wasted! It crystallizes into a rare substance known as 'Volatile Essence.' She theorizes this Essence is a crucial component, perhaps even the primary one, needed to ultimately stabilize and complete the Potion of Unstable Power

Your task is to write a function that simulates Alia's brewing process and calculates the amount of 'Volatile Essence' produced.
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