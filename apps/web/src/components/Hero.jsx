import React from 'react';
import { Button } from "@/components/ui/button"; // Adjust this path if your shadcn buttons live elsewhere

function Hero() {
  return (
    <div className="bg-black min-h-screen text-white font-sans antialiased selection:bg-white selection:text-black">
      {/* FIXED NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between py-3 px-6 bg-black/95 backdrop-blur-md border-b-2 border-white gap-[10px] flex-wrap sm:flex-nowrap">
        <div className="flex items-center gap-[10px]">
          <div className="w-[36px] h-[36px] bg-black border-2 border-white rounded-full flex items-center justify-center text-base text-white">
            ⚽
          </div>
          <div>
            <div className="font-['Bebas_Neue'] text-lg tracking-[1px] text-white leading-tight">
              Chicago Super League
            </div>
            <div className="font-['DM_Mono'] text-[10px] text-[hsl(var(--gray))] tracking-[0.5px] hidden sm:block">
              Youth Division · South Side
            </div>
          </div>
        </div>
        <a 
          href="#register" 
          className="bg-white text-black font-bold text-xs md:text-sm px-[18px] py-2 rounded-[4px] tracking-[0.5px] transition-all duration-200 border-2 border-white hover:bg-transparent hover:text-white"
        >
          Register Now
        </a>
      </nav>

      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center pt-[120px] pb-20 px-6 relative bg-gradient-to-br from-black to-[#1a1a1a] border-b-4 border-white">
        {/* League Label */}
        <span className="label-text text-[hsl(var(--primary-light))] font-bold tracking-[0.3em] mb-6 block uppercase">
          Chicago Super League · Youth Division
        </span>

        {/* Announcement */}
        <h1 className="font-['Bebas_Neue'] text-6xl md:text-8xl lg:text-9xl leading-none text-white mb-6 tracking-[2px]">
          YOUTH LEAGUE <br />
          <span className="text-[hsl(var(--primary))]">KICKS OFF</span> <br />
          THIS WEEKEND
        </h1>

        {/* Match Info */}
        <div className="space-y-2 mb-10">
          <p className="text-xl md:text-3xl text-white uppercase tracking-widest">
            June 21–22, 2026
          </p>
          <p className="text-lg md:text-2xl text-[hsl(var(--gray))] uppercase tracking-[0.2em]">
            South Side · Chicago
          </p>
        </div>

        {/* Call to Actions */}
        <div className="flex gap-4 flex-wrap justify-center">
          <Button
            size="lg"
            className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white nav-text text-lg px-8 py-6"
            onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Register Now
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-black nav-text text-lg px-8 py-6 bg-transparent"
          >
            View Schedule
          </Button>
        </div>
      </section>
    </div>
  );
}

export default Hero;