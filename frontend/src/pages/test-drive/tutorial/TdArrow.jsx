import { useEffect, useState } from "react";

/**
 * A pulsing "tap here" arrow that anchors to a `data-td-target` element.
 *
 * Drawn OUTSIDE the element (pointer-events: none) so it never blocks the
 * control it is pointing at — the same invariant as Spotlight. Positions itself
 * below the target's centre by default; pass `side="right"` to put it to the
 * right instead (used when the target is near the screen bottom).
 *
 * `targets` is an ordered CHAIN, most specific first, and the arrow points at
 * the first one that is actually on screen. That is what keeps a pointer present
 * for the whole mission rather than for its first step: m2 asks the visitor into
 * the health tab and then to press Refresh, so the chain is
 * ["health-refresh", "panel-tab-health", "console-tab-panel"] — Refresh once the
 * tab is open, the tab while the panel is open, the console tab before that.
 * Each step the visitor takes brings the next target into the DOM, and the arrow
 * moves to it on its own with no state to track.
 *
 * Ordering it most-specific-first is load-bearing. The reverse would stop at the
 * console tab forever, since that stays on screen the whole time.
 *
 * Renders nothing when no target in the chain has a non-zero box.
 */

const POLL_MS = 400;

export default function TdArrow({ targets, side = "below", label = "" }) {
  const [pos, setPos] = useState(null);

  /* Joined so the effect re-runs on a CONTENT change, not on the new array
     identity a parent produces on every render. */
  const chainKey = Array.isArray(targets) ? targets.join("|") : String(targets ?? "");

  useEffect(() => {
    const chain = chainKey ? chainKey.split("|") : [];
    if (chain.length === 0 || typeof document === "undefined") {
      setPos(null);
      return undefined;
    }

    /** One target's box, or null. A display:none ancestor gives a zero box
        rather than a missing node, so both cases are checked. */
    const boxOf = (name) => {
      if (!name) return null;
      const el = document.querySelector(`[data-td-target="${name}"]`);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return r.width === 0 || r.height === 0 ? null : r;
    };

    /**
     * Bring the target on screen the first time this chain resolves.
     *
     * Mission 1's tile sat 102px below the fold, so the one arrow the visitor
     * most needs was the one they could not see. Scrolled ONCE per chain, not on
     * every measure: the poll would otherwise fight anyone trying to scroll
     * away, and `scrolled` is reset only when the chain itself changes — which
     * happens on a mission change, exactly when a new scroll is wanted.
     */
    let scrolled = false;
    const revealIfNeeded = (el, r) => {
      if (scrolled || !el) return;
      // The mission card occupies the bottom of a phone viewport; treat the
      // lower third as covered so the target does not land underneath it.
      const safeBottom = window.innerHeight * 0.62;
      if (r.top >= 0 && r.bottom <= safeBottom) return;
      scrolled = true;
      el.scrollIntoView({ block: "center", behavior: "smooth" });
    };

    const measure = () => {
      let r = null;
      let el = null;
      for (const name of chain) {
        r = boxOf(name);
        if (r) { el = document.querySelector(`[data-td-target="${name}"]`); break; }
      }
      if (!r) { setPos(null); return; }
      revealIfNeeded(el, r);
      setPos((prev) => {
        let next;
        if (side === "right") {
          next = { x: r.right + 8, y: r.top + r.height / 2 };
        } else {
          /**
           * Below the target, unless that would put the arrow under the mission
           * card — on a phone the card owns the bottom of the viewport, and an
           * arrow that lands on it reads as pointing at the card's own buttons
           * rather than at the control. Tuck it just inside the target's lower
           * edge instead, which still reads as "this one" without leaving the
           * element.
           */
          const below = r.bottom + 8;
          const card = document.querySelector('[data-td-target="mission-card"]');
          const ceiling = card ? card.getBoundingClientRect().top - 40 : Infinity;
          next =
            below > ceiling
              ? { x: r.left + r.width / 2, y: Math.max(r.top + 8, r.bottom - 44) }
              : { x: r.left + r.width / 2, y: below };
        }
        if (prev && Math.abs(prev.x - next.x) < 1 && Math.abs(prev.y - next.y) < 1) return prev;
        return next;
      });
    };

    const schedule = () => requestAnimationFrame(measure);
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const poll = setInterval(measure, POLL_MS);
    return () => {
      clearInterval(poll);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [chainKey, side]);

  if (!pos) return null;

  return (
    <div
      aria-hidden="true"
      className="td-arrow-bounce pointer-events-none fixed z-[61]"
      style={
        side === "right"
          ? { left: pos.x, top: pos.y - 12, transform: "translateY(-50%)" }
          : { left: pos.x - 16, top: pos.y, transform: "translateX(-50%)" }
      }
    >
      {/* Chevron SVG — points down when side=below, points left when side=right */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        style={side === "right" ? { transform: "rotate(-90deg)" } : undefined}
      >
        {/* Drop shadow circle */}
        <circle cx="16" cy="16" r="14" fill="rgba(25,25,25,0.12)" />
        {/* White fill */}
        <circle cx="16" cy="15" r="13" fill="white" stroke="#191919" strokeWidth="2" />
        {/* Chevron pointing down */}
        <path d="M10 12 L16 19 L22 12" stroke="#914bfa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {label && (
        <span className="mt-1 block whitespace-nowrap rounded-full border-2 border-sb-ink bg-sb-lilac px-2 py-0.5 text-[10px] font-extrabold text-sb-ink shadow-[2px_2px_0_#191919]">
          {label}
        </span>
      )}
    </div>
  );
}
