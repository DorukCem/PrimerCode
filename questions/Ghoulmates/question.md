# Ghoulmates
You are an intern at **Ghoulmates**, the only dating service brave enough to serve the monster community. 
Your clients include **yetis, gorgons, werewolves, and vampires**, and they are not known for their patience.
A bad date could lead to a village being pillaged.
Fortunately, you’ve found a way to pique their interest: by cleverly using details from the **local folklore**.

Your function takes two inputs:
- `person1`: a list of strings describing their interests
- `person2`: another list of strings describing their interests

Return a set of **common interests** in both lists

For example
```py
person1 = ["chasing cars", "howling", "collecting bones"]
person2 = ["sculpting", "collecting bones" ,"opera", "howling"]

assert(find_common(person1, person2) == {"howling","collecting bones"})
```
is correct because both enjoy howling and collecting bones.