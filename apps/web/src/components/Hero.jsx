import React from 'react';
import { Button } from '@/components/ui/button';

function Hero() {
  return (
    <section className="relative h-screen overflow-hidden">

      {/* Background Image */}
      <img
        src="https://res.cloudinary.com/dfpj9filc/image/upload/v1779386912/IMG_1984_tu2zw1.jpg"
        alt="Youth soccer at South Side park"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-center justify-center">

        <div className="text-center px-4 max-w-6xl mx-auto">

          {/* League Label */}
          <span className="label-text text-[hsl(var(--primary-light))] font-bold tracking-[0.3em] mb-6 block uppercase">
            Chicago Super League · OutWest Division
          </span>

          {/* Announcement */}
          <h1 className="font-['Bebas_Neue'] text-6xl md:text-8xl lg:text-9xl leading-none text-white mb-6">
            OUTWEST
            <br />
            <span className="text-[hsl(var(--primary))]">KICKS OFF</span>
            <br />
            JULY 31ST!
          </h1>

          {/* Match Info */}
          <div className="space-y-2 mb-10">
            <p className="text-xl md:text-3xl text-white uppercase tracking-widest">
              Friday, July 31, 2026
            </p>

            <p className="text-lg md:text-2xl text-[hsl(var(--gray))] uppercase tracking-[0.2em]">
              West Side · Chicago
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex items-center justify-center">
            <Button
              size="lg"
              className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white nav-text text-lg px-8 py-6"
              onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSeVi7kj8XFcbnbRPP9p9ZXnSFIsc5YgRRSKaFJEmQEw1euwQw/viewform', '_blank')}
            >
              Register Now
            </Button>
          </div>

        </div>
      </div>

    </section>
  );
}

export default Hero;