import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

import Hero from '../components/Hero.jsx';
import Ticker from '../components/Ticker.jsx';
import KickoffBanner from '../components/KickoffBanner.jsx';
import ClubsSection from '../components/ClubsSection.jsx';
import StandingsTable from '../components/StandingsTable.jsx';
import LeagueStructure from '../components/LeagueStructure.jsx';
import SponsorsSection from '../components/SponsorsSection.jsx';
import JoinCTA from '../components/JoinCTA.jsx';
import MatchCard from '../components/MatchCard.jsx';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { useSubstackFeed } from '../hooks/useSubstackFeed.js';

function HomePage() {
  const { news, loading } = useSubstackFeed();

  const upcomingFixtures = [
    {
      match: 'Pilsen FC vs Hyde Park Rangers FC',
      date: 'June 14, 2026',
      location: 'ComEd Recreation Center'
    },
    {
      match: 'GF Chicago SN vs Al Farooq FC',
      date: 'June 14, 2026',
      location: 'Jackson Park'
    },
    {
      match: 'Beverly FC vs Midway FC',
      date: 'June 14, 2026',
      location: 'Joan Kroc Center'
    }
  ];

  const recentResults = [
    {
      id: 1,
      date: 'May 10, 2026',
      homeTeam: 'Hunnids AC',
      awayTeam: 'Midway FC',
      homeScore: 2,
      awayScore: 1
    },
    {
      id: 2,
      date: 'May 10, 2026',
      homeTeam: 'Bronzeville AC',
      awayTeam: 'Hyde Park Rangers',
      homeScore: 0,
      awayScore: 0
    },
    {
      id: 3,
      date: 'May 4, 2026',
      homeTeam: 'Pilsen FC',
      awayTeam: 'Beverly FC',
      homeScore: 3,
      awayScore: 1
    },
    {
      id: 4,
      date: 'May 4, 2026',
      homeTeam: 'Al Farooq FC',
      awayTeam: 'South Shore SC',
      homeScore: 1,
      awayScore: 2
    }
  ];

  return (
    <>
      <Helmet>
        <title>Chicago Super League | South Side Soccer</title>

        <meta
          name="description"
          content="Competitive community soccer across Chicago’s South Side."
        />
      </Helmet>

      <div className="relative">
        <Hero />

        {!loading && news.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-[hsl(var(--black))]/80 backdrop-blur-md border-t border-[hsl(var(--white))]/20 z-20 overflow-hidden">

            <div className="flex items-center">

              <div className="bg-[hsl(var(--primary))] text-white px-4 py-2 font-bold uppercase tracking-widest text-xs whitespace-nowrap z-10">
                Latest News
              </div>

              <div className="flex-1 overflow-hidden relative h-8 flex items-center">

                <motion.div
                  className="flex whitespace-nowrap gap-8 px-4"
                  animate={{ x: [0, -1000] }}
                  transition={{
                    repeat: Infinity,
                    duration: 30,
                    ease: 'linear'
                  }}
                >
                  {news.slice(0, 4).map((item, i) => (
                    <Link
                      key={i}
                      to="/news"
                      className="text-white text-sm hover:text-[hsl(var(--primary-light))] transition-colors flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))]"></span>

                      {item.title}
                    </Link>
                  ))}
                </motion.div>

              </div>
            </div>
          </div>
        )}
      </div>

      <Ticker />

      <KickoffBanner />

      {/* FEATURED MATCH */}
      <section className="py-20 bg-[hsl(var(--black))] text-white border-t border-[hsl(var(--primary))]">

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <span className="label-text text-[hsl(var(--primary-light))] font-bold tracking-widest mb-4 block">
            FEATURED MATCH
          </span>

          <h2 className="text-5xl md:text-7xl font-['Bebas_Neue'] text-[hsl(var(--primary))] mb-4">
            PILSEN FC VS HYDE PARK RANGERS FC
          </h2>

          <p className="text-xl md:text-2xl text-white tracking-wide mb-2">
            June 14, 2026
          </p>

          <p className="text-lg text-[hsl(var(--gray))] mb-8">
           
          </p>

          <Button
            size="lg"
            className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white nav-text text-xl px-8 py-6"
          >
            Watch Live
          </Button>

        </div>
      </section>

      <ClubsSection />

      {/* STANDINGS */}
      <section className="py-20 md:py-32 bg-[hsl(var(--true-white))]">

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">

            <div>
              <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-2 block">
                CURRENT STANDINGS
              </span>

              <h2 className="text-[hsl(var(--black))] m-0 text-4xl md:text-5xl">
                OUTSOUTH LEAGUE
              </h2>
            </div>

          </div>

          <StandingsTable highlightTop={4} />

        </div>
      </section>

      {/* RECENT RESULTS */}
      <section className="py-20 bg-[hsl(var(--light-bg))]">

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-10">
            <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-2 block">
              RECENT MATCHES
            </span>

            <h2 className="text-[hsl(var(--black))] text-4xl md:text-5xl">
              LATEST RESULTS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {recentResults.map((result) => (
              <div
                key={result.id}
                className="bg-white border rounded-xl p-6"
              >
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Calendar className="w-3 h-3" />
                  {result.date}
                </div>

                <div className="flex items-center justify-between">

                  <div className="flex-1 text-right font-['Bebas_Neue'] text-2xl">
                    {result.homeTeam}
                  </div>

                  <div className="mx-6 flex items-center gap-3 bg-black text-white px-4 py-2 rounded-lg">
                    <span className="text-3xl">
                      {result.homeScore}
                    </span>

                    <span className="text-xs font-bold">
                      FT
                    </span>

                    <span className="text-3xl">
                      {result.awayScore}
                    </span>
                  </div>

                  <div className="flex-1 text-left font-['Bebas_Neue'] text-2xl">
                    {result.awayTeam}
                  </div>

                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* UPCOMING FIXTURES */}
      <section className="py-20 bg-[hsl(var(--black))] text-white">

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-10">

            <span className="label-text text-[hsl(var(--primary-light))] font-bold tracking-widest mb-2 block">
              UPCOMING FIXTURES
            </span>

            <h2 className="text-4xl md:text-5xl">
              JUNE 14 MATCHDAY
            </h2>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {upcomingFixtures.map((fixture, index) => (
              <MatchCard
                key={index}
                match={fixture.match}
                date={fixture.date}
                location={fixture.location}
              />
            ))}

          </div>
        </div>
      </section>

      <LeagueStructure />
      <SponsorsSection />
      <JoinCTA />
    </>
  );
}

export default HomePage;