# Santas Assembly Line
You’ve finally managed to sneak into Santa’s workshop.
Just as you catch a glimpse of a package with **your name** on it, it disappears onto the assembly line before you can see what’s inside.
But this isn’t just any ordinary conveyor belt, it’s part of a **specially connected assembly line**, where packages pass through a sequence of magical machines, each modifying the gift in some way.
If you can understand how the line is connected, maybe you can figure out what the **final gift** will be.

Your function takes a single input machine, which is a string describing a chain of machines connected in sequence. 
The format looks like this:
```
|AB:CD| -> |CD:XZ| -> |MN:KZ|
```
Each machine is represented as `|input:output|`, and the machines are chained using arrows (`->`).
For example:
- The first machine takes `AB` as input and produces `CD` as output.
- The second machine takes `CD` as input and produces `XZ`, and so on.

The process begins with the input of the first machine. Its output is passed into the next machine as input, and this continues **as long as the output matches the next machine’s input**. 

If a machine **cannot accept the previous machine’s output as input** or it is the **last machine**, the process stops. The last successful output is considered the **final output**. 

Return the final output produced by the chain of machines.

For example:
```py
machines = "|AB:CD| -> |CD:XZ| -> |MN:KZ|"

assert(output(machines) == "XZ")
```
is correct because:
- The first machine inputs outputs `CD`
- The second machine inputs `CD` so it can processes the first machine output.
- The second machine outputs `XZ`
- The third machine expects `MN` but receives `XZ` so the process is stopped
- Final output is `"XZ"`.

Notes:
- There will always be at least 1 machine 