# Debt King
One of the conditions to become king is to **pay off the debts of every man and woman in the village**.
Thankfully, you discover a helpful simplification: since **you are the one making all the payments**, you don’t need to handle every individual debt.
Instead, for each person, you calculate **how much they are owed in total minus how much they owe**.
Then you only pay those whose net balance is positive, that is, people who are owed more than they owe.
This trick should make your path to the throne a little easier.

Your function takes a single input:
- `ledger`: a multiline string where each line follows this exact format:
```
[name] owes [other_name] [debt_amount] coins
```

To compute the minimum total amount you need to pay:
- If someone is owed more than they owe, you pay them the difference.
- If someone owes more than they are owed, they receive nothing (you don't collect anything from them).
- People who are owed exactly as much as they owe also receive nothing.

Return the total number of coins you need to pay after simplifying all debts as described above.

For example:
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