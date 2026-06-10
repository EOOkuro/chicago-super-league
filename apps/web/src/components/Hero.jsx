import React from 'react';
import { Button } from '@/components/ui/button';

function Hero() {
  return (
    <section className="relative h-screen overflow-hidden">

      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://res.cloudinary.com/dfpj9filc/video/upload/v1781052477/IMG_0742_xb8byq.mov"
          type="video/mp4"
        />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-center justify-center">

        <div className="text-center px-4 max-w-6xl mx-auto">

          {/* League Label */}
          <span className="label-text text-[hsl(var(--primary-light))] font-bold tracking-[0.3em] mb-6 block uppercase">
            Chicago Super League · Open Division
          </span>

          {/* Match */}
          <h1 className="font-['Bebas_Neue'] text-6xl md:text-8xl lg:text-9xl leading-none text-white mb-6">
            PILSEN FC
            <br />
            <span className="text-[hsl(var(--primary))]">VS</span>
            <br />
            HYDE PARK RANGERS FC
          </h1>

          {/* Match Info */}
          <div className="space-y-2 mb-10">
            <p className="text-xl md:text-3xl text-white uppercase tracking-widest">
              June 14, 2026
            </p>

            <p className="text-lg md:text-2xl text-[hsl(var(--gray))] uppercase tracking-[0.2em]">
              ComEd Recreation Center
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

            <Button
              size="lg"
              className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white nav-text text-lg px-8 py-6"
            >
              Watch Live
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-black nav-text text-lg px-8 py-6"
            >
              View Fixtures
            </Button>

          </div>

        </div>
      </div>

    </section>
  );
}

export default Hero;