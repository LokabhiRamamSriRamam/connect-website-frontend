import { useEffect, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import FooterWordmark from "../FooterWordmark";
import {
  ArtAutoStage,
  ArtChannels,
  ArtFollowUp,
  ArtSummary,
  ArtTimeline,
  ArtTrust,
  ChannelIcon,
  HeroFlow,
  InteractionAnatomy,
  LoggingArt,
  NexusMark,
  NexusWordmark,
} from "./art";

// Pre-selects "Nexus CRM" on the contact form (field name must match get-in-touch.jsx).
const DEMO_URL = "/get-in-touch?service=" + encodeURIComponent("Nexus CRM");

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Eyebrow({ children, dark = false }) {
  return <p className={`text-xs font-extrabold uppercase tracking-[0.2em] ${dark ? "text-nx-lime" : "text-nx-indigo"}`}>{children}</p>;
}

/* ---------------------------------------------------------------- hero */

export function NexusHero() {
  return (
    <section className="nx-dots-bg relative overflow-hidden pb-16 pt-32 sm:pt-36 lg:pb-24">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-nx-haze blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-nx-lime/20 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-7"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-nx-line bg-white px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-nx-ink">
            <span className="h-2 w-2 animate-pulse rounded-full bg-nx-lime ring-2 ring-nx-limeDark/30" />
            The CRM built on conversations
          </span>
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-nx-ink sm:text-5xl lg:text-[3.5rem]">
            The CRM you <span className="nx-gradient-text">never have to update.</span>
          </h1>
          <p className="max-w-lg text-lg leading-relaxed text-nx-slate">
            In Nexus, every call, chat, email and meeting is an interaction — saved for you by AI, in plain language.
            Your leads move through the pipeline on their own, based on what was actually said. No logging. Ever.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={DEMO_URL}
              className="inline-flex items-center gap-2 rounded-full bg-nx-gradient px-7 py-3.5 text-sm font-extrabold text-white shadow-[0_18px_36px_-16px_rgba(67,56,202,0.8)] transition-transform hover:-translate-y-0.5"
            >
              Book a Free Demo <Arrow />
            </a>
            <a
              href="#flow"
              className="inline-flex items-center gap-2 rounded-full border-2 border-nx-ink bg-white px-7 py-3.5 text-sm font-extrabold text-nx-ink transition-colors hover:bg-nx-ink hover:text-white"
            >
              See a deal move itself
            </a>
          </div>
          <ul className="flex flex-wrap gap-2 pt-1">
            {["No activity forms", "No stage dragging", "No end-of-day updates"].map((t) => (
              <li key={t} className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-bold text-nx-ink ring-1 ring-nx-line">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M3 3l8 8M11 3l-8 8" stroke="#F0567A" strokeWidth="2" strokeLinecap="round" />
                </svg>
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
          <HeroFlow />
        </motion.div>
      </div>
    </section>
  );
}

export function NexusTicker() {
  const items = ["Calls", "WhatsApp", "Email", "Meetings", "AI summaries", "Auto stage movement", "Follow-up reminders", "Customer timelines", "Live pipeline", "Team view"];
  const row = [...items, ...items];
  return (
    <div className="vt-marquee-wrap overflow-hidden border-y border-nx-line bg-white py-4" aria-label="What Nexus captures">
      <div className="vt-marquee gap-3">
        {row.map((t, i) => (
          <span key={i} aria-hidden={i >= items.length} className="flex shrink-0 items-center gap-2 rounded-full bg-nx-paper px-4 py-2 text-sm font-extrabold text-nx-ink">
            <span className={`h-2 w-2 rounded-full ${i % 2 ? "bg-nx-electric" : "bg-nx-lime"}`} />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- the problem */

export function NexusProblem() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Eyebrow>The problem with every CRM</Eyebrow>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-nx-ink sm:text-[2.5rem] sm:leading-tight">
            A CRM is only as good as what someone remembers to type into it.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-nx-slate">
            Sales people sell. They don't fill in forms after every call — so the CRM falls behind, the pipeline stops
            being true, and managers chase updates instead of deals.
          </p>
          <p className="mt-4 text-lg font-bold leading-relaxed text-nx-ink">
            Nexus removes the logging. Have the conversation — Nexus writes it down.
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="rounded-[32px] border border-nx-line bg-nx-paper p-3 sm:p-5"
        >
          <div className="aspect-[14/9]">
            <LoggingArt />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- anatomy */

export function NexusAnatomy() {
  const parts = [
    ["Who", "the people on the call, matched to the right lead or customer"],
    ["What", "a short summary in plain language"],
    ["Commitments", "budget, quantities, dates — whatever was agreed"],
    ["Next step", "turned into a reminder, with a date"],
    ["Stage", "where the deal stands now, based on what was said"],
  ];
  return (
    <section id="interactions" className="scroll-mt-24 bg-nx-night py-20 text-white sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <Eyebrow dark>The building block</Eyebrow>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-[2.6rem] sm:leading-tight">
            Everything starts with an interaction.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/65">
            Other CRMs are built around records you have to keep up to date. Nexus is built around the conversations you
            already have. Each one is saved as an interaction, and the record updates itself from it.
          </p>
        </div>
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.25fr_0.75fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="aspect-[56/38]"
          >
            <InteractionAnatomy />
          </motion.div>
          <ul className="space-y-3">
            {parts.map(([k, v], i) => (
              <motion.li
                key={k}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
              >
                <span className="font-extrabold text-nx-lime">{k}</span>
                <span className="text-white/70"> — {v}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- stages move themselves */

const FLOW = [
  { ch: "whatsapp", when: "Mon · 10:12", title: "WhatsApp enquiry", quote: "Hi! Do you take bulk orders?", logged: ["New lead: Rhea Kapoor, Kapoor Textiles", "Source: WhatsApp"] },
  { ch: "call", when: "Mon · 16:30", title: "Discovery call · 6 min", quote: "200 units by March, about ₹4L.", logged: ["Need, timeline and budget captured", "Deal value set to ₹4.0L"] },
  { ch: "meeting", when: "Wed · 11:00", title: "Demo · 30 min", quote: "Looks good — send a quote by Friday.", logged: ["Demo done with three stakeholders", "Reminder: quote due Friday"] },
  { ch: "email", when: "Fri · 10:05", title: "Quote sent", quote: "Attached: quote for 200 units.", logged: ["Proposal attached to the deal", "Follow-up set for Tuesday"] },
  { ch: "call", when: "Tue · 15:40", title: "Call · 3 min", quote: "Approved. Please send the invoice.", logged: ["Approval recorded", "Deal marked Won"] },
];
const STAGES = ["New", "Qualified", "Demo", "Proposal", "Won"];
const CH_BG = { whatsapp: "bg-[#25D366]", call: "bg-nx-indigo", meeting: "bg-nx-violet", email: "bg-nx-amber" };
const FLOW_MS = 5500;

function DealCard() {
  return (
    <motion.div
      layoutId="nx-deal"
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      className="relative rounded-xl border-2 border-nx-indigo bg-white p-2.5 shadow-[0_14px_28px_-14px_rgba(67,56,202,0.7)]"
    >
      <div className="flex items-center justify-between gap-1">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-nx-rose text-[10px] font-extrabold text-white">R</span>
        <span className="text-[11px] font-extrabold text-nx-indigo">₹4.0L</span>
      </div>
      <span className="mt-1.5 block text-xs font-extrabold leading-tight text-nx-ink">Rhea Kapoor</span>
      <span className="block text-[10px] font-bold leading-tight text-nx-muted">Kapoor Textiles</span>
      <span className="absolute -right-1.5 -top-1.5 h-3 w-3 animate-pulse rounded-full bg-nx-lime ring-2 ring-white" />
    </motion.div>
  );
}

export function NexusFlow() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    if (paused || pinned) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % FLOW.length), FLOW_MS);
    return () => clearTimeout(t);
  }, [active, paused, pinned]);

  const pick = (i) => {
    setActive(i);
    setPinned(true);
  };

  return (
    <section id="flow" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Stages that move themselves</Eyebrow>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-nx-ink sm:text-[2.6rem] sm:leading-tight">
            Five conversations. <span className="nx-gradient-text">Zero updates.</span> One won deal.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-nx-slate">
            Follow one lead from first message to signed deal. Nobody drags the card — each conversation moves it.
          </p>
        </div>

        <LayoutGroup>
          <div
            className="mt-12 grid items-start gap-6 lg:grid-cols-[0.8fr_1.2fr]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* interactions */}
            <ol className="space-y-2" role="tablist" aria-label="Interactions">
              {FLOW.map((f, i) => {
                const on = i === active;
                const past = i < active;
                return (
                  <li key={i}>
                    <button
                      role="tab"
                      aria-selected={on}
                      onClick={() => pick(i)}
                      className={`w-full rounded-2xl border p-4 text-left transition-all ${
                        on ? "border-nx-indigo bg-white shadow-[0_18px_40px_-24px_rgba(67,56,202,0.6)]" : "border-nx-line bg-white/60 hover:bg-white"
                      } ${!on && !past ? "opacity-55" : ""}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white ${CH_BG[f.ch]}`}>
                          <ChannelIcon name={f.ch} size={18} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-extrabold text-nx-ink">{f.title}</span>
                          <span className="block text-xs font-bold text-nx-muted">{f.when}</span>
                        </span>
                        {(past || on) && (
                          <span className="rounded-full bg-nx-lime/40 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-nx-limeDark">
                            Auto-logged
                          </span>
                        )}
                      </div>
                      <AnimatePresence initial={false}>
                        {on && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="mt-3 rounded-xl bg-nx-haze px-3 py-2 text-sm font-bold text-nx-ink">“{f.quote}”</p>
                            <ul className="mt-3 space-y-1.5">
                              {f.logged.map((l) => (
                                <li key={l} className="flex items-start gap-2 text-sm font-semibold text-nx-slate">
                                  <span className="mt-1 text-nx-indigo">✦</span>
                                  {l}
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </li>
                );
              })}
            </ol>

            {/* the pipeline nobody touched */}
            <div className="rounded-[28px] bg-nx-night p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-extrabold text-white">Pipeline</p>
                <p className="flex items-center gap-2 text-xs font-bold text-white/60">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-nx-lime" />
                  Moved by conversations, not people
                </p>
              </div>
              <div className="mt-5 grid gap-2 sm:grid-cols-5">
                {STAGES.map((s, i) => (
                  <div
                    key={s}
                    className={`flex min-h-[64px] flex-col gap-2 rounded-2xl p-2.5 transition-colors sm:min-h-[300px] ${
                      i === active ? (i === 4 ? "bg-nx-lime/25" : "bg-white/15") : "bg-white/5"
                    }`}
                  >
                    <p className={`text-[11px] font-extrabold uppercase tracking-wider ${i === 4 ? "text-nx-lime" : "text-white/70"}`}>{s}</p>
                    {i === active && <DealCard />}
                    {i !== active && i < 4 && <div className="hidden h-12 rounded-xl border border-dashed border-white/10 sm:block" />}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-center text-xs font-bold text-white/50">Mock-up · names and amounts are examples</p>
            </div>
          </div>
        </LayoutGroup>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- features */

const FEATURES = [
  { Art: ArtChannels, title: "Every channel, captured", body: "Calls, WhatsApp, email and meetings all land in Nexus as interactions — no copy-paste, no CC-ing the CRM." },
  { Art: ArtSummary, title: "Saved conversationally", body: "AI writes each interaction down in plain language: what was discussed, what was promised, what happens next." },
  { Art: ArtAutoStage, title: "Stages that move themselves", body: "Leads and customers flow through your pipeline based on what actually happened in their conversations." },
  { Art: ArtFollowUp, title: "Follow-ups that don't slip", body: "“I'll send it Friday” becomes a reminder on Friday. Commitments made on a call never get lost." },
  { Art: ArtTimeline, title: "One timeline per customer", body: "Every conversation with a lead or customer, in order, so anyone can pick up where the last person left off." },
  { Art: ArtTrust, title: "A pipeline you can trust", body: "Because nobody has to update it, it's never out of date. Managers see the real picture, right now." },
];

export function NexusFeatures() {
  return (
    <section id="features" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Eyebrow>What you get</Eyebrow>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-nx-ink sm:text-[2.6rem] sm:leading-tight">
              All of the CRM. <span className="nx-gradient-text">None of the data entry.</span>
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-nx-slate">
            Your team talks to customers. Nexus turns those conversations into a CRM that keeps itself current.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.article
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group flex flex-col overflow-hidden rounded-[28px] border border-nx-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-nx-electric hover:shadow-[0_28px_56px_-28px_rgba(67,56,202,0.5)]"
            >
              <div className="m-2 aspect-[16/9] overflow-hidden rounded-[22px] bg-gradient-to-br from-nx-haze via-white to-[#F3FBE4] p-3">
                <div className="h-full w-full transition-transform duration-500 group-hover:scale-[1.04]">
                  <f.Art />
                </div>
              </div>
              <div className="px-6 pb-6 pt-3">
                <h3 className="text-xl font-extrabold tracking-tight text-nx-ink">{f.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-nx-slate">{f.body}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- CTA + footer */

export function NexusCTA() {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[36px] bg-nx-gradient px-6 py-16 text-center text-white sm:px-12 sm:py-20">
        <svg viewBox="0 0 100 100" className="pointer-events-none absolute -right-8 -top-8 h-56 w-56 rotate-12 opacity-20 sm:h-72 sm:w-72" aria-hidden="true">
          <NexusMark size={100} tone="light" />
        </svg>
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl">Stop logging. Start selling.</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/75">
            See Nexus turn a real sales conversation into an up-to-date pipeline — live, in a short demo.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href={DEMO_URL} className="inline-flex items-center gap-2 rounded-full bg-nx-lime px-8 py-4 text-sm font-extrabold text-nx-ink transition-transform hover:-translate-y-0.5">
              Book a Free Demo <Arrow />
            </a>
            <a href="#interactions" className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-8 py-4 text-sm font-extrabold text-white transition-colors hover:border-white hover:bg-white/10">
              How interactions work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const PRODUCT = [
  { label: "How it works", href: "#interactions" },
  { label: "See a deal move", href: "#flow" },
  { label: "Features", href: "#features" },
  { label: "Book a demo", href: DEMO_URL },
];
const COMPANY = [
  { label: "Screen Bazaar", href: "/" },
  { label: "Vital AI", href: "/products/vital" },
  { label: "Molaris AI", href: "/industry/dentalclinics" },
  { label: "Saarthi AI", href: "/products/saarthi" },
  { label: "Beauty Manager", href: "/industry/salon" },
];

export function NexusFooter() {
  return (
    <footer className="bg-nx-night text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <NexusWordmark tone="light" className="h-11" />
          <p className="max-w-xs text-sm leading-relaxed text-white/60">The CRM you never have to update. A Connect Gen AI product.</p>
        </div>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-nx-lime">Nexus</p>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {PRODUCT.map((l) => (
              <li key={l.label}><a href={l.href} className="hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-nx-lime">Also from Connect</p>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {COMPANY.map((l) => (
              <li key={l.label}><a href={l.href} className="hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div className="space-y-2 text-sm text-white/75">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-nx-lime">Headquarters</p>
          <p className="pt-2">LBS Marg, C/26, Ishwar Nagar,<br />Mumbai, Maharashtra 400078, IN</p>
          <p><a href="tel:+919967392920" className="hover:text-white">+91 9967392920</a></p>
          <p><a href="mailto:connectgenai@gmail.com" className="hover:text-white">connectgenai@gmail.com</a></p>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Sreeji Growth Advisory. All rights reserved.
      </div>
      <FooterWordmark gradient="linear-gradient(328deg, #6366F1 15%, #B5F23D 85%)" />
    </footer>
  );
}
