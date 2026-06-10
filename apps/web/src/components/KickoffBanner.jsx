import React from 'react';
import { Button } from '@/components/ui/button';

function KickoffBanner() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">

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

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

          <div className="text-center lg:text-left">
            <h2 className="text-4xl md:text-6xl text-[hsl(var(--primary))] mb-2 font-['Bebas_Neue']">
              SOUTH SIDE COMPETITIVE SOCCER LIVES HERE.
            </h2>

            <p className="label-text text-xl md:text-2xl text-white">
              MATCHES ALL SUMMER.
            </p>
          </div>

          <div>
            <Button
              size="lg"
              className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white nav-text text-xl px-8 py-6 w-full md:w-auto"
            >
              Register Now
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}

export default KickoffBanner;