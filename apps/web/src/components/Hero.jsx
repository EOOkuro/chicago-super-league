import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

function Hero() {
  return (
    <section
  id="home"
  className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-[90vh] flex items-center"
>
  {/* Background Video */}
  <div className="absolute inset-0 z-0 overflow-hidden">
    <iframe
      src="https://www.youtube.com/embed/cEqNLFv5x1E?autoplay=1&mute=1&controls=0&loop=1&playlist=cEqNLFv5x1E&modestbranding=1&playsinline=1&rel=0"
      title="OutSouth League Matchday 1"
      className="absolute top-1/2 left-1/2 w-[177.78vh] min-w-full h-[56.25vw] min-h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      allow="autoplay; encrypted-media"
    />
  </div>

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/70 z-10"></div>

  {/* Content */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
    <div className="max-w-4xl">
      <h1
        className="text-white mb-6 animate-fade-in-up"
        style={{ animationDelay: '0.1s' }}
      >
        WHERE CHAMPIONS <br />
        <span className="text-[hsl(var(--primary))]">RISE</span>
      </h1>

      <p
        className="text-xl md:text-2xl text-white/85 mb-10 max-w-2xl animate-fade-in-up"
        style={{ animationDelay: '0.2s' }}
      >
        OutSouth League — South Side soccer bringing together diverse
        neighborhoods through culture, competition, and competitive excellence.
        The beginning of Chicago’s pro/rel pyramid.
      </p>

      <div
        className="flex flex-col sm:flex-row gap-4 animate-fade-in-up"
        style={{ animationDelay: '0.3s' }}
      >
        <Button
          asChild
          className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white nav-text text-xl px-8 py-6 h-auto"
        >
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdYxsjYmVIhkj5YVFWAnFObplET0aFMCPta7zShoeFnx-0o3g/viewform?usp=header"
            target="_blank"
            rel="noopener noreferrer"
          >
            Register Now <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </Button>

        <Button
          variant="outline"
          className="border-2 border-white text-white hover:bg-white hover:text-black nav-text text-xl px-8 py-6 h-auto"
        >
          Explore Clubs
        </Button>
      </div>
    </div>
  </div>
</section>
  );
}

export default Hero;