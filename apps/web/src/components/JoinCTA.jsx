import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

function JoinCTA() {
  return (
    <section className="py-20 md:py-32 bg-[hsl(var(--primary))] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-white mb-6 text-5xl md:text-7xl">READY TO TAKE THE PITCH?</h2>
        <p className="text-white/80 text-xl md:text-2xl mb-10 max-w-2xl mx-auto">
          Join the Chicago Super League and be part of the city's most competitive and community-driven soccer experience.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-[hsl(var(--black))] hover:bg-white hover:text-[hsl(var(--black))] text-white nav-text text-xl px-10 py-7 h-auto transition-all duration-300">
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSdYxsjYmVIhkj5YVFWAnFObplET0aFMCPta7zShoeFnx-0o3g/viewform?usp=header" target="_blank" rel="noopener noreferrer">
              Register Now <ArrowRight className="ml-2 w-6 h-6" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default JoinCTA;