import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, LayoutGrid, MapPin, Minus, Monitor, MonitorPlay, Plus } from "lucide-react";
import SignageChrome from "./signage/SignageChrome";
import { Blob, Sparkle, Squiggle, StickerBadge, Ticker } from "../components/screenbazaar/Decor";
import { IconCarefree, IconOneTime, IconTransparent, IconWarranty, QuotePreview } from "../components/pricing/art";
import OtherProductsPricing from "../components/pricing/OtherProductsPricing";
import "../components/pricing/pricing.css";

/* ------------------------------------------------------------------ */
/* Owner's pricing facts (2026-10-01): starts from ₹15,000 one-time,  */
/* includes the display screen, annual maintenance as applicable,     */
/* 12-month warranty, price varies by screen / count / project size.  */

const TICKER = [
  "Starts from ₹15,000",
  "Includes the display screen",
  "One-time pricing",
  "12-month warranty",
  "Apt and transparent",
  "Priced to your requirement",
];

const SOURCES = [
  { key: "buy", label: "Buy the screen from us" },
  { key: "own", label: "Use my own screen" },
];

const KINDS = [
  { key: "compact", label: "Compact", hint: "Counters and desks" },
  { key: "standard", label: "Standard", hint: "Menu boards and shop walls" },
  { key: "large", label: "Large", hint: "Lobbies and showrooms" },
  { key: "unsure", label: "Help me choose", hint: "We'll suggest one" },
];

// Same buckets as the "How many screens?" field on /get-in-touch, so the choice carries over.
const COUNTS = ["1", "2–5", "6–20", "20+"];

const SCALES = [
  { key: "one", label: "One location" },
  { key: "few", label: "A few locations" },
  { key: "many", label: "Many locations" },
];

const PROMISES = [
  {
    Icon: IconOneTime,
    title: "One-time",
    body: "Pricing is one-time. Annual maintenance charges apply only as and when applicable.",
  },
  {
    Icon: IconTransparent,
    title: "Transparent",
    body: "Whatever your requirement, the price will be apt and transparent.",
  },
  {
    Icon: IconWarranty,
    title: "12-month warranty",
    body: "The products come with a warranty of 12 months.",
  },
  {
    Icon: IconCarefree,
    title: "Carefree",
    body: "One-time and transparent, so you can be carefree about the price.",
  },
];

const FAQS = [
  {
    q: "Why isn't there a fixed price?",
    a: "Pricing can't be uniform, because every business has its own requirement. It depends on the kind of screen you choose (if you're buying the screen as well), how many screens you need and how big the project is. Whatever that adds up to, the price will be apt and transparent.",
  },
  {
    q: "Does the ₹15,000 starting price include the screen?",
    a: "Yes. Pricing starts from ₹15,000 one-time, and that includes the display screen.",
  },
  {
    q: "Is it a one-time payment?",
    a: "Yes, pricing is one-time. Annual maintenance charges apply as and when applicable.",
  },
  {
    q: "Is there a warranty?",
    a: "Yes. The products come with a 12-month warranty.",
  },
  {
    q: "Can I use a screen I already have?",
    a: "Yes. You can buy the screen from us or use your own compatible display. Whether you're buying the screen is one of the things that changes your price.",
  },
  {
    q: "Can I try it first?",
    a: "Yes. There's a 14-day free trial.",
  },
  {
    q: "How do I get my price?",
    a: "Tell us about your space and what you need on the Contact Us page. We'll call you back and work out the price for your exact requirement.",
  },
];

const EASE = [0.22, 1, 0.36, 1];

/* ------------------------------------------------------------------ */

