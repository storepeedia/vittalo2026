import re

with open("src/app/page.tsx", "r") as f:
    content = f.read()

# We need to change the use of MobileCarouselSection to just a single AutoScrollCarousel for mobile
# Actually, MobileCarouselSection splits into two rows. We can just modify MobileCarouselSection to not split, OR we can modify page.tsx to not use it.
# Easiest is to modify MobileCarouselSection component itself so we don't have to change the huge blocks of code in page.tsx again.

with open("src/components/MobileCarouselSection.tsx", "r") as f:
    mcs_content = f.read()

mcs_new = """"use client";
import React from 'react';
import { AutoScrollCarousel } from './AutoScrollCarousel';

interface MobileCarouselSectionProps {
  children: React.ReactNode[];
  row1Interval: number;
  row2Interval?: number; // now optional since we don't use it
}

export function MobileCarouselSection({ children, row1Interval }: MobileCarouselSectionProps) {
  return (
    <div className="md:hidden flex flex-col gap-6">
      {React.Children.toArray(children).length > 0 && (
        <AutoScrollCarousel intervalMs={row1Interval}>
          {children}
        </AutoScrollCarousel>
      )}
    </div>
  );
}
"""

with open("src/components/MobileCarouselSection.tsx", "w") as f:
    f.write(mcs_new)
