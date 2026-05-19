import React from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from 'lucide-react';

function StatsPage() {
  return (
    <div className="bg-[hsl(var(--background))] min-h-screen">
      <Helmet>
        <title>League Stats | Chicago Super League</title>
        <meta name="description" content="Top scorers and assists for the OutSouth League." />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-[hsl(var(--black))] text-[hsl(var(--true-white))] border-b-4 border-[hsl(var(--primary))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
          <span className="label-text text-[hsl(var(--primary-light))] font-bold tracking-widest mb-4 block">
            OutSouth League · Season 1 · 2025
          </span>
          <h1 className="text-6xl md:text-8xl text-[hsl(var(--true-white))] mb-4">LEAGUE STATS</h1>
          <p className="text-xl text-[hsl(var(--gray))] max-w-2xl">
            Top scorers and assists — tracking player performance all season long.
          </p>
        </div>
      </section>

      {/* Main Content with Tabs */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Tabs defaultValue="top-scorers" className="w-full">
          <TabsList className="bg-[hsl(var(--light-bg))] border border-[hsl(var(--white))] h-auto flex flex-wrap justify-start gap-2 p-2 rounded-xl mb-8">
            <TabsTrigger value="top-scorers" className="nav-text text-lg px-6 py-3 rounded-lg data-[state=active]:bg-[hsl(var(--primary))] data-[state=active]:text-[hsl(var(--true-white))]">Top Scorers</TabsTrigger>
            <TabsTrigger value="assists" className="nav-text text-lg px-6 py-3 rounded-lg data-[state=active]:bg-[hsl(var(--primary))] data-[state=active]:text-[hsl(var(--true-white))]">Assists</TabsTrigger>
          </TabsList>

          {/* PLACEHOLDER TABS */}
          <TabsContent value="top-scorers" className="animate-in fade-in duration-500">
            <PlaceholderTab title="Top Scorers" />
          </TabsContent>
          <TabsContent value="assists" className="animate-in fade-in duration-500">
            <PlaceholderTab title="Top Assists" />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}

function PlaceholderTab({ title }) {
  return (
    <div className="bg-[hsl(var(--true-white))] border border-dashed border-[hsl(var(--gray))]/30 rounded-2xl p-16 text-center shadow-sm">
      <div className="w-16 h-16 bg-[hsl(var(--light-bg))] rounded-full flex items-center justify-center mx-auto mb-6">
        <Calendar className="w-8 h-8 text-[hsl(var(--gray))]" />
      </div>
      <h3 className="text-3xl text-[hsl(var(--black))] font-['Bebas_Neue'] mb-3 tracking-wide">{title} Data Coming Soon</h3>
      <p className="text-[hsl(var(--gray))] text-lg">
        Check back after the Season 1 kickoff on May 17, 2025.
      </p>
    </div>
  );
}

export default StatsPage;