import re

with open("src/app/page.tsx", "r") as f:
    content = f.read()

# Replace row1Interval and row2Interval to 10000 (10 seconds)
content = re.sub(r'row1Interval=\{3000\}', 'row1Interval={10000}', content)
content = re.sub(r'row2Interval=\{4000\}', 'row2Interval={10000}', content)

with open("src/app/page.tsx", "w") as f:
    f.write(content)
