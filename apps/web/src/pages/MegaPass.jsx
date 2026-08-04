import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  ExpressCheckoutElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

// Replace with your actual Stripe Publishable Key
const stripePromise = loadStripe('pk_test_51Px...YOUR_PUBLISHABLE_KEY');

// Inner Form Component handling Apple Pay, Google Pay, Cards & BNPL
function CheckoutForm({ businessName, setBusinessName, email, setEmail }) {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // Submit handler for standard PaymentElement submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setErrorMsg(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/megapass?success=true`,
        payment_method_data: {
          billing_details: {
            name: businessName,
            email: email,
          },
        },
      },
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    }
  };

  // Handler for Express Checkout (Apple Pay / Google Pay / Link)
  const handleExpressConfirm = async () => {
    if (!stripe || !elements) return;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/megapass?success=true`,
      },
    });

    if (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div style={{ textAlign: 'left', maxWidth: '480px', margin: '0 auto' }}>
      {/* 1. DIGITAL WALLETS (Apple Pay, Google Pay, Link) */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '0.9rem', color: '#334155' }}>
          Express Checkout
        </label>
        <ExpressCheckoutElement onConfirm={handleExpressConfirm} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0', color: '#94a3b8', fontSize: '0.85rem' }}>
        <div style={{ flex: 1, borderBottom: '1px solid #e2e8f0' }}></div>
        <span style={{ padding: '0 10px', fontWeight: '600', textTransform: 'uppercase' }}>Or pay with card / flexible pay</span>
        <div style={{ flex: 1, borderBottom: '1px solid #e2e8f0' }}></div>
      </div>

      {/* 2. FULL PAYMENT FORM */}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '0.9rem', color: '#334155' }}>
            Business Name
          </label>
          <input 
            type="text" 
            required 
            value={businessName} 
            onChange={(e) => setBusinessName(e.target.value)} 
            placeholder="e.g. South Side Realty"
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
            Payment Method
          </label>
          <div style={{ padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px', background: '#ffffff' }}>
            <PaymentElement options={{ layout: 'tabs' }} />
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
          🔒 Encrypted 256-bit Stripe Checkout
        </p>
      </form>
    </div>
  );
}

// Main Page Wrapper
export default function MegaPass() {
  const [clientSecret, setClientSecret] = useState('');
  const [apiError, setApiError] = useState(null);
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Check URL params on redirect back after payment success
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get('success') === 'true') {
      setIsSuccess(true);
    }
  }, []);

  // Fetch PaymentIntent on component load
  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        businessName: businessName || 'Sponsor Reserved', 
        email: email || 'sponsor@chicagosuperleague.com' 
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok || data.error) {
          throw new Error(data.error || `Server error (${res.status})`);
        }
        return data;
      })
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          throw new Error("Missing clientSecret from backend response");
        }
      })
      .catch((err) => {
        console.error("Error creating payment intent:", err);
        setApiError(err.message);
      });
  }, []);

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

      {/* Value Breakdown Card */}
      <div style={{ background: '#f8fafc', padding: '32px', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: 0, marginBottom: '20px', color: '#0f172a' }}>
          What's Included ($600 Flat Rate)
        </h2>
        <ul style={{ paddingLeft: '20px', margin: 0, lineHeight: '1.8', color: '#334155', fontSize: '1.05rem' }}>
          <li style={{ marginBottom: '12px' }}>
            <strong>Full Coverage:</strong> September through March (Fall Outdoor &amp; Winter Indoor Seasons).
          </li>
          <li style={{ marginBottom: '12px' }}>
            <strong>High-Traffic Exposure:</strong> Premium A-frame sign placed front-and-center at weekend youth matches, adult pickups, and live-streamed games.
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

        {isSuccess ? (
          <div style={{ textAlign: 'center', padding: '30px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px' }}>
            <h3 style={{ color: '#166534', margin: '0 0 10px 0', fontSize: '1.5rem' }}>🎉 Spot Locked In!</h3>
            <p style={{ color: '#15803d', margin: 0 }}>
              Thank you for supporting Chicago Super League! Check your email for logo upload instructions.
            </p>
          </div>
        ) : apiError ? (
          <div style={{ textAlign: 'center', color: '#dc2626', background: '#fef2f2', padding: '20px', borderRadius: '12px', border: '1px solid #fca5a5' }}>
            <p style={{ fontWeight: '700', margin: '0 0 6px 0' }}>Unable to load payment form</p>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#7f1d1d' }}>{apiError}</p>
            <p style={{ margin: '10px 0 0 0', fontSize: '0.8rem', color: '#991b1b' }}>
              Check that <code>STRIPE_SECRET_KEY</code> is configured in Vercel environment variables.
            </p>
          </div>
        ) : clientSecret ? (
          <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
            <CheckoutForm 
              businessName={businessName} 
              setBusinessName={setBusinessName} 
              email={email} 
              setEmail={setEmail} 
            />
          </Elements>
        ) : (
          <div style={{ textAlign: 'center', color: '#64748b', padding: '20px' }}>
            Loading payment options...
          </div>
        )}
      </div>

    </div>
  );
}