import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const matchDays = [
  {
    id: 'M1',
    title: 'MATCH DAY 1',
    date: 'Sunday, May 17, 2025',
    matches: [
      { home: 'Hyde Park Rangers FC', away: 'Al Farooq', location: 'Jackson Park' },
      { home: 'Bronzeville Athletic Club', away: 'GF.Chicago.SN', location: 'De La Salle' },
      { home: 'Beverly FC', away: 'Pilsen FC', location: 'Comed' },
      { home: 'Midway FC', away: 'Hunnids Athletic Club', location: 'West Lawn' }
    ]
  },
  {
    id: 'M2',
    title: 'MATCH DAY 2',
    date: 'Sunday, May 25, 2025',
    matches: [
      { home: 'Pilsen FC', away: 'Bronzeville Athletic Club', location: 'Comed' },
      { home: 'Hyde Park Rangers FC', away: 'GF.Chicago.SN', location: 'Jackson Park' },
      { home: 'Beverly FC', away: 'Hunnids Athletic Club', location: 'Joan Kroc Center' },
      { home: 'Midway FC', away: 'Al Farooq', location: 'West Lawn' }
    ]
  },
  {
    id: 'M3',
    title: 'MATCH DAY 3',
    date: 'Sunday, June 1, 2025',
    matches: [
      { home: 'Pilsen FC', away: 'GF.Chicago.SN', location: 'Comed' },
      { home: 'Hyde Park Rangers FC', away: 'Midway FC', location: 'Jackson Park' },
      { home: 'Hunnids Athletic Club', away: 'Bronzeville Athletic Club', location: 'De La Salle' },
      { home: 'Beverly FC', away: 'Al Farooq', location: 'Joan Kroc Center' }
    ]
  },
  {
    id: 'M4',
    title: 'MATCH DAY 4',
    date: 'Sunday, June 8, 2025',
    matches: [
      { home: 'Bronzeville Athletic Club', away: 'GF.Chicago.SN', location: 'Jackson Park' },
      { home: 'Al Farooq', away: 'Bronzeville Athletic Club', location: 'Jackson Park' },
      { home: 'Midway FC', away: 'Beverly FC', location: 'West Lawn' },
      { home: 'Pilsen FC', away: 'Hyde Park Rangers FC', location: 'Comed' }
    ]
  },
  {
    id: 'M5',
    title: 'MATCH DAY 5',
    date: 'Sunday, June 15, 2025',
    matches: [
      { home: 'Midway FC', away: 'Bronzeville Athletic Club', location: 'West Lawn' },
      { home: 'Al Farooq', away: 'GF.Chicago.SN', location: 'Jackson Park' },
      { home: 'Beverly FC', away: 'Hyde Park Rangers FC', location: 'Joan Kroc Center' },
      { home: 'Pilsen FC', away: 'Hunnids Athletic Club', location: 'Comed' }
    ]
  },
  {
    id: 'M6',
    title: 'MATCH DAY 6',
    date: 'Sunday, June 22, 2025',
    matches: [
      { home: 'Beverly FC', away: 'Bronzeville Athletic Club', location: 'Joan Kroc Center' },
      { home: 'Midway FC', away: 'GF.Chicago.SN', location: 'Midway' },
      { home: 'Pilsen FC', away: 'Al Farooq', location: 'Comed' },
      { home: 'Hyde Park Rangers FC', away: 'Hunnids Athletic Club', location: 'Jackson Park' }
    ]
  },
  {
    id: 'M7',
    title: 'MATCH DAY 7',
    date: 'Sunday, June 29, 2025',
    matches: [
      { home: 'Hunnids Athletic Club', away: 'Al Farooq', location: 'Joan Kroc Center' },
      { home: 'Bronzeville Athletic Club', away: 'Hyde Park Rangers FC', location: 'De La Salle' },
      { home: 'GF.Chicago.SN', away: 'Beverly FC', location: 'Jackson Park' },
      { home: 'Pilsen FC', away: 'Midway FC', location: 'Comed' }
    ]
  }
];

function FixturesPage() {
  return (
    <div className="pt-32 pb-24 bg-[hsl(var(--background))] min-h-screen">
      <Helmet>
        <title>Fixtures | Chicago Super League</title>
        <meta name="description" content="OutSouth League Season 1 Fixtures and Match Days." />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-3 block text-lg">
            OutSouth League · Season 1 · 2025
          </span>
          <h1 className="text-[hsl(var(--black))] text-6xl md:text-7xl mb-8">FIXTURES</h1>
          
          {/* Banners */}
          <div className="shadow-lg rounded-xl overflow-hidden">
            <div className="bg-[hsl(var(--primary))] text-[hsl(var(--true-white))] py-4 px-6 text-center font-bold label-text text-xl tracking-wider">
              28 fixtures, 160+ players
            </div>
            <div className="bg-[hsl(var(--black))] text-[hsl(var(--true-white))] py-4 px-6 text-center label-text text-sm md:text-base tracking-widest leading-relaxed">
              Hyde Park Rangers FC · Pilsen FC · Beverly FC · Midway FC · Al Farooq FC · GF.Chicago.SN · Hunnids Athletic Club · Bronzeville Athletic Club
            </div>
          </div>
        </div>

        {/* Match Days List */}
        <div className="space-y-16">
          {matchDays.map((md, index) => (
            <motion.div 
              key={md.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="flex flex-col items-center mb-8">
                <h2 className="text-4xl md:text-5xl text-[hsl(var(--black))] mb-1">{md.title}</h2>
                <p className="label-text text-[hsl(var(--gray))] text-lg md:text-xl tracking-widest">{md.date}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {md.matches.map((match, mIndex) => (
                  <div 
                    key={mIndex} 
                    className="bg-[hsl(var(--true-white))] border border-[hsl(var(--white))] p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 flex-grow">
                      <div className="font-['Bebas_Neue'] text-2xl md:text-3xl text-[hsl(var(--black))] text-center sm:text-right flex-1 leading-none">
                        {match.home}
                      </div>
                      <div className="bg-[hsl(var(--light-bg))] text-[hsl(var(--gray))] px-3 py-1 rounded font-bold text-sm shrink-0">
                        VS
                      </div>
                      <div className="font-['Bebas_Neue'] text-2xl md:text-3xl text-[hsl(var(--black))] text-center sm:text-left flex-1 leading-none">
                        {match.away}
                      </div>
                    </div>
                    <div className="text-center label-text text-[hsl(var(--gray))] border-t border-[hsl(var(--white))] pt-4 mt-auto tracking-wider">
                      📍 {match.location}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FixturesPage;