import re

with open("src/app/page.tsx", "r") as f:
    content = f.read()

# Just use `camps || []` and `packages || []`. We will remove all the displayCamps and displayPackages and dummy fallback logic completely.
# Let's replace the whole block defining them.

start_marker = "  if (campsError) console.error(\"Error fetching camps:\", campsError);\n  if (packagesError) console.error(\"Error fetching packages:\", packagesError);"

# We will remove from displayCamps declaration all the way up to `return (`
# And redefine finalCamps and finalPackages
replacement = """  if (campsError) console.error("Error fetching camps:", campsError);
  if (packagesError) console.error("Error fetching packages:", packagesError);

  const finalCamps = camps || [];
  const finalPackages = packages || [];

  return ("""

# Regex substitution
content = re.sub(
    r'  if \(campsError\) console\.error\("Error fetching camps:", campsError\);[\s\S]*?return \(',
    replacement,
    content
)

with open("src/app/page.tsx", "w") as f:
    f.write(content)
