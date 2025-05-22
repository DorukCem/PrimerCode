> You should probably keep track of the current streak and the largest streak seen in separate variables

> When a streak ends the largest streak should be equal to either itself or the current streak depending on which is bigger
> ```py
>  max_count = max(count, max_count)
> ```