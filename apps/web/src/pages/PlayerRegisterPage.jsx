import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';

// Player registration lives in FedOS. This page just shows that form inside the site; every sign-up lands in the
// chosen league's own list in FedOS, and the parent can sign in there with the same email to update their details.
const FEDOS_APP = import.meta.env.VITE_FEDOS_APP || 'https://thefedos.com';

const LEAGUES = [
  { slug: 'outsouth-league', name: 'OutSouth League' },
];

export default function PlayerRegisterPage() {
  const params = new URLSearchParams(window.location.search);
  const first = LEAGUES.find((l) => l.slug === params.get('league')) || LEAGUES[0];
  const [slug, setSlug] = useState(first.slug);
  const [height, setHeight] = useState(760);
  const frame = useRef(null);

  useEffect(() => {
    const onMsg = (e) => {
      if (e.origin !== FEDOS_APP || e.source !== frame.current?.contentWindow || !e.data) return;
      if (e.data.type === 'fedos:height') setHeight(e.data.height);
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <Helmet><title>Player registration</title></Helmet>
      <h1 className="text-4xl md:text-5xl uppercase tracking-wide mb-2">Player registration</h1>
      <p className="mb-6">Youth and adult players. Register once; you can change your details later by creating a free account with the same email.</p>
      {LEAGUES.length > 1 && (
        <label className="block mb-4 text-sm font-bold">
          League
          <select
            value={slug}
            onChange={(e) => { setSlug(e.target.value); setHeight(760); }}
            className="block w-full h-10 mt-1 rounded-md border border-input px-3 text-sm bg-white"
          >
            {LEAGUES.map((l) => <option key={l.slug} value={l.slug}>{l.name}</option>)}
          </select>
        </label>
      )}
      <iframe
        ref={frame}
        key={slug}
        title="Player registration"
        src={`${FEDOS_APP}/embed/slug/${slug}`}
        style={{ width: '100%', height, border: 0, display: 'block' }}
      />
    </div>
  );
}
