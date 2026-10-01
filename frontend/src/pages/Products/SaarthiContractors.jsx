import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, animate, motion } from "framer-motion";
import { Check, Loader2, X } from "lucide-react";
import TopNav from "../../components/TopNav";
import {
  Arrow,
  CONTRACTORS_DEMO_URL,
  EASE,
  Eyebrow,
  FAQList,
  Reveal,
  SAARTHI_URL,
  SaarthiCTA,
  SaarthiFooter,
  SectionHead,
  StrikeList,
  Ticker,
  rupees,
} from "../../components/saarthi/kit";
import {
  AdvanceFlow,
  KachhaRegister,
  PayrollMachine,
  SiteHero,
  SiteIcons,
  SitesMap,
  StepIcons,
} from "../../components/saarthi/contractorArt";
import "../../components/saarthi/saarthi.css";

/* ------------------------------------------------------------------ */

const COMMANDS = [
  "Ramesh aaj half day",
  "Suresh ko ₹2,000 advance diya",
  "Site B ki payroll banao",
  "Anil ka overtime 3 ghante",
  "Kal se Imran Site C pe",
  "Is hafte kitna advance gaya?",
  "Sab present, sirf Lakshmi absent",
  "Thekedar Pappu ka hisaab dikhao",
];

const PAINS = [
  ["Attendance lives in the supervisor's notebook", "Marked on the phone, at the site, every day"],
  ["Advances are given in cash and remembered by nobody", "Every advance recorded, recovered on schedule"],
  ["Payroll day means a calculator and an argument", "Payroll builds itself from the week's attendance"],
  ["Workers can't check what they're owed", "Each worker sees their own days, advances and payslips"],
  ["You don't know what labour costs per site", "Labour cost per site, per week, per project"],
];

const STEPS = [
  { Icon: StepIcons.add, title: "Add your crew", body: "Name, trade, wage and site. Import a list or add them one by one." },
  { Icon: StepIcons.attend, title: "Mark attendance", body: "Present, half day, absent or overtime. At the site, in seconds." },
  { Icon: StepIcons.advance, title: "Record advances", body: "Give an advance from your phone and choose how it's recovered." },
  { Icon: StepIcons.payroll, title: "Payroll is ready", body: "Days, overtime, advances and deductions — all worked out for you." },
];

/* --- the live demo ------------------------------------------------ */

const STATES = ["P", "H", "A", "OT"];
const STATE_STYLE = {
  P: { label: "P", cls: "bg-sa-mint text-sa-teal border-sa-teal/40", name: "Present" },
  H: { label: "½", cls: "bg-[#FFF1D6] text-[#9A5B00] border-[#E7B75F]", name: "Half day" },
  A: { label: "A", cls: "bg-[#FCE3DE] text-sa-red border-sa-red/40", name: "Absent" },
  OT: { label: "OT", cls: "bg-sa-steel text-sa-marigold border-sa-ink", name: "Full day + 3 hrs overtime" },
};
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const OT_HOURS = 3;
const OT_MULTIPLIER = 1.5;

const CREW = [
  { id: "ramesh", name: "Ramesh Yadav", trade: "Mason", rate: 900, advance: 1000, week: ["P", "P", "P", "OT", "P", "P"] },
  { id: "suresh", name: "Suresh Kumar", trade: "Helper", rate: 600, advance: 0, week: ["P", "H", "P", "P", "A", "P"] },
  { id: "anil", name: "Anil Sharma", trade: "Carpenter", rate: 850, advance: 500, week: ["P", "P", "A", "P", "P", "OT"] },
  { id: "imran", name: "Imran Shaikh", trade: "Electrician", rate: 950, advance: 0, week: ["OT", "P", "P", "P", "P", "H"] },
  { id: "lakshmi", name: "Lakshmi Devi", trade: "Helper", rate: 600, advance: 300, week: ["P", "P", "P", "H", "P", "P"] },
];

