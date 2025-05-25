# Reverse Talk
Ed and Eddy have come up with a way to talk without their mom understanding them:
they simply reverse each word they say.

Your function takes a single input sentence, which is a string containing words separated by single spaces.
Each word in the sentence is written in reverse.

To decode what they’re saying, reverse each word individually and return the resulting sentence.

For example:
```py
assert(decipher_reverse("steL piks loohcs worromot") == "Lets skip school tomorrow")
```
is correct because each word has been reversed individually.