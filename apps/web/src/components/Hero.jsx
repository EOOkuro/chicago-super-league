import React from 'react';
import { Helmet } from 'react-helmet';

function Hero() {
  return (
    <div className="bg-black min-h-screen text-white font-sans antialiased selection:bg-white selection:text-black">
      <Helmet>
        <title>Beverly — Beverly's Football Club</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" 
          rel="stylesheet" 
        />
      </Helmet>

      {/* FIXED NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between padding-4 py-3 px-6 bg-black/95 backdrop-blur-md border-b-2 border-white gap-[10px] flex-wrap sm:flex-nowrap">
        <div className="flex items-center gap-[10px]">
          <div className="w-[36px] h-[36px] bg-black border-2 border-white rounded-full flex items-center justify-center text-base text-white">
            ⚽
          </div>
          <div>
            <div className="font-['Bebas_Neue'] text-lg tracking-[1px] text-white leading-tight">
              Beverly
            </div>
            <div className="font-['DM_Mono'] text-[10px] text-gray-400 tracking-[0.5px] hidden sm:block">
              OutSouth League · Chicago
            </div>
          </div>
        </div>
        <a 
          href="#register" 
          className="bg-white text-black font-bold text-xs md:text-md px-[18px] py-2 rounded-[4px] tracking-[0.5px] transition-all duration-200 border-2 border-white hover:bg-transparent hover:text-white"
        >
          Register Now
        </a>
      </nav>

      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center pt-[120px] pb-20 px-6 relative bg-gradient-to-br from-black to-[#1a1a1a] border-b-4 border-white">
        <div className="font-['DM_Mono'] text-xs tracking-[3px] text-gray-400 uppercase mb-5">
          Beverly · Chicago South Side
        </div>
        <h1 className="font-['Bebas_Neue'] text-[56px] sm:text-[80px] md:text-[112px] line-height-[0.9] tracking-[2px] text-white mb-2 leading-none">
          Beverly's
          <span className="block text-white/70">Football Club</span>
        </h1>
        <p className="text-base text-white/60 my-6 max-w-[480px] scale-md:mb-10 leading-relaxed mx-auto">
          Youth and adult soccer rooted in Beverly. Everyone welcome. No experience necessary.
        </p>
        <div className="flex gap-3 flex-wrap justify-center">
          <a 
            href="#register" 
            className="bg-white text-black font-bold text-sm px-8 py-[14px] rounded-[4px] tracking-[0.5px] transition-all duration-200 border-2 border-white hover:bg-transparent hover:text-white"
          >
            Register Your Child
          </a>
          <a 
            href="#teams" 
            className="border-2 border-white text-white bg-transparent text-sm px-8 py-[14px] rounded-[4px] transition-all duration-200 hover:bg-white hover:text-black"
          >
            Our Teams
          </a>
        </div>
      </section>

      {/* TEAMS SECTION */}
      <section className="py-20 px-6 max-w-[960px] mx-auto" id="teams">
        <div className="font-['DM_Mono'] text-[11px] tracking-[3px] text-gray-400 uppercase mb-3">
          The Club
        </div>
        <h2 className="font-['Bebas_Neue'] text-[36px] sm:text-[56px] tracking-[1px] mb-12 leading-none text-white">
          Two Teams.<br /><span className="opacity-60">One Community.</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[#1a1a1a] border border-[#333333] rounded-lg p-7 transition-all duration-300 hover:border-white hover:bg-black hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(255,255,255,0.04)]">
            <div className="font-['DM_Mono'] text-[11px] tracking-[2px] text-gray-400 mb-3">
              ADULT TEAM
            </div>
            <div className="font-['Bebas_Neue'] text-[28px] tracking-[1px] mb-2 text-white">
              Beverly
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Competing in the OutSouth League. Open to all genders — everyone is welcome to play.
            </p>
          </div>
          <div className="bg-[#1a1a1a] border border-[#333333] rounded-lg p-7 transition-all duration-300 hover:border-white hover:bg-black hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(255,255,255,0.04)]">
            <div className="font-['DM_Mono'] text-[11px] tracking-[2px] text-gray-400 mb-3">
              YOUTH · AGES 4–17
            </div>
            <div className="font-['Bebas_Neue'] text-[28px] tracking-[1px] mb-2 text-white">
              Beverly Academy
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Structured training, competitive games, and real development for South Side kids. $50 for the entire summer.
            </p>
          </div>
        </div>
      </section>

      <div className="w-full h-[1px] bg-[#333333]" />

      {/* YOUTH SIGNUP SECTION */}
      <section className="bg-[#0a0a0a] py-20 px-6 border-t-3 border-b-3 border-white" id="register">
        <div className="max-w-[960px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="font-['Bebas_Neue'] text-[80px] sm:text-[140px] leading-none text-white">
              $50
            </div>
            <div className="font-['DM_Mono'] text-[13px] tracking-[2px] text-gray-400 -mt-2 mb-6">
              FOR THE ENTIRE SUMMER
            </div>
            <ul className="list-none my-6">
              {[
                '2 practice sessions per week',
                'Weekend games',
                'Full uniform included',
                'Practice shirt included',
                'Ages 4–17 · All skill levels',
                'No experience necessary',
              ].map((item, index) => (
                <li key={index} className="text-[15px] text-white/85 py-[10px] border-b border-white/5 flex items-center gap-[10px]">
                  <span className="text-white font-bold text-xs">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-['DM_Mono'] text-[11px] tracking-[3px] text-gray-400 uppercase mb-3">
              Youth Program
            </div>
            <h2 className="font-['Bebas_Neue'] text-[32px] sm:text-[48px] tracking-[1px] mb-4 text-white leading-none">
              Register Your Child Today
            </h2>
            <p className="text-[15px] text-white/65 leading-relaxed mb-8">
              Spots are limited. Beverly is building the next generation of South Side footballers — give your child a real team, a real kit, and a real community this summer.
            </p>
            <a 
              href="https://chicagosuperleague.com/youth" 
              className="bg-white text-black font-bold text-sm px-8 py-[14px] rounded-[4px] tracking-[0.5px] transition-all duration-200 border-2 border-white hover:bg-transparent hover:text-white inline-block"
              target="_blank" 
              rel="noopener noreferrer"
            >
              Sign Up at chicagosuperleague.com
            </a>
          </div>
        </div>
      </section>

      {/* LEAGUE BAND */}
      <div className="bg-[#1a1a1a] border-t border-b border-white py-8 px-6 text-center">
        <div className="font-['DM_Mono'] text-[11px] tracking-[3px] text-gray-400 mb-2">
          Competing In
        </div>
        <div className="font-['Bebas_Neue'] text-[32px] tracking-[2px] text-white">
          The OutSouth League
        </div>
        <a 
          href="https://chicagosuperleague.com/youth" 
          className="text-[13px] text-white/40 no-underline block mt-1 tracking-[1px] hover:text-white"
          target="_blank" 
          rel="noopener noreferrer"
        >
          chicagosuperleague.com →
        </a>
      </div>

      {/* CONTACT SECTION */}
      <section className="py-20 px-6 max-w-[960px] mx-auto text-center">
        <div className="font-['DM_Mono'] text-[11px] tracking-[3px] text-gray-400 uppercase mb-3">
          Get In Touch
        </div>
        <h2 className="font-['Bebas_Neue'] text-[36px] sm:text-[56px] tracking-[1px] mb-4 text-white leading-none">
          Join <span className="opacity-60">The Club</span>
        </h2>
        <p className="text-base text-white/50 mb-9">
          Questions about youth registration, adult tryouts, or sponsorship? Reach out.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <a 
            href="mailto:info@chicagosuperleague.com" 
            className="bg-white text-black font-bold text-sm px-8 py-[14px] rounded-[4px] tracking-[0.5px] transition-all duration-200 border-2 border-white hover:bg-transparent hover:text-white"
          >
            Email Us
          </a>
          <a 
            href="https://chicagosuperleague.com" 
            className="border-2 border-white text-white bg-transparent text-sm px-8 py-[14px] rounded-[4px] transition-all duration-200 hover:bg-white hover:text-black"
            target="_blank" 
            rel="noopener noreferrer"
          >
            Visit League Site
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#333333] py-6 text-center">
        <p className="font-['DM_Mono'] text-[11px] text-gray-400 tracking-[1px]">
          Beverly · Part of the OutSouth League · MegCity Futbol · Chicago, IL
        </p>
      </footer>
    </div>
  );
}

export default Hero;