import { useState } from "react";
import { motion } from "framer-motion";
import { ToothMark } from "./art";

const ROWS = [
  { feature: "Patient booking (WhatsApp + web)", us: true, others: false },
  { feature: "Chairside clinical notes (Molaris transcriber)", us: true, others: false },
  { feature: "Automated post-visit care messages", us: true, others: false },
  { feature: "Reputation & review automation", us: true, others: false },
  { feature: "Real-time revenue analytics", us: true, others: true },
  { feature: "Appointment reminders", us: true, others: true },
  { feature: "Patient record management", us: true, others: true },
  { feature: "WhatsApp-native interface", us: true, others: false },
  { feature: "Hinglish / regional language support", us: true, others: false },
  { feature: "Setup in under 48 hours", us: true, others: false },
];

function Yes({ muted = false }) {
  return (
    <span className={`mo-tick flex h-7 w-7 items-center justify-center rounded-full ${muted ? "bg-mo-line" : "bg-mo-cyan"}`}>
      <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-label="Yes">
        <path d="M2.5 6l2.2 2.2L9.5 3.5" stroke={muted ? "#64748B" : "#fff"} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function No() {
  return (
    <span className="mo-tick flex h-7 w-7 items-center justify-center rounded-full bg-mo-blush">
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-label="No">
        <path d="M3 3l6 6M9 3l-6 6" stroke="#FF7A8A" strokeWidth="1.9" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function Row({ row, striped }) {
  const [seen, setSeen] = useState(false);
  return (
    <motion.div
      viewport={{ once: true, margin: "-40px" }}
      onViewportEnter={() => setSeen(true)}
      className={`grid grid-cols-[1fr_88px_88px] items-center border-b border-mo-line px-4 py-3.5 last:border-0 sm:grid-cols-[1fr_140px_140px] sm:px-6 ${
        striped ? "bg-mo-mist/60" : "bg-white"
      } ${seen ? "mo-row-in" : ""}`}
    >
      <span className="text-sm font-semibold text-mo-ink sm:text-[15px]">{row.feature}</span>
      <span className="flex justify-center">{row.us ? <Yes /> : <No />}</span>
      <span className="flex justify-center">{row.others ? <Yes muted /> : <No />}</span>
    </motion.div>
  );
}

export default function MolarisCompare() {
  return (
    <section id="compare" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-mo-cyan">Why clinics choose Molaris</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-mo-ink sm:text-[2.6rem] sm:leading-tight">
            Not just software. <span className="mo-gradient-text">A growth system for your clinic.</span>
          </h2>
        </div>

        <div className="mt-12 overflow-hidden rounded-[28px] border border-mo-line bg-white">
          <div className="grid grid-cols-[1fr_88px_88px] items-center bg-mo-night px-4 py-4 text-sm font-extrabold text-white sm:grid-cols-[1fr_140px_140px] sm:px-6">
            <span className="text-white/60">Feature</span>
            <span className="flex items-center justify-center gap-2">
              <svg viewBox="0 0 100 100" className="h-6 w-6" aria-hidden="true">
                <ToothMark size={100} tone="light" />
              </svg>
              <span className="hidden sm:inline">Molaris</span>
            </span>
            <span className="text-center text-white/50">Others</span>
          </div>
          {ROWS.map((r, i) => (
            <Row key={r.feature} row={r} striped={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
