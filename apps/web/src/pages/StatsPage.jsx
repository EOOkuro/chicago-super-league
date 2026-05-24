import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Loader, Target, Zap } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchAllPlayerStats } from '../hooks/useMatchData.js';

// ─── rank badge colours ────────────────────────────────────────────────────
function RankBadge({ rank }) {
  const base = 'inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold';
  if (rank === 1) return <span className={`${base} bg-yellow-400 text-black shadow`}>1</span>;
  if (rank === 2) return <span className={`${base} bg-gray-300 text-black shadow`}>2</span>;
  if (rank === 3) return <span className={`${base} bg-amber-600 text-white shadow`}>3</span>;
  return <span className={`${base} bg-[hsl(var(--light-bg))] text-[hsl(var(--gray))]`}>{rank}</span>;
}

// ─── one row in the leaderboard ───────────────────────────────────────────
function StatRow({ rank, player, team, stat, statLabel }) {
  const isTop3 = rank <= 3;
  return (
    <div className={`flex items-center gap-4 px-5 py-4 border-b border-[hsl(var(--white))] last:border-0 transition-colors
      ${isTop3 ? 'bg-[hsl(var(--true-white))] hover:bg-[hsl(var(--light-bg))]' : 'bg-[hsl(var(--true-white))] hover:bg-[hsl(var(--light-bg))]/60'}`}>

      {/* Rank */}
      <div className="w-10 flex-shrink-0 flex justify-center">
        <RankBadge rank={rank} />
      </div>

      {/* Player + Club */}
      <div className="flex-1 min-w-0">
        <p className="font-['Bebas_Neue'] text-xl tracking-wide text-[hsl(var(--black))] leading-tight truncate">
          {player}
        </p>
        <p className="text-sm text-[hsl(var(--gray))] font-medium truncate">{team}</p>
      </div>

      {/* Stat */}
      <div className="flex-shrink-0 text-right">
        <span className="text-3xl font-['Bebas_Neue'] text-[hsl(var(--primary))]">{stat}</span>
        <span className="text-xs text-[hsl(var(--gray))] ml-1 uppercase tracking-widest">{statLabel}</span>
      </div>
    </div>
  );
}

// ─── empty state ──────────────────────────────────────────────────────────
function EmptyState({ label }) {
  return (
    <div className="py-20 text-center text-[hsl(var(--gray))]">
      <p className="text-2xl font-['Bebas_Neue'] tracking-wide mb-2">No {label} recorded yet</p>
      <p className="text-sm">Stats update as match data is added to the spreadsheet.</p>
    </div>
  );
}

// ─── leaderboard panel ────────────────────────────────────────────────────
function LeaderboardPanel({ players, statKey, statLabel, icon: Icon, emptyLabel }) {
  const ranked = [...players]
    .filter(p => p[statKey] > 0)
    .sort((a, b) => b[statKey] - a[statKey] || b.goals - a.goals);

  if (ranked.length === 0) return <EmptyState label={emptyLabel} />;

  return (
    <div className="rounded-2xl overflow-hidden border border-[hsl(var(--white))] shadow-sm">
      {/* Panel header */}
      <div className="bg-[hsl(var(--black))] text-[hsl(var(--true-white))] px-5 py-4 flex items-center gap-3">
        <Icon className="w-5 h-5 text-[hsl(var(--primary-light))]" />
        <h2 className="font-['Bebas_Neue'] text-2xl tracking-wide">
          {statKey === 'goals' ? 'Top Scorers' : 'Assist Leaders'} — OutSouth League · Season 1
        </h2>
      </div>

      {/* Column headers */}
      <div className="flex items-center gap-4 px-5 py-2 bg-[hsl(var(--light-bg))] border-b border-[hsl(var(--white))]">
        <div className="w-10" />
        <p className="flex-1 text-xs font-bold uppercase tracking-widest text-[hsl(var(--gray))]">Player</p>
        <p className="text-xs font-bold uppercase tracking-widest text-[hsl(var(--gray))]">{statLabel}</p>
      </div>

      {/* Rows */}
      {ranked.map((p, i) => (
        <StatRow
          key={`${p.player}||${p.team}`}
          rank={i + 1}
          player={p.player}
          team={p.team}
          stat={p[statKey]}
          statLabel={statLabel}
        />
      ))}
    </div>
  );
}

// ─── page ─────────────────────────────────────────────────────────────────
function StatsPage() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllPlayerStats()
      .then(data => { setPlayers(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="bg-[hsl(var(--background))] min-h-screen">
      <Helmet>
        <title>League Stats | Chicago Super League</title>
        <meta name="description" content="Top scorers, assist leaders, and full statistics for the OutSouth League Season 1. Updated after every match day." />
        <link rel="canonical" href="https://chicagosuperleague.com/stats" />
        <meta property="og:title" content="League Stats | Chicago Super League" />
        <meta property="og:description" content="Top scorers, assist leaders, and full statistics for the OutSouth League Season 1. Updated after every match day." />
        <meta property="og:url" content="https://chicagosuperleague.com/stats" />
        <meta name="twitter:title" content="League Stats | Chicago Super League" />
        <meta name="twitter:description" content="Top scorers, assist leaders, and full statistics for the OutSouth League Season 1. Updated after every match day." />
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-16 bg-[hsl(var(--black))] text-[hsl(var(--true-white))] border-b-4 border-[hsl(var(--primary))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
          <span className="label-text text-[hsl(var(--primary-light))] font-bold tracking-widest mb-4 block">
            OutSouth League · Season 1 · 2025
          </span>
          <h1 className="text-6xl md:text-8xl text-[hsl(var(--true-white))] mb-4">LEAGUE STATS</h1>
          <p className="text-xl text-[hsl(var(--gray))] max-w-2xl">
            Top scorers and assists — tracking player performance all season long.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Loader className="w-10 h-10 animate-spin text-[hsl(var(--primary))]" />
          </div>
        ) : (
          <Tabs defaultValue="top-scorers" className="w-full">
            <TabsList className="bg-[hsl(var(--light-bg))] border border-[hsl(var(--white))] h-auto flex flex-wrap justify-start gap-2 p-2 rounded-xl mb-8">
              <TabsTrigger
                value="top-scorers"
                className="nav-text text-lg px-6 py-3 rounded-lg data-[state=active]:bg-[hsl(var(--primary))] data-[state=active]:text-[hsl(var(--true-white))]"
              >
                ⚽ Top Scorers
              </TabsTrigger>
              <TabsTrigger
                value="assists"
                className="nav-text text-lg px-6 py-3 rounded-lg data-[state=active]:bg-[hsl(var(--primary))] data-[state=active]:text-[hsl(var(--true-white))]"
              >
                🎯 Assists
              </TabsTrigger>
            </TabsList>

            <TabsContent value="top-scorers" className="animate-in fade-in duration-500">
              <LeaderboardPanel
                players={players}
                statKey="goals"
                statLabel="Gls"
                icon={Target}
                emptyLabel="goals"
              />
            </TabsContent>

            <TabsContent value="assists" className="animate-in fade-in duration-500">
              <LeaderboardPanel
                players={players}
                statKey="assists"
                statLabel="Ast"
                icon={Zap}
                emptyLabel="assists"
              />
            </TabsContent>
          </Tabs>
        )}
      </section>
    </div>
  );
}

export default StatsPage;
