import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Users, Map, Calendar, Trophy, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

function SponsorsPage() {
  return (
    <div className="pt-32 pb-24 bg-[hsl(var(--background))] min-h-screen">
      <Helmet>
        <title>Sponsors | Chicago Super League</title>
        <meta name="description" content="Partner with the Chicago Super League. Invest in South Side Chicago soccer and reach a passionate, growing community audience." />
        <link rel="canonical" href="https://chicagosuperleague.com/sponsors" />
        <meta property="og:title" content="Sponsors | Chicago Super League" />
        <meta property="og:description" content="Partner with the Chicago Super League. Invest in South Side Chicago soccer and reach a passionate, growing community audience." />
        <meta property="og:url" content="https://chicagosuperleague.com/sponsors" />
        <meta name="twitter:title" content="Sponsors | Chicago Super League" />
        <meta name="twitter:description" content="Partner with the Chicago Super League. Invest in South Side Chicago soccer and reach a passionate, growing community audience." />
      </Helmet>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
        <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-3 block text-lg">
          PARTNERSHIPS
        </span>
        <h1 className="text-[hsl(var(--black))] text-6xl md:text-8xl mb-6">INVEST IN THE SOUTH SIDE</h1>
        <p className="text-[hsl(var(--gray))] text-xl md:text-2xl max-w-3xl mx-auto mb-10">
          Align your brand with Chicago's premier competitive soccer league. Reach engaged local communities and support grassroots sports.
        </p>
        <Button asChild className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white nav-text text-xl px-8 py-6 h-auto">
          <a href="https://form.typeform.com/to/IajKM5fB" target="_blank" rel="noopener noreferrer">
            Become a Sponsor <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </Button>
      </section>

      {/* Reach Stats Section */}
      <section className="bg-[hsl(var(--black))] py-16 mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center divide-x divide-[hsl(var(--gray))]/30">
            <div className="px-4">
              <div className="text-4xl md:text-5xl font-['Bebas_Neue'] text-[hsl(var(--primary-light))] mb-2">8</div>
              <div className="label-text text-[hsl(var(--true-white))] text-sm tracking-wider">Founding Clubs</div>
            </div>
            <div className="px-4">
              <div className="text-4xl md:text-5xl font-['Bebas_Neue'] text-[hsl(var(--primary-light))] mb-2">5+</div>
              <div className="label-text text-[hsl(var(--true-white))] text-sm tracking-wider">Neighborhoods</div>
            </div>
            <div className="px-4">
              <div className="text-4xl md:text-5xl font-['Bebas_Neue'] text-[hsl(var(--primary-light))] mb-2">200+</div>
              <div className="label-text text-[hsl(var(--true-white))] text-sm tracking-wider">Players & Families</div>
            </div>
            <div className="px-4">
              <div className="text-4xl md:text-5xl font-['Bebas_Neue'] text-[hsl(var(--primary-light))] mb-2">18</div>
              <div className="label-text text-[hsl(var(--true-white))] text-sm tracking-wider">Match Days</div>
            </div>
            <div className="px-4 col-span-2 md:col-span-1 border-l-0 md:border-l border-[hsl(var(--gray))]/30">
              <div className="text-4xl md:text-5xl font-['Bebas_Neue'] text-[hsl(var(--primary-light))] mb-2">May 17</div>
              <div className="label-text text-[hsl(var(--true-white))] text-sm tracking-wider">S1 Launching</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-5xl text-[hsl(var(--black))]">Why Partner With Us</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[hsl(var(--true-white))] p-8 rounded-2xl shadow-sm border border-[hsl(var(--white))]">
            <div className="w-14 h-14 rounded-xl bg-[hsl(var(--light-bg))] flex items-center justify-center mb-6">
              <Map className="w-7 h-7 text-[hsl(var(--primary))]" />
            </div>
            <h3 className="text-2xl text-[hsl(var(--black))] mb-4">Hyperlocal Reach</h3>
            <p className="text-[hsl(var(--gray))]">Connect directly with engaged communities across the South Side. Our matches draw dedicated local supporters week after week.</p>
          </div>
          
          <div className="bg-[hsl(var(--true-white))] p-8 rounded-2xl shadow-sm border border-[hsl(var(--white))]">
            <div className="w-14 h-14 rounded-xl bg-[hsl(var(--light-bg))] flex items-center justify-center mb-6">
              <Users className="w-7 h-7 text-[hsl(var(--primary))]" />
            </div>
            <h3 className="text-2xl text-[hsl(var(--black))] mb-4">Authentic Association</h3>
            <p className="text-[hsl(var(--gray))]">Build brand loyalty by supporting grassroots sports and community development. Show your commitment to Chicago's neighborhoods.</p>
          </div>
          
          <div className="bg-[hsl(var(--true-white))] p-8 rounded-2xl shadow-sm border border-[hsl(var(--white))]">
            <div className="w-14 h-14 rounded-xl bg-[hsl(var(--light-bg))] flex items-center justify-center mb-6">
              <Trophy className="w-7 h-7 text-[hsl(var(--primary))]" />
            </div>
            <h3 className="text-2xl text-[hsl(var(--black))] mb-4">Digital & Physical</h3>
            <p className="text-[hsl(var(--gray))]">Gain visibility through on-field branding, digital content, social media features, and direct engagement at match days.</p>
          </div>
        </div>
      </section>

      {/* Partnership Examples */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-5xl text-[hsl(var(--black))]">Partnership Tiers</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Tier 1 */}
          <div className="bg-[hsl(var(--true-white))] p-8 rounded-2xl border border-[hsl(var(--white))]">
            <h3 className="text-3xl text-[hsl(var(--black))] mb-2">Local Business</h3>
            <p className="text-[hsl(var(--gray))] mb-6">Perfect for neighborhood businesses looking to support local sports.</p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3 text-[hsl(var(--gray))]">
                <CheckCircle2 className="w-5 h-5 text-[hsl(var(--primary))] shrink-0 mt-0.5" />
                <span>Website logo placement</span>
              </li>
              <li className="flex items-start gap-3 text-[hsl(var(--gray))]">
                <CheckCircle2 className="w-5 h-5 text-[hsl(var(--primary))] shrink-0 mt-0.5" />
                <span>Social media shoutout</span>
              </li>
              <li className="flex items-start gap-3 text-[hsl(var(--gray))]">
                <CheckCircle2 className="w-5 h-5 text-[hsl(var(--primary))] shrink-0 mt-0.5" />
                <span>Match day announcements</span>
              </li>
            </ul>
          </div>

          {/* Tier 2 - Highlighted */}
          <div className="bg-[hsl(var(--black))] p-8 rounded-2xl border-2 border-[hsl(var(--primary))] shadow-xl transform md:-translate-y-4 relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[hsl(var(--primary))] text-white px-4 py-1 rounded-full text-sm font-bold tracking-wider uppercase">
              Recommended
            </div>
            <h3 className="text-3xl text-[hsl(var(--true-white))] mb-2">League Partner</h3>
            <p className="text-[hsl(var(--gray))] mb-6">Comprehensive visibility across all league channels and events.</p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3 text-[hsl(var(--true-white))]">
                <CheckCircle2 className="w-5 h-5 text-[hsl(var(--primary-light))] shrink-0 mt-0.5" />
                <span>Premium website placement</span>
              </li>
              <li className="flex items-start gap-3 text-[hsl(var(--true-white))]">
                <CheckCircle2 className="w-5 h-5 text-[hsl(var(--primary-light))] shrink-0 mt-0.5" />
                <span>Field banners at all matches</span>
              </li>
              <li className="flex items-start gap-3 text-[hsl(var(--true-white))]">
                <CheckCircle2 className="w-5 h-5 text-[hsl(var(--primary-light))] shrink-0 mt-0.5" />
                <span>Dedicated social media campaigns</span>
              </li>
              <li className="flex items-start gap-3 text-[hsl(var(--true-white))]">
                <CheckCircle2 className="w-5 h-5 text-[hsl(var(--primary-light))] shrink-0 mt-0.5" />
                <span>Logo on league communications</span>
              </li>
            </ul>
          </div>

          {/* Tier 3 */}
          <div className="bg-[hsl(var(--true-white))] p-8 rounded-2xl border border-[hsl(var(--white))]">
            <h3 className="text-3xl text-[hsl(var(--black))] mb-2">In-Kind Partner</h3>
            <p className="text-[hsl(var(--gray))] mb-6">Provide equipment, services, or venues to support league operations.</p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3 text-[hsl(var(--gray))]">
                <CheckCircle2 className="w-5 h-5 text-[hsl(var(--primary))] shrink-0 mt-0.5" />
                <span>Customized visibility package</span>
              </li>
              <li className="flex items-start gap-3 text-[hsl(var(--gray))]">
                <CheckCircle2 className="w-5 h-5 text-[hsl(var(--primary))] shrink-0 mt-0.5" />
                <span>Product integration</span>
              </li>
              <li className="flex items-start gap-3 text-[hsl(var(--gray))]">
                <CheckCircle2 className="w-5 h-5 text-[hsl(var(--primary))] shrink-0 mt-0.5" />
                <span>Direct player engagement</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Custom Partnership */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 text-center">
        <div className="bg-[hsl(var(--light-bg))] p-10 rounded-2xl border border-[hsl(var(--white))]">
          <h3 className="text-3xl text-[hsl(var(--black))] mb-4">Looking for something specific?</h3>
          <p className="text-[hsl(var(--gray))] text-lg mb-0">
            We are open to creative partnerships including title sponsorships, division naming rights, and custom activations. Fill out the form below and let's build something great together.
          </p>
        </div>
      </section>

      {/* Typeform Embed */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[hsl(var(--true-white))] rounded-2xl shadow-sm border border-[hsl(var(--white))] overflow-hidden">
          <iframe 
            src="https://form.typeform.com/to/IajKM5fB" 
            width="100%" 
            height="600px" 
            frameBorder="0"
            title="Sponsor Interest Form"
            className="w-full"
          ></iframe>
        </div>
      </section>
    </div>
  );
}

export default SponsorsPage;