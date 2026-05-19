import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';

const openLeagues = [
  { id: 'csl', name: 'Chicago Super League', status: 'TBA', statusType: 'tba' },
  { id: 'southside', name: 'SouthSide League', status: 'Coming Soon', statusType: 'soon' },
  { id: 'northside', name: 'NorthSide League', status: 'Coming Soon', statusType: 'soon' },
  { id: 'outsouth', name: 'OutSouth League', status: 'Launching May 17', statusType: 'launching' },
  { id: 'outwest', name: 'OutWest League', status: 'Coming Soon', statusType: 'soon' },
];

const womensLeagues = [
  { id: 'os-north', name: 'OutSouth North', status: 'Coming Soon', statusType: 'soon' },
  { id: 'os-south', name: 'OutSouth South', status: 'Coming Soon', statusType: 'soon' },
  { id: 'ow-north', name: 'OutWest North', status: 'Coming Soon', statusType: 'soon' },
  { id: 'ow-south', name: 'OutWest South', status: 'Coming Soon', statusType: 'soon' },
];

function CompetitionsPage() {
  const [category, setCategory] = useState('open');
  const [selectedLeague, setSelectedLeague] = useState('');
  const navigate = useNavigate();

  const activeLeagues = category === 'open' ? openLeagues : womensLeagues;

  const getStatusBadgeStyle = (statusType) => {
    switch (statusType) {
      case 'tba':
        return 'bg-[hsl(var(--pyramid-red))]/10 text-[hsl(var(--pyramid-red))] border border-[hsl(var(--pyramid-red))]/20';
      case 'soon':
        return 'bg-[hsl(var(--pyramid-yellow))]/20 text-[hsl(var(--black))] border border-[hsl(var(--pyramid-yellow))]/50';
      case 'launching':
        return 'bg-[hsl(var(--pyramid-green))]/10 text-[hsl(var(--pyramid-green))] border border-[hsl(var(--pyramid-green))]/20';
      default:
        return 'bg-[hsl(var(--gray))]/10 text-[hsl(var(--gray))]';
    }
  };

  const handleLeagueSelect = (value) => {
    setSelectedLeague(value);
    // In the future, this could directly navigate to the league page
    // navigate(`/league/${value}`);
  };

  return (
    <div className="min-h-[100dvh] pt-24 md:pt-32 pb-24 bg-[hsl(var(--background))]">
      <Helmet>
        <title>Competitions | Chicago Super League</title>
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl text-[hsl(var(--black))] mb-4">COMPETITIONS</h1>
          <p className="text-[hsl(var(--gray))] text-xl max-w-2xl mx-auto">
            Select a category to view the available leagues in the Chicago area pyramid system.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-[hsl(var(--true-white))] rounded-2xl p-6 md:p-10 shadow-lg border border-[hsl(var(--white))]"
        >
          {/* Category Menu */}
          <div className="flex gap-4 mb-10">
            <Button
              variant="outline"
              onClick={() => {
                setCategory('open');
                setSelectedLeague('');
              }}
              className={`flex-1 h-14 font-['Barlow_Condensed'] uppercase tracking-widest text-lg md:text-xl transition-all duration-300 ${
                category === 'open' 
                  ? 'bg-[hsl(var(--black))] text-[hsl(var(--true-white))] border-[hsl(var(--black))] shadow-md' 
                  : 'bg-[hsl(var(--light-bg))] text-[hsl(var(--gray))] border-[hsl(var(--white))] hover:bg-[hsl(var(--white))] hover:text-[hsl(var(--black))]'
              }`}
            >
              Open
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setCategory('womens');
                setSelectedLeague('');
              }}
              className={`flex-1 h-14 font-['Barlow_Condensed'] uppercase tracking-widest text-lg md:text-xl transition-all duration-300 ${
                category === 'womens' 
                  ? 'bg-[hsl(var(--black))] text-[hsl(var(--true-white))] border-[hsl(var(--black))] shadow-md' 
                  : 'bg-[hsl(var(--light-bg))] text-[hsl(var(--gray))] border-[hsl(var(--white))] hover:bg-[hsl(var(--white))] hover:text-[hsl(var(--black))]'
              }`}
            >
              Womens
            </Button>
          </div>

          {/* League Dropdown/Selector */}
          <div className="space-y-4">
            <label className="label-text text-[hsl(var(--gray))] font-bold tracking-widest block text-sm">
              SELECT A LEAGUE
            </label>
            <Select value={selectedLeague} onValueChange={handleLeagueSelect}>
              <SelectTrigger className="w-full h-16 md:h-20 px-4 md:px-6 bg-[hsl(var(--light-bg))] border-[hsl(var(--white))] rounded-xl focus:ring-2 focus:ring-[hsl(var(--primary))] focus:ring-offset-2 transition-all">
                <SelectValue placeholder="Choose a league..." />
              </SelectTrigger>
              <SelectContent className="bg-[hsl(var(--true-white))] border-[hsl(var(--white))] rounded-xl shadow-xl">
                {activeLeagues.map((league) => (
                  <SelectItem 
                    key={league.id} 
                    value={league.id}
                    className="cursor-pointer py-4 focus:bg-[hsl(var(--light-bg))] transition-colors border-b border-[hsl(var(--white))]/50 last:border-0"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-2 px-1">
                      <span className="font-['Bebas_Neue'] text-xl md:text-2xl tracking-wide text-[hsl(var(--black))]">
                        {league.name}
                      </span>
                      <span className={`inline-flex items-center justify-center px-3 py-1 rounded text-xs font-bold uppercase tracking-wider whitespace-nowrap ${getStatusBadgeStyle(league.statusType)}`}>
                        {league.status}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedLeague && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-8 pt-8 border-t border-[hsl(var(--white))] flex justify-center"
            >
              <Button 
                onClick={() => navigate(`/league/${selectedLeague}`)}
                className="w-full md:w-auto px-8 h-12 bg-[hsl(var(--primary))] text-[hsl(var(--true-white))] hover:bg-[hsl(var(--primary-dark))] font-bold tracking-widest rounded-lg shadow-md transition-all active:scale-[0.98]"
              >
                VIEW LEAGUE DETAILS
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default CompetitionsPage;