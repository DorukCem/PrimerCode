## Censorship

It's time to release top secret files to the public.
However, **some information must remain hidden** — for the safety of the public, of course.

## Input
Your function takes two inputs
- `file`: a string containing the full text of the file.
- `names`: a list of strings, each representing a sensitive name that must be censored.

## Output
Return a version of the file where every occurrence of any name in the list is replaced with asterisks (`"*"`) of the same length.

## Example
```py
file = "Agent Alice met Agent Bob at the secret base. Alice handed the file to Bob."
names = ["Alice", "Bob"]

censored_version = "Agent ***** met Agent *** at the secret base. ***** handed the file to ***."

assert(censor(file, names) == censored_version)
```