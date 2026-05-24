import React from 'react';
import { Helmet } from 'react-helmet';
import ClubsSection from '../components/ClubsSection.jsx';

function TeamsPage() {
  return (
    <div className="pt-20 bg-[hsl(var(--background))] min-h-screen">
      <Helmet>
        <title>Teams | Chicago Super League</title>
        <meta name="description" content="Meet the founding clubs of the Chicago Super League — representing South Side neighborhoods competing in the OutSouth League." />
        <link rel="canonical" href="https://chicagosuperleague.com/teams" />
        <meta property="og:title" content="Teams | Chicago Super League" />
        <meta property="og:description" content="Meet the founding clubs of the Chicago Super League — representing South Side neighborhoods competing in the OutSouth League." />
        <meta property="og:url" content="https://chicagosuperleague.com/teams" />
        <meta name="twitter:title" content="Teams | Chicago Super League" />
        <meta name="twitter:description" content="Meet the founding clubs of the Chicago Super League — representing South Side neighborhoods competing in the OutSouth League." />
      </Helmet>
      
      <ClubsSection />
    </div>
  );
}

export default TeamsPage;