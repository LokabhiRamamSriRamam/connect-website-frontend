import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { TESTIMONIALS } from "./content";
import * as Art from "./illustrations/testimonials";
import { Sparkle } from "./Decor";

/* How long each side of a story stays up before flipping, and how long a manual pick holds. */
const STAGE_MS = { before: 4000, now: 7500 };
const HOLD_MS = 12000;

/* Big quote mark. */
function QuoteMark({ className = "" }) {
  return (
    <svg viewBox="0 0 48 40" className={className} aria-hidden="true">
      <path
        d="M4 38V24C4 12 10 4 20 2l2 6c-6 2-9 6-9 12h8v18zm24 0V24c0-12 6-20 16-22l2 6c-6 2-9 6-9 12h8v18z"
        fill="#914BFA"
        stroke="#191919"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Before / Now switch that sits on the scene. */
function ModeToggle({ mode, onChange, name }) {
  return (
    <div
      role="group"
      aria-label={`${name}: show before or now`}
      className="absolute left-3 top-3 z-10 flex rounded-full border-2 border-sb-ink bg-white p-1 shadow-[3px_3px_0_#191919]"
    >
      {[
        ["before", "Before"],
        ["now", "Now"],
      ].map(([value, label]) => (
        <button
          key={value}
          type="button"
          aria-pressed={mode === value}
          onClick={() => onChange(value)}
          className={`relative rounded-full px-3.5 py-1 font-manrope text-xs font-extrabold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sb-violet ${
            mode === value ? "text-white" : "text-sb-ink hover:text-sb-violet"
          }`}
        >
          {mode === value && (
            <motion.span
              layoutId={`tt-pill-${name}`}
              className={`absolute inset-0 rounded-full ${value === "now" ? "bg-sb-gradient" : "bg-sb-ink"}`}
              transition={{ type: "spring", stiffness: 420, damping: 32 }}
            />
          )}
          <span className="relative">{label}</span>
        </button>
      ))}
    </div>
  );
}

function TestimonialCard({ t, index }) {
  const Scene = Art[t.art];
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [mode, setMode] = useState("before");
  const [held, setHeld] = useState(false);

  // Loop Before ⇄ Now while the card is on screen. Slightly different periods per card keep them out of sync.
  const wait = STAGE_MS[mode] + index * 400;
  const auto = inView && !held && !reduce;
  useEffect(() => {
    if (reduce) {
      setMode("now");
      return;
    }
    if (!auto) return;
    const id = setTimeout(() => setMode((m) => (m === "before" ? "now" : "before")), wait);
    return () => clearTimeout(id);
  }, [auto, wait, reduce]);

  // Picking a side by hand holds it for a while, then the loop resumes.
  useEffect(() => {
    if (!held) return;
    const id = setTimeout(() => setHeld(false), HOLD_MS);
    return () => clearTimeout(id);
  }, [held, mode]);

  const choose = (m) => {
    setMode(m);
    setHeld(true);
  };

  // Gentle tilt toward the cursor (mouse only).
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [5, -5]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-5, 5]), { stiffness: 200, damping: 20 });
  const onMove = (e) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  const [pre, mark, post] = t.headline;

  return (
    <motion.article
      ref={ref}
      id={`testimonial-${t.slug}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 160, damping: 20 }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="sb-tt-card group relative flex h-full flex-col overflow-hidden rounded-[28px] border-2 border-sb-ink bg-white shadow-[6px_6px_0_#191919] transition-shadow duration-300 hover:shadow-[10px_10px_0_#914BFA]"
    >
      {/* scene */}
      <div className="relative m-2 mb-0 aspect-[4/3] overflow-hidden rounded-[22px] bg-gradient-to-br from-sb-lavender via-white to-sb-ivory">
        <ModeToggle mode={mode} onChange={choose} name={t.slug} />
        <span className="absolute right-3 top-3 z-10 rounded-full bg-sb-ink px-3 py-1 font-manrope text-[11px] font-extrabold uppercase tracking-[0.14em] text-white">
          {t.segment}
        </span>
        <div className="absolute inset-0 px-2 pb-3 pt-12">
          <Scene mode={mode} />
        </div>
        {/* time until the next automatic flip */}
        {auto && (
          <motion.span
            key={mode}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: wait / 1000, ease: "linear" }}
            className={`absolute inset-x-0 bottom-0 h-1 origin-left ${mode === "now" ? "bg-sb-gradient" : "bg-sb-ink"}`}
          />
        )}
      </div>

      <QuoteMark className="sb-tt-quote relative z-10 -mt-5 ml-auto mr-6 h-10 w-12" />

      {/* words */}
      <div className="flex flex-1 flex-col px-6 pt-1">
        <blockquote className="flex flex-1 flex-col gap-3">
          <p className="font-manrope text-xl font-extrabold leading-snug tracking-tight text-sb-ink">
            “{pre}
            <span className="sb-mark">{mark}</span>
            {post}”
          </p>
          <p className="font-manrope text-[15px] leading-relaxed text-sb-slate">“{t.body}”</p>
        </blockquote>

        {/* attribution + large cut-out portrait standing on the card's bottom edge */}
        <footer className="-mr-6 mt-3 flex items-end gap-3 font-manrope">
          <div className="min-w-0 flex-1 pb-6 pt-4">
            <div className="flex flex-wrap gap-2">
              {t.stats.map((s) => (
                <span key={s} className="rounded-full border border-sb-violet/30 bg-sb-lilac px-3 py-1 text-xs font-extrabold text-sb-indigo">
                  {s}
                </span>
              ))}
            </div>
            <p className="mt-4 text-lg font-extrabold text-sb-ink">{t.name}</p>
            <p className="text-sm font-semibold text-sb-slate">
              {t.role}, <span className="text-sb-violet">{t.company}</span>
            </p>
          </div>
          <div className="relative mt-4 h-40 w-40 shrink-0 self-end sm:h-44 sm:w-44">
            <div className="absolute inset-x-2 bottom-0 top-6 rounded-t-full border-2 border-b-0 border-sb-ink bg-sb-gradient" />
            <img
              src={t.photo}
              alt={t.name}
              width="176"
              height="176"
              loading="lazy"
              className="sb-tt-face relative h-full w-full object-contain object-bottom"
            />
          </div>
        </footer>
      </div>
    </motion.article>
  );
}

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative overflow-hidden bg-sb-cream py-20 sm:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-3xl text-center">
          <Sparkle size={26} color="#914BFA" className="absolute -top-6 right-6" />
          <Sparkle size={16} color="#F5C542" delay={0.8} className="absolute left-2 top-16" />
          <span className="inline-flex rounded-full border-2 border-sb-ink bg-sb-gold px-4 py-1.5 font-manrope text-xs font-extrabold uppercase tracking-[0.2em] text-sb-ink shadow-[3px_3px_0_#191919]">
            From businesses like yours
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            className="mt-6 font-manrope text-4xl font-extrabold leading-tight tracking-tight text-sb-ink sm:text-6xl"
          >
            Don’t take our word for it.
            <br />
            <span className="sb-gradient-text">Take theirs.</span>
          </motion.h2>
          <p className="mx-auto mt-6 max-w-2xl font-manrope text-lg font-semibold text-sb-slate sm:text-xl">
            A store owner, an office manager and a café founder on what changed once their screens were connected.
          </p>
          <div className="mt-4 hidden items-center justify-center gap-2 font-manrope text-sm font-bold text-sb-violet sm:flex">
            <Sparkle size={14} color="#914BFA" />
            Watch each story go from Before to Now
            <Sparkle size={14} color="#914BFA" delay={0.6} />
          </div>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.slug} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
