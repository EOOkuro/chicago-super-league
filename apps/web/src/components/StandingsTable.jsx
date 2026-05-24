import React, { useState, useEffect } from 'react';
import { Loader } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { fetchAllMatchData, calculateStandings } from '../hooks/useMatchData.js';

const DEFAULT_CLUBS = [
  'Al Farooq',
  'Beverly FC',
  'Hunnids Athletic Club',
  'Bronzeville Athletic Club',
  'Midway FC',
  'Pilsen FC',
  'Hyde Park Rangers FC',
  'GF Chicago SN',
];

function StandingsTable({
  data,
  highlightTop = 0,
  promotionText = 'Promotion/Playoff Position',
}) {
  const [liveData, setLiveData]   = useState(null);
  const [loading,  setLoading]    = useState(!data);

  // If no data prop is passed, fetch and compute standings ourselves
  useEffect(() => {
    if (data) return;
    let cancelled = false;

    fetchAllMatchData()
      .then(matches => {
        if (!cancelled) {
          setLiveData(calculateStandings(matches));
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [data]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12 bg-white rounded-b-2xl">
        <Loader className="w-8 h-8 animate-spin text-[hsl(var(--primary))]" />
      </div>
    );
  }

  // Priority: explicit prop > live-fetched > blank placeholder
  const tableData = data ?? liveData ?? DEFAULT_CLUBS.map((club, index) => ({
    rank: index + 1,
    club,
    p: 0, w: 0, d: 0, l: 0,
    gf: 0, ga: 0, gd: 0, pts: 0,
    form: '-',
  }));

  return (
    <div className="w-full">
      <div className="standings-table-container">
        <Table className="standings-table">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="standings-th w-12 text-center">#</TableHead>
              <TableHead className="standings-th">Club</TableHead>
              <TableHead className="standings-th text-center w-12">P</TableHead>
              <TableHead className="standings-th text-center w-12">W</TableHead>
              <TableHead className="standings-th text-center w-12">D</TableHead>
              <TableHead className="standings-th text-center w-12">L</TableHead>
              <TableHead className="standings-th text-center w-12">GF</TableHead>
              <TableHead className="standings-th text-center w-12">GA</TableHead>
              <TableHead className="standings-th text-center w-12">GD</TableHead>
              <TableHead className="standings-th text-center text-[hsl(var(--primary))] w-16 text-lg">Pts</TableHead>
              <TableHead className="standings-th text-center w-32">Form</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((team, index) => {
              const isPromoted = highlightTop > 0 && index < highlightTop;

              return (
                <TableRow
                  key={index}
                  className={`standings-tr ${isPromoted ? 'bg-emerald-50/30 hover:bg-emerald-50/50' : ''}`}
                >
                  <TableCell className="standings-td text-center font-bold text-[hsl(var(--gray))] relative">
                    {isPromoted && (
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]"></div>
                    )}
                    {team.rank}
                  </TableCell>
                  <TableCell className="standings-td font-bold text-[hsl(var(--black))] text-lg font-['Bebas_Neue'] tracking-wide">
                    {team.club}
                  </TableCell>
                  <TableCell className="standings-td text-center text-[hsl(var(--gray))]">{team.p}</TableCell>
                  <TableCell className="standings-td text-center text-[hsl(var(--gray))]">{team.w}</TableCell>
                  <TableCell className="standings-td text-center text-[hsl(var(--gray))]">{team.d}</TableCell>
                  <TableCell className="standings-td text-center text-[hsl(var(--gray))]">{team.l}</TableCell>
                  <TableCell className="standings-td text-center text-[hsl(var(--gray))]">{team.gf}</TableCell>
                  <TableCell className="standings-td text-center text-[hsl(var(--gray))]">{team.ga}</TableCell>
                  <TableCell className="standings-td text-center text-[hsl(var(--gray))]">
                    {team.gd > 0 ? `+${team.gd}` : team.gd}
                  </TableCell>
                  <TableCell className="standings-td text-center font-bold text-[hsl(var(--primary))] text-xl">{team.pts}</TableCell>
                  <TableCell className="standings-td text-center">
                    <FormBadges form={team.form} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {highlightTop > 0 && (
        <div className="mt-4 flex flex-wrap gap-6 text-sm text-[hsl(var(--gray))] px-2 font-medium">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm"></span>
            {promotionText}
          </div>
        </div>
      )}
    </div>
  );
}

// Renders W/D/L form badges with colour coding
function FormBadges({ form }) {
  if (!form || form === '-') {
    return <span className="text-[hsl(var(--gray))] font-mono text-sm">-</span>;
  }

  const results = form.split(' ').filter(Boolean);

  const colours = {
    W: 'bg-emerald-500 text-white',
    D: 'bg-yellow-400 text-black',
    L: 'bg-red-500 text-white',
  };

  return (
    <div className="flex gap-1 justify-center">
      {results.map((r, i) => (
        <span
          key={i}
          className={`inline-flex items-center justify-center w-6 h-6 rounded text-xs font-bold ${colours[r] ?? 'bg-gray-300 text-black'}`}
        >
          {r}
        </span>
      ))}
    </div>
  );
}

export default StandingsTable;
