import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FooterWordmark from "../FooterWordmark";
import {
  BeautyWordmark,
  HeroBill,
  MirrorMark,
  SceneCheckIn,
  ScenePackage,
  SceneStock,
  SceneSummary,
  SceneVoice,
  UspClientRecord,
  UspInvoice,
  UspNoMaintenance,
  UspOneTime,
  UspWhatsApp,
} from "./art";

// Pre-selects "Beauty Manager" on the contact form (field name must match get-in-touch.jsx).
const DEMO_URL = "/get-in-touch?service=" + encodeURIComponent("Beauty Manager");

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Eyebrow({ children, dark = false }) {
  return <p className={`text-xs font-extrabold uppercase tracking-[0.2em] ${dark ? "text-bp-gold" : "text-bp-rose"}`}>{children}</p>;
}

/* ---------------------------------------------------------------- hero */

export function BeautyHero() {
  return (
    <section className="bp-speckle-bg relative overflow-hidden pb-16 pt-32 sm:pt-36 lg:pb-24">
      <div className="pointer-events-none absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full bg-bp-blush blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[#F4E7B8]/60 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-7"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-bp-line bg-white px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-bp-plum">
            <span className="h-2 w-2 animate-pulse rounded-full bg-bp-rose" />
            Salon & spa management
          </span>
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-bp-ink sm:text-5xl lg:text-[3.5rem]">
            Run your salon from the floor, <span className="bp-gradient-text">not the front desk.</span>
          </h1>
          <p className="max-w-lg text-lg leading-relaxed text-bp-slate">
            Beauty Manager keeps every client's record, generates the invoice and sends it on WhatsApp — and keeps your
            clients updated with automatic WhatsApp messages. Set it up once. No maintenance after that.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={DEMO_URL}
              className="inline-flex items-center gap-2 rounded-full bg-bp-gradient px-7 py-3.5 text-sm font-extrabold text-white shadow-[0_18px_36px_-16px_rgba(74,29,63,0.75)] transition-transform hover:-translate-y-0.5"
            >
              Book a Free Demo <Arrow />
            </a>
            <a
              href="#day"
              className="inline-flex items-center gap-2 rounded-full border-2 border-bp-plum bg-white px-7 py-3.5 text-sm font-extrabold text-bp-plum transition-colors hover:bg-bp-plum hover:text-white"
            >
              See a day at the salon
            </a>
          </div>
          <ul className="flex flex-wrap gap-2 pt-1">
            {["WhatsApp automation", "Client records", "Invoices on WhatsApp", "One-time setup", "No maintenance"].map((t) => (
              <li key={t} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-sm font-bold text-bp-plum ring-1 ring-bp-line">
                <span className="text-bp-gold">✦</span>
                {t}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-[600px]"
        >
          <HeroBill />
        </motion.div>
      </div>
    </section>
  );
}

export function BeautyTicker() {
  const items = ["WhatsApp automation", "Client records", "WhatsApp invoices", "One-time setup", "No maintenance", "Bridal packages", "Payment reminders", "Staff performance", "Retail stock", "Daily summary", "Hinglish voice"];
  const row = [...items, ...items];
  return (
    <div className="vt-marquee-wrap overflow-hidden border-y border-bp-line bg-white py-4" aria-label="What Beauty Manager handles">
      <div className="vt-marquee gap-3">
        {row.map((t, i) => (
          <span key={i} aria-hidden={i >= items.length} className="flex shrink-0 items-center gap-2 rounded-full bg-bp-nude px-4 py-2 text-sm font-extrabold text-bp-plum">
            <span className={`text-xs ${i % 2 ? "text-bp-rose" : "text-bp-gold"}`}>✦</span>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- the five USPs */

const USPS = [
  {
    Art: UspWhatsApp,
    tag: "WhatsApp automation",
    title: "Your clients hear from you — without you typing.",
    body: "Appointment reminders, payment reminders, invoices and package updates go out on WhatsApp automatically.",
  },
  {
    Art: UspClientRecord,
    tag: "Client records",
    title: "Every client, remembered.",
    body: "Contact details, visits, services, preferred stylist and spend are saved as you bill — no separate register.",
  },
  {
    Art: UspInvoice,
    tag: "WhatsApp invoices",
    title: "Invoice made. Invoice sent.",
    body: "A proper invoice is generated with every bill and shared straight to the client's WhatsApp. No printing.",
  },
  {
    Art: UspOneTime,
    tag: "One-time setup",
    title: "Set it up once. That's it.",
    body: "Your services, prices, staff and products go in once, at a one-time setup cost — and you're running.",
  },
  {
    Art: UspNoMaintenance,
    tag: "No maintenance",
    title: "Nothing to maintain.",
    body: "No maintenance to schedule and nothing to look after. Your team just opens it and works.",
  },
];

export function BeautyUSPs() {
  return (
    <section id="why" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Why salons choose Beauty Manager</Eyebrow>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-bp-ink sm:text-[2.6rem] sm:leading-tight">
            Less admin at the counter. <span className="bp-gradient-text">More time with clients.</span>
          </h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {USPS.map((u, i) => (
            <motion.article
              key={u.tag}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className={`group flex flex-col overflow-hidden rounded-[28px] border border-bp-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-bp-rose hover:shadow-[0_28px_56px_-28px_rgba(224,87,128,0.6)] ${
                i < 3 ? "lg:col-span-2" : "lg:col-span-3"
              } ${i === 4 ? "md:col-span-2 lg:col-span-3" : ""}`}
            >
              <div className="m-2 aspect-[16/10] overflow-hidden rounded-[22px] bg-gradient-to-br from-bp-blush via-white to-bp-nude p-3">
                <div className="h-full w-full transition-transform duration-500 group-hover:scale-[1.04]">
                  <u.Art />
                </div>
              </div>
              <div className="px-6 pb-6 pt-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-bp-blush px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.14em] text-bp-berry">
                  <span className="text-bp-gold">✦</span>
                  {u.tag}
                </span>
                <h3 className="mt-3 text-xl font-extrabold leading-snug tracking-tight text-bp-ink">{u.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-bp-slate">{u.body}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- a day at the salon */

const DAY = [
  { time: "10:00", title: "Check-in becomes the bill", body: "The appointment already knows the client, the services and the stylist. Billing is one tap — nothing typed twice.", Scene: SceneCheckIn },
  { time: "13:00", title: "Packages that count themselves", body: "Bridal packages and memberships track every session used, and the client gets a WhatsApp note with what's left.", Scene: ScenePackage },
  { time: "16:00", title: "The front desk just talks", body: "“Record ₹5,000 UPI for Neha's client.” Say it in English or Hinglish — it's done in seconds. No menus to learn.", Scene: SceneVoice },
  { time: "18:30", title: "Premium stock, under control", body: "Serums, masks and extensions are tracked as they sell. When something runs low, you hear about it before a client does.", Scene: SceneStock },
  { time: "21:00", title: "The day, summed up on WhatsApp", body: "Revenue, top service and every stylist's performance — on your phone at closing, without opening a report.", Scene: SceneSummary },
];
const DAY_MS = 6500;

export function BeautyDay() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    if (paused || pinned) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % DAY.length), DAY_MS);
    return () => clearTimeout(t);
  }, [active, paused, pinned]);

  const pick = (i) => {
    setActive(i);
    setPinned(true);
  };
  const step = DAY[active];
  const pct = (i) => 6 + (i * 88) / (DAY.length - 1);

  return (
    <section id="day" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>A day at the salon</Eyebrow>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-bp-ink sm:text-[2.6rem] sm:leading-tight">
            From the first client to closing time, <span className="bp-gradient-text">it runs itself.</span>
          </h2>
        </div>

        {/* time ribbon: morning → night */}
        <div className="relative mx-auto mt-12 max-w-4xl" role="tablist" aria-label="Times of day">
          <div className="h-3 rounded-full bg-[linear-gradient(90deg,#F4E7B8_0%,#FCE7EF_35%,#E05780_70%,#2A0F24_100%)]" />
          <span
            className="bp-thumb absolute top-1.5 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-bp-plum shadow-lg"
            style={{ left: `${pct(active)}%` }}
            aria-hidden="true"
          />
          <div className="relative mt-3 h-10">
            {DAY.map((s, i) => (
              <button
                key={s.time}
                role="tab"
                aria-selected={i === active}
                onClick={() => pick(i)}
                className={`absolute -translate-x-1/2 rounded-full px-3 py-1.5 text-sm font-extrabold transition-colors ${
                  i === active ? "bg-bp-plum text-white" : "text-bp-muted hover:text-bp-plum"
                }`}
                style={{ left: `${pct(i)}%` }}
              >
                {s.time}
              </button>
            ))}
          </div>
        </div>

        <div
          className="mt-8 grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={step.time}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.35 }}
              className="order-2 lg:order-1"
            >
              <p className="text-5xl font-extrabold tracking-tight text-bp-rose/40" aria-hidden="true">{step.time}</p>
              <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-bp-ink sm:text-3xl">{step.title}</h3>
              <p className="mt-3 text-lg leading-relaxed text-bp-slate">{step.body}</p>
              <button
                onClick={() => pick((active + 1) % DAY.length)}
                className="mt-6 rounded-full bg-bp-plum px-5 py-2.5 text-sm font-extrabold text-white transition hover:bg-bp-berry"
              >
                Next: {DAY[(active + 1) % DAY.length].time} →
              </button>
            </motion.div>
          </AnimatePresence>
          <div className="order-1 overflow-hidden rounded-[32px] border border-bp-line bg-gradient-to-br from-bp-blush via-white to-bp-nude p-3 sm:p-5 lg:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={step.time}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35 }}
                className="aspect-[4/3]"
              >
                <step.Scene />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- ask your numbers */

const CHAT = [
  { q: "Pichhle mahine ka revenue kya tha?", a: "₹11.8L last month — 9% more than the month before." },
  { q: "Which service brought in the most this month?", a: "Hair spa: ₹2.4L from 196 bookings." },
  { q: "Dikhao aaj kitne UPI payments aaye.", a: "31 UPI payments today, ₹38,450 in total." },
  { q: "What's our stock of Brand X shampoo?", a: "14 bottles left. At this week's pace, that's about 10 days." },
];

export function BeautyAsk() {
  return (
    <section className="relative overflow-hidden bg-bp-night py-20 text-white sm:py-28">
      <div className="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-bp-rose/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-bp-gold/15 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Eyebrow dark>Ask your numbers</Eyebrow>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-[2.5rem] sm:leading-tight">
            Walking the floor? Just ask how the salon is doing.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/65">
            Revenue, best-selling services, payments, stock — ask the way you'd ask your manager, in English or Hinglish,
            and get the answer in a line.
          </p>
        </div>
        <div className="space-y-3">
          {CHAT.map((c, i) => (
            <motion.div
              key={c.q}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.15 }}
              className="space-y-2"
            >
              <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-bp-rose px-4 py-2.5 text-[15px] font-bold">{c.q}</p>
              <p className="flex w-fit max-w-[90%] items-start gap-2 rounded-2xl rounded-bl-md bg-white/10 px-4 py-2.5 text-[15px] font-semibold text-white/90 ring-1 ring-white/10">
                <span className="text-bp-gold">✦</span>
                {c.a}
              </p>
            </motion.div>
          ))}
          <p className="pt-2 text-xs font-semibold text-white/40">Example answers for illustration.</p>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- features */

const ICON = {
  bill: <path d="M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6M9 16h3" />,
  package: <path d="M4 8l8-4 8 4v8l-8 4-8-4zM4 8l8 4 8-4M12 12v8" />,
  staff: <path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 21v-1a7 7 0 0 1 14 0v1M17 11a3 3 0 1 0 0-6M22 21v-1a5 5 0 0 0-4-4.9" />,
  whatsapp: <path d="M4 20l1.3-3.9A8 8 0 1 1 8.2 19zM9 9.5c.3 1.8 2.2 4 4.5 4.7l1.2-1.1 1.8.9" />,
  stock: <path d="M9 3h6v4H9zM7 7h10v14H7zM10 12h4" />,
  voice: <path d="M12 3a3 3 0 0 1 3 3v5a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3zM5 11a7 7 0 0 0 14 0M12 18v3" />,
};

const FEATURES = [
  ["bill", "Appointment-linked billing", "Bills start from the booking — services, stylist and client already filled in."],
  ["package", "Packages & memberships", "Sessions, validity and balances tracked automatically, visit by visit."],
  ["staff", "Staff performance", "Revenue, services and retail sales per stylist, live — commissions without the spreadsheet."],
  ["whatsapp", "UPI & cash, recorded", "Every payment is logged against the client and the bill — pending amounts get a WhatsApp reminder."],
  ["stock", "Premium retail stock", "Know exactly what's on the shelf, what's moving fastest and what to reorder."],
  ["voice", "Voice, in Hinglish", "Front-desk staff bill, record payments and look things up by just saying it."],
];

export function BeautyFeatures() {
  return (
    <section id="features" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Eyebrow>And everything else at the counter</Eyebrow>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-bp-ink sm:text-[2.6rem] sm:leading-tight">
              Built for salons, <span className="bp-gradient-text">not for shops.</span>
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-bp-slate">
            A generic billing app doesn't know about stylists, sessions or bridal packages. Beauty Manager does.
          </p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(([k, title, body], i) => (
            <motion.article
              key={k}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.07 }}
              className="vt-spec group rounded-[26px] border border-bp-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-bp-rose hover:shadow-[0_24px_48px_-28px_rgba(224,87,128,0.7)]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-bp-blush text-bp-plum transition-colors group-hover:bg-bp-rose group-hover:text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {ICON[k]}
                </svg>
              </span>
              <h3 className="mt-4 text-lg font-extrabold tracking-tight text-bp-ink">{title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-bp-slate">{body}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 grid gap-3 rounded-[26px] bg-bp-plum p-6 text-white sm:grid-cols-3 sm:p-8">
          {[
            ["Zero learning curve", "New reception staff are ready on day one — voice commands, not complex menus."],
            ["Your data, only yours", "Strict tenant isolation keeps each salon's clients and financials separate."],
            ["Encrypted", "Client data and financials are protected with enterprise-grade encryption."],
          ].map(([t, b]) => (
            <div key={t}>
              <p className="flex items-center gap-2 font-extrabold">
                <span className="text-bp-gold">✦</span>
                {t}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-white/70">{b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- CTA + footer */

export function BeautyCTA() {
  return (
    <section className="px-4 pb-20 sm:px-6 sm:pb-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[36px] bg-bp-gradient px-6 py-16 text-center text-white sm:px-12 sm:py-20">
        <svg viewBox="0 0 100 100" className="vt-anim pointer-events-none absolute -bottom-10 -right-6 h-60 w-60 -rotate-12 opacity-25 sm:h-72 sm:w-72" aria-hidden="true">
          <MirrorMark size={100} tone="light" animated />
        </svg>
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl">See your salon run itself.</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/80">
            Book an integration demo and watch Beauty Manager track retail stock, log payments and message clients on WhatsApp
            — live.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href={DEMO_URL} className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-extrabold text-bp-plum transition-transform hover:-translate-y-0.5">
              Book a Free Demo <Arrow />
            </a>
            <a href="#features" className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-8 py-4 text-sm font-extrabold text-white transition-colors hover:border-white hover:bg-white/10">
              See all features
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const PRODUCT = [
  { label: "A day at the salon", href: "#day" },
  { label: "Features", href: "#features" },
  { label: "Book a demo", href: DEMO_URL },
];
const COMPANY = [
  { label: "Screen Bazaar", href: "/" },
  { label: "Vital AI", href: "/products/vital" },
  { label: "Molaris AI", href: "/industry/dentalclinics" },
  { label: "Saarthi AI", href: "/products/saarthi" },
  { label: "Nexus CRM", href: "/products/nexus" },
];

export function BeautyFooter() {
  return (
    <footer className="bg-bp-night text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <BeautyWordmark tone="light" className="h-11" animated />
          <p className="max-w-xs text-sm leading-relaxed text-white/60">Billing, clients and WhatsApp for salons and spas. A Connect Gen AI product.</p>
        </div>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-bp-gold">Beauty Manager</p>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {PRODUCT.map((l) => (
              <li key={l.label}><a href={l.href} className="hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-bp-gold">Also from Connect</p>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {COMPANY.map((l) => (
              <li key={l.label}><a href={l.href} className="hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div className="space-y-2 text-sm text-white/75">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-bp-gold">Headquarters</p>
          <p className="pt-2">LBS Marg, C/26, Ishwar Nagar,<br />Mumbai, Maharashtra 400078, IN</p>
          <p><a href="tel:+919967392920" className="hover:text-white">+91 9967392920</a></p>
          <p><a href="mailto:connectgenai@gmail.com" className="hover:text-white">connectgenai@gmail.com</a></p>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Sreeji Growth Advisory. All rights reserved.
      </div>
      <FooterWordmark gradient="linear-gradient(328deg, #E05780 15%, #F4E7B8 85%)" />
    </footer>
  );
}
