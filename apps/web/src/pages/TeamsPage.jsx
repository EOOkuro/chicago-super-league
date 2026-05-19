import React from 'react';
import { Helmet } from 'react-helmet';
import ClubsSection from '../components/ClubsSection.jsx';

function TeamsPage() {
  return (
    <div className="pt-20 bg-[hsl(var(--background))] min-h-screen">
      <Helmet>
        <title>Teams | Chicago Super League</title>
        <meta name="description" content="Meet the founding clubs and teams of the Chicago Super League." />
      </Helmet>
      
      <ClubsSection />
    </div>
  );
}

export default TeamsPage;