# Debt King

## Story
One of the conditions to become king is to **pay off the debts of every man and woman in the village**.
Thankfully, you discover a helpful simplification: since **you are the one making all the payments**, you don’t need to handle every individual debt.
Instead, for each person, you calculate **how much they are owed in total minus how much they owe**.
Then you only pay those whose net balance is positive, that is, people who are owed more than they owe.
This trick should make your path to the throne a little easier.

## Task 
Compute the total amount you must pay after simplifying all the debts between people.

## Input
Your function takes a single input:
- `ledger`: a multiline string where each line follows this exact format:
```
[name] owes [other_name] [debt_amount] coins
```

## Rules

- For each person, calculate their net balance:
  - Net balance = total amount they are owed minus total amount they owe.
- You only pay people with positive net balances.
- People with zero or negative balances receive nothing


## Output
Return the total number of coins you need to pay after simplifying all debts as described above.

## Example
```py
ledger = """Alice owes Bob 10 coins
Bob owes Charlie 5 coins
Charlie owes Alice 3 coins
"""

assert(pay_debt(ledger) == 7)
```
is correct because:
- Alice owes 10 coins and is owed 3 coins, the net difference is -7 so she gets nothing.
- BoB owes 5 coins and is owed 310 coins, the net difference is 5 so he gets 5 coins.
- Charlie owes 3 coins and is owed 5 coins, the net difference is 2 so he gets 2coins.

In total you have to pay: 0 + 5 + 2 = 7 coins 