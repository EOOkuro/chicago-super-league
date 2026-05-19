import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
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

  const matchdayFixtures = [
    { match: 'Hyde Park Rangers FC vs Al Farooq', date: 'Sunday, May 17, 2025', location: 'Jackson Park' },
    { match: 'Bronzeville Athletic Club vs GF.Chicago.SN', date: 'Sunday, May 17, 2025', location: 'De La Salle' },
    { match: 'Beverly FC vs Pilsen FC', date: 'Sunday, May 17, 2025', location: 'Comed' },
    { match: 'Midway FC vs Hunnids Athletic Club', date: 'Sunday, May 17, 2025', location: 'West Lawn' }
  ];

  const recentResults = [
    { id: 1, date: 'May 10, 2025', homeTeam: 'Hunnids AC', awayTeam: 'Midway FC', homeScore: 2, awayScore: 1, status: 'FT' },
    { id: 2, date: 'May 10, 2025', homeTeam: 'Bronzeville AC', awayTeam: 'Hyde Park Rangers', homeScore: 0, awayScore: 0, status: 'FT' },
    { id: 3, date: 'May 4, 2025', homeTeam: 'Pilsen FC', awayTeam: 'Beverly FC', homeScore: 3, awayScore: 1, status: 'FT' },
    { id: 4, date: 'May 4, 2025', homeTeam: 'Al Farooq FC', awayTeam: 'South Shore SC', homeScore: 1, awayScore: 2, status: 'FT' }
  ];

  return (
    <>
      <Helmet>
        <title>Chicago Super League | Where Champions Rise</title>
        <meta name="description" content="The premier competitive soccer league in Chicago. Bringing together diverse neighborhoods and fostering competitive excellence." />
      </Helmet>
      
      <div className="relative">
        <Hero />
        
        {/* News Ticker Overlay on Hero */}
        {!loading && news.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-[hsl(var(--black))]/80 backdrop-blur-md border-t border-[hsl(var(--white))]/20 z-20 overflow-hidden">
            <div className="flex items-center">
              <div className="bg-[hsl(var(--primary))] text-white px-4 py-2 font-bold uppercase tracking-widest text-xs whitespace-nowrap z-10 shadow-[4px_0_10px_rgba(0,0,0,0.5)]">
                Latest News
              </div>
              <div className="flex-1 overflow-hidden relative h-8 flex items-center">
                <motion.div 
                  className="flex whitespace-nowrap gap-8 px-4"
                  animate={{ x: [0, -1000] }}
                  transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                >
                  {news.slice(0, 4).map((item, i) => (
                    <Link key={i} to="/news" className="text-[hsl(var(--true-white))] text-sm hover:text-[hsl(var(--primary-light))] transition-colors flex items-center gap-2">
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

      {/* Latest News Section */}
      <section className="py-20 bg-[hsl(var(--light-bg))] border-b border-[hsl(var(--white))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
            <div>
              <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-2 block">
                OFFICIAL UPDATES
              </span>
              <h2 className="text-[hsl(var(--black))] m-0 text-4xl md:text-5xl">LATEST NEWS</h2>
            </div>
            <Button asChild variant="outline" className="border-2 border-[hsl(var(--black))] text-[hsl(var(--black))] hover:bg-[hsl(var(--black))] hover:text-[hsl(var(--true-white))] nav-text text-lg px-6">
              <Link to="/news">
                View All News <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {!loading && news.slice(0, 4).map((article, index) => (
              <Card key={article.id} className="bg-[hsl(var(--true-white))] border-[hsl(var(--white))] shadow-sm hover:shadow-md transition-all group flex flex-col h-full">
                <CardContent className="p-5 flex flex-col h-full">
                  <div className="text-xs font-bold text-[hsl(var(--gray))] uppercase tracking-widest mb-3">
                    {new Date(article.pubDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                  <h3 className="text-xl font-['Bebas_Neue'] text-[hsl(var(--black))] mb-2 group-hover:text-[hsl(var(--primary))] transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-[hsl(var(--gray))] text-sm mb-4 flex-grow line-clamp-3">
                    {article.excerpt}
                  </p>
                  <a 
                    href={article.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[hsl(var(--primary))] font-bold uppercase tracking-wider text-xs hover:text-[hsl(var(--primary-dark))] transition-colors mt-auto inline-flex items-center"
                  >
                    Read More <ArrowRight className="ml-1 w-3 h-3" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <ClubsSection />
      
      {/* Standings Section */}
      <section className="py-20 md:py-32 bg-[hsl(var(--true-white))] border-t border-[hsl(var(--white))]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
            <div>
              <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-2 block">
                CURRENT STANDINGS
              </span>
              <h2 className="text-[hsl(var(--black))] m-0 text-4xl md:text-5xl">OUTSOUTH LEAGUE</h2>
            </div>
            <Button asChild variant="outline" className="border-2 border-[hsl(var(--black))] text-[hsl(var(--black))] hover:bg-[hsl(var(--black))] hover:text-[hsl(var(--true-white))] nav-text text-lg px-6">
              <Link to="/stats">
                Full Stats <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
          
          <StandingsTable highlightTop={4} />
        </div>
      </section>

      {/* Latest Results Section */}
      <section className="py-20 bg-[hsl(var(--black))] text-[hsl(var(--true-white))] border-t border-[hsl(var(--primary))]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
            <div>
              <span className="label-text text-[hsl(var(--primary-light))] font-bold tracking-widest mb-2 block">
                RECENT MATCHES
              </span>
              <h2 className="text-[hsl(var(--true-white))] m-0 text-4xl md:text-5xl">LATEST RESULTS</h2>
            </div>
            <Button asChild variant="outline" className="border-2 border-[hsl(var(--true-white))] text-[hsl(var(--true-white))] hover:bg-[hsl(var(--true-white))] hover:text-[hsl(var(--black))] nav-text text-lg px-6">
              <Link to="/results">
                View All Results <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentResults.map((result) => (
              <div key={result.id} className="bg-[hsl(var(--secondary))] border border-[hsl(var(--gray))]/30 rounded-xl p-6 hover:border-[hsl(var(--primary))] transition-colors">
                <div className="text-xs font-bold text-[hsl(var(--gray))] uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Calendar className="w-3 h-3" /> {result.date}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex-1 text-right font-['Bebas_Neue'] text-2xl tracking-wide">{result.homeTeam}</div>
                  <div className="mx-6 flex items-center gap-3 bg-[hsl(var(--black))] px-4 py-2 rounded-lg border border-[hsl(var(--gray))]/20">
                    <span className="font-['Bebas_Neue'] text-3xl text-[hsl(var(--primary-light))]">{result.homeScore}</span>
                    <span className="text-[hsl(var(--gray))] text-xs font-bold">FT</span>
                    <span className="font-['Bebas_Neue'] text-3xl text-[hsl(var(--primary-light))]">{result.awayScore}</span>
                  </div>
                  <div className="flex-1 text-left font-['Bebas_Neue'] text-2xl tracking-wide">{result.awayTeam}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Matchday 1 Fixtures Section */}
      <section className="py-20 bg-[hsl(var(--light-bg))] border-t border-[hsl(var(--white))]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
            <div>
              <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-2 block">
                OUTSOUTH LEAGUE · OPEN DIVISION
              </span>
              <h2 className="text-[hsl(var(--black))] m-0 text-4xl md:text-5xl">MATCHDAY 1 FIXTURES</h2>
            </div>
            <Button asChild variant="outline" className="border-2 border-[hsl(var(--black))] text-[hsl(var(--black))] hover:bg-[hsl(var(--black))] hover:text-[hsl(var(--true-white))] nav-text text-lg px-6">
              <Link to="/fixtures">
                All Fixtures <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {matchdayFixtures.map((fixture, index) => (
              <MatchCard key={index} match={fixture.match} date={fixture.date} location={fixture.location} />
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