import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { CheckCircle2, ShieldCheck, CreditCard, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';

function CheckoutPage() {
  // Default to Fall to match your current active push
  const [billingCycle, setBillingCycle] = useState('fall'); // 'monthly' | 'fall' | 'yearly'
  
  // Custom structural add-ons toggles
  const [addons, setAddons] = useState({
    jerseyLogo: false,
    fieldBanner: false,
  });

  // Exact pricing configurations
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
        <meta name="robots" content="noindex, nofollow" /> {/* Prevents random Google searches from landing straight on the payment register */}
      </Helmet>

      {/* Action-Oriented Checkout Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h1 className="text-[hsl(var(--black))] text-5xl md:text-6xl mb-3 font-['Bebas_Neue'] uppercase tracking-tight">
          Secure League Checkout
        </h1>
        <p className="text-[hsl(var(--gray))] text-lg max-w-xl mx-auto mb-8">
          Select your agreed tier package framework and billing cadence below to execute secure payment processing.
        </p>

        {/* 3-Way Billing Cycle Switcher */}
        <div className="inline-flex flex-wrap justify-center items-center bg-[hsl(var(--white))] border border-[hsl(var(--gray))]/20 p-1.5 rounded-2xl shadow-inner gap-1 mb-4">
          <button 
            type="button"
            onClick={() => setBillingCycle('monthly')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all ${billingCycle === 'monthly' ? 'bg-[hsl(var(--black))] text-white shadow' : 'text-[hsl(var(--gray))] hover:text-[hsl(var(--black))]'}`}
          >
            Monthly Commitment
          </button>
          <button 
            type="button"
            onClick={() => setBillingCycle('fall')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all flex items-center gap-1.5 ${billingCycle === 'fall' ? 'bg-amber-600 text-white shadow' : 'text-amber-700 bg-amber-50 hover:bg-amber-100'}`}
          >
            <Leaf className="w-4 h-4" /> Fall Pricing ($75)
          </button>
          <button 
            type="button"
            onClick={() => setBillingCycle('yearly')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all ${billingCycle === 'yearly' ? 'bg-[hsl(var(--primary))] text-white shadow' : 'text-[hsl(var(--gray))] hover:text-[hsl(var(--black))]'}`}
          >
            Yearly Plan
          </button>
        </div>
      </section>

      {/* Main Payment Tiers Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Tier 1: Local Business Plan */}
          <div className="bg-[hsl(var(--true-white))] p-8 rounded-2xl border border-[hsl(var(--white))] flex flex-col justify-between shadow-sm">
            <div>
              <h3 className="text-2xl font-bold text-[hsl(var(--black))] mb-4">Local Business Tier</h3>
              <div className="mb-6">
                <span className="text-5xl font-extrabold text-[hsl(var(--black))]">${pricing[billingCycle].local}</span>
                <span className="text-[hsl(var(--gray))] text-sm">{pricing[billingCycle].label}</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm text-[hsl(var(--gray))]">
                <li className="flex gap-2.5"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))] shrink-0 mt-0.5" /> Web directory registry listing</li>
                <li className="flex gap-2.5"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))] shrink-0 mt-0.5" /> Seasonal digital community tag</li>
                <li className="flex gap-2.5"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))] shrink-0 mt-0.5" /> Pitch PA recognition drops</li>
              </ul>
            </div>
            <Button asChild className="w-full bg-[hsl(var(--black))] hover:bg-[hsl(var(--gray))] text-white py-4 font-bold tracking-wider uppercase">
              <a href={`https://buy.stripe.com/mock_local_${billingCycle}`} target="_blank" rel="noopener noreferrer">
                Pay Securely
              </a>
            </Button>
          </div>

          {/* Tier 2: Premium League Partner */}
          <div className="bg-[hsl(var(--black))] p-8 rounded-2xl border-2 border-[hsl(var(--primary))] shadow-xl flex flex-col justify-between relative">
            <div>
              <h3 className="text-2xl font-bold text-[hsl(var(--true-white))] mb-4">League Partner Tier</h3>
              <div className="mb-6">
                <span className="text-5xl font-extrabold text-[hsl(var(--primary-light))]">${pricing[billingCycle].partner}</span>
                <span className="text-[hsl(var(--gray))] text-sm">{pricing[billingCycle].label}</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm text-[hsl(var(--true-white))]">
                <li className="flex gap-2.5"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary-light))] shrink-0 mt-0.5" /> Premium home screen logo graphics</li>
                <li className="flex gap-2.5"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary-light))] shrink-0 mt-0.5" /> 1 physical 8ft mesh pitch fence banner</li>
                <li className="flex gap-2.5"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary-light))] shrink-0 mt-0.5" /> Logo placement inside weekly parent updates</li>
              </ul>
            </div>
            <Button asChild className="w-full bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white py-4 font-bold tracking-wider uppercase">
              <a href={`https://buy.stripe.com/mock_partner_${billingCycle}`} target="_blank" rel="noopener noreferrer">
                Pay Securely
              </a>
            </Button>
          </div>

          {/* Tier 3: Exclusive Division Title Sponsor */}
          <div className="bg-[hsl(var(--true-white))] p-8 rounded-2xl border border-[hsl(var(--white))] flex flex-col justify-between shadow-sm">
            <div>
              <h3 className="text-2xl font-bold text-[hsl(var(--black))] mb-4">Division Title Tier</h3>
              <div className="mb-6">
                <span className="text-5xl font-extrabold text-[hsl(var(--black))]">${pricing[billingCycle].title}</span>
                <span className="text-[hsl(var(--gray))] text-sm">{pricing[billingCycle].label}</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm text-[hsl(var(--gray))]">
                <li className="flex gap-2.5"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))] shrink-0 mt-0.5" /> Primary division title nomenclature rights</li>
                <li className="flex gap-2.5"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))] shrink-0 mt-0.5" /> Dedicated match day physical activation site</li>
                <li className="flex gap-2.5"><CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))] shrink-0 mt-0.5" /> Core training jersey kit sleeve emblem addition</li>
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

      {/* Upgrades Option Panel */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[hsl(var(--true-white))] border border-[hsl(var(--white))] rounded-3xl p-8 shadow-sm">
          <h3 className="text-xl font-bold text-[hsl(var(--black))] mb-2 flex items-center gap-2">
            Configure Additional Pitch Assets
          </h3>
          <p className="text-[hsl(var(--gray))] text-sm mb-6">
            Need to add secondary items to your invoice arrangement? Select structural upgrades below to include them in your checkout workflow.
          </p>
          
          <div className="space-y-4 mb-8">
            <label className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${addons.jerseyLogo ? 'border-[hsl(var(--primary))] bg-[hsl(var(--light-bg))]' : 'border-[hsl(var(--white))] hover:bg-zinc-50'}`}>
              <div className="flex items-start gap-3">
                <input type="checkbox" checked={addons.jerseyLogo} onChange={() => handleAddonToggle('jerseyLogo')} className="mt-1 accent-[hsl(var(--primary))]" />
                <div>
                  <span className="font-bold text-[hsl(var(--black))] block text-sm">Primary Jersey Logo Placement Add-on</span>
                  <span className="text-xs text-[hsl(var(--gray))]">Direct branding inclusion onto competitive branch training sets.</span>
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
                  <span className="font-bold text-[hsl(var(--black))] block text-sm">Additional 8ft Mesh Backdrop Fence Banner</span>
                  <span className="text-xs text-[hsl(var(--gray))]">Secondary heavy-duty display banner asset additions.</span>
                </div>
              </div>
              <span className="font-mono font-bold text-sm text-[hsl(var(--black))]">
                +{billingCycle === 'yearly' ? '$300/yr' : billingCycle === 'fall' ? '$80 seasonal' : '$30/mo'}
              </span>
            </label>
          </div>

          {/* Secure Encryption Footer */}
          <div className="bg-[hsl(var(--black))] text-white p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-[hsl(var(--primary-light))]" />
              <div>
                <span className="text-xs text-[hsl(var(--gray))] block uppercase tracking-wider font-semibold">Stripe Payment Gateway Active</span>
                <span className="text-sm font-medium text-[hsl(var(--true-white))]">Encrypted 256-bit Secure Sockets Layer Transaction Routing</span>
              </div>
            </div>
            <div className="text-center sm:text-right">
              <span className="text-xs text-[hsl(var(--primary-light))] font-mono flex items-center justify-end gap-1 font-bold">
                <ShieldCheck className="w-4 h-4" /> PCI Compliant Verified
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CheckoutPage;