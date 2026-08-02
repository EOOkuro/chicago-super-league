import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { CheckCircle2, ShieldCheck, CreditCard, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';

// --- APPLIES TO YOUR checkout.jsx FILE ---
// How to import this component inside your router (e.g., App.jsx):
// import Checkout from './pages/checkout'; 
// <Route path="/checkout" element={<Checkout />} />
// ----------------------------------------

export default function Checkout() {
  // Default to Fall Pricing to prioritize active seasonal outreach
  const [billingCycle, setBillingCycle] = useState('fall'); // 'monthly' | 'fall' | 'yearly'
  
  // Custom structural add-ons toggles
  const [addons, setAddons] = useState({
    jerseyLogo: false,
    fieldBanner: false,
  });

  // Exact pricing matrix scaled from operational directives
  const pricing = {
    monthly: { local: 25, partner: 100, title: 250, label: '/ month' },
    fall: { local: 75, partner: 220, title: 500, label: ' full season' },
    yearly: { local: 200, partner: 750, title: 1800, label: '/ year' }
  };

  const handleAddonToggle = (key) => {
    setAddons(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="pt-32 pb-24 bg-[hsl(var(--background))] min-h-screen">
      <Helmet>
        <title>Secure Checkout | Chicago Super League</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Checkout Page Layout Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h1 className="text-[hsl(var(--black))] text-5xl md:text-6xl mb-3 font-['Bebas_Neue'] uppercase tracking-tight">
          Secure League Checkout
        </h1>
        <p className="text-[hsl(var(--gray))] text-lg max-w-xl mx-auto mb-8">
          Select your finalized partner asset tier package and billing cadence below to execute secure payment processing.
        </p>

        {/* 3-Way Cadence Selection Framework */}
        <div className="inline-flex flex-wrap justify-center items-center bg-[hsl(var(--white))] border border-[hsl(var(--gray))]/20 p-1.5 rounded-2xl shadow-inner gap-1 mb-4">
          <button 
            type="button"
            onClick={() => setBillingCycle('monthly')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all ${billingCycle === 'monthly' ? 'bg-[hsl(var(--black))] text-white shadow' : 'text-[hsl(var(--gray))] hover:text-[hsl(var(--black))]'}`}
          >
            Monthly ($25 base)
          </button>
          <button 
            type="button"
            onClick={() => setBillingCycle('fall')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all flex items-center gap-1.5 ${billingCycle === 'fall' ? 'bg-amber-600 text-white shadow' : 'text-amber-700 bg-amber-50 hover:bg-amber-100'}`}
          >
            <Leaf className="w-4 h-4" /> Fall Pricing ($75 base)
          </button>
          <button 
            type="button"
            onClick={() => setBillingCycle('yearly')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all ${billingCycle === 'yearly' ? 'bg-[hsl(var(--primary))] text-white shadow' : 'text-[hsl(var(--gray))] hover:text-[hsl(var(--black))]'}`}
          >
            Yearly ($200 base)
          </button>
        </div>
      </section>

      {/* Package Checkout Layout Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Tier 1: Local Business Core */}
          <div className="bg-[hsl(var(--true-white))] p-8 rounded-2xl border border-[hsl(var(--white))] flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-[hsl(var(--black))]">Local Business</h3>
                {billingCycle === 'fall' && <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded font-bold uppercase tracking-wider">Fall Plan</span>}
              </div>
              <div className="mb-6">
                <span className="text-5xl font-extrabold text-[hsl(var(--black))]">${pricing[billingCycle].local}</span>
                <span className="text-[hsl(var(--gray))] text-sm">{pricing[billingCycle].label}</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm text-[hsl(var(--gray))]">
                <li className="flex gap-2.5"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))] shrink-0 mt-0.5" /> Web directory registry listing</li>
                <li className="flex gap-2.5"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))] shrink-0 mt-0.5" /> Seasonal digital community feature tags</li>
                <li className="flex gap-2.5"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))] shrink-0 mt-0.5" /> Pitch PA recognition announcements</li>
              </ul>
            </div>
            <Button asChild className="w-full bg-[hsl(var(--black))] hover:bg-[hsl(var(--gray))] text-white py-4 font-bold tracking-wider uppercase">
              <a href={`https://buy.stripe.com/mock_local_${billingCycle}`} target="_blank" rel="noopener noreferrer">
                Pay Securely
              </a>
            </Button>
          </div>

          {/* Tier 2: Premium League Partner (Featured) */}
          <div className="bg-[hsl(var(--black))] p-8 rounded-2xl border-2 border-[hsl(var(--primary))] shadow-xl flex flex-col justify-between relative">
            <div>
              <h3 className="text-2xl font-bold text-[hsl(var(--true-white))] mb-4">League Partner</h3>
              <div className="mb-6">
                <span className="text-5xl font-extrabold text-[hsl(var(--primary-light))]">${pricing[billingCycle].partner}</span>
                <span className="text-[hsl(var(--gray))] text-sm">{pricing[billingCycle].label}</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm text-[hsl(var(--true-white))]">
                <li className="flex gap-2.5"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary-light))] shrink-0 mt-0.5" /> Premium home view website logo banner</li>
                <li className="flex gap-2.5"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary-light))] shrink-0 mt-0.5" /> 1 physical 8ft mesh pitch fence banner</li>
                <li className="flex gap-2.5"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary-light))] shrink-0 mt-0.5" /> Logo integration inside weekly updates</li>
              </ul>
            </div>
            <Button asChild className="w-full bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white py-4 font-bold tracking-wider uppercase">
              <a href={`https://buy.stripe.com/mock_partner_${billingCycle}`} target="_blank" rel="noopener noreferrer">
                Pay Securely
              </a>
            </Button>
          </div>

          {/* Tier 3: Elite Division Title Sponsor */}
          <div className="bg-[hsl(var(--true-white))] p-8 rounded-2xl border border-[hsl(var(--white))] flex flex-col justify-between shadow-sm">
            <div>
              <h3 className="text-2xl font-bold text-[hsl(var(--black))] mb-4">Division Title</h3>
              <div className="mb-6">
                <span className="text-5xl font-extrabold text-[hsl(var(--black))]">${pricing[billingCycle].title}</span>
                <span className="text-[hsl(var(--gray))] text-sm">{pricing[billingCycle].label}</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm text-[hsl(var(--gray))]">
                <li className="flex gap-2.5"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))] shrink-0 mt-0.5" /> Absolute title rights priority</li>
                <li className="flex gap-2.5"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))] shrink-0 mt-0.5" /> Dedicated match day physical activation site</li>
                <li className="flex gap-2.5"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))] shrink-0 mt-0.5" /> Sleeve logo patch addition on jersey kits</li>
              </ul>
            </div>
            <Button asChild className="w-full bg-[hsl(var(--black))] hover:bg-[hsl(var(--gray))] text-white py-4 font-bold tracking-wider uppercase">
              <a href={`https://buy.stripe.com/mock_title_${billingCycle}`} target="_blank" rel="noopener noreferrer">
                Pay Securely
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Custom Invoice Add-on Subsystem */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[hsl(var(--true-white))] border border-[hsl(var(--white))] rounded-3xl p-8 shadow-sm">
          <h3 className="text-xl font-bold text-[hsl(var(--black))] mb-2 flex items-center gap-2">
            Configure Secondary Pitch Upgrades
          </h3>
          <p className="text-[hsl(var(--gray))] text-sm mb-6">
            Need to include extra operational physical components into this checkout arrangement? Check the additions below to route parameters seamlessly.
          </p>
          
          <div className="space-y-4 mb-8">
            <label className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${addons.jerseyLogo ? 'border-[hsl(var(--primary))] bg-[hsl(var(--light-bg))]' : 'border-[hsl(var(--white))] hover:bg-zinc-50'}`}>
              <div className="flex items-start gap-3">
                <input type="checkbox" checked={addons.jerseyLogo} onChange={() => handleAddonToggle('jerseyLogo')} className="mt-1 accent-[hsl(var(--primary))]" />
                <div>
                  <span className="font-bold text-[hsl(var(--black))] block text-sm">Primary Jersey Branding Seal Add-on</span>
                  <span className="text-xs text-[hsl(var(--gray))]">Direct screen print inclusion onto competitive group seasonal apparel sets.</span>
                </div>
              </div>
              <span className="font-mono font-bold text-sm text-[hsl(var(--black))]">
                +{billingCycle === 'yearly' ? '$500/yr' : billingCycle === 'fall' ? '$120 seasonal' : '$50/mo'}
              </span>
            </label>

            <label className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${addons.fieldBanner ? 'border-[hsl(var(--primary))] bg-[hsl(var(--light-bg))]' : 'border-[hsl(var(--white))] hover:bg-zinc-50'}`}>
              <div className="flex items-start gap-3">
                <input type="checkbox" checked={addons.fieldBanner} onChange={() => handleAddonToggle('fieldBanner')} className="mt-1 accent-[hsl(var(--primary))]" />
                <div>
                  <span className="font-bold text-[hsl(var(--black))] block text-sm">Additional 8ft Rugged Perimeter Mesh Banner</span>
                  <span className="text-xs text-[hsl(var(--gray))]">Secondary high-visibility display framing assets deployed on main grids.</span>
                </div>
              </div>
              <span className="font-mono font-bold text-sm text-[hsl(var(--black))]">
                +{billingCycle === 'yearly' ? '$300/yr' : billingCycle === 'fall' ? '$80 seasonal' : '$30/mo'}
              </span>
            </label>
          </div>

          {/* Secure SSL Gateway Metadata Banner */}
          <div className="bg-[hsl(var(--black))] text-white p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-[hsl(var(--primary-light))]" />
              <div>
                <span className="text-xs text-[hsl(var(--gray))] block uppercase tracking-wider font-semibold">Stripe Checkout Engine Routing</span>
                <span className="text-sm font-medium text-[hsl(var(--true-white))]">Encrypted SSL Merchant Vault System Active</span>
              </div>
            </div>
            <div className="text-center sm:text-right">
              <span className="text-xs text-[hsl(var(--primary-light))] font-mono flex items-center justify-end gap-1 font-bold">
                <ShieldCheck className="w-4 h-4" /> PCI Compliant Data Protection
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}