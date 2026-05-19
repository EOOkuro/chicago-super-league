import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const DEFAULT_CLUBS = [
  'Hunnids AC', 'Bronzeville AC', 'Midway FC', 'Pilsen FC', 
  'Hyde Park Rangers', 'Beverly FC', 'Al Farooq FC', 'South Shore SC'
];

function StandingsTable({ 
  data, 
  highlightTop = 0, 
  promotionText = "Promotion/Playoff Position"
}) {
  const tableData = data || DEFAULT_CLUBS.map((club, index) => ({
    rank: index + 1,
    club,
    p: 0,
    w: 0,
    d: 0,
    l: 0,
    gf: 0,
    ga: 0,
    gd: 0,
    pts: 0,
    form: '- - - - -'
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
                  <TableCell className="standings-td text-center text-[hsl(var(--gray))]">{team.gd > 0 ? `+${team.gd}` : team.gd}</TableCell>
                  <TableCell className="standings-td text-center font-bold text-[hsl(var(--primary))] text-xl">{team.pts}</TableCell>
                  <TableCell className="standings-td text-center text-[hsl(var(--gray))] tracking-widest font-mono text-sm">
                    {team.form}
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

export default StandingsTable;