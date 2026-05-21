import React from 'react';
import { Button } from '@/components/ui/button';

function KickoffBanner() {
  return (
    <section className="bg-[hsl(var(--black))] text-[hsl(var(--true-white))] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="text-center lg:text-left">
            <h2 className="text-4xl md:text-6xl text-[hsl(var(--primary))] mb-2 font-['Bebas_Neue']">SOUTH SIDE COMPETITIVE SOCCER LIVES HERE.</h2>
            <p className="label-text text-xl md:text-2xl text-[hsl(var(--gray))]">MATCHES ALL SUMMER. REAL CLUBS. REAL STAKES.</p>
          </div>

          <div>
            <Button size="lg" className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white nav-text text-xl px-8 py-6 w-full md:w-auto">
              Register Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default KickoffBanner;