import re

with open("src/app/page.tsx", "r") as f:
    content = f.read()

# First replace the .limit(3) to .limit(10)
content = content.replace('.limit(3);', '.limit(10);')

# Add missing imports for our new components
import_statement = 'import { TripCard } from "@/components/TripCard";'
new_imports = import_statement + '\nimport { DesktopGrid } from "@/components/DesktopGrid";\nimport { MobileCarouselSection } from "@/components/MobileCarouselSection";'
content = content.replace(import_statement, new_imports)

# Add dummy camps to the fallback list
dummy_camps = """
    { id: "4", title: "Kayaking Sochaczew", camp_dates: ["2024-05-15", "2024-05-16"], available_spots: 10, total_spots: 10, price_per_person: 100, price_per_person_pln: 450, image_url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop", is_active: false, tags_top_left: "Coming soon", tags_image_bottom: "2 Days 1 Night", tags_body_top: "Beginner" },
    { id: "5", title: "Auschwitz Historical Camp", camp_dates: ["2024-06-01"], available_spots: 20, total_spots: 20, price_per_person: 50, price_per_person_pln: 220, image_url: "https://images.unsplash.com/photo-1519006096500-264f338d1d86?q=80&w=2070&auto=format&fit=crop", is_active: false, tags_top_left: "Coming soon", tags_image_bottom: "1 Day", tags_body_top: "Sightseeing" },
    { id: "6", title: "Prague City Camp", camp_dates: ["2024-06-10"], available_spots: 15, total_spots: 15, price_per_person: 80, price_per_person_pln: 350, image_url: "https://images.unsplash.com/photo-1513807016779-d51c0c026263?q=80&w=2070&auto=format&fit=crop", is_active: false, tags_top_left: "Coming soon", tags_image_bottom: "1 Day", tags_body_top: "City Tour" },
"""

content = re.sub(
    r'(const displayCamps = camps && camps\.length > 0 \? camps : \[.*?)(  \];)',
    lambda m: m.group(1) + dummy_camps + m.group(2),
    content,
    flags=re.DOTALL
)

# And if `camps` is populated from DB but less than 6, we should append dummy to make it look full
camps_logic = """
  let finalCamps = displayCamps;
  if (finalCamps.length < 6) {
    const defaultDummies = [
      { id: "d4", title: "Kayaking Sochaczew", camp_dates: ["2024-05-15", "2024-05-16"], available_spots: 10, total_spots: 10, price_per_person: 100, price_per_person_pln: 450, image_url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop", is_active: false, tags_top_left: "Coming soon", tags_image_bottom: "2 Days 1 Night", tags_body_top: "Beginner" },
      { id: "d5", title: "Auschwitz Historical Camp", camp_dates: ["2024-06-01"], available_spots: 20, total_spots: 20, price_per_person: 50, price_per_person_pln: 220, image_url: "https://images.unsplash.com/photo-1519006096500-264f338d1d86?q=80&w=2070&auto=format&fit=crop", is_active: false, tags_top_left: "Coming soon", tags_image_bottom: "1 Day", tags_body_top: "Sightseeing" },
      { id: "d6", title: "Prague City Camp", camp_dates: ["2024-06-10"], available_spots: 15, total_spots: 15, price_per_person: 80, price_per_person_pln: 350, image_url: "https://images.unsplash.com/photo-1513807016779-d51c0c026263?q=80&w=2070&auto=format&fit=crop", is_active: false, tags_top_left: "Coming soon", tags_image_bottom: "1 Day", tags_body_top: "City Tour" }
    ];
    // append only what's needed to reach at least 6 if we don't have them
    finalCamps = [...finalCamps, ...defaultDummies.slice(0, Math.max(0, 6 - finalCamps.length))];
  }
"""

content = content.replace('const displayPackages =', camps_logic + '\n\n  const displayPackages =')

