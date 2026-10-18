import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Building, Ruler } from "lucide-react";
import SignageChrome from "./SignageChrome";
import WhatsAppIcon from "../../components/WhatsAppIcon";
import { waLink } from "../../lib/whatsapp";
import { getIndustry } from "../../components/screenbazaar/content";
import { SalesOfficeScene, HouseSticker, CraneSticker, SoldSticker, PinSticker, REALESTATE_ICONS } from "./art/realestate";

/* Real Estate — the sales office. Design language: blueprint grid, tower elevation, floor plan, site signboard. */

const ind = getIndustry("real-estate");

// Photo not supplied yet. When it arrives, set e.g. { src: "/screen-bazaar/industry-real-estate.webp", alt: "…" }.
const HERO_IMAGE = null;

const BLUEPRINT = {
  backgroundColor: "#1F30A0",
  backgroundImage:
    "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
};

// 10 floors × 4 units, typed and marked sold/available (fixed so it renders the same every time).
const TYPES = ["2 BHK", "3 BHK", "3 BHK", "2 BHK"];
const SOLD = new Set([0, 1, 3, 4, 6, 9, 10, 13, 14, 17, 19, 22, 25, 27, 30, 33, 35]);
const UNITS = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  floor: 10 - Math.floor(i / 4),
  type: i < 4 ? "Penthouse" : TYPES[i % 4],
  sold: SOLD.has(i),
}));
const FILTERS = ["All", "2 BHK", "3 BHK", "Penthouse"];

// Rooms of a floor plan, one per use case from the owner's list.
const ROOMS = [
  { name: "Living", span: "col-span-2 row-span-1 sm:row-span-2" },
  { name: "Bedroom", span: "col-span-1 row-span-2" },
  { name: "Kitchen", span: "col-span-1 row-span-1" },
  { name: "Balcony", span: "col-span-1 row-span-1" },
  { name: "Study", span: "col-span-2 row-span-1 sm:col-span-4" },
];

function Tower({ filter }) {
  return (
    <div className="grid grid-cols-4 gap-1.5 rounded-t-xl border-2 border-white/70 bg-white/5 p-2.5">
      {UNITS.map((u) => {
        const match = filter === "All" || u.type === filter;
        const lit = !u.sold && match;
        return (
          <motion.span
            key={u.id}
            title={`Floor ${u.floor} · ${u.type} · ${u.sold ? "Sold" : "Available"}`}
            animate={{ opacity: lit ? 1 : u.sold ? 0.25 : 0.45 }}
            className={`h-5 rounded-sm ${lit ? "bg-sb-gold shadow-[0_0_12px_rgba(245,197,66,.8)]" : u.sold ? "bg-white/40" : "bg-white/70"}`}
          />
        );
      })}
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pb-24 pt-32 text-white sm:pt-40" style={BLUEPRINT}>
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8">
        <div className="text-center lg:text-left">
          <p className="inline-flex items-center gap-2 border border-dashed border-white/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-white/80 sm:text-xs sm:tracking-[0.2em]">
            <Ruler size={14} /> Developers · Brokers · Sales offices
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Let your properties <span className="text-sb-gold">sell themselves.</span>
          </motion.h1>
          <p className="mx-auto mt-7 max-w-xl text-lg font-semibold text-white/75 sm:text-xl lg:mx-0">{ind.modal.intro}</p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <motion.a
              href="/get-in-touch"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-3 rounded-md bg-sb-gold px-8 py-4 text-lg font-extrabold text-sb-ink shadow-[5px_5px_0_#191919]"
            >
              Get Started <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} />
            </motion.a>
            <motion.a
              href={waLink("real-estate")}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 rounded-md bg-white px-7 py-4 text-lg font-extrabold text-sb-ink shadow-[5px_5px_0_#191919]"
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
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
              className="overflow-hidden rounded-[20px] border-4 border-white shadow-[10px_10px_0_rgba(0,0,0,.35)]"
            >
              <SalesOfficeScene />
            </motion.div>
          )}
          <CraneSticker className="absolute -left-4 -top-12 h-16 w-16 sm:-left-10 sm:h-24 sm:w-24" />
          <HouseSticker className="absolute -right-2 -top-10 h-16 w-16 sm:-right-8 sm:h-20 sm:w-20" />
          <SoldSticker className="absolute -bottom-10 right-6 h-16 w-16 sm:h-24 sm:w-24" />
        </div>
      </div>
    </section>
  );
}

