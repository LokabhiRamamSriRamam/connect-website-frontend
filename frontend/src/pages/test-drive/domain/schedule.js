/**
 * Schedule domain: normalisation, validation and lookup over a screen's slots.
 *
 * `state.draft.byScreen[id].slots` is the only slot array in the feature. Both the
 * list view and the timeline view render the SAME normalizeSlots() output and edit
 * through the SAME SLOT_UPDATE dispatch — neither keeps a useState copy. That is
 * what makes "both views reflect the same edit instantly" true by construction
 * rather than by synchronisation.
 *
 * Every function here is pure and treats its arguments as frozen. normalizeSlots
 * copies before sorting, because Array.prototype.sort mutates in place and the
 * input is reducer state.
 *
 * Plain .js, no React — unit-tested in node.
 */
import {
  MIN_ACTIVE_MINUTES,
  MIN_SLOT_MINUTES,
  MINUTES_PER_DAY,
  clampMinute,
  durationMinutes,
  isValidMinute,
  overlaps,
  withinActiveHours,
} from "./time.js";

import { MAX_SLOTS_PER_SCREEN } from "../state/initialState.js";

export { MAX_SLOTS_PER_SCREEN };

/** A slot is usable for playback only if it is enabled and has real bounds. */
export function isPlayableSlot(slot) {
  return Boolean(
    slot &&
      slot.enabled !== false &&
      isValidMinute(slot.startMin) &&
      isValidMinute(slot.endMin) &&
      slot.endMin > slot.startMin
  );
}

/**
 * The one output both schedule views consume.
 *
 * Returns a new array, sorted by start then end, each slot shallow-copied and
 * decorated with derived display facts so neither view recomputes them:
 *   durationMin   — endMin - startMin
 *   geometry      — not here; the timeline calls slotGeometry itself, keeping this
 *                   module free of presentation units
 *   outsideHours  — true when the slot does not intersect active hours at all, so
 *                   it can never play. A WARNING in the UI, never an error.
 *   partialHours  — true when it only partly intersects: it plays, but clipped.
 *   missingCreative — its instance is gone (CREATIVE_REMOVE should have pruned it;
 *                   this is the defensive case so the UI shows a repairable row
 *                   instead of a ghost).
 *   conflictsWith — ids of other slots it overlaps. Should be empty, since overlap
 *                   is blocked at validation; non-empty means hydrated or
 *                   hand-edited data, and the view can flag it.
 */
export function normalizeSlots(slots, options = {}) {
  const { activeHours = null, creativeInstances = null } = options;
  const list = (Array.isArray(slots) ? slots : []).filter(Boolean);

  const sorted = list
    .map((s) => ({ ...s }))
    .sort((a, b) => a.startMin - b.startMin || a.endMin - b.endMin);

  return sorted.map((slot) => {
    const conflictsWith = sorted
      .filter((other) => other.id !== slot.id && overlaps(slot, other))
      .map((other) => other.id);

    const intersects = activeHours
      ? intersectsActiveHours(slot, activeHours)
      : { any: true, whole: true };

    return {
      ...slot,
      durationMin: durationMinutes(slot.startMin, slot.endMin),
      outsideHours: !intersects.any,
      partialHours: intersects.any && !intersects.whole,
      missingCreative: creativeInstances
        ? !slot.instanceId ||
          !Object.prototype.hasOwnProperty.call(creativeInstances, slot.instanceId)
        : false,
      conflictsWith,
    };
  });
}

/**
 * Does [startMin, endMin) intersect the active-hours window, and wholly?
 *
 * Sampled on minute boundaries rather than by interval algebra, because an
 * overnight window is a union of two intervals and the start/whole/partial answer
 * is all three cases at once. A day is 1440 minutes, so the worst case is 1440
 * cheap integer tests, and this runs on edit, not per frame.
 */
export function intersectsActiveHours(slot, activeHours) {
  if (!isPlayableSlot(slot)) return { any: false, whole: false };
  let any = false;
  let whole = true;
  for (let m = slot.startMin; m < slot.endMin; m += 1) {
    if (withinActiveHours(m, activeHours)) any = true;
    else whole = false;
    if (any && !whole) break;
  }
  return { any, whole };
}

/**
 * The slot playing at `nowMin`, or null.
 *
 * Half-open containment, so a slot ending at 12:00 has stopped by 12:00 and one
 * starting at 12:00 has started — exactly one of them owns the minute. If data is
 * malformed enough to have two candidates, the earliest-starting one wins, so the
 * answer is at least deterministic.
 */
export function slotAt(slots, nowMin) {
  const now = clampMinute(nowMin);
  const candidates = (Array.isArray(slots) ? slots : []).filter(
    (s) => isPlayableSlot(s) && s.startMin <= now && now < s.endMin
  );
  if (candidates.length === 0) return null;
  return candidates.reduce((best, s) => (s.startMin < best.startMin ? s : best));
}

/** Total scheduled minutes on a screen, ignoring overlap. */
export function scheduledMinutes(slots) {
  return (Array.isArray(slots) ? slots : [])
    .filter(isPlayableSlot)
    .reduce((sum, s) => sum + durationMinutes(s.startMin, s.endMin), 0);
}

/**
 * Uncovered stretches inside active hours — what the timeline shades as "nothing
 * scheduled". Only the normal (start < end) window is walked; for an overnight
 * window the two halves are returned separately.
 */
