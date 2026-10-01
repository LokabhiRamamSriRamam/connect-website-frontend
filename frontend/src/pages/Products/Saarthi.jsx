import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import TopNav from "../../components/TopNav";
import {
  Arrow,
  CONTRACTORS_URL,
  EASE,
  Eyebrow,
  FAQList,
  REPORT_URL,
  Reveal,
  SAARTHI_DEMO_URL,
  SaarthiCTA,
  SaarthiFooter,
  SectionHead,
  StrikeList,
  Ticker,
} from "../../components/saarthi/kit";
import {
  HeroChat,
  IconAnswer,
  IconQuery,
  IconQuestion,
  IconUnderstand,
  ModuleIcons,
  PaperChaos,
  Vault,
  VoiceOrb,
} from "../../components/saarthi/art";
import { SiteMini } from "../../components/saarthi/contractorArt";
import "../../components/saarthi/saarthi.css";

/* ------------------------------------------------------------------ */

const ASKS = [
  "Aaj ka galla kitna hua?",
  "Which items are running low?",
  "Kisse kitna paisa lena hai?",
  "Record ₹5,000 payment from Mehta & Sons",
  "Last month's GST liability?",
  "Top 10 customers this quarter",
  "Godown se Andheri 10 peti bhejo",
  "Kaunsa item sabse zyada margin deta hai?",
];

const PAINS = [
  ["The month-end report takes a week to put together", "Ask for it. It's ready."],
  ["Numbers live in registers, Excel and WhatsApp", "One book for billing, stock and accounts"],
  ["New staff take weeks to learn the software", "If they can send a voice note, they can use it"],
  ["Profit per item is a guess", "Margin per item, traced to what you paid for it"],
  ["Floor staff can't use an English-only system", "Ask in Hindi, English or both"],
];

const QUESTIONS = [
  {
    q: "Aaj ka galla kitna hua?",
    big: "₹64,380",
    sub: "Today · 212 bills",
    rows: [
      ["Cash", "₹21,900"],
      ["UPI", "₹38,280"],
      ["Card", "₹4,200"],
    ],
    from: "Sales entries, today",
  },
  {
    q: "Which items are running low?",
    rows: [
      ["Basmati Rice 25 kg", "6 left"],
      ["Sunflower Oil 15 L", "11 left"],
      ["Toor Dal 1 kg", "9 left"],
      ["Sugar 50 kg", "4 left"],
    ],
    from: "Stock across all godowns",
  },
  {
    q: "Kisse kitna paisa lena hai?",
    big: "₹2,51,700",
    sub: "Receivable from 3 parties",
    rows: [
      ["Mehta & Sons", "₹1,24,000"],
      ["Sharma Traders", "₹86,500"],
      ["Gupta Kirana", "₹41,200"],
    ],
    from: "Party ledgers, closing balance",
  },
  {
    q: "Best margin item this month?",
    big: "31.4%",
    sub: "Cashew 500 g",
    rows: [
      ["Selling price", "₹600"],
      ["Cost (PO-1187)", "₹412"],
      ["Units sold", "146"],
    ],
    from: "Sales matched to purchase orders",
  },
];

const COMMANDS = [
  {
    c: "Mehta & Sons ko 20 bag Basmati udhaar pe bech do",
    steps: [
      "Invoice INV-2042 created · ₹38,400 incl. GST",
      "Stock reduced · Basmati Rice 25 kg × 20",
      "Journal posted · Sales, GST, cost of goods",
      "Mehta & Sons ledger · now ₹1,62,400 due",
      "Invoice PDF sent on WhatsApp",
    ],
  },
  {
    c: "Record ₹25,000 UPI payment from Gupta Kirana",
    steps: [
      "Payment received · ₹25,000 by UPI",
      "Settled against INV-2031 and INV-2036",
      "Journal posted · Bank, Gupta Kirana",
      "Gupta Kirana ledger · now ₹16,200 due",
      "Receipt sent on WhatsApp",
    ],
  },
  {
    c: "Godown se Andheri branch 10 peti oil bhejo",
    steps: [
      "Transfer note TRN-118 created",
      "Godown · Sunflower Oil 15 L −10",
      "Andheri · Sunflower Oil 15 L +10",
      "Visible in both branches' stock reports",
    ],
  },
];

const ENGINE = [
  { Icon: IconQuestion, title: "You ask", body: "In English, Hindi or a mix of both. Typed or spoken.", tag: null },
  { Icon: IconUnderstand, title: "AI reads the question", body: "Only to work out what you mean: which report, which party, which dates.", tag: "AI · language only" },
  { Icon: IconQuery, title: "Your books do the maths", body: "An exact query runs on your own entries. Totals are calculated, never generated.", tag: "Database · all the maths" },
  { Icon: IconAnswer, title: "You get the real number", body: "The same figure your accountant would reach, and where it came from.", tag: null },
];

