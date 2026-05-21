import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

function Hero() {
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-[90vh] flex items-center">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[hsl(var(--light-bg))] z-0"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[hsl(var(--primary))]/5 blur-[100px] rounded-full transform translate-x-1/2 -translate-y-1/4 z-0"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-[hsl(var(--black))]/5 blur-[100px] rounded-full transform -translate-x-1/2 translate-y-1/4 z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          
          <h1 className="text-[hsl(var(--black))] mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            WHERE CHAMPIONS <br />
            <span className="text-[hsl(var(--primary))]">RISE</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-[hsl(var(--gray))] mb-10 max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            The premier competitive soccer league in Chicago. Bringing together diverse neighborhoods and fostering competitive excellence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Button asChild className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white nav-text text-xl px-8 py-6 h-auto">
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSdYxsjYmVIhkj5YVFWAnFObplET0aFMCPta7zShoeFnx-0o3g/viewform?usp=header" target="_blank" rel="noopener noreferrer">
                Register Now <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
            <Button variant="outline" className="border-2 border-[hsl(var(--black))] text-[hsl(var(--black))] hover:bg-[hsl(var(--black))] hover:text-white nav-text text-xl px-8 py-6 h-auto">
              Explore Clubs
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;