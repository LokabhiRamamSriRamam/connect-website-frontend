import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Store, Send, RotateCcw } from "lucide-react";
import SignageChrome from "./SignageChrome";
import WhatsAppIcon from "../../components/WhatsAppIcon";
import { waLink } from "../../lib/whatsapp";
import { getIndustry } from "../../components/screenbazaar/content";
import { Squiggle, Sparkle, Blob, Ticker } from "../../components/screenbazaar/Decor";
import { PriceTagSticker, BagSticker, HangerSticker, PercentSticker, HighStreetScene, RETAIL_ICONS } from "./art/retail";

/* Retail — the store window. Design language: shop-window screen, swing tags, branch roll-out. */

const ind = getIndustry("retail");

const CAMPAIGNS = [
  { key: "new", tab: "New arrivals", big: "NEW IN", sub: "The spring edit", tag: "Just landed", bg: "bg-sb-violet", fg: "text-white" },
  { key: "offer", tab: "Limited offer", big: "40% OFF", sub: "Denim, today only", tag: "Ends 9 PM", bg: "bg-sb-gold", fg: "text-sb-ink" },
  { key: "season", tab: "Seasonal", big: "FESTIVE", sub: "Gifts under ₹999", tag: "In store now", bg: "bg-sb-indigo", fg: "text-white" },
  { key: "missed", tab: "Don't miss", big: "AISLE 4", sub: "Bags you walked past", tag: "Take a look", bg: "bg-[#FEE8EC]", fg: "text-sb-ink" },
];

const STORES = ["Andheri", "Bandra", "Powai", "Thane", "Pune", "Nashik"];