const MODULES = [
  { key: "billing", title: "Billing & POS", body: "Fast counter billing, GST invoices, and cash, UPI or credit on the same bill." },
  { key: "stock", title: "Inventory", body: "Live stock across godowns and branches, low-stock alerts and transfers." },
  { key: "journal", title: "Double-entry accounts", body: "Every sale posts its own journal: sales, GST, cost of goods and payment." },
  { key: "party", title: "Party ledgers", body: "Who owes you, who you owe, with a running balance for every party." },
  { key: "margin", title: "True margins", body: "Profit per item, traced back to the purchase order it came from." },
  { key: "returns", title: "Returns", body: "Sale returns with or without the original bill. Stock and accounts adjust themselves." },
  { key: "reports", title: "Reports on demand", body: "P&L, GST, day book, stock value. Ask for them instead of hunting for them." },
  { key: "controls", title: "Controls", body: "Locked periods, reverse-don't-delete entries and a trail of who changed what." },
];

const VOICE = [
  { said: "Ramesh ko 20 kilo chawal udhaar pe diya", got: ["Credit sale", "Ramesh", "Rice · 20 kg"] },
  { said: "Kal ka cash kitna jama hua?", got: ["Cash deposited", "30 Sep", "₹48,200"] },
  { said: "Godown se Andheri 10 peti bhejo", got: ["Stock transfer", "10 cases", "Godown → Andheri"] },
  { said: "What did we spend on transport in August?", got: ["Expense report", "Transport", "₹36,750"] },
];

const TRUST = [
  ["Separate books for every business", "Your data sits in its own database, never mixed with another company's."],
  ["Logins with roles", "Owners, accountants and counter staff each see only what they should."],
  ["Encrypted and signed-in", "Passwords are hashed and every request is authenticated."],
  ["Never used to train public AI", "Your ledgers stay your ledgers."],
];

const BUILT_FOR = ["Kirana & retail", "Wholesale & distribution", "Pharmacy", "Hardware & building material", "Apparel & footwear", "FMCG distributors"];

const FAQS = [
  {
    question: "Does Saarthi replace my existing accounting software?",
    answer:
      "It doesn't have to. Saarthi can run your billing, stock and accounts on its own, or sit on top of your existing systems and make them answerable in plain language. We'll recommend the right route after a look at how you work today.",
  },
  {
    question: "Will it understand my team's Hinglish?",
    answer:
      "Yes. 'Pichhle mahine ka revenue kya tha?' is understood just like 'What was last month's revenue?'. Your team can type or speak in the language they think in.",
  },
  {
    question: "How accurate are the numbers?",
    answer:
      "AI is used only to understand what you asked. Every total is calculated by a database query on your actual entries, so the AI never guesses a financial figure.",
  },
  {
    question: "Is my business data secure?",
    answer:
      "Each business has its own isolated database. Logins are authenticated, passwords are hashed, inputs are sanitised, and your data is never used to train public AI models.",
  },
  {
    question: "How quickly can my team start?",
    answer:
      "If your team can send a voice note, they can use Saarthi. Most teams are working within a day of set-up; there are no menus to learn.",
  },
  {
    question: "Can it handle high volumes?",
    answer:
      "Yes. Whether you have a hundred bills a day or a hundred thousand, answers come from exact data, not samples or estimates.",
  },
];

