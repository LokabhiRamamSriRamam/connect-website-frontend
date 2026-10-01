import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SceneAssess, SceneInteract, SceneLink, SceneTranscribe, SceneView, STEP_COLORS, StepIcon } from "./art";

const STEPS = [
  {
    k: "V",
    word: "View",
    title: "View and select template",
    body: "Pick the note you need — SOAP, DAP, BIRP, a discharge summary or a referral letter — or your specialty's own template.",
    Scene: SceneView,
  },
  {
    k: "I",
    word: "Interact",
    title: "Interact and dictate",
    body: "Talk to your patient the way you always do, in the language you consult in. Vital listens in the background.",
    Scene: SceneInteract,
  },
  {
    k: "T",
    word: "Transcribe",
    title: "Transcribe",
    body: "The conversation becomes a structured note in under a minute, with every finding in the right section.",
    Scene: SceneTranscribe,
  },
  {
    k: "A",
    word: "Assess",
    title: "Assess and review",
    body: "Read the draft, change any line and sign it off. You stay in charge of what goes into the record.",
    Scene: SceneAssess,
  },
  {
    k: "L",
    word: "Link",
    title: "Link, share and archive",
    body: "Send the note to the patient record, share it with the patient or a referring doctor, and keep it archived.",
    Scene: SceneLink,
  },
];

const STEP_MS = 7000;

export default function VitalWorkflow() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    if (paused || pinned) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % STEPS.length), STEP_MS);
    return () => clearTimeout(t);
  }, [active, paused, pinned]);

  const choose = (i) => {
    setActive(i);
    setPinned(true);
  };

  const step = STEPS[active];

  return (
    <section id="workflow" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-vt-teal">The V·I·T·A·L workflow</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-vt-ink sm:text-[2.6rem] sm:leading-tight">
            Five steps. One finished note.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-vt-slate">
            From choosing a template to filing the record — how a consultation becomes documentation without you
            typing it.
          </p>
        </div>

        {/* letter rail */}
        <div className="mt-12 flex justify-center gap-2 sm:gap-3" role="tablist" aria-label="Workflow steps">
          {STEPS.map((s, i) => (
            <button
              key={s.k}
              role="tab"
              aria-selected={i === active}
              aria-controls="vt-step-panel"
              onClick={() => choose(i)}
              className={`group flex flex-col items-center gap-1.5 rounded-2xl px-2 py-2 transition sm:px-4 ${
                i === active ? "bg-vt-mist" : "hover:bg-vt-mist/60"
              }`}
            >
              <span
                className="flex h-12 w-12 items-center justify-center rounded-full text-xl font-extrabold text-white transition-transform sm:h-14 sm:w-14 sm:text-2xl"
                style={{
                  background: STEP_COLORS[s.k],
                  transform: i === active ? "scale(1.08)" : "scale(1)",
                  opacity: i === active ? 1 : 0.55,
                }}
              >
                {s.k}
              </span>
              <span className={`text-[11px] font-extrabold sm:text-xs ${i === active ? "text-vt-navy" : "text-vt-muted"}`}>
                {s.word}
              </span>
            </button>
          ))}
        </div>

        <div
          id="vt-step-panel"
          role="tabpanel"
          className="mt-8 grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={step.k}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.35 }}
              className="order-2 lg:order-1"
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-2xl text-white"
                  style={{ background: STEP_COLORS[step.k] }}
                >
                  <StepIcon letter={step.k} />
                </span>
                <span className="text-sm font-extrabold uppercase tracking-[0.16em] text-vt-muted">
                  Step {active + 1} of {STEPS.length}
                </span>
              </div>
              <h3 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-vt-ink sm:text-3xl">
                <span style={{ color: STEP_COLORS[step.k] }}>{step.title.charAt(0)}</span>
                {step.title.slice(1)}
              </h3>
              <p className="mt-3 text-lg leading-relaxed text-vt-slate">{step.body}</p>

              <div className="mt-7 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-vt-mist">
                {!pinned && (
                  <div
                    key={`${active}-${paused}`}
                    className="vt-progress h-full rounded-full bg-vt-gradient"
                    style={{ animationDuration: `${STEP_MS}ms`, animationPlayState: paused ? "paused" : "running" }}
                  />
                )}
              </div>
              <div className="mt-5 flex gap-2">
                <button
                  onClick={() => choose((active + STEPS.length - 1) % STEPS.length)}
                  className="rounded-full border-2 border-vt-line px-4 py-2 text-sm font-extrabold text-vt-navy transition hover:border-vt-navy"
                  aria-label="Previous step"
                >
                  ←
                </button>
                <button
                  onClick={() => choose((active + 1) % STEPS.length)}
                  className="rounded-full bg-vt-navy px-5 py-2 text-sm font-extrabold text-white transition hover:bg-vt-blue"
                >
                  Next: {STEPS[(active + 1) % STEPS.length].word} →
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="order-1 overflow-hidden rounded-[32px] border border-vt-line bg-gradient-to-br from-vt-mint via-white to-vt-sky p-3 sm:p-5 lg:order-2">
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
          </div>
        </div>
      </div>
    </section>
  );
}
