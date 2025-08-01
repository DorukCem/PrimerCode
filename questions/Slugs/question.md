# Slugs

You are a computer science student fresh out of college.
Unable to find any jobs and with some free time, you decide to build a website for solving coding questions.
You want to store each question by its title, for example: "Word Search".
However, this is not a good choice for a URL, since it contains spaces.
You also briefly try using the ID of the question in the URL, but quickly realize that the URL is not human-readable.
Maybe you can write some code to add a **slug** to every question by transforming the title.

## Input
Your function takes a single input 
- `title`: a string.

## Output
Return a slug where 
- All trailing white space has been removed
- All letters are lowercase
- Any group of one or more consecutive spaces between words is replaced by a single hyphen (`"-"`).

## Example
```py
assert(get_slug("Word  Search  ") == "word-search")
```