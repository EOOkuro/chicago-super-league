import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
function LeagueStructure() {
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0
    }
  };
  return <section id="league-structure" className="py-24 md:py-32 bg-[hsl(var(--true-white))] border-y border-[hsl(var(--white))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="label-text text-[hsl(var(--primary))] font-bold tracking-widest mb-4 block">
            League Architecture
          </span>
          <h2 className="text-5xl md:text-6xl text-[hsl(var(--black))] mb-6">THE PYRAMID</h2>
          <p className="text-[hsl(var(--gray))] text-xl max-w-3xl mx-auto mb-12">
            Six tiers connecting elite amateur competition to recreational neighborhood leagues — with promotion and relegation built in from day one.
          </p>

          {/* Color Legend */}
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-[hsl(var(--pyramid-green))] shadow-sm"></div>
              <span className="label-text text-[hsl(var(--black))] font-bold tracking-wider">Open · Women </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-[hsl(var(--pyramid-yellow))] shadow-sm border border-[hsl(var(--gray))]/20"></div>
              <span className="label-text text-[hsl(var(--black))] font-bold tracking-wider">We operate · Launching soon</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-[hsl(var(--pyramid-white))] border border-[hsl(var(--gray))]/30 shadow-sm"></div>
              <span className="label-text text-[hsl(var(--black))] font-bold tracking-wider">Partner leagues</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-[hsl(var(--pyramid-red))] shadow-sm"></div>
              <span className="label-text text-[hsl(var(--black))] font-bold tracking-wider">Launching TBA</span>
            </div>
          </div>
        </div>

        {/* Pyramid Visualization */}
        <div className="mb-20 w-full max-w-6xl mx-auto bg-[hsl(var(--light-bg))] pl-10 pr-6 py-6 md:px-24 md:py-12 rounded-3xl border border-[hsl(var(--white))] relative">
          <motion.div className="flex flex-col gap-6 md:gap-8 relative" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
          once: true,
          margin: "-100px"
        }}>
            {/* Level 1: Chicago Super League */}
            <motion.div variants={itemVariants} className="flex justify-center relative">
              <div className="pyramid-tier-label hidden md:block">Tier 1</div>
              <div className="pyramid-node w-full md:w-1/2 bg-[hsl(var(--pyramid-red))] text-white shadow-[0_10px_30px_rgba(230,0,0,0.2)] border-2 border-red-500/50">
                <h3 className="text-3xl md:text-5xl tracking-wider m-0 text-white">CHICAGO SUPER LEAGUE</h3>
                <span className="pyramid-label">TBA</span>
              </div>
              <div className="hidden md:block absolute -bottom-8 left-1/2 w-0.5 h-8 bg-[hsl(var(--gray))]/30"></div>
            </motion.div>
            
            {/* Level 2: SouthSide & NorthSide */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 relative pt-2">
              <div className="pyramid-tier-label hidden md:block">Tier 2</div>
              <div className="hidden md:block absolute -top-4 left-[25%] right-[25%] h-0.5 bg-[hsl(var(--gray))]/30"></div>
              <div className="hidden md:block absolute -top-4 left-[25%] w-0.5 h-4 bg-[hsl(var(--gray))]/30"></div>
              <div className="hidden md:block absolute -top-4 right-[25%] w-0.5 h-4 bg-[hsl(var(--gray))]/30"></div>

              <div className="pyramid-node bg-[hsl(var(--pyramid-yellow))] text-[hsl(var(--black))] shadow-[0_10px_30px_rgba(232,240,0,0.1)]">
                <h4 className="text-2xl md:text-3xl tracking-wide m-0">SouthSide League</h4>
                <span className="pyramid-label">Coming Soon</span>
              </div>
              <div className="pyramid-node bg-[hsl(var(--pyramid-yellow))] text-[hsl(var(--black))] shadow-[0_10px_30px_rgba(232,240,0,0.1)]">
                <h4 className="text-2xl md:text-3xl tracking-wide m-0">NorthSide League</h4>
                <span className="pyramid-label">Coming Soon</span>
              </div>
            </motion.div>

            {/* Level 3: OutSouth, Partner, OutWest, Partner */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 relative">
              <div className="pyramid-tier-label hidden md:block">Tier 3</div>
              <div className="pyramid-node bg-[hsl(var(--pyramid-green))] text-white shadow-[0_10px_30px_rgba(45,138,45,0.3)] border-2 border-emerald-400">
                <h5 className="text-xl md:text-2xl tracking-wide m-0 text-white">OutSouth League</h5>
                <span className="pyramid-label text-emerald-100">Launching May 17</span>
              </div>
              <div className="pyramid-node bg-[hsl(var(--pyramid-white))] text-[hsl(var(--black))] border border-[hsl(var(--gray))]/30">
                <h5 className="text-xl md:text-2xl tracking-wide m-0">Partner League</h5>
                <span className="pyramid-label text-[hsl(var(--gray))]">existing Chicago league</span>
              </div>
              <div className="pyramid-node bg-[hsl(var(--pyramid-yellow))] text-[hsl(var(--black))] shadow-sm">
                <h5 className="text-xl md:text-2xl tracking-wide m-0">OutWest League</h5>
                <span className="pyramid-label">Coming Soon</span>
              </div>
              <div className="pyramid-node bg-[hsl(var(--pyramid-white))] text-[hsl(var(--black))] border border-[hsl(var(--gray))]/30">
                <h5 className="text-xl md:text-2xl tracking-wide m-0">Partner League</h5>
                <span className="pyramid-label text-[hsl(var(--gray))]">Existing Chicago League</span>
              </div>
            </motion.div>

            {/* Level 4: Sub-Divisions */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 md:gap-3 relative">
              <div className="pyramid-tier-label hidden md:block">Tier 4</div>
              {[{
              name: 'OutSouth North',
              type: 'yellow',
              label: 'Coming Soon'
            }, {
              name: 'OutSouth South',
              type: 'yellow',
              label: 'Coming Soon'
            }, {
              name: 'Partner',
              type: 'white',
              label: 'Partner'
            }, {
              name: 'Partner',
              type: 'white',
              label: 'Partner'
            }, {
              name: 'OutWest North',
              type: 'yellow',
              label: 'Coming Soon'
            }, {
              name: 'OutWest South',
              type: 'yellow',
              label: 'Coming Soon'
            }, {
              name: 'Partner',
              type: 'white',
              label: 'Partner'
            }, {
              name: 'Partner',
              type: 'white',
              label: 'Partner'
            }].map((league, i) => <div key={i} className={`p-2 rounded-lg text-center flex flex-col justify-center min-h-[60px] shadow-sm border transition-transform hover:-translate-y-1 duration-300 ${league.type === 'yellow' ? 'bg-[hsl(var(--pyramid-yellow))] text-[hsl(var(--black))] border-[hsl(var(--pyramid-yellow))]' : 'bg-[hsl(var(--pyramid-white))] text-[hsl(var(--black))] border-[hsl(var(--gray))]/20'}`}>
                  <span className="font-['Bebas_Neue'] text-lg leading-tight">{league.name}</span>
                  <span className="text-[9px] uppercase font-bold opacity-70 mt-0.5">{league.label}</span>
                </div>)}
            </motion.div>

            {/* Level 5 & 6: Community Leagues */}
            <motion.div variants={itemVariants} className="relative mt-2">
              <div className="pyramid-tier-label hidden md:block">Tier 5-6</div>
              <div className="bg-[hsl(var(--pyramid-white))] text-[hsl(var(--black))] p-6 md:p-8 rounded-xl border-dashed border-2 border-[hsl(var(--gray))]/30 text-center relative overflow-hidden shadow-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[hsl(var(--light-bg))] to-transparent opacity-50"></div>
                <h4 className="text-3xl md:text-4xl m-0 text-[hsl(var(--gray))] relative z-10">32+ COMMUNITY LEAGUES</h4>
                <p className="label-text text-[hsl(var(--gray))] tracking-widest mt-2 relative z-10">
                  The recreational foundation of Chicago soccer
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Tier Descriptions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          <Card className="border-t-4 border-t-[hsl(var(--pyramid-red))] shadow-md hover:shadow-lg transition-shadow bg-[hsl(var(--true-white))]">
            <CardContent className="pt-6">
              <h4 className="text-2xl text-[hsl(var(--black))] mb-2 font-['Bebas_Neue'] tracking-wide">Tiers 1-2</h4>
              <div className="label-text text-[hsl(var(--gray))] tracking-widest mb-4 font-bold">Elite Amateur</div>
              <p className="text-[hsl(var(--gray))] text-base">
                The pinnacle of Chicago amateur soccer. The Chicago Super League (Tier 1) crowns the true city champion, drawing the best promoted teams from the SouthSide and NorthSide (Tier 2) premier leagues. Highly competitive, financially sustainable, structured clubs.
              </p>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-[hsl(var(--pyramid-green))] shadow-md hover:shadow-lg transition-shadow bg-[hsl(var(--true-white))]">
            <CardContent className="pt-6">
              <h4 className="text-2xl text-[hsl(var(--black))] mb-2 font-['Bebas_Neue'] tracking-wide">Tiers 3-4</h4>
              <div className="label-text text-[hsl(var(--gray))] tracking-widest mb-4 font-bold">Competitive Regional</div>
              <p className="text-[hsl(var(--gray))] text-base">
                Strong regional leagues like OutSouth, OutWest, and CLASA (Tier 3) serve as proving grounds. Sub-divisions (Tier 4) provide a bridge for ambitious local teams to establish operations and battle for promotion into the regional flights.
              </p>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-[hsl(var(--gray))] shadow-md hover:shadow-lg transition-shadow bg-[hsl(var(--true-white))]">
            <CardContent className="pt-6">
              <h4 className="text-2xl text-[hsl(var(--black))] mb-2 font-['Bebas_Neue'] tracking-wide">Tiers 5-6</h4>
              <div className="label-text text-[hsl(var(--gray))] tracking-widest mb-4 font-bold">Recreational / Community</div>
              <p className="text-[hsl(var(--gray))] text-base">
                The foundation. 32+ independent community and park leagues partnering with CSL to provide an entry point for new teams, weekend warriors, and grassroots talent looking to eventually climb the pyramid.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
}
export default LeagueStructure;