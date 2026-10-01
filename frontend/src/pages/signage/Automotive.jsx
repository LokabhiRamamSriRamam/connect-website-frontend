import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Wrench, Armchair } from "lucide-react";
import SignageChrome from "./SignageChrome";
import { getIndustry } from "../../components/screenbazaar/content";
import { ShowroomScene, SteeringSticker, TyreSticker, KeyFobSticker, SpannerSticker, AUTOMOTIVE_ICONS } from "./art/automotive";

/* Automotive — the showroom. Design language: dark floor, spotlight cones, car silhouettes, dashboard gauges, number plate. */

const ind = getIndustry("automotive");

// Photo not supplied yet. When it arrives, set e.g. { src: "/screen-bazaar/industry-automotive.webp", alt: "…" }.
const HERO_IMAGE = null;

const MODELS = [
  { name: "Aero S", tag: "New launch", color: "#914BFA", specs: ["Hybrid", "22 km/l", "6 airbags"] },
  { name: "Terra X", tag: "Festive offer", color: "#F5C542", specs: ["4×4", "7 seats", "₹50k off"] },
  { name: "Volt E", tag: "Now electric", color: "#4CAF6E", specs: ["480 km range", "Fast charge", "0 fuel"] },
];

function Car({ color = "#914BFA", className = "" }) {
  return (
    <svg viewBox="0 0 320 120" className={className} aria-hidden="true">
      <ellipse cx="160" cy="108" rx="140" ry="8" fill="#000" opacity="0.35" />
      <path
        d="M20 84c0-12 8-20 22-22l40-6 38-26c8-5 16-8 26-8h64c12 0 22 4 30 12l26 24 34 6c10 2 16 10 16 20v8H20z"
        fill={color}
        stroke="#191919"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M128 36h44v24h-70zM182 36h36c6 0 12 3 16 8l14 16h-66z" fill="#E9E8F6" stroke="#191919" strokeWidth="2.5" strokeLinejoin="round" />
      <rect x="276" y="70" width="18" height="8" rx="3" fill="#FFF9F1" />
      {[80, 240].map((x) => (
        <g key={x}>
          <circle cx={x} cy="94" r="18" fill="#191919" />
          <circle cx={x} cy="94" r="8" fill="#BFB1A6" />
        </g>
      ))}
    </svg>
  );
}

function ShowroomScreen({ model, big = false }) {
  return (
    <div className="rounded-[22px] border-[6px] border-black bg-black shadow-[0_40px_80px_-30px_rgba(145,75,250,.7)]">
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-b from-[#1b1b2e] to-[#0c0c14]">
        <div className="absolute left-1/2 top-0 h-full w-2/3 -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,.22),transparent_70%)]" />
        <AnimatePresence mode="wait">
          <motion.div
            key={model.name}
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 60, opacity: 0 }}
            transition={{ type: "spring", stiffness: 90, damping: 16 }}
            className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.25em]" style={{ color: model.color }}>
                  {model.tag}
                </p>
                <p className={`font-extrabold text-white ${big ? "text-3xl" : "text-2xl"}`}>{model.name}</p>
              </div>
            </div>
            <Car color={model.color} className="mx-auto w-1/2 sm:w-3/4" />
            <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
              {model.specs.map((s) => (
                <span key={s} className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-white sm:px-3 sm:py-1 sm:text-xs">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0c0c14] pb-24 pt-32 text-white sm:pt-40">
      {/* spotlights */}
      <div className="pointer-events-none absolute -top-20 left-[15%] h-[140%] w-64 rotate-[18deg] bg-gradient-to-b from-white/15 to-transparent blur-2xl" />
      <div className="pointer-events-none absolute -top-20 right-[20%] h-[140%] w-64 -rotate-[18deg] bg-gradient-to-b from-sb-violet/30 to-transparent blur-2xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(0deg,rgba(145,75,250,.18),transparent)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="text-center lg:text-left">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-white/60 sm:text-xs sm:tracking-[0.35em]">Showrooms · Service centres · Dealerships</p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Put your vehicles and services in the{" "}
            <span className="bg-gradient-to-r from-white via-sb-gold to-white bg-clip-text text-transparent">spotlight.</span>
          </motion.h1>
          <p className="mx-auto mt-7 max-w-xl text-lg font-semibold text-white/70 sm:text-xl lg:mx-0">{ind.modal.intro}</p>
          <motion.a
            href="/get-in-touch"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-lg font-extrabold text-sb-ink"
          >
            Get Started <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} />
          </motion.a>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          {HERO_IMAGE ? (
            <img src={HERO_IMAGE.src} alt={HERO_IMAGE.alt} width="1536" height="1024" className="w-full" fetchpriority="high" />
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 70, damping: 16, delay: 0.1 }}
              className="overflow-hidden rounded-[28px] border border-white/15 shadow-[0_40px_80px_-30px_rgba(145,75,250,.7)]"
            >
              <ShowroomScene />
            </motion.div>
          )}
          <SteeringSticker className="absolute -left-3 -top-10 h-16 w-16 sm:-left-8 sm:h-24 sm:w-24" />
          <KeyFobSticker className="absolute -right-2 -top-10 h-14 w-14 sm:-right-6 sm:h-20 sm:w-20" />
        </div>
      </div>
    </section>
  );
}