function PriceTag() {
  return (
    <div className="relative mx-auto w-full max-w-md pt-14">
      {/* string */}
      <svg className="absolute left-1/2 top-0 h-[74px] w-10 -translate-x-1/2" viewBox="0 0 40 74" aria-hidden="true">
        <circle cx="20" cy="5" r="4.5" fill="#191919" />
        <path d="M20 8c-6 18 6 34 0 62" stroke="#191919" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </svg>

      <motion.div
        initial={{ opacity: 0, y: -30, rotate: -6 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
      >
        <div className="pr-swing">
          <div className="relative overflow-hidden rounded-[32px] border-2 border-sb-ink bg-white shadow-[8px_8px_0_#191919]">
            <div className="pr-shine relative bg-sb-gradient px-7 pb-8 pt-12 text-white sm:px-9">
              <div
                className="pointer-events-none absolute inset-0 opacity-20"
                style={{ backgroundImage: "radial-gradient(#fff 1.2px, transparent 1.2px)", backgroundSize: "18px 18px" }}
              />
              {/* tag hole */}
              <span className="absolute left-1/2 top-4 h-5 w-5 -translate-x-1/2 rounded-full border-2 border-sb-ink bg-sb-cream" />
              <p className="relative text-xs font-extrabold uppercase tracking-[0.24em] text-white/80">Starts from</p>
              <p className="relative mt-2 flex flex-wrap items-baseline gap-x-3">
                <span className="text-6xl font-extrabold tracking-tight sm:text-7xl">₹15,000</span>
                <span className="text-lg font-extrabold text-sb-gold">one-time</span>
              </p>
              <p className="relative mt-5 inline-flex items-center gap-2 rounded-full border-2 border-sb-ink bg-sb-gold px-4 py-2 text-sm font-extrabold text-sb-ink shadow-[3px_3px_0_#191919]">
                <Monitor size={17} strokeWidth={2.5} />
                Includes the display screen
              </p>
            </div>

            <ul className="space-y-3 px-7 py-7 sm:px-9">
              {[
                "12-month warranty on the products",
                "Annual maintenance charges, as and when applicable",
                "Final price set by your requirement",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 font-semibold text-sb-slate">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sb-mint text-sb-green">
                    <Check size={13} strokeWidth={3.5} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      <StickerBadge
        text="ONE-TIME • TRANSPARENT • APT • "
        size={108}
        className="absolute -right-10 -top-2 z-10 hidden sm:block"
        center={<Sparkle size={30} color="#914BFA" />}
      />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-sb-warm pb-20 pt-32 sm:pt-36 lg:pb-28">
      <Blob className="absolute -left-24 top-24 h-72 w-72 bg-sb-lilac opacity-70 blur-2xl" />
      <Blob className="absolute -right-20 -top-16 h-96 w-96 bg-sb-violet/25 blur-3xl" style={{ animationDelay: "-4s" }} />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(rgba(75,63,208,0.18) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "linear-gradient(180deg, black, transparent 80%)",
          WebkitMaskImage: "linear-gradient(180deg, black, transparent 80%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:px-8">
        <div className="relative z-10 text-center lg:text-left">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border-2 border-sb-ink bg-white px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-sb-ink shadow-[3px_3px_0_#191919]"
          >
            <Sparkle size={14} color="#914BFA" />
            Digital signage pricing
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-5xl font-extrabold leading-[1.02] tracking-tight text-sb-ink sm:text-6xl lg:text-7xl"
          >
            Priced to your{" "}
            <span className="relative inline-block">
              <span className="sb-gradient-text">requirement.</span>
              <Squiggle className="absolute -bottom-3 left-0 h-4 w-full sm:-bottom-4 sm:h-5" />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-9 max-w-xl text-lg font-semibold leading-relaxed text-sb-slate sm:text-xl lg:mx-0"
          >
            Every business needs something different, so pricing can&apos;t be uniform. Whatever you need, your price
            will be <span className="sb-mark">apt and transparent.</span>
          </motion.p>

          <div className="relative mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <motion.a
              href="/get-in-touch"
              whileHover={{ scale: 1.04, rotate: -1 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-3 rounded-full border-2 border-sb-ink bg-sb-gradient px-8 py-4 text-lg font-extrabold text-white shadow-[5px_5px_0_#191919] transition-shadow hover:shadow-[7px_7px_0_#191919]"
            >
              Get your price
              <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} />
            </motion.a>
            <a
              href="#shape"
              className="inline-flex items-center gap-2 rounded-full border-2 border-sb-ink bg-white px-7 py-4 font-extrabold text-sb-ink transition-colors hover:bg-sb-ink hover:text-white"
            >
              What changes the price?
            </a>
          </div>

          {/* Someone weighing cost wants to know what they are buying. */}
          <a
            href="/test-drive"
            className="group mt-5 inline-flex items-center gap-2 font-extrabold text-sb-ink underline decoration-sb-violet decoration-2 underline-offset-4 transition-colors hover:text-sb-violet"
          >
            <MonitorPlay size={18} className="text-sb-violet" />
            See what you get — try five screens free
            <ArrowRight className="transition-transform group-hover:translate-x-1" size={16} />
          </a>

          <ul className="mt-8 flex flex-wrap justify-center gap-2 text-xs font-extrabold text-sb-slate lg:justify-start">
            {["One-time pricing", "Display screen included", "12-month warranty"].map((t) => (
              <li key={t} className="rounded-full border border-sb-line bg-white/80 px-3.5 py-2 backdrop-blur">
                {t}
              </li>
            ))}
          </ul>
        </div>

        <PriceTag />
      </div>
    </section>
  );
}

function Strip() {
  return (
    <div className="overflow-hidden bg-sb-cream pt-3">
      <div className="-mx-6 rotate-1 border-y-2 border-sb-ink bg-sb-ink py-3 text-base font-extrabold uppercase tracking-wider text-white">
        <Ticker items={TICKER} className="[&_svg]:text-sb-gold" />
      </div>
    </div>
  );
}

function SectionHead({ eyebrow, title, sub, dark = false, center = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: EASE }}
      className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}
    >
      <p className={`text-xs font-extrabold uppercase tracking-[0.22em] ${dark ? "text-sb-gold" : "text-sb-violet"}`}>{eyebrow}</p>
      <h2 className={`mt-3 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl ${dark ? "text-white" : "text-sb-ink"}`}>{title}</h2>
      {sub && <p className={`mt-4 text-lg font-semibold leading-relaxed ${dark ? "text-white/75" : "text-sb-slate"}`}>{sub}</p>}
    </motion.div>
  );
}

function Choice({ active, onClick, children, hint }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-2xl border-2 px-4 py-3 text-left font-extrabold transition-all ${
        active
          ? "border-sb-ink bg-sb-violet text-white shadow-[3px_3px_0_#191919]"
          : "border-sb-ink/15 bg-white text-sb-ink hover:border-sb-ink"
      }`}
    >
      <span className="block text-[15px]">{children}</span>
      {hint && <span className={`mt-0.5 block text-xs font-semibold ${active ? "text-white/80" : "text-sb-muted"}`}>{hint}</span>}
    </button>
  );
}

function Factor({ n, Icon, title, body, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="relative rounded-[28px] border-2 border-sb-ink bg-white p-6 shadow-[5px_5px_0_#191919] sm:p-7"
    >
      <span className="absolute -top-4 right-6 grid h-9 w-9 place-items-center rounded-full border-2 border-sb-ink bg-sb-gold text-sm font-extrabold text-sb-ink">
        {n}
      </span>
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-sb-lilac text-sb-violet">
          <Icon size={20} strokeWidth={2.4} />
        </span>
        <h3 className="text-xl font-extrabold text-sb-ink">{title}</h3>
      </div>
      <p className="mt-3 font-semibold text-sb-slate">{body}</p>
      <div className="mt-5">{children}</div>
    </motion.div>
  );
}

function ShapeYourQuote() {
  const [source, setSource] = useState("buy");
  const [kind, setKind] = useState("standard");
  const [count, setCount] = useState("2–5");
  const [scale, setScale] = useState("one");

  const kindLabel = KINDS.find((x) => x.key === kind).label;
  const scaleLabel = SCALES.find((x) => x.key === scale).label;
  const screensLabel = count === "1" ? "1 screen" : `${count} screens`;
  const screenLabel =
    source === "own" ? "Using my own screen" : kind === "unsure" ? "Buying the screen · help me choose" : `Buying ${kindLabel.toLowerCase()} screens`;

  const message = `Pricing enquiry: ${screenLabel.toLowerCase()}, ${screensLabel}, ${scaleLabel.toLowerCase()}.`;
  // Values must match the options on /get-in-touch.
  const FORM_KINDS = { compact: "Compact — counters and desks", standard: "Standard — menu boards and shop walls", large: "Large — lobbies and showrooms", unsure: "Help me choose" };
  const FORM_SCALES = { one: "One location", few: "A few locations", many: "Many locations" };
  const params = new URLSearchParams({
    service: "Screen Bazaar (digital signage)",
    source: source === "own" ? "Use my own screen" : "Buy the screen from you",
    scale: FORM_SCALES[scale],
    screens: count,
    message,
  });
  if (source === "buy") params.set("kind", FORM_KINDS[kind]);
  const quoteHref = `/get-in-touch?${params.toString()}`;

  return (
    <section id="shape" className="scroll-mt-24 bg-sb-cream px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          eyebrow="Why there's no price list"
          title={
            <>
              Every requirement is different. <span className="sb-gradient-text">So is every price.</span>
            </>
          }
          sub="Three things move the price. Pick yours to see your setup, then send it to us for your price."
        />

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[1fr_1.05fr]">
          <div className="space-y-8">
            <Factor
              n="1"
              Icon={Monitor}
              title="The screen"
              body="If you're buying the screen as well, the kind of screen you choose changes the price."
            >
              <div className="grid gap-2 sm:grid-cols-2">
                {SOURCES.map((s) => (
                  <Choice key={s.key} active={source === s.key} onClick={() => setSource(s.key)}>
                    {s.label}
                  </Choice>
                ))}
              </div>
              <AnimatePresence initial={false}>
                {source === "buy" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <p className="mb-2 mt-5 text-xs font-extrabold uppercase tracking-[0.16em] text-sb-muted">Kind of screen</p>
                    <div className="grid grid-cols-2 gap-2">
                      {KINDS.map((k) => (
                        <Choice key={k.key} active={kind === k.key} onClick={() => setKind(k.key)} hint={k.hint}>
                          {k.label}
                        </Choice>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Factor>

            <Factor n="2" Icon={LayoutGrid} title="How many screens" body="The number of screens you need changes the price.">
              <div className="grid grid-cols-4 gap-2">
                {COUNTS.map((c) => (
                  <Choice key={c} active={count === c} onClick={() => setCount(c)}>
                    <span className="block text-center">{c}</span>
                  </Choice>
                ))}
              </div>
            </Factor>

            <Factor
              n="3"
              Icon={MapPin}
              title="How big the project is"
              body="One counter or a whole chain: the bigger the project, the more the price will vary."
            >
              <div className="grid gap-2 sm:grid-cols-3">
                {SCALES.map((s) => (
                  <Choice key={s.key} active={scale === s.key} onClick={() => setScale(s.key)}>
                    {s.label}
                  </Choice>
                ))}
              </div>
            </Factor>
          </div>

          {/* live preview */}
          <div className="lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="relative rounded-[32px] border-2 border-sb-ink bg-white p-5 shadow-[8px_8px_0_#914BFA] sm:p-7"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-sb-muted">Your setup</p>
                <p className="text-[11px] font-semibold text-sb-muted">Illustration</p>
              </div>

              <div className="mt-3 overflow-hidden rounded-2xl border border-sb-line bg-sb-ivory">
                <QuotePreview source={source} kind={kind} count={count} scale={scale} />
              </div>

              <ul className="mt-5 flex flex-wrap gap-2" aria-live="polite">
                {[screenLabel, screensLabel, scaleLabel].map((t, i) => (
                  <motion.li
                    key={t}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 24 }}
                    className={`rounded-full px-3.5 py-1.5 text-sm font-extrabold ${
                      i === 0 ? "bg-sb-violet text-white" : "bg-sb-lilac text-sb-ink"
                    }`}
                  >
                    {t}
                  </motion.li>
                ))}
              </ul>

              <p className="mt-5 font-semibold text-sb-slate">
                Each of these moves the price, so we work out yours instead of printing a price list. It starts from{" "}
                <span className="font-extrabold text-sb-ink">₹15,000 one-time</span>, display screen included.
              </p>

              <motion.a
                href={quoteHref}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group mt-6 flex w-full items-center justify-center gap-3 rounded-full border-2 border-sb-ink bg-sb-gradient px-6 py-4 text-base font-extrabold text-white shadow-[4px_4px_0_#191919]"
              >
                Get my price for this setup
                <ArrowRight className="transition-transform group-hover:translate-x-1" size={18} />
              </motion.a>

              <p className="mt-3 text-center text-xs font-semibold text-sb-muted">Your choices are filled into the contact form for you.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingPromise() {
  return (
    <section className="relative overflow-hidden bg-sb-ink px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "22px 22px" }}
      />
      <Blob className="absolute -right-32 -top-32 h-96 w-96 bg-sb-violet/40 blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
        <SectionHead
          dark
          center
          eyebrow="The pricing promise"
          title={
            <>
              One-time. Transparent. <span className="text-sb-gold">Carefree.</span>
            </>
          }
          sub="However your requirement shapes the price, it stays apt and transparent."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROMISES.map(({ Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 200, damping: 20 }}
              whileHover={{ y: -6 }}
              className={`rounded-[28px] border-2 p-6 ${i === 0 ? "border-sb-gold bg-white/[0.08]" : "border-white/15 bg-white/[0.04]"}`}
            >
              <div className="grid h-20 w-20 place-items-center rounded-2xl bg-white">
                <Icon />
              </div>
              <h3 className="mt-5 text-xl font-extrabold">{title}</h3>
              <p className="mt-2 font-semibold leading-relaxed text-white/70">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="bg-sb-cream px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-3xl">
        <SectionHead center eyebrow="Questions" title="Pricing, answered." />
        <div className="mt-12 space-y-3">
          {FAQS.map(({ q, a }, i) => {
            const isOpen = open === i;
            return (
              <div
                key={q}
                className={`overflow-hidden rounded-2xl border-2 bg-white transition-shadow ${
                  isOpen ? "border-sb-ink shadow-[4px_4px_0_#191919]" : "border-sb-ink/15"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[17px] font-extrabold text-sb-ink"
                >
                  {q}
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${isOpen ? "bg-sb-violet text-white" : "bg-sb-lilac text-sb-violet"}`}>
                    {isOpen ? <Minus size={16} strokeWidth={3} /> : <Plus size={16} strokeWidth={3} />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                    >
                      <p className="px-5 pb-5 font-semibold leading-relaxed text-sb-slate">{a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function Pricing() {
  return (
    <SignageChrome>
      <Hero />
      <Strip />
      <ShapeYourQuote />
      <PricingPromise />
      <FAQ />
      <OtherProductsPricing />
    </SignageChrome>
  );
}