function Hero() {
  return (
    <section className="relative overflow-hidden bg-sb-warm pb-20 pt-32 sm:pt-36">
      <Blob className="absolute -right-24 top-10 h-96 w-96 bg-sb-violet/25 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:px-8">
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-r-full rounded-l-md border-2 border-sb-ink bg-sb-gold py-1.5 pl-3 pr-5 text-xs font-extrabold uppercase tracking-[0.2em] text-sb-ink shadow-[3px_3px_0_#191919]">
            <span className="h-2.5 w-2.5 rounded-full border-2 border-sb-ink bg-white" />
            Digital signage for retail
          </span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-sb-ink sm:text-6xl lg:text-7xl"
          >
            Make your store{" "}
            <span className="relative inline-block">
              <span className="sb-gradient-text">impossible to ignore.</span>
              <Squiggle className="absolute -bottom-3 left-0 h-4 w-full" />
            </span>
          </motion.h1>
          <p className="mx-auto mt-8 max-w-xl text-lg font-semibold text-sb-slate sm:text-xl lg:mx-0">{ind.line}</p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <motion.a
              href="/get-in-touch"
              whileHover={{ scale: 1.04, rotate: -1 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-3 rounded-full border-2 border-sb-ink bg-sb-gradient px-8 py-4 text-lg font-extrabold text-white shadow-[5px_5px_0_#191919]"
            >
              Get Started <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} />
            </motion.a>
            <motion.a
              href={waLink("retail")}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, rotate: 1 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 rounded-full border-2 border-sb-ink bg-white px-7 py-4 text-lg font-extrabold text-sb-ink shadow-[5px_5px_0_#191919]"
            >
              <WhatsAppIcon size={20} /> WhatsApp us
            </motion.a>
            <a href="#window" className="font-extrabold text-sb-ink underline decoration-sb-violet decoration-2 underline-offset-4">
              Dress the window →
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-2xl">
          <div className="absolute inset-x-8 bottom-4 top-12 rounded-[42%_58%_50%_50%/55%_45%_55%_45%] bg-sb-gradient sb-blob" />
          <motion.img
            src="/screen-bazaar/industry-retail.webp"
            alt="Two shoppers with bags smiling and pointing at a fashion store screen announcing new arrivals at up to 40% off"
            width="1536"
            height="1024"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative z-10 w-full drop-shadow-[0_30px_40px_rgba(31,48,160,0.35)]"
            fetchpriority="high"
          />
          <PercentSticker className="absolute left-0 top-0 z-20 h-16 w-16 sm:-left-4 sm:h-24 sm:w-24" />
          <PriceTagSticker className="absolute right-2 top-0 z-20 h-14 w-14 sm:-top-6 sm:right-4 sm:h-20 sm:w-20" />
          <BagSticker className="absolute bottom-0 right-4 z-20 h-14 w-14 sm:-bottom-4 sm:right-10 sm:h-20 sm:w-20" />
        </div>
      </div>
    </section>
  );
}

/* A shop window whose portrait screen the visitor can re-dress. */
function WindowDresser() {
  const [active, setActive] = useState(CAMPAIGNS[0]);
  return (
    <section id="window" className="scroll-mt-28 bg-sb-cream px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
        <div>
          <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-sb-ink sm:text-5xl">{ind.modal.title}</h2>
          <p className="mt-5 text-lg font-semibold text-sb-slate">{ind.modal.intro}</p>
          <p className="mt-10 text-xs font-extrabold uppercase tracking-[0.2em] text-sb-violet">Try it: change the window</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {CAMPAIGNS.map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={() => setActive(c)}
                aria-pressed={active.key === c.key}
                className={`rounded-full border-2 border-sb-ink px-5 py-2.5 text-sm font-extrabold transition ${
                  active.key === c.key ? "bg-sb-ink text-white" : "bg-white text-sb-ink shadow-[3px_3px_0_#191919] hover:-translate-y-0.5"
                }`}
              >
                {c.tab}
              </button>
            ))}
          </div>
        </div>

        {/* storefront */}
        <div className="relative mx-auto w-full max-w-md">
          <HangerSticker className="absolute -left-4 -top-12 z-10 h-14 w-14 sm:-left-10 sm:h-20 sm:w-20" />
          <div className="flex h-10 overflow-hidden rounded-t-2xl border-2 border-b-0 border-sb-ink">
            {Array.from({ length: 8 }, (_, i) => (
              <span key={i} className={`flex-1 ${i % 2 ? "bg-sb-lavender" : "bg-sb-violet"}`} />
            ))}
          </div>
          <div className="rounded-b-2xl border-2 border-sb-ink bg-sb-sand p-6 shadow-[8px_8px_0_#191919]">
            <div className="grid grid-cols-[1fr_1.1fr] gap-5">
              <div className="flex flex-col justify-end gap-3 rounded-xl border-2 border-dashed border-sb-taupe p-3">
                <ShoppingBag className="text-sb-violet" size={34} />
                <div className="h-2 w-3/4 rounded bg-sb-taupe/60" />
                <div className="h-2 w-1/2 rounded bg-sb-taupe/60" />
              </div>
              <div className="rounded-2xl border-[6px] border-sb-ink bg-sb-ink">
                <div className="relative aspect-[9/16] overflow-hidden rounded-lg">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active.key}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -24 }}
                      transition={{ duration: 0.35 }}
                      className={`absolute inset-0 flex flex-col justify-between p-4 ${active.bg} ${active.fg}`}
                    >
                      <span className="self-start rounded-full bg-white/25 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider">
                        {active.tag}
                      </span>
                      <div>
                        <p className="text-3xl font-extrabold leading-none">{active.big}</p>
                        <p className="mt-2 text-sm font-bold opacity-90">{active.sub}</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
          <Sparkle size={30} color="#F5C542" className="absolute -right-4 -top-4" />
        </div>
      </div>
    </section>
  );
}

