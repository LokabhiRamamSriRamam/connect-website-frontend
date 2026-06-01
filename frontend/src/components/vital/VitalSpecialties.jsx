import React from "react";

const specialties = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2a5 5 0 015 5v2a5 5 0 01-10 0V7a5 5 0 015-5z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 22c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    name: "Family Medicine",
    note: "SOAP · Chronic disease · Preventive",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 21C7 17 3 13.5 3 9a5 5 0 0110 0 5 5 0 0110 0c0 4.5-4 8-9 12z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    name: "Cardiology",
    note: "Echo reports · Stress tests · Telemetry",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 21v-1a6 6 0 0112 0v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M9 11l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    name: "Pediatrics",
    note: "Growth charts · Vaccination · Milestones",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="11" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    name: "Mental Health",
    note: "DAP · BIRP · Progress notes",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 3v18M9 6h6M8 10h8M9 14h6M10 18h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    name: "Dentistry",
    note: "Perio charts · Treatment plans · X-rays",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    name: "Dermatology",
    note: "Lesion mapping · Biopsy notes · Photos",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    name: "Orthopedics",
    note: "Surgical notes · Rehab plans · Imaging",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="12" rx="9" ry="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <path d="M3 12c0 4 4 7 9 7s9-3 9-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    name: "OB/GYN",
    note: "Prenatal records · Delivery notes · Cycles",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M4 6h16M4 12h10M4 18h13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    name: "Internal Medicine",
    note: "Complex histories · Multi-system notes",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="9" cy="10" r="1" fill="currentColor" />
        <circle cx="15" cy="10" r="1" fill="currentColor" />
      </svg>
    ),
    name: "Veterinary",
    note: "Species templates · Drug dosing · SOAP",
  },
];

export default function VitalSpecialties() {
  return (
    <section id="specialties" style={{ backgroundColor: "#0A1628" }} className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14 space-y-4">
          <span
            className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ color: "#0EA5E9", backgroundColor: "rgba(14,165,233,0.1)" }}
          >
            Specialties
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Built for every specialty,{" "}
            <span style={{ color: "#0EA5E9" }}>not just primary care.</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-base leading-relaxed">
            VITAL.AI comes with specialty-specific templates, terminology, and workflows
            out of the box — tailored to how each practice actually works.
          </p>
        </div>

        {/* Specialty grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {specialties.map((s) => (
            <div
              key={s.name}
              className="group rounded-xl p-4 cursor-default transition-all duration-200 hover:scale-[1.02]"
              style={{
                backgroundColor: "rgba(14,165,233,0.05)",
                border: "1px solid rgba(14,165,233,0.12)",
              }}
            >
              <div className="text-white/60 group-hover:text-sky-400 mb-3 transition-colors">
                {s.icon}
              </div>
              <p className="text-sm font-semibold text-white">{s.name}</p>
              <p className="text-xs text-white/35 mt-1 leading-relaxed">{s.note}</p>
              <div
                className="mt-3 inline-block text-xs px-2 py-0.5 rounded-full"
                style={{ backgroundColor: "rgba(14,165,233,0.12)", color: "#0EA5E9" }}
              >
                Templates ready
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-white/40 text-sm">
            Don't see your specialty?{" "}
            <a href="/get-in-touch" style={{ color: "#0EA5E9" }} className="hover:underline">
              Request custom templates →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
