import { motion } from "framer-motion";
import { EcgLine, EveningTimeline } from "./art";

const stats = [
  { value: "< 60s", label: "Average note generation time" },
  { value: "99.2%", label: "Transcription accuracy" },
  { value: "3+ hrs", label: "Saved per clinician per day" },
];

export default function VitalEvening() {
  return (
    <section className="relative overflow-hidden bg-vt-deep py-20 text-white sm:py-28">
      <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-vt-teal/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-vt-blue/30 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-vt-aqua">Your evening, back</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-[2.6rem] sm:leading-tight">
            Finish the note before the patient leaves the room.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/65">
            The hours after clinic used to belong to paperwork. With Vital, each note is done during the visit it
            belongs to.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mt-10 overflow-x-auto rounded-[28px] bg-white p-5 sm:p-8"
        >
          <div className="min-w-[560px]">
            <EveningTimeline />
          </div>
        </motion.div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-[24px] border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <p className="text-4xl font-extrabold tracking-tight">{s.value}</p>
              <EcgLine className="my-3 h-5 w-28" color="#5FD4C8" width={2} />
              <p className="text-sm font-semibold text-white/60">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
