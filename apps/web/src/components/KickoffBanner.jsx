import React from 'react';
import { Button } from '@/components/ui/button';

function KickoffBanner() {
  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dfpj9filc/image/upload/v1781053666/dzLHs_1_a5itja.jpg')",
        backgroundPosition: 'center 20%'
      }}
    >

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/75"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

          <div className="text-center lg:text-left max-w-3xl">

            <h2 className="text-4xl md:text-6xl text-[hsl(var(--primary))] mb-4 font-['Bebas_Neue'] leading-none">
              SOUTH SIDE COMPETITIVE SOCCER LIVES HERE.
            </h2>

            <p className="label-text text-xl md:text-2xl text-white tracking-widest">
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