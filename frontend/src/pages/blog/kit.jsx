import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";

/* Building blocks for blog bodies. All words stay real HTML text; SVG figures only illustrate them. */

export const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/* Section heading with a linkable id. `num` renders the numbered badge used by "1. …" headings. */
export function H2({ id, num, children }) {
  return (
    <h2 id={id}>
      {num != null && <span className="bl-num" aria-hidden="true">{num}</span>}
      {num != null && <span className="sr-only">{num}. </span>}
      {children}
    </h2>
  );
}

export function H3({ id, children }) {
  return <h3 id={id}>{children}</h3>;
}

/* Lines the blog shows "on a screen" (the source's > quotes). */
export function Shown({ children, className = "" }) {
  return (
    <blockquote className={`bl-shown ${className}`}>
      <div className="bl-shown-glass">{children}</div>
    </blockquote>
  );
}

/* A → B → C chips. Real ordered list; the glow walks along the steps. */
export function Flow({ items, down = false, label }) {
  return (
    <ol className={`bl-flow ${down ? "bl-flow-down" : ""}`} aria-label={label}>
      {items.map((it, i) => (
        <li key={it} style={{ "--i": i }}>
          {it}
        </li>
      ))}
    </ol>
  );
}

export function Statement({ children }) {
  return <p className="bl-statement">{children}</p>;
}

export function Callout({ label, children }) {
  return (
    <aside className="bl-callout">
      {label && <span className="bl-callout-label">{label}</span>}
      <div className="space-y-2">{children}</div>
    </aside>
  );
}

export function Table({ head, rows, caption }) {
  return (
    <div className="bl-table">
      <table>
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]}>
              {r.map((c, i) => (
                <td key={i}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* Figure: frame slides in once, animations run only while on screen.
   `children` may be a function (inView) => node for interactive figures that autoplay. */
export function Figure({ caption, children, className = "", frameClass = "" }) {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, amount: 0.15 });
  const inView = useInView(ref, { amount: 0.2 });
  return (
    <figure ref={ref} className={`bl-fig ${className}`} data-seen={seen || undefined} data-in={inView || undefined}>
      <div className={`bl-fig-frame ${frameClass}`}>{typeof children === "function" ? children(inView) : children}</div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

/* Cycles 0..n-1 while `active`. Picking by hand holds for `holdMs`, then autoplay resumes. */
export function useCycle(n, ms, active, holdMs = 9000) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [held, setHeld] = useState(false);
  useEffect(() => {
    if (!active || held || reduce) return;
    const id = setTimeout(() => setI((v) => (v + 1) % n), ms);
    return () => clearTimeout(id);
  }, [i, active, held, reduce, n, ms]);
  useEffect(() => {
    if (!held) return;
    const id = setTimeout(() => setHeld(false), holdMs);
    return () => clearTimeout(id);
  }, [held, i, holdMs]);
  const pick = (v) => {
    setI(v);
    setHeld(true);
  };
  return [i, pick];
}

/* Pill buttons that drive a figure. */
export function Seg({ options, value, onChange, label, className = "" }) {
  return (
    <div role="group" aria-label={label} className={`bl-seg ${className}`}>
      {options.map((o, i) => (
        <button key={o} type="button" aria-pressed={value === i} onClick={() => onChange(i)}>
          {o}
        </button>
      ))}
    </div>
  );
}

/* Problem / Fix pair (blog 5). Labels are part of the owner's text. */
export function ProblemFix({ problem, fix }) {
  return (
    <div className="bl-pf">
      <div className="bl-problem">
        <p>
          <b className="bl-tag">
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <circle cx="8" cy="8" r="7" fill="#EF4444" />
              <path d="M5.5 5.5l5 5m0-5l-5 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </svg>
            The Problem:
          </b>
          {problem}
        </p>
      </div>
      <div className="bl-fix">
        <p>
          <b className="bl-tag">
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <circle cx="8" cy="8" r="7" fill="#4CAF6E" />
              <path d="M4.8 8.2l2.2 2.2 4.2-4.6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            The Fix:
          </b>
          {fix}
        </p>
      </div>
    </div>
  );
}

/* Tickable checklist. Ticks live only in this browser (localStorage, guarded). */
function useTicks(key) {
  const [ticks, setTicks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key) || "{}");
    } catch {
      return {};
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(ticks));
    } catch {
      /* storage unavailable — ticks just won't persist */
    }
  }, [key, ticks]);
  return [ticks, (id) => setTicks((t) => ({ ...t, [id]: !t[id] }))];
}

