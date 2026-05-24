// /api/notion.js — server-side proxy for the Notion API
// The NOTION_TOKEN is read from environment variables and never sent to the browser.

const DATABASE_ID = 'e17bfd83aa3f47e9b389911650484105';
const NOTION_VERSION = '2022-06-28';

// ─── extract a plain value from any Notion property type ─────────────────────
function extractValue(prop) {
  if (!prop) return null;
  switch (prop.type) {
    case 'title':
      return prop.title.map(t => t.plain_text).join('').trim() || null;
    case 'rich_text':
      return prop.rich_text.map(t => t.plain_text).join('').trim() || null;
    case 'select':
      return prop.select?.name ?? null;
    case 'multi_select':
      return prop.multi_select.map(s => s.name);
    case 'number':
      return prop.number ?? null;
    case 'checkbox':
      return prop.checkbox;
    case 'url':
      return prop.url ?? null;
    case 'email':
      return prop.email ?? null;
    case 'phone_number':
      return prop.phone_number ?? null;
    case 'formula': {
      const f = prop.formula;
      if (f.type === 'string')  return f.string  ?? null;
      if (f.type === 'number')  return f.number  ?? null;
      if (f.type === 'boolean') return f.boolean ?? null;
      return null;
    }
    case 'date':
      return prop.date?.start ?? null;
    default:
      return null;
  }
}

// ─── get a field by trying multiple possible column name variants ─────────────
function get(properties, variants) {
  for (const variant of variants) {
    // Exact match
    if (properties[variant] !== undefined) return extractValue(properties[variant]);
    // Case-insensitive match
    const key = Object.keys(properties).find(
      k => k.toLowerCase() === variant.toLowerCase()
    );
    if (key) return extractValue(properties[key]);
  }
  return null;
}

// ─── map one Notion page → one player object ──────────────────────────────────
function mapPage(page) {
  const p = page.properties;

  const name   = get(p, ['Name', 'Player', 'Player Name', 'Full Name']);
  const number = get(p, ['Number', 'Jersey', 'Jersey #', '#', 'Kit Number', 'Jersey Number']);
  const goals  = get(p, ['Goals', 'G', 'Goal']);
  const assists= get(p, ['Assists', 'A', 'Ast', 'Assist']);
  const apps   = get(p, ['Appearances', 'Apps', 'Played', 'Matches']);
  const yellow = get(p, ['Yellow Cards', 'Yellows', 'Yellow', 'YC']);
  const red    = get(p, ['Red Cards', 'Reds', 'Red', 'RC']);

  const goalsNum  = Number(goals)  || 0;
  const appsNum   = Number(apps)   || 0;

  return {
    id:          page.id,
    name:        name || 'Unknown',
    club:        get(p, ['Club', 'Team', 'Squad', 'Club Name', 'Team Name']) || '',
    position:    get(p, ['Position', 'Pos', 'Role']) || '',
    number:      number != null ? String(number) : '',
    status:      get(p, ['Status', 'Player Status', 'Availability']) || 'Active',
    nationality: get(p, ['Nationality', 'Country', 'Flag', 'Nation']) || '',
    division:    get(p, ['Division', 'Div', 'League Division']) || 'Open',
    league:      get(p, ['League', 'Competition', 'League Name']) || 'OutSouth League',
    photo:       get(p, ['Photo', 'Image', 'Avatar', 'Picture', 'Headshot']) || null,
    stats: {
      goals:       goalsNum,
      assists:     Number(assists) || 0,
      appearances: appsNum,
      yellow:      Number(yellow)  || 0,
      red:         Number(red)     || 0,
      gPerGame:    appsNum > 0 ? Math.round((goalsNum / appsNum) * 100) / 100 : 0,
    },
  };
}

// ─── handler ──────────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  const token = process.env.NOTION_TOKEN;

  if (!token) {
    return res.status(500).json({
      error: 'NOTION_TOKEN environment variable is not set.',
      hint:  'Add it to .env.local for local dev, or to your hosting platform env vars for production.',
    });
  }

  try {
    // Query all pages in the database (up to 100; add pagination if needed)
    const response = await fetch(
      `https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
      {
        method: 'POST',
        headers: {
          Authorization:    `Bearer ${token}`,
          'Content-Type':   'application/json',
          'Notion-Version': NOTION_VERSION,
        },
        body: JSON.stringify({
          sorts: [{ property: 'Name', direction: 'ascending' }],
          page_size: 100,
        }),
      }
    );

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      console.error('Notion API error:', err);
      return res.status(response.status).json({ error: err.message ?? 'Notion API error', details: err });
    }

    const data    = await response.json();
    const players = data.results
      .filter(page => !page.archived)
      .map(mapPage)
      .filter(p => p.name && p.name !== 'Unknown');

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    res.json({ players });

  } catch (err) {
    console.error('notion handler error:', err);
    res.status(500).json({ error: err.message });
  }
}
