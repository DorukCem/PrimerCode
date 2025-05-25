# Divide List
A [divide-and-conquer](https://en.wikipedia.org/wiki/Divide-and-conquer_algorithm) 
algorithm recursively breaks down a problem into two or more 
sub-problems of the same or related type until these become simple enough to be solved directly.

Your function takes a single input arr, which is a list of integers.
Determine a pivot value from the list as follows:
- If the list has an odd number of elements, the pivot is the middle element.
- If the list has an even number of elements, the pivot is the average of the two middle elements.

You should return two lists
- A list containing all elements less than or equal to the pivot.
- A list containing all elements greater than the pivot.

For example
```py
assert(divide_list([1,2,3,4,5] == ([1,2,3], [4,5])))
assert(divide_list([2,4,6,8] == ([2,4], [6,8])))
```
are correct

This is how the partition step in [QuickSort](https://en.wikipedia.org/wiki/Quicksort) works. However, there are different methods for selecting the pivot.