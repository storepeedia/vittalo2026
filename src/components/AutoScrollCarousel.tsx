"use client";

import React, { useEffect, useRef, useState } from "react";

interface AutoScrollCarouselProps {
  items: any[];
  intervalMs: number;
  renderItem: (item: any) => React.ReactNode;
}

export function AutoScrollCarousel({
  items,
  intervalMs,
  renderItem,
}: AutoScrollCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollDirection, setScrollDirection] = useState<"forward" | "backward">("forward");
  const isInteracting = useRef(false);

  useEffect(() => {
    if (items.length <= 1) return;

    const intervalId = setInterval(() => {
      if (isInteracting.current || !scrollContainerRef.current) return;

      const container = scrollContainerRef.current;
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      const scrollLeft = container.scrollLeft;

      // Card width on mobile is roughly 80% of client width based on our CSS.
      // We assume each snap point is approximately this wide + gap.
      // Actually, since cards are snapped, we can scroll by clientWidth * 0.8
      const scrollAmount = clientWidth * 0.8;

      let nextScrollLeft = scrollLeft;

      if (scrollDirection === "forward") {
        nextScrollLeft += scrollAmount;
        if (nextScrollLeft + clientWidth >= scrollWidth - 10) { // -10 for rounding errors
          setScrollDirection("backward");
        }
      } else {
        nextScrollLeft -= scrollAmount;
        if (nextScrollLeft <= 10) {
          setScrollDirection("forward");
        }
      }

      container.scrollTo({
        left: nextScrollLeft,
        behavior: "smooth",
      });
    }, intervalMs);

    return () => clearInterval(intervalId);
  }, [items.length, intervalMs, scrollDirection]);

  return (
    <div
      className="w-full flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4 md:pb-0 md:overflow-visible"
      ref={scrollContainerRef}
      onTouchStart={() => (isInteracting.current = true)}
      onTouchEnd={() => {
        setTimeout(() => (isInteracting.current = false), 2000);
      }}
      onMouseEnter={() => (isInteracting.current = true)}
      onMouseLeave={() => (isInteracting.current = false)}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
      {items.map((item, index) => (
        <div
          key={item.id || index}
          className="shrink-0 w-[80vw] md:w-auto snap-center"
        >
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
}