function pay(worker, week) {
  const days = week.reduce((n, s) => n + (s === "P" || s === "OT" ? 1 : s === "H" ? 0.5 : 0), 0);
  const otHours = week.filter((s) => s === "OT").length * OT_HOURS;
  const gross = days * worker.rate + otHours * (worker.rate / 8) * OT_MULTIPLIER;
  const advance = Math.min(worker.advance, gross);
  return { days, otHours, gross, advance, net: gross - advance };
}

function AnimatedRupees({ value }) {
  const [v, setV] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    const c = animate(from.current, value, {
      duration: 0.6,
      ease: EASE,
      onUpdate: (x) => {
        from.current = x;
        setV(x);
      },
    });
    return () => c.stop();
  }, [value]);
  return <>{rupees(v)}</>;
}

function PayrollDemo() {
  const [grid, setGrid] = useState(() => Object.fromEntries(CREW.map((w) => [w.id, w.week])));
  const [run, setRun] = useState("idle"); // idle | running | done
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  const cycle = (id, d) => {
    clearTimeout(timer.current);
    setRun("idle");
    setGrid((g) => {
      const week = [...g[id]];
      week[d] = STATES[(STATES.indexOf(week[d]) + 1) % STATES.length];
      return { ...g, [id]: week };
    });
  };

  const rows = useMemo(() => CREW.map((w) => ({ ...w, ...pay(w, grid[w.id]) })), [grid]);
  const total = rows.reduce((n, r) => n + r.net, 0);
  const totalAdv = rows.reduce((n, r) => n + r.advance, 0);

  const runPayroll = () => {
    setRun("running");
    timer.current = setTimeout(() => setRun("done"), 1400);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      {/* attendance */}
      <div className="flex flex-col rounded-3xl border-2 border-sa-ink bg-white p-4 shadow-[6px_6px_0_#1C1410] sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-sa-muted">Site A · Week 40</p>
            <p className="mt-1 text-lg font-extrabold text-sa-ink">Attendance</p>
          </div>
          <p className="rounded-full bg-sa-concrete px-3 py-1.5 text-xs font-bold text-sa-brown">Tap a day to change it</p>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-1.5 text-left">
            <thead>
              <tr className="text-[11px] font-extrabold uppercase tracking-wider text-sa-muted">
                <th className="pr-2 font-extrabold">Worker</th>
                {DAYS.map((d) => (
                  <th key={d} className="px-0.5 text-center font-extrabold">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CREW.map((w) => (
                <tr key={w.id}>
                  <td className="pr-2">
                    <p className="text-sm font-extrabold text-sa-ink">
                      <span className="sm:hidden">{w.name.split(" ")[0]}</span>
                      <span className="hidden sm:inline">{w.name}</span>
                    </p>
                    <p className="text-[11px] font-semibold text-sa-muted">
                      {w.trade} · {rupees(w.rate)}/day
                    </p>
                  </td>
                  {grid[w.id].map((s, d) => (
                    <td key={d} className="px-0.5 text-center">
                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={() => cycle(w.id, d)}
                        className={`h-9 w-9 rounded-xl border-2 text-xs font-extrabold transition-colors sm:h-10 sm:w-10 ${STATE_STYLE[s].cls}`}
                        aria-label={`${w.name}, ${DAYS[d]}: ${STATE_STYLE[s].name}. Tap to change.`}
                      >
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.span key={s} className="block" initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -8, opacity: 0 }} transition={{ duration: 0.15 }}>
                            {STATE_STYLE[s].label}
                          </motion.span>
                        </AnimatePresence>
                      </motion.button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[11px] font-bold text-sa-brown">
          {STATES.map((s) => (
            <li key={s} className="flex items-center gap-1.5">
              <span className={`grid h-5 w-5 place-items-center rounded-md border text-[9px] font-extrabold ${STATE_STYLE[s].cls}`}>{STATE_STYLE[s].label}</span>
              {STATE_STYLE[s].name}
            </li>
          ))}
        </ul>

        <dl className="mt-auto grid grid-cols-3 gap-2 pt-6">
          {[
            ["Days worked", rows.reduce((n, r) => n + r.days, 0)],
            ["Overtime", `${rows.reduce((n, r) => n + r.otHours, 0)} hrs`],
            ["Absences", Object.values(grid).flat().filter((s) => s === "A").length],
          ].map(([k, v]) => (
            <div key={k} className="rounded-2xl bg-sa-concrete px-3 py-3">
              <dt className="text-[10px] font-extrabold uppercase tracking-wider text-sa-muted">{k}</dt>
              <dd className="sa-serif mt-0.5 text-2xl font-bold text-sa-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* payroll */}
      <div className="flex flex-col rounded-3xl border-2 border-sa-ink bg-sa-steel p-4 text-white shadow-[6px_6px_0_#FFB21E] sm:p-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-sa-marigold">Payroll · builds itself</p>
            <p className="mt-1 text-lg font-extrabold">Week 40</p>
          </div>
          <p className="text-right text-[11px] font-semibold text-white/55">
            Overtime at {OT_MULTIPLIER}× the hourly rate
          </p>
        </div>

        <ul className="mt-5 flex-1 divide-y divide-white/10">
          {rows.map((r) => (
            <li key={r.id} className="flex items-center justify-between gap-3 py-2.5">
              <div className="min-w-0">
                <p className="truncate text-sm font-extrabold">{r.name}</p>
                <p className="text-[11px] font-semibold text-white/55">
                  {r.days} days{r.otHours ? ` · ${r.otHours}h OT` : ""}
                  {r.advance ? ` · −${rupees(r.advance)} advance` : ""}
                </p>
              </div>
              <p className="shrink-0 text-base font-extrabold tabular-nums text-sa-marigold">
                <AnimatedRupees value={r.net} />
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-4 rounded-2xl bg-sa-gradient p-4">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-white/80">Net payable</p>
              <p className="sa-serif text-3xl font-bold tabular-nums">
                <AnimatedRupees value={total} />
              </p>
            </div>
            <p className="text-right text-[11px] font-bold text-white/80">
              Advances recovered
              <br />
              <span className="text-sm font-extrabold text-white">
                <AnimatedRupees value={totalAdv} />
              </span>
            </p>
          </div>
        </div>

        <button
          onClick={runPayroll}
          disabled={run !== "idle"}
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border-2 border-sa-ink bg-sa-marigold px-6 py-3 text-sm font-extrabold text-sa-ink transition-transform hover:-translate-y-0.5 disabled:translate-y-0"
        >
          {run === "idle" && (
            <>
              Release payroll & send payslips <Arrow />
            </>
          )}
          {run === "running" && (
            <>
              <Loader2 size={16} className="animate-spin" /> Generating payslips…
            </>
          )}
          {run === "done" && (
            <>
              <Check size={16} strokeWidth={3} /> 5 payslips sent on WhatsApp
            </>
          )}
        </button>
        <p className="mt-2 text-center text-[11px] font-semibold text-white/45">Demo with sample workers. Nothing is sent.</p>
      </div>
    </div>
  );
}

/* --- roles -------------------------------------------------------- */

const ROLES = {
  owner: {
    label: "Owner",
    login: "Mobile + password, all sites",
    can: ["See every site, worker and rupee", "Set wage rates and overtime rules", "Approve advances above a manager's limit", "Release payroll", "Add and remove managers"],
    cant: [],
  },
  manager: {
    label: "Site manager",
    login: "Mobile OTP, only their sites",
    can: ["Mark attendance for their site", "Add new workers for approval", "Give advances up to their limit", "Post the daily site diary and photos"],
    cant: ["See other sites", "Change wage rates", "Release payroll"],
  },
  worker: {
    label: "Worker",
    login: "Mobile OTP, in Hindi or English",
    can: ["See their own days and overtime", "See their advance balance", "Download every payslip", "Request an advance"],
    cant: ["See anyone else's pay", "Change their attendance"],
  },
};

function Pill({ s }) {
  return <span className={`grid h-6 w-9 place-items-center rounded-full border text-[10px] font-extrabold ${STATE_STYLE[s].cls}`}>{STATE_STYLE[s].label}</span>;
}

function PhoneScreen({ role }) {
  if (role === "owner")
    return (
      <div className="space-y-3">
        <p className="text-xs font-bold text-sa-muted">Good morning, Mr. Patil</p>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-2xl bg-sa-mint p-3">
            <p className="text-[10px] font-extrabold uppercase text-sa-teal">On site today</p>
            <p className="sa-serif text-2xl font-bold text-sa-ink">87/94</p>
          </div>
          <div className="rounded-2xl bg-sa-concrete p-3">
            <p className="text-[10px] font-extrabold uppercase text-sa-brown">Labour · this week</p>
            <p className="sa-serif text-2xl font-bold text-sa-ink">₹5.6L</p>
          </div>
        </div>
        <div className="rounded-2xl border border-sa-line p-3">
          <p className="text-[10px] font-extrabold uppercase text-sa-muted">Advance requests</p>
          {[
            ["Imran · Site B", "₹3,000"],
            ["Pappu (thekedar)", "₹15,000"],
          ].map(([n, a]) => (
            <div key={n} className="mt-2 flex items-center justify-between text-xs font-bold">
              <span>{n}</span>
              <span className="flex items-center gap-2">
                {a}
                <span className="rounded-full bg-sa-teal px-2 py-0.5 text-[10px] text-white">Approve</span>
              </span>
            </div>
          ))}
        </div>
        <div className="rounded-2xl bg-sa-gradient p-3 text-white">
          <p className="text-[10px] font-extrabold uppercase text-white/80">Payroll due Saturday</p>
          <p className="text-sm font-extrabold">3 sites · 87 workers · ₹5,18,400</p>
        </div>
      </div>
    );
  if (role === "manager")
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-extrabold">Site A · Andheri</p>
          <p className="text-[10px] font-bold text-sa-muted">Wed, 1 Oct</p>
        </div>
        <div className="rounded-2xl border border-sa-line">
          {[
            ["Ramesh", "P"],
            ["Suresh", "H"],
            ["Anil", "P"],
            ["Imran", "OT"],
            ["Lakshmi", "A"],
          ].map(([n, s]) => (
            <div key={n} className="flex items-center justify-between border-b border-sa-line px-3 py-2 last:border-0">
              <span className="text-xs font-bold">{n}</span>
              <Pill s={s} />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 text-[11px] font-extrabold">
          <span className="rounded-full bg-sa-teal py-2 text-center text-white">Mark all present</span>
          <span className="rounded-full border-2 border-sa-ink py-1.5 text-center">Give advance</span>
        </div>
        <p className="text-center text-[10px] font-semibold text-sa-muted">Advance limit: ₹2,000 per worker</p>
      </div>
    );
  return (
    <div className="space-y-3">
      <p className="text-sm font-extrabold">Namaste, Ramesh</p>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-2xl bg-sa-mint p-3">
          <p className="text-[10px] font-extrabold uppercase text-sa-teal">Is mahine</p>
          <p className="sa-serif text-2xl font-bold">22 din</p>
        </div>
        <div className="rounded-2xl bg-sa-concrete p-3">
          <p className="text-[10px] font-extrabold uppercase text-sa-brown">Overtime</p>
          <p className="sa-serif text-2xl font-bold">6 ghante</p>
        </div>
      </div>
      <div className="rounded-2xl border border-sa-line p-3">
        <p className="text-[10px] font-extrabold uppercase text-sa-muted">Advance baaki</p>
        <p className="text-lg font-extrabold text-sa-red">₹3,000</p>
        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-sa-concrete">
          <div className="h-full w-2/5 rounded-full bg-sa-teal" />
        </div>
        <p className="mt-1 text-[10px] font-semibold text-sa-muted">₹2,000 of ₹5,000 recovered</p>
      </div>
      <div className="flex items-center justify-between rounded-2xl bg-sa-steel p-3 text-white">
        <div>
          <p className="text-[10px] font-extrabold uppercase text-white/60">Last payslip</p>
          <p className="text-sm font-extrabold">₹5,640 · Week 39</p>
        </div>
        <span className="rounded-full bg-sa-marigold px-2.5 py-1 text-[10px] font-extrabold text-sa-ink">PDF</span>
      </div>
      <span className="block rounded-full bg-sa-gradient py-2 text-center text-[11px] font-extrabold text-white">Advance maangein</span>
    </div>
  );
}

function Roles() {
  const [role, setRole] = useState("manager");
  const r = ROLES[role];
  return (
    <section className="border-y-2 border-sa-ink bg-sa-paper px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          eyebrow="Separate logins"
          eyebrowTone="site"
          title="Three logins. Each sees what they should."
          sub="Owners see everything. Site managers run their own site. Workers see their own pay, and nothing else."
        />
        <Reveal delay={0.1} className="mt-10">
          <div className="inline-flex flex-wrap rounded-full border-2 border-sa-ink bg-white p-1" role="tablist">
            {Object.entries(ROLES).map(([k, v]) => (
              <button
                key={k}
                role="tab"
                aria-selected={role === k}
                onClick={() => setRole(k)}
                className={`relative rounded-full px-5 py-2.5 text-sm font-extrabold ${role === k ? "text-white" : "text-sa-ink hover:text-sa-red"}`}
              >
                {role === k && <motion.span layoutId="sa-role" className="absolute inset-0 rounded-full bg-sa-steel" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                <span className="relative">{v.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
            {/* phone */}
            <div className="relative mx-auto">
              <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[2.75rem] bg-sa-marigold" />
              <div className="relative w-[290px] rounded-[2.75rem] border-[10px] border-sa-ink bg-white px-4 pb-6 pt-8">
                <div className="absolute left-1/2 top-2 h-1.5 w-16 -translate-x-1/2 rounded-full bg-sa-ink" />
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-sa-red">Saarthi</span>
                  <span className="rounded-full bg-sa-concrete px-2 py-0.5 text-[10px] font-extrabold text-sa-brown">{r.label}</span>
                </div>
                <div className="min-h-[380px]">
                  <AnimatePresence mode="wait">
                    <motion.div key={role} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.35, ease: EASE }}>
                      <PhoneScreen role={role} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* permissions */}
            <AnimatePresence mode="wait">
              <motion.div key={role} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35, ease: EASE }}>
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-sa-muted">Logs in with</p>
                <p className="sa-serif mt-1 text-2xl font-bold text-sa-ink">{r.login}</p>
                <ul className="mt-6 space-y-3">
                  {r.can.map((c, i) => (
                    <motion.li key={c} className="flex items-center gap-3 text-[15px] font-bold text-sa-ink" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.06 }}>
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sa-teal text-white">
                        <Check size={15} strokeWidth={3} />
                      </span>
                      {c}
                    </motion.li>
                  ))}
                  {r.cant.map((c, i) => (
                    <motion.li key={c} className="flex items-center gap-3 text-[15px] font-bold text-sa-muted" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + (r.can.length + i) * 0.06 }}>
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sa-concrete text-sa-red">
                        <X size={15} strokeWidth={3} />
                      </span>
                      {c}
                    </motion.li>
                  ))}
                </ul>
                <p className="mt-6 rounded-2xl border-2 border-dashed border-sa-ink/25 p-4 text-sm font-semibold text-sa-brown">
                  Every entry records who made it and when. Back-dated changes go to the owner for approval.
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --- other sections ----------------------------------------------- */

const FORMULA = [
  { t: "Days × rate", c: "bg-white text-sa-ink" },
  { t: "+ Overtime", c: "bg-sa-mint text-sa-teal" },
  { t: "+ Allowances", c: "bg-sa-mint text-sa-teal" },
  { t: "− Advances", c: "bg-[#FCE3DE] text-sa-red" },
  { t: "− Deductions", c: "bg-[#FCE3DE] text-sa-red" },
  { t: "= Net pay", c: "bg-sa-gradient text-white" },
];

const FEATURES = [
  { key: "checkin", title: "Selfie + location check-in", body: "Workers check in at the site. A selfie and the site's boundary confirm they're really there." },
  { key: "thekedar", title: "Thekedars & sub-contractors", body: "Group workers under their thekedar and settle the whole gang in one payment." },
  { key: "piecerate", title: "Daily, hourly or piece-rate", body: "Pay by the day, the hour, the square foot or the job. Mix them on one site." },
  { key: "diary", title: "Daily site diary", body: "Photos, work done and issues, logged from the site with the date and the name." },
  { key: "material", title: "Material at site", body: "Cement in, cement used. Material tied to the site and the day it was used." },
  { key: "registers", title: "Muster roll & wage register", body: "Attendance and wage registers, ready to print or export for your records." },
  { key: "holidays", title: "Weekly offs & holidays", body: "Weekly off, festival holidays and leave, counted automatically in payroll." },
  { key: "voice", title: "Ask in Hinglish", body: "“Is hafte kitna advance gaya?” The answer comes from your own records." },
];

const FAQS = [
  {
    question: "Do my workers need smartphones?",
    answer:
      "No. The site manager can mark attendance for the whole crew. Workers who have a smartphone can log in with their mobile number to see their own days, advances and payslips. Payslips can also be shared on WhatsApp.",
  },
  {
    question: "Can I pay some workers weekly and others monthly?",
    answer:
      "Yes. Set the pay cycle per worker or per group: weekly, fortnightly, monthly or at the end of a contract. Each cycle's payroll is prepared on its own date.",
  },
  {
    question: "How are advances recovered?",
    answer:
      "You choose: all at once from the next payroll, or a fixed amount each cycle. Saarthi never deducts more than a worker earned in that cycle; the rest carries forward, and the worker can see the balance.",
  },
  {
    question: "What stops a site manager from misusing it?",
    answer:
      "Managers only see their own sites, can only give advances up to the limit you set, and can't change wage rates or release payroll. Every entry records who made it and when, and back-dated changes need your approval.",
  },
  {
    question: "How is overtime calculated?",
    answer:
      "You set the rules: the number of regular hours, the overtime rate (for example 1.5× or 2× the hourly rate) and whether Sundays or holidays pay extra. Saarthi applies them to every worker the same way.",
  },
  {
    question: "Does it connect to my accounts?",
    answer:
      "Yes. Saarthi for Contractors runs on Saarthi, so payroll posts to your books as a labour expense for the right site, and advances are tracked against each worker until they are recovered.",
  },
];

function Hero() {
  return (
    <section className="sa-blueprint relative overflow-hidden pb-16 pt-32 sm:pt-36 lg:pb-20">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-sa-marigold/30 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:gap-6">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }} className="space-y-7">
          <Eyebrow tone="site">Saarthi for Contractors</Eyebrow>
          <h1 className="sa-serif text-5xl font-bold leading-[1.03] tracking-tight text-sa-ink sm:text-6xl lg:text-[4.1rem]">
            Every worker.
            <br />
            Every day.
            <br />
            <span className="relative inline-block">
              <span className="sa-gradient-text">Every rupee.</span>
              <svg className="absolute -bottom-3 left-0 h-4 w-full" viewBox="0 0 300 16" preserveAspectRatio="none" aria-hidden="true">
                <path d="M4 11C60 3 130 3 180 8s90 4 116-3" stroke="#FFB21E" strokeWidth="5" fill="none" strokeLinecap="round" className="sa-draw" />
              </svg>
            </span>
          </h1>
          <p className="max-w-lg text-lg leading-relaxed text-sa-brown">
            Saarthi keeps your labour register for you — who came, who didn't, who took an advance — and turns it into
            payroll on the day you pay. Owners, site managers and workers each get their own login.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={CONTRACTORS_DEMO_URL}
              className="inline-flex items-center gap-2 rounded-full border-2 border-sa-ink bg-sa-gradient px-7 py-3.5 text-sm font-extrabold text-white shadow-[4px_4px_0_#1C1410] transition-transform hover:-translate-y-0.5"
            >
              Book a demo <Arrow />
            </a>
            <a
              href="#payroll"
              className="inline-flex items-center gap-2 rounded-full border-2 border-sa-ink bg-sa-marigold px-7 py-3.5 text-sm font-extrabold text-sa-ink transition-transform hover:-translate-y-0.5"
            >
              Try the payroll demo
            </a>
          </div>
          <ul className="flex flex-wrap gap-2 pt-1 text-xs font-extrabold text-sa-brown">
            {["Daily, hourly or piece-rate", "Weekly or monthly payroll", "हिन्दी & English"].map((t) => (
              <li key={t} className="rounded-full border border-sa-ink/15 bg-white/85 px-3.5 py-2">
                {t}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.15, ease: EASE }} className="mx-auto w-full max-w-[540px]">
          <SiteHero />
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
            eyebrow="The kachha register"
            eyebrowTone="site"
            title="Your site runs on people. Your records run on a notebook."
            sub="Tally marks, torn pages and advances nobody wrote down. It's the same argument every payday."
          />
          <Reveal delay={0.15} className="mx-auto mt-10 max-w-md">
            <KachhaRegister />
          </Reveal>
        </div>
        <StrikeList rows={PAINS} tone="site" />
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="bg-sa-steel px-4 py-20 text-white sm:px-6 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHead tone="dark" eyebrow="How it works" title="Four steps. The last one does itself." />
        <div className="relative mt-14 grid gap-6 md:grid-cols-4">
          <svg className="sa-anim pointer-events-none absolute left-[12%] top-8 hidden h-2 w-[76%] md:block" viewBox="0 0 100 2" preserveAspectRatio="none" aria-hidden="true">
            <line x1="0" y1="1" x2="100" y2="1" stroke="#FFB21E" strokeWidth="2" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" className="sa-dash" />
          </svg>
          {STEPS.map(({ Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 0.12} className="relative text-center">
              <div className="mx-auto w-fit">
                <Icon />
              </div>
              <p className="mt-4 text-xs font-extrabold uppercase tracking-[0.18em] text-sa-marigold">Step {i + 1}</p>
              <h3 className="mt-1 text-lg font-extrabold">{title}</h3>
              <p className="mx-auto mt-2 max-w-[16rem] text-sm leading-relaxed text-white/65">{body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Demo() {
  return (
    <section id="payroll" className="scroll-mt-28 px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          eyebrow="Try it"
          eyebrowTone="site"
          title="Change the attendance. Watch the payroll change."
          sub="This is the whole idea. Mark the week as it happens, and the payroll — overtime, advances and all — is already done."
        />
        <Reveal delay={0.1} className="mt-10">
          <PayrollDemo />
        </Reveal>
      </div>
    </section>
  );
}

function Advances() {
  return (
    <section className="px-4 pb-20 sm:px-6 lg:pb-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <Reveal className="order-2 mx-auto w-full max-w-lg lg:order-1">
          <div className="rounded-[2rem] border-2 border-sa-ink bg-white p-4 shadow-[6px_6px_0_#1C1410]">
            <AdvanceFlow />
          </div>
        </Reveal>
        <div className="order-1 lg:order-2">
          <SectionHead
            eyebrow="Advances"
            eyebrowTone="site"
            title="Advances, without the arguments."
            sub="Give it from your phone. Decide how it comes back. Saarthi recovers it from each payroll until it's cleared — and the worker can see the balance too."
          />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "Recover in one go or in instalments",
              "Never deducts more than was earned",
              "Manager limits, owner approval above",
              "Loans, canteen, tools and damages too",
              "Allowances and bonuses added the same way",
              "Worker requests an advance from the app",
            ].map((t, i) => (
              <Reveal key={t} delay={i * 0.05} as="li" className="flex items-start gap-2.5 rounded-2xl border border-sa-ink/10 bg-white px-4 py-3 text-sm font-bold text-sa-ink">
                <Check size={16} strokeWidth={3} className="mt-0.5 shrink-0 text-sa-teal" /> {t}
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Payroll() {
  return (
    <section className="relative border-y-2 border-sa-ink bg-sa-night px-4 py-20 text-white sm:px-6 lg:py-28">
      <div className="sa-hazard absolute inset-x-0 top-0 h-3" />
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <SectionHead
            tone="dark"
            eyebrow="Automatic payroll"
            title="Payroll that builds itself."
            sub="Weekly, fortnightly, monthly or at the end of a contract. When the day comes, the numbers are already there."
          />
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {FORMULA.map((f, i) => (
              <motion.span
                key={f.t}
                className={`rounded-full border-2 border-sa-ink px-4 py-2 text-sm font-extrabold ${f.c}`}
                initial={{ opacity: 0, y: 12, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: 0.2 + i * 0.12, type: "spring", stiffness: 380, damping: 24 }}
              >
                {f.t}
              </motion.span>
            ))}
          </div>
          <ul className="mt-8 space-y-3 text-[15px] text-white/75">
            {[
              ["Payslips on WhatsApp", "in Hindi or English, for every worker"],
              ["Bank / UPI sheet", "ready to upload for bulk payment"],
              ["Cash pay sheet", "with a signature column for cash days"],
              ["Wage register", "kept for every cycle, ready to export"],
            ].map(([a, b]) => (
              <li key={a} className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-sa-marigold" />
                <span>
                  <strong className="font-extrabold text-white">{a}</strong> — {b}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <Reveal delay={0.1} className="mx-auto w-full max-w-lg">
          <div className="rounded-[2rem] bg-sa-paper p-4">
            <PayrollMachine />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Sites() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHead
            eyebrow="Many sites"
            eyebrowTone="site"
            title="Many sites. One view."
            sub="Move a worker from one site to another and their days follow them. See what labour costs on every site, every week."
          />
          <ul className="mt-8 space-y-4">
            {[
              ["Labour cost per project", "Know what each site costs before you bill the client."],
              ["Check-in only at the site", "Attendance counts when the worker is inside the site boundary."],
              ["Transfers in one tap", "“Kal se Imran Site C pe” — and it's done."],
            ].map(([t, b], i) => (
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
        <Reveal delay={0.1}>
          <SitesMap />
        </Reveal>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="px-4 pb-20 sm:px-6 lg:pb-28">
      <div className="mx-auto max-w-6xl">
        <SectionHead eyebrow="And the rest of the site" eyebrowTone="site" title="Everything else a contractor keeps track of." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => {
            const Icon = SiteIcons[f.key];
            return (
              <Reveal key={f.key} delay={(i % 4) * 0.07}>
                <div className="sa-card h-full rounded-3xl border-2 border-sa-ink bg-white p-6">
                  <Icon />
                  <h3 className="mt-5 text-lg font-extrabold text-sa-ink">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-sa-brown">{f.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={0.1} className="mt-10 text-center">
          <a href={SAARTHI_URL} className="inline-flex items-center gap-2 font-extrabold text-sa-red hover:underline">
            Runs on Saarthi — billing, stock and accounts included <Arrow />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export default function SaarthiContractors() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="sa-root sa-site min-h-screen overflow-x-clip">
        <TopNav theme="light" />
        <main>
          <Hero />
          <Ticker items={COMMANDS} tone="site" />
          <Problem />
          <HowItWorks />
          <Demo />
          <Advances />
          <Payroll />
          <Roles />
          <Sites />
          <Features />
          <section className="px-4 pb-4 sm:px-6">
            <div className="mx-auto max-w-4xl">
              <SectionHead eyebrow="Questions" eyebrowTone="site" title="What contractors ask us first." center />
              <Reveal delay={0.1} className="mt-10">
                <FAQList items={FAQS} />
              </Reveal>
            </div>
          </section>
          <SaarthiCTA
            title="Pay your crew right, every time."
            sub="Bring one site's register. We'll show you the payroll Saarthi makes from it."
            secondary={{ label: "Try the payroll demo", href: "#payroll" }}
            demoHref={CONTRACTORS_DEMO_URL}
          />
        </main>
        <SaarthiFooter />
      </div>
    </MotionConfig>
  );
}