export function findGaps(slots, activeHours) {
  if (!activeHours) return [];
  const { start, end } = activeHours;
  const windows =
    start < end
      ? [{ from: start, to: end }]
      : start === end
        ? []
        : [
            { from: start, to: MINUTES_PER_DAY },
            { from: 0, to: end },
          ];

  const playable = (Array.isArray(slots) ? slots : [])
    .filter(isPlayableSlot)
    .map((s) => ({ startMin: s.startMin, endMin: s.endMin }))
    .sort((a, b) => a.startMin - b.startMin);

  const gaps = [];
  for (const w of windows) {
    let cursor = w.from;
    for (const s of playable) {
      if (s.endMin <= cursor || s.startMin >= w.to) continue;
      if (s.startMin > cursor) gaps.push({ startMin: cursor, endMin: Math.min(s.startMin, w.to) });
      cursor = Math.max(cursor, s.endMin);
      if (cursor >= w.to) break;
    }
    if (cursor < w.to) gaps.push({ startMin: cursor, endMin: w.to });
  }
  return gaps;
}

/**
 * Validate one slot edit against the rest of the screen.
 *
 * Returns { ok, errors, warnings } where every entry is
 *   { key: "<i18n key>", vars: {...} }
 * — an i18n KEY and its interpolation values, never a sentence. The view calls
 * t(key, vars). This is what keeps the domain layer language-free.
 *
 * Errors block the edit: end after start, a 5-minute minimum, a creative chosen,
 * the per-screen cap, and overlap — which NAMES the clashing slot, because
 * "two creatives at once" has no honest simulated answer and the brief forbids
 * inventing one.
 *
 * Warnings do not block: a slot outside active hours is legal, it simply never
 * plays, and saying so is more useful than refusing it.
 *
 * `candidate` carries the slot's own id when editing an existing slot, so it is
 * excluded from its own overlap test. Omit the id when adding.
 */
export function validateSlot(candidate, context = {}) {
  const {
    slots = [],
    activeHours = null,
    creativeInstances = null,
    maxSlots = MAX_SLOTS_PER_SCREEN,
    labelFor = null,
  } = context;

  const errors = [];
  const warnings = [];
  const start = candidate?.startMin;
  const end = candidate?.endMin;
  const isNew = !candidate?.id;

  if (!isValidMinute(start)) errors.push({ key: "schedule.err.startRequired" });
  if (!isValidMinute(end)) errors.push({ key: "schedule.err.endRequired" });

  if (isValidMinute(start) && isValidMinute(end)) {
    if (end <= start) {
      errors.push({ key: "schedule.err.endAfterStart" });
    } else if (end - start < MIN_SLOT_MINUTES) {
      errors.push({ key: "schedule.err.minFive", vars: { min: MIN_SLOT_MINUTES } });
    }
  }

  if (!candidate?.instanceId) {
    errors.push({ key: "schedule.err.pickCreative" });
  } else if (
    creativeInstances &&
    !Object.prototype.hasOwnProperty.call(creativeInstances, candidate.instanceId)
  ) {
    errors.push({ key: "schedule.err.pickCreative" });
  }

  const others = (Array.isArray(slots) ? slots : []).filter(
    (s) => s && s.id !== candidate?.id
  );

  if (isNew && others.length >= maxSlots) {
    errors.push({ key: "schedule.err.tooMany", vars: { max: maxSlots } });
  }

  // Overlap is blocking, and the message names the slot it clashes with — the
  // visitor needs to know WHICH creative is in the way to fix it in one move.
  if (isValidMinute(start) && isValidMinute(end) && end > start) {
    const clash = others.find((s) => isPlayableSlot(s) && overlaps({ startMin: start, endMin: end }, s));
    if (clash) {
      errors.push({
        key: "schedule.err.overlap",
        vars: {
          creative: labelFor ? labelFor(clash) : "",
          range: formatRangeParts(clash),
        },
        slotId: clash.id,
      });
    }
  }

  if (
    activeHours &&
    isValidMinute(start) &&
    isValidMinute(end) &&
    end > start &&
    !intersectsActiveHours({ startMin: start, endMin: end, enabled: true }, activeHours).any
  ) {
    warnings.push({ key: "schedule.warn.outsideHours" });
  }

  return { ok: errors.length === 0, errors, warnings };
}

/**
 * The range of a slot as a {start, end} pair of minute integers, for a view to
 * format with minutesToHHMM. Deliberately NOT a formatted string: formatting is a
 * presentation concern and belongs above the domain layer.
 */
export function formatRangeParts(slot) {
  return { startMin: slot?.startMin ?? 0, endMin: slot?.endMin ?? 0 };
}

/**
 * Validate an active-hours change. Overnight windows are rejected here because
 * v1's UI blocks authoring them (the domain in time.js still resolves them, so
 * stored or future overnight data plays correctly).
 */
export function validateActiveHours(activeHours) {
  const errors = [];
  const start = activeHours?.start;
  const end = activeHours?.end;

  if (!isValidMinute(start) || !isValidMinute(end)) {
    errors.push({ key: "hours.err.endAfterStart" });
    return { ok: false, errors, warnings: [] };
  }
  if (end <= start) {
    errors.push({ key: "hours.err.endAfterStart" });
  } else if (end - start < MIN_ACTIVE_MINUTES) {
    errors.push({ key: "hours.err.tooShort", vars: { min: MIN_ACTIVE_MINUTES } });
  }
  return { ok: errors.length === 0, errors, warnings: [] };
}

/**
 * Slots that would stop playing under a proposed active-hours change — what the
 * ActiveHoursEditor warns about before committing, so narrowing the window never
 * silently kills a schedule.
 */
export function slotsOutsideHours(slots, activeHours) {
  return (Array.isArray(slots) ? slots : [])
    .filter(isPlayableSlot)
    .filter((s) => !intersectsActiveHours(s, activeHours).any);
}
