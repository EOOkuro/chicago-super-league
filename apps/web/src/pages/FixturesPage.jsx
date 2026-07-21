import React, { useState, useEffect } from 'react';

function Fixtures() {
  const [fixtures, setFixtures] = useState([]);
  const [filteredFixtures, setFilteredFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDivision, setSelectedDivision] = useState('All');

  // Your live published CSV endpoint
  const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vROyb1X7T9UJesrHNPT2fmOtGodD-a0Tttc2qv89i1-ieO0OWjr6bh7XDZzoJyO5Q/pub?output=csv";

  useEffect(() => {
    async function getLeagueData() {
      try {
        const response = await fetch(CSV_URL);
        const data = await response.text();
        
        // Split by lines, filtering out completely blank rows
        const rows = data.split('\n').map(row => row.trim()).filter(row => row.length > 0);
        if (rows.length <= 1) {
          setLoading(false);
          return;
        }

        // Clean headers by stripping quotes and spaces
        const headers = rows[0].split(',').map(h => h.replace(/^["']|["']$/g, '').trim());

        const parsedMatches = rows.slice(1).map(row => {
          // Use regex split to handle fields that might contain commas enclosed in quotes safely
          const values = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v => v.replace(/^["']|["']$/g, '').trim());
          
          return headers.reduce((acc, header, index) => {
            acc[header] = values[index] || '';
            return acc;
          }, {});
        });

        // Ensure we only process matches that have a valid date or team set
        const validMatches = parsedMatches.filter(m => m.Date || m.HomeTeam || m.AwayTeam);

        setFixtures(validMatches);
        setFilteredFixtures(validMatches);
        setLoading(false);
      } catch (err) {
        console.error("Failed to parse fixture sheet:", err);
        setLoading(false);
      }
    }
    getLeagueData();
  }, []);

  // Handle Division Filters dynamically
  useEffect(() => {
    if (selectedDivision === 'All') {
      setFilteredFixtures(fixtures);
    } else {
      setFilteredFixtures(fixtures.filter(f => f.Division === selectedDivision));
    }
  }, [selectedDivision, fixtures]);

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center text-white font-mono text-sm uppercase tracking-widest">
        Loading match schedules...
      </div>
    );
  }

  // Gather unique divisions present in your sheet for the toggle buttons
  const divisions = ['All', ...new Set(fixtures.map(f => f.Division).filter(Boolean))];

  return (
    <div className="bg-black py-16 px-4 md:px-8 text-white min-h-screen">
      <div className="max-w-5xl mx-auto">
        
        {/* Header layout */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-2 border-white pb-6 mb-10 gap-4">
          <div>
            <span className="font-mono text-xs tracking-[0.3em] text-white/50 uppercase block mb-2">Schedule & Results</span>
            <h2 className="font-['Bebas_Neue'] text-5xl md:text-7xl tracking-wide leading-none">FIXTURES</h2>
          </div>
          
          {/* Dynamic Division Filters */}
          {fixtures.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {divisions.map(div => (
                <button
                  key={div}
                  onClick={() => setSelectedDivision(div)}
                  className={`px-4 py-2 text-xs font-mono uppercase tracking-wider border transition-all ${
                    selectedDivision === div 
                      ? 'bg-white text-black border-white font-bold' 
                      : 'bg-transparent text-white border-white/20 hover:border-white'
                  }`}
                >
                  {div}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Empty State */}
        {filteredFixtures.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-lg">
            <p className="font-mono text-sm text-white/40 mb-4">No match fixtures scheduled for this selection.</p>
            {selectedDivision !== 'All' && (
              <button 
                onClick={() => setSelectedDivision('All')}
                className="text-xs font-mono uppercase underline hover:text-[hsl(var(--primary-light))]"
              >
                Reset Filters
              </button>
            )}
          </div>
        ) : (
          /* Match List Grid Layout */
          <div className="space-y-4">
            {filteredFixtures.map((match, i) => (
              <div 
                key={i} 
                className="bg-[#0e0e0e] border border-white/10 rounded-lg p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 transition-all hover:border-white/30"
              >
                {/* Meta details */}
                <div className="flex flex-col justify-center min-w-[140px]">
                  <span className="bg-white/10 text-white/80 text-[10px] font-mono tracking-widest uppercase px-2 py-1 rounded w-fit mb-2">
                    {match.Division || 'Open Div'}
                  </span>
                  <p className="font-mono text-sm font-semibold tracking-wide">{match.Date}</p>
                  <p className="font-mono text-xs text-white/50 mt-0.5">{match.Time || 'TBD'}</p>
                </div>

                {/* Matchup Centerboard */}
                <div className="flex-1 flex items-center justify-start md:justify-center gap-4 py-2 border-t border-b border-white/5 md:border-none">
                  <div className="font-['Bebas_Neue'] text-2xl md:text-4xl tracking-wide uppercase text-white">
                    {match.HomeTeam}
                  </div>
                  <span className="text-xs font-mono px-2 py-1 bg-white text-black font-bold uppercase rounded-sm shrink-0">
                    VS
                  </span>
                  <div className="font-['Bebas_Neue'] text-2xl md:text-4xl tracking-wide uppercase text-white">
                    {match.AwayTeam}
                  </div>
                </div>

                {/* Venue details */}
                <div className="flex flex-col items-start md:items-end justify-center min-w-[160px]">
                  <span className="font-mono text-xs text-white/40 uppercase tracking-wider block">Location</span>
                  <p className="font-sans text-sm font-medium text-white/90 text-left md:text-right mt-0.5">
                    {match.Location || 'Field TBA'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Fixtures;