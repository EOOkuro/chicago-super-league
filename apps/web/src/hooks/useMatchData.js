const MATCH_SHEETS = [
  {
    name: 'M1 Beverly FC vs Al Farooq',
    date: 'Sunday May 17 2026',
    location: 'Jackson Park, Bob Pickens Track & Field',
    url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSj0B4K0bfnHC2paV8_shhLq6AE0az-7GIvGyVVjicLVRWzNMxPvyL6I7j5xJdSr71YPmo-r-abWpvv/pub?gid=0&single=true&output=csv',
  },
];

async function fetchCSV(url) {
  const res = await fetch(`/api/sheets?url=${encodeURIComponent(url)}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch sheet: ${res.status}`);
  }

  const text = await res.text();
  const lines = text.trim().split('\n');

  if (!lines.length) return [];

  const separator = lines[0].includes('\t') ? '\t' : ',';

  const rawHeaders = lines[0]
    .split(separator)
    .map((h) => h.trim().replace(/^"|"$/g, ''));

  if (!rawHeaders[0]) rawHeaders[0] = 'Jersey';

  const headers = rawHeaders;

  return lines.slice(1).map((line) => {
    const vals = line
      .split(separator)
      .map((v) => v.trim().replace(/^"|"$/g, ''));

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
        const team = (row.Team || '').trim();
        const goals = parseInt(row.Goals, 10) || 0;

        if (team && !team.includes('TOTAL') && team !== 'Team') {
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
          rows,
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
    'Al Farooq',
    'Beverly FC',
    'Hunnids Athletic Club',
    'Bronzeville Athletic Club',
    'Midway FC',
    'Pilsen FC',
    'Hyde Park Rangers FC',
    'GF Chicago SN',
  ];

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

  matches.forEach((match) => {
    const home = match.homeTeam;
    const away = match.awayTeam;
    const hg = Number(match.homeScore) || 0;
    const ag = Number(match.awayScore) || 0;

    if (!table[home]) {
      table[home] = {
        club: home,
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
    }

    if (!table[away]) {
      table[away] = {
        club: away,
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
    }

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

  return Object.values(table)
    .map((team) => ({
      ...team,
      gd: team.gf - team.ga,
      form: team.form.slice(-5).join(' ') || '- - - - -',
    }))
    .sort(
      (a, b) =>
        b.pts - a.pts ||
        b.gd - a.gd ||
        b.gf - a.gf ||
        a.club.localeCompare(b.club)
    )
    .map((team, index) => ({
      ...team,
      rank: index + 1,
    }));
}