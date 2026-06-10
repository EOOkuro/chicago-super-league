import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Loader, AlertCircle, MapPin, Clock } from 'lucide-react';
import { useFixtures } from '../hooks/useFixtures.js';

// ─── Individual match card ────────────────────────────────────────────────────
function MatchRow({ match, played }) {
  return (
    <div
      className={`flex flex-col sm:flex-row justify-between items-center gap-4 p-5 rounded-xl border transition-all duration-300
        ${played
          ? 'bg-[hsl(var(--light-bg))] border-[hsl(var(--white))] opacity-60'
          : 'bg-[hsl(var(--true-white))] border-[hsl(var(--white))] shadow-sm hover:shadow-md'
        }`}
    >
      {/* Home */}
      <div className="font-['Bebas_Neue'] text-2xl md:text-3xl text-[hsl(var(--black))] text-center sm:text-right flex-1 leading-none">
        {match.home}
      </div>

      {/* VS pill */}
      <div className={`px-3 py-1 rounded font-bold text-sm shrink-0
        ${played ? 'bg-[hsl(var(--white))] text-[hsl(var(--gray))]' : 'bg-[hsl(var(--light-bg))] text-[hsl(var(--gray))]'}`}>
        VS
      </div>

      {/* Away */}
      <div className="font-['Bebas_Neue'] text-2xl md:text-3xl text-[hsl(var(--black))] text-center sm:text-left flex-1 leading-none">
        {match.away}
      </div>

      {/* Meta */}
      <div className="flex flex-col sm:flex-row items-center gap-3 text-xs label-text text-[hsl(var(--gray))] tracking-wider shrink-0 sm:pl-4 sm:border-l border-[hsl(var(--white))]">
        {match.location && (
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" /> {match.location}
          </span>
        )}
        {match.time && (
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {match.time}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── One matchday block ───────────────────────────────────────────────────────
function MatchdayBlock({ md, index, isNext }) {
  return (
    <motion.div
      key={md.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className="relative"
    >
      {/* Matchday header */}
      <div className="flex flex-col items-center mb-6">
        <div className="flex items-center gap-3 mb-1">
          <h2 className={`text-4xl md:text-5xl m-0 ${md.played ? 'text-[hsl(var(--gray))]' : 'text-[hsl(var(--black))]'}`}>
            {md.title}
          </h2>

          {isNext && (
            <span className="bg-[hsl(var(--primary))] text-white text-xs font-bold px-3 py-1 rounded-full label-text tracking-widest uppercase">
              UP NEXT
            </span>
          )}

          {md.played && (
            <span className="bg-[hsl(var(--light-bg))] text-[hsl(var(--gray))] text-xs font-bold px-3 py-1 rounded-full label-text tracking-widest uppercase border border-[hsl(var(--white))]">
              PLAYED
            </span>
          )}
        </div>

        <p className={`label-text text-lg md:text-xl tracking-widest m-0
          ${md.played ? 'text-[hsl(var(--gray))]/60' : 'text-[hsl(var(--gray))]'}`}>
          {md.date}
        </p>
      </div>

      {/* Matches */}
      <div className="space-y-4">
        {md.matches.map((match, mIndex) => (
          <MatchRow key={mIndex} match={match} played={md.played} />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Tab button ───────────────────────────────────────────────────────────────
function TabBtn({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-full font-bold label-text tracking-widest text-sm uppercase transition-all duration-200
        ${active
          ? 'bg-[hsl(var(--black))] text-[hsl(var(--true-white))]'
          : 'bg-[hsl(var(--light-bg))] text-[hsl(var(--gray))] hover:bg-[hsl(var(--white))]'
        }`}
    >
      {children}
    </button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
function FixturesPage() {
  const { matchdays, upcoming, loading, error } = useFixtures();
  const [tab, setTab] = useState('upcoming');

  const displayed = tab === 'upcoming' ? upcoming : matchdays;
  // The next unplayed matchday is always upcoming[0]
  const nextMd = upcoming[0] ?? null;

  return (
    <div className="pt-32 pb-24 bg-[hsl(var(--background))] min-h-screen">
      <Helmet>
        <title>Fixtures | Chicago Super League</title>
        <meta name="description" content="OutSouth League Season 1 full fixture list. Upcoming match days, kickoff times, and venues across the South Side." />
        <link rel="canonical" href="https://chicagosuperleague.com/fixtures" />
        <meta property="og:title" content="Fixtures | Chicago Super League" />
        <meta property="og:description" content="OutSouth League Season 1 full fixture list. Upcoming match days, kickoff times, and venues across the South Side." />
        <meta property="og:url" content="https://chicagosuperleague.com/fixtures" />
        <meta name="twitter:title" content="Fixtures | Chicago Super League" />
        <meta name="twitter:description" content="OutSouth League Season 1 full fixture list. Upcoming match days, kickoff times, and venues across the South Side." />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-3 block text-lg">
            OutSouth League · Season 1 · 2025
          </span>
          <h1 className="text-[hsl(var(--black))] text-6xl md:text-7xl mb-6">FIXTURES</h1>

          {/* Team banner */}
          <div className="shadow-lg rounded-xl overflow-hidden mb-8">
            <div className="bg-[hsl(var(--primary))] text-[hsl(var(--true-white))] py-4 px-6 text-center font-bold label-text text-xl tracking-wider">
              28 fixtures · 160+ players
            </div>
            <div className="bg-[hsl(var(--black))] text-[hsl(var(--true-white))] py-4 px-6 text-center label-text text-sm md:text-base tracking-widest leading-relaxed">
              Hyde Park Rangers FC · Pilsen FC · Beverly FC · Midway FC · Al Farooq FC · GF.Chicago.SN · Hunnids Athletic Club · Bronzeville Athletic Club
            </div>
          </div>

          {/* Tab toggle */}
          <div className="flex justify-center gap-3">
            <TabBtn active={tab === 'upcoming'} onClick={() => setTab('upcoming')}>
              Upcoming
            </TabBtn>
            <TabBtn active={tab === 'all'} onClick={() => setTab('all')}>
              All Fixtures
            </TabBtn>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-32">
            <Loader className="w-10 h-10 animate-spin text-[hsl(var(--primary))]" />
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex items-start gap-4 bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
            <AlertCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-red-700 mb-1">Could not load fixtures</p>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Matchday list */}
        {!loading && !error && (
          <div className="space-y-16">
            {displayed.length === 0 ? (
              <div className="text-center py-20 text-[hsl(var(--gray))]">
                <p className="text-2xl font-['Bebas_Neue'] mb-2">No upcoming fixtures</p>
                <p className="text-sm">All matches have been played. Check back next season!</p>
                {tab === 'upcoming' && (
                  <button
                    onClick={() => setTab('all')}
                    className="mt-6 px-6 py-2 rounded-full bg-[hsl(var(--black))] text-[hsl(var(--true-white))] font-bold label-text text-sm uppercase tracking-widest hover:opacity-80 transition-opacity"
                  >
                    View All Fixtures
                  </button>
                )}
              </div>
            ) : (
              displayed.map((md, index) => (
                <MatchdayBlock
                  key={md.id}
                  md={md}
                  index={index}
                  isNext={nextMd && md.id === nextMd.id}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default FixturesPage;
