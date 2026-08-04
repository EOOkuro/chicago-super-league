import React from 'react';

// Adjust image import paths based on your project structure
import mockup1 from '../assets/mockup1.jpg'; 
import mockup2 from '../assets/mockup2.jpg';

export default function MegaPass() {
  const handleCheckout = () => {
    // Option A: Redirect directly to your Stripe Payment Link URL
    window.location.href = 'https://buy.stripe.com/YOUR_STRIPE_PAYMENT_LINK';
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      {/* Header & Scarcity Badge */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <span style={{ 
          background: '#ff4d4d', 
          color: '#fff', 
          padding: '6px 12px', 
          borderRadius: '20px', 
          fontWeight: 'bold', 
          fontSize: '0.85rem' 
        }}>
          LIMITED TO FIRST 5 LOCAL PARTNERS
        </span>
        <h1 style={{ fontSize: '2.2rem', marginTop: '15px', marginBottom: '10px' }}>
          South Side Field Sign Megapass
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#555' }}>
          7 Months of Continuous Exposure (August – February) across Fall Outdoor & Winter Indoor Seasons.
        </p>
      </div>

      {/* Visual Mockups */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
        <img 
          src={mockup1} 
          alt="Field Sign Setup" 
          style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }} 
        />
        <img 
          src={mockup2} 
          alt="Youth Match Branding" 
          style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }} 
        />
      </div>

      {/* Value Breakdown */}
      <div style={{ background: '#f9f9f9', padding: '25px', borderRadius: '10px', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.4rem', marginTop: 0 }}>What's Included ($600 Flat Rate)</h2>
        <ul style={{ lineHeight: '1.8', color: '#333' }}>
          <li><strong>Full 7-Month Coverage:</strong> August through November (Fall Outdoor) + December through February (Winter Indoor).</li>
          <li><strong>High-Traffic Exposure:</strong> Premium A-frame sign placed front-and-center across Saturday youth matches, adult pickups (40–80 players weekly), and live-streamed matches.</li>
          <li><strong>Institutional Footprint:</strong> Reach families across Charter, Catholic, Private, Park District, and non-profit sports networks.</li>
          <li><strong>Digital Integration:</strong> 4 monthly social media tags + 2 dedicated feature posts across our channels.</li>
        </ul>
      </div>

      {/* CTA Section */}
      <div style={{ textAlign: 'center', padding: '20px', border: '2px dashed #0070f3', borderRadius: '10px' }}>
        <h3 style={{ margin: '0 0 10px 0' }}>Ready to Lock In Your Sign?</h3>
        <p style={{ color: '#666', marginBottom: '20px' }}>
          Once the 5 spots fill, Winter Indoor signage will be billed separately.
        </p>
        <button 
          onClick={handleCheckout}
          style={{
            background: '#0070f3',
            color: '#fff',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            padding: '15px 30px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(0,112,243,0.4)'
          }}
        >
          Claim 1 of 5 Spots ($600)
        </button>
      </div>
    </div>
  );
}