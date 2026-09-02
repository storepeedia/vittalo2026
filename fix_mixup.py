import re

with open("src/app/page.tsx", "r") as f:
    content = f.read()

# Oh no, it seems my previous script overwrote the first block (camps) with packages AND the second block with packages! Wait, it seems the entire second block is missing!
# Let me just restore the file completely from a previous git commit and apply my changes carefully.