/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-32 sm:pt-36 lg:pb-24">
      <div className="sa-ruled pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(180deg,black,transparent_85%)]" />
      <div className="pointer-events-none absolute -right-32 -top-40 h-[520px] w-[520px] rounded-full bg-sa-marigold/25 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-sa-red/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="space-y-7"
        >
          <Eyebrow>Saarthi · Conversational ERP</Eyebrow>

          <h1 className="sa-serif text-5xl font-bold leading-[1.02] tracking-tight text-sa-ink sm:text-6xl lg:text-[4.4rem]">
            Talk to your{" "}
            <span className="relative inline-block">
              <span className="sa-gradient-text">business.</span>
              <svg className="absolute -bottom-3 left-0 h-4 w-full" viewBox="0 0 300 16" preserveAspectRatio="none" aria-hidden="true">
                <path d="M4 11C60 3 130 3 180 8s90 4 116-3" stroke="#EE7B1E" strokeWidth="5" fill="none" strokeLinecap="round" className="sa-draw" />
              </svg>
            </span>
          </h1>

          <p className="max-w-lg text-lg leading-relaxed text-sa-brown">
            Saarthi is the business software you run by asking. Billing, stock, ledgers and reports — ask in English or
            Hinglish and get the exact number, or the finished entry.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={SAARTHI_DEMO_URL}
              className="inline-flex items-center gap-2 rounded-full border-2 border-sa-ink bg-sa-gradient px-7 py-3.5 text-sm font-extrabold text-white shadow-[4px_4px_0_#1C1410] transition-transform hover:-translate-y-0.5"
            >
              Book a demo <Arrow />
            </a>
            <a
              href={REPORT_URL}
              className="inline-flex items-center gap-2 rounded-full border-2 border-sa-ink bg-white px-7 py-3.5 text-sm font-extrabold text-sa-ink transition-colors hover:bg-sa-ink hover:text-white"
            >
              Get a free smart report
            </a>
          </div>

          <ul className="flex flex-wrap gap-2 pt-1 text-xs font-extrabold text-sa-brown">
            {["English · हिन्दी · Hinglish", "Exact numbers, no guessed maths", "Phone or laptop"].map((t) => (
              <li key={t} className="rounded-full border border-sa-line bg-white/80 px-3.5 py-2 backdrop-blur">
                {t}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
          className="mx-auto w-full max-w-[520px]"
        >
          <HeroChat />
        </motion.div>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHead
            eyebrow="Why Saarthi"
            title="Your numbers exist. Getting to them is the problem."
            sub="They're in the bahi-khata, three spreadsheets and somebody's WhatsApp. Saarthi puts them in one book you can talk to."
          />
          <Reveal delay={0.15} className="mx-auto mt-10 max-w-md">
            <PaperChaos />
          </Reveal>
        </div>
        <StrikeList rows={PAINS} />
      </div>
    </section>
  );
}

function StepTick({ i }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
      <circle cx="12" cy="12" r="11" fill="#0E7C66" />
      <path d="M7 12.5l3.2 3.2L17 9" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" className="sa-tick" style={{ animationDelay: `${0.25 + i * 0.35}s` }} />
    </svg>
  );
}

