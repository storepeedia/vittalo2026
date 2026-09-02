"use client";
import React, { useMemo } from 'react';
import { AutoScrollCarousel } from './AutoScrollCarousel';

interface MobileCarouselSectionProps {
  items: any[];
  renderItem: (item: any) => React.ReactNode;
  row1Interval: number;
  row2Interval: number;
}

export function MobileCarouselSection({ items, renderItem, row1Interval, row2Interval }: MobileCarouselSectionProps) {
  const row1 = useMemo(() => items.filter((_, i) => i % 2 === 0), [items]);
  const row2 = useMemo(() => items.filter((_, i) => i % 2 !== 0), [items]);

  return (
    <div className="md:hidden flex flex-col gap-6">
      {row1.length > 0 && (
        <AutoScrollCarousel items={row1} intervalMs={row1Interval} renderItem={renderItem} />
      )}
      {row2.length > 0 && (
        <AutoScrollCarousel items={row2} intervalMs={row2Interval} renderItem={renderItem} />
      )}
    </div>
  );
}
