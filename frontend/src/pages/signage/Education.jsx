import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Coffee, DoorOpen, Library, RefreshCw, GraduationCap } from "lucide-react";
import SignageChrome from "./SignageChrome";
import { getIndustry } from "../../components/screenbazaar/content";
import { Squiggle } from "../../components/screenbazaar/Decor";
import { CampusScene, PencilSticker, BookSticker, GradCapSticker, AtomSticker, EDUCATION_ICONS } from "./art/education";

/* Education — the noticeboard. Design language: cork board, pinned paper, ruled notebook lines, campus map. */

const ind = getIndustry("education");

// Photo not supplied yet. When it arrives, set e.g. { src: "/screen-bazaar/industry-education.webp", alt: "…" }.
const HERO_IMAGE = null;

const PAPER = ["bg-[#FFF9C4]", "bg-white", "bg-[#FEE8EC]", "bg-sb-lilac", "bg-[#E0F2FE]"];
const PINS = ["bg-[#EF4444]", "bg-sb-violet", "bg-sb-gold", "bg-sb-green", "bg-sb-indigo"];

const CAMPUS = [
  { name: "Main gate", icon: DoorOpen },
  { name: "Library", icon: Library },
  { name: "Block A", icon: BookOpen },
  { name: "Canteen", icon: Coffee },
];

function Pin({ color }) {
  return <span className={`absolute left-1/2 top-2 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-sb-ink ${color} shadow-[1px_2px_0_#191919]`} />;
}

function Hero() {
  return (
    <section
      className="relative overflow-hidden pb-20 pt-32 sm:pt-36"
      style={{
        backgroundColor: "#FBFAF7",
        backgroundImage: "linear-gradient(#E9E8F6 1px, transparent 1px)",
        backgroundSize: "100% 34px",
      }}
    >
      <div className="absolute bottom-0 left-10 top-0 hidden w-0.5 bg-[#FCA5A5] sm:block" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="text-center lg:text-left">
          <p className="inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.2em] text-sb-indigo">
            <GraduationCap size={18} /> Schools · Colleges · Coaching
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-sb-ink sm:text-6xl"
          >
            Turn every campus screen into a{" "}
            <span className="relative inline-block">
              <span className="sb-gradient-text">communication channel.</span>
              <Squiggle className="absolute -bottom-3 left-0 h-4 w-full" color="#1F30A0" />
            </span>
          </motion.h1>
          <p className="mx-auto mt-8 max-w-lg text-lg font-semibold text-sb-slate sm:text-xl lg:mx-0">{ind.modal.intro}</p>
          <motion.a
            href="/get-in-touch"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group mt-10 inline-flex items-center gap-3 rounded-xl border-2 border-sb-ink bg-sb-indigo px-8 py-4 text-lg font-extrabold text-white shadow-[5px_5px_0_#191919]"
          >
            Get Started <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} />
          </motion.a>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          {HERO_IMAGE ? (
            <img src={HERO_IMAGE.src} alt={HERO_IMAGE.alt} width="1536" height="1024" className="w-full" fetchpriority="high" />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: 2 }}
              animate={{ opacity: 1, y: 0, rotate: -1 }}
              transition={{ type: "spring", stiffness: 80, delay: 0.15 }}
              className="overflow-hidden rounded-[24px] border-2 border-sb-ink bg-white shadow-[8px_8px_0_#1F30A0]"
            >
              <CampusScene />
            </motion.div>
          )}
          <PencilSticker className="absolute -left-3 -top-10 h-16 w-16 sm:-left-10 sm:h-24 sm:w-24" />
          <GradCapSticker className="absolute -right-2 -top-10 h-16 w-16 sm:-right-8 sm:h-24 sm:w-24" />
          <AtomSticker className="absolute -bottom-8 right-8 h-14 w-14 sm:h-20 sm:w-20" />
        </div>
      </div>
    </section>
  );
}

