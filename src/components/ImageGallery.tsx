"use client";

import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!images || images.length === 0) return null;

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Main Image */}
      <div className="w-full rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center">
        <img
          src={images[currentIndex]}
          alt={`${title} - image ${currentIndex + 1}`}
          className="w-full h-auto object-contain max-h-[70vh]"
        />
      </div>

      {/* Thumbnail Slider */}
      {images.length > 1 && (
        <div className="relative flex items-center group">
          <button
            onClick={scrollLeft}
            className="absolute left-2 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all opacity-0 md:opacity-100"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto scroll-smooth w-full px-12 py-2 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {images.map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`relative flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden ring-2 transition-all ${
                  currentIndex === idx ? "ring-blue-500 ring-offset-2" : "ring-transparent hover:ring-gray-300"
                }`}
              >
                <img
                  src={imgUrl}
                  alt={`${title} thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          <button
            onClick={scrollRight}
            className="absolute right-2 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all opacity-0 md:opacity-100"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
