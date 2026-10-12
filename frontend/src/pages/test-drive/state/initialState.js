/**
 * The test drive's state shape — and, since there is no TypeScript here, its only
 * written spec. Every key the reducer will ever touch is declared below, including
 * the ones later phases fill in, so the shape is reviewable in one place instead of
 * being discovered action by action.
 *
 * Plain .js with no JSX or React import: the reducer must stay unit-testable in
 * node, and scripts/check-test-drive.mjs imports from this tree.
 *
 * Three rules this file exists to protect:
 *   1. No translated strings in state. Copy resolves at render via t(), which is
 *      what lets a language switch be a pure re-render. Reasons are i18n KEYS.
 *   2. No non-serialisable values. No HTMLAudioElement, no DOM node, no Date — the
 *      audio element lives in a module singleton and time is an integer.
 *   3. Time is minutes since midnight (0-1440), never "HH:MM". Strings appear only
 *      at the <input type="time"> boundary. Integers carry no locale, which matters
 *      when Hindi numerals must never reach stored data.
 */

export const SCREEN_COUNT = 5;
export const MAX_SLOTS_PER_SCREEN = 8;

/**
 * What goes in the Lead document for each industry slug — the English label, not
 * the translated one: a Hindi visitor would otherwise send Devanagari into a
 * field the sales team reads in English, and the same business would bucket under
 * two different industry strings.
 *
 * Here rather than in IntakeForm because the quiet lead retry on first Save
 * (plan §10) builds the same payload, and a second copy of this map could drift.
 */
export const INDUSTRY_LEAD_LABEL = {
  restaurant: "Restaurant",
  cafe: "Café / Coffee Shop",
};

/** Default active hours: 09:00-21:00, as minutes since midnight. */
export const DEFAULT_ACTIVE_HOURS = { start: 540, end: 1260 };

/**
 * The five virtual screens.
 *
 * `label` is a NON-TRANSLATED fallback, not what the UI shows. Display names are
 * derived from the id at render by i18n's screenLabel(), per plan §2's rule that
 * no translated string is ever stored: this object is persisted to localStorage,
 * so a label written here would be frozen in whichever language created it and
 * would not follow a language switch. It is kept only for a screen whose id is
 * not the generated `s<n>` form, which is what a rename feature would produce.
 *
 * s1 is primary and the others start as independent primaries too — the tutorial
 * teaches mirroring by having the visitor create it, so nothing is pre-linked.
 */
export function makeScreens() {
  return Array.from({ length: SCREEN_COUNT }, (_, i) => ({
    id: `s${i + 1}`,
    label: `Screen ${i + 1}`,
    role: "primary", // "primary" | "secondary"
    mirrors: null, // screen id when role === "secondary", else null
    online: true, // simulated connectivity
  }));
}

/** A screen's own config: when it plays, and what. */
export function makeScreenConfig() {
  return {
    activeHours: { ...DEFAULT_ACTIVE_HOURS },
    slots: [], // Slot[] — { id, startMin, endMin, instanceId, enabled }
  };
}

export function makeByScreen() {
  return Object.fromEntries(makeScreens().map((s) => [s.id, makeScreenConfig()]));
}

export const initialState = {
  /** Bumped when the persisted shape changes; a mismatch drops stored progress. */
  version: 2,

  /** "intake" | "console". Stages are state, not routes — a route would remount. */
  step: "intake",

  /** Epoch ms of the last successful save, or null. A number, not a Date. */
  savedAt: null,

  /** What the visitor told us at intake. industry is a slug: "restaurant" | "cafe". */
  business: {
    businessName: "",
    industry: "",
    phone: "",
    email: "",
    name: "",
  },

  /** The POST /api/leads attempt. "error" never blocks the demo. */
  lead: {
    status: "idle", // "idle" | "sending" | "sent" | "error"
    id: null,
    error: null, // an i18n key or a server message, never a thrown object
  },

  screens: makeScreens(),
  selectedScreenId: "s1",

  /**
   * Configured creatives, keyed by instance id. A template is the component plus
   * its manifest entry; an instance holds this visitor's field overrides. Editing
   * text on one screen edits an instance, so a template never mutates globally.
   */
  creativeInstances: {}, // { [id]: { id, templateId, fields: {...}, createdAt } }

  /** Editable truth. Every Control Panel interaction writes here. */
  draft: { byScreen: makeByScreen() },

  /**
   * Committed truth. Only SAVE_SUCCESS writes it, as a deep clone of draft plus a
   * snapshot of screens. Previews resolve against saved.screens — passing
   * state.screens instead leaks role and mirror edits into previews before save.
   */
  saved: { byScreen: makeByScreen(), screens: makeScreens() },

  /**
   * "applied" is a ~2.5s transient after SAVE_SUCCESS, then settles to "saved".
   * dirtyScreens is maintained per-action, not by deep comparison on render.
   */
  save: {
    status: "clean", // "clean" | "dirty" | "saving" | "saved" | "applied" | "error"
    error: null,
    dirtyScreens: [],
  },

  /** The preview clock. nowMin defaults to 13:00, a plausible lunch rush. */
  sim: { nowMin: 780, playing: false, speed: 60 },

  /**
   * Simulated, and labelled as such everywhere it surfaces.
   *
   * Only a tick counter is stored, never the figures themselves: domain/health.js
   * derives status, lastSeenMin and uptimePct from (screenId, tick) with a seeded
   * hash. That keeps HEALTH_TICK a pure reducer case and means a refresh at the
   * same tick shows the same numbers instead of reshuffling the whole fleet.
   */
  health: { tick: 0 },

  tutorial: {
    missionIndex: 0,
    completed: [],
    mode: "guided", // "guided" | "explore"
    introSeen: false,
    helpOpenFor: null,
  },

  /** Never persisted and never restored — transient view state only. */
  ui: {
    panel: null, // null | "creative" | "schedule" | "hours" | "mirror" | "health"
    wallView: "grid", // "grid" | "list" — how the five screens are laid out
    scheduleView: "list", // "list" | "timeline"
    editingSlotId: null,
    toast: null,
  },
};
