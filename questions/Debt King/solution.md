```py
def pay_debt(ledger : str):
    net_balances = defaultdict(int)

    for line in ledger.splitlines():
        name1, _, name2, coins, _ = line.split()
        coins = int(coins)
        net_balances[name1] -= coins
        net_balances[name2] += coins
    positive_values = [x for x in net_balances.values() if x > 0]
    return sum(positive_values)
```