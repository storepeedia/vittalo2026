with open("src/app/page.tsx", "r") as f:
    content = f.read()

import re

# We will just replace from `<MobileCarouselSection` to `</DesktopGrid>` entirely.
content = re.sub(
    r'<MobileCarouselSection[\s\S]*?</DesktopGrid>',
    """<MobileCarouselSection row1Interval={3000} row2Interval={4000}>
            {finalCamps.map((camp: any) => (
              <TripCard key={camp.id} id={camp.id} type="camp" title={camp.title} imageUrl={camp.image_url} isActive={camp.is_active !== false} tagsTopLeft={camp.tags_top_left} tagsImageBottom={camp.tags_image_bottom} tagsBodyTop={camp.tags_body_top} campDates={camp.camp_dates} priceEur={camp.price_per_person} pricePln={camp.price_per_person_pln} />
            ))}
          </MobileCarouselSection>
          <DesktopGrid>
            {finalCamps.map((camp: any) => (
              <TripCard key={camp.id} id={camp.id} type="camp" title={camp.title} imageUrl={camp.image_url} isActive={camp.is_active !== false} tagsTopLeft={camp.tags_top_left} tagsImageBottom={camp.tags_image_bottom} tagsBodyTop={camp.tags_body_top} campDates={camp.camp_dates} priceEur={camp.price_per_person} pricePln={camp.price_per_person_pln} />
            ))}
          </DesktopGrid>""",
    content, count=1)

content = re.sub(
    r'<MobileCarouselSection[\s\S]*?</DesktopGrid>',
    """<MobileCarouselSection row1Interval={3000} row2Interval={4000}>
            {finalPackages.map((pkg: any) => (
              <TripCard key={pkg.id} id={pkg.id} type="package" title={pkg.title} imageUrl={pkg.image_url} isActive={pkg.is_active !== false} tagsTopLeft={pkg.tags_top_left} tagsImageBottom={pkg.tags_image_bottom} tagsBodyTop={pkg.tags_body_top} durationDays={pkg.duration_days} durationNights={pkg.duration_nights} route={pkg.route} startingPriceEur={pkg.starting_price} />
            ))}
          </MobileCarouselSection>
          <DesktopGrid>
            {finalPackages.map((pkg: any) => (
              <TripCard key={pkg.id} id={pkg.id} type="package" title={pkg.title} imageUrl={pkg.image_url} isActive={pkg.is_active !== false} tagsTopLeft={pkg.tags_top_left} tagsImageBottom={pkg.tags_image_bottom} tagsBodyTop={pkg.tags_body_top} durationDays={pkg.duration_days} durationNights={pkg.duration_nights} route={pkg.route} startingPriceEur={pkg.starting_price} />
            ))}
          </DesktopGrid>""",
    content, count=1)

with open("src/app/page.tsx", "w") as f:
    f.write(content)
