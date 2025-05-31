# Thrill Coaster
As a thrill engineer for a new theme park. 
You're tasked with designing the ultimate rollercoaster experience. 
It's not just about height and speed; it's about the psychological build-up and release! You've developed a theory: 
Riders like to build anticipation which which then culminates in a giant descent where all that energy is cashed in as pure Thrill.

Your function takes a single input, `road_heights`, which is a list of integers representing the heights along the roller coaster track.

Here’s how the ride generates maximum thrill:
- During each continuous ascent, riders build Anticipation. The amount of Anticipation gained in each segment is equal to the height increase in that segment.
- This accumulated Anticipation is banked once the ascent phase ends.
- During each continuous descent that immediately follows an ascent phase, thrill is unleashed!
- The thrill generated in each segment of a descent is calculated by multiplying the total Anticipation banked from the preceding ascent phase by the amount of height drop in that segment.
- Flat surfaces have no effect

You should return the total number of thrill generated.

For example
```py
assert(calculate_thrill([0, 1, 4, 15, 20, 10 , 5, 10, 30 , 50, 10, 2]))
```
Is correct because:
- The ascent from 0 to 20 generates 20 anticipation
- The descent from 20 to 5 generates `15 * 20 = 300` thrill 
- the ascent from 5 to 50 generates 45 anticipation
- the descent from 50 to 2 generates `48 * 45 = 2160` thrill
- The total amount of thrill generated is 2460