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
