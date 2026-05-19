import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Trophy, Users, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

function YouthPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="bg-[hsl(var(--background))] min-h-screen">
      <Helmet>
        <title>Youth Division | MegCity Soccer</title>
        <meta name="description" content="MegCity Soccer's youth division gives South Side kids ages 2–17 a structured, joyful, development-first environment to fall in love with the game." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 bg-[hsl(var(--black))] overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1680024439029-d7d4b7f4cba1?auto=format&fit=crop&q=80&w=2000" 
            alt="Youth soccer players on the field" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--black))] via-[hsl(var(--black))]/80 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.span variants={fadeUp} className="label-text text-[hsl(var(--primary-light))] font-bold tracking-widest mb-4 block text-lg">
              MegCity Soccer · Youth Division · Ages 2–17
            </motion.span>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl text-[hsl(var(--true-white))] mb-6 leading-none">
              THE NEXT GENERATION STARTS HERE
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl md:text-2xl text-[hsl(var(--white))] mb-10">
              MegCity Soccer's youth division gives South Side kids ages 2–17 a structured, joyful, development-first environment to fall in love with the game.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white nav-text text-lg px-8 py-6 h-auto">
                <a href="https://form.typeform.com/to/IajKM5fB" target="_blank" rel="noopener noreferrer">
                  Register Your Child <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button asChild variant="outline" className="border-2 border-[hsl(var(--white))] text-[hsl(var(--true-white))] hover:bg-[hsl(var(--white))] hover:text-[hsl(var(--black))] bg-transparent nav-text text-lg px-8 py-6 h-auto">
                <a href="#programs">
                  View Programs
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Age Groups Section */}
      <section className="py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-3 block">PATHWAY</span>
          <h2 className="text-4xl md:text-5xl text-[hsl(var(--black))]">AGE DIVISIONS</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { age: 'Ages 2–4', phase: 'Intro Phase', desc: 'Fun, coordination, comfort with the ball' },
            { age: 'U6–U8', phase: 'Foundation Phase', desc: 'Ball mastery, 3v3 and 5v5 formats' },
            { age: 'U9–U12', phase: 'Development Phase', desc: 'Technical development, team play' },
            { age: 'U13–U18', phase: 'Competitive Phase', desc: 'Tactical depth, city-wide competition' }
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

      {/* Programs Section */}
      <section id="programs" className="py-20 md:py-32 bg-[hsl(var(--light-bg))] border-y border-[hsl(var(--white))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-3 block">OFFERINGS</span>
            <h2 className="text-4xl md:text-5xl text-[hsl(var(--black))]">OUR PROGRAMS</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-[hsl(var(--true-white))] border-t-4 border-t-[hsl(var(--primary))] shadow-sm">
              <CardContent className="p-8">
                <Users className="w-10 h-10 text-[hsl(var(--primary))] mb-6" />
                <h3 className="text-3xl text-[hsl(var(--black))] mb-4">Recreational</h3>
                <p className="text-[hsl(var(--gray))] mb-6">
                  Perfect for beginners and players looking to enjoy the game without the pressure of intense competition. Focuses on participation, equal playing time, and fundamental skills.
                </p>
                <ul className="space-y-2 text-sm text-[hsl(var(--gray))]">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))]" /> 1 practice per week</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))]" /> Weekend local games</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))]" /> All skill levels welcome</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-[hsl(var(--true-white))] border-t-4 border-t-[hsl(var(--black))] shadow-sm">
              <CardContent className="p-8">
                <Target className="w-10 h-10 text-[hsl(var(--black))] mb-6" />
                <h3 className="text-3xl text-[hsl(var(--black))] mb-4">Development</h3>
                <p className="text-[hsl(var(--gray))] mb-6">
                  For players showing strong interest and potential. Bridges the gap between recreational and competitive play with specialized coaching and structured curriculums.
                </p>
                <ul className="space-y-2 text-sm text-[hsl(var(--gray))]">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--black))]" /> 2 practices per week</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--black))]" /> Regional games</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--black))]" /> Technical focus</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-[hsl(var(--true-white))] border-t-4 border-t-[hsl(var(--pyramid-red))] shadow-sm">
              <CardContent className="p-8">
                <Trophy className="w-10 h-10 text-[hsl(var(--pyramid-red))] mb-6" />
                <h3 className="text-3xl text-[hsl(var(--black))] mb-4">Competitive</h3>
                <p className="text-[hsl(var(--gray))] mb-6">
                  Elite tier for dedicated athletes. Teams compete in top regional leagues and tournaments, preparing players for high school, college, and beyond.
                </p>
                <ul className="space-y-2 text-sm text-[hsl(var(--gray))]">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--pyramid-red))]" /> 3+ practices per week</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--pyramid-red))]" /> Travel tournaments</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--pyramid-red))]" /> Tryout required</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Coaching Philosophy & Staff */}
      <section className="py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-3 block">PHILOSOPHY</span>
            <h2 className="text-4xl md:text-5xl text-[hsl(var(--black))] mb-6">DEVELOPMENT OVER WINS</h2>
            <p className="text-lg text-[hsl(var(--gray))] mb-8">
              We believe that true success is measured by player growth, character development, and a lifelong love for the sport—not just the scoreboard.
            </p>
            <ul className="space-y-4">
              {[
                'Mistakes are learning opportunities, not reasons for punishment.',
                'Every player deserves respect, attention, and quality instruction.',
                'We prioritize long-term technical mastery over short-term physical dominance.',
                'Character, discipline, and teamwork are as important as soccer skills.'
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
              src="https://images.unsplash.com/photo-1604651685068-8223d8790770?auto=format&fit=crop&q=80&w=1000" 
              alt="Youth soccer coach instructing players" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--black))]/80 to-transparent flex items-end p-8">
              <div>
                <h3 className="text-3xl text-white mb-2">EXPERT COACHING STAFF</h3>
                <p className="text-white/80">Licensed, experienced, and dedicated to youth development.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Club Identity */}
      <section className="py-20 bg-[hsl(var(--true-white))] border-t border-[hsl(var(--white))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-3 block">COMMUNITY</span>
          <h2 className="text-4xl md:text-5xl text-[hsl(var(--black))] mb-12">OUR CLUBS</h2>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {[
              'Hyde Park Rangers FC', 'Bronzeville Athletic Club', 'Hunnids Athletic Club', 
              'South Shore Sports Club', 'Colonia FC', 'Midway FC', 
              'Englewood Athletic Club', 'Pilsen FC'
            ].map((club, idx) => (
              <div key={idx} className="bg-[hsl(var(--light-bg))] px-6 py-4 rounded-xl border border-[hsl(var(--white))] font-['Bebas_Neue'] text-xl md:text-2xl text-[hsl(var(--black))] tracking-wide shadow-sm">
                {club}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Register CTA */}
      <section className="py-24 md:py-32 bg-[hsl(var(--black))] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl md:text-7xl text-[hsl(var(--true-white))] mb-6">JOIN THE ACADEMY</h2>
          <p className="text-[hsl(var(--gray))] text-xl mb-10">
            Secure your child's spot for the upcoming season. Spaces are limited across all age groups.
          </p>
          <Button asChild className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white nav-text text-xl px-12 py-8 h-auto shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all duration-300">
            <a href="https://form.typeform.com/to/IajKM5fB" target="_blank" rel="noopener noreferrer">
              REGISTER YOUR CHILD <ArrowRight className="ml-2 w-6 h-6" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}

export default YouthPage;