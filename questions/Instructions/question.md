# Instructions
Scientists are tracking a newly discovered particle.
This particle displays extraordinary behavior — such as suddenly duplicating itself or vanishing from existence.

Due to its unpredictable nature, once an experiment starts, it becomes impossible to directly count the number of particles in the system.
Thankfully, the particle can only perform a few well-understood and observable actions:
- DOUBLE  Doubles the number of particles in the system
- VANISH : Removes one particle from the system
- GENERATE : Adds one new particle to the system
- STABILIZE : The system stabilizes and any event occurring after this has no effect.

The scientist hope that they can conclude the number of particles in the system by using this knowledge.

Your function will take two inputs:
- particle_count: an integer representing the starting number of particles
- events: a list of strings, where each string is one of:
    - `"GENERATE"`
    - `"VANISH"`
    - `"DOUBLE"`
    - `"STABILIZE"`

You should return the number of particles in the system after all events have played out

For example:
```py
assert(particle_count(3, ["GENERATE", "DOUBLE", "VANISH", "DOUBLE", "VANISH", "STABILIZE", "DOUBLE", "DOUBLE", "GENERATE", "VANISH", "VANISH"]) == 13)
```
is correct 