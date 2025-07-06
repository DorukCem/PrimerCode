```py
def find_offenders(logs : str):
    banned_items = set()
    required_items = set()
    offenders = []

    for log in logs.splitlines():
        if ":" in log:
            is_offender = False
            # person sighting
            name, items = log.split(":")
            name = name.strip()

            items = [x.strip() for x in items.split(",")]

            for item in items:
                if item in banned_items:
                    is_offender = True

            for required_item in required_items:
                if required_item not in items:
                    is_offender = True
            if is_offender:
                offenders.append(name)

        else:
            # law
            command, item =  log.split()
            match command:
                case "BAN":
                    banned_items.add(item)
                case "UNBAN":
                    if item in banned_items:
                        banned_items.remove(item)
                case "REQUIRE":
                    required_items.add(item)
                case "UNREQUIRE":
                    if item in required_items:
                        required_items.remove(item)

    return offenders
```