import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Dumbbell, Sunrise, MoonStar, Check, Flame } from "lucide-react";
import SignageChrome from "./SignageChrome";
import WhatsAppIcon from "../../components/WhatsAppIcon";
import { waLink } from "../../lib/whatsapp";
import { getIndustry } from "../../components/screenbazaar/content";
import { GymScene, DumbbellSticker, BoltSticker, BottleSticker, StopwatchSticker, FITNESS_ICONS } from "./art/fitness";

/* Fitness & Wellness — the gym floor. Design language: ink black, gold + violet energy, bold caps, workout sets. */

const ind = getIndustry("fitness");

// Photo not supplied yet. When it arrives, set e.g. { src: "/screen-bazaar/industry-fitness.webp", alt: "…" }.
const HERO_IMAGE = null;

const CROWDS = {
  morning: {
    label: "Morning crowd",
    icon: Sunrise,
    classes: [["6:00", "Power Yoga", "Studio A"], ["7:00", "HIIT 30", "Floor"], ["8:00", "Spin", "Studio B"]],
    offer: ["Early bird", "3 months + 1 free"],
  },
  evening: {
    label: "Evening crowd",
    icon: MoonStar,
    classes: [["6:30", "Strength Lab", "Floor"], ["7:30", "Zumba", "Studio A"], ["8:30", "Boxing", "Ring"]],
    offer: ["Bring a friend", "Joining fee waived"],
  },
};

function Stripes({ className = "" }) {
  return (
    <div
      className={`pointer-events-none absolute ${className}`}
      style={{ backgroundImage: "repeating-linear-gradient(-45deg, #F5C542 0 14px, transparent 14px 28px)" }}
      aria-hidden="true"
    />
  );
}

