import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Globe2, Building2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import LeagueStructure from '../components/LeagueStructure.jsx';

function AboutPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="bg-[hsl(var(--background))] min-h-screen">
      <Helmet>
        <title>About | Chicago Super League</title>
        <meta name="description" content="The story, mission, and structure of the Chicago Super League." />
      </Helmet>

      {/* 1. Hero Section */}
      <section className="relative pt-40 pb-32 md:pt-52 md:pb-40 bg-[hsl(var(--black))] overflow-hidden flex items-center min-h-[70vh]">
        {/* Background texture/glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--black))] to-[hsl(var(--background))] opacity-20"></div>
        <div className="absolute top-0 right-0 w-3/4 h-full bg-[hsl(var(--primary))]/10 blur-[120px] rounded-full transform translate-x-1/3 -translate-y-1/4"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={stagger}
            className="max-w-5xl"
          >
            <motion.span variants={fadeUp} className="label-text text-[hsl(var(--primary-light))] font-bold tracking-widest mb-6 block text-xl">
              OUR ORIGIN
            </motion.span>
            <motion.h1 variants={fadeUp} className="text-[hsl(var(--true-white))] text-6xl md:text-8xl lg:text-9xl leading-none mb-8">
              BUILT BY THE <span className="text-[hsl(var(--primary))]">SOUTH SIDE</span><br />
              FOR THE SOUTH SIDE
            </motion.h1>
            <motion.p variants={fadeUp} className="text-2xl text-[hsl(var(--gray))] max-w-2xl">
              Building a unified, competitive soccer ecosystem that champions local talent, empowers communities, and professionalizes grassroots sports in Chicago.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. Mission Section */}
      <section className="py-24 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.span variants={fadeUp} className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-4 block">
              OUR MISSION
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-5xl md:text-6xl text-[hsl(var(--black))] mb-8">
              MORE THAN A LEAGUE
            </motion.h2>
            <motion.div variants={fadeUp} className="prose prose-lg text-[hsl(var(--gray))]">
              <p className="text-xl text-[hsl(var(--black))] font-medium mb-6">
                The Chicago Super League represents a new model for community-driven soccer, bridging the gap between recreational play and professional aspirations.
              </p>
              <p className="mb-6">
                For too long, local talent in Chicago has lacked a structured, professionally operated platform to showcase their skills and build community pride on a city-wide stage. Neighborhood leagues operate in silos, while elite avenues remain financially out of reach for many.
              </p>
              <p>
                Starting with the OutSouth League, we are laying the groundwork for a city-wide pyramid that connects grassroots community leagues to a premier city championship. By establishing sustainable clubs and clear promotion pathways, we are giving players a reason to stay, compete, and represent their neighborhoods.
              </p>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[hsl(var(--primary))] p-10 md:p-16 rounded-3xl shadow-xl relative"
          >
            <div className="absolute top-8 left-8 text-[hsl(var(--true-white))]/20 font-serif text-9xl leading-none rotate-180">"</div>
            <blockquote className="relative z-10 text-[hsl(var(--true-white))] text-2xl md:text-4xl font-medium leading-snug font-['Bebas_Neue'] tracking-wide">
              We aren't just organizing matches. We are building enduring institutions that anchor neighborhoods and elevate the game.
            </blockquote>
            <div className="mt-8 flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 bg-[hsl(var(--black))] rounded-full flex items-center justify-center font-bold text-[hsl(var(--true-white))] font-['Bebas_Neue'] text-xl">CSL</div>
              <div>
                <div className="text-[hsl(var(--true-white))] font-bold">The Founders</div>
                <div className="text-[hsl(var(--true-white))]/80 text-sm uppercase tracking-widest">Chicago Super League</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Values Section */}
      <section className="py-24 md:py-32 bg-[hsl(var(--true-white))] border-y border-[hsl(var(--white))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-4 block">
              CORE PRINCIPLES
            </span>
            <h2 className="text-5xl md:text-6xl text-[hsl(var(--black))]">WHAT WE STAND FOR</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-none shadow-lg bg-[hsl(var(--light-bg))] p-8 hover:-translate-y-1 transition-transform duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[hsl(var(--primary))] rounded-2xl flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-[hsl(var(--true-white))]" />
                </div>
                <h3 className="text-3xl text-[hsl(var(--black))] mb-4">Community Ownership</h3>
                <p className="text-[hsl(var(--gray))] text-lg">
                  Our clubs represent the neighborhoods they come from. We prioritize local engagement, ensuring that teams are supported by and give back to their immediate communities.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-[hsl(var(--light-bg))] p-8 hover:-translate-y-1 transition-transform duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[hsl(var(--black))] rounded-2xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-[hsl(var(--true-white))]" />
                </div>
                <h3 className="text-3xl text-[hsl(var(--black))] mb-4">Player Development</h3>
                <p className="text-[hsl(var(--gray))] text-lg">
                  Providing a highly competitive environment that pushes players to reach their potential. A true promotion and relegation system ensures every match matters.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-[hsl(var(--light-bg))] p-8 hover:-translate-y-1 transition-transform duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[hsl(var(--black))] rounded-2xl flex items-center justify-center mb-6">
                  <Globe2 className="w-8 h-8 text-[hsl(var(--true-white))]" />
                </div>
                <h3 className="text-3xl text-[hsl(var(--black))] mb-4">Diaspora Welcome</h3>
                <p className="text-[hsl(var(--gray))] text-lg">
                  Chicago is a global city. We celebrate the diverse cultural heritage of our players and supporters, creating an inclusive space where everyone belongs on the pitch.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-[hsl(var(--light-bg))] p-8 hover:-translate-y-1 transition-transform duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[hsl(var(--primary))] rounded-2xl flex items-center justify-center mb-6">
                  <Building2 className="w-8 h-8 text-[hsl(var(--true-white))]" />
                </div>
                <h3 className="text-3xl text-[hsl(var(--black))] mb-4">Durable Institutions</h3>
                <p className="text-[hsl(var(--gray))] text-lg">
                  Moving past temporary "pub teams" to build lasting clubs with distinct identities, robust operations, and long-term viability that can anchor a community for generations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 4. Story Section */}
      <section className="py-24 md:py-32 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-4 block">
            OUR HISTORY
          </span>
          <h2 className="text-5xl md:text-6xl text-[hsl(var(--black))]">HOW WE GOT HERE</h2>
        </div>

        <div className="space-y-12 text-[hsl(var(--gray))] text-lg md:text-xl leading-relaxed">
          <p>
            The vision for the <strong className="text-[hsl(var(--black))]">Chicago Super League (CSL)</strong> was born out of necessity. Despite Chicago's rich soccer culture and massive player base, top-tier amateur talent lacked a unified, professionally operated pyramid.
          </p>
          <p>
            In collaboration with <strong className="text-[hsl(var(--black))]">MegCity SOccer</strong>—a dedicated sports management and logistics organization—the framework for a sustainable, competitive ecosystem was designed. Rather than attempting a massive city-wide launch immediately, the founders recognized the need to build a strong foundation first.
          </p>
          <div className="p-8 border-l-4 border-[hsl(var(--primary))] bg-[hsl(var(--white))]/30 rounded-r-xl my-10">
            <h3 className="text-2xl text-[hsl(var(--black))] mb-4 font-['Bebas_Neue'] tracking-wide">Enter the OutSouth League</h3>
            <p className="m-0">
              Launching in Summer 2026, the OutSouth League serves as the inaugural competition and the blueprint for the broader CSL structure. Eight founding clubs stepped forward, representing neighborhoods across the South Side, committing to higher standards of play and organization.
            </p>
          </div>
          <p>
            These founding clubs—Hyde Park Rangers FC, Pilsen FC, Beverly FC, Midway FC, Al Farooq FC, GF.Chicago.SN, Hunnids Athletic Club, and Bronzeville Athletic Club—are setting the standard. Their success and operational stability will pave the way for future expansions into the North, West, and eventually a unified city championship.
          </p>
        </div>
      </section>

      {/* 5. Structure Section */}
      <LeagueStructure />

      {/* 6. CTA Section */}
      <section className="py-24 md:py-32 bg-[hsl(var(--black))] text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl md:text-7xl text-[hsl(var(--true-white))] mb-6">READY TO BE PART OF IT?</h2>
          <p className="text-[hsl(var(--gray))] text-xl md:text-2xl mb-12 max-w-2xl mx-auto">
            Whether you want to lead a club to glory or align your brand with the future of Chicago soccer, the time is now.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button asChild className="w-full sm:w-auto bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-[hsl(var(--true-white))] nav-text text-xl px-10 py-8 h-auto shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all duration-300">
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSdYxsjYmVIhkj5YVFWAnFObplET0aFMCPta7zShoeFnx-0o3g/viewform?usp=header" target="_blank" rel="noopener noreferrer">
                Register to Play <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
            <Button asChild variant="outline" className="w-full sm:w-auto border-2 border-[hsl(var(--white))] text-[hsl(var(--true-white))] hover:bg-[hsl(var(--white))] hover:text-[hsl(var(--black))] bg-transparent nav-text text-xl px-10 py-8 h-auto transition-all duration-300">
              <Link to="/sponsors">
                Become a Sponsor
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;