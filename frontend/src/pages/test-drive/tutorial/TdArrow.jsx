import { useEffect, useState } from "react";

/**
 * A pulsing "tap here" arrow that anchors to a `data-td-target` element.
 *
 * Drawn OUTSIDE the element (pointer-events: none) so it never blocks the
 * control it is pointing at — the same invariant as Spotlight. Positions itself
 * below the target's centre by default; pass `side="right"` to put it to the
 * right instead (used when the target is near the screen bottom).
 *
 * Only renders when the target element exists in the DOM and has non-zero size.
 */

const POLL_MS = 400;

export default function TdArrow({ target, side = "below", label = "" }) {
  const [pos, setPos] = useState(null);

  useEffect(() => {
    if (!target || typeof document === "undefined") {
      setPos(null);
      return undefined;
    }

    const measure = () => {
      const el = document.querySelector(`[data-td-target="${target}"]`);
      if (!el) { setPos(null); return; }
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) { setPos(null); return; }
      setPos((prev) => {
        const next = side === "right"
          ? { x: r.right + 8, y: r.top + r.height / 2 }
          : { x: r.left + r.width / 2, y: r.bottom + 8 };
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
  }, [target, side]);

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
