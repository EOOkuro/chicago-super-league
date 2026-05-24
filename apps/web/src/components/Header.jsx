import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── League data ──────────────────────────────────────────────────────────────
const LEAGUES = [
  { name: 'OutSouth League',      status: 'active', path: '/competitions' },
  { name: 'Chicago Super League', status: 'tbd'  },
  { name: 'SouthSide League',     status: 'soon' },
  { name: 'NorthSide League',     status: 'soon' },
  { name: 'OutWest League',       status: 'soon' },
  { name: 'OutSouth North',       status: 'soon' },
  { name: 'OutSouth South',       status: 'soon' },
  { name: 'OutWest North',        status: 'soon' },
  { name: 'OutWest South',        status: 'soon' },
];

// ─── Single league row ────────────────────────────────────────────────────────
function LeagueItem({ league, onClose }) {
  const dot = (
    <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-[3px] ${
      league.status === 'active' ? 'bg-emerald-400' :
      league.status === 'tbd'    ? 'bg-red-500'     :
      'bg-gray-600'
    }`} />
  );

  if (league.status === 'active') {
    return (
      <Link
        to={league.path}
        onClick={onClose}
        className="flex items-start gap-2 py-1 nav-text text-sm text-emerald-400 hover:text-emerald-300 transition-colors leading-snug"
      >
        {dot}
        {league.name}
      </Link>
    );
  }

  if (league.status === 'tbd') {
    return (
      <div className="flex items-start gap-2 py-1 nav-text text-sm leading-snug">
        {dot}
        <span>
          <span className="text-white/70">{league.name}</span>
          {' '}
          <span className="text-red-400 font-bold text-xs">(TBD)</span>
        </span>
      </div>
    );
  }

  // Coming Soon
  return (
    <div className="flex items-start gap-2 py-1 nav-text text-sm leading-snug">
      {dot}
      <span>
        <span className="text-gray-500">{league.name}</span>
        {' '}
        <span className="text-gray-600 text-xs">(Coming Soon)</span>
      </span>
    </div>
  );
}

// ─── Column (Women / Open) ────────────────────────────────────────────────────
function CompColumn({ title, onClose }) {
  return (
    <div>
      <p className="text-[10px] font-black tracking-[0.2em] uppercase text-[hsl(var(--gray))] mb-3 pb-2 border-b border-white/10">
        {title}
      </p>
      <div className="flex flex-col gap-0.5">
        {LEAGUES.map((league, i) => (
          <LeagueItem key={i} league={league} onClose={onClose} />
        ))}
      </div>
    </div>
  );
}

// ─── Desktop competitions dropdown ────────────────────────────────────────────
function CompDropdown({ isActive }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className={`nav-text text-sm flex items-center gap-1 transition-colors ${
          isActive || open
            ? 'text-[hsl(var(--primary))] font-bold'
            : 'text-[hsl(var(--white))] hover:text-[hsl(var(--primary-light))]'
        }`}
      >
        Competitions
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[480px] bg-[hsl(var(--black))] border border-white/10 rounded-2xl shadow-2xl p-6 grid grid-cols-2 gap-6 z-50"
          >
            <CompColumn title="Women" onClose={() => setOpen(false)} />
            <CompColumn title="Open"  onClose={() => setOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
function Header() {
  const [isScrolled,     setIsScrolled]     = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [compMobileOpen, setCompMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu & sub-menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setCompMobileOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home',      path: '/' },
    { name: 'News',      path: '/news' },
    { name: 'Watch',     path: '/watch', highlight: true },
    { name: 'Stats',     path: '/stats' },
    { name: 'Youth',     path: '/youth' },
    { name: 'Players',   path: '/players' },
    { name: 'Sponsors',  path: '/sponsors' },
  ];

  const isCompActive = location.pathname === '/competitions';

  const renderDesktopLink = (link) => {
    const isActive = location.pathname === link.path;

    if (link.highlight) {
      return (
        <Link
          key={link.name}
          to={link.path}
          className={`nav-text text-sm font-bold px-4 py-2 rounded-lg transition-all duration-300 ${
            isActive
              ? 'bg-[hsl(var(--primary))] text-[hsl(var(--true-white))] shadow-lg shadow-[hsl(var(--primary))]/40'
              : 'bg-[hsl(var(--primary))]/20 text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/30'
          }`}
        >
          {link.name}
        </Link>
      );
    }

    return (
      <Link
        key={link.name}
        to={link.path}
        className={`nav-text text-sm transition-colors ${
          isActive
            ? 'text-[hsl(var(--primary))] font-bold'
            : 'text-[hsl(var(--white))] hover:text-[hsl(var(--primary-light))]'
        }`}
      >
        {link.name}
      </Link>
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[hsl(var(--black))] shadow-lg py-2' : 'bg-[hsl(var(--black))]/90 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 z-50">
            <div className="w-10 h-10 bg-[hsl(var(--primary))] rounded-lg flex items-center justify-center transform rotate-3">
              <span className="text-white font-['Bebas_Neue'] text-2xl tracking-wider">CSL</span>
            </div>
            <span className="text-[hsl(var(--true-white))] font-['Bebas_Neue'] text-2xl tracking-wide hidden sm:block">
              CHICAGO SUPER LEAGUE
            </span>
          </Link>

          {/* Desktop + Tablet Nav */}
          <nav className="hidden md:flex items-center gap-6 flex-wrap justify-end">
            {/* Competitions dropdown first */}
            <CompDropdown isActive={isCompActive} />
            {navLinks.map(renderDesktopLink)}
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-[hsl(var(--true-white))] z-50 p-2"
            onClick={() => setMobileMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-[hsl(var(--black))] border-t border-[hsl(var(--gray))]/20 shadow-xl md:hidden"
          >
            <div className="flex flex-col px-4 py-6 gap-4 max-h-[calc(100vh-120px)] overflow-y-auto">

              {/* Competitions accordion */}
              <div>
                <button
                  onClick={() => setCompMobileOpen(o => !o)}
                  className={`w-full flex justify-between items-center nav-text text-lg py-2 border-b border-[hsl(var(--gray))]/20 ${
                    isCompActive ? 'text-[hsl(var(--primary))] font-bold' : 'text-[hsl(var(--white))]'
                  }`}
                >
                  Competitions
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${compMobileOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {compMobileOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-2 gap-6 pt-4 pb-2 pl-2">
                        <CompColumn title="Women" onClose={() => setMobileMenuOpen(false)} />
                        <CompColumn title="Open"  onClose={() => setMobileMenuOpen(false)} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Other links */}
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                if (link.highlight) {
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`nav-text text-lg font-bold px-4 py-3 rounded-lg transition-all duration-300 ${
                        isActive
                          ? 'bg-[hsl(var(--primary))] text-[hsl(var(--true-white))] shadow-lg shadow-[hsl(var(--primary))]/40'
                          : 'bg-[hsl(var(--primary))]/20 text-[hsl(var(--primary))]'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                }
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`nav-text text-lg py-2 border-b border-[hsl(var(--gray))]/20 ${
                      isActive ? 'text-[hsl(var(--primary))] font-bold' : 'text-[hsl(var(--white))]'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