/* Use cases as rooms on a floor plan. */
function FloorPlan() {
  return (
    <section className="bg-sb-cream px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-sb-violet">Plan · What your screen can do</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-sb-ink sm:text-5xl">Five rooms. One screen does them all.</h2>
          <PinSticker className="mt-6 h-16 w-16 sm:h-20 sm:w-20" />
        </div>
        <div className="grid auto-rows-[140px] grid-cols-2 gap-0 border-4 border-sb-indigo bg-white sm:auto-rows-[140px] sm:grid-cols-4">
          {ind.modal.can.map((item, i) => {
            const Icon = REALESTATE_ICONS[i];
            return (
              <motion.div
                key={item}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`sg-card relative flex flex-col justify-end border-2 border-sb-indigo/60 p-3 transition hover:bg-sb-lavender sm:p-4 ${ROOMS[i].span}`}
              >
                <span className="absolute left-3 top-2 font-mono text-[10px] uppercase tracking-[0.2em] text-sb-muted">{ROOMS[i].name}</span>
                <span className="absolute right-2 top-2">
                  <Icon />
                </span>
                <p className="text-sm font-extrabold leading-snug text-sb-indigo sm:text-lg">{item}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* The sales-office screen: filter a unit type and watch availability light up. */
function Availability() {
  const [filter, setFilter] = useState("All");
  const available = useMemo(() => UNITS.filter((u) => !u.sold && (filter === "All" || u.type === filter)).length, [filter]);

  return (
    <section className="px-4 py-20 text-white sm:px-6 sm:py-28 lg:px-8" style={BLUEPRINT}>
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-sb-gold">Imagine this</p>
          {ind.modal.imagine.map((l) => (
            <p key={l} className="mt-3 text-3xl font-extrabold leading-snug sm:text-4xl">{l}</p>
          ))}
          <div className="mt-8 flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={`rounded-md border-2 px-4 py-2 text-sm font-extrabold transition ${
                  filter === f ? "border-sb-gold bg-sb-gold text-sb-ink" : "border-white/50 hover:border-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-4 flex items-baseline justify-between">
            <span className="flex items-center gap-2 font-bold text-white/80">
              <Building size={18} /> Tower A
            </span>
            <span className="text-3xl font-extrabold text-sb-gold tabular-nums">
              {available} <span className="text-base text-white/80">available</span>
            </span>
          </div>
          <Tower filter={filter} />
          <div className="h-3 rounded-b-md bg-white/70" />
        </div>
      </div>
    </section>
  );
}

/* Who you reach, on a site signboard. */
function SiteBoard() {
  return (
    <section className="bg-sb-cream px-4 pt-20 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-md flex-col items-center">
        <div className="w-full border-4 border-sb-ink bg-sb-gold px-8 py-6 text-center shadow-[6px_6px_0_#191919]">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-sb-ink/70">Who you reach</p>
          <p className="mt-2 text-3xl font-extrabold text-sb-ink sm:text-4xl">{ind.modal.reach}</p>
        </div>
        <div className="flex w-2/3 justify-between">
          <span className="h-16 w-2.5 bg-sb-ink" />
          <span className="h-16 w-2.5 bg-sb-ink" />
        </div>
      </div>
    </section>
  );
}

export default function RealEstate() {
  return (
    <SignageChrome>
      <Hero />
      <FloorPlan />
      <Availability />
      <SiteBoard />
    </SignageChrome>
  );
}
