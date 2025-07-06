```py
def find_busy(beaver_program: str):
    lines = beaver_program.splitlines()

    current_idx = 0
    variables = {}
    count = 0

    while len(lines) > current_idx >= 0:
        count += 1
        line = lines[current_idx]
        tokens = line.split()
        if len(tokens) == 3:
            # variable assignment
            variable_name, _, value = tokens
            variables[variable_name] = value
            current_idx += 1
        else:
            # jump sttement
            _, variable_name, _, value, _, jump_line, _, else_line = tokens
            if variable_name in variables and variables[variable_name] == value:
                current_idx = int(jump_line) - 1
            else:
                current_idx = int(else_line) - 1
    return count

```