function ClassBoard({ crowd }) {
  const c = CROWDS[crowd];
  return (
    <div className="rounded-3xl border-4 border-black bg-black p-2 shadow-[10px_10px_0_#914BFA]">
      <div className="rounded-2xl bg-[#111] p-6">
        <div className="flex items-center justify-between">
          <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-sb-gold">Today's classes</p>
          <span className="flex items-center gap-1.5 rounded-full bg-[#EF4444] px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" /> Live
          </span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={crowd} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
            <ul className="mt-5 space-y-2">
              {c.classes.map(([t, n, room], i) => (
                <li
                  key={n}
                  className={`flex items-center gap-4 rounded-xl px-4 py-3 ${i === 0 ? "bg-sb-violet text-white" : "bg-white/5 text-white/85"}`}
                >
                  <span className="w-10 shrink-0 text-sm font-extrabold tabular-nums sm:w-12 sm:text-base">{t}</span>
                  <span className="flex-1 text-sm font-extrabold uppercase sm:text-lg">{n}</span>
                  <span className="hidden text-xs font-bold opacity-70 sm:inline">{room}</span>
                  {i === 0 && <span className="text-[10px] font-extrabold uppercase tracking-wider text-sb-gold">Next</span>}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between rounded-xl bg-sb-gold px-4 py-3 text-sb-ink">
              <span className="text-xs font-extrabold uppercase tracking-[0.2em]">{c.offer[0]}</span>
              <span className="font-extrabold">{c.offer[1]}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-sb-ink pb-24 pt-32 text-white sm:pt-40">
      <Stripes className="-right-10 top-24 h-40 w-72 rotate-6 opacity-20" />
      <Stripes className="-left-16 bottom-10 h-24 w-60 -rotate-3 opacity-10" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8">
        <div className="text-center lg:text-left">
          <p className="inline-flex -rotate-2 items-center gap-2 bg-sb-gold px-3 py-1 text-sm font-extrabold uppercase tracking-[0.2em] text-sb-ink">
            <Dumbbell size={16} /> Gyms · Studios · Wellness
          </p>
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="mt-7 text-4xl font-extrabold uppercase leading-[1] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Keep your members engaged <span className="text-sb-violet">beyond the workout.</span>
          </motion.h1>
          <p className="mx-auto mt-7 max-w-xl text-lg font-semibold text-white/70 sm:text-xl lg:mx-0">{ind.modal.intro}</p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <motion.a
              href="/get-in-touch"
              whileHover={{ scale: 1.05, rotate: -1 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-3 border-2 border-white bg-sb-violet px-8 py-4 text-lg font-extrabold uppercase tracking-wide text-white shadow-[6px_6px_0_#F5C542]"
            >
              Get Started <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} />
            </motion.a>
            <motion.a
              href={waLink("fitness")}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2.5 border-2 border-white bg-transparent px-7 py-4 text-lg font-extrabold uppercase tracking-wide text-white shadow-[6px_6px_0_#F5C542] hover:bg-white/10"
            >
              <WhatsAppIcon size={20} /> WhatsApp
            </motion.a>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-xl">
          {HERO_IMAGE ? (
            <img src={HERO_IMAGE.src} alt={HERO_IMAGE.alt} width="1536" height="1024" className="w-full" fetchpriority="high" />
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 40, skewX: -4 }}
              animate={{ opacity: 1, x: 0, skewX: 0 }}
              transition={{ type: "spring", stiffness: 90, delay: 0.1 }}
              className="overflow-hidden border-4 border-white shadow-[10px_10px_0_#914BFA]"
            >
              <GymScene />
            </motion.div>
          )}
          <BoltSticker className="absolute -left-3 -top-8 h-14 w-14 sm:-left-8 sm:h-20 sm:w-20" />
          <StopwatchSticker className="absolute -right-2 -top-8 h-14 w-14 sm:-right-6 sm:h-20 sm:w-20" />
          <DumbbellSticker className="absolute -bottom-10 left-6 h-16 w-16 sm:h-24 sm:w-24" />
        </div>
      </div>
    </section>
  );
}

/* Use cases as a workout card: tick off each set. */
function WorkoutCard() {
  const [done, setDone] = useState([]);
  const toggle = (i) => setDone((d) => (d.includes(i) ? d.filter((x) => x !== i) : [...d, i]));
  const pct = Math.round((done.length / ind.modal.can.length) * 100);

  return (
    <section className="bg-sb-cream px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div className="lg:sticky lg:top-32">
          <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-sb-violet">What your screen can do</p>
          <h2 className="mt-3 text-4xl font-extrabold uppercase leading-none tracking-tight text-sb-ink sm:text-5xl">
            Five sets. <br />
            One screen.
          </h2>
          <div className="mt-8 flex items-center gap-4">
            <div className="relative h-20 w-20">
              <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="#E5E7EB" strokeWidth="4" />
                <motion.circle
                  cx="18"
                  cy="18"
                  r="15.5"
                  fill="none"
                  stroke="#914BFA"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="97.4"
                  animate={{ strokeDashoffset: 97.4 - (97.4 * pct) / 100 }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-sm font-extrabold text-sb-ink">{pct}%</span>
            </div>
            <p className="text-sm font-bold text-sb-muted">Tap each set to tick it off.</p>
          </div>
        </div>

        <ul className="space-y-4">
          {ind.modal.can.map((item, i) => {
            const on = done.includes(i);
            const Icon = FITNESS_ICONS[i];
            return (
              <li key={item}>
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-pressed={on}
                  className={`sg-card flex w-full items-center gap-3 border-2 border-sb-ink px-4 py-4 text-left transition sm:gap-5 sm:px-6 sm:py-5 ${
                    on ? "bg-sb-ink text-white" : "bg-white text-sb-ink shadow-[5px_5px_0_#191919] hover:-translate-y-0.5"
                  }`}
                >
                  <span className={`shrink-0 rounded-lg p-1 ${on ? "bg-white" : "bg-sb-lavender"}`}>
                    <Icon />
                  </span>
                  <span className="flex-1">
                    <span className="block text-[10px] font-extrabold uppercase tracking-[0.2em] opacity-60">Set {i + 1}</span>
                    <span className="block text-base font-extrabold uppercase leading-tight tracking-tight sm:text-xl">{item}</span>
                  </span>
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center border-2 ${on ? "border-sb-gold bg-sb-gold text-sb-ink" : "border-sb-ink"}`}>
                    {on && <Check size={20} strokeWidth={3} />}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* The evening crowd walks in: switch crowds and the board follows. */
function CrowdSwitch() {
  const [crowd, setCrowd] = useState("morning");
  return (
    <section className="relative overflow-hidden bg-sb-violet px-4 py-20 text-white sm:px-6 sm:py-28 lg:px-8">
      <Stripes className="-right-20 -top-10 h-56 w-96 rotate-12 opacity-15" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
        <div className="relative">
          <BottleSticker className="absolute -top-16 right-0 h-16 w-16 sm:h-20 sm:w-20" />
          <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-sb-gold">Imagine this</p>
          {ind.modal.imagine.map((l) => (
            <p key={l} className="mt-3 text-3xl font-extrabold leading-snug sm:text-4xl">{l}</p>
          ))}
          <div className="mt-8 inline-flex max-w-full flex-wrap border-2 border-white p-1">
            {Object.entries(CROWDS).map(([key, c]) => {
              const Icon = c.icon;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setCrowd(key)}
                  aria-pressed={crowd === key}
                  className={`flex items-center gap-2 px-3 py-2.5 text-xs font-extrabold uppercase tracking-wide transition sm:px-5 sm:text-sm ${
                    crowd === key ? "bg-white text-sb-ink" : "text-white hover:bg-white/10"
                  }`}
                >
                  <Icon size={16} /> {c.label}
                </button>
              );
            })}
          </div>
          <div className="mt-10 flex items-center gap-3">
            <Flame className="text-sb-gold" size={22} />
            <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-white/70">Who you reach</span>
            <span className="text-xl font-extrabold uppercase">{ind.modal.reach}</span>
          </div>
        </div>
        <ClassBoard crowd={crowd} />
      </div>
    </section>
  );
}

export default function Fitness() {
  return (
    <SignageChrome>
      <Hero />
      <WorkoutCard />
      <CrowdSwitch />
    </SignageChrome>
  );
}
