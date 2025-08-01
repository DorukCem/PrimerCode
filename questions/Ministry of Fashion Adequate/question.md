# Ministry of Fashion Adequate


Welcome to your first day at the Ministry of Fashion Adequate. 
Our Glorious Leader's aesthetic sensibilities are as magnificent as they are... volatile.

## Task
Your job is to parse a chronological log containing both:
- law changes
- citizen sightings. 

You must identify every citizen who was in violation of the active laws at the moment they were sighted.

## Input

Your function takes a single input
- `logs`: a multiline string that follow a strict format representing the chronological log.

## Rules
The logs string consists of lines, each in one of two formats:
1. Law Line: A keyword followed by an item name, separated by a single space.
   - `BAN [ItemName]` : The item becomes illegal to wear.
   - `UNBAN [ItemName]` : The item is no longer illegal.
   - `REQUIRE [ItemName]` : The item becomes mandatory.
   - `UNREQUIRE [ItemName]` : The item is no longer mandatory.
2. Sighting Line: A person's name followed by a colon, then a comma-separated list of items they are wearing (any line that does not start with the above keywords)
   - `[PersonName] : [Item1], [Item2], [Item3]`

- All laws are processed in chronological order. 
- A new law is in effect for all sighting lines that appear after it in the log. 
- All item and person names are case-sensitive.
- Something will never be banned and required at the same time.
- Items and names will always be single word without whitespace

A citizen is considered an offender if, at the time they are spotted, they are:
- Wearing an item that is currently BANNED.
- NOT wearing an item that is currently REQUIRED.

## Output
Return a list of the names of the offenders in chronological order. 

## Example
```py
logs = """REQUIRE Boots
BAN Hat
Jack : Hat, Shorts
Steve : Boots, Trousers
Jill : Trousers
UNBAN Hat
REQUIRE Cape
John : Boots, Trousers, Cape
Martha : Hat, Boots
"""

assert(find_offenders(logs) == ["Jack", "Jill", "Martha"])
```
is correct because:
1. `REQUIRE Boots`: Boots are now mandatory.
2. `BAN Hat`: Hat is now illegal.
3. `Jack : Hat, Shorts`:
    - Jack is wearing a Hat, which is BANNED. (Offender).
    - Jack is not wearing Boots, which are REQUIRED. (Offender).
4.` Steve : Boots, Trousers`:
    - Steve is wearing Boots (Required) and no Hat (Banned). (Compliant).
5. `Jill : Trousers`:
    - Jill is not wearing Boots, which are REQUIRED. (Offender).
6. `UNBAN Hat`: Hat is no longer illegal.
7. `REQUIRE Cape`: Cape is now mandatory. Boots remain mandatory.
8. `John : Boots, Trousers, Cape`:
    - John is wearing Boots (Required) and a Cape (Required). (Compliant).
9. `Martha : Hat, Boots`:
    - Martha is not wearing a Cape, which is REQUIRED. (Offender).