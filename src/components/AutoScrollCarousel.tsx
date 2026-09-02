"use client";

import React, { useEffect, useRef, useState } from "react";

interface AutoScrollCarouselProps {
  children: React.ReactNode[];
  intervalMs: number;
}

export function AutoScrollCarousel({
  children,
  intervalMs,
}: AutoScrollCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollDirection, setScrollDirection] = useState<"forward" | "backward">("forward");
  const isInteracting = useRef(false);

  useEffect(() => {
    if (React.Children.count(children) <= 1) return;

    const intervalId = setInterval(() => {
      if (isInteracting.current || !scrollContainerRef.current) return;

      const container = scrollContainerRef.current;
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      const scrollLeft = container.scrollLeft;

      const scrollAmount = clientWidth * 0.8;
      let nextScrollLeft = scrollLeft;

      if (scrollDirection === "forward") {
        nextScrollLeft += scrollAmount;
        if (nextScrollLeft + clientWidth >= scrollWidth - 10) {
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
  }, [children, intervalMs, scrollDirection]);

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
      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          className="shrink-0 w-[80vw] md:w-auto snap-center"
        >
          {child}
        </div>
      ))}
    </div>
  );
}
