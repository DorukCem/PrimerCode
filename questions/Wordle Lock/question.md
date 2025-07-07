# Wordle Lock
Your coworker Gary is both a [Wordle](https://www.nytimes.com/games/wordle/index.html) addict and a paranoid security enthusiast.
This morning, Gary left for a spontaneous vacation, and disaster has struck.
The only copy of a critical presentation is locked on his computer, and the client is flying in tomorrow.
Your boss is already looking at you with those pleading, desperate eyes.
But there’s hope:
Gary, in all his quirky genius, has a very "secure" password system.
Every morning, he solves the daily Wordle, and uses his path to the solution to generate that day's password.
You’re in luck, he left a crumpled sticky note on his desk, listing all of today’s guesses.
You just need to figure out how Gary turns Wordle guesses into a password.

Your function takes two inputs:
- `answer`: a 5 letter lowercase string representing that days answer
- `guesses`: a list of 5 letter lowercase strings representing your coworkers guesses.

After each guess, Gary compares it to the answer and builds a 5-digit ternary number (base-3) based on the result:
Each letter in the guess becomes a digit:
- 0 (gray): Letter is not in the answer at all
- 1 (yellow): Letter is in the answer but in the wrong position
- 2 (green): Letter is in the correct position

Note: Unlike real Wordle, Gary simplifies the yellow rule.
If a letter is in the answer but in the wrong spot, it’s always marked yellow, even if the count is off.

Once a guess is converted into a 5-digit base-3 number, Gary:
1. Converts that number into decimal.
2. Multiplies the values for all guesses together.
3. That final product is his password.

For example:
```py
answer = "today"
guesses = [
    "enjoy",
    "other",
    "wordy",
    "games",
    "today"
]

assert(generate_password(answer, guesses) == 208173240)
```
is correct because:

| Guess | Grid        | Base-3  | Decimal |
| ----- | ----------- | ------- | ------- |
| enjoy | `0 0 0 1 2` | `00012` | 5       |
| other | `1 1 0 0 0` | `11000` | 108     |
| wordy | `0 2 0 1 2` | `02012` | 59      |
| games | `0 1 0 0 0` | `01000` | 27      |
| today | `2 2 2 2 2` | `22222` | 242     |

We then multiply all the decimal values to generate the password:
`5 × 108 × 59 × 27 × 242 = 208173240`