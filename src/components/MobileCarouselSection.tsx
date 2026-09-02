"use client";
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
