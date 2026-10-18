import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, HeartPulse, Stethoscope, Building2, Megaphone, Handshake, Play } from "lucide-react";
import SignageChrome from "./SignageChrome";
import WhatsAppIcon from "../../components/WhatsAppIcon";
import { waLink } from "../../lib/whatsapp";
import { getIndustry } from "../../components/screenbazaar/content";
import { Sparkle } from "../../components/screenbazaar/Decor";
import { HeartbeatSticker, PillSticker, CrossSticker, StethoscopeSticker, WaitingRoomScene, HEALTHCARE_ICONS } from "./art/healthcare";

/* Healthcare — the waiting room. Design language: calm mint + white, soft rounded panels, a "now playing" playlist. */

const ind = getIndustry("healthcare");

// One slide per use case from the owner's list, in the same order.
const SLIDES = [
  { icon: HeartPulse, kicker: "Health tip", title: "Drink 8 glasses of water a day", body: "Small habits, big difference.", bg: "bg-[#F3FFF8]", tone: "text-sb-green" },
  { icon: Stethoscope, kicker: "Our services", title: "Full-body check-up in 90 minutes", body: "Ask at reception to book.", bg: "bg-sb-lavender", tone: "text-sb-violet" },
  { icon: Building2, kicker: "Departments", title: "New physiotherapy wing — 2nd floor", body: "Open Mon–Sat, 8 AM – 8 PM.", bg: "bg-white", tone: "text-sb-indigo" },
  { icon: Megaphone, kicker: "Announcement", title: "OPD closes early on Friday", body: "Emergency services run 24×7.", bg: "bg-[#FFF7F4]", tone: "text-[#C2410C]" },
  { icon: Handshake, kicker: "Partner", title: "Pharmacy on the ground floor", body: "Show your prescription for 10% off.", bg: "bg-[#FFF9F1]", tone: "text-[#B7791F]" },
];

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F3FFF8] via-white to-sb-cream pb-20 pt-32 sm:pt-36">
      <div className="absolute -left-32 top-10 h-[28rem] w-[28rem] rounded-full bg-sb-green/10 blur-3xl" />
      <div className="absolute -right-20 top-40 h-80 w-80 rounded-full bg-sb-violet/15 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:px-8">
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.2em] text-sb-green shadow-sm ring-1 ring-sb-green/30">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-sb-green opacity-60" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-sb-green" />
            </span>
            Hospitals · Clinics · Diagnostics
          </span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-sb-ink sm:text-6xl lg:text-7xl"
          >
            Make the waiting room <span className="sb-gradient-text">work for you.</span>
          </motion.h1>
          <p className="mx-auto mt-7 max-w-xl text-lg font-semibold leading-relaxed text-sb-slate sm:text-xl lg:mx-0">{ind.modal.intro}</p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <motion.a
              href="/get-in-touch"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-3 rounded-2xl bg-sb-gradient px-8 py-4 text-lg font-extrabold text-white shadow-[0_14px_30px_-10px_rgba(31,48,160,.6)]"
            >
              Get Started <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} />
            </motion.a>
            <motion.a
              href={waLink("healthcare")}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 rounded-2xl border-2 border-sb-ink bg-white px-7 py-4 text-lg font-extrabold text-sb-ink shadow-[0_14px_30px_-12px_rgba(25,25,25,.35)]"
            >
              <WhatsAppIcon size={20} /> WhatsApp us
            </motion.a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-2xl">
          <div className="absolute inset-6 rounded-[48px] bg-gradient-to-br from-sb-green/25 via-sb-lilac to-sb-violet/30" />
          <motion.img
            src="/screen-bazaar/industry-healthcare.webp"
            alt="An older couple smiling and pointing at a hospital welcome and wayfinding screen"
            width="1536"
            height="1024"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative z-10 w-full drop-shadow-[0_24px_36px_rgba(31,48,160,0.25)]"
            fetchpriority="high"
          />
          <HeartbeatSticker className="absolute left-0 top-0 z-20 h-16 w-16 sm:-left-4 sm:h-24 sm:w-24" />
          <CrossSticker className="absolute right-2 top-2 z-20 h-12 w-12 sm:right-6 sm:h-20 sm:w-20" />
          <PillSticker className="absolute bottom-2 right-6 z-20 h-12 w-12 sm:bottom-0 sm:h-20 sm:w-20" />
        </div>
      </div>
    </section>
  );
}

