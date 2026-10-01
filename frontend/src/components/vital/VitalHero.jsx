import { motion } from "framer-motion";
import { EcgLine, HeroOrbit } from "./art";

export const TRIAL_URL = "https://vital-ai.connectgenai.in";

// Pre-selects "Vital.AI" on the contact form (field name must match get-in-touch.jsx).
export const VITAL_DEMO_URL = "/get-in-touch?service=" + encodeURIComponent("Vital.AI");

const STATS = [
  { val: "< 60s", label: "Note generation" },
  { val: "3+ hrs", label: "Saved daily" },
  { val: "HIPAA", label: "Compliant" },
];

export function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function VitalHero() {
  return (
    <section className="vt-grid-bg relative overflow-hidden pb-16 pt-32 sm:pt-36 lg:pb-24">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-vt-mint blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-vt-sky blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-7"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-vt-line bg-white px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-vt-navy">
            <span className="h-2 w-2 animate-pulse rounded-full bg-vt-teal" />
            Medical transcriber
          </span>

          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-vt-ink sm:text-5xl lg:text-[3.6rem]">
            Because your best work happens <span className="vt-gradient-text">beyond</span>{" "}
            <span className="relative inline-block">
              <span className="vt-gradient-text">documentation.</span>
              <EcgLine className="absolute -bottom-3 left-0 h-4 w-full" />
            </span>
          </h1>

          <p className="max-w-lg text-lg leading-relaxed text-vt-slate">
            Vital listens to the consultation, writes the note in your template and files it where it belongs — so you
            can look at your patient, not your screen.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={TRIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-vt-gradient px-7 py-3.5 text-sm font-extrabold text-white shadow-[0_18px_36px_-16px_rgba(11,43,92,0.7)] transition-transform hover:-translate-y-0.5"
            >
              Start 14 Day Free Trial <Arrow />
            </a>
            <a
              href={VITAL_DEMO_URL}
              className="inline-flex items-center gap-2 rounded-full border-2 border-vt-navy bg-white px-7 py-3.5 text-sm font-extrabold text-vt-navy transition-colors hover:bg-vt-navy hover:text-white"
            >
              Book a Free Demo
            </a>
          </div>

          <dl className="flex flex-wrap gap-3 pt-1">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-2xl border border-vt-line bg-white/80 px-4 py-2.5 backdrop-blur">
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-lg font-extrabold text-vt-navy">{s.val}</dd>
                <dd className="text-xs font-semibold text-vt-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-[560px]"
        >
          <HeroOrbit />
        </motion.div>
      </div>
    </section>
  );
}
