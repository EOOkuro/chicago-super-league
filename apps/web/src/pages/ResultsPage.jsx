import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Mock completed matches data
const RESULTS_DATA = [
  {
    id: 1,
    date: 'Saturday, May 10, 2025',
    competition: 'Pre-Season Friendly',
    homeTeam: 'Hunnids AC',
    awayTeam: 'Midway FC',
    homeScore: 2,
    awayScore: 1,
    location: 'Jackson Park Turf',
    status: 'FT'
  },
  {
    id: 2,
    date: 'Saturday, May 10, 2025',
    competition: 'Pre-Season Friendly',
    homeTeam: 'Bronzeville AC',
    awayTeam: 'Hyde Park Rangers',
    homeScore: 0,
    awayScore: 0,
    location: 'De La Salle',
    status: 'FT'
  },
  {
    id: 3,
    date: 'Sunday, May 4, 2025',
    competition: 'Pre-Season Friendly',
    homeTeam: 'Pilsen FC',
    awayTeam: 'Beverly FC',
    homeScore: 3,
    awayScore: 1,
    location: 'Comed',
    status: 'FT'
  },
  {
    id: 4,
    date: 'Sunday, May 4, 2025',
    competition: 'Pre-Season Friendly',
    homeTeam: 'Al Farooq FC',
    awayTeam: 'South Shore SC',
    homeScore: 1,
    awayScore: 2,
    location: 'Jackson Park Turf',
    status: 'FT'
  },
  {
    id: 5,
    date: 'Saturday, April 26, 2025',
    competition: 'Exhibition',
    homeTeam: 'Midway FC',
    awayTeam: 'Pilsen FC',
    homeScore: 2,
    awayScore: 2,
    location: 'West Lawn',
    status: 'FT'
  },
  {
    id: 6,
    date: 'Saturday, April 26, 2025',
    competition: 'Exhibition',
    homeTeam: 'Hunnids AC',
    awayTeam: 'Bronzeville AC',
    homeScore: 4,
    awayScore: 0,
    location: 'West Lawn',
    status: 'FT'
  }
];

function ResultsPage() {
  const [visibleResults, setVisibleResults] = useState(4);

  const handleLoadMore = () => {
    setVisibleResults(prev => Math.min(prev + 4, RESULTS_DATA.length));
  };

  return (
    <div className="bg-[hsl(var(--background))] min-h-screen">
      <Helmet>
        <title>Match Results | Chicago Super League</title>
        <meta name="description" content="Latest match results and scores from the Chicago Super League." />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-[hsl(var(--black))] text-[hsl(var(--true-white))] border-b-4 border-[hsl(var(--primary))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
          <span className="label-text text-[hsl(var(--primary-light))] font-bold tracking-widest mb-4 block">
            All Competitions
          </span>
          <h1 className="text-6xl md:text-8xl text-[hsl(var(--true-white))] mb-4">MATCH RESULTS</h1>
          <p className="text-xl text-[hsl(var(--gray))] max-w-2xl">
            Catch up on the latest scores and completed fixtures across the league.
          </p>
        </div>
      </section>

      {/* Results List */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {RESULTS_DATA.slice(0, visibleResults).map((match, index) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-[hsl(var(--true-white))] border-[hsl(var(--white))] shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="bg-[hsl(var(--light-bg))] px-6 py-3 border-b border-[hsl(var(--white))] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-[hsl(var(--gray))] uppercase tracking-widest">
                    <Calendar className="w-4 h-4" /> {match.date}
                  </div>
                  <div className="text-xs font-bold bg-[hsl(var(--black))] text-[hsl(var(--true-white))] px-3 py-1 rounded-full uppercase tracking-wider">
                    {match.competition}
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Home Team */}
                    <div className="flex-1 flex justify-end items-center w-full md:w-auto">
                      <span className="font-['Bebas_Neue'] text-2xl md:text-3xl text-[hsl(var(--black))] text-right">{match.homeTeam}</span>
                    </div>
                    
                    {/* Score Block */}
                    <div className="flex items-center gap-4 bg-[hsl(var(--black))] text-[hsl(var(--true-white))] px-6 py-3 rounded-xl shadow-inner">
                      <span className="font-['Bebas_Neue'] text-4xl">{match.homeScore}</span>
                      <span className="text-[hsl(var(--gray))] font-bold text-sm">FT</span>
                      <span className="font-['Bebas_Neue'] text-4xl">{match.awayScore}</span>
                    </div>

                    {/* Away Team */}
                    <div className="flex-1 flex justify-start items-center w-full md:w-auto">
                      <span className="font-['Bebas_Neue'] text-2xl md:text-3xl text-[hsl(var(--black))] text-left">{match.awayTeam}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-[hsl(var(--white))] flex justify-center">
                    <div className="text-sm font-bold text-[hsl(var(--gray))] uppercase tracking-widest flex items-center">
                      <MapPin className="w-4 h-4 mr-2" /> {match.location}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {visibleResults < RESULTS_DATA.length && (
          <div className="text-center pt-12">
            <Button 
              onClick={handleLoadMore} 
              variant="outline" 
              className="border-2 border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--true-white))] nav-text text-lg px-8 py-6 h-auto"
            >
              Load More Results <ChevronDown className="ml-2 w-5 h-5" />
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}

export default ResultsPage;