// ─────────────────────────────────────────────────────────────────────────────
// Google Spreadsheet config
// Each tab in this spreadsheet holds one match's player stats.
// The "TOTAL" row for each team (e.g. "Al Farooq TOTAL") lives in the
// Player column (column B) — we read Goals from that row to get the score.
// ─────────────────────────────────────────────────────────────────────────────
const SHEET_ID = '1ppu3-DNmMdgyox2MAbH7Nt2iChhbakRR_LJYeeE7h00';

function buildSheetUrl(sheetName) {
  const base = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;
  return sheetName ? `${base}&sheet=${encodeURIComponent(sheetName)}` : base;
}

// ─────────────────────────────────────────────────────────────────────────────
// Add one entry per completed match.
// sheetName must match the tab name exactly in the Google Spreadsheet.
// homeTeam / awayTeam must match the team names in the sheet TOTAL rows exactly.
// ─────────────────────────────────────────────────────────────────────────────
const MATCH_SHEETS = [
  {
    name: 'M1 Beverly FC vs Al Farooq',
    sheetName: 'M1 Beverly FC vs Al Farooq',
    date: 'Sunday May 17 2026',
    location: 'Jackson Park',
    matchday: 1,
    homeTeam: 'Al Farooq',
    awayTeam: 'Beverly FC',
  },

  {
    name: 'M6 Pilsen FC vs Al Farooq',
    sheetName: 'M6 Pilsen FC vs Al Farooq',
    date: 'Sunday May 31 2026',
    location: 'Jackson Park',
    matchday: 6,
    homeTeam: 'Al Farooq',
    awayTeam: 'Pilsen FC',
  },
  // Add future matches below as results come in:
  // {
  //   name: 'M1 Bronzeville AC vs GF Chicago SN',
  //   sheetName: 'M1 Bronzeville AC vs GF Chicago SN',
  //   date: 'Sunday May 17 2026',
  //   location: 'De La Salle',
  //   matchday: 1,
  //   homeTeam: 'Bronzeville Athletic Club',
  //   awayTeam: 'GF Chicago SN',
  // },
];

