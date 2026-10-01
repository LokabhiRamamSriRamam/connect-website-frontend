import { motion } from "framer-motion";
import { ToothChartNote } from "./art";

const points = [
  { title: "Real-time transcription", desc: "Speech becomes a structured note in seconds — no typing, no delay." },
  { title: "ICD & procedure codes", desc: "The right codes are assigned to every procedure you document." },
  { title: "Compliance-ready records", desc: "Every note timestamped, structured and ready for audit." },
  { title: "English & Hindi", desc: "Full Hinglish support — speak naturally, get professional notes." },
];

export default function MolarisScribe() {
  return (
    <section id="scribe" className="relative scroll-mt-24 overflow-hidden bg-mo-night py-20 text-white sm:py-28">
      <div className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-mo-cyan/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-mo-coral/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="order-2 lg:order-1"
        >
          <div className="aspect-[7/5]">
            <ToothChartNote />
          </div>
        </motion.div>

        <div className="order-1 lg:order-2">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-mo-aqua">Molaris dental transcriber</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-[2.5rem] sm:leading-tight">
            Say “tooth 26”. The chart and the note fill themselves.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/65">
            Molaris listens to every patient–dentist conversation and turns it into structured clinical notes, procedure
            codes and consent records. Instantly. Accurately.
          </p>
          <ul className="mt-8 space-y-4">
            {points.map((p) => (
              <li key={p.title} className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mo-cyan">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2.5 6l2.2 2.2L9.5 3.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>
                  <span className="block font-extrabold">{p.title}</span>
                  <span className="block text-sm text-white/60">{p.desc}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
