import React from 'react';
import { Button } from '@/components/ui/button';

function KickoffBanner() {
  return (
    <section className="bg-[hsl(var(--black))] text-[hsl(var(--true-white))] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="text-center lg:text-left">
            <h2 className="text-6xl md:text-8xl text-[hsl(var(--primary))] mb-2">MAY 17</h2>
            <p className="label-text text-xl md:text-2xl text-[hsl(var(--gray))]">SEASON KICKOFF</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 flex-1 w-full">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-['Bebas_Neue'] mb-1">8</div>
              <div className="label-text text-[hsl(var(--gray))] text-sm">Clubs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-['Bebas_Neue'] mb-1">5</div>
              <div className="label-text text-[hsl(var(--gray))] text-sm">Fixtures</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-['Bebas_Neue'] mb-1">40+</div>
              <div className="label-text text-[hsl(var(--gray))] text-sm">Players</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-['Bebas_Neue'] mb-1">100%</div>
              <div className="label-text text-[hsl(var(--gray))] text-sm">Community</div>
            </div>
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