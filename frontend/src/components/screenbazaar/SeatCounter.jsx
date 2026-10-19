/**
 * "x / 50" live seat counter for the first-50-customers scheme.
 *
 * Reads GET /api/leads/count, which counts Screen Bazaar leads only — the
 * 30% off offer is signage-only (see the flyer campaign in SCREEN_BAZAAR_PLAN.md).
 *
 * Renders nothing until the count arrives and nothing at all if the request
 * fails: a broken counter must never show "0 / 50" or a spinner where the
 * flyer promised scarcity. The page reads fine without it.
 */
import { useEffect, useState } from "react";

export const OFFER_TOTAL = 50;

/** Fetch the count once. Returns null while loading or on any failure. */
export function useSeatCount() {
  const [data, setData] = useState(null);

  useEffect(() => {
    let live = true;
    const ac = new AbortController();
    fetch(`${import.meta.env.VITE_API_URL}/api/leads/count`, { signal: ac.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("bad status"))))
      .then((d) => {
        if (!live || typeof d?.count !== "number") return;
        const total = typeof d.total === "number" ? d.total : OFFER_TOTAL;
        setData({ count: Math.max(0, Math.min(d.count, total)), total });
      })
      .catch(() => {});
    return () => {
      live = false;
      ac.abort();
    };
  }, []);

  return data;
}

/**
 * The counter card: big x / 50, a progress bar, and the seats-left line.
 * `tone` picks the surface — "light" on cream, "dark" inside the gradient banner.
 */
export default function SeatCounter({ tone = "light", className = "" }) {
  const data = useSeatCount();
  if (!data) return null;

  const { count, total } = data;
  const left = Math.max(0, total - count);
  const pct = total ? Math.min(100, Math.round((count / total) * 100)) : 0;
  const dark = tone === "dark";

  return (
    <div
      className={`rounded-[28px] border-2 border-sb-ink p-5 shadow-[5px_5px_0_#191919] ${
        dark ? "bg-sb-ink text-white" : "bg-white text-sb-ink"
      } ${className}`}
      role="status"
      aria-live="polite"
    >
      <p
        className={`font-manrope text-[11px] font-extrabold uppercase tracking-[0.18em] ${
          dark ? "text-sb-gold" : "text-sb-violet"
        }`}
      >
        Founding 50 — registrations so far
      </p>

      <p className="mt-2 flex items-baseline gap-1 font-manrope font-extrabold tracking-tight">
        <span className={`text-5xl sm:text-6xl ${dark ? "text-sb-gold" : "sb-gradient-text"}`}>{count}</span>
        <span className={`text-2xl sm:text-3xl ${dark ? "text-white/60" : "text-sb-muted"}`}>/ {total}</span>
      </p>

      <div
        className={`mt-3 h-3 w-full overflow-hidden rounded-full border-2 border-sb-ink ${dark ? "bg-white/15" : "bg-sb-warm"}`}
        role="progressbar"
        aria-valuenow={count}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`${count} of ${total} founding seats claimed`}
      >
        <div
          className="h-full rounded-full bg-sb-gradient transition-[width] duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>

      <p className={`mt-3 font-manrope text-sm font-bold ${dark ? "text-white/80" : "text-sb-slate"}`}>
        {left === 0 ? (
          <>All 50 founding seats are taken — register anyway and we&apos;ll call you first if one opens up.</>
        ) : (
          <>
            <span className={`font-extrabold ${dark ? "text-white" : "text-sb-ink"}`}>
              {left} {left === 1 ? "seat" : "seats"} left
            </span>{" "}
            at 30% off. Register to claim one.
          </>
        )}
      </p>
    </div>
  );
}
