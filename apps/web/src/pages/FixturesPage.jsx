import React, { useState, useEffect } from 'react';

function Fixtures() {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);

  // Live published CSV URL
  const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vROyb1X7T9UJesrHNPT2fmOtGodD-a0Tttc2qv89i1-ieO0OWjr6bh7XDZzoJyO5Q/pub?output=csv";

  useEffect(() => {
    async function getLeagueData() {
      try {
        const response = await fetch(CSV_URL);
        const data = await response.text();
        
        const rows = data.split('\n').map(row => row.trim()).filter(row => row.length > 0);
        if (rows.length <= 1) {
          setLoading(false);
          return;
        }

        // Standardize headers by removing extra spaces and special characters for stable matching
        const headers = rows[0].split(',').map(h => h.replace(/^["']|["']$/g, '').trim());

        const parsedMatches = rows.slice(1).map(row => {
          const values = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v => v.replace(/^["']|["']$/g, '').trim());
          return headers.reduce((acc, header, index) => {
            acc[header] = values[index] || '';
            return acc;
          }, {});
        });

        // Filter for matches that contain an actual team name
        const validMatches = parsedMatches.filter(m => m['Home Team'] || m['Away Team']);

        setFixtures(validMatches);
        setLoading(false);
      } catch (err) {
        console.error("Failed to parse fixture sheet:", err);
        setLoading(false);
      }
    }
    getLeagueData();
  }, []);

  if (loading) {
    return (
      <div className="text-white text-center py-10 font-mono text-xs uppercase tracking-widest">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-black py-16 px-4 md:px-8 text-white min-h-screen">
      <div className="max-w-5xl mx-auto">
        
        {/* UNTOUCHED HEADER STYLE */}
        <div className="border-b-2 border-white pb-6 mb-10">
          <span className="font-mono text-xs tracking-[0.3em] text-white/50 uppercase block mb-2">
            SCHEDULE & RESULTS
          </span>
          <h2 className="font-['Bebas_Neue'] text-5xl md:text-7xl tracking-wide leading-none">
            FIXTURES
          </h2>
        </div>

        {/* CONTAINER AND LOOP MATCHING YOUR EXACT HEADERS */}
        {fixtures.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-lg">
            <p className="font-mono text-sm text-white/40">
              No match fixtures scheduled for this selection.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {fixtures.map((match, i) => {
              // Direct mappings to your columns:
              const home = match['Home Team'];
              const away = match['Away Team'];
              const date = match['#Date'] || match['Date']; // Fallback safeguard for the hash symbol
              const day = match['Day'];
              const location = match['Field / Location'];
              const time = match['Time'];
              const notes = match['Notes'];
              const status = match['Status'];

              return (
                <div 
                  key={i} 
                  className="bg-[#0e0e0e] border border-white/10 rounded-lg p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6"
                >
                  <div className="flex flex-col justify-center min-w-[140px]">
                    {status && (
                      <span className="bg-white/10 text-white/80 text-[10px] font-mono tracking-widest uppercase px-2 py-1 rounded w-fit mb-2">
                        {status}
                      </span>
                    )}
                    <p className="font-mono text-sm font-semibold tracking-wide">
                      {date}{day ? `, ${day}` : ''}
                    </p>
                    <p className="font-mono text-xs text-white/50 mt-0.5">{time || 'TBD'}</p>
                  </div>

                  <div className="flex-1 flex items-center justify-start md:justify-center gap-4 py-2 border-t border-b border-white/5 md:border-none">
                    <div className="font-['Bebas_Neue'] text-2xl md:text-4xl tracking-wide uppercase text-white">
                      {home}
                    </div>
                    <span className="text-xs font-mono px-2 py-1 bg-white text-black font-bold uppercase rounded-sm shrink-0">
                      VS
                    </span>
                    <div className="font-['Bebas_Neue'] text-2xl md:text-4xl tracking-wide uppercase text-white">
                      {away}
                    </div>
                  </div>

                  <div className="flex flex-col items-start md:items-end justify-center min-w-[160px]">
                    <span className="font-mono text-xs text-white/40 uppercase tracking-wider block">Location</span>
                    <p className="font-sans text-sm font-medium text-white/90 text-left md:text-right mt-0.5">
                      {location || 'Field TBA'}
                    </p>
                    {notes && <p className="font-sans text-[11px] text-white/40 mt-1">{notes}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Fixtures;