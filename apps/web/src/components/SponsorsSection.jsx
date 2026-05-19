import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

function SponsorsSection() {
  return (
    <section id="sponsors" className="py-20 md:py-24 bg-[hsl(var(--true-white))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="label-text text-[hsl(var(--gray))] font-bold tracking-widest mb-8 block">OFFICIAL SPONSORS</span>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center mb-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="h-16 w-32 bg-[hsl(var(--white))] rounded flex items-center justify-center font-['Bebas_Neue'] text-2xl text-[hsl(var(--gray))]">SPONSOR 1</div>
          <div className="h-16 w-32 bg-[hsl(var(--white))] rounded flex items-center justify-center font-['Bebas_Neue'] text-2xl text-[hsl(var(--gray))]">SPONSOR 2</div>
          <div className="h-16 w-32 bg-[hsl(var(--white))] rounded flex items-center justify-center font-['Bebas_Neue'] text-2xl text-[hsl(var(--gray))]">SPONSOR 3</div>
          <div className="h-16 w-32 bg-[hsl(var(--white))] rounded flex items-center justify-center font-['Bebas_Neue'] text-2xl text-[hsl(var(--gray))]">SPONSOR 4</div>
        </div>

        <Button asChild variant="outline" className="border-2 border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-white nav-text text-lg px-8 py-6">
          <Link to="/sponsors">Become a Sponsor</Link>
        </Button>
      </div>
    </section>
  );
}

export default SponsorsSection;