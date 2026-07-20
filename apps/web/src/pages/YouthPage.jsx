import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Trophy, Users, Target, Calendar, DollarSign, Shirt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

function YouthPage() {
  const youthImages = {
    hero: 'https://res.cloudinary.com/dfpj9filc/image/upload/q_auto/f_auto/v1779390107/74e0a495-1247-44a3-966d-c851f914e784_fbiuya.jpg',
    gallery1: 'https://res.cloudinary.com/dfpj9filc/image/upload/q_auto/f_auto/v1779390010/IMG_0923_klpiaz.heic',
    philosophy: 'https://res.cloudinary.com/dfpj9filc/image/upload/q_auto/f_auto/v1779386898/IMG_0179_dj42ap.jpg',
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className="bg-[hsl(var(--background))] min-h-screen">
      <Helmet>
        <title>Youth Division | MegCity Soccer</title>
        <meta name="description" content="MegCity Soccer's youth division gives South Side kids ages 4–17 a structured, joyful, development-first environment to fall in love with the game." />
        <link rel="canonical" href="https://chicagosuperleague.com/youth" />
        <meta property="og:title" content="Youth Division | MegCity Soccer" />
        <meta property="og:description" content="MegCity Soccer's youth division gives South Side kids ages 4–17 a structured, joyful, development-first environment to fall in love with the game." />
        <meta property="og:url" content="https://chicagosuperleague.com/youth" />
        <meta name="twitter:title" content="Youth Division | MegCity Soccer" />
        <meta name="twitter:description" content="MegCity Soccer's youth division gives South Side kids ages 4–17 a structured, joyful, development-first environment to fall in love with the game." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 bg-[hsl(var(--black))] overflow-hidden">
        <div className="absolute inset-0 opacity-45">
          <img
            src={youthImages.hero}
            alt="MegCity Soccer youth players"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--black))] via-[hsl(var(--black))]/80 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl">
            <motion.span variants={fadeUp} className="label-text text-[hsl(var(--primary-light))] font-bold tracking-widest mb-4 block text-lg">
              MegCity Soccer · Youth Program · Ages 4–17
            </motion.span>

            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl text-[hsl(var(--true-white))] mb-6 leading-none">
              BUILDING THE NEXT GENERATION
            </motion.h1>

            <motion.p variants={fadeUp} className="text-xl md:text-2xl text-[hsl(var(--white))] mb-6">
              Give your child a real team, a real kit, and a real community running all the way until November 15th. All skill levels welcome. No experience necessary.
            </motion.p>

            {/* Quick Highlights Badge Box */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 bg-[hsl(var(--black))]/60 p-6 rounded-xl border border-[hsl(var(--white))]/10 backdrop-blur-sm">
              <div className="flex flex-col">
                <span className="text-sm text-[hsl(var(--primary-light))] font-bold tracking-wider uppercase">Price</span>
                <span className="text-2xl font-bold text-[hsl(var(--true-white))]">$75 Total</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-[hsl(var(--primary-light))] font-bold tracking-wider uppercase">Practices</span>
                <span className="text-2xl font-bold text-[hsl(var(--true-white))]2">2x Per Week</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-[hsl(var(--primary-light))] font-bold tracking-wider uppercase">Games</span>
                <span className="text-2xl font-bold text-[hsl(var(--true-white))]">Weekends</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-[hsl(var(--primary-light))] font-bold tracking-wider uppercase">Included</span>
                <span className="text-2xl font-bold text-[hsl(var(--true-white))]">Full Kit + Tee</span>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white nav-text text-lg px-8 py-6 h-auto">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSeVi7kj8XFcbnbRPP9p9ZXnSFIsc5YgRRSKaFJEmQEw1euwQw/viewform?usp=header"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Register Your Child Today <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>

              <Button asChild variant="outline" className="border-2 border-[hsl(var(--white))] text-[hsl(var(--true-white))] hover:bg-[hsl(var(--white))] hover:text-[hsl(var(--black))] bg-transparent nav-text text-lg px-8 py-6 h-auto">
                <a href="#details">Program Details</a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Program Quick Pricing & Details Section */}
      <section id="details" className="py-20 bg-[hsl(var(--light-bg))] border-b border-[hsl(var(--white))]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-3 block">ALL-INCLUSIVE MEMBERSHIP</span>
          <h2 className="text-4xl md:text-5xl text-[hsl(var(--black))] mb-4">JUST $75 UNTIL NOVEMBER 15TH</h2>
          <p className="text-[hsl(var(--gray))] text-lg mb-12 max-w-2xl mx-auto">
            Spots are limited. Club de Futbol Pilsen and our partner clubs are structuring accessible paths to give South Side kids a premium team framework without the massive corporate fees.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <Card className="bg-[hsl(var(--true-white))] border-none shadow-sm">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-[hsl(var(--black))] mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[hsl(var(--primary))]" /> Training Schedule
                </h3>
                <ul className="space-y-3 text-[hsl(var(--gray))]">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))]" /> 2 practice sessions per week</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))]" /> Structured weekend league games</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))]" /> Full season running until November 15th</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-[hsl(var(--true-white))] border-none shadow-sm">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-[hsl(var(--black))] mb-4 flex items-center gap-2">
                  <Shirt className="w-5 h-5 text-[hsl(var(--primary))]" /> Gear & Access
                </h3>
                <ul className="space-y-3 text-[hsl(var(--gray))]">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))]" /> Full match uniform included</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))]" /> Dedicated practice shirt included</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))]" /> Ages 4–17 · All skill levels welcome</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Age Groups */}
      <section className="py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-3 block">PATHWAY</span>
          <h2 className="text-4xl md:text-5xl text-[hsl(var(--black))]">AGE DIVISIONS</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { age: 'Ages 4–6', phase: 'Intro Phase', desc: 'Fun, coordination, comfort with the ball. High repetitions, movement, and establishing pure joy for the game.' },
            { age: 'U8–U10', phase: 'Foundation Phase', desc: 'Ball mastery, small-sided game formats. High touches, rotating groups, and discovery learning.' },
            { age: 'U11–U13', phase: 'Development Phase', desc: 'Technical expansion and game awareness. Structured positioning with local competition formats.' },
            { age: 'U14–U17', phase: 'Competitive Phase', desc: 'Tactical alignment and full match execution. Direct paths to high school preparation and adult frameworks.' },
          ].map((group, idx) => (
            <Card key={idx} className="bg-[hsl(var(--true-white))] border-none shadow-md hover:-translate-y-1 transition-transform duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[hsl(var(--light-bg))] rounded-full flex items-center justify-center mx-auto mb-6 text-[hsl(var(--primary))] font-['Bebas_Neue'] text-2xl">
                  {idx + 1}
                </div>
                <h3 className="text-3xl text-[hsl(var(--black))] mb-2">{group.age}</h3>
                <div className="text-sm font-bold text-[hsl(var(--primary))] uppercase tracking-widest mb-4">{group.phase}</div>
                <p className="text-[hsl(var(--gray))]">{group.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Real Program Images */}
      <section className="pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.values(youthImages).map((image, index) => (
            <div key={index} className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-[hsl(var(--light-bg))]">
              <img
                src={image}
                alt={`MegCity Soccer youth program ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[hsl(var(--white))]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-3 block">PHILOSOPHY</span>
            <h2 className="text-4xl md:text-5xl text-[hsl(var(--black))] mb-6">DEVELOPMENT OVER WINS</h2>
            <p className="text-lg text-[hsl(var(--gray))] mb-8">
              MegCity Soccer operates under clear local parameters that prioritize long-term growth and community accessibility above everything else.
            </p>
            <ul className="space-y-4">
              {[
                'Development over early tournament pressure — always.',
                'High touches and technical execution emphasized in every session.',
                'Uncompromised community value so any kid who wants to play can excel.',
                'True neighborhood identity across South Side clusters.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 w-6 h-6 rounded-full bg-[hsl(var(--primary))]/10 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-[hsl(var(--primary))]"></div>
                  </div>
                  <span className="text-[hsl(var(--black))] font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
            <img
              src={youthImages.philosophy}
              alt="MegCity Soccer player development"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--black))]/80 to-transparent flex items-end p-8">
              <div>
                <h3 className="text-3xl text-white mb-2">ONE COMMUNITY. REAL INFRASTRUCTURE.</h3>
                <p className="text-white/80">Every player deserves a structured team environment regardless of resource barriers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clubs */}
      <section className="py-20 bg-[hsl(var(--true-white))] border-t border-[hsl(var(--white))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-3 block">COMMUNITY</span>
          <h2 className="text-4xl md:text-5xl text-[hsl(var(--black))] mb-12">OUR CLUBS</h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {[
              'Club de Futbol Pilsen',
              'Hyde Park Rangers FC',
              'Bronzeville Athletic Club',
              'Hunnids Athletic Club',
              'South Shore Sports Club',
              'Colonia FC',
              'Midway FC',
              'Englewood Athletic Club',
            ].map((club, idx) => (
              <div key={idx} className="bg-[hsl(var(--light-bg))] px-6 py-4 rounded-xl border border-[hsl(var(--white))] font-['Bebas_Neue'] text-xl md:text-2xl text-[hsl(var(--black))] tracking-wide shadow-sm">
                {club}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-[hsl(var(--black))] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl md:text-7xl text-[hsl(var(--true-white))] mb-6">REGISTER YOUR CHILD TODAY</h2>
          <p className="text-[hsl(var(--gray))] text-xl mb-4">
            Secure their official roster spot and uniform sizing for the full season through November 15th. 
          </p>
          <p className="text-[hsl(var(--primary-light))] font-bold text-lg mb-10 uppercase tracking-wider">
            $75 Total · All Gear Included · Spots are Strictly Limited
          </p>

          <Button asChild className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white nav-text text-xl px-12 py-8 h-auto shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all duration-300">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSeVi7kj8XFcbnbRPP9p9ZXnSFIsc5YgRRSKaFJEmQEw1euwQw/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
            >
              SECURE A SPOT NOW <ArrowRight className="ml-2 w-6 h-6" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}

export default YouthPage;