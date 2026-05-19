import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Competitions', path: '/competitions' },
    { name: 'News', path: '/news' },
    { name: 'Watch', path: '/watch', highlight: true },
    { name: 'Stats', path: '/stats' },
    { name: 'Youth', path: '/youth' },
    { name: 'Players', path: '/players' },
    { name: 'Sponsors', path: '/sponsors' },
  ];

  const renderNavLink = (link, isMobile = false) => {
    const isActive = location.pathname === link.path;
    const isWatch = link.highlight;

    if (isWatch) {
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

    if (isMobile) {
      return (
        <Link 
          key={link.name} 
          to={link.path}
          className={`nav-text text-lg py-2 border-b border-[hsl(var(--gray))]/20 ${
            isActive 
              ? 'text-[hsl(var(--primary))] font-bold' 
              : 'text-[hsl(var(--white))]'
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

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => renderNavLink(link, false))}
          </nav>

          {/* Tablet Nav (md:flex lg:hidden) */}
          <nav className="hidden md:flex lg:hidden items-center gap-4 flex-wrap justify-end">
            {navLinks.map((link) => renderNavLink(link, false))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-[hsl(var(--true-white))] z-50 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                const isWatch = link.highlight;

                if (isWatch) {
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
                      isActive 
                        ? 'text-[hsl(var(--primary))] font-bold' 
                        : 'text-[hsl(var(--white))]'
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