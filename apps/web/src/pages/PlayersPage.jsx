import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Mock Data for the Player Registry
const MOCK_PLAYERS = [
  { id: 'P001', name: 'Mateo Vasquez', club: 'Hyde Park Rangers FC', league: 'OutSouth League', division: 'Open', position: 'FW', number: '9', nationality: '🇲🇽', status: 'Active', stats: { goals: 6, assists: 2, appearances: 4, yellow: 0, red: 0, gPerGame: 1.5 } },
  { id: 'P002', name: 'Marcus Johnson', club: 'Bronzeville Athletic Club', league: 'OutSouth League', division: 'Open', position: 'MF', number: '10', nationality: '🇺🇸', status: 'Active', stats: { goals: 3, assists: 5, appearances: 4, yellow: 1, red: 0, gPerGame: 0.75 } },
  { id: 'P003', name: 'Diego Torres', club: 'Pilsen FC', league: 'OutSouth League', division: 'Open', position: 'DF', number: '4', nationality: '🇲🇽', status: 'Active', stats: { goals: 0, assists: 1, appearances: 4, yellow: 2, red: 0, gPerGame: 0 } },
  { id: 'P004', name: 'Ahmad Al-Fayed', club: 'AL FAROOK', league: 'OutSouth League', division: 'Open', position: 'FW', number: '11', nationality: '🇯🇴', status: 'Injured', stats: { goals: 4, assists: 0, appearances: 2, yellow: 0, red: 0, gPerGame: 2.0 } },
  { id: 'P005', name: 'Kevin O\'Connor', club: 'Beverly FC', league: 'OutSouth League', division: 'Open', position: 'GK', number: '1', nationality: '🇮🇪', status: 'Active', stats: { cleanSheets: 2, saves: 14, appearances: 4, yellow: 0, red: 0, goalsConceded: 3 } },
  { id: 'P006', name: 'Tarik Smith', club: 'Hunnids Athletic Club', league: 'OutSouth League', division: 'Open', position: 'MF', number: '8', nationality: '🇺🇸', status: 'Active', stats: { goals: 2, assists: 4, appearances: 4, yellow: 0, red: 0, gPerGame: 0.5 } },
  { id: 'P007', name: 'Luis Ramirez', club: 'Midway FC', league: 'OutSouth League', division: 'Open', position: 'FW', number: '7', nationality: '🇨🇴', status: 'Suspended', stats: { goals: 1, assists: 1, appearances: 3, yellow: 3, red: 1, gPerGame: 0.33 } },
  { id: 'P008', name: 'Julian Santos', club: 'GF.Chicago.SN', league: 'OutSouth League', division: 'Open', position: 'DF', number: '22', nationality: '🇲🇽', status: 'Active', stats: { goals: 1, assists: 0, appearances: 4, yellow: 1, red: 0, gPerGame: 0.25 } },
  { id: 'P009', name: 'Andre Williams', club: 'Hyde Park Rangers FC', league: 'OutSouth League', division: 'Open', position: 'MF', number: '6', nationality: '🇺🇸', status: 'Active', stats: { goals: 0, assists: 3, appearances: 4, yellow: 0, red: 0, gPerGame: 0 } },
];

const DIVISIONS = ['Open'];
const POSITIONS = ['FW', 'MF', 'DF', 'GK'];
const STATUSES = ['Active', 'Injured', 'Suspended'];
const LEAGUES = ['OutSouth League'];
const CLUBS = ['Hyde Park Rangers FC', 'Bronzeville Athletic Club', 'Pilsen FC', 'AL FAROOK', 'Beverly FC', 'Hunnids Athletic Club', 'Midway FC', 'GF.Chicago.SN'];

