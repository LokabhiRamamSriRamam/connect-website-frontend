import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Mail, Monitor, Coffee, Users, Building2, TrendingUp, Megaphone } from "lucide-react";
import SignageChrome from "./SignageChrome";
import { getIndustry } from "../../components/screenbazaar/content";
import { OfficeScene, MugSticker, ChartSticker, StickyNoteSticker, ChatSticker, CORPORATE_ICONS } from "./art/corporate";

/* Corporate & Offices — the workplace. Design language: clean product-UI cards, soft shadows, week planner, inbox, ID badge. */

const ind = getIndustry("corporate");

// Photo not supplied yet. When it arrives, set e.g. { src: "/screen-bazaar/industry-corporate.webp", alt: "…" }.
const HERO_IMAGE = null;

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const DAY_TONES = ["bg-sb-lilac", "bg-[#F3FFF8]", "bg-[#FFF7F4]", "bg-[#FFF9F1]", "bg-sb-lavender"];

const MEMOS = [
  { subj: "Town hall moved to 4 PM", icon: Megaphone },
  { subj: "Welcome our new joiners", icon: Users },
  { subj: "Q3 sales: 112% of target", icon: TrendingUp },
  { subj: "Friday team lunch — 1 PM", icon: Coffee },
];
const SPOTS = ["Reception", "Cafeteria", "Floor 3"];

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F7F7F7] pb-20 pt-32 sm:pt-36">
      <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-sb-lavender to-transparent" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="text-center lg:text-left">
          <p className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-sb-slate shadow-sm ring-1 ring-sb-line">
            <Building2 size={14} className="text-sb-iris" /> Offices · Co-working · Factories
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-sb-ink sm:text-6xl lg:text-7xl"
          >
            Keep your workplace <span className="sb-gradient-text">in the loop.</span>
          </motion.h1>
          <p className="mx-auto mt-7 max-w-xl text-lg font-medium text-sb-slate sm:text-xl lg:mx-0">{ind.modal.intro}</p>
          <motion.a
            href="/get-in-touch"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group mt-10 inline-flex items-center gap-3 rounded-xl bg-sb-ink px-7 py-4 text-lg font-bold text-white shadow-lg"
          >
            Get Started <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} />
          </motion.a>
        </div>

        <div className="relative mx-auto w-full min-w-0 max-w-xl">
          {HERO_IMAGE ? (
            <img src={HERO_IMAGE.src} alt={HERO_IMAGE.alt} width="1536" height="1024" className="w-full" fetchpriority="high" />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="overflow-hidden rounded-3xl bg-white shadow-[0_40px_80px_-30px_rgba(31,48,160,.55)] ring-1 ring-sb-line"
            >
              <OfficeScene />
            </motion.div>
          )}
          <MugSticker className="absolute -left-3 -top-10 h-14 w-14 sm:-left-8 sm:h-20 sm:w-20" />
          <ChatSticker className="absolute -right-2 -top-10 h-16 w-16 sm:-right-8 sm:h-24 sm:w-24" />
          <ChartSticker className="absolute -left-3 top-[45%] h-14 w-14 sm:-left-10 sm:h-20 sm:w-20" />
          {/* live ticker, like the one on a reception screen */}
          <div className="mt-6 overflow-hidden rounded-xl bg-white py-2 ring-1 ring-sb-line">
            <div className="sb-marquee text-sm font-bold text-sb-slate">
              {[0, 1].map((k) => (
                <span key={k} className="whitespace-nowrap pr-10">
                  Welcome, visitors from Acme Corp · Cafeteria: millet week · Fire drill Wed 11 AM · All-hands Thursday 4 PM ·
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Use cases as a week planner, one per weekday. */
function WeekPlanner() {
  return (
    <section className="bg-sb-cream px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sb-iris">What your screen can do</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-sb-ink sm:text-5xl">A screen for every day of the week.</h2>
          </div>
          <StickyNoteSticker className="h-16 w-16 sm:h-20 sm:w-20" />
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {ind.modal.can.map((item, i) => {
            const Icon = CORPORATE_ICONS[i];
            return (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="sg-card overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-sb-line transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between border-b border-sb-line px-4 py-2.5">
                <span className="text-sm font-extrabold text-sb-ink">{DAYS[i]}</span>
                <span className="h-2 w-2 animate-pulse rounded-full bg-sb-violet" />
              </div>
              <div className={`m-3 min-h-[96px] rounded-xl p-4 ${DAY_TONES[i]}`}>
                <Icon />
                <p className="mt-2 text-base font-bold leading-snug text-sb-ink">{item}</p>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* Without filling inboxes: move all-staff memos onto the office screens. */
function InboxToScreens() {
  const [moved, setMoved] = useState(false);
  return (
    <section className="bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-sb-iris">Imagine this</p>
        {ind.modal.imagine.map((l) => (
          <p key={l} className="mt-2 max-w-3xl text-3xl font-extrabold leading-snug text-sb-ink sm:text-4xl">{l}</p>
        ))}

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1fr_1.3fr]">
          {/* inbox */}
          <div className="rounded-2xl bg-[#F7F7F7] p-4 ring-1 ring-sb-line">
            <div className="flex items-center justify-between px-2 pb-3">
              <span className="flex items-center gap-2 font-bold text-sb-ink">
                <Mail size={18} /> All-staff inbox
              </span>
              <span className="rounded-full bg-[#EF4444] px-2.5 py-0.5 text-xs font-bold text-white">{moved ? 0 : MEMOS.length}</span>
            </div>
            <div className="min-h-[232px] space-y-2">
              <AnimatePresence>
                {!moved &&
                  MEMOS.map((m, i) => (
                    <motion.div
                      key={m.subj}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: 80, transition: { delay: i * 0.08 } }}
                      className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm"
                    >
                      <span className="h-2 w-2 rounded-full bg-sb-iris" />
                      <span className="text-sm font-bold text-sb-ink">{m.subj}</span>
                    </motion.div>
                  ))}
              </AnimatePresence>
              {moved && <p className="px-2 pt-20 text-center text-sm font-bold text-sb-muted">Inbox zero. Everyone already saw it.</p>}
            </div>
            <button
              type="button"
              onClick={() => setMoved((v) => !v)}
              className="mt-3 w-full rounded-xl bg-sb-gradient px-5 py-3 font-bold text-white"
            >
              {moved ? "Reset" : "Put it on the screens instead"}
            </button>
          </div>

          {/* screens */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {SPOTS.map((spot, s) => (
              <div key={spot}>
                <p className="mb-2 flex items-center gap-1.5 text-sm font-bold text-sb-muted">
                  <Monitor size={14} /> {spot}
                </p>
                <div className="aspect-[3/4] rounded-xl bg-sb-ink p-1.5">
                  <div className="flex h-full flex-col gap-1.5 rounded-lg bg-white p-2">
                    {MEMOS.map((m, i) => {
                      const Icon = m.icon;
                      return (
                        <motion.div
                          key={m.subj}
                          animate={{ opacity: moved ? 1 : 0, y: moved ? 0 : 8 }}
                          transition={{ delay: moved ? 0.4 + s * 0.1 + i * 0.08 : 0 }}
                          className={`flex flex-1 items-center gap-1.5 rounded-md px-2 text-[11px] font-bold leading-tight ${
                            i === 0 ? "bg-sb-gradient text-white" : "bg-sb-lavender text-sb-ink"
                          }`}
                        >
                          <Icon size={12} className="shrink-0" /> <span className="hidden truncate sm:inline sm:whitespace-normal">{m.subj}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* Who you reach, on an ID badge. */
function Badge() {
  return (
    <section className="bg-sb-cream px-4 pt-16 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-xs flex-col items-center">
        <span className="h-16 w-4 bg-sb-iris" />
        <motion.div
          initial={{ rotate: -8 }}
          whileInView={{ rotate: [-8, 5, -3, 0] }}
          viewport={{ once: true }}
          transition={{ duration: 1.4 }}
          style={{ transformOrigin: "50% -60px" }}
          className="w-full rounded-2xl bg-white p-6 text-center shadow-xl ring-1 ring-sb-line"
        >
          <span className="mx-auto block h-2 w-12 rounded-full bg-sb-line" />
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-sb-muted">Who you reach</p>
          <p className="mt-2 text-3xl font-extrabold text-sb-ink">{ind.modal.reach}</p>
          <div className="mt-4 h-1.5 rounded-full bg-sb-gradient" />
        </motion.div>
      </div>
    </section>
  );
}

export default function Corporate() {
  return (
    <SignageChrome>
      <Hero />
      <WeekPlanner />
      <InboxToScreens />
      <Badge />
    </SignageChrome>
  );
}