function AskDo() {
  const [mode, setMode] = useState("ask");
  const [qi, setQi] = useState(0);
  const [ci, setCi] = useState(0);
  const q = QUESTIONS[qi];
  const c = COMMANDS[ci];

  return (
    <section id="how" className="relative border-y-2 border-sa-ink bg-sa-parchment px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          eyebrow="Two ways to use it"
          title={
            <>
              <span className="sa-gradient-text">Ask</span> it anything. Tell it to <span className="sa-gradient-text">do</span> anything.
            </>
          }
          sub="Questions come back as exact answers. Instructions come back as finished work: the bill, the stock, the journal and the ledger, all at once."
        />

        <Reveal delay={0.1} className="mt-10">
          <div className="inline-flex rounded-full border-2 border-sa-ink bg-white p-1" role="tablist">
            {[
              ["ask", "Ask a question"],
              ["do", "Give an instruction"],
            ].map(([k, label]) => (
              <button
                key={k}
                role="tab"
                aria-selected={mode === k}
                onClick={() => setMode(k)}
                className={`relative rounded-full px-5 py-2.5 text-sm font-extrabold transition-colors ${mode === k ? "text-white" : "text-sa-ink hover:text-sa-red"}`}
              >
                {mode === k && <motion.span layoutId="sa-askdo" className="absolute inset-0 rounded-full bg-sa-gradient" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                <span className="relative">{label}</span>
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            {/* prompts */}
            <div className="space-y-3">
              {(mode === "ask" ? QUESTIONS.map((x) => x.q) : COMMANDS.map((x) => x.c)).map((text, i) => {
                const active = mode === "ask" ? qi === i : ci === i;
                return (
                  <button
                    key={text}
                    onClick={() => (mode === "ask" ? setQi(i) : setCi(i))}
                    className={`flex w-full items-center gap-3 rounded-2xl border-2 px-5 py-4 text-left text-[15px] font-bold transition-all ${
                      active ? "border-sa-ink bg-sa-maroon text-white shadow-[4px_4px_0_#1C1410]" : "border-sa-ink/15 bg-white text-sa-ink hover:border-sa-ink"
                    }`}
                  >
                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${active ? "bg-sa-marigold text-sa-ink" : "bg-sa-parchment text-sa-red"}`}>
                      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                        <rect x="4.5" y="1" width="5" height="8" rx="2.5" fill="currentColor" />
                        <path d="M2.5 6.5a4.5 4.5 0 009 0M7 11v2" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                      </svg>
                    </span>
                    “{text}”
                  </button>
                );
              })}
            </div>

            {/* result */}
            <div className="relative min-h-[360px] rounded-3xl border-2 border-sa-ink bg-white p-6 shadow-[6px_6px_0_#8E1B12] sm:p-8">
              <AnimatePresence mode="wait">
                {mode === "ask" ? (
                  <motion.div key={`q${qi}`} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease: EASE }}>
                    <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-sa-muted">Saarthi answers</p>
                    {q.big && (
                      <>
                        <p className="sa-serif mt-3 text-5xl font-bold text-sa-ink">{q.big}</p>
                        <p className="mt-1 text-sm font-bold text-sa-brown">{q.sub}</p>
                      </>
                    )}
                    <ul className="mt-6 divide-y divide-sa-line rounded-2xl border border-sa-line">
                      {q.rows.map(([k, v], i) => (
                        <motion.li
                          key={k}
                          className="flex items-center justify-between px-4 py-3 text-[15px]"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.15 + i * 0.08, ease: EASE }}
                        >
                          <span className="font-semibold text-sa-brown">{k}</span>
                          <span className="font-extrabold text-sa-ink">{v}</span>
                        </motion.li>
                      ))}
                    </ul>
                    <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-sa-mint px-3 py-1.5 text-xs font-extrabold text-sa-teal">
                      <span className="h-1.5 w-1.5 rounded-full bg-sa-teal" /> From: {q.from}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key={`c${ci}`} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease: EASE }}>
                    <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-sa-muted">Saarthi does</p>
                    <ol className="mt-5 space-y-3">
                      {c.steps.map((s, i) => (
                        <motion.li
                          key={s}
                          className="flex items-center gap-3 rounded-2xl border border-sa-line bg-sa-paper px-4 py-3 text-[15px] font-bold text-sa-ink"
                          initial={{ opacity: 0, x: 16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.15 + i * 0.35, ease: EASE }}
                        >
                          <StepTick i={i} />
                          {s}
                        </motion.li>
                      ))}
                    </ol>
                    <motion.p
                      className="mt-5 text-sm font-bold text-sa-brown"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + c.steps.length * 0.35 }}
                    >
                      One sentence. No menus.
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
              <p className="absolute bottom-3 right-5 text-[11px] font-semibold text-sa-muted">Sample data</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Engine() {
  return (
    <section className="sa-dots relative overflow-hidden bg-sa-night px-4 py-20 text-white sm:px-6 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          tone="dark"
          eyebrow="How the answers stay right"
          title={
            <>
              No guessed <span className="text-sa-marigold">maths.</span>
            </>
          }
          sub="AI is brilliant at language and unreliable at arithmetic. So Saarthi uses it only for the first — your own books do the second."
        />
        <div className="mt-14 grid gap-4 md:grid-cols-4">
          {ENGINE.map(({ Icon, title, body, tag }, i) => (
            <Reveal key={title} delay={i * 0.12} className="relative">
              <div className={`h-full rounded-3xl border-2 p-6 ${tag ? "border-sa-marigold/60 bg-white/[0.06]" : "border-white/15 bg-white/[0.03]"}`}>
                <Icon />
                {tag && <p className="mt-4 inline-block rounded-full bg-sa-marigold px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-sa-ink">{tag}</p>}
                <h3 className="mt-4 text-lg font-extrabold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{body}</p>
              </div>
              {i < ENGINE.length - 1 && (
                <svg className="absolute -right-4 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 md:block sa-anim" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="11" fill="#1A0F0B" stroke="#FFB21E" strokeWidth="1.5" />
                  <path d="M8 12h8M13 8l4 4-4 4" stroke="#FFB21E" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Modules() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          eyebrow="Inside Saarthi"
          title="Everything your business book needs."
          sub="Each piece talks to the others. Make a sale and the stock, the journal, the party's ledger and the GST report all move with it."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {MODULES.map((m, i) => {
            const Icon = ModuleIcons[m.key];
            return (
              <Reveal key={m.key} delay={(i % 4) * 0.07}>
                <div className="sa-card h-full rounded-3xl border-2 border-sa-ink bg-white p-6">
                  <Icon />
                  <h3 className="mt-5 text-lg font-extrabold text-sa-ink">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-sa-brown">{m.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Voice() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % VOICE.length), 3600);
    return () => clearInterval(t);
  }, [i]);
  const v = VOICE[i];

  return (
    <section className="relative overflow-hidden border-y-2 border-sa-ink bg-sa-maroon px-4 py-20 text-white sm:px-6 lg:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal className="mx-auto w-full max-w-sm">
          <VoiceOrb />
        </Reveal>
        <div>
          <SectionHead
            tone="dark"
            eyebrow="Voice, in your language"
            title="Speak the way your shop speaks."
            sub="Hindi, English, or the mix everyone actually uses. Saarthi hears the sentence and writes the entry."
          />
          <Reveal delay={0.15} className="mt-10">
            <div className="relative min-h-[190px] rounded-3xl border-2 border-sa-ink bg-sa-paper p-6 text-sa-ink shadow-[6px_6px_0_#1C1410]">
              <AnimatePresence mode="wait">
                <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease: EASE }}>
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-sa-muted">You said</p>
                  <p className="sa-serif mt-2 text-2xl font-bold sm:text-3xl">“{v.said}”</p>
                  <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.18em] text-sa-muted">Saarthi understood</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {v.got.map((t, k) => (
                      <motion.span
                        key={t}
                        className={`rounded-full px-3.5 py-1.5 text-sm font-extrabold ${k === 0 ? "bg-sa-red text-white" : "bg-sa-parchment text-sa-ink"}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.25 + k * 0.12, type: "spring", stiffness: 400, damping: 22 }}
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-5 flex gap-2">
              {VOICE.map((x, k) => (
                <button
                  key={x.said}
                  onClick={() => setI(k)}
                  className={`h-2.5 rounded-full transition-all ${k === i ? "w-8 bg-sa-marigold" : "w-2.5 bg-white/35 hover:bg-white/60"}`}
                  aria-label={`Example ${k + 1}`}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Trust() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHead eyebrow="Security" title="Your books stay yours." />
          <ul className="mt-10 space-y-5">
            {TRUST.map(([t, b], i) => (
              <Reveal key={t} delay={i * 0.08} as="li" className="flex gap-4">
                <span className="sa-serif grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-sa-ink bg-sa-marigold text-lg font-bold">{i + 1}</span>
                <div>
                  <p className="font-extrabold text-sa-ink">{t}</p>
                  <p className="mt-1 text-[15px] text-sa-brown">{b}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
        <Reveal delay={0.1} className="mx-auto w-full max-w-md">
          <Vault />
        </Reveal>
      </div>
    </section>
  );
}

function BuiltFor() {
  return (
    <section className="px-4 pb-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-center text-xs font-extrabold uppercase tracking-[0.2em] text-sa-muted">Built for businesses that move stock and money every day</p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {BUILT_FOR.map((b) => (
              <span key={b} className="rounded-full border-2 border-sa-ink/15 bg-white px-4 py-2 text-sm font-bold text-sa-ink">{b}</span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <a
            href={CONTRACTORS_URL}
            className="group grid items-center overflow-hidden rounded-[2rem] border-2 border-sa-ink bg-sa-steel text-white shadow-[6px_6px_0_#FFB21E] transition-transform hover:-translate-y-1 md:grid-cols-[1.1fr_0.9fr]"
          >
            <div className="p-8 sm:p-10">
              <span className="inline-block rounded-full bg-sa-marigold px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-sa-ink">New</span>
              <h3 className="sa-serif mt-4 text-3xl font-bold leading-tight sm:text-4xl">Saarthi for Contractors</h3>
              <p className="mt-3 max-w-md text-white/75">
                Workers, attendance, advances and payroll that builds itself. Separate logins for owners, site managers and workers.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 font-extrabold text-sa-marigold">
                See how it works <Arrow className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
            <div className="h-full border-t-2 border-sa-ink bg-sa-concrete md:border-l-2 md:border-t-0">
              <SiteMini />
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export default function Saarthi() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="sa-root min-h-screen overflow-x-clip">
        <TopNav theme="light" />
        <main>
          <Hero />
          <Ticker items={ASKS} />
          <Problem />
          <AskDo />
          <Engine />
          <Modules />
          <Voice />
          <Trust />
          <BuiltFor />
          <section className="px-4 pb-4 sm:px-6">
            <div className="mx-auto max-w-4xl">
              <SectionHead eyebrow="Questions" title="Before you ask Saarthi, ask us." center />
              <Reveal delay={0.1} className="mt-10">
                <FAQList items={FAQS} />
              </Reveal>
            </div>
          </section>
          <SaarthiCTA
            title="Stop searching your books. Start asking them."
            sub="See Saarthi on your own numbers in a 30-minute demo."
            secondary={{ label: "Get a free smart report", href: REPORT_URL }}
            demoHref={SAARTHI_DEMO_URL}
          />
        </main>
        <SaarthiFooter />
      </div>
    </MotionConfig>
  );
}
