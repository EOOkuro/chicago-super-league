import React from 'react';
import { Trophy } from 'lucide-react';
import StandingsTable from './StandingsTable.jsx';

function StandingsSection() {
  return (
    <section id="standings" className="py-20 md:py-24 bg-[hsl(var(--light-bg))] border-t border-[hsl(var(--white))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-2 block">STANDINGS</span>
          <h2 className="text-[hsl(var(--black))] mb-4">League Standings</h2>
          <p className="text-[hsl(var(--gray))] text-lg max-w-2xl mx-auto">Current standings for the inaugural season.</p>
        </div>
        
        <div className="max-w-5xl mx-auto drop-shadow-sm">
          <div className="bg-[hsl(var(--black))] text-[hsl(var(--true-white))] p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 rounded-t-2xl">
            <div>
              <h2 className="text-3xl md:text-4xl font-['Bebas_Neue'] tracking-wide">OutSouth League Standings</h2>
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
      </div>
    </section>
  );
}

export default StandingsSection;