packages_logic = """
  let finalPackages = displayPackages;
  if (finalPackages.length < 6) {
      const defaultPkgDummies = [
        { id: "p4", title: "Italian Lakes Retreat", duration_days: 5, duration_nights: 4, route: "Milan – Como – Garda", starting_price: 850, image_url: "https://images.unsplash.com/photo-1534439091919-4977054dd9d0?q=80&w=2070&auto=format&fit=crop", is_active: false, tags_top_left: "Coming soon", tags_image_bottom: "5 Days", tags_body_top: "Relaxation" },
        { id: "p5", title: "Nordic Fjords Cruise", duration_days: 7, duration_nights: 6, route: "Oslo – Bergen – Tromsø", starting_price: 1500, image_url: "https://images.unsplash.com/photo-1513568856947-f1c50058e381?q=80&w=2070&auto=format&fit=crop", is_active: false, tags_top_left: "Coming soon", tags_image_bottom: "7 Days", tags_body_top: "Nature" },
        { id: "p6", title: "Greek Islands Hopping", duration_days: 10, duration_nights: 9, route: "Athens – Santorini – Mykonos", starting_price: 1200, image_url: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=2070&auto=format&fit=crop", is_active: false, tags_top_left: "Coming soon", tags_image_bottom: "10 Days", tags_body_top: "Beach" }
      ];
      finalPackages = [...finalPackages, ...defaultPkgDummies.slice(0, Math.max(0, 6 - finalPackages.length))];
  }
"""

content = content.replace('  return (', packages_logic + '\n  return (')

# Now we need to replace the grid sections with our components
camps_grid_pattern = r'<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">\s*\{displayCamps\.map\(\(camp: any\) => \(\s*<TripCard.*?/>\s*\)\)\}\s*</div>'
packages_grid_pattern = r'<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">\s*\{displayPackages\.map\(\(pkg: any\) => \(\s*<TripCard.*?/>\s*\)\)\}\s*</div>'

render_camp = """
          <MobileCarouselSection
            items={finalCamps}
            row1Interval={3000}
            row2Interval={4000}
            renderItem={(camp: any) => (
              <TripCard
                key={camp.id}
                id={camp.id}
                type="camp"
                title={camp.title}
                imageUrl={camp.image_url}
                isActive={camp.is_active !== false}
                tagsTopLeft={camp.tags_top_left}
                tagsImageBottom={camp.tags_image_bottom}
                tagsBodyTop={camp.tags_body_top}
                campDates={camp.camp_dates}
                priceEur={camp.price_per_person}
                pricePln={camp.price_per_person_pln}
              />
            )}
          />
          <DesktopGrid
            items={finalCamps}
            renderItem={(camp: any) => (
              <TripCard
                key={camp.id}
                id={camp.id}
                type="camp"
                title={camp.title}
                imageUrl={camp.image_url}
                isActive={camp.is_active !== false}
                tagsTopLeft={camp.tags_top_left}
                tagsImageBottom={camp.tags_image_bottom}
                tagsBodyTop={camp.tags_body_top}
                campDates={camp.camp_dates}
                priceEur={camp.price_per_person}
                pricePln={camp.price_per_person_pln}
              />
            )}
          />
"""

render_package = """
          <MobileCarouselSection
            items={finalPackages}
            row1Interval={3000}
            row2Interval={4000}
            renderItem={(pkg: any) => (
              <TripCard
                key={pkg.id}
                id={pkg.id}
                type="package"
                title={pkg.title}
                imageUrl={pkg.image_url}
                isActive={pkg.is_active !== false}
                tagsTopLeft={pkg.tags_top_left}
                tagsImageBottom={pkg.tags_image_bottom}
                tagsBodyTop={pkg.tags_body_top}
                durationDays={pkg.duration_days}
                durationNights={pkg.duration_nights}
                route={pkg.route}
                startingPriceEur={pkg.starting_price}
              />
            )}
          />
          <DesktopGrid
            items={finalPackages}
            renderItem={(pkg: any) => (
              <TripCard
                key={pkg.id}
                id={pkg.id}
                type="package"
                title={pkg.title}
                imageUrl={pkg.image_url}
                isActive={pkg.is_active !== false}
                tagsTopLeft={pkg.tags_top_left}
                tagsImageBottom={pkg.tags_image_bottom}
                tagsBodyTop={pkg.tags_body_top}
                durationDays={pkg.duration_days}
                durationNights={pkg.duration_nights}
                route={pkg.route}
                startingPriceEur={pkg.starting_price}
              />
            )}
          />
"""

content = re.sub(camps_grid_pattern, render_camp, content, flags=re.DOTALL)
content = re.sub(packages_grid_pattern, render_package, content, flags=re.DOTALL)

with open("src/app/page.tsx", "w") as f:
    f.write(content)
