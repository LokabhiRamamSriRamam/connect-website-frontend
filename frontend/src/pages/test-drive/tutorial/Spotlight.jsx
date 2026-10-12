import { useEffect, useState } from "react";

/**
 * A ring around the control a mission is teaching.
 *
 * Drawn OUTSIDE the element, with pointer-events: none (see .td-spotlight in
 * td.css). That combination is load-bearing: a spotlight that covered the very
 * control it was pointing at would make every mission impossible to complete,
 * and an overlay that swallowed clicks would do the same thing less visibly.
 *
 * Position is measured from the DOM rather than declared, because the targets
 * are ordinary components in a responsive layout and nothing else knows where
 * they land. Measured on mount, on scroll, on resize — and polled slowly,
 * because the Control Panel's tabs change height without firing either event.
 */

/** How often to re-measure, in ms. Slow: this is a fallback, not the mechanism. */
const POLL_MS = 500;

/** Breathing room between the element's box and the ring. */
const PAD = 6;

export default function Spotlight({ target, pulse = true }) {
  const [box, setBox] = useState(null);

  useEffect(() => {
    if (!target || typeof document === "undefined") {
      setBox(null);
      return undefined;
    }

    let frame = 0;

    const measure = () => {
      const el = document.querySelector(`[data-td-target="${target}"]`);
      if (!el) {
        setBox(null);
        return;
      }
      const r = el.getBoundingClientRect();
      // An element scrolled out of view, or collapsed, gets no ring rather than
      // a ring around nothing at the top-left corner.
      if (r.width === 0 || r.height === 0) {
        setBox(null);
        return;
      }
      setBox((prev) => {
        const next = {
          top: r.top - PAD,
          left: r.left - PAD,
          width: r.width + PAD * 2,
          height: r.height + PAD * 2,
        };
        // Only re-render on a real move. Without this the poll below would
        // re-render four times a second forever.
        if (
          prev &&
          Math.abs(prev.top - next.top) < 1 &&
          Math.abs(prev.left - next.left) < 1 &&
          Math.abs(prev.width - next.width) < 1 &&
          Math.abs(prev.height - next.height) < 1
        ) {
          return prev;
        }
        return next;
      });
    };

    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const poll = setInterval(measure, POLL_MS);

    return () => {
      cancelAnimationFrame(frame);
      clearInterval(poll);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [target]);

  if (!box) return null;

  return (
    <div
      /* aria-hidden and pointer-events-none: decorative, and it must never
         intercept a tap meant for the control it surrounds. */
      aria-hidden="true"
      data-td-spotlight={target}
      className={`td-spotlight ${pulse ? "td-spotlight-pulse" : ""}`}
      style={{ top: box.top, left: box.left, width: box.width, height: box.height }}
    />
  );
}
