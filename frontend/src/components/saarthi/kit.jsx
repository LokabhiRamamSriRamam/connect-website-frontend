import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useInView } from "framer-motion";
import { Plus } from "lucide-react";
import FooterWordmark from "../FooterWordmark";

export const DEMO_URL = "/get-in-touch";
export const REPORT_URL = "/saarthi";
export const SAARTHI_URL = "/products/saarthi";
export const CONTRACTORS_URL = "/products/saarthi/contractors";

// Pre-select the right service on the contact form (field names must match get-in-touch.jsx).
export const SAARTHI_DEMO_URL = "/get-in-touch?service=" + encodeURIComponent("Saarthi AI");
export const CONTRACTORS_DEMO_URL = "/get-in-touch?service=" + encodeURIComponent("Saarthi for Contractors");

export const EASE = [0.22, 1, 0.36, 1];

const inr = new Intl.NumberFormat("en-IN");
export const rupees = (n) => `₹${inr.format(Math.round(n))}`;

/* SVG ids must be unique per instance and free of the ":" React puts in useId */
export function useSvgId(prefix) {
  return `${prefix}${useId().replace(/:/g, "")}`;
}

export function Arrow({ className = "" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* The Saarthi mark: a chariot wheel (Saarthi = the charioteer) */
export function WheelMark({ size = 40, spin = false, tone = "color", className = "" }) {
  const g = useSvgId("sa-wheel");
  const stroke = tone === "light" ? "#FFF7E8" : `url(#${g})`;
  const spokes = Array.from({ length: 8 }, (_, i) => (i * 360) / 8);
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" className={`sa-anim ${className}`}>
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#8E1B12" />
          <stop offset="0.5" stopColor="#C0321F" />
          <stop offset="1" stopColor="#EE7B1E" />
        </linearGradient>
      </defs>
      <g className={spin ? "sa-spin" : ""}>
        <circle cx="24" cy="24" r="19.5" fill="none" stroke={stroke} strokeWidth="4" />
        {spokes.map((a) => (
          <line
            key={a}
            x1="24"
            y1="24"
            x2="24"
            y2="7"
            stroke={stroke}
            strokeWidth="2.6"
            strokeLinecap="round"
            transform={`rotate(${a} 24 24)`}
          />
        ))}
        {spokes.map((a) => (
          <circle key={`s${a}`} cx="24" cy="2.8" r="1.6" fill={tone === "light" ? "#FFB21E" : "#EE7B1E"} transform={`rotate(${a + 22.5} 24 24)`} />
        ))}
      </g>
      <circle cx="24" cy="24" r="5.5" fill={tone === "light" ? "#FFB21E" : "#8E1B12"} />
      <circle cx="24" cy="24" r="2" fill={tone === "light" ? "#1A0F0B" : "#FFF7E8"} />
    </svg>
  );
}

export function SaarthiWordmark({ tone = "dark", sub, size = 34, spin = true }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <WheelMark size={size} spin={spin} tone={tone === "light" ? "light" : "color"} />
      <span className="leading-none">
        <span className={`sa-serif block text-[1.55em] font-bold tracking-tight ${tone === "light" ? "text-sa-paper" : "text-sa-ink"}`}>
          Saarthi
        </span>
        {sub && (
          <span className={`mt-1 block text-[0.62em] font-extrabold uppercase tracking-[0.2em] ${tone === "light" ? "text-sa-marigold" : "text-sa-red"}`}>
            {sub}
          </span>
        )}
      </span>
    </span>
  );
}

export function Reveal({ children, delay = 0, y = 28, className = "", as = "div" }) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </M>
  );
}

export function Eyebrow({ children, tone = "light", className = "" }) {
  const cls =
    tone === "dark"
      ? "border-white/15 bg-white/5 text-sa-marigold"
      : tone === "site"
        ? "border-sa-ink bg-sa-marigold text-sa-ink"
        : "border-sa-line bg-white text-sa-red";
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.18em] ${cls} ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}

export function SectionHead({ eyebrow, title, sub, tone = "light", center = false, eyebrowTone }) {
  return (
    <Reveal className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <Eyebrow tone={eyebrowTone || tone}>{eyebrow}</Eyebrow>}
      <h2
        className={`sa-serif mt-5 text-[2.1rem] font-bold leading-[1.08] tracking-tight sm:text-5xl ${tone === "dark" ? "text-sa-paper" : "text-sa-ink"}`}
      >
        {title}
      </h2>
      {sub && <p className={`mt-5 text-lg leading-relaxed ${tone === "dark" ? "text-white/70" : "text-sa-brown"}`}>{sub}</p>}
    </Reveal>
  );
}

/* Animated number that counts up the first time it scrolls into view */
export function CountUp({ to, format = (n) => inr.format(Math.round(n)), duration = 1.6 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration, ease: EASE, onUpdate: setVal });
    return () => c.stop();
  }, [inView, to, duration]);
  return <span ref={ref}>{format(val)}</span>;
}

