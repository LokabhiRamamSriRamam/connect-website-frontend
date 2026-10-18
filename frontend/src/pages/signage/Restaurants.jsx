import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Coffee, UtensilsCrossed, Moon, Music, Clock } from "lucide-react";
import SignageChrome from "./SignageChrome";
import WhatsAppIcon from "../../components/WhatsAppIcon";
import { waLink } from "../../lib/whatsapp";
import { getIndustry } from "../../components/screenbazaar/content";
import { Sparkle } from "../../components/screenbazaar/Decor";
import { CafeScene, CoffeeSticker, CroissantSticker, ClockSticker, ChefHatSticker, RESTAURANT_ICONS } from "./art/restaurants";

/* Restaurants & Cafés — the menu board. Design language: chalk-black board, clock, dotted menu leaders. */

const ind = getIndustry("restaurants");

// Photo not supplied yet. When it arrives, set e.g. { src: "/screen-bazaar/industry-restaurants.webp", alt: "…" }.
const HERO_IMAGE = null;

const DAYPARTS = [
  { from: 7, label: "Breakfast", icon: Coffee, items: [["Masala Omelette", "₹149"], ["Filter Coffee", "₹60"], ["Poha", "₹89"]], accent: "text-sb-gold" },
  { from: 11.5, label: "Lunch", icon: UtensilsCrossed, items: [["Lunch Thali", "₹249"], ["Paneer Bowl", "₹219"], ["Fresh Lime", "₹79"]], accent: "text-[#FFB38A]" },
  { from: 16, label: "Evening", icon: Coffee, items: [["Chai + Samosa", "₹99"], ["Cold Coffee", "₹129"], ["Vada Pav", "₹49"]], accent: "text-sb-lilac" },
  { from: 19, label: "Dinner", icon: Moon, items: [["Chef's Special", "₹399"], ["Family Platter", "₹899"], ["Kulfi", "₹99"]], accent: "text-sb-violet" },
  { from: 21.5, label: "Tonight", icon: Music, items: [["Live Music", "9:30 PM"], ["Mocktail Hour", "2 for 1"], ["Dessert Bar", "Open"]], accent: "text-sb-gold" },
];

const partFor = (h) => [...DAYPARTS].reverse().find((p) => h >= p.from) || DAYPARTS[0];
const fmt = (h) => {
  const hh = Math.floor(h);
  const mm = Math.round((h - hh) * 60);
  const ampm = hh >= 12 ? "PM" : "AM";
  return `${((hh + 11) % 12) + 1}:${String(mm).padStart(2, "0")} ${ampm}`;
};

function MenuBoard({ hour, big = false }) {
  const part = partFor(hour);
  const Icon = part.icon;
  return (
    <div className={`rounded-[28px] border-[10px] border-[#3a2a1e] bg-sb-ink shadow-[10px_10px_0_#191919] ${big ? "p-8 sm:p-10" : "p-6"}`}>
      <div className="flex items-center justify-between text-white/60">
        <span className="text-xs font-extrabold uppercase tracking-[0.25em]">Café Menu</span>
        <span className="flex items-center gap-1.5 text-xs font-bold"><Clock size={14} /> {fmt(hour)}</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={part.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35 }}
        >
          <p className={`mt-5 flex items-center gap-3 font-extrabold tracking-tight ${part.accent} ${big ? "text-5xl" : "text-4xl"}`}>
            <Icon size={big ? 40 : 32} /> {part.label}
          </p>
          <ul className="mt-6 space-y-3">
            {part.items.map(([n, p]) => (
              <li key={n} className="flex items-baseline gap-3 text-lg font-bold text-white">
                <span>{n}</span>
                <span className="flex-1 border-b-2 border-dotted border-white/30" />
                <span className="text-sb-gold">{p}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F6F2EA] pb-20 pt-32 sm:pt-36">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{ backgroundImage: "repeating-linear-gradient(45deg, rgba(191,177,166,.18) 0 2px, transparent 2px 18px)" }}
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="text-center lg:text-left">
          <p className="text-sm font-extrabold uppercase tracking-[0.25em] text-sb-violet">Restaurants &amp; Cafés</p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-sb-ink sm:text-6xl lg:text-7xl"
          >
            Keep your menu <span className="sb-gradient-text">moving</span> with the moment.
          </motion.h1>
          <p className="mx-auto mt-7 max-w-lg text-lg font-semibold text-sb-slate sm:text-xl lg:mx-0">{ind.modal.intro}</p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <motion.a
              href="/get-in-touch"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-3 rounded-full border-2 border-sb-ink bg-sb-gradient px-8 py-4 text-lg font-extrabold text-white shadow-[5px_5px_0_#191919]"
            >
              Get Started <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} />
            </motion.a>
            <motion.a
              href={waLink("restaurants")}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 rounded-full border-2 border-sb-ink bg-white px-7 py-4 text-lg font-extrabold text-sb-ink shadow-[5px_5px_0_#191919]"
            >
              <WhatsAppIcon size={20} /> WhatsApp us
            </motion.a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          {HERO_IMAGE ? (
            <img src={HERO_IMAGE.src} alt={HERO_IMAGE.alt} width="1536" height="1024" className="w-full" fetchpriority="high" />
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.94, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 1 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 90 }}
              className="overflow-hidden rounded-[32px] border-2 border-sb-ink shadow-[8px_8px_0_#191919]"
            >
              <CafeScene />
            </motion.div>
          )}
          <CoffeeSticker className="absolute -left-3 -top-8 h-16 w-16 sm:-left-8 sm:h-24 sm:w-24" />
          <CroissantSticker className="absolute -bottom-8 -left-2 h-16 w-16 sm:-left-8 sm:h-24 sm:w-24" />
          <ClockSticker className="absolute -right-2 -top-8 h-14 w-14 sm:-right-6 sm:h-20 sm:w-20" />
        </div>
      </div>
    </section>
  );
}

