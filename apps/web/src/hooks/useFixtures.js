// ─────────────────────────────────────────────────────────────────────────────
// Fixture sheet config
// ─────────────────────────────────────────────────────────────────────────────
const FIXTURE_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/1PISEWaSJfoZzsIUSPLArEE3XSYje4kMq/gviz/tq?tqx=out:csv&gid=209669808';

// The first row of the CSV is a messy merged header that actually contains
// two M1 matches. We pull them out manually so nothing gets lost.
const M1_HEADER_MATCHES = [
  { home: 'Pilsen FC',               away: 'Hyde Park Rangers FC', location: 'Comed',       time: '' },
  { home: 'Bronzeville Athletic Club', away: 'GF Chicago SN',       location: 'De La Salle', time: '' },
];

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
function parseCSVLine(line) {
  const result = [];
  let cur = '';
  let inQ = false;
  for (const ch of line) {
    if (ch === '"') { inQ = !inQ; }
    else if (ch === ',' && !inQ) { result.push(cur.trim()); cur = ''; }
    else { cur += ch; }
  }
  result.push(cur.trim());
  return result;
}

function parseDateStr(str) {
  if (!str || str === 'TBD' || str.toLowerCase().includes('date')) return null;
  // MM/DD/YYYY
  const [m, d, y] = str.split('/').map(Number);
  if (!m || !d || !y) return null;
  return new Date(y, m - 1, d);
}

function formatTime(raw) {
  if (!raw || raw === 'TBD') return '';
  const match = raw.match(/(\d+:\d+)(?::\d+)?\s*(AM|PM)/i);
  return match ? `${match[1]} ${match[2].toUpperCase()}` : raw;
}

function clean(str) {
  return (str || '').replace(/\s+/g, ' ').trim();
}

// ─────────────────────────────────────────────────────────────────────────────
// Core fetch + parse
// ─────────────────────────────────────────────────────────────────────────────
export async function fetchFixtures() {
  const res = await fetch(`/api/sheets?url=${encodeURIComponent(FIXTURE_SHEET_URL)}`);
  if (!res.ok) throw new Error(`Fixtures sheet returned ${res.status}`);
  const text = await res.text();

  const lines = text.trim().split('\n').filter(l => l.trim());
  const map   = {}; // mdId → { date: Date|null, matches: [] }

  lines.forEach((line, idx) => {
    if (idx === 0) return; // skip header row

    const cols = parseCSVLine(line);
    const md   = clean(cols[1]);
    if (!/^M\d+$/.test(md)) return; // skip non-match rows (team list, etc.)

    const dateStr  = clean(cols[2]);
    const home     = clean(cols[4]);
    const away     = clean(cols[6]);
    const locMain  = clean(cols[7]);
    const time     = clean(cols[8]);
    const locNotes = clean(cols[9]);

    // Skip rows that are clearly column headers embedded as data
    if (!home || !away || home.toLowerCase().includes('home team')) return;

    if (!map[md]) map[md] = { date: null, matches: [] };

    // Take the first non-TBD date we see for this matchday
    const dateObj = parseDateStr(dateStr);
    if (dateObj && !map[md].date) map[md].date = dateObj;

    // Prefer main location column; fall back to Notes column
    const location = (locMain && locMain !== 'TBD') ? locMain : (locNotes || '');

    map[md].matches.push({
      home,
      away,
      location,
      time: formatTime(time),
    });
  });

  // Prepend the two M1 matches that were buried in the header row
  if (map['M1']) {
    map['M1'].matches = [...M1_HEADER_MATCHES, ...map['M1'].matches];
    if (!map['M1'].date) map['M1'].date = new Date(2025, 4, 11); // May 11 2025 fallback
  }

  // Determine played/upcoming relative to today (browser clock)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return Object.keys(map)
    .sort() // M1 → M7
    .map(mdId => {
      const { date, matches } = map[mdId];
      const played = date ? date < today : false;
      const num    = mdId.replace('M', '');
      return {
        id:      mdId,
        title:   `MATCH DAY ${num}`,
        dateObj: date,
        // Human-readable date string
        date: date
          ? date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
          : 'TBD',
        played,
        matches,
      };
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// React hook
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useEffect } from 'react';

export function useFixtures() {
  const [matchdays, setMatchdays] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchFixtures()
      .then(data => { if (!cancelled) { setMatchdays(data); setLoading(false); } })
      .catch(err  => { if (!cancelled) { setError(err.message); setLoading(false); } });
    return () => { cancelled = true; };
  }, []);

  const upcoming = matchdays.filter(md => !md.played);
  const played   = matchdays.filter(md =>  md.played);
  // The next fixture is the first upcoming matchday
  const next     = upcoming[0] ?? null;

  return { matchdays, upcoming, played, next, loading, error };
}
