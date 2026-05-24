import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Filter, X, Loader, AlertCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNotionPlayers } from '../hooks/useNotionPlayers.js';

// ─── status badge colour ─────────────────────────────────────────────────────
function statusClass(status) {
  const s = String(status).toLowerCase();
  if (s === 'injured')   return 'bg-red-500/20 text-red-200';
  if (s === 'suspended') return 'bg-amber-500/20 text-amber-200';
  return 'bg-emerald-500/20 text-emerald-200';
}

// ─── player card ─────────────────────────────────────────────────────────────
function PlayerCard({ player, index }) {
  const isGK = String(player.position).toUpperCase() === 'GK';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
    >
      <Card className="h-full overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow bg-[hsl(var(--true-white))]">
        <CardHeader className="bg-[hsl(var(--black))] text-white p-6 relative">
          <div className="flex justify-between items-start mb-2">
            <Badge
              variant="outline"
              className={`border-white/20 text-white font-['Barlow_Condensed'] uppercase tracking-wider text-xs ${statusClass(player.status)}`}
            >
              {player.status || 'Active'}
            </Badge>
            <span className="text-2xl" title={player.nationality}>
              {player.nationality || '🌍'}
            </span>
          </div>

          <div className="flex justify-between items-end mt-4">
            <div className="min-w-0 pr-2">
              <h3 className="font-['Bebas_Neue'] text-3xl m-0 leading-none truncate">{player.name}</h3>
              <p className="text-white/70 text-sm mt-1 truncate">{player.club}</p>
            </div>
            {player.number && (
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-white font-bold font-['Bebas_Neue'] text-2xl shrink-0">
                {player.number}
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="flex gap-2 flex-wrap mb-6 border-b border-[hsl(var(--white))] pb-4">
            {player.position && (
              <Badge className="bg-[hsl(var(--light-bg))] text-[hsl(var(--black))] hover:bg-[hsl(var(--light-bg))] shadow-none border-[hsl(var(--white))]">
                {player.position}
              </Badge>
            )}
            {player.league && (
              <Badge className="bg-[hsl(var(--light-bg))] text-[hsl(var(--black))] hover:bg-[hsl(var(--light-bg))] shadow-none border-[hsl(var(--white))]">
                {player.league}
              </Badge>
            )}
            {player.division && (
              <Badge className="bg-[hsl(var(--light-bg))] text-[hsl(var(--black))] hover:bg-[hsl(var(--light-bg))] shadow-none border-[hsl(var(--white))]">
                {player.division} Div
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-3 gap-y-6 gap-x-2 text-center">
            {isGK ? (
              <>
                <Stat label="Clean Sheets" value={player.stats.cleanSheets ?? 0} />
                <Stat label="Saves"        value={player.stats.saves       ?? 0} />
                <Stat label="Conceded"     value={player.stats.goalsConceded ?? 0} />
              </>
            ) : (
              <>
                <Stat label="Goals"   value={player.stats.goals}      />
                <Stat label="Assists" value={player.stats.assists}    />
                <Stat label="G/Game"  value={player.stats.gPerGame}   />
              </>
            )}
            <Stat label="Apps"    value={player.stats.appearances} />
            <Stat label="Yellows" value={player.stats.yellow}      colour="text-amber-500" />
            <Stat label="Reds"    value={player.stats.red}         colour="text-red-500"   />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function Stat({ label, value, colour = 'text-[hsl(var(--black))]' }) {
  return (
    <div>
      <div className={`font-['Bebas_Neue'] text-2xl ${colour}`}>{value ?? 0}</div>
      <div className="text-[10px] uppercase font-bold tracking-wider text-[hsl(var(--gray))]">{label}</div>
    </div>
  );
}

// ─── page ─────────────────────────────────────────────────────────────────────
function PlayersPage() {
  const { players, loading, error } = useNotionPlayers();

  // Build filter options from actual data
  const positions = useMemo(() => [...new Set(players.map(p => p.position).filter(Boolean))].sort(), [players]);
  const statuses  = useMemo(() => [...new Set(players.map(p => p.status).filter(Boolean))].sort(),   [players]);
  const leagues   = useMemo(() => [...new Set(players.map(p => p.league).filter(Boolean))].sort(),   [players]);
  const clubs     = useMemo(() => [...new Set(players.map(p => p.club).filter(Boolean))].sort(),     [players]);

  const [filters, setFilters] = useState({ position: 'All', status: 'All', league: 'All', club: 'All' });

  const set = (key, val) => setFilters(prev => ({ ...prev, [key]: val }));
  const clearFilters = () => setFilters({ position: 'All', status: 'All', league: 'All', club: 'All' });
  const activeCount  = Object.values(filters).filter(v => v !== 'All').length;

  const filtered = useMemo(() => players.filter(p => {
    if (filters.position !== 'All' && p.position !== filters.position) return false;
    if (filters.status   !== 'All' && p.status   !== filters.status)   return false;
    if (filters.league   !== 'All' && p.league   !== filters.league)   return false;
    if (filters.club     !== 'All' && p.club     !== filters.club)     return false;
    return true;
  }), [players, filters]);

  return (
    <div className="pt-32 pb-24 bg-[hsl(var(--background))] min-h-screen">
      <Helmet>
        <title>Player Registry | Chicago Super League</title>
        <meta name="description" content="Official player registry for the Chicago Super League. Browse stats, positions, and club affiliations for all registered OutSouth League players." />
        <link rel="canonical" href="https://chicagosuperleague.com/players" />
        <meta property="og:title" content="Player Registry | Chicago Super League" />
        <meta property="og:description" content="Official player registry for the Chicago Super League. Browse stats, positions, and club affiliations for all registered OutSouth League players." />
        <meta property="og:url" content="https://chicagosuperleague.com/players" />
        <meta name="twitter:title" content="Player Registry | Chicago Super League" />
        <meta name="twitter:description" content="Official player registry for the Chicago Super League. Browse stats, positions, and club affiliations for all registered OutSouth League players." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12">
          <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-3 block text-lg">
            OutSouth League · Season 1
          </span>
          <h1 className="text-[hsl(var(--black))] text-6xl md:text-7xl">PLAYER REGISTRY</h1>
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
              <p className="font-bold text-red-700 mb-1">Could not load player data</p>
              <p className="text-red-600 text-sm">{error}</p>
              {error.includes('NOTION_TOKEN') && (
                <p className="text-red-500 text-xs mt-2">
                  Add <code className="bg-red-100 px-1 rounded">NOTION_TOKEN</code> to your environment variables and reconnect the integration to your Notion database.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Filters + grid (only shown once data is loaded) */}
        {!loading && !error && (
          <>
            {/* Filter panel */}
            <div className="bg-[hsl(var(--true-white))] p-6 rounded-2xl shadow-sm border border-[hsl(var(--white))] mb-12">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div className="flex items-center gap-2 text-[hsl(var(--black))] font-['Bebas_Neue'] text-2xl tracking-wide">
                  <Filter className="w-5 h-5 text-[hsl(var(--primary))]" />
                  Filter Players
                  {activeCount > 0 && (
                    <Badge className="ml-2 bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]">{activeCount}</Badge>
                  )}
                </div>
                {activeCount > 0 && (
                  <Button variant="ghost" onClick={clearFilters} className="text-[hsl(var(--gray))] hover:text-[hsl(var(--destructive))]">
                    <X className="w-4 h-4 mr-2" /> Clear All
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <FilterSelect label="Position" value={filters.position} onChange={v => set('position', v)} options={positions} all="All Positions" />
                <FilterSelect label="Status"   value={filters.status}   onChange={v => set('status', v)}   options={statuses}  all="All Statuses"  />
                <FilterSelect label="League"   value={filters.league}   onChange={v => set('league', v)}   options={leagues}   all="All Leagues"   />
                <FilterSelect label="Club"     value={filters.club}     onChange={v => set('club', v)}     options={clubs}     all="All Clubs"     />
              </div>
            </div>

            {/* Count */}
            <div className="mb-6">
              <p className="text-[hsl(var(--gray))] font-medium">
                Showing <span className="text-[hsl(var(--black))] font-bold">{filtered.length}</span> of{' '}
                <span className="text-[hsl(var(--black))] font-bold">{players.length}</span> players
              </p>
            </div>

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((player, i) => (
                  <PlayerCard key={player.id} player={player} index={i} />
                ))}
              </div>
            ) : (
              <div className="bg-[hsl(var(--true-white))] border border-dashed border-[hsl(var(--gray))]/30 rounded-2xl p-12 text-center">
                <h3 className="text-2xl text-[hsl(var(--black))] mb-2">No players found</h3>
                <p className="text-[hsl(var(--gray))] mb-6">Try adjusting your filters.</p>
                <Button onClick={clearFilters} variant="outline" className="border-2 border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-white nav-text">
                  Reset Filters
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function FilterSelect({ label, value, onChange, options, all }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--gray))]">{label}</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="bg-[hsl(var(--light-bg))] border-transparent focus:ring-[hsl(var(--primary))]">
          <SelectValue placeholder={all} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">{all}</SelectItem>
          {options.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  );
}

export default PlayersPage;
