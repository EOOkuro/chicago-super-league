import { useState, useEffect } from 'react';

export function useNotionPlayers() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/notion')
      .then(res => {
        if (!res.ok) return res.json().then(e => Promise.reject(e));
        return res.json();
      })
      .then(data => {
        if (!cancelled) {
          setPlayers(data.players ?? []);
          setLoading(false);
        }
      })
      .catch(err => {
        if (!cancelled) {
          console.error('useNotionPlayers error:', err);
          setError(err?.error ?? 'Failed to load player data');
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, []);

  return { players, loading, error };
}
