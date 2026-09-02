import re

with open("src/app/page.tsx", "r") as f:
    content = f.read()

# I will just replace the WHOLE section of finalCamps to DesktopGrid end.
pattern_camps = r'<MobileCarouselSection[\s\S]*?</DesktopGrid>'
new_camps = """<MobileCarouselSection
            row1Interval={3000}
            row2Interval={4000}
          >
            {finalCamps.map((camp: any) => (
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
            ))}
          </MobileCarouselSection>
          <DesktopGrid>
            {finalCamps.map((camp: any) => (
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
            ))}
          </DesktopGrid>"""

# Find the first one (camps) and replace
matches = list(re.finditer(pattern_camps, content))
if matches:
    content = content[:matches[0].start()] + new_camps + content[matches[0].end():]

# Find the second one (packages) and replace
new_pkgs = """<MobileCarouselSection
            row1Interval={3000}
            row2Interval={4000}
          >
            {finalPackages.map((pkg: any) => (
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
            ))}
          </MobileCarouselSection>
          <DesktopGrid>
            {finalPackages.map((pkg: any) => (
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
            ))}
          </DesktopGrid>"""

matches = list(re.finditer(pattern_camps, content)) # after first replacement
if matches:
    content = content[:matches[0].start()] + new_pkgs + content[matches[0].end():]

with open("src/app/page.tsx", "w") as f:
    f.write(content)
