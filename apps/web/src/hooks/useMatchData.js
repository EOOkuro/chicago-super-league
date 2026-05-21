const MATCH_SHEETS = [
  {
    name: 'M1 Beverly FC vs Al Farooq',
    date: 'Sunday May 17 2026',
    location: 'Jackson Park, Bob Pickens Track & Field',
    url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSj0B4K0bfnHC2paV8_shhLq6AE0az-7GIvGyVVjicLVRWzNMxPvyL6I7j5xJdSr71YPmo-r-abWpvv/pub?gid=0&single=true&output=csv',
    matchday: 1,
    homeTeam: 'Al Farooq',
    awayTeam: 'Beverly FC',
  },
];

async function fetchCSV(url) {
  const res = await fetch(`/api/sheets?url=${encodeURIComponent(url)}`);
  if (!res.ok) throw new Error(`Failed to fetch sheet: ${res.status}`);

  const text = await res.text();
  const lines = text.trim().split('\n').filter(l => l.trim() !== '');

  const separator = lines[0].includes('\t') ? '\t' : ',';

  const headers = lines[0]
    .split(separator)
    .map(h => h.trim().replace(/^"|"$/g, ''));

  if (!headers[0]) headers[0] = 'Jersey';

  return lines.slice(1).map(line => {
    const vals = line.split(separator).map(v => v.trim().replace(/^"|"$/g, ''));
    return Object.fromEntries(headers.map((h, i) => [h, vals[i] || '']));
  });
}


export async function fetchAllMatchData() {
  const matches = [];

  for (const sheet of MATCH_SHEETS) {
    try {
      const rows = await fetchCSV(sheet.url);
      console.log(`📊 ${sheet.name} - Rows fetched: ${rows.length}`);

      const teamGoals = {};

      // Extract goals from TOTAL rows
      rows.forEach(row => {
        const teamCell = String(row.Team || '').trim().toUpperCase();
        
        if (teamCell.includes('TOTAL')) {
          let teamName = String(row.Team || '')
            .replace(/ FC TOTAL| TOTAL/gi, '')
            .trim();

          const goals = parseInt(row.Goals, 10) || 0;

          if (teamName) {
            teamGoals[teamName] = goals;
            console.log(`✅ TOTAL detected: ${teamName} = ${goals} goals`);
          }
        }
      });

      console.log("✅ Extracted goals:", teamGoals);

      const match = {
        id: matches.length + 1,
        date: sheet.date,
        competition: `OutSouth League — Matchday ${sheet.matchday || 1}`,
        homeTeam: sheet.homeTeam,
        awayTeam: sheet.awayTeam,
        homeScore: teamGoals[sheet.homeTeam] || 0,
        awayScore: teamGoals[sheet.awayTeam] || 0,
        location: sheet.location,
        status: 'FT',
        rows: rows,                    // Keep full rows for Results
      };

      console.log("✅ Match created successfully");
      matches.push(match);
    } catch (err) {
      console.error(`Error fetching ${sheet.name}:`, err);
    }
  }

  return matches;
}

export function calculateStandings(matches) {
  const table = {};

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

  // Initialize all clubs
  ALL_CLUBS.forEach((club) => {
    table[club] = {
      club,
      p: 0,
      w: 0,
      d: 0,
      l: 0,
      gf: 0,
      ga: 0,
      gd: 0,
      pts: 0,
      form: [],
    };
  });

  console.log("📊 Calculating standings for", matches.length, "matches");

  matches.forEach((match, i) => {
    const home = String(match.homeTeam || '').trim();
    const away = String(match.awayTeam || '').trim();
    const hg = Number(match.homeScore) || 0;
    const ag = Number(match.awayScore) || 0;

    console.log(`Match ${i+1}: ${home} ${hg} - ${ag} ${away}`);

    if (!home || !away) return;

    // Ensure both teams exist in table
    [home, away].forEach(team => {
      if (!table[team]) {
        table[team] = {
          club: team,
          p: 0, w: 0, d: 0, l: 0,
          gf: 0, ga: 0, gd: 0, pts: 0,
          form: [],
        };
      }
    });

    table[home].p += 1;
    table[away].p += 1;

    table[home].gf += hg;
    table[home].ga += ag;
    table[away].gf += ag;
    table[away].ga += hg;

    if (hg > ag) {
      table[home].w += 1;
      table[home].pts += 3;
      table[home].form.push('W');
      table[away].l += 1;
      table[away].form.push('L');
    } else if (ag > hg) {
      table[away].w += 1;
      table[away].pts += 3;
      table[away].form.push('W');
      table[home].l += 1;
      table[home].form.push('L');
    } else {
      table[home].d += 1;
      table[away].d += 1;
      table[home].pts += 1;
      table[away].pts += 1;
      table[home].form.push('D');
      table[away].form.push('D');
    }
  });

  const finalTable = Object.values(table)
    .map((team) => ({
      ...team,
      gd: team.gf - team.ga,
      form: team.form.slice(-5).join(' ') || '- - - - -',
    }))
    .sort((a, b) => 
      b.pts - a.pts ||
      b.gd - a.gd ||
      b.gf - a.gf ||
      a.club.localeCompare(b.club)
    )
    .map((team, index) => ({
      ...team,
      rank: index + 1,
    }));

  console.log("✅ Final Standings:", finalTable);
  return finalTable;
}