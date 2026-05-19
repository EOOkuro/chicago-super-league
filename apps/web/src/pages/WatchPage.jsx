import React from 'react';
import { Helmet } from 'react-helmet';
import { Calendar, MonitorPlay, BellRing, Twitch, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

function WatchPage() {
  const UPCOMING_STREAMS = [
    { teams: 'Hunnids AC vs Bronzeville AC', date: 'May 17', time: '10:00 AM' },
    { teams: 'Midway FC vs Pilsen FC', date: 'May 17', time: '12:00 PM' },
    { teams: 'Beverly FC vs Hunnids AC', date: 'May 24', time: '10:00 AM' },
    { teams: 'Bronzeville AC vs Hyde Park Rangers', date: 'May 24', time: '12:00 PM' },
  ];

  return (
    <div className="bg-[hsl(var(--background))] min-h-screen">
      <Helmet>
        <title>Watch Live | Chicago Super League</title>
        <meta name="description" content="Watch Chicago Super League matches live. Stream elite amateur soccer directly from your device." />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-[hsl(var(--black))] text-[hsl(var(--true-white))] relative overflow-hidden">
        {/* Twitch ambient glow */}
        <div className="absolute top-0 right-0 w-3/4 h-full bg-[#9146FF]/10 blur-[120px] rounded-full transform translate-x-1/3 -translate-y-1/4"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Twitch className="w-8 h-8 text-[#9146FF]" />
            <span className="label-text text-[#9146FF] font-bold tracking-widest text-xl">Official Broadcast</span>
          </div>
          <h1 className="text-6xl md:text-8xl text-[hsl(var(--true-white))] mb-6">WATCH LIVE</h1>
          <p className="text-xl text-[hsl(var(--gray))] max-w-2xl mx-auto">
            Experience the intensity of the Chicago Super League. Every crucial tackle, stunning goal, and promotion battle streamed directly to you.
          </p>
        </div>
      </section>

      {/* Live Embed Section */}
      <section className="py-12 bg-[#0e0e10] border-y-4 border-[#9146FF]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-4 bg-[#18181b] p-4 rounded-t-xl border border-[#303032]">
            <div className="flex items-center gap-4">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="font-['Bebas_Neue'] text-2xl tracking-wide text-white">UPCOMING BROADCAST</span>
            </div>
            <div className="text-gray-400 font-medium">May 17, 2025 · Season 1 Kickoff</div>
          </div>
          
          <div className="aspect-video bg-black rounded-b-xl border border-t-0 border-[#303032] flex flex-col items-center justify-center relative overflow-hidden shadow-2xl">
            {/* Twitch embed placeholder */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center mix-blend-luminosity"></div>
            
            <div className="relative z-10 flex flex-col items-center p-8 text-center">
              <PlayCircle className="w-20 h-20 text-[#9146FF] mb-6 opacity-80" />
              <h2 className="text-4xl md:text-5xl font-['Bebas_Neue'] text-white tracking-wide mb-4">MATCH DAY 1 KICKOFF</h2>
              <p className="text-xl text-gray-400 mb-8 max-w-lg">
                The inaugural OutSouth League season begins May 17. The stream will automatically start when we go live.
              </p>
              <Button asChild className="bg-[#9146FF] hover:bg-[#772ce8] text-white nav-text text-lg px-8 py-6 h-auto">
                <a href="https://www.twitch.tv/chicagosuperleague" target="_blank" rel="noopener noreferrer">
                  <Twitch className="w-5 h-5 mr-2" /> Follow on Twitch
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Streams & How to Watch */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Upcoming Matches */}
          <div className="lg:col-span-2">
            <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-3 block">SCHEDULE</span>
            <h2 className="text-4xl md:text-5xl text-[hsl(var(--black))] mb-8">UPCOMING STREAMS</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {UPCOMING_STREAMS.map((stream, idx) => (
                <Card key={idx} className="bg-[hsl(var(--true-white))] border border-[hsl(var(--white))] shadow-sm hover:shadow-md hover:border-[#9146FF]/30 transition-all">
                  <CardContent className="p-6">
                    <div className="text-[hsl(var(--primary))] font-bold text-sm uppercase tracking-widest mb-2 flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> {stream.date} · {stream.time}
                    </div>
                    <div className="font-bold text-[hsl(var(--black))] text-lg md:text-xl">
                      {stream.teams}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* How to Watch */}
          <div>
            <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-3 block">GUIDE</span>
            <h2 className="text-4xl md:text-5xl text-[hsl(var(--black))] mb-8">HOW TO WATCH</h2>
            
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#9146FF]/10 text-[#9146FF] flex items-center justify-center font-bold text-xl font-['Bebas_Neue']">1</div>
                <div>
                  <h4 className="text-xl font-bold text-[hsl(var(--black))] mb-1">Follow the Channel</h4>
                  <p className="text-[hsl(var(--gray))] text-sm">Create a free Twitch account and hit the heart icon on our channel page.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#9146FF]/10 text-[#9146FF] flex items-center justify-center font-bold text-xl"><BellRing className="w-5 h-5" /></div>
                <div>
                  <h4 className="text-xl font-bold text-[hsl(var(--black))] mb-1">Turn on Notifications</h4>
                  <p className="text-[hsl(var(--gray))] text-sm">Enable live alerts so you never miss kickoff.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#9146FF]/10 text-[#9146FF] flex items-center justify-center font-bold text-xl"><MonitorPlay className="w-5 h-5" /></div>
                <div>
                  <h4 className="text-xl font-bold text-[hsl(var(--black))] mb-1">Watch Anywhere</h4>
                  <p className="text-[hsl(var(--gray))] text-sm">Stream on your phone, desktop, or smart TV via the Twitch app.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[hsl(var(--light-bg))] border-t border-[hsl(var(--white))] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl md:text-7xl text-[hsl(var(--black))] mb-6">NEVER MISS A MATCH</h2>
          <p className="text-[hsl(var(--gray))] text-xl mb-10">
            Join the community on Twitch. Chat with fans, watch replays, and support the growth of Chicago grassroots soccer.
          </p>
          <Button asChild className="bg-[#9146FF] hover:bg-[#772ce8] text-white nav-text text-xl px-10 py-8 h-auto shadow-[0_0_20px_rgba(145,70,255,0.3)] hover:shadow-[0_0_30px_rgba(145,70,255,0.5)] transition-all duration-300">
            <a href="https://www.twitch.tv/chicagosuperleague" target="_blank" rel="noopener noreferrer">
              <Twitch className="w-6 h-6 mr-3" /> Go to Twitch Channel
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}

export default WatchPage;