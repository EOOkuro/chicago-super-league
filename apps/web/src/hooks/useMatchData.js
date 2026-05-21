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
  if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

  const text = await res.text();
  const lines = text.trim().split('\n').filter(l => l.trim() !== '');

  if (!lines.length) return [];

  const separator = lines[0].includes('\t') ? '\t' : ',';

  const rawHeaders = lines[0]
    .split(separator)
    .map(h => h.trim().replace(/^"|"$/g, ''));

  if (!rawHeaders[0]) rawHeaders[0] = 'Jersey';

  const headers = rawHeaders;

  return lines.slice(1).map(line => {
    const vals = line
      .split(separator)
      .map(v => v.trim().replace(/^"|"$/g, ''));

    return Object.fromEntries(headers.map((h, i) => [h, vals[i] || '']));
  });
}


export async function fetchAllMatchData() {
  const matches = [];

  for (const sheet of MATCH_SHEETS) {
    try {
      const rows = await fetchCSV(sheet.url);
      console.log(`📊 ${sheet.name} - Rows: ${rows.length}`);

      const teamGoals = {};

      // Strong parsing for messy CSV
      rows.forEach(row => {
        const teamCell = String(row.Team || row[2] || '').trim();   // fallback by position
        const goalsCell = String(row.Goals || row[3] || '').trim();

        if (teamCell.includes('TOTAL')) {
          let teamName = teamCell.replace(/ FC TOTAL| TOTAL/gi, '').trim();
          const goals = parseInt(goalsCell, 10) || parseInt(teamCell.match(/\d+$/)?.[0], 10) || 0;

          if (teamName) {
            teamGoals[teamName] = goals;
            console.log(`✅ TOTAL found: ${teamName} ${goals}`);
          }
        }
      });

      // Fallback: look in raw text if needed
      if (Object.keys(teamGoals).length < 2) {
        const res = await fetch(`/api/sheets?url=${encodeURIComponent(sheet.url)}`);
        const rawText = await res.text();
        
        const alMatch = rawText.match(/AL FAROOQ.*?TOTAL.*?(\d+)/i);
        const bevMatch = rawText.match(/BEVERLY.*?TOTAL.*?(\d+)/i);

        if (alMatch) teamGoals['Al Farooq'] = parseInt(alMatch[1]);
        if (bevMatch) teamGoals['Beverly FC'] = parseInt(bevMatch[1]);
      }

      console.log("✅ Final Goals:", teamGoals);

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
        rows,                    // Keep for Results page
      };

      console.log("✅ Match created:", match);
      matches.push(match);
    } catch (err) {
      console.error(`Error in ${sheet.name}:`, err);
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