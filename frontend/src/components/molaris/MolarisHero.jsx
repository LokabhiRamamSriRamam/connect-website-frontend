import { motion } from "framer-motion";
import { HeroLoop } from "./art";

export const TRIAL_URL = "https://molaris-ai.connectgenai.in";

// Pre-selects "Molaris.AI" on the contact form (field name must match get-in-touch.jsx).
export const MOLARIS_DEMO_URL = "/get-in-touch?service=" + encodeURIComponent("Molaris.AI");

const STATS = [
  { value: "200+", label: "Clinics active" },
  { value: "40 min", label: "Saved per day" },
  { value: "4.9 ★", label: "Avg Google rating" },
  { value: "60%", label: "Fewer no-shows" },
];

export function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function MolarisHero() {
  return (
    <section className="mo-pixel-bg relative overflow-hidden pb-16 pt-32 sm:pt-36 lg:pb-24">
      <div className="pointer-events-none absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full bg-mo-ice blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-mo-blush/70 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-7"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-mo-line bg-white px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-mo-navy">
            <span className="h-2 w-2 animate-pulse rounded-full bg-mo-coral" />
            Built by dentists, for dentists
          </span>

          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-mo-ink sm:text-5xl lg:text-[3.6rem]">
            Turn every patient into your clinic's <span className="mo-gradient-text">marketing engine.</span>
          </h1>

          <p className="max-w-lg text-lg leading-relaxed text-mo-slate">
            From the first Google search to the five-star review, Molaris runs the whole patient journey — bookings,
            chairside notes, after-care and reviews — on WhatsApp, in English and Hindi.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={TRIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-mo-gradient px-7 py-3.5 text-sm font-extrabold text-white shadow-[0_18px_36px_-16px_rgba(19,48,126,0.7)] transition-transform hover:-translate-y-0.5"
            >
              Start 14 Day Free Trial <Arrow />
            </a>
            <a
              href={MOLARIS_DEMO_URL}
              className="inline-flex items-center gap-2 rounded-full border-2 border-mo-navy bg-white px-7 py-3.5 text-sm font-extrabold text-mo-navy transition-colors hover:bg-mo-navy hover:text-white"
            >
              Book a Free Demo
            </a>
          </div>

          <dl className="grid grid-cols-2 gap-3 pt-1 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-2xl border border-mo-line bg-white/85 px-4 py-3 backdrop-blur">
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-lg font-extrabold text-mo-navy">{s.value}</dd>
                <dd className="text-xs font-semibold text-mo-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-[540px]"
        >
          <HeroLoop />
        </motion.div>
      </div>
    </section>
  );
}

/** Scrolling strip of what Molaris does. */
export function MolarisTicker() {
  const items = [
    "WhatsApp booking",
    "48h · 24h · 2h reminders",
    "Chairside notes",
    "FDI tooth charting",
    "ICD & procedure codes",
    "Visit summaries",
    "After-care drips",
    "Google review requests",
    "Revenue dashboard",
    "English + Hindi",
  ];
  const row = [...items, ...items];
  return (
    <div className="vt-marquee-wrap overflow-hidden border-y border-mo-line bg-white py-4" aria-label="What Molaris does">
      <div className="vt-marquee gap-3">
        {row.map((t, i) => (
          <span
            key={i}
            aria-hidden={i >= items.length}
            className="flex shrink-0 items-center gap-2 rounded-full bg-mo-mist px-4 py-2 text-sm font-extrabold text-mo-navy"
          >
            <span className={`h-2 w-2 rounded-full ${i % 3 === 0 ? "bg-mo-coral" : i % 3 === 1 ? "bg-mo-cyan" : "bg-mo-royal"}`} />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