/* Scrub through the day and watch the board follow. */
function DayScrubber() {
  const [hour, setHour] = useState(11.5);
  return (
    <section className="bg-sb-cream px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-sb-violet">Try it: drag the clock</p>
          <h2 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-sb-ink sm:text-5xl">
            One screen. The whole day.
          </h2>
          <div className="mt-10 rounded-3xl border-2 border-sb-ink bg-white p-6 shadow-[5px_5px_0_#191919]">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-extrabold tabular-nums text-sb-ink">{fmt(hour)}</span>
              <span className="rounded-full bg-sb-lilac px-3 py-1 text-sm font-extrabold text-sb-indigo">{partFor(hour).label}</span>
            </div>
            <input
              type="range"
              min={7}
              max={23}
              step={0.5}
              value={hour}
              onChange={(e) => setHour(Number(e.target.value))}
              aria-label="Time of day"
              className="mt-6 w-full accent-[#914BFA]"
            />
            <div className="mt-2 flex justify-between text-xs font-bold text-sb-muted">
              <span>7 AM</span>
              <span>Noon</span>
              <span>5 PM</span>
              <span>11 PM</span>
            </div>
          </div>
        </div>
        <MenuBoard hour={hour} />
      </div>
    </section>
  );
}

/* Use cases as a printed menu card. */
function MenuCard() {
  return (
    <section className="bg-sb-ivory px-4 py-20 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-2xl rotate-[-0.6deg] rounded-[6px] border-2 border-sb-ink bg-white px-5 py-12 shadow-[8px_8px_0_#191919] sm:px-14">
        <Sparkle size={26} color="#F5C542" className="absolute -right-3 -top-3" />
        <ChefHatSticker className="absolute -left-4 -top-10 h-16 w-16 sm:-left-10 sm:h-20 sm:w-20" />
        <p className="text-center text-xs font-extrabold uppercase tracking-[0.3em] text-sb-muted">Today's menu</p>
        <h2 className="mt-2 text-center text-3xl font-extrabold tracking-tight text-sb-ink sm:text-4xl">What your screen can do</h2>
        <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-sb-gradient" />
        <ul className="mt-10 space-y-5">
          {ind.modal.can.map((item, i) => {
            const Icon = RESTAURANT_ICONS[i];
            return (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="sg-card flex items-center gap-3 text-base font-bold text-sb-ink sm:text-xl"
              >
                <Icon />
                <span>{item}</span>
                <span className="hidden flex-1 border-b-2 border-dotted border-sb-taupe sm:block" />
                <span className="ml-auto text-sm font-extrabold text-sb-violet sm:ml-0">0{i + 1}</span>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* 11:30 AM — the switch-over, as a flip clock. */
function ElevenThirty() {
  return (
    <section className="bg-sb-gradient px-4 py-20 text-white sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[auto_1fr]">
        <div className="flex justify-center gap-1.5 sm:gap-2" aria-hidden="true">
          {["1", "1", ":", "3", "0"].map((c, i) =>
            c === ":" ? (
              <span key={i} className="self-center text-4xl font-extrabold sm:text-6xl">:</span>
            ) : (
              <motion.span
                key={i}
                initial={{ rotateX: 90 }}
                whileInView={{ rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="flex h-20 w-14 items-center justify-center rounded-2xl border-2 border-sb-ink bg-sb-ink text-5xl font-extrabold shadow-[4px_4px_0_#F5C542] sm:h-28 sm:w-20 sm:text-7xl"
              >
                {c}
              </motion.span>
            )
          )}
        </div>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-sb-gold">Imagine this</p>
          {ind.modal.imagine.map((l) => (
            <p key={l} className="mt-3 text-3xl font-extrabold leading-snug sm:text-4xl">{l}</p>
          ))}
          <div className="mt-8 inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-2.5">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/70">Who you reach</span>
            <span className="rounded-full bg-sb-gold px-4 py-1 font-extrabold text-sb-ink">{ind.modal.reach}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Restaurants() {
  return (
    <SignageChrome>
      <Hero />
      <DayScrubber />
      <MenuCard />
      <ElevenThirty />
    </SignageChrome>
  );
}
