import { useState, useEffect } from 'react';

export function useSubstackFeed(feedUrl = 'https://chicagosuperleague.substack.com/feed') {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.allorigins.win/get?url=${encodeURIComponent(feedUrl)}`
        );

        if (!response.ok) throw new Error('Failed to fetch RSS feed');

        const data = await response.json();
        const parser = new DOMParser();
        const xml = parser.parseFromString(data.contents, 'text/xml');
        const items = Array.from(xml.querySelectorAll('item'));

        const formattedNews = items.map((item, index) => ({
          id: item.querySelector('guid')?.textContent || String(index),
          title: item.querySelector('title')?.textContent || '',
          excerpt: item.querySelector('description')?.textContent
            .replace(/<[^>]*>?/gm, '')
            .substring(0, 150) + '...' || '',
          pubDate: item.querySelector('pubDate')?.textContent || '',
          author: item.querySelector('author')?.textContent || 'CSL Media',
          link: item.querySelector('link')?.textContent || '#'
        }));

        setNews(formattedNews);
      } catch (err) {
        console.error('Error fetching feed:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, [feedUrl]);

  return { news, loading, error };
}