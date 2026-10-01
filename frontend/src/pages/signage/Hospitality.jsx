import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SignageChrome from "./SignageChrome";
import { getIndustry } from "../../components/screenbazaar/content";
import { LobbyScene, BellSticker, KeySticker, SuitcaseSticker, StarsSticker, HOSPITALITY_ICONS } from "./art/hospitality";

/* Hospitality — the lobby. Design language: evening indigo, gold hairlines, key card, a guest's journey. */

const ind = getIndustry("hospitality");

// Photo not supplied yet. When it arrives, set e.g. { src: "/screen-bazaar/industry-hospitality.webp", alt: "…" }.
const HERO_IMAGE = null;

// A guest's day, one stop per use case from the owner's list.
const JOURNEY = [
  { place: "Lobby", can: "Welcome guests", screen: ["Welcome, Mehta family", "Room 412 is ready"] },
  { place: "Spa & pool", can: "Promote hotel facilities", screen: ["Pool open", "7 AM – 9 PM · Level 3"] },
  { place: "Terrace", can: "Display events and activities", screen: ["Sunset jazz", "Tonight · 7:30 PM"] },
  { place: "Restaurant", can: "Showcase dining offers", screen: ["Today's special", "Coastal thali ₹650"] },
  { place: "Corridor", can: "Provide directions and information", screen: ["Ballroom →", "Lifts ← · Gym ↑"] },
];

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#141a4a] pb-24 pt-32 text-white sm:pt-40">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(145,75,250,.45),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-sb-gold to-transparent" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:px-8">
        <div className="text-center lg:text-left">
          <p className="flex items-center justify-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.3em] text-sb-gold sm:text-xs lg:justify-start">
            <span className="hidden h-px w-10 bg-sb-gold sm:block" /> Hotels · Resorts · Serviced stays
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Give every guest a <span className="text-sb-gold">better welcome.</span>
          </motion.h1>
          <p className="mx-auto mt-7 max-w-xl text-lg font-semibold text-white/75 sm:text-xl lg:mx-0">{ind.modal.intro}</p>
          <motion.a
            href="/get-in-touch"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-sb-gold px-8 py-4 text-lg font-extrabold text-sb-ink"
          >
            Get Started <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} />
          </motion.a>
          <StarsSticker className="mx-auto mt-8 h-10 w-28 lg:mx-0" />
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          {HERO_IMAGE ? (
            <img src={HERO_IMAGE.src} alt={HERO_IMAGE.alt} width="1536" height="1024" className="w-full" fetchpriority="high" />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="overflow-hidden rounded-[32px] border border-sb-gold/50 shadow-[0_40px_80px_-20px_rgba(0,0,0,.6)]"
            >
              <LobbyScene />
            </motion.div>
          )}
          <KeySticker className="absolute -left-2 -top-10 h-16 w-16 sm:-left-10 sm:h-24 sm:w-24" />
          <SuitcaseSticker className="absolute -bottom-8 right-2 h-16 w-16 sm:-right-6 sm:h-24 sm:w-24" />
        </div>
      </div>
    </section>
  );
}

/* Follow a guest through the property; each stop's screen does one job. */
function GuestJourney() {
  const [stop, setStop] = useState(0);
  const s = JOURNEY[stop];
  const StopIcon = HOSPITALITY_ICONS[s.place];
  return (
    <section className="bg-sb-cream px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs font-extrabold uppercase tracking-[0.25em] text-sb-violet">What your screen can do</p>
        <h2 className="mt-3 text-center text-3xl font-extrabold tracking-tight text-sb-ink sm:text-5xl">From the lobby to the room.</h2>

        {/* route */}
        <div className="relative mt-14">
          <div className="absolute left-[10%] right-[10%] top-8 hidden h-0.5 bg-[repeating-linear-gradient(90deg,#BFB1A6_0_8px,transparent_8px_16px)] sm:block" />
          <div className="grid grid-cols-3 gap-y-6 sm:grid-cols-5">
            {JOURNEY.map((j, i) => {
              const Icon = HOSPITALITY_ICONS[j.place];
              const on = i === stop;
              return (
                <button
                  key={j.place}
                  type="button"
                  onClick={() => setStop(i)}
                  aria-pressed={on}
                  className="sg-card relative flex flex-col items-center gap-2 text-center"
                >
                  <span
                    className={`flex h-16 w-16 items-center justify-center rounded-full border-2 transition ${
                      on ? "scale-110 border-sb-ink bg-sb-gold shadow-[3px_3px_0_#191919]" : "border-sb-taupe bg-white hover:border-sb-violet"
                    }`}
                  >
                    <Icon />
                  </span>
                  <span className={`text-sm font-extrabold ${on ? "text-sb-ink" : "text-sb-muted"}`}>{j.place}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* stop detail */}
        <div className="mt-12 grid items-center gap-8 rounded-[32px] bg-white p-5 ring-1 ring-sb-line sm:p-10 md:grid-cols-2">
          <AnimatePresence mode="wait">
            <motion.div key={stop} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} className="flex items-start gap-4">
              <span className="shrink-0 rounded-2xl bg-sb-lavender p-2">
                <StopIcon />
              </span>
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-sb-muted">
                  Stop {stop + 1} · {s.place}
                </p>
                <p className="mt-2 text-2xl font-extrabold tracking-tight text-sb-ink sm:text-3xl">{s.can}</p>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="rounded-2xl bg-[#141a4a] p-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={stop}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex aspect-video flex-col justify-center rounded-xl bg-gradient-to-br from-[#1F30A0] to-[#914BFA] px-6 text-white sm:px-8"
              >
                <p className="text-xl font-extrabold sm:text-2xl">{s.screen[0]}</p>
                <p className="mt-1 font-bold text-sb-gold">{s.screen[1]}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function LobbyMoment() {
  return (
    <section className="relative overflow-hidden bg-[#141a4a] px-4 py-20 text-white sm:px-6 sm:py-24 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(245,197,66,.15),transparent_50%)]" />
      <div className="relative mx-auto max-w-4xl text-center">
        <BellSticker className="mx-auto h-20 w-20 sm:h-24 sm:w-24" />
        <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.3em] text-sb-gold">Imagine this</p>
        {ind.modal.imagine.map((l) => (
          <motion.p
            key={l}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-4 text-2xl font-extrabold leading-snug sm:text-4xl"
          >
            {l}
          </motion.p>
        ))}
        <div className="mx-auto mt-10 flex max-w-md flex-wrap items-center justify-center gap-4 border-t border-sb-gold/30 pt-8">
          <span className="text-xs font-extrabold uppercase tracking-[0.3em] text-white/60">Who you reach</span>
          <span className="text-2xl font-extrabold text-sb-gold">{ind.modal.reach}</span>
        </div>
      </div>
    </section>
  );
}

export default function Hospitality() {
  return (
    <SignageChrome>
      <Hero />
      <GuestJourney />
      <LobbyMoment />
    </SignageChrome>
  );
}
