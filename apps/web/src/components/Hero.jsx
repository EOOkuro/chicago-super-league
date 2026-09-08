import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      type: 'image',
      bgImage: 'https://res.cloudinary.com/dfpj9filc/image/upload/v1788896430/799829550_18096959519131919_1172445974521637839_n_zxmer4.jpg',
      label: 'OutSouth League · Rivalry Match',
      titleLine1: 'PICO FC',
      titleHighlight: 'VS',
      titleLine3: 'AL FAROOQ',
      date: 'Sunday, Sept 13, 2026 · 12:00 PM',
      location: 'Bob Pickens Track · 63rd & Stoney Island',
      ctaText: 'Watch Live Stream',
      ctaAction: () => window.open('https://www.chicagosuperleague.com/watch', '_blank')
    },
    {
      type: 'video',
      youtubeId: 'KOzYa4yDm0g',
      label: 'The Mission · Chicago Super League',
      titleLine1: 'BUILDING',
      titleHighlight: 'THE ECOSYSTEM',
      titleLine3: 'ON THE SOUTH SIDE',
      description: "Recreational sports shouldn't be locked behind structural barriers. Watch the pitch behind the movement.",
      ctaText: 'Watch on YouTube',
      ctaAction: () => window.open('https://www.youtube.com/watch?v=KOzYa4yDm0g', '_blank')
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          {/* Background Image */}
          <img
            src={slide.bgImage}
            alt="Hero background"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60"></div>

          {/* Hero Content */}
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="text-center px-4 max-w-6xl mx-auto">
              
              {/* League Label */}
              <span className="label-text text-[hsl(var(--primary-light))] font-bold tracking-[0.3em] mb-6 block uppercase">
                {slide.label}
              </span>

              {/* Title */}
              <h1 className="font-['Bebas_Neue'] text-6xl md:text-8xl lg:text-9xl leading-none text-white mb-6">
                {slide.titleLine1}
                <br />
                <span className="text-[hsl(var(--primary))]">{slide.titleHighlight}</span>
                <br />
                {slide.titleLine3}
              </h1>

              {/* Conditional Info / Description */}
              {slide.type === 'image' ? (
                <div className="space-y-2 mb-10">
                  <p className="text-xl md:text-3xl text-white uppercase tracking-widest">
                    {slide.date}
                  </p>
                  <p className="text-lg md:text-2xl text-[hsl(var(--gray))] uppercase tracking-[0.2em]">
                    {slide.location}
                  </p>
                </div>
              ) : (
                <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto">
                  {slide.description}
                </p>
              )}

              {/* CTA Button */}
              <div className="flex items-center justify-center">
                <Button
                  size="lg"
                  className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white nav-text text-lg px-8 py-6"
                  onClick={slide.ctaAction}
                >
                  {slide.ctaText}
                </Button>
              </div>

            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-colors"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-colors"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators / Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-[hsl(var(--primary))] w-8'
                : 'bg-white/50 hover:bg-white'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default Hero;