import React from 'react';
import ClubCard from './ClubCard.jsx';

function ClubsSection() {
  const clubs = [
    { name: 'Hunnids AC', location: 'South Side'},
    { name: 'Bronzeville AC', location: 'South Side' },
    { name: 'Midway FC', location: 'South Side' },
    { name: 'Pilsen FC', location: 'South Side' },
    { name: 'Hyde Park Rangers', location: 'South Side' },
    { name: 'Beverly FC', location: 'South Side' },
    { name: 'Al Farooq FC', location: 'South Side' },
    { name: 'GF.Chicago.SN', location: 'South Side' }
  ];

  return (
    <section id="clubs" className="py-20 md:py-24 bg-[hsl(var(--light-bg))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-2 block">CLUBS</span>
          <h2 className="text-[hsl(var(--black))] mb-4">Meet the Teams</h2>
          <p className="text-[hsl(var(--gray))] text-lg max-w-2xl">Eight diverse clubs representing Chicago neighborhoods, competing for glory in the inaugural season.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {clubs.map((club, index) => (
            <ClubCard key={index} name={club.name} location={club.location} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ClubsSection;