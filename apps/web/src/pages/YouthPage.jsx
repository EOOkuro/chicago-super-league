import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import {
  ArrowRight, CheckCircle2, Users, Calendar, Shirt,
  Sparkles, ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// ---------------------------------------------------------------------------
// Contact
// ---------------------------------------------------------------------------
const CONTACT_EMAIL = 'ekuro@tekkerz.co';
const CONTACT_HREF = `mailto:${CONTACT_EMAIL}?subject=Chicago%20Super%20League%20Inquiry`;
const TEAM_REGISTRATION_HREF = `mailto:${CONTACT_EMAIL}?subject=Register%20a%20New%20Team`;
const CONTACT_FORM_HREF = '/contact';

// ---------------------------------------------------------------------------
// Pricing — change a price here and the whole page follows.
// ---------------------------------------------------------------------------
const PRICING = {
  turnkeySeason: 75,   // per player, per 3-month season
  turnkeyYear: 200,    // per player, per year
  gamesOnlyYear: 25,   // per player, per year
  fullKit: 35,         // discounted full kit for games-only teams
  customKit: 55,       // custom uniforms, ordered with player registration
};

// ---------------------------------------------------------------------------
// Member clubs — registration for individual players happens on each
// club's own site. Clubs without a url render as a plain (non-link) card.
// ---------------------------------------------------------------------------
const MEMBER_CLUBS = [
  { name: 'Club de Futbol Pilsen', url: 'https://cfpilsen.chicagosuperleague.com' },
  { name: 'Hyde Park Rangers FC', url: 'https://hprfc.chicagosuperleague.com' },
  { name: 'Bronzeville Athletic Club', url: 'https://bronzeville-ac.vercel.app', note: 'bronzevilleac.chicagosuperleague.com coming soon' },
  { name: 'Hunnids Athletic Club', url: 'https://hunnids-ac.vercel.app', note: 'hunnidsac.chicagosuperleague.com coming soon' },
  { name: 'South Shore Sports Club', url: 'https://southshoresc.chicagosuperleague.com' },
  { name: 'CF Colonia', url: 'https://cfcolonia.chicagosuperleague.com', note: 'Back of the Yards · Girls only' },
  { name: 'Chicago Wit', url: null, note: 'Greater Grand Crossing · Girls only · Site coming soon' },
  { name: 'Midway FC', url: 'https://midway.chicagosuperleague.com' },
  { name: 'Englewood Athletic Club', url: 'https://englewoodac.chicagosuperleague.com' },
  { name: 'Beverly FC', url: 'https://beverly.chicagosuperleague.com' },
];

const NEW_CLUBS = [
  { name: 'Hyde Park Neighborhood Club', url: 'https://www.hpnclub.org' },
  { name: 'CJ Brown Foundation', url: 'https://www.cjbrownfoundation.org' },
  { name: 'Al Farooq Academy', url: 'https://alfarooq.chicagosuperleague.com' },
];

// ---------------------------------------------------------------------------
// OutSouth League — Youth & High School schedule
// (Adult/Men's Division and SMESL schedules intentionally excluded)
// ---------------------------------------------------------------------------
const SCHEDULES = [
  {
    division: 'Ages 4–6 (3v3)',
    location: 'Kenwood Community Park – Field 1, 1330 E. 50th St., Chicago, IL 60615',
    games: [
      { week: 'Week 1', matchup: 'Hyde Park Rangers FC vs. CFPilsen', date: 'Sun, Sep 27, 2026', time: '9:00 AM', notes: 'Bye: Al Farooq' },
      { week: 'Week 2', matchup: 'CFPilsen vs. Al Farooq', date: 'Sun, Oct 4, 2026', time: '9:00 AM', notes: 'Bye: Hyde Park Rangers FC' },
      { week: 'Week 3', matchup: 'Al Farooq vs. Hyde Park Rangers FC', date: 'Sun, Oct 11, 2026', time: '9:00 AM', notes: 'Bye: CFPilsen' },
      { week: 'Week 4', matchup: 'Hyde Park Rangers FC vs. CFPilsen', date: 'Sun, Oct 18, 2026', time: '9:00 AM', notes: 'Bye: Al Farooq' },
      { week: 'Week 5', matchup: 'CFPilsen vs. Al Farooq', date: 'Sun, Oct 25, 2026', time: '9:00 AM', notes: 'Bye: Hyde Park Rangers FC' },
      { week: 'Week 6', matchup: 'Al Farooq vs. Hyde Park Rangers FC', date: 'Sun, Nov 1, 2026', time: '9:00 AM', notes: 'Final regular match' },
      { week: 'Week 7', matchup: 'Fun Festival Day 1 — Skills, scrimmages, and mini matches', date: 'Sun, Nov 8, 2026', time: '9:00 AM', notes: '' },
      { week: 'Week 8', matchup: 'Fun Festival Day 2 & End-of-Season Celebration', date: 'Sun, Nov 15, 2026', time: '9:00 AM', notes: '' },
    ],
  },
  {
    division: 'Ages 7–10 (5v5)',
    location: 'Kenwood Community Park – Field 2, 1330 E. 50th St., Chicago, IL 60615',
    games: [
      { week: 'Week 1', matchup: 'Hyde Park Neighborhood Club vs. Al Farooq', date: 'Sun, Sep 27, 2026', time: '9:00 AM', notes: '' },
      { week: 'Week 2', matchup: 'Hyde Park Rangers FC vs. CJ Brown Foundation', date: 'Sun, Oct 4, 2026', time: '9:00 AM', notes: '' },
      { week: 'Week 2', matchup: 'Hyde Park Neighborhood Club vs. CFPilsen', date: 'Sun, Oct 4, 2026', time: '9:45 AM', notes: 'Bye: Al Farooq' },
      { week: 'Week 3', matchup: 'Hyde Park Rangers FC vs. Al Farooq', date: 'Sun, Oct 11, 2026', time: '9:00 AM', notes: '' },
      { week: 'Week 3', matchup: 'CJ Brown Foundation vs. CFPilsen', date: 'Sun, Oct 11, 2026', time: '9:45 AM', notes: 'Bye: Hyde Park Neighborhood Club' },
      { week: 'Week 4', matchup: 'Hyde Park Rangers FC vs. CFPilsen', date: 'Sun, Oct 18, 2026', time: '9:00 AM', notes: '' },
      { week: 'Week 4', matchup: 'Al Farooq vs. Hyde Park Neighborhood Club', date: 'Sun, Oct 18, 2026', time: '9:45 AM', notes: 'Bye: CJ Brown Foundation' },
      { week: 'Week 5', matchup: 'Hyde Park Rangers FC vs. Hyde Park Neighborhood Club', date: 'Sun, Oct 25, 2026', time: '9:00 AM', notes: '' },
      { week: 'Week 5', matchup: 'Al Farooq vs. CJ Brown Foundation', date: 'Sun, Oct 25, 2026', time: '9:45 AM', notes: 'Bye: CFPilsen' },
      { week: 'Week 6', matchup: 'Hyde Park Neighborhood Club vs. CJ Brown Foundation', date: 'Sun, Nov 1, 2026', time: '9:00 AM', notes: 'Start of 2nd round-robin; final regular match' },
      { week: 'Week 6', matchup: 'CFPilsen vs. Al Farooq', date: 'Sun, Nov 1, 2026', time: '9:45 AM', notes: 'Start of 2nd round-robin; final regular match' },
      { week: 'Week 7', matchup: 'Playoffs — Semifinal 1: 1st Place vs. 4th Place', date: 'Sun, Nov 8, 2026', time: '9:00 AM', notes: '' },
      { week: 'Week 7', matchup: 'Playoffs — Semifinal 2: 2nd Place vs. 3rd Place', date: 'Sun, Nov 8, 2026', time: '9:45 AM', notes: '' },
      { week: 'Week 8', matchup: 'Championship Final & 3rd-Place Match', date: 'Sun, Nov 15, 2026', time: '9:00 AM', notes: '' },
    ],
  },
  {
    division: 'Ages 11–14 (5v5)',
    location: 'Kenwood Community Park – Field 2, 1330 E. 50th St., Chicago, IL 60615',
    games: [
      { week: 'Week 1', matchup: 'Hyde Park Rangers FC vs. Hyde Park Neighborhood Club', date: 'Sun, Sep 27, 2026', time: '10:30 AM', notes: '' },
      { week: 'Week 1', matchup: 'CFPilsen vs. Al Farooq', date: 'Sun, Sep 27, 2026', time: '11:15 AM', notes: '' },
      { week: 'Week 2', matchup: 'Hyde Park Rangers FC vs. CFPilsen', date: 'Sun, Oct 4, 2026', time: '10:30 AM', notes: '' },
      { week: 'Week 2', matchup: 'Hyde Park Neighborhood Club vs. Al Farooq', date: 'Sun, Oct 4, 2026', time: '11:15 AM', notes: '' },
      { week: 'Week 3', matchup: 'Hyde Park Rangers FC vs. Al Farooq', date: 'Sun, Oct 11, 2026', time: '10:30 AM', notes: '' },
      { week: 'Week 3', matchup: 'Hyde Park Neighborhood Club vs. CFPilsen', date: 'Sun, Oct 11, 2026', time: '11:15 AM', notes: '' },
      { week: 'Week 4', matchup: 'Hyde Park Rangers FC vs. Hyde Park Neighborhood Club', date: 'Sun, Oct 18, 2026', time: '10:30 AM', notes: '' },
      { week: 'Week 4', matchup: 'CFPilsen vs. Al Farooq', date: 'Sun, Oct 18, 2026', time: '11:15 AM', notes: '' },
      { week: 'Week 5', matchup: 'Hyde Park Rangers FC vs. CFPilsen', date: 'Sun, Oct 25, 2026', time: '10:30 AM', notes: '' },
      { week: 'Week 5', matchup: 'Hyde Park Neighborhood Club vs. Al Farooq', date: 'Sun, Oct 25, 2026', time: '11:15 AM', notes: '' },
      { week: 'Week 6', matchup: 'Hyde Park Rangers FC vs. Al Farooq', date: 'Sun, Nov 1, 2026', time: '10:30 AM', notes: 'Final regular round-robin match' },
      { week: 'Week 6', matchup: 'Hyde Park Neighborhood Club vs. CFPilsen', date: 'Sun, Nov 1, 2026', time: '11:15 AM', notes: 'Final regular round-robin match' },
      { week: 'Week 7', matchup: 'Playoffs — Semifinal 1: 1st Place vs. 4th Place', date: 'Sun, Nov 8, 2026', time: '10:30 AM', notes: '' },
      { week: 'Week 7', matchup: 'Playoffs — Semifinal 2: 2nd Place vs. 3rd Place', date: 'Sun, Nov 8, 2026', time: '11:15 AM', notes: '' },
      { week: 'Week 8', matchup: 'Championship Final & 3rd-Place Match', date: 'Sun, Nov 15, 2026', time: '9:45 AM', notes: '' },
    ],
  },
  {
    division: 'High School (11v11)',
    location: 'UChicago Charter, 1330 East 50th St. Chicago, IL 60615',
    games: [
      { week: 'Week 1', matchup: 'Hyde Park Rangers FC vs. CFPilsen', date: 'Sun, Sep 27, 2026', time: '2:00 PM', notes: '' },
      { week: 'Week 1', matchup: 'Bronzeville AC vs. South Shore SC', date: 'Sun, Sep 27, 2026', time: '3:30 PM', notes: 'Bye: Al Farooq' },
      { week: 'Week 2', matchup: 'Al Farooq vs. Bronzeville AC', date: 'Sun, Oct 4, 2026', time: '2:00 PM', notes: '' },
      { week: 'Week 2', matchup: 'South Shore SC vs. Hyde Park Rangers FC', date: 'Sun, Oct 4, 2026', time: '3:30 PM', notes: 'Bye: CFPilsen' },
      { week: 'Week 3', matchup: 'CFPilsen vs. Al Farooq', date: 'Sun, Oct 11, 2026', time: '2:00 PM', notes: '' },
      { week: 'Week 3', matchup: 'Hyde Park Rangers FC vs. Bronzeville AC', date: 'Sun, Oct 11, 2026', time: '3:30 PM', notes: 'Bye: South Shore SC' },
      { week: 'Week 4', matchup: 'Al Farooq vs. South Shore SC', date: 'Sun, Oct 18, 2026', time: '2:00 PM', notes: '' },
      { week: 'Week 4', matchup: 'CFPilsen vs. Hyde Park Rangers FC', date: 'Sun, Oct 18, 2026', time: '3:30 PM', notes: 'Bye: Bronzeville AC' },
      { week: 'Week 5', matchup: 'South Shore SC vs. Hyde Park Rangers FC', date: 'Sun, Oct 25, 2026', time: '2:00 PM', notes: '' },
      { week: 'Week 5', matchup: 'Al Farooq vs. Bronzeville AC', date: 'Sun, Oct 25, 2026', time: '3:30 PM', notes: 'Wraps up HS single round-robin' },
      { week: 'Week 6', matchup: 'Playoffs — Semifinal 1: 1st Seed vs. 4th Seed', date: 'Sun, Nov 1, 2026', time: '2:00 PM', notes: '' },
      { week: 'Week 6', matchup: 'Playoffs — Semifinal 2: 2nd Seed vs. 3rd Seed', date: 'Sun, Nov 1, 2026', time: '3:30 PM', notes: '' },
      { week: 'Week 7', matchup: '3rd-Place Consolation Match', date: 'Sun, Nov 8, 2026', time: '2:00 PM', notes: 'Losers of Semifinals' },
      { week: 'Week 8', matchup: 'Championship Final Match', date: 'Sun, Nov 15, 2026', time: '2:00 PM', notes: '' },
    ],
  },
];

function ScheduleTable({ games }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[hsl(var(--white))]">
      <table className="w-full text-left border-collapse min-w-[640px]">
        <thead>
          <tr className="bg-[hsl(var(--primary))] text-white">
            <th className="p-3 text-sm font-bold uppercase tracking-wider">Week</th>
            <th className="p-3 text-sm font-bold uppercase tracking-wider">Matchup</th>
            <th className="p-3 text-sm font-bold uppercase tracking-wider">Date</th>
            <th className="p-3 text-sm font-bold uppercase tracking-wider">Time</th>
            <th className="p-3 text-sm font-bold uppercase tracking-wider">Notes</th>
          </tr>
        </thead>
        <tbody>
          {games.map((g, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-[hsl(var(--true-white))]' : 'bg-[hsl(var(--light-bg))]'}>
              <td className="p-3 font-bold text-[hsl(var(--primary))] whitespace-nowrap">{g.week}</td>
              <td className="p-3 text-[hsl(var(--black))]">{g.matchup}</td>
              <td className="p-3 text-[hsl(var(--gray))] whitespace-nowrap">{g.date}</td>
              <td className="p-3 text-[hsl(var(--gray))] whitespace-nowrap">{g.time}</td>
              <td className="p-3 text-[hsl(var(--gray))]">{g.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function YouthPage() {
  const [activeDivision, setActiveDivision] = useState(0);

  const youthImages = {
    hero: 'https://res.cloudinary.com/dfpj9filc/image/upload/q_auto/f_auto/v1779390107/74e0a495-1247-44a3-966d-c851f914e784_fbiuya.jpg',
    gallery1: 'https://res.cloudinary.com/dfpj9filc/image/upload/q_auto/f_auto/v1779390010/IMG_0923_klpiaz.heic',
    philosophy: 'https://res.cloudinary.com/dfpj9filc/image/upload/q_auto/f_auto/v1779386898/IMG_0179_dj42ap.jpg',
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className="bg-[hsl(var(--background))] min-h-screen">
      <Helmet>
        <title>Youth Division | MegCity Soccer</title>
        <meta name="description" content="MegCity Soccer's youth division gives South Side kids ages 4–17 a structured, joyful, development-first environment to fall in love with the game." />
        <link rel="canonical" href="https://chicagosuperleague.com/youth" />
        <meta property="og:title" content="Youth Division | MegCity Soccer" />
        <meta property="og:description" content="MegCity Soccer's youth division gives South Side kids ages 4–17 a structured, joyful, development-first environment to fall in love with the game." />
        <meta property="og:url" content="https://chicagosuperleague.com/youth" />
        <meta name="twitter:title" content="Youth Division | MegCity Soccer" />
        <meta name="twitter:description" content="MegCity Soccer's youth division gives South Side kids ages 4–17 a structured, joyful, development-first environment to fall in love with the game." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 bg-[hsl(var(--black))] overflow-hidden">
        <div className="absolute inset-0 opacity-45">
          <img
            src={youthImages.hero}
            alt="MegCity Soccer youth players"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--black))] via-[hsl(var(--black))]/80 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl">
            <motion.span variants={fadeUp} className="label-text text-[hsl(var(--primary-light))] font-bold tracking-widest mb-4 block text-lg">
              MegCity Soccer · Youth Program · Ages 4–17
            </motion.span>

            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl text-[hsl(var(--true-white))] mb-6 leading-none">
              BUILDING THE NEXT GENERATION
            </motion.h1>

            <motion.p variants={fadeUp} className="text-xl md:text-2xl text-[hsl(var(--white))] mb-4">
              Give your child a real team, a real kit, and a real community. All skill levels welcome. No experience necessary.
            </motion.p>

            <motion.p variants={fadeUp} className="text-base md:text-lg text-[hsl(var(--primary-light))] font-bold mb-6">
              Registration is now handled by each individual club — find your child's team below and sign up directly with them.
            </motion.p>

            {/* Quick Highlights Badge Box */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 bg-[hsl(var(--black))]/60 p-6 rounded-xl border border-[hsl(var(--white))]/10 backdrop-blur-sm">
              <div className="flex flex-col">
                <span className="text-sm text-[hsl(var(--primary-light))] font-bold tracking-wider uppercase">Price</span>
                <span className="text-2xl font-bold text-[hsl(var(--true-white))]">${PRICING.turnkeySeason} / Season</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-[hsl(var(--primary-light))] font-bold tracking-wider uppercase">Practices</span>
                <span className="text-2xl font-bold text-[hsl(var(--true-white))]">2x Per Week</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-[hsl(var(--primary-light))] font-bold tracking-wider uppercase">Games</span>
                <span className="text-2xl font-bold text-[hsl(var(--true-white))]">Weekends</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-[hsl(var(--primary-light))] font-bold tracking-wider uppercase">Included</span>
                <span className="text-2xl font-bold text-[hsl(var(--true-white))]">Full Kit + Tee</span>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white nav-text text-lg px-8 py-6 h-auto">
                <a href="#teams">
                  Register Your Child <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>

              <Button asChild variant="outline" className="border-2 border-[hsl(var(--white))] text-[hsl(var(--true-white))] hover:bg-[hsl(var(--white))] hover:text-[hsl(var(--black))] bg-transparent nav-text text-lg px-8 py-6 h-auto">
                <a href="#team-registration">
                  Register Your Team <Users className="ml-2 w-5 h-5" />
                </a>
              </Button>

              <Button asChild variant="outline" className="border-2 border-[hsl(var(--white))] text-[hsl(var(--true-white))] hover:bg-[hsl(var(--white))] hover:text-[hsl(var(--black))] bg-transparent nav-text text-lg px-8 py-6 h-auto">
                <a href="#details">Program Details</a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Now Accepting New Teams */}
      <section className="py-10 bg-[hsl(var(--primary))]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <Sparkles className="w-7 h-7 text-white flex-shrink-0" />
            <p className="text-white text-lg md:text-xl font-bold">
              We're now accepting new teams into the league!
            </p>
          </div>
          <Button asChild className="bg-white text-[hsl(var(--primary))] hover:bg-[hsl(var(--light-bg))] nav-text px-6 py-5 h-auto">
            <a href="#team-registration">
              Register Your Team <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </Button>
        </div>
      </section>

      {/* Team Registration */}
      <section id="team-registration" className="py-16 bg-[hsl(var(--true-white))] border-b border-[hsl(var(--white))]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl text-[hsl(var(--black))] mb-3">REGISTER YOUR TEAM</h2>
            <p className="text-[hsl(var(--gray))] text-lg max-w-2xl mx-auto">
              Teams are registered by player, so there's no separate team fee. You pay for the players on your roster, nothing else.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-[hsl(var(--light-bg))] border-2 border-[hsl(var(--primary))] shadow-sm">
              <CardContent className="p-8">
                <div className="text-xs font-bold text-[hsl(var(--primary))] uppercase tracking-widest mb-2">Turnkey</div>
                <h3 className="text-2xl font-bold text-[hsl(var(--black))] mb-1">Everything handled</h3>
                <p className="text-[hsl(var(--gray))] mb-4">
                  Built for churches, nonprofits, and parents starting a team from scratch.
                </p>

                <div className="mb-5">
                  <div className="text-4xl font-bold text-[hsl(var(--black))]">
                    ${PRICING.turnkeySeason}
                    <span className="text-base font-medium text-[hsl(var(--gray))]"> per player, per 3-month season</span>
                  </div>
                  <div className="text-lg font-bold text-[hsl(var(--primary))] mt-1">
                    or ${PRICING.turnkeyYear} per player, per year
                  </div>
                </div>

                <ul className="space-y-3 text-[hsl(var(--gray))]">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))] flex-shrink-0" /> Paid coaches</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))] flex-shrink-0" /> Full uniform</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))] flex-shrink-0" /> Practice field access</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))] flex-shrink-0" /> League games</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))] flex-shrink-0" /> No additional fees</li>
                </ul>

                <Button asChild className="mt-6 bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white nav-text px-6 py-5 h-auto">
                  <a href={TEAM_REGISTRATION_HREF}>
                    Register a turnkey team <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-[hsl(var(--light-bg))] border-none shadow-sm">
              <CardContent className="p-8">
                <div className="text-xs font-bold text-[hsl(var(--primary))] uppercase tracking-widest mb-2">Already set up?</div>
                <h3 className="text-2xl font-bold text-[hsl(var(--black))] mb-1">Games only</h3>
                <p className="text-[hsl(var(--gray))] mb-4">
                  Your team already has coaching, uniforms, and a practice field. You just need a place to play.
                </p>

                <div className="mb-5">
                  <div className="text-4xl font-bold text-[hsl(var(--black))]">
                    ${PRICING.gamesOnlyYear}
                    <span className="text-base font-medium text-[hsl(var(--gray))]"> per player, per year</span>
                  </div>
                  <div className="text-lg font-bold text-[hsl(var(--primary))] mt-1">
                    Full kit add-on: ${PRICING.fullKit} per player
                  </div>
                  <div className="text-lg font-bold text-[hsl(var(--primary))]">
                    Custom uniforms: ${PRICING.customKit} per player
                  </div>
                </div>

                <ul className="space-y-3 text-[hsl(var(--gray))]">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))] flex-shrink-0" /> League registration and scheduled games</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))] flex-shrink-0" /> Discounted full kit, or fully custom uniforms, ordered with player registration</li>
                </ul>

                <p className="text-[hsl(var(--gray))] mt-6">
                  Need something different?{' '}
                  <a href={CONTACT_HREF} className="text-[hsl(var(--primary))] font-bold underline">Ask us</a>.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Program Quick Pricing & Details Section */}
      <section id="details" className="py-20 bg-[hsl(var(--light-bg))] border-b border-[hsl(var(--white))]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-3 block">ALL-INCLUSIVE MEMBERSHIP</span>
          <h2 className="text-4xl md:text-5xl text-[hsl(var(--black))] mb-4">${PRICING.turnkeySeason} PER SEASON · ${PRICING.turnkeyYear} PER YEAR</h2>
          <p className="text-[hsl(var(--gray))] text-lg mb-4 max-w-2xl mx-auto">
            Spots are limited. Club de Futbol Pilsen and our partner clubs are structuring accessible paths to give South Side kids a premium team framework without the massive corporate fees.
          </p>
          <p className="text-[hsl(var(--gray))] text-base mb-12 max-w-2xl mx-auto">
            Looking for a U6–U18 division? <a href={CONTACT_FORM_HREF} className="text-[hsl(var(--primary))] font-bold underline">Reach out through our contact form</a> and we'll point you to the right club.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <Card className="bg-[hsl(var(--true-white))] border-none shadow-sm">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-[hsl(var(--black))] mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[hsl(var(--primary))]" /> Training Schedule
                </h3>
                <ul className="space-y-3 text-[hsl(var(--gray))]">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))]" /> 2 practice sessions per week</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))]" /> Structured weekend league games</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))]" /> Full season schedule below</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-[hsl(var(--true-white))] border-none shadow-sm">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-[hsl(var(--black))] mb-4 flex items-center gap-2">
                  <Shirt className="w-5 h-5 text-[hsl(var(--primary))]" /> Gear & Access
                </h3>
                <ul className="space-y-3 text-[hsl(var(--gray))]">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))]" /> Full match uniform included</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))]" /> Dedicated practice shirt included</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))]" /> Ages 4–17 · All skill levels welcome</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Age Groups */}
      <section className="py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-3 block">PATHWAY</span>
          <h2 className="text-4xl md:text-5xl text-[hsl(var(--black))]">AGE DIVISIONS</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { age: 'Ages 4–6', phase: 'Intro Phase', desc: 'Fun, coordination, comfort with the ball. High repetitions, movement, and establishing pure joy for the game.' },
            { age: 'U8–U10', phase: 'Foundation Phase', desc: 'Ball mastery, small-sided game formats. High touches, rotating groups, and discovery learning.' },
            { age: 'U11–U13', phase: 'Development Phase', desc: 'Technical expansion and game awareness. Structured positioning with local competition formats.' },
            { age: 'U14–U17', phase: 'Competitive Phase', desc: 'Tactical alignment and full match execution. Direct paths to high school preparation and adult frameworks.' },
          ].map((group, idx) => (
            <Card key={idx} className="bg-[hsl(var(--true-white))] border-none shadow-md hover:-translate-y-1 transition-transform duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[hsl(var(--light-bg))] rounded-full flex items-center justify-center mx-auto mb-6 text-[hsl(var(--primary))] font-['Bebas_Neue'] text-2xl">
                  {idx + 1}
                </div>
                <h3 className="text-3xl text-[hsl(var(--black))] mb-2">{group.age}</h3>
                <div className="text-sm font-bold text-[hsl(var(--primary))] uppercase tracking-widest mb-4">{group.phase}</div>
                <p className="text-[hsl(var(--gray))]">{group.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-center text-[hsl(var(--gray))] mt-10">
          Looking for a U6–U18 division? <a href={CONTACT_FORM_HREF} className="text-[hsl(var(--primary))] font-bold underline">Reach out through our contact form</a>.
        </p>
      </section>

      {/* Schedule */}
      <section id="schedule" className="py-20 md:py-32 bg-[hsl(var(--light-bg))] border-t border-[hsl(var(--white))]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-3 block">OUTSOUTH LEAGUE</span>
            <h2 className="text-4xl md:text-5xl text-[hsl(var(--black))] mb-4">YOUTH &amp; HIGH SCHOOL SCHEDULE</h2>
            <p className="text-[hsl(var(--gray))] max-w-2xl mx-auto">
              Every fixture for our youth and high school divisions. Kenwood Community Park hosts Ages 4–14; high school games are played at UChicago Charter.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {SCHEDULES.map((s, idx) => (
              <button
                key={s.division}
                onClick={() => setActiveDivision(idx)}
                className={`px-5 py-3 rounded-full font-bold text-sm md:text-base transition-colors ${
                  activeDivision === idx
                    ? 'bg-[hsl(var(--primary))] text-white'
                    : 'bg-[hsl(var(--true-white))] text-[hsl(var(--black))] border border-[hsl(var(--white))] hover:bg-[hsl(var(--primary))]/10'
                }`}
              >
                {s.division}
              </button>
            ))}
          </div>

          <div className="mb-4 text-[hsl(var(--gray))] font-medium">
            {SCHEDULES[activeDivision].division} &middot; {SCHEDULES[activeDivision].location}
          </div>

          <ScheduleTable games={SCHEDULES[activeDivision].games} />
        </div>
      </section>

      {/* Real Program Images */}
      <section className="pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.values(youthImages).map((image, index) => (
            <div key={index} className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-[hsl(var(--light-bg))]">
              <img
                src={image}
                alt={`MegCity Soccer youth program ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[hsl(var(--white))]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-3 block">PHILOSOPHY</span>
            <h2 className="text-4xl md:text-5xl text-[hsl(var(--black))] mb-6">DEVELOPMENT OVER WINS</h2>
            <p className="text-lg text-[hsl(var(--gray))] mb-8">
              MegCity Soccer operates under clear local parameters that prioritize long-term growth and community accessibility above everything else.
            </p>
            <ul className="space-y-4">
              {[
                'Development over early tournament pressure — always.',
                'High touches and technical execution emphasized in every session.',
                'Uncompromised community value so any kid who wants to play can excel.',
                'True neighborhood identity across South Side clusters.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 w-6 h-6 rounded-full bg-[hsl(var(--primary))]/10 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-[hsl(var(--primary))]"></div>
                  </div>
                  <span className="text-[hsl(var(--black))] font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
            <img
              src={youthImages.philosophy}
              alt="MegCity Soccer player development"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--black))]/80 to-transparent flex items-end p-8">
              <div>
                <h3 className="text-3xl text-white mb-2">ONE COMMUNITY. REAL INFRASTRUCTURE.</h3>
                <p className="text-white/80">Every player deserves a structured team environment regardless of resource barriers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Teams */}
      <section className="py-20 bg-[hsl(var(--primary))]/5 border-t border-[hsl(var(--white))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-3 block">JUST JOINED</span>
          <h2 className="text-4xl md:text-5xl text-[hsl(var(--black))] mb-4">WELCOMING 3 NEW TEAMS</h2>
          <p className="text-[hsl(var(--gray))] text-lg mb-12 max-w-2xl mx-auto">
            A huge welcome to the newest clubs in the Chicago Super League family.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {NEW_CLUBS.map((club, idx) => (
              <a
                key={idx}
                href={club.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[hsl(var(--true-white))] px-6 py-8 rounded-xl border-2 border-[hsl(var(--primary))] shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="text-xs font-bold text-[hsl(var(--primary))] uppercase tracking-widest mb-2">New Team</div>
                <div className="font-['Bebas_Neue'] text-2xl text-[hsl(var(--black))] tracking-wide mb-2">{club.name}</div>
                <div className="flex items-center justify-center gap-1 text-sm text-[hsl(var(--gray))] group-hover:text-[hsl(var(--primary))]">
                  Visit site <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Clubs */}
      <section id="teams" className="py-20 bg-[hsl(var(--true-white))] border-t border-[hsl(var(--white))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-3 block">COMMUNITY</span>
          <h2 className="text-4xl md:text-5xl text-[hsl(var(--black))] mb-4">OUR CLUBS</h2>
          <p className="text-[hsl(var(--gray))] text-lg mb-12 max-w-2xl mx-auto">
            Registration for players happens directly with each club. Find your team below to get started.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {MEMBER_CLUBS.map((club, idx) => {
              const inner = (
                <>
                  <div className="font-['Bebas_Neue'] text-xl md:text-2xl text-[hsl(var(--black))] tracking-wide flex items-center gap-2">
                    {club.name}
                    {club.url && <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />}
                  </div>
                  {club.note && <div className="text-xs text-[hsl(var(--gray))] mt-1">{club.note}</div>}
                </>
              );
              const cls = 'group bg-[hsl(var(--light-bg))] px-6 py-4 rounded-xl border border-[hsl(var(--white))] shadow-sm';

              return club.url ? (
                <a
                  key={idx}
                  href={club.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${cls} hover:shadow-md hover:-translate-y-0.5 transition-all`}
                >
                  {inner}
                </a>
              ) : (
                <div key={idx} className={cls}>{inner}</div>
              );
            })}
          </div>

          <p className="text-[hsl(var(--gray))] mt-10">
            Don't see your club yet? <a href="#team-registration" className="text-[hsl(var(--primary))] font-bold underline">Register your team</a> — we're accepting new teams now.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-[hsl(var(--black))] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl md:text-7xl text-[hsl(var(--true-white))] mb-6">READY TO JOIN?</h2>
          <p className="text-[hsl(var(--gray))] text-xl mb-4">
            Want to register your child? Find their club above and sign up directly on that team's site.
          </p>
          <p className="text-[hsl(var(--primary-light))] font-bold text-lg mb-10 uppercase tracking-wider">
            ${PRICING.turnkeySeason} Per Season · ${PRICING.turnkeyYear} Per Year · All Gear Included · Spots are Strictly Limited
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white nav-text text-xl px-12 py-8 h-auto shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all duration-300">
              <a href="#teams">
                REGISTER YOUR CHILD <ArrowRight className="ml-2 w-6 h-6" />
              </a>
            </Button>
            <Button asChild variant="outline" className="border-2 border-[hsl(var(--white))] text-[hsl(var(--true-white))] hover:bg-[hsl(var(--white))] hover:text-[hsl(var(--black))] bg-transparent nav-text text-xl px-12 py-8 h-auto">
              <a href="#team-registration">
                REGISTER YOUR TEAM <Users className="ml-2 w-6 h-6" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default YouthPage;