/* Use cases as swing tags on a rail. */
function SwingTags() {
  const colors = ["bg-sb-gold", "bg-white", "bg-sb-lilac", "bg-sb-violet text-white", "bg-[#FEE8EC]"];
  return (
    <section className="bg-sb-ivory px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs font-extrabold uppercase tracking-[0.22em] text-sb-violet">What your screen can do</p>
        <div className="relative mt-12">
          <div className="absolute inset-x-0 top-0 hidden h-2 rounded-full bg-sb-slate lg:block" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
            {ind.modal.can.map((item, i) => {
              const Icon = RETAIL_ICONS[i];
              return (
              <motion.div
                key={item}
                initial={{ opacity: 0, rotate: 0, y: -20 }}
                whileInView={{ opacity: 1, rotate: i % 2 ? 3 : -3, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 120, damping: 10 }}
                whileHover={{ rotate: 0 }}
                style={{ transformOrigin: "50% 0%" }}
                className="relative flex flex-col items-center pt-10"
              >
                <span className="absolute top-0 h-10 w-0.5 bg-sb-slate" />
                <div className={`sg-card relative w-full rounded-2xl border-2 border-sb-ink px-5 pb-6 pt-9 shadow-[5px_5px_0_#191919] ${colors[i]}`}>
                  <span className="absolute left-1/2 top-3 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-sb-ink bg-sb-cream" />
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-extrabold opacity-60">No. {i + 1}</p>
                    <span className="rounded-xl bg-white/80 p-1">
                      <Icon />
                    </span>
                  </div>
                  <p className="mt-2 text-lg font-extrabold leading-snug">{item}</p>
                </div>
              </motion.div>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* The weekend-sale scenario, playable: publish once, watch every branch flip. */
function WeekendRollout() {
  const [published, setPublished] = useState(false);
  return (
    <section className="bg-sb-ink px-4 py-20 text-white sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-sb-gold">Imagine this</p>
        <div className="mt-4 max-w-3xl space-y-2 text-3xl font-extrabold leading-snug sm:text-4xl">
          {ind.modal.imagine.map((l) => (
            <p key={l}>{l}</p>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {STORES.map((s, i) => (
            <div key={s} className="rounded-2xl border-2 border-white/15 bg-white/5 p-3">
              <div className="flex items-center gap-2 text-sm font-bold text-white/70">
                <Store size={16} /> {s}
              </div>
              <div className="relative mt-3 aspect-video overflow-hidden rounded-lg border-4 border-black" style={{ perspective: 600 }}>
                <motion.div
                  animate={{ rotateY: published ? 180 : 0 }}
                  transition={{ delay: published ? i * 0.18 : 0, duration: 0.6 }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="absolute inset-0"
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-sb-violet text-lg font-extrabold [backface-visibility:hidden]">
                    NEW IN
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-sb-gold text-sb-ink [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <span className="text-lg font-extrabold leading-none">WEEKEND SALE</span>
                    <span className="text-xs font-bold">Up to 40% off</span>
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => setPublished((p) => !p)}
            className="inline-flex items-center gap-2 rounded-full border-2 border-white bg-sb-gradient px-7 py-3.5 font-extrabold shadow-[4px_4px_0_#F5C542]"
          >
            {published ? <RotateCcw size={18} /> : <Send size={18} />}
            {published ? "Reset" : "Publish to all stores"}
          </button>
          <AnimatePresence>
            {published && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 1.3 }}
                className="font-bold text-sb-gold"
              >
                Live in {STORES.length} stores, before the doors open.
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Reach() {
  return (
    <section className="bg-sb-cream px-4 pt-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div className="text-center lg:text-left">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-sb-muted">Who you reach</p>
          <p className="mt-3 flex items-center justify-center gap-3 text-5xl font-extrabold tracking-tight text-sb-ink sm:text-7xl lg:justify-start">
            <ShoppingBag className="sb-bounce hidden text-sb-violet sm:block" size={52} />
            {ind.modal.reach}.
          </p>
          <p className="mt-4 text-lg font-semibold text-sb-slate">Every one of them walks past your screen.</p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="overflow-hidden rounded-[28px] border-2 border-sb-ink shadow-[6px_6px_0_#191919]"
        >
          <HighStreetScene />
        </motion.div>
      </div>
    </section>
  );
}

const TICKER = ["New in", "Weekend sale", "Festive edit", "Up to 40% off", "Just dropped", "Every store, one tap"];

function RetailTicker() {
  return (
    <div className="-mx-4 rotate-[-1.5deg] border-y-2 border-sb-ink bg-sb-gold py-3 text-base font-extrabold uppercase tracking-wider text-sb-ink sm:text-lg">
      <Ticker items={TICKER} className="[&_svg]:text-sb-violet" />
    </div>
  );
}

export default function Retail() {
  return (
    <SignageChrome>
      <Hero />
      <RetailTicker />
      <WindowDresser />
      <SwingTags />
      <WeekendRollout />
      <Reach />
    </SignageChrome>
  );
}