/* Showroom screen with model controls. */
function ModelCarousel() {
  const [i, setI] = useState(0);
  return (
    <div>
      <ShowroomScreen model={MODELS[i]} />
      <div className="mt-5 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Previous model"
          onClick={() => setI((v) => (v + MODELS.length - 1) % MODELS.length)}
          className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-sb-ink bg-white text-sb-ink hover:bg-sb-lavender"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex gap-2">
          {MODELS.map((m, k) => (
            <span key={m.name} className={`h-2 rounded-full transition-all ${k === i ? "w-8 bg-sb-ink" : "w-2 bg-sb-taupe"}`} />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next model"
          onClick={() => setI((v) => (v + 1) % MODELS.length)}
          className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-sb-ink bg-white text-sb-ink hover:bg-sb-lavender"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

/* Use cases as dashboard gauges; needles sweep up as they scroll in. */
function Gauges() {
  return (
    <section className="bg-sb-cream px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs font-extrabold uppercase tracking-[0.25em] text-sb-violet">What your screen can do</p>
        <h2 className="mt-3 text-center text-3xl font-extrabold tracking-tight text-sb-ink sm:text-5xl">Every screen, running at full speed.</h2>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {ind.modal.can.map((item, i) => {
            const Icon = AUTOMOTIVE_ICONS[i];
            return (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="sg-card relative rounded-[28px] bg-sb-ink p-6 text-center text-white"
            >
              <Icon />
              <svg viewBox="0 0 120 70" className="mx-auto mt-3 w-28" aria-hidden="true">
                <path d="M10 64a50 50 0 0 1 100 0" fill="none" stroke="#333" strokeWidth="10" strokeLinecap="round" />
                <motion.path
                  d="M10 64a50 50 0 0 1 100 0"
                  fill="none"
                  stroke={`url(#sg-gauge-${i})`}
                  strokeWidth="10"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 0.7 + i * 0.06 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: i * 0.1 }}
                />
                <motion.line
                  x1="60"
                  y1="64"
                  x2="60"
                  y2="22"
                  stroke="#F5C542"
                  strokeWidth="4"
                  strokeLinecap="round"
                  style={{ originX: 0.5, originY: 1 }}
                  initial={{ rotate: -90 }}
                  whileInView={{ rotate: 36 + i * 10 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: i * 0.1, type: "spring", stiffness: 60 }}
                />
                <circle cx="60" cy="64" r="6" fill="#F5C542" />
                <defs>
                  <linearGradient id={`sg-gauge-${i}`} x1="0" x2="1">
                    <stop offset="0" stopColor="#1F30A0" />
                    <stop offset="1" stopColor="#914BFA" />
                  </linearGradient>
                </defs>
              </svg>
              <p className="mt-4 text-lg font-extrabold leading-snug">{item}</p>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* The service lounge: a waiting customer, and the new model on the screen beside them. */
function ServiceLounge() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
        <div className="relative">
          <SpannerSticker className="absolute -top-16 right-0 h-16 w-16 sm:h-20 sm:w-20" />
          <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.25em] text-sb-violet">
            <Wrench size={16} /> Imagine this
          </p>
          {ind.modal.imagine.map((l) => (
            <p key={l} className="mt-3 text-2xl font-extrabold leading-snug text-sb-ink sm:text-4xl">{l}</p>
          ))}
        </div>
        <div className="relative rounded-[32px] bg-sb-sand p-4 sm:p-8">
          <TyreSticker className="absolute -bottom-8 -left-3 h-16 w-16 sm:-left-8 sm:h-20 sm:w-20" />
          <div className="grid items-end gap-6 sm:grid-cols-[auto_1fr]">
            <div className="hidden flex-col items-center text-sb-taupe sm:flex">
              <Armchair size={72} strokeWidth={1.5} />
              <span className="mt-2 text-xs font-extrabold uppercase tracking-[0.2em] text-sb-muted">Service lounge</span>
            </div>
            <ModelCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}

/* Who you reach, on a number plate. */
function Plate() {
  return (
    <section className="bg-sb-cream px-4 pt-20 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-4xl flex-col items-center">
        <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-sb-muted">Who you reach</p>
        <div className="mt-5 flex max-w-full items-stretch overflow-hidden rounded-xl border-4 border-sb-ink bg-white shadow-[6px_6px_0_#191919]">
          <span className="flex items-center bg-sb-indigo px-2 text-xs font-extrabold text-white sm:px-3">IND</span>
          <span className="px-4 py-3 text-base font-extrabold uppercase tracking-[0.08em] text-sb-ink sm:px-6 sm:text-4xl sm:tracking-[0.12em]">{ind.modal.reach}</span>
        </div>
      </div>
    </section>
  );
}

export default function Automotive() {
  return (
    <SignageChrome>
      <Hero />
      <Gauges />
      <ServiceLounge />
      <Plate />
    </SignageChrome>
  );
}
