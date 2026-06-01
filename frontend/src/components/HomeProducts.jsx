import React from "react";

const TRIAL_LINK = "#";

const products = [
  {
    badge: "Clinical AI Platform",
    name: "VITAL.AI",
    nameSuffix: ".AI",
    nameBase: "VITAL",
    tagline: "Document the way you practice.",
    description:
      "From consultation to billing, VITAL.AI listens, transcribes, and structures clinical notes in under 60 seconds — covering every specialty, every practice type.",
    accentColor: "#0EA5E9",
    bgColor: "#0A1628",
    features: [
      { icon: "🎙️", text: "Real-time AI medical scribe — SOAP notes before the patient leaves" },
      { icon: "💊", text: "Auto ICD-10 & CPT coding from the clinical note" },
      { icon: "🏥", text: "Works across 10+ specialties with EHR integration" },
    ],
    stats: [
      { val: "< 60s", label: "Note generation" },
      { val: "3+ hrs", label: "Saved daily" },
      { val: "HIPAA", label: "Compliant" },
    ],
    cta: "Start 14-Day Free Trial",
    ctaLink: TRIAL_LINK,
    secondaryCta: "See how it works",
    secondaryLink: "/products/vital",
  },
  {
    badge: "Dental Documentation",
    name: "Molaris.AI",
    nameSuffix: ".AI",
    nameBase: "Molaris",
    tagline: "Charts done before the patient leaves the chair.",
    description:
      "Voice-first clinical documentation built exclusively for dentists. Dictate any scenario — Molaris.AI auto-formats it into a SOAP-compliant chart with legal boilerplates instantly.",
    accentColor: "#8B5CF6",
    bgColor: "#0F0A1E",
    features: [
      { icon: "🦷", text: "3-step workflow: Speak → Click → Done" },
      { icon: "📋", text: "Auto-generates referral letters, consent forms & patient replies" },
      { icon: "🔌", text: "Integrates with Dentally, Dentrix, Eaglesoft, Open Dental & more" },
    ],
    stats: [
      { val: "2 min", label: "Setup time" },
      { val: "15 hrs", label: "Saved monthly" },
      { val: "GDPR", label: "& HIPAA ready" },
    ],
    cta: "Start 14-Day Free Trial",
    ctaLink: TRIAL_LINK,
    secondaryCta: "Explore Molaris.AI",
    secondaryLink: "/industry/dentalclinics",
  },
];

export default function HomeProducts() {
  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Header */}
        <div className="text-center space-y-3">
          <p className="text-xs font-semibold tracking-[0.2em] text-purple-500 uppercase">
            Flagship Products
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Two products. Every practice covered.
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base">
            Purpose-built AI for healthcare providers — start your free trial today, no credit card required.
          </p>
        </div>

        {/* Product cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {products.map((p) => (
            <div
              key={p.name}
              className="relative rounded-3xl overflow-hidden flex flex-col"
              style={{ backgroundColor: p.bgColor }}
            >
              {/* Radial glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${p.accentColor}18 0%, transparent 70%)`,
                }}
              />

              <div className="relative z-10 p-8 flex flex-col h-full gap-6">
                {/* Badge + name */}
                <div className="space-y-3">
                  <span
                    className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{
                      color: p.accentColor,
                      backgroundColor: `${p.accentColor}18`,
                    }}
                  >
                    {p.badge}
                  </span>

                  <div className="flex items-center gap-3">
                    {/* Mini pulse logo */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${p.accentColor}20`, border: `1px solid ${p.accentColor}30` }}
                    >
                      {p.nameBase === "VITAL" ? (
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <polyline points="2,10 5,10 6.5,5 9,15 11.5,7 13,12 14.5,10 18,10" stroke={p.accentColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        </svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M10 3C7 3 4 5.5 4 9c0 2 1 3.5 2.5 4.5L10 17l3.5-3.5C15 12.5 16 11 16 9c0-3.5-3-6-6-6z" stroke={p.accentColor} strokeWidth="1.6" strokeLinejoin="round" fill="none" />
                          <circle cx="10" cy="9" r="1.5" fill={p.accentColor} />
                        </svg>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold">
                      <span className="text-white">{p.nameBase}</span>
                      <span style={{ color: p.accentColor }}>{p.nameSuffix}</span>
                    </h3>
                  </div>

                  <p className="text-lg font-semibold text-white/90">{p.tagline}</p>
                  <p className="text-sm text-white/50 leading-relaxed">{p.description}</p>
                </div>

                {/* Features */}
                <ul className="space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f.text} className="flex items-start gap-3 text-sm text-white/70">
                      <span className="text-base shrink-0">{f.icon}</span>
                      <span>{f.text}</span>
                    </li>
                  ))}
                </ul>

                {/* Stats row */}
                <div
                  className="grid grid-cols-3 gap-3 rounded-2xl p-4"
                  style={{ backgroundColor: `${p.accentColor}0D`, border: `1px solid ${p.accentColor}20` }}
                >
                  {p.stats.map((s) => (
                    <div key={s.label} className="text-center">
                      <p className="text-lg font-bold text-white">{s.val}</p>
                      <p className="text-xs text-white/40">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-2">
                  <a
                    href={p.ctaLink}
                    className="flex-1 flex items-center justify-center gap-2 text-sm font-bold py-3 px-5 rounded-full transition-opacity hover:opacity-90 text-white"
                    style={{ backgroundColor: p.accentColor }}
                  >
                    {p.cta}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7h9M7.5 3.5l3.5 3.5-3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                  <a
                    href={p.secondaryLink}
                    className="flex-1 flex items-center justify-center text-sm font-medium py-3 px-5 rounded-full border transition-all hover:border-white/30 hover:text-white text-white/60"
                    style={{ borderColor: `${p.accentColor}40` }}
                  >
                    {p.secondaryCta}
                  </a>
                </div>

                {/* No credit card note */}
                <p className="text-center text-xs text-white/25">
                  No credit card required · Cancel any time
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