/* Scrolling band of example commands */
export function Ticker({ items, tone = "maroon" }) {
  const band = tone === "site" ? "sa-hazard" : "bg-sa-maroon";
  const chip = tone === "site" ? "bg-sa-ink text-sa-marigold" : "bg-white/10 text-sa-marigold";
  const row = [...items, ...items];
  return (
    <div className={`sa-marquee-wrap relative overflow-hidden border-y-2 border-sa-ink py-3.5 ${band}`}>
      <div className="sa-marquee gap-3 pr-3">
        {row.map((t, i) => (
          <span key={i} className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold ${chip}`} aria-hidden={i >= items.length}>
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <rect x="4.5" y="1" width="5" height="8" rx="2.5" fill="currentColor" />
              <path d="M2.5 6.5a4.5 4.5 0 009 0M7 11v2" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" />
            </svg>
            “{t}”
          </span>
        ))}
      </div>
    </div>
  );
}

/* A list of pains that get struck through in ink, with the fix written beside them */
export function StrikeList({ rows, tone = "light" }) {
  return (
    <ol className="space-y-4">
      {rows.map(([pain, fix], i) => (
        <motion.li
          key={pain}
          className={`relative grid gap-2 rounded-2xl border-2 border-sa-ink p-5 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-5 ${tone === "site" ? "bg-white" : "bg-sa-paper"}`}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
        >
          <span className="text-[15px] font-semibold text-sa-muted">
            {/* background sweep, so the strike follows the text across wrapped lines */}
            <motion.span
              style={{
                backgroundImage: "linear-gradient(#C0321F, #C0321F)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "0 58%",
              }}
              initial={{ backgroundSize: "0% 3px" }}
              whileInView={{ backgroundSize: "100% 3px" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.45 + i * 0.12, ease: EASE }}
            >
              {pain}
            </motion.span>
          </span>
          <Arrow className="hidden text-sa-saffron sm:block" />
          <motion.span
            className="text-[15px] font-extrabold text-sa-ink"
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.85 + i * 0.12, ease: EASE }}
          >
            {fix}
          </motion.span>
        </motion.li>
      ))}
    </ol>
  );
}

export function FAQList({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y-2 divide-sa-ink/10 overflow-hidden rounded-3xl border-2 border-sa-ink bg-white">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.question}>
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left text-base font-extrabold text-sa-ink hover:bg-sa-paper sm:text-lg"
              aria-expanded={isOpen}
            >
              {f.question}
              <span
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-sa-ink transition-all duration-300 ${isOpen ? "rotate-45 bg-sa-red text-white" : "bg-sa-paper"}`}
              >
                <Plus size={16} strokeWidth={3} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-[15px] leading-relaxed text-sa-brown">{f.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export function SaarthiCTA({ title, sub, primary = "Book a demo", secondary, demoHref = DEMO_URL }) {
  return (
    <section className="px-4 py-20 sm:px-6">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border-2 border-sa-ink bg-sa-gradient px-6 py-16 text-center text-white shadow-[8px_8px_0_#1C1410] sm:px-12">
        <div className="pointer-events-none absolute -left-24 -top-24 opacity-20">
          <WheelMark size={320} spin tone="light" />
        </div>
        <div className="pointer-events-none absolute -bottom-28 -right-20 opacity-20">
          <WheelMark size={280} spin tone="light" />
        </div>
        <div className="relative">
          <h2 className="sa-serif mx-auto max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">{title}</h2>
          {sub && <p className="mx-auto mt-5 max-w-xl text-lg text-white/85">{sub}</p>}
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href={demoHref}
              className="inline-flex items-center gap-2 rounded-full border-2 border-sa-ink bg-sa-marigold px-7 py-3.5 text-sm font-extrabold text-sa-ink shadow-[4px_4px_0_#1C1410] transition-transform hover:-translate-y-0.5"
            >
              {primary} <Arrow />
            </a>
            {secondary && (
              <a
                href={secondary.href}
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/70 px-7 py-3.5 text-sm font-extrabold text-white transition-colors hover:bg-white hover:text-sa-maroon"
              >
                {secondary.label}
              </a>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

const FOOT_SAARTHI = [
  { label: "Saarthi", href: SAARTHI_URL },
  { label: "Saarthi for Contractors", href: CONTRACTORS_URL },
  { label: "Free smart report", href: REPORT_URL },
  { label: "Book a demo", href: SAARTHI_DEMO_URL },
];

const FOOT_CONNECT = [
  { label: "Screen Bazaar", href: "/" },
  { label: "Vital AI", href: "/products/vital" },
  { label: "Molaris AI", href: "/industry/dentalclinics" },
  { label: "Nexus CRM", href: "/products/nexus" },
  { label: "Beauty Manager", href: "/industry/salon" },
  { label: "Contact us", href: "/get-in-touch" },
];

export function SaarthiFooter() {
  return (
    <footer className="sa-dots bg-sa-night text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <SaarthiWordmark tone="light" sub="Business, in plain words" size={38} />
          <p className="max-w-xs text-sm leading-relaxed text-white/60">A Connect Gen AI product.</p>
        </div>
        {[
          ["Saarthi", FOOT_SAARTHI],
          ["Also from Connect", FOOT_CONNECT],
        ].map(([head, links]) => (
          <div key={head}>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-sa-marigold">{head}</p>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              {links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="hover:text-white">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="space-y-2 text-sm text-white/75">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-sa-marigold">Headquarters</p>
          <p className="pt-2">
            LBS Marg, C/26, Ishwar Nagar,
            <br />
            Mumbai, Maharashtra 400078, IN
          </p>
          <p><a href="tel:+919967392920" className="hover:text-white">+91 9967392920</a></p>
          <p><a href="mailto:connectgenai@gmail.com" className="hover:text-white">connectgenai@gmail.com</a></p>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Sreeji Growth Advisory. All rights reserved.
      </div>
      <FooterWordmark />
    </footer>
  );
}
