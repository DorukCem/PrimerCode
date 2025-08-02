# Concatenation
The spy agency has started splitting messages into parts to reduce the chances of interception.
You and your partner each receive part of the message.
To reveal the full list of directives, you’ll need to **combine both parts in the correct order**.

## Input
Your function takes two inputs
- `arr_1`: a list of string representing your part of the message
- `arr_2`: a list of string representing your partners part of the message

## Output
Return a single list that combines `arr_1` followed by `arr_2`.

## Example
```py
result = [
    "go to 31415",
    "pick up briefcase",
    "drop briefcase to 15121",
    "return to hideout"
]
assert(concat(["go to 31415", "pick up briefcase"], ["drop briefcase to 15121", "return to hideout"]) == result)
```