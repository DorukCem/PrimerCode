# Ordering Takeout
Three friends — Billy, Jim, and Jeff — are deciding what to order for takeout.
Billy is picky and will only agree to order something if he personally likes it.
Jim and Jeff are more flexible — they’re fine with ordering as long as at least one of them (Jim or Jeff) is okay with the choice.

Your function takes three inputs: `billy`, `jim`, and `jeff`, each a boolean indicating whether that person is okay with the current food option.
Return `True` if Billy is okay with the choice and at least one of Jim or Jeff is also okay with it.
Otherwise, return `False`.

For example
```py
assert(order(True, False, True) == True)
```
should be correct because Billy and at least one of Jim and Jeff is `True`. 