const MATCH_SHEETS = [
  {
    name: 'M1 Beverly FC vs Al Farooq',
    date: 'Sunday May 17 2026',
    location: 'Jackson Park, Bob Pickens Track & Field',
    teams: ['Beverly FC', 'Al Farooq FC'],
    url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSj0B4K0bfnHC2paV8_shhLq6AE0az-7GIvGyVVjicLVRWzNMxPvyL6I7j5xJdSr71YPmo-r-abWpvv/pub?gid=0&single=true&output=csv'
  }
];

async function fetchCSV(url) {
  const res = await fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`);
  const text = await res.text();
  const lines = text.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  return lines.slice(1).map(line => {
    const vals = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
    return Object.fromEntries(headers.map((h, i) => [h, vals[i] || '']));
  });
}

export async function fetchAllMatchData() {
  const matches = [];
  for (const sheet of MATCH_SHEETS) {
    try {
      const rows = await fetchCSV(sheet.url);
      const teamGoals = {};
      for (const row of rows) {
        const team = row['Team'];
        const goals = parseInt(row['Goals']) || 0;
        if (team && team !== 'Team') {
          teamGoals[team] = (teamGoals[team] || 0) + goals;
        }
      }
      const teams = Object.keys(teamGoals);
      if (teams.length >= 2) {
        matches.push({
          id: matches.length + 1,
          date: sheet.date,
          competition: `OutSouth League — Matchday ${matches.length + 1}`,
          homeTeam: teams[0],
          awayTeam: teams[1],
          homeScore: teamGoals[teams[0]],
          awayScore: teamGoals[teams[1]],
          location: sheet.location,
          status: 'FT',
          rows
        });
      }
    } catch (err) {
      console.error(`Error fetching ${sheet.name}:`, err);
    }
  }
  return matches;
}

export function calculateStandings(matches) {
  const table = {};
  const ALL_CLUBS = [
    'Al Farooq', 'Beverly FC', 'Hunnids Athletic Club', 'Bronzeville Athletic Club',
    'Midway FC', 'Pilsen FC', 'Hyde Park Rangers FC', 'GF Chicago SN',
  ];
  ALL_CLUBS.forEach(club => {
    table[club] = { club, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0, form: [] };
  });
  for (const match of matches) {
    const home = match.homeTeam;
    const away = match.awayTeam;
    const hg = match.homeScore;
    const ag = match.awayScore;
    if (!table[home]) table[home] = { club: home, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0, form: [] };
    if (!table[away]) table[away] = { club: away, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0, form: [] };
    table[home].p++; table[away].p++;
    table[home].gf += hg; table[home].ga += ag;
    table[away].gf += ag; table[away].ga += hg;
    if (hg > ag) {
      table[home].w++; table[home].pts += 3; table[home].form.push('W');
      table[away].l++; table[away].form.push('L');
    } else if (hg < ag) {
      table[away].w++; table[away].pts += 3; table[away].form.push('W');
      table[home].l++; table[home].form.push('L');
    } else {
      table[home].d++; table[home].pts++; table[home].form.push('D');
      table[away].d++; table[away].pts++; table[away].form.push('D');
    }
  }
  return Object.values(table)
    .map(t => ({ ...t, gd: t.gf - t.ga, form: t.form.slice(-5).join(' ') || '- - - - -' }))
    .sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf)
    .map((t, i) => ({ ...t, rank: i + 1 }));
}