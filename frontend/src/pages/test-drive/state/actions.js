/**
 * Action types for the test-drive reducer.
 *
 * The full vocabulary is declared here so the reducer's `default:` warning can tell
 * "typo" apart from "not built yet", and so the shape of the feature is readable
 * without opening every component. Only the intake group has creators so far —
 * later phases add theirs alongside their reducer cases.
 *
 * Plain .js, no React: the reducer is exercised directly in node.
 */

export const A = {
  // ---- intake (phase 2) ----
  BUSINESS_FIELD: "BUSINESS_FIELD",
  BUSINESS_SUBMIT_START: "BUSINESS_SUBMIT_START",
  BUSINESS_SUBMIT_OK: "BUSINESS_SUBMIT_OK",
  BUSINESS_SUBMIT_FAIL: "BUSINESS_SUBMIT_FAIL",
  ENTER_CONSOLE: "ENTER_CONSOLE",

  // ---- screens (phase 4, 8) ----
  SELECT_SCREEN: "SELECT_SCREEN",
  SET_SCREEN_ROLE: "SET_SCREEN_ROLE",
  SET_MIRROR: "SET_MIRROR",
  CLEAR_MIRROR: "CLEAR_MIRROR",
  // Simulated connectivity. Without a way to take a screen dark, the offline and
  // primaryOffline playback states are unreachable in the UI.
  TOGGLE_SCREEN_ONLINE: "TOGGLE_SCREEN_ONLINE",

  // ---- creatives (phase 5) ----
  CREATIVE_ADD: "CREATIVE_ADD",
  CREATIVE_FIELD: "CREATIVE_FIELD",
  CREATIVE_DUPLICATE: "CREATIVE_DUPLICATE",
  // Must also prune slots referencing the instance, in the reducer and not the
  // view, or the schedule shows ghost slots pointing at nothing.
  CREATIVE_REMOVE: "CREATIVE_REMOVE",

  // ---- schedule (phase 6, 7) ----
  SLOT_ADD: "SLOT_ADD",
  SLOT_UPDATE: "SLOT_UPDATE",
  SLOT_REMOVE: "SLOT_REMOVE",
  SLOTS_CLEAR: "SLOTS_CLEAR",
  ACTIVE_HOURS_SET: "ACTIVE_HOURS_SET",

  // ---- save (phase 6) ----
  SAVE_START: "SAVE_START",
  SAVE_SUCCESS: "SAVE_SUCCESS",
  SAVE_APPLIED_SETTLE: "SAVE_APPLIED_SETTLE",
  SAVE_FAIL: "SAVE_FAIL",
  DISCARD_DRAFT: "DISCARD_DRAFT",

  // ---- simulation (phase 7) ----
  SIM_SET_TIME: "SIM_SET_TIME",
  SIM_PLAY: "SIM_PLAY",
  SIM_PAUSE: "SIM_PAUSE",
  SIM_TICK: "SIM_TICK",
  SIM_SET_SPEED: "SIM_SET_SPEED",
  HEALTH_TICK: "HEALTH_TICK",
  HEALTH_INSPECT: "HEALTH_INSPECT",

  // ---- tutorial (phase 10) ----
  TUT_ADVANCE: "TUT_ADVANCE",
  TUT_COMPLETE: "TUT_COMPLETE",
  TUT_SKIP_ALL: "TUT_SKIP_ALL",
  TUT_SKIP_INTRO: "TUT_SKIP_INTRO",
  TUT_REPLAY: "TUT_REPLAY",
  TUT_SET_MODE: "TUT_SET_MODE",
  TUT_OPEN_HELP: "TUT_OPEN_HELP",

  // ---- ui (phase 4+) ----
  UI_OPEN_PANEL: "UI_OPEN_PANEL",
  UI_CLOSE_PANEL: "UI_CLOSE_PANEL",
  UI_SET_SCHEDULE_VIEW: "UI_SET_SCHEDULE_VIEW",
  UI_SET_WALL_VIEW: "UI_SET_WALL_VIEW",
  UI_EDIT_SLOT: "UI_EDIT_SLOT",
  UI_TOAST: "UI_TOAST",

  // ---- session (phase 11) ----
  HYDRATE: "HYDRATE",
  RESTART: "RESTART",
};

// ---- creators: intake ----

/** One intake field changed. `field` is a key of state.business. */
export const businessField = (field, value) => ({
  type: A.BUSINESS_FIELD,
  field,
  value,
});

