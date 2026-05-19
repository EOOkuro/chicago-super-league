import React from 'react';

function MatchCard({ match, date, location }) {
  const [team1, team2] = match.split(' vs ');

  return (
    <div className="bg-[hsl(var(--true-white))] p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-[hsl(var(--white))] group cursor-pointer">
      <div className="flex justify-between items-center mb-4">
        <span className="label-text text-[hsl(var(--primary))] text-sm font-bold">{date}</span>
        <span className="label-text text-[hsl(var(--gray))] text-xs">{location}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-['Bebas_Neue'] text-xl md:text-2xl text-[hsl(var(--black))]">{team1}</span>
        <span className="label-text text-[hsl(var(--gray))] mx-2">VS</span>
        <span className="font-['Bebas_Neue'] text-xl md:text-2xl text-[hsl(var(--black))]">{team2}</span>
      </div>
    </div>
  );
}

export default MatchCard;