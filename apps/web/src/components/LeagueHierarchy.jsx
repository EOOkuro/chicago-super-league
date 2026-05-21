import React from 'react';
import { motion } from 'framer-motion';

function LeagueHierarchy() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-[hsl(var(--light-bg))] p-6 md:p-12 rounded-3xl border border-[hsl(var(--white))]">
      <motion.div 
        className="flex flex-col gap-6 md:gap-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        
        {/* Level 1: Chicago Super League */}
        <motion.div variants={itemVariants} className="flex justify-center relative">
          <div className="pyramid-node w-full md:w-2/3 bg-[hsl(var(--pyramid-red))] text-white shadow-[0_10px_30px_rgba(230,0,0,0.2)]">
            <h3 className="text-4xl md:text-5xl lg:text-6xl tracking-wider m-0">CHICAGO SUPER LEAGUE</h3>
            <span className="pyramid-label">TBA</span>
          </div>
          {/* Connector line down */}
          <div className="hidden md:block absolute -bottom-10 left-1/2 w-0.5 h-10 bg-[hsl(var(--gray))]/30"></div>
        </motion.div>
        
        {/* Level 2: SouthSide & NorthSide */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          {/* Horizontal connector linking L2 */}
          <div className="hidden md:block absolute -top-5 left-1/4 right-1/4 h-0.5 bg-[hsl(var(--gray))]/30"></div>
          {/* Vertical lines connecting from horizontal to nodes */}
          <div className="hidden md:block absolute top-[-20px] left-1/4 w-0.5 h-5 bg-[hsl(var(--gray))]/30"></div>
          <div className="hidden md:block absolute top-[-20px] right-1/4 w-0.5 h-5 bg-[hsl(var(--gray))]/30"></div>

          <div className="pyramid-node bg-[hsl(var(--pyramid-yellow))] text-[hsl(var(--black))] shadow-[0_10px_30px_rgba(232,240,0,0.2)]">
            <h4 className="text-3xl md:text-4xl tracking-wide m-0">SouthSide League</h4>
            <span className="pyramid-label">Coming Soon</span>
          </div>
          <div className="pyramid-node bg-[hsl(var(--pyramid-yellow))] text-[hsl(var(--black))] shadow-[0_10px_30px_rgba(232,240,0,0.2)]">
            <h4 className="text-3xl md:text-4xl tracking-wide m-0">NorthSide League</h4>
            <span className="pyramid-label">Coming Soon</span>
          </div>
        </motion.div>

        {/* Level 3: OutSouth, CLASA, OutWest, Windy City */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 relative">
          <div className="pyramid-node bg-[hsl(var(--pyramid-green))] text-white shadow-[0_10px_30px_rgba(45,138,45,0.2)] border-2 border-emerald-400">
            <h5 className="text-2xl md:text-3xl tracking-wide m-0">OutSouth League</h5>
            <span className="pyramid-label text-emerald-100">Womens · Open</span>
          </div>
          <div className="pyramid-node bg-[hsl(var(--pyramid-yellow))] text-[hsl(var(--black))]">
            <h5 className="text-2xl md:text-3xl tracking-wide m-0">Partner</h5>
            <span className="pyramid-label">Exisiting Chicago League</span>
          </div>
          <div className="pyramid-node bg-[hsl(var(--pyramid-yellow))] text-[hsl(var(--black))]">
            <h5 className="text-2xl md:text-3xl tracking-wide m-0">OutWest League</h5>
            <span className="pyramid-label">Coming Soon</span>
          </div>
          <div className="pyramid-node bg-[hsl(var(--pyramid-yellow))] text-[hsl(var(--black))]">
            <h5 className="text-2xl md:text-3xl tracking-wide m-0">Partner League</h5>
            <span className="pyramid-label">Exisiting Chicago League</span>
          </div>
        </motion.div>

        {/* Level 4: Sub-Divisions */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mt-2">
          {['OutSouth North', 'OutSouth South', 'Partner', 'Partner', 'OutWest North', 'OutWest South', 'Partner', 'Partner'].map((league, i) => (
            <div key={i} className="bg-[hsl(var(--pyramid-white))] text-[hsl(var(--black))] p-3 rounded-lg text-center flex flex-col justify-center min-h-[80px] shadow-sm border border-[hsl(var(--gray))]/20">
              <span className="font-['Bebas_Neue'] text-xl leading-tight">{league}</span>
              <span className="text-[10px] uppercase font-bold text-[hsl(var(--gray))] mt-1 tracking-wider">Partner</span>
            </div>
          ))}
        </motion.div>

        {/* Level 5: Community Leagues */}
        <motion.div variants={itemVariants} className="bg-[hsl(var(--pyramid-white))] text-[hsl(var(--black))] p-6 rounded-xl border-dashed border-2 border-[hsl(var(--gray))]/30 text-center relative overflow-hidden mt-4">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[hsl(var(--light-bg))] to-transparent opacity-50"></div>
          <h4 className="text-4xl m-0 text-[hsl(var(--gray))] relative z-10">32+ COMMUNITY LEAGUES</h4>
          <p className="label-text text-[hsl(var(--gray))] tracking-widest mt-2 relative z-10">
            The foundation of Chicago soccer
          </p>
        </motion.div>

      </motion.div>
    </div>
  );
}

export default LeagueHierarchy;