import re

with open("src/app/page.tsx", "r") as f:
    content = f.read()

# First replace the MobileCarouselSection for camps
camp_pattern = r'<MobileCarouselSection \s*items=\{finalCamps\} \s*row1Interval=\{3000\} \s*row2Interval=\{4000\}\s*renderItem=\{\(camp: any\) => \([\s\S]*?/>\s*\)\}\s*/>\s*<DesktopGrid \s*items=\{finalCamps\} \s*renderItem=\{\(camp: any\) => \([\s\S]*?/>\s*\)\}\s*/>'

new_camp = """<MobileCarouselSection row1Interval={3000} row2Interval={4000}>
            {finalCamps.map((camp: any) => (
              <TripCard key={camp.id} id={camp.id} type="camp" title={camp.title} imageUrl={camp.image_url} isActive={camp.is_active !== false} tagsTopLeft={camp.tags_top_left} tagsImageBottom={camp.tags_image_bottom} tagsBodyTop={camp.tags_body_top} campDates={camp.camp_dates} priceEur={camp.price_per_person} pricePln={camp.price_per_person_pln} />
            ))}
          </MobileCarouselSection>
          <DesktopGrid>
            {finalCamps.map((camp: any) => (
              <TripCard key={camp.id} id={camp.id} type="camp" title={camp.title} imageUrl={camp.image_url} isActive={camp.is_active !== false} tagsTopLeft={camp.tags_top_left} tagsImageBottom={camp.tags_image_bottom} tagsBodyTop={camp.tags_body_top} campDates={camp.camp_dates} priceEur={camp.price_per_person} pricePln={camp.price_per_person_pln} />
            ))}
          </DesktopGrid>"""

content = re.sub(camp_pattern, new_camp, content)

pkg_pattern = r'<MobileCarouselSection \s*items=\{finalPackages\} \s*row1Interval=\{3000\} \s*row2Interval=\{4000\}\s*renderItem=\{\(pkg: any\) => \([\s\S]*?/>\s*\)\}\s*/>\s*<DesktopGrid \s*items=\{finalPackages\} \s*renderItem=\{\(pkg: any\) => \([\s\S]*?/>\s*\)\}\s*/>'

new_pkg = """<MobileCarouselSection row1Interval={3000} row2Interval={4000}>
            {finalPackages.map((pkg: any) => (
              <TripCard key={pkg.id} id={pkg.id} type="package" title={pkg.title} imageUrl={pkg.image_url} isActive={pkg.is_active !== false} tagsTopLeft={pkg.tags_top_left} tagsImageBottom={pkg.tags_image_bottom} tagsBodyTop={pkg.tags_body_top} durationDays={pkg.duration_days} durationNights={pkg.duration_nights} route={pkg.route} startingPriceEur={pkg.starting_price} />
            ))}
          </MobileCarouselSection>
          <DesktopGrid>
            {finalPackages.map((pkg: any) => (
              <TripCard key={pkg.id} id={pkg.id} type="package" title={pkg.title} imageUrl={pkg.image_url} isActive={pkg.is_active !== false} tagsTopLeft={pkg.tags_top_left} tagsImageBottom={pkg.tags_image_bottom} tagsBodyTop={pkg.tags_body_top} durationDays={pkg.duration_days} durationNights={pkg.duration_nights} route={pkg.route} startingPriceEur={pkg.starting_price} />
            ))}
          </DesktopGrid>"""

content = re.sub(pkg_pattern, new_pkg, content)

with open("src/app/page.tsx", "w") as f:
    f.write(content)
