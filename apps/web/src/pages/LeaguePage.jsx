import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Trophy, Lock, Star, ChevronRight, ArrowLeft, Calendar, ChevronDown } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import StandingsTable from '../components/StandingsTable.jsx';
import MatchCard from '../components/MatchCard.jsx';

const LEAGUES_INFO = {
  'csl': { name: 'CSL', status: 'TBA' },
  'southside-soccer-league': { name: 'Southside Soccer League', status: 'Coming Soon' },
  'northside-soccer-league': { name: 'Northside Soccer League', status: 'Coming Soon' },
  'outsouth-league': { name: 'OutSouth League', status: 'Active' },
  'outwest-league': { name: 'OutWest League', status: 'Coming Soon' },
  'outsouth-north-league': { name: 'OutSouth North League', status: 'Coming Soon' },
  'outsouth-south-league': { name: 'OutSouth South League', status: 'Coming Soon' },
  'outwest-north-league': { name: 'OutWest North League', status: 'Coming Soon' },
  'outwest-south-league': { name: 'OutWest South League', status: 'Coming Soon' }
};

const ALL_FIXTURES = [
  { match: 'Hunnids AC vs Bronzeville AC', date: 'May 4, 2025', location: 'West Lawn' },
  { match: 'Pilsen FC vs Midway FC', date: 'May 4, 2025', location: 'Comed' },
  { match: 'Beverly FC vs Pilsen FC', date: 'May 11, 2025', location: 'Comed' },
  { match: 'Midway FC vs Hunnids AC', date: 'May 15, 2025', location: 'West Lawn' },
  { match: 'Hyde Park Rangers vs Al Farooq FC', date: 'May 17, 2025', location: 'Jackson Park' },
  { match: 'Bronzeville AC vs GF.Chicago.SN', date: 'May 17, 2025', location: 'De La Salle' },
  { match: 'GF.Chicago.SN vs Beverly FC', date: 'May 24, 2025', location: 'De La Salle' },
  { match: 'Al Farooq FC vs Midway FC', date: 'May 24, 2025', location: 'Jackson Park' }
];

