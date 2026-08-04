import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Replace with your actual Stripe Publishable Key (pk_live_... or pk_test_...)
const stripePromise = loadStripe('pk_test_51Px...YOUR_PUBLISHABLE_KEY');

const MOCKUP_IMG_1 = "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80";
const MOCKUP_IMG_2 = "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=800&q=80";

// Inner Form Component
function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      // 1. Request Payment Intent from Backend
      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessName, email }),
      });

      const { clientSecret, error } = await res.json();

      if (error) {
        throw new Error(error);
      }

      // 2. Confirm Card Payment with Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: businessName,
            email: email,
          },
        },
      });

      if (result.error) {
        setErrorMsg(result.error.message);
        setLoading(false);
      } else if (result.paymentIntent.status === 'succeeded') {
        setSucceeded(true);
        setLoading(false);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Payment failed. Please try again.');
      setLoading(false);
    }
  };

  if (succeeded) {
    return (
      <div style={{ textAlign: 'center', padding: '30px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px' }}>
        <h3 style={{ color: '#166534', margin: '0 0 10px 0', fontSize: '1.5rem' }}>🎉 Spot Locked In!</h3>
        <p style={{ color: '#15803d', margin: 0 }}>
          Thank you, <strong>{businessName}</strong>! Check your email (<strong>{email}</strong>) for upload instructions for your logo.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: 'left', maxWidth: '420px', margin: '0 auto' }}>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '0.9rem', color: '#334155' }}>
          Business Name
        </label>
        <input 
          type="text" 
          required 
          value={businessName} 
          onChange={(e) => setBusinessName(e.target.value)} 
          placeholder="e.g. The FRJ Group Real Estate"
          style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '1rem', boxSizing: 'border-box' }}
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '0.9rem', color: '#334155' }}>
          Email Address
        </label>
        <input 
          type="email" 
          required 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="contact@business.com"
          style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '1rem', boxSizing: 'border-box' }}
        />
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '0.9rem', color: '#334155' }}>
          Card Details
        </label>
        <div style={{ padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px', background: '#ffffff' }}>
          <CardElement options={{ style: { base: { fontSize: '16px', color: '#1e293b', '::placeholder': { color: '#94a3b8' } } } }} />
        </div>
      </div>

      {errorMsg && (
        <div style={{ color: '#dc2626', background: '#fef2f2', padding: '10px', borderRadius: '6px', marginBottom: '16px', fontSize: '0.9rem', textAlign: 'center' }}>
          {errorMsg}
        </div>
      )}

      <button 
        type="submit" 
        disabled={!stripe || loading}
        style={{
          background: loading ? '#93c5fd' : '#2563eb',
          color: '#ffffff',
          fontSize: '1.2rem',
          fontWeight: '700',
          padding: '16px 24px',
          border: 'none',
          borderRadius: '8px',
          cursor: loading ? 'not-allowed' : 'pointer',
          width: '100%',
          boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)',
          transition: 'background 0.2s ease'
        }}
      >
        {loading ? 'Processing...' : 'Pay $600 & Lock In Spot'}
      </button>

      <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '14px', marginBottom: 0, textAlign: 'center' }}>
        🔒 Encrypted 256-bit Stripe Payment
      </p>
    </form>
  );
}

// Main Page Component Wrapper
export default function MegaPass() {
  return (
    <div style={{ maxWidth: '850px', margin: '0 auto', padding: '40px 20px', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1a1a1a' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '35px' }}>
        <span style={{ 
          background: '#fee2e2', 
          color: '#dc2626', 
          padding: '8px 16px', 
          borderRadius: '9999px', 
          fontWeight: '700', 
          fontSize: '0.85rem',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          border: '1px solid #fca5a5'
        }}>
          🔥 Limited to First 5 Local Partners
        </span>

        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginTop: '20px', marginBottom: '12px', lineHeight: '1.2' }}>
          South Side Field Sign Megapass
        </h1>

        <p style={{ fontSize: '1.2rem', color: '#4b5563', maxWidth: '650px', margin: '0 auto', lineHeight: '1.5' }}>
          <strong>6 Months of Continuous Exposure</strong> (September – March) across Fall Outdoor &amp; Winter Indoor Seasons.
        </p>
      </div>

      {/* Visual Mockups Grid 
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
          <img src={MOCKUP_IMG_1} alt="Field Sign Setup" style={{ width: '100%', height: '240px', objectFit: 'cover', display: 'block' }} />
        </div>
        <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
          <img src={MOCKUP_IMG_2} alt="Youth Match Branding" style={{ width: '100%', height: '240px', objectFit: 'cover', display: 'block' }} />
        </div>
      </div>
      */}

      {/* Value Breakdown Card */}
      <div style={{ background: '#f8fafc', padding: '32px', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: 0, marginBottom: '20px', color: '#0f172a' }}>
          What's Included ($600 Flat Rate)
        </h2>
        <ul style={{ paddingLeft: '20px', margin: 0, lineHeight: '1.8', color: '#334155', fontSize: '1.05rem' }}>
          <li style={{ marginBottom: '12px' }}>
            <strong>Full 7-Month Coverage:</strong> September through March (Fall Outdoor) + December through February (Winter Indoor).
          </li>
          <li style={{ marginBottom: '12px' }}>
            <strong>High-Traffic Exposure:</strong> Premium A-frame sign placed front-and-center at weekend youth matches, adult pickups, adultand live-streamed games.
          </li>
          <li style={{ marginBottom: '12px' }}>
            <strong>Institutional Footprint:</strong> Reach families across Charter, Catholic, Private, Park District, and non-profit sports networks across the South Side.
          </li>
          <li style={{ marginBottom: '0' }}>
            <strong>Digital Integration:</strong> 4 monthly social media tags + 2 dedicated feature posts across Chicago Super League channels.
          </li>
        </ul>
      </div>

      {/* Embedded Stripe Checkout Box */}
      <div style={{ padding: '36px 24px', background: '#ffffff', border: '2px dashed #2563eb', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '1.6rem', fontWeight: '700', color: '#0f172a' }}>
            Claim Your Field Sign ($600)
          </h3>
          <p style={{ color: '#64748b', margin: 0, fontSize: '0.95rem' }}>
            Enter your business info below to reserve 1 of the 5 available spots.
          </p>
        </div>

        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>

    </div>
  );
}