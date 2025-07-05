# Hash Avoidance
[Hash sets](https://en.wikipedia.org/wiki/Hash_table) usually use a list internally to store their elements.
When a new element is added, its index in the list is determined by applying a transformation called a [hash function](https://en.wikipedia.org/wiki/Hash_function).
However, if the calculated index is already occupied, a [collision resolution](https://en.wikipedia.org/wiki/Hash_collision) method must be used to find the next available spot.

Your function takes two arguments:
- table: a list containing integers and None values, representing a partially filled hash table.
- numbers_to_add: a list of integers to insert into the table.

To find the initial index for inserting a number x, use the formula:
```py
idx = int(x / 2)
```
If that index in the table is already taken (i.e. not None), use [linear probing](https://en.wikipedia.org/wiki/Linear_probing): move to the next index until you find an empty spot (None).

Assume the table is always large enough and will not need to grow.
Assume that there will always be an empty index to the right if the current one is occupied

For example
```py
assert(hash_avoidance([1, None, None, 6,  None], [1, 2, 2]) == [1, 1, 2, 6 ,2])
```
This is correct because:
- 1 → idx=0, but 0 is taken → go to index 1 
- 2 → idx=1, index 1 is now taken → go to index 2 
- 2 → idx=1, index 1 and 2 are taken → go to index 3 (already has 6) → go to index 4 
