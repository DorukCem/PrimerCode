```py
def calculate_thrill(road_heights : list[int]):
    simplified = []
    for i in range(1, len(road_heights)-1):
        prev = road_heights[i-1]
        current = road_heights[i]
        next_ = road_heights[i+1]

        if prev<=current<=next_:
            continue
        if prev>=current>=next_:
            continue
        
        simplified.append(current)
    
    # Simplifiy the list to only the top and bottom peaks
    simplified = [road_heights[0]] + simplified + [road_heights[-1]]
    
    if len(simplified) < 3:
        return 0
        
    total = 0
    for i in range(1, len(simplified)-1, 2):
        prev = simplified[i-1]
        current = simplified[i]
        next_ = simplified[i+1]

        thrill = current - prev
        total += thrill * (current - next_)
    return total

```