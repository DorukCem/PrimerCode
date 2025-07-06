```py
def defuse(instructions: str, wires: str):
    def parse_wire(wire: str):
        part_to_skip = len("WIRE is ")
        features = wire[part_to_skip:]
        features = [x for x in features.split() if x != "and"]
        return features
    
    required = parse_wire(instructions)
    count = 0
    for wire in wires.splitlines():
        features = parse_wire(wire)
        all_present = True
        for required_feature in required:
            present = required_feature in features
            all_present = all_present and present
        if all_present:
            count += 1 
    return count
```