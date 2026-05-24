import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ChevronDown, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { fetchAllMatchData } from '../hooks/useMatchData.js';

function ResultsPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleResults, setVisibleResults] = useState(4);

  useEffect(() => {
    fetchAllMatchData().then(matches => {
      setResults(matches);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <div className="bg-[hsl(var(--background))] min-h-screen">
      <Helmet>
        <title>Match Results | Chicago Super League</title>
        <meta name="description" content="Latest match results and scores from the OutSouth League Season 1. Full-time scores, match reports, and completed fixture details." />
        <link rel="canonical" href="https://chicagosuperleague.com/results" />
        <meta property="og:title" content="Match Results | Chicago Super League" />
        <meta property="og:description" content="Latest match results and scores from the OutSouth League Season 1. Full-time scores, match reports, and completed fixture details." />
        <meta property="og:url" content="https://chicagosuperleague.com/results" />
        <meta name="twitter:title" content="Match Results | Chicago Super League" />
        <meta name="twitter:description" content="Latest match results and scores from the OutSouth League Season 1. Full-time scores, match reports, and completed fixture details." />
      </Helmet>

      <section className="pt-32 pb-16 bg-[hsl(var(--black))] text-[hsl(var(--true-white))] border-b-4 border-[hsl(var(--primary))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
          <span className="label-text text-[hsl(var(--primary-light))] font-bold tracking-widest mb-4 block">All Competitions</span>
          <h1 className="text-6xl md:text-8xl text-[hsl(var(--true-white))] mb-4">MATCH RESULTS</h1>
          <p className="text-xl text-[hsl(var(--gray))] max-w-2xl">Catch up on the latest scores and completed fixtures across the league.</p>
        </div>
      </section>

      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader className="w-8 h-8 animate-spin text-[hsl(var(--primary))]" />
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-[hsl(var(--gray))]">No results yet. Check back after Matchday 1.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {results.slice(0, visibleResults).map((match, index) => (
              <motion.div key={match.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
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
                      <div className="flex-1 flex justify-end items-center w-full md:w-auto">
                        <span className="font-['Bebas_Neue'] text-2xl md:text-3xl text-[hsl(var(--black))] text-right">{match.homeTeam}</span>
                      </div>
                      <div className="flex items-center gap-4 bg-[hsl(var(--black))] text-[hsl(var(--true-white))] px-6 py-3 rounded-xl shadow-inner">
                        <span className="font-['Bebas_Neue'] text-4xl">{match.homeScore}</span>
                        <span className="text-[hsl(var(--gray))] font-bold text-sm">FT</span>
                        <span className="font-['Bebas_Neue'] text-4xl">{match.awayScore}</span>
                      </div>
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
            {visibleResults < results.length && (
              <div className="text-center pt-12">
                <Button onClick={() => setVisibleResults(prev => Math.min(prev + 4, results.length))} variant="outline" className="border-2 border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--true-white))] nav-text text-lg px-8 py-6 h-auto">
                  Load More Results <ChevronDown className="ml-2 w-5 h-5" />
                </Button>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default ResultsPage;