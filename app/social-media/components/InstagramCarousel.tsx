/**
 * InstagramCarousel Component
 * 
 * Multi-image carousel format (1:1 per slide)
 */

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { typography } from '@/lib/design-system/tokens/typography';

interface CarouselSlide {
  title: string;
  subtitle?: string;
  imageUrl?: string;
}

interface InstagramCarouselProps {
  slides?: CarouselSlide[];
}

const defaultSlides: CarouselSlide[] = [
  { title: 'ARUMA', subtitle: 'Wellness & Beauty' },
  { title: 'DISCOVER', subtitle: 'Your Inner Balance' },
  { title: 'TRANSFORM', subtitle: 'Mind, Body & Spirit' },
];

export function InstagramCarousel({ 
  slides = defaultSlides
}: InstagramCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentContent = slides[currentSlide];

  return (
    <div className="w-full max-w-md mx-auto bg-black rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-neutral-950 border-b border-neutral-900">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-botanical-500" />
          <span className="text-white text-sm font-semibold">aruma.official</span>
        </div>
      </div>

      {/* Carousel Content */}
      <div className="relative" style={{ aspectRatio: '1/1' }}>
        {/* Slide Content */}
        <div className="absolute inset-0 bg-gradient-to-br from-botanical-900 via-neutral-900 to-black flex flex-col items-center justify-center p-8">
          {currentContent.imageUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img 
              src={currentContent.imageUrl} 
              alt={currentContent.title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center">
              <h2 
                className="text-5xl font-bold text-white mb-4 uppercase"
                style={{ letterSpacing: typography.letterSpacing.brand }}
              >
                {currentContent.title}
              </h2>
              {currentContent.subtitle && (
                <p 
                  className="text-xl text-neutral-300"
                  style={{ letterSpacing: typography.letterSpacing.subtitle }}
                >
                  {currentContent.subtitle}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        {slides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Slide Indicators */}
        <div className="absolute top-4 left-0 right-0 flex justify-center gap-1 px-4">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`flex-1 h-1 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-white' 
                  : 'bg-white/30'
              }`}
              style={{ maxWidth: '60px' }}
            />
          ))}
        </div>

        {/* Slide Counter */}
        <div className="absolute bottom-4 right-4">
          <div className="bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="text-white text-xs font-medium">
              {currentSlide + 1}/{slides.length}
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 bg-neutral-950">
        <p className="text-white text-sm">
          <span className="font-semibold">aruma.official</span> Swipe to explore →
        </p>
      </div>
    </div>
  );
}