/* Use cases as pinned notices. */
function NoticeBoard() {
  return (
    <section className="bg-sb-cream px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="relative mx-auto max-w-6xl">
        <BookSticker className="absolute -top-14 left-0 h-16 w-16 sm:left-10 sm:h-20 sm:w-20" />
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-sb-ink sm:text-5xl">What your screen can do</h2>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {ind.modal.can.map((item, i) => {
            const Icon = EDUCATION_ICONS[i];
            return (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: -30, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: [-3, 2, -2, 3, -1][i] }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 140, damping: 12 }}
              whileHover={{ rotate: 0, scale: 1.04 }}
              className={`sg-card relative min-h-[160px] px-5 pb-6 pt-10 shadow-[4px_6px_0_rgba(25,25,25,.15)] ${PAPER[i]}`}
            >
              <Pin color={PINS[i]} />
              <Icon />
              <p className="mt-3 text-xs font-extrabold uppercase tracking-[0.2em] text-sb-muted">Notice {i + 1}</p>
              <p className="mt-1 text-lg font-extrabold leading-snug text-sb-ink">{item}</p>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* The seminar moves: update every campus screen at once. */
function LastMinuteChange() {
  const [updated, setUpdated] = useState(false);
  return (
    <section className="bg-sb-indigo px-4 py-20 text-white sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-sb-gold">Imagine this</p>
        <div className="mt-3 max-w-3xl">
          {ind.modal.imagine.map((l) => (
            <p key={l} className="text-2xl font-extrabold leading-snug sm:text-4xl">{l}</p>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {CAMPUS.map(({ name, icon: Icon }, i) => (
            <div key={name} className="rounded-2xl bg-white/10 p-2 sm:p-3">
              <p className="flex items-center gap-2 text-xs font-bold text-white/70 sm:text-sm">
                <Icon size={16} /> {name}
              </p>
              <div className="mt-2 aspect-video rounded-lg border-4 border-black bg-white p-2 text-sb-ink sm:mt-3 sm:p-3">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-sb-violet sm:text-[10px]">Guest seminar</p>
                <div className="relative mt-0.5 inline-block text-sm font-extrabold sm:mt-1 sm:text-lg">
                  Hall 2 · 11 AM
                  <motion.span
                    animate={{ scaleX: updated ? 1 : 0 }}
                    transition={{ delay: updated ? i * 0.15 : 0, duration: 0.3 }}
                    style={{ transformOrigin: "left" }}
                    className="absolute left-0 right-0 top-1/2 h-0.5 bg-[#EF4444]"
                  />
                </div>
                <motion.p
                  animate={{ opacity: updated ? 1 : 0, y: updated ? 0 : 4 }}
                  transition={{ delay: updated ? 0.3 + i * 0.15 : 0 }}
                  className="text-sm font-extrabold text-sb-green sm:text-lg"
                >
                  Auditorium · 2 PM
                </motion.p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-5">
          <button
            type="button"
            onClick={() => setUpdated((u) => !u)}
            className="inline-flex items-center gap-2 rounded-xl border-2 border-white bg-sb-gold px-6 py-3 font-extrabold text-sb-ink"
          >
            <RefreshCw size={18} /> {updated ? "Undo" : "Update every screen"}
          </button>
          <span className="text-sm font-bold text-white/70">
            {updated ? "0 notices printed." : "One change, four places."}
          </span>
        </div>
      </div>
    </section>
  );
}

function Reach() {
  const people = ind.modal.reach.replace("&", "and").split(/,\s*|\s+and\s+/);
  return (
    <section className="bg-sb-cream px-4 pt-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-sb-muted">Who you reach</p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          {people.map((p, i) => (
            <span
              key={p}
              className={`rounded-2xl border-2 border-sb-ink px-6 py-3 text-2xl font-extrabold capitalize text-sb-ink shadow-[4px_4px_0_#191919] sm:text-3xl ${PAPER[i + 1]}`}
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Education() {
  return (
    <SignageChrome>
      <Hero />
      <NoticeBoard />
      <LastMinuteChange />
      <Reach />
    </SignageChrome>
  );
}
