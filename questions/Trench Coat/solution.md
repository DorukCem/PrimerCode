```py
def fits_range(gnomes: list[int], ride_range: tuple[int, int]):
    def get_all_combinations(lst):
        combinations = [[]]  # Start with empty combination
        
        # For each element in the list
        for element in lst:
            # Create new combinations by adding this element to existing ones
            new_combinations = []
            for existing_combo in combinations:
                # Add a new combination that includes the current element
                new_combinations.append(existing_combo + [element])
            
            # Add all new combinations to our result
            combinations.extend(new_combinations)
        
        return combinations

    combos = get_all_combinations(gnomes)
    for c in combos:
        if ride_range[0] <= sum(c) <= ride_range[1]:
            return True
    return False
```