export function ScoreRing({ done, total, label }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  const pct = total ? done / total : 0;
  return (
    <div className="flex items-center gap-3">
      <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r={r} fill="#fff" stroke="#E5E7EB" strokeWidth="7" />
        <circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)}
          transform="rotate(-90 32 32)"
          style={{ transition: "stroke-dashoffset 0.6s cubic-bezier(0.22,1,0.36,1)" }}
        />
        <text x="32" y="37" textAnchor="middle" fontFamily="Manrope, sans-serif" fontWeight="800" fontSize="14" fill="#191919">
          {Math.round(pct * 100)}%
        </text>
      </svg>
      <p className="m-0 text-sm font-bold leading-snug text-sb-ink" aria-live="polite">
        {done} of {total} {label}
      </p>
    </div>
  );
}

export function useChecklist(storageKey) {
  return useTicks(storageKey);
}

export function CheckList({ items, ticks, onToggle, prefix }) {
  return (
    <ul className="bl-check">
      {items.map((it) => {
        const id = `${prefix}-${slugify(it)}`;
        return (
          <li key={id}>
            <label htmlFor={id}>
              <input id={id} type="checkbox" checked={!!ticks[id]} onChange={() => onToggle(id)} />
              <span className="bl-box" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 12 12">
                  <path d="M2 6.5l2.6 2.5L10 3.2" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span>{it}</span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}

/* The blog's own closing call to action. */
export function CtaCard({ id, title, children, label, href = "/get-in-touch" }) {
  return (
    <section aria-labelledby={id} className="bl-cta relative mt-14 overflow-hidden rounded-[28px] border-2 border-sb-ink bg-sb-gradient p-7 text-white shadow-[6px_6px_0_#191919] sm:p-10">
      <svg className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 opacity-25" viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r="46" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="4 6" className="bl-spin" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="#F5C542" strokeWidth="3" />
      </svg>
      <h2 id={id} className="relative scroll-mt-28 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl" style={{ marginTop: 0, color: "#fff" }}>
        {title}
      </h2>
      <div className="relative mt-4 space-y-3 text-base leading-relaxed text-white/85 sm:text-lg [&_strong]:text-white">{children}</div>
      <a
        href={href}
        className="relative mt-7 inline-flex items-center gap-2 rounded-full border-2 border-sb-ink bg-sb-gold px-6 py-3 text-sm font-extrabold text-sb-ink no-underline shadow-[3px_3px_0_#191919] transition-transform hover:-translate-y-0.5 sm:text-base"
        style={{ color: "#191919", textDecoration: "none" }}
      >
        {label} <ArrowRight size={18} aria-hidden="true" />
      </a>
    </section>
  );
}

/* FAQ — rendered from meta so the page text and the FAQPage structured data always match. */
export function Faq({ items }) {
  return (
    <div className="bl-faq">
      {items.map((f) => (
        <details key={f.q}>
          <summary>
            <h3 className="m-0 text-base font-extrabold leading-snug sm:text-lg" style={{ marginTop: 0 }}>
              {f.q}
            </h3>
            <span className="bl-plus inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-sb-ink bg-white">
              <Plus size={16} aria-hidden="true" />
            </span>
          </summary>
          <div>
            <p>{f.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