/* A waiting-room screen with its playlist: the owner's use cases, playing in turn. */
function WaitingRoomPlaylist() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setIdx((i) => (i + 1) % SLIDES.length), 4500);
    return () => clearTimeout(t);
  }, [idx]);
  const s = SLIDES[idx];
  const Icon = s.icon;

  return (
    <section className="bg-sb-cream px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-sb-green">What your screen can do</p>
          <h2 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sb-ink sm:text-5xl">
            A playlist your patients actually watch.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* screen */}
          <div className="rounded-[32px] bg-white p-3 shadow-[0_30px_60px_-30px_rgba(25,25,25,.45)] ring-1 ring-sb-line">
            <div className="relative aspect-video overflow-hidden rounded-[24px] bg-sb-ink">
              <AnimatePresence mode="wait">
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`absolute inset-0 flex flex-col justify-center gap-2 p-5 sm:gap-4 sm:p-12 ${s.bg}`}
                >
                  <span className={`flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] sm:text-sm ${s.tone}`}>
                    <Icon size={18} /> {s.kicker}
                  </span>
                  <p className="max-w-md text-xl font-extrabold leading-tight text-sb-ink sm:text-4xl">{s.title}</p>
                  <p className="text-sm font-semibold text-sb-slate sm:text-lg">{s.body}</p>
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-x-0 bottom-0 h-1.5 bg-black/10">
                <motion.div key={idx} className="h-full bg-sb-green" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 4.5, ease: "linear" }} />
              </div>
            </div>
          </div>

          {/* playlist */}
          <ol className="space-y-3">
            {ind.modal.can.map((item, i) => {
              const ItemIcon = HEALTHCARE_ICONS[i];
              const on = i === idx;
              return (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => setIdx(i)}
                    aria-current={on}
                    className={`sg-card flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition sm:gap-4 sm:px-5 ${
                      on ? "bg-sb-ink text-white shadow-lg" : "bg-white text-sb-ink ring-1 ring-sb-line hover:ring-sb-green"
                    }`}
                  >
                    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${on ? "bg-white" : "bg-sb-mint"}`}>
                      <ItemIcon />
                    </span>
                    <span className="font-bold">{item}</span>
                    {on && (
                      <span className="ml-auto flex shrink-0 items-center gap-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-sb-green">
                        <Play size={10} fill="currentColor" />
                        <span className="hidden sm:inline">Now playing</span>
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* The receptionist doesn't have to say it again. */
function Receptionist() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div className="relative mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2">
        <StethoscopeSticker className="absolute -top-14 right-0 h-16 w-16 sm:h-20 sm:w-20" />
        <div className="relative">
          <div className="rounded-[28px] rounded-bl-none bg-sb-sand p-6 text-lg font-bold text-sb-slate">
            “Yes, we do offer that. It takes about an hour, and you can book it at the counter…”
          </div>
          <p className="mt-3 text-sm font-bold text-sb-muted">Reception, for the twentieth time today</p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{ transformOrigin: "left" }}
            className="absolute left-4 right-4 top-[38%] h-1 rounded-full bg-sb-violet"
          />
        </div>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-sb-violet">Imagine this</p>
          {ind.modal.imagine.map((l) => (
            <p key={l} className="mt-3 text-2xl font-extrabold leading-snug text-sb-ink sm:text-3xl">{l}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reach() {
  return (
    <section className="bg-gradient-to-b from-white to-sb-cream px-4 pb-8 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl items-center gap-8 overflow-hidden rounded-[36px] bg-[#F3FFF8] p-4 ring-1 ring-sb-green/20 sm:p-8 lg:grid-cols-[1fr_1.5fr]">
        <div className="px-2 py-4 text-center lg:text-left">
          <Sparkle size={22} color="#4CAF6E" className="mx-auto lg:mx-0" />
          <p className="mt-3 text-xs font-extrabold uppercase tracking-[0.22em] text-sb-green">Who you reach</p>
          <p className="mt-3 text-4xl font-extrabold tracking-tight text-sb-ink sm:text-5xl">{ind.modal.reach}</p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="overflow-hidden rounded-[28px] bg-white"
        >
          <WaitingRoomScene />
        </motion.div>
      </div>
    </section>
  );
}

export default function Healthcare() {
  return (
    <SignageChrome>
      <Hero />
      <WaitingRoomPlaylist />
      <Receptionist />
      <Reach />
    </SignageChrome>
  );
}
