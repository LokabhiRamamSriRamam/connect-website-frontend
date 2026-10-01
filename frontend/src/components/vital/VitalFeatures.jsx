import { motion } from "framer-motion";
import { ArtAnalytics, ArtBilling, ArtCds, ArtEhr, ArtIntake, ArtScribe } from "./art";

const features = [
  {
    Art: ArtScribe,
    tag: "Scribe",
    headline: "Dictate naturally, document perfectly.",
    body: "Vital listens to your consultation in real time and writes structured SOAP notes, discharge summaries and referral letters — in your own clinical voice.",
    bullets: ["Real-time transcription", "SOAP, DAP, BIRP templates", "Auto-structured for EHR upload"],
    wide: true,
  },
  {
    Art: ArtIntake,
    tag: "Intake & Triage",
    headline: "From first contact to first visit.",
    body: "Patient intake forms collect symptoms, history and vitals before the appointment, so your team arrives informed.",
    bullets: ["Pre-visit symptom collection", "Smart triage routing", "Automated follow-up reminders"],
  },
  {
    Art: ArtBilling,
    tag: "Billing & Coding",
    headline: "Capture every billable moment.",
    body: "ICD-10 and CPT codes are suggested from the clinical note — fewer claim denials, faster reimbursement.",
    bullets: ["ICD-10 / CPT auto-suggestion", "Claim pre-validation", "Denial prevention alerts"],
  },
  {
    Art: ArtEhr,
    tag: "EHR Integration",
    headline: "Push notes where they belong.",
    body: "Completed notes, codes and intake data flow straight into patient records — no copy-pasting, no re-entry.",
    bullets: ["Works with Epic, Cerner & more", "One-click sync to patient chart", "Custom field mapping"],
    wide: true,
  },
  {
    Art: ArtCds,
    tag: "Clinical Decision Support",
    headline: "Evidence at the point of care.",
    body: "Drug interactions, dosing guidelines and differential diagnoses surface without leaving the encounter.",
    bullets: ["Drug interaction alerts", "Differential diagnosis hints", "Evidence-based guidelines"],
  },
  {
    Art: ArtAnalytics,
    tag: "Practice Analytics",
    headline: "See what drives your practice.",
    body: "Patient volumes, documentation time, billing performance and outcome trends in one place.",
    bullets: ["Revenue & denial dashboards", "Clinician time analytics", "Patient outcome trends"],
    wide: true,
  },
];

function Tick() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0" aria-hidden="true">
      <circle cx="8" cy="8" r="7" fill="#E7F7F4" />
      <path d="M5 8l2 2 4-4" stroke="#0FB2A4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function VitalFeatures() {
  return (
    <section id="features" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-vt-teal">Platform</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-vt-ink sm:text-[2.6rem] sm:leading-tight">
              Everything a practice needs. <span className="vt-gradient-text">Nothing it doesn't.</span>
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-vt-slate">
            Vital covers the full clinical workflow — from the moment a patient books to the moment the claim is filed.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.article
              key={f.tag}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className={`group flex flex-col overflow-hidden rounded-[28px] border border-vt-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_56px_-28px_rgba(11,43,92,0.45)] ${
                f.wide ? "lg:col-span-2 lg:flex-row" : ""
              }`}
            >
              <div
                className={`m-2 overflow-hidden rounded-[22px] bg-gradient-to-br from-vt-mist via-white to-vt-mint p-3 ${
                  f.wide ? "aspect-[16/9] lg:mr-0 lg:aspect-[4/3] lg:w-[50%] lg:self-center" : "aspect-[16/9]"
                }`}
              >
                <div className="h-full w-full transition-transform duration-500 group-hover:scale-[1.04]">
                  <f.Art />
                </div>
              </div>
              <div className={`flex flex-1 flex-col px-6 pb-6 pt-4 ${f.wide ? "lg:justify-center lg:p-8" : ""}`}>
                <span className="w-fit rounded-full bg-vt-sky px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.14em] text-vt-blue">
                  {f.tag}
                </span>
                <h3 className="mt-3 text-xl font-extrabold leading-snug tracking-tight text-vt-ink">{f.headline}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-vt-slate">{f.body}</p>
                <ul className="mt-4 space-y-1.5">
                  {f.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm font-semibold text-vt-ink/80">
                      <Tick />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
