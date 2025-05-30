# Doppelgangers
The crew of the Hitchhikers spacecraft is on their way to the Restaurant at the End of the Universe to witness the Big Crunch.
However, the ship has become infested with Doppelgangers after an unfortunate accident with the Multipler machine on deck.
While the crew didn’t mind the extra people at first, voting has become a problem, since everybody has exactly one vote.
People with more doppelgangers have started to dominate the majority vote in every issue — which has started to annoy some of the lonely, unique individuals.
One of those individuals is now devising a plan to fix this imbalance.

Your function takes a single input `crew_members`, which is a list of strings containing the names of each crew member.
You should return a list containing only the first instance of each name, preserving the original order.

For example
```py
assert(remove_doppelgangers(["Arthur", "Ford", "Trillian", "Ford", "Ford", "Zaphod", "Ford", "Marvin", "Zaphod", "Trillian", "Marvin"]) == ["Arthur", "Ford", "Trillian", "Zaphod", "Marvin"])
```
is correct