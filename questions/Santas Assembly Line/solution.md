```py
def output(machines: str):
    import re
    matches = re.findall("\|(.*?)\|", machines)
    
    line = []
    for match in matches:
        inp, out = match.split(":")
        line.append((inp, out))
    
    for i in range(1, len(line)):
        current = line[i]
        prev = line[i-1]

        prev_out = prev[1]
        current_in = current[0]

        if prev_out != current_in:
            return prev_out
        
    # If we have not returned anything yet the last machines output is the answer
    return line[-1][1]
```