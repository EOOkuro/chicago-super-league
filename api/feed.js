export default async function handler(req, res) {
  const response = await fetch('https://chicagosuperleague.substack.com/feed');
  const text = await response.text();
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/xml');
  res.send(text);
}