function LeaguePage() {
  const { leagueName } = useParams();
  const [visibleFixtures, setVisibleFixtures] = useState(4);
  
  // Parse division and base slug
  const isWomen = leagueName?.startsWith('women-');
  const baseSlug = isWomen ? leagueName.replace('women-', '') : leagueName;
  const divisionName = isWomen ? 'Women Division' : 'Open Division';
  
  const leagueInfo = LEAGUES_INFO[baseSlug];
  
  // If league doesn't exist in our map, show a fallback
  if (!leagueInfo) {
    return (
      <div className="pt-40 pb-24 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl font-['Bebas_Neue'] text-[hsl(var(--black))] mb-4">League Not Found</h1>
        <p className="text-[hsl(var(--gray))] mb-8">The competition you are looking for does not exist.</p>
        <Link to="/" className="bg-[hsl(var(--primary))] text-white px-6 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-[hsl(var(--primary-dark))] transition-colors">
          Return Home
        </Link>
      </div>
    );
  }

  // Determine status (Women's division is entirely Coming Soon for now)
  const status = isWomen ? 'Coming Soon' : leagueInfo.status;
  const isActiveOutSouth = !isWomen && baseSlug === 'outsouth-league';

  const handleLoadMoreFixtures = () => {
    setVisibleFixtures(prev => Math.min(prev + 4, ALL_FIXTURES.length));
  };

  return (
    <div className="pt-32 pb-24 bg-[hsl(var(--background))] min-h-screen">
      <Helmet>
        <title>{`${leagueInfo.name} | ${divisionName} | Chicago Super League`}</title>
        <meta name="description" content={`View standings, fixtures, and information for the ${leagueInfo.name} ${divisionName} in the Chicago Super League.`} />
        <link rel="canonical" href={`https://chicagosuperleague.com/league/${leagueName}`} />
        <meta property="og:title" content={`${leagueInfo.name} | ${divisionName} | Chicago Super League`} />
        <meta property="og:description" content={`View standings, fixtures, and information for the ${leagueInfo.name} ${divisionName} in the Chicago Super League.`} />
        <meta property="og:url" content={`https://chicagosuperleague.com/league/${leagueName}`} />
        <meta name="twitter:title" content={`${leagueInfo.name} | ${divisionName} | Chicago Super League`} />
        <meta name="twitter:description" content={`View standings, fixtures, and information for the ${leagueInfo.name} ${divisionName} in the Chicago Super League.`} />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Back Navigation */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex items-center text-sm font-medium text-[hsl(var(--gray))]">
            <Link to="/" className="hover:text-[hsl(var(--primary))] transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2 opacity-50" />
            <span>Competitions</span>
            <ChevronRight className="w-4 h-4 mx-2 opacity-50" />
            <span>{divisionName}</span>
            <ChevronRight className="w-4 h-4 mx-2 opacity-50" />
            <span className="text-[hsl(var(--black))]">{leagueInfo.name}</span>
          </div>
          
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-[hsl(var(--primary))] hover:text-[hsl(var(--primary-dark))] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </motion.div>

        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest text-lg">
              {divisionName}
            </span>
            <span className={`label-text text-xs font-bold px-3 py-1 rounded-full ${
              status === 'Active' ? 'bg-[hsl(var(--primary))] text-white' :
              status === 'TBA' ? 'bg-[hsl(var(--black))] text-white' :
              'bg-[hsl(var(--white))] text-[hsl(var(--gray))]'
            }`}>
              {status}
            </span>
          </div>
          <h1 className="text-[hsl(var(--black))] text-5xl md:text-7xl font-['Bebas_Neue'] tracking-wide">{leagueInfo.name}</h1>
        </motion.div>

        {/* Content Area */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {isActiveOutSouth ? (
            <Tabs defaultValue="standings" className="w-full">
              <TabsList className="bg-[hsl(var(--light-bg))] border border-[hsl(var(--white))] h-auto flex flex-wrap justify-start gap-2 p-2 rounded-xl mb-8">
                <TabsTrigger value="standings" className="nav-text text-lg px-6 py-3 rounded-lg data-[state=active]:bg-[hsl(var(--primary))] data-[state=active]:text-[hsl(var(--true-white))]">Standings</TabsTrigger>
                <TabsTrigger value="fixtures" className="nav-text text-lg px-6 py-3 rounded-lg data-[state=active]:bg-[hsl(var(--primary))] data-[state=active]:text-[hsl(var(--true-white))]">Fixtures</TabsTrigger>
                <TabsTrigger value="top-scorers" className="nav-text text-lg px-6 py-3 rounded-lg data-[state=active]:bg-[hsl(var(--primary))] data-[state=active]:text-[hsl(var(--true-white))]">Top Scorers</TabsTrigger>
                <TabsTrigger value="assists" className="nav-text text-lg px-6 py-3 rounded-lg data-[state=active]:bg-[hsl(var(--primary))] data-[state=active]:text-[hsl(var(--true-white))]">Assists</TabsTrigger>
                <TabsTrigger value="results" className="nav-text text-lg px-6 py-3 rounded-lg data-[state=active]:bg-[hsl(var(--primary))] data-[state=active]:text-[hsl(var(--true-white))]">Results</TabsTrigger>
              </TabsList>

              {/* STANDINGS TAB */}
              <TabsContent value="standings" className="animate-in fade-in duration-500">
                <div className="drop-shadow-sm">
                  <div className="bg-[hsl(var(--black))] text-[hsl(var(--true-white))] p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 rounded-t-2xl">
                    <div>
                      <h2 className="text-3xl md:text-4xl font-['Bebas_Neue'] tracking-wide">Standings</h2>
                      <p className="label-text text-[hsl(var(--gray))] tracking-widest mt-1">
                        SEASON 1 · 2025
                      </p>
                    </div>
                    <div className="bg-emerald-500/20 border border-emerald-500/30 px-4 py-2 rounded-lg flex items-center gap-3">
                      <Trophy className="w-5 h-5 text-emerald-400" />
                      <span className="label-text text-emerald-400 text-sm font-bold tracking-wide">
                        TOP 4 TEAMS PROMOTED
                      </span>
                    </div>
                  </div>
                  
                  <div className="-mt-2 relative z-10">
                    <StandingsTable highlightTop={4} promotionText="Top 4 promoted to Southside League" />
                  </div>
                </div>
              </TabsContent>

              {/* FIXTURES TAB */}
              <TabsContent value="fixtures" className="animate-in fade-in duration-500">
                <div className="flex items-center gap-3 mb-8 border-b border-[hsl(var(--white))] pb-4">
                  <Calendar className="w-8 h-8 text-[hsl(var(--primary))]" />
                  <h2 className="text-4xl font-['Bebas_Neue'] text-[hsl(var(--black))] tracking-wide m-0">Upcoming Fixtures</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {ALL_FIXTURES.slice(0, visibleFixtures).map((fixture, index) => (
                    <MatchCard key={index} {...fixture} />
                  ))}
                </div>
                
                {visibleFixtures < ALL_FIXTURES.length && (
                  <div className="text-center pt-10">
                    <Button 
                      onClick={handleLoadMoreFixtures} 
                      variant="outline" 
                      className="border-2 border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--true-white))] nav-text text-lg px-8 py-6 h-auto"
                    >
                      Load More Fixtures <ChevronDown className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                )}
              </TabsContent>

              {/* PLACEHOLDER TABS */}
              <TabsContent value="top-scorers" className="animate-in fade-in duration-500">
                <PlaceholderTab title="Top Scorers" />
              </TabsContent>
              <TabsContent value="assists" className="animate-in fade-in duration-500">
                <PlaceholderTab title="Top Assists" />
              </TabsContent>
              <TabsContent value="results" className="animate-in fade-in duration-500">
                <PlaceholderTab title="Match Results" />
              </TabsContent>
            </Tabs>
          ) : (
            /* Empty State for TBA / Coming Soon */
            <div className="bg-[hsl(var(--true-white))] rounded-2xl border border-[hsl(var(--white))] p-12 md:p-24 flex flex-col items-center justify-center text-center shadow-sm">
              <div className="w-20 h-20 rounded-full bg-[hsl(var(--light-bg))] flex items-center justify-center mb-6">
                {status === 'TBA' ? (
                  <Star className="w-10 h-10 text-[hsl(var(--gray))]" />
                ) : (
                  <Lock className="w-10 h-10 text-[hsl(var(--gray))] opacity-50" />
                )}
              </div>
              <h2 className="text-3xl md:text-4xl text-[hsl(var(--black))] mb-4 font-['Bebas_Neue'] tracking-wide">
                {status === 'TBA' ? 'Details To Be Announced' : 'Season Coming Soon'}
              </h2>
              <p className="text-[hsl(var(--gray))] max-w-md mx-auto text-lg">
                {status === 'TBA' 
                  ? `Information regarding the ${leagueInfo.name} structure and participating clubs will be released soon.`
                  : `The ${leagueInfo.name} is currently in preparation. Check back later for fixtures, standings, and club information.`}
              </p>
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
}

function PlaceholderTab({ title }) {
  return (
    <div className="bg-[hsl(var(--true-white))] border border-dashed border-[hsl(var(--gray))]/30 rounded-2xl p-16 text-center shadow-sm">
      <div className="w-16 h-16 bg-[hsl(var(--light-bg))] rounded-full flex items-center justify-center mx-auto mb-6">
        <Calendar className="w-8 h-8 text-[hsl(var(--gray))]" />
      </div>
      <h3 className="text-3xl text-[hsl(var(--black))] font-['Bebas_Neue'] mb-3 tracking-wide">{title} Data Coming Soon</h3>
      <p className="text-[hsl(var(--gray))] text-lg">
        Check back after the Season 1 kickoff on May 17, 2025.
      </p>
    </div>
  );
}

export default LeaguePage;