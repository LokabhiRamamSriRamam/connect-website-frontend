import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  JourneyIcon,
  JOURNEY_COLORS,
  SceneBooking,
  SceneCare,
  SceneConsult,
  SceneDiscovery,
  SceneReport,
  SceneReputation,
} from "./art";

const STEPS = [
  {
    k: "discovery",
    label: "Discovery",
    headline: "Patients find you first.",
    body: "When someone searches “dentist near me”, your clinic is the one they see. Molaris keeps your Google rating high and your profile up to date, so new patients choose you before they scroll.",
    stat: "3× more Google visibility",
    Scene: SceneDiscovery,
  },
  {
    k: "booking",
    label: "Booking",
    headline: "Zero-friction booking.",
    body: "Patients book on WhatsApp, your website or Instagram — no phone calls, no hold music. Appointments confirm themselves, with reminders 48 hours, 24 hours and 2 hours before.",
    stat: "60% fewer no-shows",
    Scene: SceneBooking,
  },
  {
    k: "consult",
    label: "Consultation",
    headline: "Molaris in the chair.",
    body: "The dentist speaks, Molaris listens. Every consultation becomes a structured clinical note, treatment plan and procedure codes — so you look at the patient, not the keyboard.",
    stat: "40 min saved per day",
    Scene: SceneConsult,
  },
  {
    k: "report",
    label: "Report",
    headline: "Reports that build trust.",
    body: "Minutes after leaving the chair, patients get a WhatsApp summary: treatment done, next steps, prescriptions and a feedback prompt. Families feel informed. Patients feel cared for.",
    stat: "92% patient satisfaction",
    Scene: SceneReport,
  },
  {
    k: "care",
    label: "After-care",
    headline: "Care doesn't stop at the door.",
    body: "Medication reminders, healing check-ins and next-visit nudges arrive on WhatsApp at exactly the right moment. Patients feel they have a dentist on call.",
    stat: "2.4× higher retention",
    Scene: SceneCare,
  },
  {
    k: "reputation",
    label: "Reviews",
    headline: "Happy patients, glowing reviews.",
    body: "After a successful treatment, patients are asked for a Google review — one tap. Your rating climbs, new patients discover you, and the loop begins again.",
    stat: "4.9★ average rating",
    Scene: SceneReputation,
  },
];

const STEP_MS = 7000;
const R = 78;
const CIRC = 2 * Math.PI * R;
const SEG = CIRC / STEPS.length;

function LoopDial({ active, onPick, running, paused }) {
  const color = JOURNEY_COLORS[STEPS[active].k];
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[260px]">
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <circle cx="100" cy="100" r={R} fill="none" stroke="#DCE8EE" strokeWidth="3" />
        {/* arc travelling from the current stage to the next */}
        {running && (
          <circle
            key={`${active}`}
            cx="100"
            cy="100"
            r={R}
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${SEG} ${CIRC}`}
            transform={`rotate(${-90 + active * 60} 100 100)`}
            className="mo-dial"
            style={{ "--len": `${SEG}px`, animationDuration: `${STEP_MS}ms`, animationPlayState: paused ? "paused" : "running" }}
          />
        )}
      </svg>
      <div className="absolute inset-[28%] flex flex-col items-center justify-center rounded-full bg-white text-center shadow-[0_18px_40px_-20px_rgba(19,48,126,0.45)]">
        <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-mo-muted">Stage</span>
        <span className="text-3xl font-extrabold leading-none" style={{ color }}>
          {active + 1}
          <span className="text-base text-mo-line">/6</span>
        </span>
      </div>
      {STEPS.map((s, i) => {
        const a = ((-90 + i * 60) * Math.PI) / 180;
        const left = 50 + (R / 2) * Math.cos(a);
        const top = 50 + (R / 2) * Math.sin(a);
        const on = i === active;
        return (
          <button
            key={s.k}
            role="tab"
            aria-selected={on}
            aria-label={s.label}
            onClick={() => onPick(i)}
            className="absolute flex h-12 w-12 items-center justify-center rounded-full border-[3px] transition-all duration-300 sm:h-14 sm:w-14"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              borderColor: JOURNEY_COLORS[s.k],
              background: on ? JOURNEY_COLORS[s.k] : "#fff",
              color: on ? "#fff" : JOURNEY_COLORS[s.k],
              transform: `translate(-50%, -50%) scale(${on ? 1.12 : 1})`,
              boxShadow: on ? `0 10px 24px -8px ${JOURNEY_COLORS[s.k]}` : "none",
            }}
          >
            <JourneyIcon name={s.k} size={22} />
          </button>
        );
      })}
    </div>
  );
}

export default function MolarisJourney() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    if (paused || pinned) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % STEPS.length), STEP_MS);
    return () => clearTimeout(t);
  }, [active, paused, pinned]);

  const pick = (i) => {
    setActive(i);
    setPinned(true);
  };
  const step = STEPS[active];
  const color = JOURNEY_COLORS[step.k];

  return (
    <section id="journey" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-mo-cyan">The complete patient journey</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-mo-ink sm:text-[2.6rem] sm:leading-tight">
            A loop that runs itself. <span className="mo-gradient-text">Every patient brings the next one.</span>
          </h2>
        </div>

        <div
          className="mt-12 grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="space-y-8" role="tablist" aria-label="Patient journey stages">
            <LoopDial active={active} onPick={pick} running={!pinned} paused={paused} />

            <AnimatePresence mode="wait">
              <motion.div
                key={step.k}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="text-center lg:text-left"
              >
                <p className="text-xs font-extrabold uppercase tracking-[0.18em]" style={{ color }}>
                  {step.label}
                </p>
                <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-mo-ink sm:text-3xl">{step.headline}</h3>
                <p className="mt-3 text-[16.5px] leading-relaxed text-mo-slate">{step.body}</p>
                <p
                  className="mt-5 inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-extrabold"
                  style={{ background: `${color}14`, color }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M2 11l4-4 3 3 5-6M10 4h4v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {step.stat}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div
            id="mo-stage-panel"
            role="tabpanel"
            className="overflow-hidden rounded-[32px] border border-mo-line bg-gradient-to-br from-mo-ice via-white to-mo-blush/60 p-3 sm:p-5"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={step.k}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35 }}
                className="aspect-[4/3]"
              >
                <step.Scene />
              </motion.div>
            </AnimatePresence>
            <div className="mt-3 flex justify-center gap-1.5">
              {STEPS.map((s, i) => (
                <button
                  key={s.k}
                  onClick={() => pick(i)}
                  aria-label={`Show ${s.label}`}
                  className="h-2 rounded-full transition-all"
                  style={{ width: i === active ? 28 : 8, background: i === active ? color : "#DCE8EE" }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
