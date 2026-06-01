import React from "react";

const badges = [
  {
    label: "HIPAA",
    sub: "Compliant",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2l6 3v5c0 4-2.5 7-6 8-3.5-1-6-4-6-8V5l6-3z" stroke="#0EA5E9" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M7 10l2 2 4-4" stroke="#0EA5E9" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "GDPR",
    sub: "Ready",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7.5" stroke="#0EA5E9" strokeWidth="1.4" />
        <path d="M10 6v4l3 2" stroke="#0EA5E9" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "SOC 2",
    sub: "Type II",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="8" width="14" height="10" rx="2" stroke="#0EA5E9" strokeWidth="1.4" />
        <path d="M6 8V6a4 4 0 018 0v2" stroke="#0EA5E9" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="10" cy="13" r="1.5" fill="#0EA5E9" />
      </svg>
    ),
  },
  {
    label: "256-bit",
    sub: "Encryption",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M5 9V7a5 5 0 0110 0v2" stroke="#0EA5E9" strokeWidth="1.4" strokeLinecap="round" />
        <rect x="3" y="9" width="14" height="9" rx="2" stroke="#0EA5E9" strokeWidth="1.4" />
      </svg>
    ),
  },
];

const stats = [
  { value: "< 60s", label: "Average note generation time" },
  { value: "99.2%", label: "Transcription accuracy" },
  { value: "3+ hrs", label: "Saved per clinician per day" },
];

const testimonials = [
  {
    quote: "I used to spend 2 hours after clinic just finishing notes. With VITAL.AI, I'm done before I leave the room.",
    author: "Dr. Priya Menon",
    role: "Family Medicine Physician",
  },
  {
    quote: "The billing suggestions alone have cut our denial rate by nearly a third. It pays for itself.",
    author: "Rahul Shah",
    role: "Practice Administrator, Mumbai Cardiology Centre",
  },
  {
    quote: "Finally an AI that understands dental terminology. The perio charting notes are spot-on.",
    author: "Dr. Anjali Desai",
    role: "Periodontist",
  },
];

export default function VitalTrust() {
  return (
    <section id="trust" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 space-y-20">

        {/* Compliance badges */}
        <div className="text-center space-y-10">
          <div className="space-y-3">
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ color: "#0EA5E9", backgroundColor: "rgba(14,165,233,0.08)" }}
            >
              Compliance
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Compliance built in,{" "}
              <span style={{ color: "#0EA5E9" }}>not bolted on.</span>
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto text-base">
              VITAL.AI was designed with healthcare data governance at its core —
              so your practice stays protected without extra configuration.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {badges.map((b) => (
              <div
                key={b.label}
                className="flex items-center gap-3 px-5 py-3 rounded-2xl border"
                style={{ borderColor: "rgba(14,165,233,0.25)", backgroundColor: "rgba(14,165,233,0.04)" }}
              >
                {b.icon}
                <div className="text-left">
                  <p className="text-sm font-bold text-gray-900">{b.label}</p>
                  <p className="text-xs text-gray-400">{b.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div
          className="rounded-3xl p-10 grid md:grid-cols-3 gap-8 text-center"
          style={{ backgroundColor: "#0A1628" }}
        >
          {stats.map((s) => (
            <div key={s.label} className="space-y-2">
              <p className="text-4xl font-bold text-white">{s.value}</p>
              <p className="text-sm text-white/50">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">Clinicians who've made the switch</h3>
            <p className="text-gray-400 text-sm">Early access feedback from practices across India</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.author}
                className="rounded-2xl p-6 border border-gray-100"
                style={{ backgroundColor: "#F8FAFC" }}
              >
                <svg width="28" height="20" viewBox="0 0 28 20" fill="none" className="mb-4 opacity-20">
                  <path d="M0 20V12C0 5.373 3.627 1.493 10.88 0l1.12 2C8.72 3.093 6.667 5.44 6 9h6v11H0zm16 0V12c0-6.627 3.627-10.507 10.88-12L28 2c-3.28 1.093-5.333 3.44-6 7h6v11H16z" fill="#0EA5E9" />
                </svg>
                <p className="text-sm text-gray-700 leading-relaxed mb-5 italic">"{t.quote}"</p>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.author}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