/** Submit pressed and validation passed; the lead POST is in flight. */
export const businessSubmitStart = () => ({ type: A.BUSINESS_SUBMIT_START });

/** The lead saved. `id` is the Mongo _id when the server returns one. */
export const businessSubmitOk = (id = null) => ({ type: A.BUSINESS_SUBMIT_OK, id });

/**
 * The lead POST failed. Per owner decision this does NOT block the demo: the
 * caller dispatches ENTER_CONSOLE anyway and the failure surfaces quietly.
 */
export const businessSubmitFail = (error = null) => ({
  type: A.BUSINESS_SUBMIT_FAIL,
  error,
});

/** Leave intake for the console. Independent of lead status, deliberately. */
export const enterConsole = () => ({ type: A.ENTER_CONSOLE });

// ---- creators: screens and simulation (phase 4) ----

/** Focus a screen. Selection is navigation, not an edit — it never marks dirty. */
export const selectScreen = (screenId) => ({ type: A.SELECT_SCREEN, screenId });

/** Scrub the preview clock. `nowMin` is minutes since midnight. */
export const simSetTime = (nowMin) => ({ type: A.SIM_SET_TIME, nowMin });

export const simPlay = () => ({ type: A.SIM_PLAY });
export const simPause = () => ({ type: A.SIM_PAUSE });

/** One clock step. The interval lives in a component effect, not in state. */
export const simTick = () => ({ type: A.SIM_TICK });

/** Simulated minutes advanced per real second. */
export const simSetSpeed = (speed) => ({ type: A.SIM_SET_SPEED, speed });

/**
 * Re-roll simulated health. Carries no figures: the reducer bumps a counter and
 * domain/health.js derives everything from (screenId, tick), so the same tick
 * always yields the same numbers and a rehydrate does not reshuffle them.
 */
export const healthTick = () => ({ type: A.HEALTH_TICK });
/** The visitor opened one screen's readings from the fleet list. */
export const healthInspect = (screenId) => ({ type: A.HEALTH_INSPECT, screenId });

/** Flip a screen's simulated connectivity — what makes the offline state reachable. */
export const toggleScreenOnline = (screenId) => ({
  type: A.TOGGLE_SCREEN_ONLINE,
  screenId,
});

// ---- creators: role and mirroring (phase 8) ----

/**
 * Promote to primary or demote to secondary.
 *
 * `slotIds` is a list of fresh slot ids, generated at the call site, used when
 * promoting: the new primary inherits a COPY of what it was mirroring, and two
 * screens must not share a slot id or SLOT_UPDATE on one would be ambiguous. The
 * reducer cannot mint them and stay pure, so the caller supplies as many as the
 * source has slots.
 */
export const setScreenRole = (screenId, role, options = {}) => ({
  type: A.SET_SCREEN_ROLE,
  screenId,
  role,
  mirrors: options.mirrors ?? null,
  slotIds: options.slotIds ?? null,
});

/** Point a screen at a primary. Rejected, with a toast, if it would make a loop. */
export const setMirror = (screenId, targetId) => ({
  type: A.SET_MIRROR,
  screenId,
  targetId,
});

/** Unlink a secondary — promotion by another name, and the same code path. */
export const clearMirror = (screenId, slotIds = null) => ({
  type: A.CLEAR_MIRROR,
  screenId,
  slotIds,
});

// ---- creators: creatives (phase 5) ----

/**
 * Configure a template for this visitor. `id` is generated by the caller so the
 * reducer stays pure — a reducer that calls Date.now() or Math.random() is not
 * replayable and cannot be tested by equality.
 */
export const creativeAdd = (id, templateId, fields, createdAt) => ({
  type: A.CREATIVE_ADD,
  id,
  templateId,
  fields,
  createdAt,
});

/** Edit one field of one instance. This is what makes templates non-global. */
export const creativeField = (id, field, value) => ({
  type: A.CREATIVE_FIELD,
  id,
  field,
  value,
});

/** Copy an instance, so one screen can diverge from another. */
export const creativeDuplicate = (id, newId, createdAt) => ({
  type: A.CREATIVE_DUPLICATE,
  id,
  newId,
  createdAt,
});

/** Delete an instance. The reducer also prunes slots referencing it. */
export const creativeRemove = (id) => ({ type: A.CREATIVE_REMOVE, id });

