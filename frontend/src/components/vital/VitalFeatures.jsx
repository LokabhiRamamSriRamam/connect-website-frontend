import React from "react";

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="4" width="20" height="20" rx="4" stroke="#0EA5E9" strokeWidth="1.5" />
        <path d="M8 14h3l2-5 3 10 2-5h2" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    tag: "Scribe",
    headline: "Dictate naturally, document perfectly.",
    body: "VITAL.AI listens to your consultation in real time and generates structured SOAP notes, discharge summaries, and referral letters — in your own clinical voice.",
    bullets: ["Real-time transcription", "SOAP, DAP, BIRP templates", "Auto-structured for EHR upload"],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="9" stroke="#0EA5E9" strokeWidth="1.5" />
        <path d="M10 14l3 3 5-6" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    tag: "Intake & Triage",
    headline: "From first contact to first visit.",
    body: "Intelligent patient intake forms collect symptoms, history, and vitals before the appointment — so your team arrives informed and the consultation starts faster.",
    bullets: ["Pre-visit symptom collection", "Smart triage routing", "Automated follow-up reminders"],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="5" y="7" width="18" height="14" rx="3" stroke="#0EA5E9" strokeWidth="1.5" />
        <path d="M9 12h4M9 16h7" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M17 7V5" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M11 7V5" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    tag: "Billing & Coding",
    headline: "Capture every billable moment.",
    body: "VITAL.AI automatically suggests ICD-10 and CPT codes from the clinical note — reducing claim denials, speeding up reimbursements, and ensuring nothing slips through.",
    bullets: ["ICD-10 / CPT auto-suggestion", "Claim pre-validation", "Denial prevention alerts"],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M6 20c0-4 3-7 8-7s8 3 8 7" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="14" cy="9" r="4" stroke="#0EA5E9" strokeWidth="1.5" />
        <path d="M20 13l2 2-4 4" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    tag: "EHR Integration",
    headline: "Push notes where they belong.",
    body: "VITAL.AI connects to major EHR systems so completed notes, codes, and intake data flow directly into patient records — no copy-pasting, no manual re-entry.",
    bullets: ["Works with Epic, Cerner & more", "One-click sync to patient chart", "Custom field mapping"],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="8" width="20" height="13" rx="3" stroke="#0EA5E9" strokeWidth="1.5" />
        <path d="M10 8V6a4 4 0 018 0v2" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="14" cy="15" r="2" fill="#0EA5E9" />
      </svg>
    ),
    tag: "Clinical Decision Support",
    headline: "Evidence at the point of care.",
    body: "Surface relevant drug interactions, dosing guidelines, and differential diagnoses without leaving the encounter — backed by curated clinical knowledge.",
    bullets: ["Drug interaction alerts", "Differential diagnosis hints", "Evidence-based guidelines"],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z" stroke="#0EA5E9" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    tag: "Practice Analytics",
    headline: "See what drives your practice.",
    body: "Dashboards built for clinicians and administrators — track patient volumes, documentation time, billing performance, and outcome trends in one place.",
    bullets: ["Revenue & denial dashboards", "Clinician time analytics", "Patient outcome trends"],
  },
];

export default function VitalFeatures() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <span
            className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ color: "#0EA5E9", backgroundColor: "rgba(14,165,233,0.08)" }}
          >
            Platform
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Everything a practice needs.<br />
            <span style={{ color: "#0EA5E9" }}>Nothing it doesn't.</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
            VITAL.AI covers the full clinical workflow — from the moment a patient books to the
            moment the claim is filed.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.tag}
              className="group rounded-2xl p-6 border border-gray-100 hover:border-sky-200 hover:shadow-lg transition-all duration-200"
              style={{ backgroundColor: "#F8FAFC" }}
            >
              <div className="mb-4">{f.icon}</div>
              <span
                className="inline-block text-xs font-semibold uppercase tracking-wider mb-2 px-2 py-0.5 rounded"
                style={{ color: "#0EA5E9", backgroundColor: "rgba(14,165,233,0.08)" }}
              >
                {f.tag}
              </span>
              <h3 className="text-base font-bold text-gray-900 mb-2">{f.headline}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{f.body}</p>
              <ul className="space-y-1.5">
                {f.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-xs text-gray-500">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5 shrink-0">
                      <circle cx="7" cy="7" r="6" fill="rgba(14,165,233,0.12)" />
                      <path d="M4.5 7l2 2 3-3" stroke="#0EA5E9" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
