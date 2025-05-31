```py
def deal_cards(cards: list[int]):
    turn = 0
    bignis_cards = []
    while len(cards) > 0:
        if turn % 4 == 0:
            if cards[0] > cards[-1]:
                card = cards.pop(0)
            else:
                card = cards.pop(-1)
            bignis_cards.append(card)
        else:
            if cards[0] < cards[-1]:
                card = cards.pop(0)
            else:
                card = cards.pop(-1)
            # We can discard the card since we do not return it
        turn += 1
    return bignis_cards
```