function PlayersPage() {
  const [filters, setFilters] = useState({
    division: 'All',
    position: 'All',
    status: 'All',
    league: 'All',
    club: 'All'
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      division: 'All',
      position: 'All',
      status: 'All',
      league: 'All',
      club: 'All'
    });
  };

  const filteredPlayers = useMemo(() => {
    return MOCK_PLAYERS.filter(player => {
      if (filters.division !== 'All' && player.division !== filters.division) return false;
      if (filters.position !== 'All' && player.position !== filters.position) return false;
      if (filters.status !== 'All' && player.status !== filters.status) return false;
      if (filters.league !== 'All' && player.league !== filters.league) return false;
      if (filters.club !== 'All' && player.club !== filters.club) return false;
      return true;
    });
  }, [filters]);

  const activeFilterCount = Object.values(filters).filter(v => v !== 'All').length;

  return (
    <div className="pt-32 pb-24 bg-[hsl(var(--background))] min-h-screen">
      <Helmet>
        <title>Player Registry | Chicago Super League</title>
        <meta name="description" content="Official player registry and statistics for the Chicago Super League ecosystem." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12">
          <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-3 block text-lg">
            MegCity FC · OutSouth League
          </span>
          <h1 className="text-[hsl(var(--black))] text-6xl md:text-7xl">PLAYER REGISTRY</h1>
        </div>

        {/* Filter Panel */}
        <div className="bg-[hsl(var(--true-white))] p-6 rounded-2xl shadow-sm border border-[hsl(var(--white))] mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="flex items-center gap-2 text-[hsl(var(--black))] font-['Bebas_Neue'] text-2xl tracking-wide">
              <Filter className="w-5 h-5 text-[hsl(var(--primary))]" /> 
              Filter Players
              {activeFilterCount > 0 && (
                <Badge className="ml-2 bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]">{activeFilterCount}</Badge>
              )}
            </div>
            
            {activeFilterCount > 0 && (
              <Button variant="ghost" onClick={clearFilters} className="text-[hsl(var(--gray))] hover:text-[hsl(var(--destructive))]">
                <X className="w-4 h-4 mr-2" /> Clear All
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--gray))]">Division</label>
              <Select value={filters.division} onValueChange={(val) => handleFilterChange('division', val)}>
                <SelectTrigger className="bg-[hsl(var(--light-bg))] border-transparent focus:ring-[hsl(var(--primary))]">
                  <SelectValue placeholder="All Divisions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Divisions</SelectItem>
                  {DIVISIONS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--gray))]">Position</label>
              <Select value={filters.position} onValueChange={(val) => handleFilterChange('position', val)}>
                <SelectTrigger className="bg-[hsl(var(--light-bg))] border-transparent focus:ring-[hsl(var(--primary))]">
                  <SelectValue placeholder="All Positions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Positions</SelectItem>
                  {POSITIONS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--gray))]">Status</label>
              <Select value={filters.status} onValueChange={(val) => handleFilterChange('status', val)}>
                <SelectTrigger className="bg-[hsl(var(--light-bg))] border-transparent focus:ring-[hsl(var(--primary))]">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Statuses</SelectItem>
                  {STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--gray))]">League</label>
              <Select value={filters.league} onValueChange={(val) => handleFilterChange('league', val)}>
                <SelectTrigger className="bg-[hsl(var(--light-bg))] border-transparent focus:ring-[hsl(var(--primary))]">
                  <SelectValue placeholder="All Leagues" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Leagues</SelectItem>
                  {LEAGUES.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--gray))]">Club</label>
              <Select value={filters.club} onValueChange={(val) => handleFilterChange('club', val)}>
                <SelectTrigger className="bg-[hsl(var(--light-bg))] border-transparent focus:ring-[hsl(var(--primary))]">
                  <SelectValue placeholder="All Clubs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Clubs</SelectItem>
                  {CLUBS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-[hsl(var(--gray))] font-medium">
            Showing <span className="text-[hsl(var(--black))] font-bold">{filteredPlayers.length}</span> players
          </p>
        </div>

        {/* Players Grid */}
        {filteredPlayers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlayers.map((player, index) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="h-full overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow bg-[hsl(var(--true-white))]">
                  <CardHeader className="bg-[hsl(var(--black))] text-white p-6 relative">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className={`border-white/20 text-white font-['Barlow_Condensed'] uppercase tracking-wider text-xs ${
                        player.status === 'Injured' ? 'bg-red-500/20 text-red-200' :
                        player.status === 'Suspended' ? 'bg-amber-500/20 text-amber-200' :
                        'bg-emerald-500/20 text-emerald-200'
                      }`}>
                        {player.status}
                      </Badge>
                      <span className="text-2xl">{player.nationality}</span>
                    </div>
                    <div className="flex justify-between items-end mt-4">
                      <div>
                        <h3 className="font-['Bebas_Neue'] text-3xl m-0 leading-none">{player.name}</h3>
                        <p className="text-white/70 text-sm mt-1 truncate">{player.club}</p>
                      </div>
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-white font-bold font-['Bebas_Neue'] text-2xl shrink-0">
                        {player.number}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex gap-2 flex-wrap mb-6 border-b border-[hsl(var(--white))] pb-4">
                      <Badge className="bg-[hsl(var(--light-bg))] text-[hsl(var(--black))] hover:bg-[hsl(var(--light-bg))] shadow-none border-[hsl(var(--white))]">
                        {player.position}
                      </Badge>
                      <Badge className="bg-[hsl(var(--light-bg))] text-[hsl(var(--black))] hover:bg-[hsl(var(--light-bg))] shadow-none border-[hsl(var(--white))]">
                        {player.league}
                      </Badge>
                      <Badge className="bg-[hsl(var(--light-bg))] text-[hsl(var(--black))] hover:bg-[hsl(var(--light-bg))] shadow-none border-[hsl(var(--white))]">
                        {player.division} Div
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-y-6 gap-x-2 text-center">
                      {player.position === 'GK' ? (
                        <>
                          <div>
                            <div className="font-['Bebas_Neue'] text-2xl text-[hsl(var(--black))]">{player.stats.cleanSheets}</div>
                            <div className="text-[10px] uppercase font-bold tracking-wider text-[hsl(var(--gray))]">Clean Sheets</div>
                          </div>
                          <div>
                            <div className="font-['Bebas_Neue'] text-2xl text-[hsl(var(--black))]">{player.stats.saves}</div>
                            <div className="text-[10px] uppercase font-bold tracking-wider text-[hsl(var(--gray))]">Saves</div>
                          </div>
                          <div>
                            <div className="font-['Bebas_Neue'] text-2xl text-[hsl(var(--black))]">{player.stats.goalsConceded}</div>
                            <div className="text-[10px] uppercase font-bold tracking-wider text-[hsl(var(--gray))]">Conceded</div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <div className="font-['Bebas_Neue'] text-2xl text-[hsl(var(--black))]">{player.stats.goals}</div>
                            <div className="text-[10px] uppercase font-bold tracking-wider text-[hsl(var(--gray))]">Goals</div>
                          </div>
                          <div>
                            <div className="font-['Bebas_Neue'] text-2xl text-[hsl(var(--black))]">{player.stats.assists}</div>
                            <div className="text-[10px] uppercase font-bold tracking-wider text-[hsl(var(--gray))]">Assists</div>
                          </div>
                          <div>
                            <div className="font-['Bebas_Neue'] text-2xl text-[hsl(var(--black))]">{player.stats.gPerGame}</div>
                            <div className="text-[10px] uppercase font-bold tracking-wider text-[hsl(var(--gray))]">G/Game</div>
                          </div>
                        </>
                      )}
                      
                      <div>
                        <div className="font-['Bebas_Neue'] text-2xl text-[hsl(var(--black))]">{player.stats.appearances}</div>
                        <div className="text-[10px] uppercase font-bold tracking-wider text-[hsl(var(--gray))]">Apps</div>
                      </div>
                      <div>
                        <div className="font-['Bebas_Neue'] text-2xl text-amber-500">{player.stats.yellow}</div>
                        <div className="text-[10px] uppercase font-bold tracking-wider text-[hsl(var(--gray))]">Yellows</div>
                      </div>
                      <div>
                        <div className="font-['Bebas_Neue'] text-2xl text-red-500">{player.stats.red}</div>
                        <div className="text-[10px] uppercase font-bold tracking-wider text-[hsl(var(--gray))]">Reds</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-[hsl(var(--true-white))] border border-dashed border-[hsl(var(--gray))]/30 rounded-2xl p-12 text-center">
            <h3 className="text-2xl text-[hsl(var(--black))] mb-2">No players found</h3>
            <p className="text-[hsl(var(--gray))] mb-6">Try adjusting your filters to see more results.</p>
            <Button onClick={clearFilters} variant="outline" className="border-2 border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-white nav-text">
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlayersPage;