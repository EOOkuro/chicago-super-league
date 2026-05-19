import { useState, useEffect } from 'react';

const MOCK_NEWS = [
  {
    id: '1',
    title: 'Chicago Super League Announces Inaugural Season Kickoff',
    excerpt: 'The wait is over. The Chicago Super League officially kicks off its first season this May, bringing top-tier amateur soccer to the city.',
    pubDate: '2025-04-15 10:00:00',
    author: 'CSL Media',
    link: '#'
  },
  {
    id: '2',
    title: 'New Clubs Join the OutSouth Division',
    excerpt: 'Four new historic clubs from the South Side have officially registered for the upcoming season, expanding the competitive landscape.',
    pubDate: '2025-04-10 14:30:00',
    author: 'CSL Media',
    link: '#'
  },
  {
    id: '3',
    title: 'Partnership Announced with Local Youth Academies',
    excerpt: 'In a move to build the future of Chicago soccer, CSL has partnered with three major youth academies to create a direct pathway to the senior leagues.',
    pubDate: '2025-04-05 09:15:00',
    author: 'CSL Media',
    link: '#'
  },
  {
    id: '4',
    title: 'Pre-season Tournament Results and Analysis',
    excerpt: 'A deep dive into the pre-season friendlies. Who looks ready for the title charge, and who needs more time on the training ground?',
    pubDate: '2025-03-28 11:45:00',
    author: 'CSL Media',
    link: '#'
  },
  {
    id: '5',
    title: 'Stadium Upgrades Completed at Jackson Park',
    excerpt: 'The historic Jackson Park turf has received significant upgrades ahead of the season opener, including new seating and improved lighting.',
    pubDate: '2025-03-20 16:20:00',
    author: 'CSL Media',
    link: '#'
  }
];

export function useSubstackFeed(feedUrl = 'https://chicagosuperleague.substack.com/feed') {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        setLoading(true);
        // Using rss2json as a public CORS proxy for RSS feeds
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(feedUrl)}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch RSS feed');
        }
        
        const data = await response.json();
        
        if (data.status === 'ok' && data.items && data.items.length > 0) {
          const formattedNews = data.items.map((item, index) => ({
            id: item.guid || String(index),
            title: item.title,
            // Strip HTML tags for excerpt
            excerpt: item.description.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...',
            pubDate: item.pubDate,
            author: item.author || 'CSL Media',
            link: item.link
          }));
          setNews(formattedNews);
        } else {
          // Fallback to mock data if feed is empty or invalid
          setNews(MOCK_NEWS);
        }
      } catch (err) {
        console.error('Error fetching Substack feed:', err);
        setError(err.message);
        // Fallback to mock data on error to ensure UI remains functional
        setNews(MOCK_NEWS);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, [feedUrl]);

  return { news, loading, error };
}