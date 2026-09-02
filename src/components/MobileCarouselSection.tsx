"use client";
import React, { useMemo } from 'react';
import { AutoScrollCarousel } from './AutoScrollCarousel';

interface MobileCarouselSectionProps {
  children: React.ReactNode[];
  row1Interval: number;
  row2Interval: number;
}

export function MobileCarouselSection({ children, row1Interval, row2Interval }: MobileCarouselSectionProps) {
  const row1 = useMemo(() => React.Children.toArray(children).filter((_, i) => i % 2 === 0), [children]);
  const row2 = useMemo(() => React.Children.toArray(children).filter((_, i) => i % 2 !== 0), [children]);

  return (
    <div className="md:hidden flex flex-col gap-6">
      {row1.length > 0 && (
        <AutoScrollCarousel intervalMs={row1Interval}>
          {row1}
        </AutoScrollCarousel>
      )}
      {row2.length > 0 && (
        <AutoScrollCarousel intervalMs={row2Interval}>
          {row2}
        </AutoScrollCarousel>
      )}
    </div>
  );
}