// ---- creators: tutorial (phase 10) ----

/**
 * Mark a mission complete. Dispatched by TutorialProvider when the mission's
 * own predicate turns true — never by a component asserting it did the thing,
 * so "complete" always means the state says so.
 */
export const tutComplete = (missionId) => ({ type: A.TUT_COMPLETE, missionId });

/** Move to the next mission. `total` caps it at the last one. */
export const tutAdvance = (total) => ({ type: A.TUT_ADVANCE, total });

/** Leave the guided tutorial for free exploration. Always offered. */
export const tutSkipAll = () => ({ type: A.TUT_SKIP_ALL });

/** Dismiss the intro reveal. */
export const tutSkipIntro = () => ({ type: A.TUT_SKIP_INTRO });

/** Start the tutorial again from mission one, keeping what was done. */
export const tutReplay = () => ({ type: A.TUT_REPLAY });

export const tutSetMode = (mode) => ({ type: A.TUT_SET_MODE, mode });

/** Open contextual help for a mission, or null to close it. */
export const tutOpenHelp = (missionId) => ({ type: A.TUT_OPEN_HELP, missionId });

// ---- creators: session (phase 11) ----

/**
 * Restore a previous visit. `patch` is whatever persistence.load() returned —
 * the reducer hands it straight to the validating merge rather than trusting it.
 */
export const hydrateState = (patch) => ({ type: A.HYDRATE, patch });

/**
 * Start over. The reducer returns initialState; clearing the two storage keys
 * and stopping the narration are side effects and stay with the caller.
 */
export const restart = () => ({ type: A.RESTART });

// ---- creators: ui (phase 4) ----

export const uiSetScheduleView = (view) => ({ type: A.UI_SET_SCHEDULE_VIEW, view });

/** "list" | "grid" — how the screen wall itself is laid out. */
export const uiSetWallView = (view) => ({ type: A.UI_SET_WALL_VIEW, view });

// ---- creators: schedule (phase 6) ----

/**
 * Add a slot to one screen. `id` comes from newSlotId() at the call site for the
 * same purity reason as creative ids.
 *
 * The reducer re-validates with the domain layer and REJECTS an invalid add
 * rather than storing it — the view validates first to show the message, but a
 * dispatch that skipped that step must not be able to write an overlap.
 */
export const slotAdd = (screenId, slot) => ({ type: A.SLOT_ADD, screenId, slot });

/** Patch one slot. `patch` carries only the changed keys. */
export const slotUpdate = (screenId, slotId, patch) => ({
  type: A.SLOT_UPDATE,
  screenId,
  slotId,
  patch,
});

export const slotRemove = (screenId, slotId) => ({ type: A.SLOT_REMOVE, screenId, slotId });

/** Empty a screen's schedule. */
export const slotsClear = (screenId) => ({ type: A.SLOTS_CLEAR, screenId });

/** Set a screen's active-hours window. Minutes since midnight, both ends. */
export const activeHoursSet = (screenId, activeHours) => ({
  type: A.ACTIVE_HOURS_SET,
  screenId,
  activeHours,
});

// ---- creators: save (phase 6) ----

/** The save POST (simulated) is in flight. */
export const saveStart = () => ({ type: A.SAVE_START });

/**
 * The save landed. THE ONLY action that writes `saved`, which is what makes
 * "Saved" impossible to show before success. `at` is epoch ms from the caller.
 */
export const saveSuccess = (at) => ({ type: A.SAVE_SUCCESS, at });

/** The ~2.5s "Applied to virtual screens" transient has elapsed. */
export const saveAppliedSettle = () => ({ type: A.SAVE_APPLIED_SETTLE });

export const saveFail = (error = null) => ({ type: A.SAVE_FAIL, error });

/** Throw away draft edits by restoring it from `saved`. */
export const discardDraft = () => ({ type: A.DISCARD_DRAFT });

// ---- creators: ui (phase 6) ----

/** Which slot the editor sheet is open on, or null to close it. */
export const uiEditSlot = (slotId) => ({ type: A.UI_EDIT_SLOT, slotId });

/**
 * A transient message. Carries an i18n KEY and vars, never a sentence, so the
 * toast re-renders in the new language if the visitor switches mid-toast.
 */
export const uiToast = (key, vars = null, tone = "info") => ({
  type: A.UI_TOAST,
  key,
  vars,
  tone,
});
