# StringLang
StringLang is a programming language where the **only available data type is a string**. While this simplifies some operations (like searching or storage), it creates a challenge: it's hard to tell what kind of data a string represents; whether it's a number, a boolean, or just plain text.

To solve this, StringLang users have adopted a convention: **each string starts with a letter that indicates its intended type**.

Your function takes a single input `token`, which is a string following this convention. 
You should return the equivalent Python value based on its prefix:
- Strings starting with b represent booleans
- Strings starting with i represent integers
- Strings starting with f represent floats
- Strings starting with s represent strings

For example:
```py
assert(string_lang_to_py("bTrue") == True)
assert(string_lang_to_py("i42") == 42)
assert(string_lang_to_py("f3.14") == 3.14)
assert(string_lang_to_py("sHello") == "Hello")
```
are all correct