import React, { useState } from 'react';

// ── Icons ────────────────────────────────────────────────────────────────────
const Check = ({ color = '#22c55e' }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

// ── Data ─────────────────────────────────────────────────────────────────────

// Vital AI — Medical Transcriber plans
const VITAL_PLANS = [
  { name: 'Solo',          patientsDay: 'Up to 10',  doctors: 1, receptionists: 1, owners: 1, monthly: 1999,   annual: 17999  },
  { name: 'Clinic',        patientsDay: 'Up to 20',  doctors: 1, receptionists: 2, owners: 1, monthly: 3999,   annual: 35999  },
  { name: 'Busy Clinic',   patientsDay: 'Up to 40',  doctors: 2, receptionists: 3, owners: 2, monthly: 6999,   annual: 65999,  popular: true },
  { name: 'Multi-Doctor',  patientsDay: 'Up to 60',  doctors: 4, receptionists: 5, owners: 2, monthly: 9999,   annual: 95999  },
  { name: 'Practice Plus', patientsDay: 'Up to 100', doctors: 8, receptionists: 10, owners: 3, monthly: 14999, annual: 143999 },
];

// Molaris AI — Dental Clinic Management System (WhatsApp Automation)
const MOLARIS_WHATSAPP = {
  shared: {
    name: 'Shared WhatsApp',
    subtitle: "Use Molaris.AI's verified number",
    icon: '💬',
    monthly:  999,
    annual:   599,
    fiveYear: 299,
    features: [
      "Molaris.AI's verified WhatsApp number",
      "AI-powered appointment reminders",
      "Automated follow-ups & recalls",
      "Patient engagement workflows",
      "Treatment reminders",
      "No dedicated number required",
    ],
  },
  personal: {
    name: 'Personal WhatsApp',
    subtitle: "Molaris.AI on your clinic's own number",
    icon: '📱',
    monthly:  1999,
    annual:   1499,
    fiveYear: 999,
    features: [
      "Your clinic's own WhatsApp number",
      "AI-powered appointment reminders",
      "Automated follow-ups & recalls",
      "Patient engagement workflows",
      "Treatment reminders",
      "Maintain existing patient channel",
    ],
  },
};

// Molaris Dental Transcriber add-on — same plan structure as Vital AI
const MOLARIS_TRANSCRIBER_PLANS = VITAL_PLANS;

const fmt = (n) => '₹' + n.toLocaleString('en-IN');

const MOLARIS_DURATION_OPTS = [
  { key: 'monthly',  label: '1 Month'  },
  { key: 'annual',   label: '1 Year',   badge: 'Save 40%'  },
  { key: 'fiveYear', label: '5 Years',  badge: 'Save 70%'  },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function BillingToggle({ value, onChange }) {
  return (
    <div className="inline-flex items-center bg-gray-100 rounded-xl p-1 gap-1">
      {['monthly', 'annual'].map((b) => (
        <button
          key={b}
          onClick={() => onChange(b)}
          className={`relative px-5 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${
            value === b ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {b === 'monthly' ? 'Monthly' : 'Annual'}
          {b === 'annual' && (
            <span className="ml-2 text-[10px] font-black bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">
              ~25% off
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

function DurationSelector({ value, onChange }) {
  return (
    <div className="inline-flex items-center bg-gray-100 rounded-xl p-1 gap-1">
      {MOLARIS_DURATION_OPTS.map((opt) => (
        <button
          key={opt.key}
          onClick={() => onChange(opt.key)}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 flex items-center gap-1.5 ${
            value === opt.key ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {opt.label}
          {opt.badge && (
            <span className="text-[10px] font-black bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">
              {opt.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

// ── Vital AI tab ──────────────────────────────────────────────────────────────
function VitalTab() {
  const [billing, setBilling] = useState('annual');

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-black text-gray-900">Transcriber Plans</h2>
          <p className="text-sm text-gray-500 mt-1">AI-powered clinical note transcription for every practice size.</p>
        </div>
        <BillingToggle value={billing} onChange={setBilling} />
      </div>

      {/* Plan grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {VITAL_PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-2xl p-5 flex flex-col transition-transform duration-200 hover:-translate-y-1 ${
              plan.popular
                ? 'bg-[#0A1628] text-white shadow-2xl ring-2 ring-indigo-400'
                : 'bg-white text-gray-900 border border-gray-100 shadow-sm'
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wide whitespace-nowrap">
                Most Popular
              </span>
            )}

            <p className={`text-[11px] font-black uppercase tracking-widest mb-2 ${plan.popular ? 'text-indigo-300' : 'text-gray-400'}`}>
              {plan.name}
            </p>

            <div className="mb-4">
              {billing === 'annual' ? (
                <>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black leading-none">
                      {fmt(Math.round(plan.annual / 12))}
                    </span>
                    <span className={`text-xs font-semibold ${plan.popular ? 'text-white/50' : 'text-gray-400'}`}>/mo</span>
                  </div>
                  <div className={`mt-1.5 inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-black ${
                    plan.popular ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-50 text-emerald-700'
                  }`}>
                    <span>{fmt(plan.annual)}/yr</span>
                    <span className="opacity-50">·</span>
                    <span>Save {fmt(plan.monthly * 12 - plan.annual)}</span>
                  </div>
                </>
              ) : (
                <>
                  <span className="text-3xl font-black leading-none">{fmt(plan.monthly)}</span>
                  <span className={`text-xs font-semibold ml-1 ${plan.popular ? 'text-white/50' : 'text-gray-400'}`}>/mo</span>
                </>
              )}
            </div>

            <div className={`space-y-1.5 text-xs mb-5 flex-1 ${plan.popular ? 'text-white/70' : 'text-gray-500'}`}>
              {[
                ['Patients/day', plan.patientsDay],
                ['Doctors', plan.doctors],
                ['Receptionists', plan.receptionists],
                ['Owners / Admins', plan.owners],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between items-center py-1 border-b border-white/5 last:border-0">
                  <span>{label}</span>
                  <span className={`font-black text-xs ${plan.popular ? 'text-white' : 'text-gray-900'}`}>{val}</span>
                </div>
              ))}
            </div>

            <a
              href="/get-in-touch"
              className={`block text-center py-2.5 rounded-xl text-xs font-black uppercase tracking-wide transition-opacity hover:opacity-80 ${
                plan.popular ? 'bg-indigo-500 text-white' : 'bg-gray-900 text-white'
              }`}
            >
              Get Started
            </a>
          </div>
        ))}
      </div>

      {/* Features note */}
      <div className="mt-10 bg-indigo-50 border border-indigo-100 rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: '🎙️', label: 'Real-time Transcription' },
          { icon: '📋', label: 'Auto Clinical Notes' },
          { icon: '🔒', label: 'HIPAA-Safe Storage' },
          { icon: '🩺', label: '50+ Medical Specialties' },
        ].map((f) => (
          <div key={f.label} className="flex items-center gap-3">
            <span className="text-2xl">{f.icon}</span>
            <span className="text-xs font-bold text-indigo-900 leading-tight">{f.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Molaris AI tab ────────────────────────────────────────────────────────────
function MolarisTab() {
  const [duration, setDuration] = useState('annual');
  const [transcBilling, setTranscBilling] = useState('annual');

  const shared = MOLARIS_WHATSAPP.shared;
  const personal = MOLARIS_WHATSAPP.personal;

  const sharedPrice  = shared[duration];
  const personalPrice = personal[duration];

  return (
    <div className="space-y-14">

      {/* ── DCMS + WhatsApp ── */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-black text-gray-900">Clinic Management + WhatsApp</h2>
            <p className="text-sm text-gray-500 mt-1">
              Full dental clinic management system with AI-powered WhatsApp patient communication.
            </p>
          </div>
          <DurationSelector value={duration} onChange={setDuration} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Shared card */}
          <div className="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm flex flex-col">
            <div className="flex items-center gap-2.5 mb-1">
              <span className="text-xl">{shared.icon}</span>
              <h3 className="text-lg font-black text-gray-900">{shared.name}</h3>
            </div>
            <p className="text-sm text-gray-400 font-medium mb-5">{shared.subtitle}</p>

            <div className="mb-1">
              <span className="text-5xl font-black text-gray-900">{fmt(sharedPrice)}</span>
              <span className="text-gray-400 font-bold text-sm ml-1.5">/ month</span>
            </div>
            <p className="text-xs text-gray-400 font-semibold mb-6">
              {duration === 'monthly' ? 'Billed monthly' : duration === 'annual' ? 'Billed annually' : 'Billed every 5 years'}
            </p>

            <ul className="space-y-2.5 mb-7 flex-1">
              {shared.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-600 font-medium">
                  <Check />
                  {f}
                </li>
              ))}
            </ul>

            <a href="/get-in-touch" className="block text-center bg-gray-900 text-white py-3 rounded-xl font-black text-sm uppercase tracking-wide hover:opacity-80 transition-opacity">
              Get Started
            </a>
          </div>

          {/* Personal card — highlighted */}
          <div className="bg-[#0D1F3C] rounded-2xl p-7 shadow-2xl flex flex-col ring-2 ring-teal-400/40">
            <div className="flex items-center gap-2.5 mb-1">
              <span className="text-xl">{personal.icon}</span>
              <h3 className="text-lg font-black text-teal-300">{personal.name}</h3>
            </div>
            <p className="text-sm text-white/40 font-medium mb-5">{personal.subtitle}</p>

            <div className="mb-1">
              <span className="text-5xl font-black text-white">{fmt(personalPrice)}</span>
              <span className="text-white/40 font-bold text-sm ml-1.5">/ month</span>
            </div>
            <p className="text-xs text-white/30 font-semibold mb-6">
              {duration === 'monthly' ? 'Billed monthly' : duration === 'annual' ? 'Billed annually' : 'Billed every 5 years'}
            </p>

            <ul className="space-y-2.5 mb-7 flex-1">
              {personal.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-white/70 font-medium">
                  <Check color="#2dd4bf" />
                  {f}
                </li>
              ))}
            </ul>

            <a href="/get-in-touch" className="block text-center bg-teal-400 text-gray-900 py-3 rounded-xl font-black text-sm uppercase tracking-wide hover:opacity-80 transition-opacity">
              Get Started
            </a>
          </div>
        </div>
      </div>

      {/* ── Dental Transcriber add-on ── */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="bg-teal-100 text-teal-700 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest">Add-on</span>
          <h2 className="text-2xl font-black text-gray-900">Dental Transcriber</h2>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          AI-powered dental note transcription — available as a standalone add-on for Molaris clinics.
        </p>

        <div className="flex justify-end mb-5">
          <BillingToggle value={transcBilling} onChange={setTranscBilling} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {MOLARIS_TRANSCRIBER_PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-5 flex flex-col transition-transform duration-200 hover:-translate-y-1 ${
                plan.popular
                  ? 'bg-[#0D1F3C] text-white shadow-2xl ring-2 ring-teal-400/50'
                  : 'bg-white text-gray-900 border border-gray-100 shadow-sm'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wide whitespace-nowrap">
                  Most Popular
                </span>
              )}

              <p className={`text-[11px] font-black uppercase tracking-widest mb-2 ${plan.popular ? 'text-teal-300' : 'text-gray-400'}`}>
                {plan.name}
              </p>

              <div className="mb-4">
                {transcBilling === 'annual' ? (
                  <>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black leading-none">
                        {fmt(Math.round(plan.annual / 12))}
                      </span>
                      <span className={`text-xs font-semibold ${plan.popular ? 'text-white/50' : 'text-gray-400'}`}>/mo</span>
                    </div>
                    <div className={`mt-1.5 inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-black ${
                      plan.popular ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-50 text-emerald-700'
                    }`}>
                      <span>{fmt(plan.annual)}/yr</span>
                      <span className="opacity-50">·</span>
                      <span>Save {fmt(plan.monthly * 12 - plan.annual)}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="text-3xl font-black leading-none">{fmt(plan.monthly)}</span>
                    <span className={`text-xs font-semibold ml-1 ${plan.popular ? 'text-white/50' : 'text-gray-400'}`}>/mo</span>
                  </>
                )}
              </div>

              <div className={`space-y-1.5 text-xs mb-5 flex-1 ${plan.popular ? 'text-white/70' : 'text-gray-500'}`}>
                {[
                  ['Patients/day', plan.patientsDay],
                  ['Doctors', plan.doctors],
                  ['Receptionists', plan.receptionists],
                  ['Owners / Admins', plan.owners],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between items-center py-1 border-b border-white/5 last:border-0">
                    <span>{label}</span>
                    <span className={`font-black text-xs ${plan.popular ? 'text-white' : 'text-gray-900'}`}>{val}</span>
                  </div>
                ))}
              </div>

              <a
                href="/get-in-touch"
                className={`block text-center py-2.5 rounded-xl text-xs font-black uppercase tracking-wide transition-opacity hover:opacity-80 ${
                  plan.popular ? 'bg-teal-500 text-white' : 'bg-gray-900 text-white'
                }`}
              >
                Add On
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
const TABS = [
  {
    key: 'vital',
    label: 'Vital AI',
    tag: 'Medical Transcriber',
    tagColor: 'bg-indigo-100 text-indigo-700',
    activeColor: 'border-indigo-500 text-indigo-600',
  },
  {
    key: 'molaris',
    label: 'Molaris AI',
    tag: 'Dental Clinic Management',
    tagColor: 'bg-teal-100 text-teal-700',
    activeColor: 'border-teal-500 text-teal-600',
  },
];

const Pricing = () => {
  const [activeTab, setActiveTab] = useState('vital');

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(160deg, #f8f9fb 0%, #eef0f5 100%)' }}>

      {/* ── Hero ── */}
      <div className="max-w-4xl mx-auto px-6 pt-20 pb-10 text-center">
        <span className="inline-block bg-yellow-400 text-gray-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest mb-4">
          Connect Gen AI
        </span>
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-gray-900 leading-tight mb-4">
          Simple, Transparent<br />Pricing
        </h1>
        <p className="text-base text-gray-500 font-medium max-w-lg mx-auto">
          Two AI products. One mission — transforming how clinics work, communicate, and grow.
        </p>
      </div>

      {/* ── Tab bar ── */}
      <div className="max-w-4xl mx-auto px-6 mb-10">
        <div className="flex gap-0 bg-white border border-gray-200 rounded-2xl p-1.5 shadow-sm">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex flex-col sm:flex-row items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-black transition-all duration-200 ${
                activeTab === tab.key
                  ? `bg-gray-900 text-white shadow-md`
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                activeTab === tab.key ? 'bg-white/20 text-white' : tab.tagColor
              }`}>
                {tab.tag}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab content ── */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        {activeTab === 'vital'   && <VitalTab />}
        {activeTab === 'molaris' && <MolarisTab />}
      </div>

      {/* ── Footer CTA ── */}
      <div className="max-w-3xl mx-auto px-6 pb-20">
        <div className="bg-gray-900 rounded-3xl p-10 text-center">
          <h2 className="text-3xl font-black text-white tracking-tight mb-2">Not sure which plan fits?</h2>
          <p className="text-white/50 font-medium text-sm mb-7">
            Our team will help you find the right fit for your clinic — no pressure.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/get-in-touch" className="bg-yellow-400 text-gray-900 font-black py-3 px-8 rounded-xl text-sm uppercase tracking-wide hover:opacity-90 transition-opacity">
              Talk to Sales
            </a>
            <a href="mailto:sales@connectgenai.in" className="bg-white/10 text-white/80 font-bold py-3 px-8 rounded-xl text-sm hover:bg-white/15 transition-colors">
              sales@connectgenai.in
            </a>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Pricing;
