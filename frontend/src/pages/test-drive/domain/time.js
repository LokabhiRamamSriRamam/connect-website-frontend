/**
 * Time primitives for the test drive.
 *
 * Time is an integer: minutes since midnight, 0-1440. Every comparison, overlap
 * test and timeline width is integer arithmetic — no parsing, no Date, no locale.
 * That last point is the reason this file exists: Hindi numerals must never reach
 * stored data, and an integer cannot carry a numbering system.
 *
 * "HH:MM" strings exist at exactly one boundary — <input type="time"> — and are
 * converted here on the way in and out. Nothing else in the feature should format
 * or parse a clock string.
 *
 * Plain .js, no React, no import.meta outside an optional-chained dev guard: this
 * module runs under bare `node` and is unit-tested there.
 */

export const MINUTES_PER_DAY = 1440;

/** Shortest slot the UI permits, in minutes (see §5 of the plan). */
export const MIN_SLOT_MINUTES = 5;

/** Shortest active-hours window, in minutes. Matches hours.err.tooShort. */
export const MIN_ACTIVE_MINUTES = 30;

/** True for a finite integer in [0, 1440]. 1440 is allowed: it is "end of day". */
export function isValidMinute(min) {
  return Number.isInteger(min) && min >= 0 && min <= MINUTES_PER_DAY;
}

/** Clamp any number into [0, 1440] and round to a whole minute. */
export function clampMinute(min) {
  const n = Number(min);
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(MINUTES_PER_DAY, Math.round(n)));
}

/**
 * Wrap a minute value into [0, 1440) — for clock arithmetic that may run past
 * midnight, such as advancing the sim clock or an overnight active-hours window.
 * Note 1440 wraps to 0 here: as an instant, midnight-end and midnight-start are
 * the same moment. clampMinute is the one to use for a slot's endMin, which is a
 * boundary rather than an instant.
 */
export function wrapMinute(min) {
  const n = Math.round(Number(min));
  if (!Number.isFinite(n)) return 0;
  return ((n % MINUTES_PER_DAY) + MINUTES_PER_DAY) % MINUTES_PER_DAY;
}

/**
 * "HH:MM" -> minutes, or null if it isn't a clock string. Accepts "9:05" as well
 * as "09:05" (some browsers hand back the short form) and the lone "24:00".
 * Returns null rather than 0 for junk so a caller can tell "empty" from midnight.
 */
export function hhmmToMinutes(hhmm) {
  if (typeof hhmm !== "string") return null;
  const m = /^(\d{1,2}):(\d{2})$/.exec(hhmm.trim());
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (h > 24 || min > 59) return null;
  const total = h * 60 + min;
  if (total > MINUTES_PER_DAY) return null;
  return total;
}

/**
 * minutes -> "HH:MM", zero-padded, always ASCII digits. 1440 renders as "24:00",
 * which no <input type="time"> accepts, so callers binding an end-of-day value to
 * an input should pass it through minutesToInputValue instead.
 */
export function minutesToHHMM(min) {
  const v = clampMinute(min);
  const h = Math.floor(v / 60);
  const m = v % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/**
 * Same as minutesToHHMM but folds 24:00 down to 23:59 so the value is one a
 * native time input will actually display. Use this for value={...}, and
 * minutesToHHMM for anything the visitor only reads.
 */
export function minutesToInputValue(min) {
  const v = clampMinute(min);
  return minutesToHHMM(v === MINUTES_PER_DAY ? MINUTES_PER_DAY - 1 : v);
}

/** Minutes between two boundaries, never negative. */
export function durationMinutes(startMin, endMin) {
  return Math.max(0, clampMinute(endMin) - clampMinute(startMin));
}

/**
 * Half-open overlap: [a.start, a.end) ∩ [b.start, b.end) ≠ ∅.
 *
 * This is the single most consequential line in the domain layer. Because both
 * intervals are half-open, 09:00-12:00 and 12:00-15:00 are ADJACENT, not
 * overlapping — no special-casing, no off-by-one. Zero-length intervals never
 * overlap anything, which is also correct: they occupy no time.
 */
export function overlaps(a, b) {
  if (!a || !b) return false;
  return a.startMin < b.endMin && b.startMin < a.endMin;
}

/**
 * Is `min` inside the active-hours window?
 *
 * Two cases:
 *   start < end  — a normal day, half-open [start, end).
 *   end < start  — an overnight window, e.g. 22:00-02:00, which is the union
 *                  [start, 1440) ∪ [0, end). v1's UI blocks authoring these, but
 *                  the domain supports them so overnight venues need no rework.
 *   start === end — treated as a closed screen (empty window), not a 24h one. An
 *                  "always on" screen is expressed as 00:00-24:00.
 */
export function withinActiveHours(min, activeHours) {
  if (!activeHours) return false;
  const { start, end } = activeHours;
  if (!Number.isFinite(start) || !Number.isFinite(end)) return false;
  if (start === end) return false;
  const now = wrapMinute(min);
  if (start < end) return now >= start && now < end;
  return now >= start || now < end; // wraps past midnight
}

/** Position of a minute on the 24-hour rail, as a percentage 0-100. */
export const pct = (min) => (clampMinute(min) / MINUTES_PER_DAY) * 100;

/**
 * Percentage geometry for a slot on the timeline rail. 09:00-12:00 (540-720)
 * gives left: "37.5%", width: "12.5%" — exactly 3/24 of the day, verifiable by
 * inspection. Percentages so the rail reflows on rotate with no JS.
 */
export function slotGeometry(slot) {
  const left = pct(slot?.startMin ?? 0);
  const right = pct(slot?.endMin ?? 0);
  return { left: `${left}%`, width: `${Math.max(0, right - left)}%` };
}
