import React from 'react';
import { Twitch, Youtube, Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

function Footer() {
  const TikTokIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5v3a8 8 0 0 1-5-1.5z"></path>
    </svg>
  );

  return (
    <footer className="bg-[hsl(var(--black))] text-[hsl(var(--true-white))] border-t-4 border-[hsl(var(--primary))] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Socials */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[hsl(var(--primary))] flex items-center justify-center text-[hsl(var(--true-white))] font-bold font-['Bebas_Neue'] text-xl">
                CSL
              </div>
              <span className="text-2xl font-bold font-['Bebas_Neue'] tracking-wide">CHICAGO SUPER LEAGUE</span>
            </div>
            <p className="text-[hsl(var(--gray))] text-sm leading-relaxed mb-6">
              The premier competitive soccer league in Chicago, bringing together diverse neighborhoods and fostering competitive excellence.
            </p>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <a href="#" className="text-[hsl(var(--gray))] hover:text-[hsl(var(--primary))] transition-colors bg-white/5 p-2 rounded-lg" aria-label="Twitch"><Twitch className="w-5 h-5" /></a>
                <a href="#" className="text-[hsl(var(--gray))] hover:text-[hsl(var(--primary))] transition-colors bg-white/5 p-2 rounded-lg" aria-label="YouTube"><Youtube className="w-5 h-5" /></a>
              </div>
              <div className="flex items-center gap-4">
                <a href="#" className="text-[hsl(var(--gray))] hover:text-[hsl(var(--primary))] transition-colors bg-white/5 p-2 rounded-lg" aria-label="Instagram"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="text-[hsl(var(--gray))] hover:text-[hsl(var(--primary))] transition-colors bg-white/5 p-2 rounded-lg" aria-label="TikTok"><TikTokIcon className="w-5 h-5" /></a>
              </div>
              <div className="flex items-center gap-4">
                <a href="#" className="text-[hsl(var(--gray))] hover:text-[hsl(var(--primary))] transition-colors bg-white/5 p-2 rounded-lg" aria-label="Facebook"><Facebook className="w-5 h-5" /></a>
              </div>
            </div>
          </div>

          {/* League Section */}
          <div>
            <h4 className="label-text text-[hsl(var(--primary))] mb-6 text-lg">League</h4>
            <ul className="space-y-3">
              <li><Link to="/league/outsouth-league" className="text-[hsl(var(--gray))] hover:text-[hsl(var(--true-white))] transition-colors">Competitions</Link></li>
              <li><Link to="/fixtures" className="text-[hsl(var(--gray))] hover:text-[hsl(var(--true-white))] transition-colors">Fixtures</Link></li>
              <li><Link to="/results" className="text-[hsl(var(--gray))] hover:text-[hsl(var(--true-white))] transition-colors">Results</Link></li>
              <li><Link to="/teams" className="text-[hsl(var(--gray))] hover:text-[hsl(var(--true-white))] transition-colors">Teams</Link></li>
              <li><Link to="/players" className="text-[hsl(var(--gray))] hover:text-[hsl(var(--true-white))] transition-colors">Players</Link></li>
              <li><Link to="/stats" className="text-[hsl(var(--gray))] hover:text-[hsl(var(--true-white))] transition-colors">Stats</Link></li>
            </ul>
          </div>

          {/* Information Section */}
          <div>
            <h4 className="label-text text-[hsl(var(--primary))] mb-6 text-lg">Information</h4>
            <ul className="space-y-3">
              <li><Link to="/news" className="text-[hsl(var(--gray))] hover:text-[hsl(var(--true-white))] transition-colors">News</Link></li>
              <li><Link to="/about" className="text-[hsl(var(--gray))] hover:text-[hsl(var(--true-white))] transition-colors">About</Link></li>
              <li><Link to="/sponsors" className="text-[hsl(var(--gray))] hover:text-[hsl(var(--true-white))] transition-colors">Sponsors</Link></li>
              <li><Link to="/contact" className="text-[hsl(var(--gray))] hover:text-[hsl(var(--true-white))] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Community Section */}
          <div>
            <h4 className="label-text text-[hsl(var(--primary))] mb-6 text-lg">Community</h4>
            <ul className="space-y-3">
              <li><Link to="/watch" className="text-[hsl(var(--gray))] hover:text-[hsl(var(--true-white))] transition-colors">Watch</Link></li>
              <li><Link to="/youth" className="text-[hsl(var(--gray))] hover:text-[hsl(var(--true-white))] transition-colors">Youth Academy</Link></li>
              <li><a href="https://docs.google.com/forms/d/e/1FAIpQLSdYxsjYmVIhkj5YVFWAnFObplET0aFMCPta7zShoeFnx-0o3g/viewform?usp=header" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--gray))] hover:text-[hsl(var(--true-white))] transition-colors">Register Now</a></li>
              <li><span className="text-[hsl(var(--gray))]">info@chicagosuperleague.com</span></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-[hsl(var(--gray))]/30 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[hsl(var(--gray))] text-sm">
            &copy; 2026 Chicago Super League. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link to="#" className="text-[hsl(var(--gray))] hover:text-[hsl(var(--primary))] text-sm transition-colors">Privacy Policy</Link>
            <Link to="#" className="text-[hsl(var(--gray))] hover:text-[hsl(var(--primary))] text-sm transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;