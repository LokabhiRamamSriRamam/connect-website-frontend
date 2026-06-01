import React from "react";

export default function VitalCTA() {
  return (
    <section
      className="relative py-32 overflow-hidden"
      style={{ backgroundColor: "#0A1628" }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(14,165,233,0.1) 0%, transparent 70%)",
        }}
      />

      {/* Horizontal rule glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(14,165,233,0.5), transparent)" }}
      />

      <div className="relative max-w-3xl mx-auto px-6 text-center space-y-8">
        {/* Pulse icon */}
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mx-auto mb-2"
          style={{ backgroundColor: "rgba(14,165,233,0.12)", border: "1px solid rgba(14,165,233,0.25)" }}
        >
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <polyline
              points="3,15 7,15 9,7 13,23 17,10 19,18 21,15 27,15"
              stroke="#0EA5E9"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
          Your patients deserve<br />
          <span style={{ color: "#0EA5E9" }}>your full attention.</span>
        </h2>

        <p className="text-white/50 text-lg leading-relaxed max-w-xl mx-auto">
          Let VITAL.AI handle the paperwork. Join hundreds of clinicians already saving
          hours every week on documentation, coding, and admin.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href="/get-in-touch"
            style={{ backgroundColor: "#0EA5E9" }}
            className="inline-flex items-center gap-2 text-white font-semibold px-8 py-4 rounded-full hover:opacity-90 transition-opacity text-sm"
          >
            Get Early Access — It's Free
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="/get-in-touch"
            className="inline-flex items-center gap-2 text-white/60 font-medium px-8 py-4 rounded-full border border-white/15 hover:border-white/30 hover:text-white transition-all text-sm"
          >
            Talk to our team
          </a>
        </div>

        <p className="text-white/25 text-xs pt-2">
          No credit card required · HIPAA compliant · Cancel any time
        </p>
      </div>

      {/* Bottom rule glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(14,165,233,0.5), transparent)" }}
      />
    </section>
  );
}
