const MATCH_SHEETS = [
  {
    name: 'M1 Beverly FC vs Al Farooq',
    date: 'Sunday May 17 2026',
    location: 'Jackson Park, Bob Pickens Track & Field',
    url: 'https://docs.google.com/...your-url...',
    matchday: 1,
    homeTeam: 'Al Farooq',
    awayTeam: 'Beverly FC',
  },
];

async function fetchCSV(url) {
  const res = await fetch(`/api/sheets?url=${encodeURIComponent(url)}`);
  if (!res.ok) throw new Error(`Failed to fetch sheet: ${res.status}`);

  const text = await res.text();
  const lines = text.trim().split('\n').filter(line => line.trim() !== '');

  if (!lines.length) return [];

  // More robust line splitting - handle missing commas
  const parseRow = (line) => {
    // Try normal split first
    let values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));

    // If it looks smashed together, try basic regex split on numbers + text
    if (values.length < 5) {
      values = line.match(/(\d+|[A-Za-z\s]+(?: FC TOTAL)?|[A-Za-z0-9\s]+)/g) || [];
    }

    return values;
  };

  const rows = [];

  for (let i = 1; i < lines.length; i++) {   // skip header
    const values = parseRow(lines[i]);
    const row = {};

    // Map known columns by position or content
    if (values.length > 2) {
      row.Number = values[0] || '';
      row.Player = values[1] || '';
      row.Team   = values[2] || '';
      row.Goals  = values[3] || '';
    }

    // Fallback: search for TOTAL lines
    if (lines[i].includes('TOTAL')) {
      const totalMatch = lines[i].match(/(.*?) TOTAL.*?(\d+)/i);
      if (totalMatch) {
        row.Team = totalMatch[1].trim();
        row.Goals = totalMatch[2];
      }
    }

    rows.push(row);
  }

  console.log("Parsed rows sample:", rows.slice(0, 8));
  return rows;
}


export async function fetchAllMatchData() {
  const matches = [];

  for (const sheet of MATCH_SHEETS) {
    try {
      const rows = await fetchCSV(sheet.url);
      console.log(`📊 ${sheet.name} - Total rows:`, rows.length);

      const teamGoals = {};

      rows.forEach(row => {
        const teamCell = (row.Team || '').trim();
        const goalsCell = (row.Goals || '').trim();

        let teamName = '';
        let goals = 0;

        // Handle TOTAL rows
        if (teamCell.includes('TOTAL')) {
          teamName = teamCell.replace(/ FC TOTAL| TOTAL/gi, '').trim();
          goals = parseInt(goalsCell, 10) || 0;
        } 
        // Handle normal player rows
        else if (teamCell && teamCell !== 'Team') {
          teamName = teamCell;
          goals = parseInt(goalsCell, 10) || 0;
        }

        if (teamName && goals >= 0) {
          teamGoals[teamName] = (teamGoals[teamName] || 0) + goals;
        }
      });

      console.log("✅ Team Goals Detected:", teamGoals);

      // Use explicit config first, fallback to detected teams
      let homeTeam = sheet.homeTeam;
      let awayTeam = sheet.awayTeam;

      if (!homeTeam || !awayTeam) {
        const detectedTeams = Object.keys(teamGoals);
        homeTeam = detectedTeams[0];
        awayTeam = detectedTeams[1];
      }

      if (homeTeam && awayTeam) {
        const match = {
          id: matches.length + 1,
          date: sheet.date,
          competition: `OutSouth League — Matchday ${sheet.matchday || matches.length + 1}`,
          homeTeam,
          awayTeam,
          homeScore: teamGoals[homeTeam] || 0,
          awayScore: teamGoals[awayTeam] || 0,
          location: sheet.location,
          status: 'FT',
          rows,
        };

        console.log("✅ Match Created:", match);
        matches.push(match);
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