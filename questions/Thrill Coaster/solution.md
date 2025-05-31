```py
def calculate_thrill(road_heights : list[int]):
    is_ascending = road_heights[0] < road_heights[1]
    prev = road_heights[0]
    anticipation = 0
    thrill = 0
    for h in road_heights[1:]:
        diff = h - prev
        prev = h
        if diff == 0:
            continue
        if is_ascending:
            if diff < 0:
                is_ascending = False
            else:
                anticipation += diff
        else:
            if diff > 0:
                is_ascending = True
                anticipation = 0
            else:
                thrill += abs(diff) * anticipation

    return thrill
```