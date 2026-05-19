import React from 'react';
import MatchCard from './MatchCard.jsx';
import NewsCard from './NewsCard.jsx';

function FixturesNewsSection() {
  const fixtures = [
    { match: 'Beverly FC vs Pilsen FC', date: 'May 11, 2025', location: 'Comed' },
    { match: 'Midway FC vs Hunnids Athletic Club', date: 'May 15, 2025', location: 'West Lawn' },
    { match: 'Hyde Park Rangers FC vs AL FAROOK', date: 'May 17, 2025', location: 'Jackson Park' },
    { match: 'Bronzeville Athletic Club vs GF.Chicago.SN', date: 'May 17, 2025', location: 'De La Salle' }
  ];

  const news = [
    { tag: 'ANNOUNCEMENT', title: 'CSL Season Kicks Off', date: 'May 5, 2025' },
    { tag: 'UPDATE', title: 'New Partnership Announced', date: 'May 3, 2025' },
    { tag: 'ANNOUNCEMENT', title: 'Community Registration Open', date: 'May 1, 2025' },
    { tag: 'HIGHLIGHT', title: 'Meet the Clubs', date: 'April 28, 2025' }
  ];

  return (
    <section id="fixtures" className="py-20 md:py-24 bg-[hsl(var(--light-bg))] border-t border-[hsl(var(--white))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Fixtures Column */}
          <div>
            <div className="mb-8">
              <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-2 block">FIXTURES</span>
              <h2 className="text-[hsl(var(--black))]">Upcoming Matches</h2>
            </div>
            <div className="space-y-4">
              {fixtures.map((fixture, index) => (
                <MatchCard key={index} {...fixture} />
              ))}
            </div>
          </div>

          {/* News Column */}
          <div>
            <div className="mb-8">
              <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-2 block">NEWS</span>
              <h2 className="text-[hsl(var(--black))]">Latest Updates</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {news.map((item, index) => (
                <NewsCard key={index} {...item} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default FixturesNewsSection;