// ─────────────────────────────────────────────────────────────────────────────
// CSV fetcher — routes through /api/sheets proxy to avoid CORS
// ─────────────────────────────────────────────────────────────────────────────
async function fetchCSV(url) {
  const res = await fetch(`/api/sheets?url=${encodeURIComponent(url)}`);
  if (!res.ok) throw new Error(`Failed to fetch sheet: ${res.status}`);

  const text = await res.text();
  const lines = text.trim().split('\n').filter(l => l.trim() !== '');
  if (lines.length < 2) return [];

  const headers = lines[0]
    .split(',')
    .map(h => h.trim().replace(/^"|"$/g, ''));

  // Ensure first column has a name
  if (!headers[0]) headers[0] = 'Jersey';

  return lines.slice(1).map(line => {
    // Simple CSV split — handles quoted fields that don't contain commas
    const vals = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
    return Object.fromEntries(headers.map((h, i) => [h, vals[i] ?? '']));
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Extract goals scored by each team from a match stats sheet.
//
// Your sheet format:
//   Column B (Player): "Al Farooq TOTAL"  ← TOTAL label lives here
//   Column D (Goals):  3                  ← goals value
//
// We also fall back to checking the Team column in case the layout changes.
// ─────────────────────────────────────────────────────────────────────────────
function extractTeamGoals(rows) {
  const teamGoals = {};

  rows.forEach(row => {
    const playerCell = String(row.Player || '').trim();
    const teamCell   = String(row.Team   || '').trim();

    // Whichever column ends with "TOTAL" (case-insensitive) is our summary row
    const totalSource =
      /\bTOTAL$/i.test(playerCell) ? playerCell :
      /\bTOTAL$/i.test(teamCell)   ? teamCell   :
      null;

    if (totalSource) {
      const teamName = totalSource.replace(/\s*TOTAL$/i, '').trim();
      const goals    = parseInt(row.Goals || '0', 10);
      if (teamName) {
        teamGoals[teamName] = goals;
        console.log(`✅ TOTAL → ${teamName}: ${goals} goals`);
      }
    }
  });

  return teamGoals;
}

// ─────────────────────────────────────────────────────────────────────────────
// Public: fetch player-level goals + assists from all match sheets
// Returns an array of { player, team, jersey, goals, assists, named }
// TBD players are returned as "#6" etc. and shown with their team in the UI.
// ─────────────────────────────────────────────────────────────────────────────
export async function fetchAllPlayerStats() {
  const playerMap = {};

  for (const sheet of MATCH_SHEETS) {
    try {
      const url  = buildSheetUrl(sheet.sheetName);
      const rows = await fetchCSV(url);

      rows.forEach(row => {
        const playerCell = String(row.Player || '').trim();
        const teamCell   = String(row.Team   || '').trim();

        // Skip TOTAL rows
        if (/\bTOTAL$/i.test(playerCell) || /\bTOTAL$/i.test(teamCell)) return;
        // Skip rows with no team (spacer / empty rows)
        if (!teamCell) return;

        const goals   = parseInt(row.Goals   || '0', 10);
        const assists = parseInt(row.Assists  || '0', 10);
        const jersey  = String(row.Number || row.Jersey || '').trim();

        // Build a display name; skip rows that are completely anonymous
        const isNamed     = playerCell && playerCell.toUpperCase() !== 'TBD';
        const displayName = isNamed ? playerCell : jersey ? `#${jersey}` : null;
        if (!displayName) return;

        // Aggregate across multiple match sheets by name + team
        const key = `${displayName}||${teamCell}`;
        if (!playerMap[key]) {
          playerMap[key] = { player: displayName, team: teamCell, jersey, goals: 0, assists: 0, named: isNamed };
        }

        playerMap[key].goals   += goals;
        playerMap[key].assists += assists;
      });
    } catch (err) {
      console.error(`❌ Error fetching player stats from ${sheet.name}:`, err);
    }
  }

  return Object.values(playerMap);
}

// ─────────────────────────────────────────────────────────────────────────────
// Public: fetch all match sheets and return structured match objects
// ─────────────────────────────────────────────────────────────────────────────
export async function fetchAllMatchData() {
  const matches = [];

  for (const sheet of MATCH_SHEETS) {
    try {
      const url  = buildSheetUrl(sheet.sheetName);
      const rows = await fetchCSV(url);
      console.log(`📊 ${sheet.name} — ${rows.length} rows`);

      const teamGoals = extractTeamGoals(rows);
      console.log('📋 Goals map:', teamGoals);

      const teams = Object.keys(teamGoals);
      if (teams.length < 2) {
        console.warn(`⚠️  ${sheet.name}: found fewer than 2 team totals — skipping`);
        continue;
      }

      // Use explicit home/away if provided, else take first two teams found
      const homeTeam = sheet.homeTeam ?? teams[0];
      const awayTeam = sheet.awayTeam ?? teams[1];

      const match = {
        id:          matches.length + 1,
        date:        sheet.date,
        competition: `OutSouth League — Matchday ${sheet.matchday ?? 1}`,
        homeTeam,
        awayTeam,
        homeScore:   teamGoals[homeTeam] ?? 0,
        awayScore:   teamGoals[awayTeam] ?? 0,
        location:    sheet.location,
        status:      'FT',
      };

      console.log('✅ Match:', match);
      matches.push(match);
    } catch (err) {
      console.error(`❌ Error fetching ${sheet.name}:`, err);
    }
  }

  return matches;
}

// ─────────────────────────────────────────────────────────────────────────────
// Public: compute standings table from an array of match objects
// ─────────────────────────────────────────────────────────────────────────────
export function calculateStandings(matches) {
  const ALL_CLUBS = [
    'Al Farooq',
    'Beverly FC',
    'Hunnids Athletic Club',
    'Bronzeville Athletic Club',
    'Midway FC',
    'Pilsen FC',
    'Hyde Park Rangers FC',
    'GF Chicago SN',
  ];

  // Initialise every club at zero
  const table = {};
  ALL_CLUBS.forEach(club => {
    table[club] = { club, p:0, w:0, d:0, l:0, gf:0, ga:0, gd:0, pts:0, form:[] };
  });

  matches.forEach(match => {
    const home = String(match.homeTeam || '').trim();
    const away = String(match.awayTeam || '').trim();
    const hg   = Number(match.homeScore) || 0;
    const ag   = Number(match.awayScore) || 0;

    if (!home || !away) return;

    // Auto-create entry if a team name wasn't in ALL_CLUBS
    [home, away].forEach(team => {
      if (!table[team]) {
        table[team] = { club:team, p:0, w:0, d:0, l:0, gf:0, ga:0, gd:0, pts:0, form:[] };
      }
    });

    table[home].p  += 1;  table[away].p  += 1;
    table[home].gf += hg; table[home].ga += ag;
    table[away].gf += ag; table[away].ga += hg;

    if (hg > ag) {
      table[home].w += 1; table[home].pts += 3; table[home].form.push('W');
      table[away].l += 1;                        table[away].form.push('L');
    } else if (ag > hg) {
      table[away].w += 1; table[away].pts += 3; table[away].form.push('W');
      table[home].l += 1;                        table[home].form.push('L');
    } else {
      table[home].d += 1; table[home].pts += 1; table[home].form.push('D');
      table[away].d += 1; table[away].pts += 1; table[away].form.push('D');
    }
  });

  return Object.values(table)
    .map(team => ({
      ...team,
      gd:   team.gf - team.ga,
      form: team.form.slice(-5).join(' ') || '-',
    }))
    .sort((a, b) =>
      b.pts  - a.pts  ||
      b.gd   - a.gd   ||
      b.gf   - a.gf   ||
      a.club.localeCompare(b.club)
    )
    .map((team, i) => ({ ...team, rank: i + 1 }));
}
