/**
 * Node test run for the test drive's pure layers: all of domain/ (phase 3) and
 * the reducer cases that drive the screen wall (phase 4). Plan §13.
 *
 * Everything here is plain .js with no React, so correctness is settled in node
 * rather than by clicking. Run with:  npm run test:td
 *
 * No test framework: the repo has none, and adding one would be a bigger decision
 * than these phases. Assertions are plain, failures are named and the process
 * exits non-zero, which is all CI would need.
 */
import assert from "node:assert/strict";

import {
  MINUTES_PER_DAY,
  clampMinute,
  durationMinutes,
  hhmmToMinutes,
  isValidMinute,
  minutesToHHMM,
  minutesToInputValue,
  overlaps,
  pct,
  slotGeometry,
  withinActiveHours,
  wrapMinute,
} from "../src/pages/test-drive/domain/time.js";

import {
  findGaps,
  intersectsActiveHours,
  isPlayableSlot,
  normalizeSlots,
  scheduledMinutes,
  slotAt,
  slotsOutsideHours,
  validateActiveHours,
  validateSlot,
} from "../src/pages/test-drive/domain/schedule.js";

import {
  MAX_MIRROR_DEPTH,
  allFollowersOf,
  canMirror,
  followersOf,
  mirrorCandidates,
  resolveChain,
} from "../src/pages/test-drive/domain/mirroring.js";

import {
  resolveAllScreens,
  resolveScreen,
} from "../src/pages/test-drive/domain/playback.js";

import {
  advanceClock,
  allScreenHealth,
  healthSummary,
  minutesUntilOpen,
  screenHealth,
  seededUnit,
} from "../src/pages/test-drive/domain/health.js";

import {
  allCreatives,
  creativesFor,
  getTemplate,
  mediaTypesFor,
} from "../src/pages/test-drive/creatives/registry.js";
import { clamp, wrapLines } from "../src/pages/test-drive/creatives/text.js";

import { initialState, reducer } from "../src/pages/test-drive/state/reducer.js";
import {
  creativeAdd,
  creativeDuplicate,
  creativeField,
  creativeRemove,
  healthTick,
  selectScreen,
  simPause,
  simPlay,
  simSetSpeed,
  simSetTime,
  simTick,
  toggleScreenOnline,
  uiSetScheduleView,
  uiSetWallView,
  activeHoursSet,
  discardDraft,
  saveAppliedSettle,
  saveFail,
  saveStart,
  saveSuccess,
  slotAdd,
  slotRemove,
  slotUpdate,
  slotsClear,
  uiEditSlot,
  uiToast,
  clearMirror,
  setMirror,
  setScreenRole,
  businessField,
  businessSubmitOk,
  enterConsole,
  tutAdvance,
  tutComplete,
  tutOpenHelp,
  tutReplay,
  tutSetMode,
  tutSkipAll,
  tutSkipIntro,
  hydrateState,
  restart,
} from "../src/pages/test-drive/state/actions.js";

import {
  hydrate,
  selectProgress,
  selectSession,
} from "../src/pages/test-drive/state/persistence.js";

import * as engine from "../src/pages/test-drive/audio/engine.js";
import { CUES, CUE_IDS, cuePath } from "../src/pages/test-drive/audio/manifest.js";
import { MISSIONS } from "../src/pages/test-drive/tutorial/missions.js";

import { en } from "../src/pages/test-drive/i18n/en.js";
import { hi } from "../src/pages/test-drive/i18n/hi.js";
import { flattenKeys } from "../src/pages/test-drive/i18n/index.js";

let passed = 0;
const failures = [];

/**
 * Run one test. Awaits the body, so an async test (the audio engine's, which
 * drive promise-returning play()) is actually waited for rather than counted as
 * passing the moment it returns a pending promise.
 */
const pending = [];

async function test(name, fn) {
  try {
    await fn();
    passed += 1;
  } catch (err) {
    failures.push({ name, err });
  }
}

/**
 * Tests are declared top to bottom and most are synchronous, but the audio
 * engine's drive a promise-returning play(). Registering every call here and
 * awaiting the lot before the report is what keeps an async failure from being
 * reported after the process has already printed its total.
 */
function register(name, fn) {
  pending.push(test(name, fn));
}

/**
 * Register a test that must not run concurrently with its neighbours.
 *
 * The audio engine is a module SINGLETON — one element, one status, one failure
 * set — so two of its tests running interleaved fight over the same state and
 * fail in ways that have nothing to do with the code. (They did exactly that
 * when first written: a stop() from one test cleared another's cue mid-assert.)
 * These are chained one after the next instead.
 */
let serial = Promise.resolve();
function registerSerial(name, fn) {
  serial = serial.then(() => test(name, fn));
  pending.push(serial);
}

/** Assert an i18n key actually exists in BOTH dictionaries. */
function assertKey(key) {
  for (const [lang, dict] of [
    ["en", en],
    ["hi", hi],
  ]) {
    let node = dict;
    for (const part of key.split(".")) node = node?.[part];
    assert.equal(typeof node, "string", `missing ${lang} key: ${key}`);
  }
}

/** Recursively freeze, so any mutation of an argument throws in strict mode. */
function deepFreeze(value) {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const v of Object.values(value)) deepFreeze(v);
  }
  return value;
}

// ---------------------------------------------------------------- time.js ----

register("minute validity and clamping", () => {
  assert.equal(isValidMinute(0), true);
  assert.equal(isValidMinute(1440), true);
  assert.equal(isValidMinute(1441), false);
  assert.equal(isValidMinute(-1), false);
  assert.equal(isValidMinute(12.5), false);
  assert.equal(isValidMinute("540"), false);
  assert.equal(clampMinute(-50), 0);
  assert.equal(clampMinute(5000), 1440);
  assert.equal(clampMinute(539.6), 540);
  assert.equal(clampMinute(NaN), 0);
});

register("wrapMinute folds past midnight, 1440 -> 0", () => {
  assert.equal(wrapMinute(0), 0);
  assert.equal(wrapMinute(1440), 0);
  assert.equal(wrapMinute(1500), 60);
  assert.equal(wrapMinute(-30), 1410);
  assert.equal(wrapMinute(-1440), 0);
});

register("HH:MM round-trips, including the 0 and 1440 edges", () => {
  assert.equal(hhmmToMinutes("00:00"), 0);
  assert.equal(minutesToHHMM(0), "00:00");
  assert.equal(hhmmToMinutes("24:00"), 1440);
  assert.equal(minutesToHHMM(1440), "24:00");
  assert.equal(hhmmToMinutes("09:00"), 540);
  assert.equal(minutesToHHMM(540), "09:00");
  assert.equal(hhmmToMinutes("23:59"), 1439);
  assert.equal(minutesToHHMM(1439), "23:59");
  assert.equal(hhmmToMinutes("9:05"), 545, "short hour form");

  // Full round-trip across every minute of the day.
  for (let m = 0; m <= MINUTES_PER_DAY; m += 1) {
    assert.equal(hhmmToMinutes(minutesToHHMM(m)), m, `round-trip failed at ${m}`);
  }
});

register("HH:MM rejects junk rather than coercing it to midnight", () => {
  for (const bad of ["", "abc", "9", "09:60", "25:00", "09:5", null, undefined, 540, "09:00:00"]) {
    assert.equal(hhmmToMinutes(bad), null, `should reject ${JSON.stringify(bad)}`);
  }
});

register("minutesToInputValue folds 24:00 to a value an input accepts", () => {
  assert.equal(minutesToInputValue(1440), "23:59");
  assert.equal(minutesToInputValue(540), "09:00");
  assert.equal(minutesToInputValue(0), "00:00");
});

register("durationMinutes never goes negative", () => {
  assert.equal(durationMinutes(540, 720), 180);
  assert.equal(durationMinutes(720, 540), 0);
  assert.equal(durationMinutes(0, 1440), 1440);
});

// THE case for this phase: half-open intervals.
register("overlap: 09:00-12:00 and 12:00-15:00 are adjacent, NOT overlapping", () => {
  const a = { startMin: 540, endMin: 720 };
  const b = { startMin: 720, endMin: 900 };
  assert.equal(overlaps(a, b), false);
  assert.equal(overlaps(b, a), false, "and symmetrically");
});

register("overlap: a 1-minute intersection DOES clash", () => {
  const a = { startMin: 540, endMin: 720 };
  assert.equal(overlaps(a, { startMin: 719, endMin: 900 }), true, "clips the end by 1");
  assert.equal(overlaps(a, { startMin: 300, endMin: 541 }), true, "clips the start by 1");
  assert.equal(overlaps(a, { startMin: 541, endMin: 719 }), true, "fully contained");
  assert.equal(overlaps(a, { startMin: 300, endMin: 900 }), true, "fully containing");
  assert.equal(overlaps(a, a), true, "identical");
});

register("overlap: zero-length and degenerate inputs", () => {
  // A zero-length interval strictly inside another DOES satisfy the half-open
  // formula (540 < 600 && 600 < 720). That is the plan's formula unchanged, and
  // it is harmless: a zero-length slot is rejected earlier by isPlayableSlot and
  // by validateSlot's endAfterStart rule, so it never reaches an overlap test.
  assert.equal(overlaps({ startMin: 600, endMin: 600 }, { startMin: 540, endMin: 720 }), true);
  // Outside, or touching a boundary, it does not.
  assert.equal(overlaps({ startMin: 720, endMin: 720 }, { startMin: 540, endMin: 720 }), false);
  assert.equal(overlaps({ startMin: 300, endMin: 300 }, { startMin: 540, endMin: 720 }), false);
  assert.equal(overlaps(null, { startMin: 0, endMin: 10 }), false);
  assert.equal(overlaps({ startMin: 0, endMin: 10 }, null), false);
});

register("withinActiveHours: normal window, half-open", () => {
  const h = { start: 540, end: 1260 }; // 09:00-21:00
  assert.equal(withinActiveHours(540, h), true, "inclusive at open");
  assert.equal(withinActiveHours(780, h), true);
  assert.equal(withinActiveHours(1259, h), true);
  assert.equal(withinActiveHours(1260, h), false, "exclusive at close");
  assert.equal(withinActiveHours(539, h), false);
  assert.equal(withinActiveHours(0, h), false);
});

register("withinActiveHours: wrapping window 22:00-02:00", () => {
  const h = { start: 1320, end: 120 };
  assert.equal(withinActiveHours(1410, h), true, "23:30 is inside");
  assert.equal(withinActiveHours(60, h), true, "01:00 is inside");
  assert.equal(withinActiveHours(1320, h), true, "22:00 inclusive");
  assert.equal(withinActiveHours(0, h), true, "midnight is inside");
  assert.equal(withinActiveHours(120, h), false, "02:00 exclusive");
  assert.equal(withinActiveHours(180, h), false, "03:00 is outside");
  assert.equal(withinActiveHours(720, h), false, "midday is outside");
});

register("withinActiveHours: start === end is closed, not 24h", () => {
  assert.equal(withinActiveHours(600, { start: 540, end: 540 }), false);
  assert.equal(withinActiveHours(600, null), false);
  assert.equal(withinActiveHours(600, { start: 0, end: 1440 }), true, "00:00-24:00 is always on");
});

register("pct and slotGeometry: exact arithmetic", () => {
  assert.equal(pct(0), 0);
  assert.equal(pct(1440), 100);
  assert.equal(pct(720), 50);
  assert.equal(pct(540), 37.5);
  const g = slotGeometry({ startMin: 540, endMin: 720 });
  assert.equal(g.left, "37.5%", "09:00 sits at 37.5%");
  assert.equal(g.width, "12.5%", "3 of 24 hours is 12.5%");
  assert.deepEqual(slotGeometry({ startMin: 0, endMin: 1440 }), {
    left: "0%",
    width: "100%",
  });
  assert.equal(slotGeometry({ startMin: 720, endMin: 540 }).width, "0%", "never negative");
});

// ------------------------------------------------------------ schedule.js ----

const CI = {
  ci_a: { id: "ci_a", templateId: "thali", fields: {}, createdAt: 1 },
  ci_b: { id: "ci_b", templateId: "coffee", fields: {}, createdAt: 2 },
};
const HOURS = { start: 540, end: 1260 }; // 09:00-21:00

const slot = (id, startMin, endMin, instanceId = "ci_a", enabled = true) => ({
  id,
  startMin,
  endMin,
  instanceId,
  enabled,
});

register("isPlayableSlot rejects disabled and malformed slots", () => {
  assert.equal(isPlayableSlot(slot("s", 540, 720)), true);
  assert.equal(isPlayableSlot(slot("s", 540, 720, "ci_a", false)), false);
  assert.equal(isPlayableSlot(slot("s", 720, 540)), false);
  assert.equal(isPlayableSlot(slot("s", 600, 600)), false);
  assert.equal(isPlayableSlot(null), false);
});

register("normalizeSlots sorts, decorates and does not mutate its input", () => {
  const input = deepFreeze([slot("b", 720, 900), slot("a", 540, 720)]);
  const out = normalizeSlots(input, { activeHours: HOURS, creativeInstances: CI });
  assert.deepEqual(
    out.map((s) => s.id),
    ["a", "b"],
    "sorted by start"
  );
  assert.equal(out[0].durationMin, 180);
  assert.equal(out[0].outsideHours, false);
  assert.equal(out[0].partialHours, false);
  assert.equal(out[0].missingCreative, false);
  assert.deepEqual(out[0].conflictsWith, [], "adjacent slots do not conflict");
  assert.notEqual(out[0], input[1], "returns copies");
});

register("normalizeSlots flags outside-hours, partial and missing creatives", () => {
  const out = normalizeSlots(
    [
      slot("night", 60, 180), // 01:00-03:00, wholly outside 09:00-21:00
      slot("edge", 1200, 1320), // 20:00-22:00, straddles the close
      slot("ghost", 600, 660, "ci_gone"),
    ],
    { activeHours: HOURS, creativeInstances: CI }
  );
  const byId = Object.fromEntries(out.map((s) => [s.id, s]));
  assert.equal(byId.night.outsideHours, true);
  assert.equal(byId.night.partialHours, false);
  assert.equal(byId.edge.outsideHours, false);
  assert.equal(byId.edge.partialHours, true, "plays, but clipped at 21:00");
  assert.equal(byId.ghost.missingCreative, true);
});

register("normalizeSlots reports pre-existing overlaps in hydrated data", () => {
  const out = normalizeSlots([slot("a", 540, 720), slot("b", 700, 800)], {});
  assert.deepEqual(out.find((s) => s.id === "a").conflictsWith, ["b"]);
  assert.deepEqual(out.find((s) => s.id === "b").conflictsWith, ["a"]);
});

register("intersectsActiveHours handles an overnight window", () => {
  const overnight = { start: 1320, end: 120 }; // 22:00-02:00
  assert.deepEqual(intersectsActiveHours(slot("a", 1380, 1440), overnight), {
    any: true,
    whole: true,
  });
  assert.deepEqual(intersectsActiveHours(slot("b", 600, 660), overnight), {
    any: false,
    whole: false,
  });
  assert.equal(intersectsActiveHours(slot("c", 1200, 1380), overnight).any, true);
  assert.equal(intersectsActiveHours(slot("c", 1200, 1380), overnight).whole, false);
});

register("slotAt is half-open at both ends", () => {
  const slots = [slot("am", 540, 720), slot("pm", 720, 900)];
  assert.equal(slotAt(slots, 540).id, "am");
  assert.equal(slotAt(slots, 719).id, "am");
  assert.equal(slotAt(slots, 720).id, "pm", "the boundary belongs to the later slot");
  assert.equal(slotAt(slots, 899).id, "pm");
  assert.equal(slotAt(slots, 900), null);
  assert.equal(slotAt(slots, 300), null);
  assert.equal(slotAt([], 600), null);
  assert.equal(slotAt(slots, 600 - 100), null);
  assert.equal(slotAt([slot("off", 540, 720, "ci_a", false)], 600), null, "disabled never plays");
});

register("scheduledMinutes sums only playable slots", () => {
  assert.equal(
    scheduledMinutes([slot("a", 540, 720), slot("b", 720, 780, "ci_a", false)]),
    180
  );
});

register("findGaps walks the active window", () => {
  assert.deepEqual(findGaps([slot("a", 600, 720)], HOURS), [
    { startMin: 540, endMin: 600 },
    { startMin: 720, endMin: 1260 },
  ]);
  assert.deepEqual(findGaps([slot("a", 540, 1260)], HOURS), [], "fully covered");
  assert.deepEqual(findGaps([], HOURS), [{ startMin: 540, endMin: 1260 }]);
  assert.equal(findGaps([slot("a", 1380, 1440)], { start: 1320, end: 120 }).length, 2);
});

register("validateSlot: a clean slot passes", () => {
  const r = validateSlot(slot("new", 540, 720), {
    slots: [],
    activeHours: HOURS,
    creativeInstances: CI,
  });
  assert.equal(r.ok, true);
  assert.deepEqual(r.errors, []);
  assert.deepEqual(r.warnings, []);
});

register("validateSlot: end must be after start, with a 5-minute minimum", () => {
  const bad = validateSlot({ id: "x", startMin: 720, endMin: 540, instanceId: "ci_a" }, {
    creativeInstances: CI,
  });
  assert.equal(bad.ok, false);
  assert.equal(bad.errors[0].key, "schedule.err.endAfterStart");
  assertKey("schedule.err.endAfterStart");

  const tooShort = validateSlot({ id: "x", startMin: 540, endMin: 543, instanceId: "ci_a" }, {
    creativeInstances: CI,
  });
  assert.equal(tooShort.ok, false);
  assert.equal(tooShort.errors[0].key, "schedule.err.minFive");
  assertKey("schedule.err.minFive");

  const exactly5 = validateSlot({ id: "x", startMin: 540, endMin: 545, instanceId: "ci_a" }, {
    creativeInstances: CI,
    activeHours: HOURS,
  });
  assert.equal(exactly5.ok, true, "5 minutes exactly is allowed");
});

register("validateSlot rejects a zero-length slot before overlap matters", () => {
  const r = validateSlot({ id: "z", startMin: 600, endMin: 600, instanceId: "ci_a" }, {
    slots: [slot("lunch", 540, 720, "ci_a")],
    activeHours: HOURS,
    creativeInstances: CI,
  });
  assert.equal(r.ok, false);
  assert.ok(r.errors.some((e) => e.key === "schedule.err.endAfterStart"));
  assert.ok(
    !r.errors.some((e) => e.key === "schedule.err.overlap"),
    "a zero-length slot is never reported as an overlap"
  );
});

register("validateSlot: a creative is required and must exist", () => {
  const none = validateSlot({ id: "x", startMin: 540, endMin: 720 }, { creativeInstances: CI });
  assert.equal(none.ok, false);
  assert.ok(none.errors.some((e) => e.key === "schedule.err.pickCreative"));
  assertKey("schedule.err.pickCreative");

  const gone = validateSlot(slot("x", 540, 720, "ci_gone"), { creativeInstances: CI });
  assert.equal(gone.ok, false);
  assert.ok(gone.errors.some((e) => e.key === "schedule.err.pickCreative"));
});

register("validateSlot: overlap is BLOCKING and names the clashing slot", () => {
  const existing = [slot("lunch", 540, 720, "ci_a")];
  const r = validateSlot(slot("new", 700, 800, "ci_b"), {
    slots: existing,
    activeHours: HOURS,
    creativeInstances: CI,
    labelFor: (s) => `creative for ${s.id}`,
  });
  assert.equal(r.ok, false);
  const err = r.errors.find((e) => e.key === "schedule.err.overlap");
  assert.ok(err, "overlap error present");
  assert.equal(err.slotId, "lunch", "names the clash");
  assert.equal(err.vars.creative, "creative for lunch");
  assert.deepEqual(err.vars.range, { startMin: 540, endMin: 720 });
  assertKey("schedule.err.overlap");
});

register("validateSlot: an adjacent slot is NOT an overlap", () => {
  const r = validateSlot(slot("new", 720, 900, "ci_b"), {
    slots: [slot("lunch", 540, 720, "ci_a")],
    activeHours: HOURS,
    creativeInstances: CI,
  });
  assert.equal(r.ok, true, "12:00 start against a 12:00 end must be accepted");
});

register("validateSlot: editing a slot does not clash with itself", () => {
  const existing = [slot("lunch", 540, 720, "ci_a")];
  const r = validateSlot(slot("lunch", 560, 740, "ci_a"), {
    slots: existing,
    activeHours: HOURS,
    creativeInstances: CI,
  });
  assert.equal(r.ok, true);
});

register("validateSlot: outside active hours is a WARNING, not an error", () => {
  const r = validateSlot(slot("night", 60, 180, "ci_a"), {
    slots: [],
    activeHours: HOURS,
    creativeInstances: CI,
  });
  assert.equal(r.ok, true, "must not block");
  assert.deepEqual(r.errors, []);
  assert.equal(r.warnings[0].key, "schedule.warn.outsideHours");
  assertKey("schedule.warn.outsideHours");
});

register("validateSlot: the 8-slot cap applies to adds, not edits", () => {
  const eight = Array.from({ length: 8 }, (_, i) =>
    slot(`s${i}`, 540 + i * 10, 545 + i * 10, "ci_a")
  );
  const added = validateSlot({ startMin: 1000, endMin: 1060, instanceId: "ci_a" }, {
    slots: eight,
    activeHours: HOURS,
    creativeInstances: CI,
  });
  assert.equal(added.ok, false);
  const cap = added.errors.find((e) => e.key === "schedule.err.tooMany");
  assert.ok(cap);
  assert.equal(cap.vars.max, 8);
  assertKey("schedule.err.tooMany");

  const edited = validateSlot({ ...eight[0], endMin: eight[0].startMin + 6 }, {
    slots: eight,
    activeHours: HOURS,
    creativeInstances: CI,
  });
  assert.equal(edited.ok, true, "editing an existing slot at the cap is fine");
});

register("validateActiveHours", () => {
  assert.equal(validateActiveHours({ start: 540, end: 1260 }).ok, true);
  const rev = validateActiveHours({ start: 1260, end: 540 });
  assert.equal(rev.ok, false);
  assert.equal(rev.errors[0].key, "hours.err.endAfterStart");
  assertKey("hours.err.endAfterStart");
  const short = validateActiveHours({ start: 540, end: 550 });
  assert.equal(short.ok, false);
  assert.equal(short.errors[0].key, "hours.err.tooShort");
  assertKey("hours.err.tooShort");
  assert.equal(validateActiveHours(null).ok, false);
});

register("slotsOutsideHours names what a narrower window would silence", () => {
  const slots = [slot("a", 540, 720), slot("b", 1300, 1380)];
  const out = slotsOutsideHours(slots, HOURS);
  assert.deepEqual(out.map((s) => s.id), ["b"]);
});

// ----------------------------------------------------------- mirroring.js ----

const primaries = () => [
  { id: "s1", label: "Screen 1", role: "primary", mirrors: null, online: true },
  { id: "s2", label: "Screen 2", role: "primary", mirrors: null, online: true },
  { id: "s3", label: "Screen 3", role: "primary", mirrors: null, online: true },
];

register("resolveChain: a primary resolves to itself, unmirrored", () => {
  const r = resolveChain(primaries(), "s1");
  assert.equal(r.status, "ok");
  assert.equal(r.sourceId, "s1");
  assert.equal(r.mirrored, false);
  assert.deepEqual(r.path, ["s1"]);
});

register("resolveChain: one hop", () => {
  const screens = primaries();
  screens[1] = { ...screens[1], role: "secondary", mirrors: "s1" };
  const r = resolveChain(screens, "s2");
  assert.equal(r.status, "ok");
  assert.equal(r.sourceId, "s1");
  assert.equal(r.mirrored, true);
  assert.deepEqual(r.path, ["s2", "s1"]);
});

register("resolveChain: a long chain resolves to the one primary", () => {
  const screens = Array.from({ length: 6 }, (_, i) => ({
    id: `s${i + 1}`,
    label: `Screen ${i + 1}`,
    role: i === 0 ? "primary" : "secondary",
    mirrors: i === 0 ? null : `s${i}`,
    online: true,
  }));
  const r = resolveChain(screens, "s6");
  assert.equal(r.status, "ok");
  assert.equal(r.sourceId, "s1");
  assert.equal(r.mirrored, true);
  assert.deepEqual(r.path, ["s6", "s5", "s4", "s3", "s2", "s1"]);
});

register("resolveChain: self-mirror is detected, not looped on", () => {
  const screens = primaries();
  screens[0] = { ...screens[0], role: "secondary", mirrors: "s1" };
  const r = resolveChain(screens, "s1");
  assert.equal(r.status, "cycle");
  assert.equal(r.sourceId, null);
});

register("resolveChain: A->B->A is detected", () => {
  const screens = [
    { id: "s1", role: "secondary", mirrors: "s2", online: true },
    { id: "s2", role: "secondary", mirrors: "s1", online: true },
  ];
  assert.equal(resolveChain(screens, "s1").status, "cycle");
  assert.equal(resolveChain(screens, "s2").status, "cycle");
});

register("resolveChain: a three-screen ring is detected", () => {
  const screens = [
    { id: "s1", role: "secondary", mirrors: "s2", online: true },
    { id: "s2", role: "secondary", mirrors: "s3", online: true },
    { id: "s3", role: "secondary", mirrors: "s1", online: true },
  ];
  assert.equal(resolveChain(screens, "s1").status, "cycle");
});

register("resolveChain: a chain longer than the depth cap terminates", () => {
  const n = MAX_MIRROR_DEPTH + 4;
  const screens = Array.from({ length: n }, (_, i) => ({
    id: `s${i + 1}`,
    role: i === 0 ? "primary" : "secondary",
    mirrors: i === 0 ? null : `s${i}`,
    online: true,
  }));
  const r = resolveChain(screens, `s${n}`);
  assert.equal(r.status, "depth", "bails rather than walking forever");
  assert.equal(r.sourceId, null);
});

register("resolveChain: a secondary pointing nowhere is a broken link", () => {
  const screens = primaries();
  screens[1] = { ...screens[1], role: "secondary", mirrors: null };
  assert.equal(resolveChain(screens, "s2").status, "broken-link");
});

register("resolveChain: a link to a screen that is gone", () => {
  const screens = primaries();
  screens[1] = { ...screens[1], role: "secondary", mirrors: "s99" };
  assert.equal(resolveChain(screens, "s2").status, "unknown-screen");
  assert.equal(resolveChain(screens, "nope").status, "unknown-screen");
});

register("canMirror blocks self and cycles, with i18n keys", () => {
  const screens = primaries();
  const self = canMirror(screens, "s1", "s1");
  assert.equal(self.ok, false);
  assert.equal(self.reason, "screens.cannotMirrorSelf");
  assertKey("screens.cannotMirrorSelf");

  assert.equal(canMirror(screens, "s2", "s1").ok, true);

  const linked = primaries();
  linked[1] = { ...linked[1], role: "secondary", mirrors: "s1" };
  const cyc = canMirror(linked, "s1", "s2");
  assert.equal(cyc.ok, false, "s1 cannot mirror its own follower");
  assert.equal(cyc.reason, "screens.cannotMirrorCycle");
  assertKey("screens.cannotMirrorCycle");

  const unknown = canMirror(screens, "s1", "s99");
  assert.equal(unknown.ok, false);
  assert.equal(unknown.reason, "play.reason.unknownScreen");
  assertKey("play.reason.unknownScreen");
});

register("followersOf and allFollowersOf", () => {
  const screens = [
    { id: "s1", role: "primary", mirrors: null, online: true },
    { id: "s2", role: "secondary", mirrors: "s1", online: true },
    { id: "s3", role: "secondary", mirrors: "s2", online: true },
    { id: "s4", role: "primary", mirrors: null, online: true },
  ];
  assert.deepEqual(followersOf(screens, "s1").map((s) => s.id), ["s2"]);
  assert.deepEqual(allFollowersOf(screens, "s1").map((s) => s.id), ["s2", "s3"]);
  assert.deepEqual(allFollowersOf(screens, "s4"), []);
});

register("mirrorCandidates excludes self and anything that would loop", () => {
  const screens = [
    { id: "s1", role: "primary", mirrors: null, online: true },
    { id: "s2", role: "secondary", mirrors: "s1", online: true },
    { id: "s3", role: "primary", mirrors: null, online: true },
  ];
  assert.deepEqual(mirrorCandidates(screens, "s1").map((s) => s.id), ["s3"]);
  assert.deepEqual(mirrorCandidates(screens, "s3").map((s) => s.id), ["s1", "s2"]);
});

// ------------------------------------------------------------ playback.js ----

const cfg = (slots, activeHours = HOURS) => ({ activeHours: { ...activeHours }, slots });

register("resolveScreen kind=creative — requires a real slot AND a real instance", () => {
  const screens = primaries();
  const source = { s1: cfg([slot("lunch", 540, 900, "ci_a")]) };
  const r = resolveScreen(source, screens, CI, "s1", 780);
  assert.equal(r.kind, "creative");
  assert.equal(r.reason, null, "a playing screen has nothing to explain");
  assert.equal(r.instanceId, "ci_a");
  assert.equal(r.slot.id, "lunch");
  assert.equal(r.screenId, "s1");
  assert.equal(r.sourceScreenId, "s1");
  assert.equal(r.mirrored, false);
});

register("resolveScreen kind=offline — wins over an otherwise playing schedule", () => {
  const screens = primaries();
  screens[0] = { ...screens[0], online: false };
  const source = { s1: cfg([slot("lunch", 540, 900, "ci_a")]) };
  const r = resolveScreen(source, screens, CI, "s1", 780);
  assert.equal(r.kind, "offline");
  assert.equal(r.reason, "play.reason.offline");
  assert.equal(r.slot, null, "no slot is reported on a dark screen");
  assertKey("play.reason.offline");
});

register("resolveScreen kind=idle — outside active hours", () => {
  const screens = primaries();
  const source = { s1: cfg([slot("lunch", 540, 900, "ci_a")]) };
  const r = resolveScreen(source, screens, CI, "s1", 60); // 01:00
  assert.equal(r.kind, "idle");
  assert.equal(r.reason, "play.reason.outsideHours");
  assertKey("play.reason.outsideHours");
});

register("resolveScreen kind=no-content, reason=gap — open, but nothing scheduled", () => {
  const screens = primaries();
  const source = { s1: cfg([slot("morning", 540, 600, "ci_a")]) };
  const r = resolveScreen(source, screens, CI, "s1", 780);
  assert.equal(r.kind, "no-content");
  assert.equal(r.reason, "play.reason.gap");
  assertKey("play.reason.gap");
});

register("resolveScreen reason=creativeMissing — never substitutes another creative", () => {
  const screens = primaries();
  const source = { s1: cfg([slot("lunch", 540, 900, "ci_gone")]) };
  const r = resolveScreen(source, screens, CI, "s1", 780);
  assert.equal(r.kind, "no-content");
  assert.equal(r.reason, "play.reason.creativeMissing");
  assert.equal(r.instanceId, "ci_gone", "reports what was asked for");
  assert.equal(r.slot.id, "lunch");
  assertKey("play.reason.creativeMissing");
});

register("resolveScreen reason=notConfigured — no config for the source screen", () => {
  const r = resolveScreen({}, primaries(), CI, "s1", 780);
  assert.equal(r.kind, "no-content");
  assert.equal(r.reason, "play.reason.notConfigured");
  assertKey("play.reason.notConfigured");
});

register("resolveScreen kind=broken-link, reason=unknownScreen", () => {
  const r = resolveScreen({}, primaries(), CI, "s99", 780);
  assert.equal(r.kind, "broken-link");
  assert.equal(r.reason, "play.reason.unknownScreen");

  const dangling = primaries();
  dangling[1] = { ...dangling[1], role: "secondary", mirrors: null };
  const d = resolveScreen({}, dangling, CI, "s2", 780);
  assert.equal(d.kind, "broken-link");
  assert.equal(d.reason, "play.reason.unknownScreen");
  assert.equal(d.mirrored, true);
});

register("resolveScreen kind=broken-link, reason=cycle", () => {
  const screens = [
    { id: "s1", role: "secondary", mirrors: "s2", online: true },
    { id: "s2", role: "secondary", mirrors: "s1", online: true },
  ];
  const r = resolveScreen({ s1: cfg([]) }, screens, CI, "s1", 780);
  assert.equal(r.kind, "broken-link");
  assert.equal(r.reason, "play.reason.cycle");
  assertKey("play.reason.cycle");
});

register("resolveScreen reason=primaryOffline — a mirror of a dark primary", () => {
  const screens = primaries();
  screens[0] = { ...screens[0], online: false };
  screens[1] = { ...screens[1], role: "secondary", mirrors: "s1" };
  const source = { s1: cfg([slot("lunch", 540, 900, "ci_a")]) };
  const r = resolveScreen(source, screens, CI, "s2", 780);
  assert.equal(r.kind, "offline");
  assert.equal(r.reason, "play.reason.primaryOffline");
  assert.equal(r.mirrored, true);
  assert.equal(r.sourceScreenId, "s1");
  assertKey("play.reason.primaryOffline");
});

register("a mirror shows its primary's content", () => {
  const screens = primaries();
  screens[1] = { ...screens[1], role: "secondary", mirrors: "s1" };
  const source = { s1: cfg([slot("lunch", 540, 900, "ci_a")]), s2: cfg([]) };
  const r = resolveScreen(source, screens, CI, "s2", 780);
  assert.equal(r.kind, "creative");
  assert.equal(r.instanceId, "ci_a");
  assert.equal(r.sourceScreenId, "s1", "read s1's config, not its own empty one");
  assert.equal(r.mirrored, true);
});

// The one semantic judgement call, asserted so a later "tidy" cannot reverse it.
register("a mirror shows its primary's IDLE state, ignoring its own active hours", () => {
  const screens = primaries();
  screens[1] = { ...screens[1], role: "secondary", mirrors: "s1" };
  const source = {
    s1: cfg([slot("lunch", 540, 900, "ci_a")], { start: 540, end: 1260 }), // closed at 01:00
    s2: cfg([], { start: 0, end: 1440 }), // its own hours say always open
  };
  const r = resolveScreen(source, screens, CI, "s2", 60);
  assert.equal(r.kind, "idle", "follows s1's hours, not its own");
  assert.equal(r.reason, "play.reason.outsideHours");
  assert.equal(r.sourceScreenId, "s1");
});

register("a mirror that is itself offline reports its OWN offline state", () => {
  const screens = primaries();
  screens[1] = { ...screens[1], role: "secondary", mirrors: "s1", online: false };
  const source = { s1: cfg([slot("lunch", 540, 900, "ci_a")]) };
  const r = resolveScreen(source, screens, CI, "s2", 780);
  assert.equal(r.kind, "offline");
  assert.equal(r.reason, "play.reason.offline", "offline is checked before the chain");
});

register("every resolveScreen result has the full shape", () => {
  const screens = primaries();
  screens[1] = { ...screens[1], role: "secondary", mirrors: "s1" };
  const source = { s1: cfg([slot("lunch", 540, 900, "ci_a")]) };
  const keys = [
    "kind",
    "screenId",
    "sourceScreenId",
    "mirrored",
    "instanceId",
    "slot",
    "reason",
  ];
  for (const [id, now] of [
    ["s1", 780],
    ["s1", 60],
    ["s2", 780],
    ["s99", 780],
  ]) {
    const r = resolveScreen(source, screens, CI, id, now);
    assert.deepEqual(Object.keys(r).sort(), [...keys].sort(), `shape for ${id}@${now}`);
    assert.ok(
      r.reason === null || /^[a-z]+(\.[A-Za-z]+)+$/.test(r.reason),
      `reason must be an i18n key, got ${r.reason}`
    );
  }
});

register("resolveAllScreens keys every screen", () => {
  const screens = primaries();
  const all = resolveAllScreens({ s1: cfg([slot("a", 540, 900, "ci_a")]) }, screens, CI, 780);
  assert.deepEqual(Object.keys(all).sort(), ["s1", "s2", "s3"]);
  assert.equal(all.s1.kind, "creative");
  assert.equal(all.s2.kind, "no-content");
});

// -------------------------------------------------------------- health.js ----

register("seededUnit is deterministic and in range", () => {
  assert.equal(seededUnit("s1", 0), seededUnit("s1", 0));
  assert.notEqual(seededUnit("s1", 0), seededUnit("s1", 1));
  assert.notEqual(seededUnit("s1", 0), seededUnit("s2", 0));
  for (const id of ["s1", "s2", "s3", "s4", "s5"]) {
    for (let tick = 0; tick < 50; tick += 1) {
      const u = seededUnit(id, tick);
      assert.ok(u >= 0 && u < 1, `out of range: ${u}`);
    }
  }
});

register("screenHealth: online screen, plausible and repeatable figures", () => {
  const s = { id: "s1", role: "primary", mirrors: null, online: true };
  const h = screenHealth(s, 780, 3);
  assert.equal(h.status, "online");
  assert.equal(h.online, true);
  assert.equal(h.lastSeenMin, 780, "an online screen was seen now");
  assert.ok(h.uptimePct >= 97 && h.uptimePct < 100, `uptime ${h.uptimePct}`);
  assert.deepEqual(h, screenHealth(s, 780, 3), "same tick, same figures");
});

register("screenHealth: offline screen was last seen in the past", () => {
  const s = { id: "s4", role: "primary", mirrors: null, online: false };
  const h = screenHealth(s, 780, 1);
  assert.equal(h.status, "offline");
  assert.ok(h.staleMinutes >= 2, "a visible gap");
  assert.equal(h.lastSeenMin, 780 - h.staleMinutes);
  assert.ok(h.uptimePct >= 80 && h.uptimePct < 95, `uptime ${h.uptimePct}`);
});

register("screenHealth: lastSeenMin wraps rather than going negative", () => {
  const s = { id: "s4", role: "primary", mirrors: null, online: false };
  const h = screenHealth(s, 1, 1);
  assert.ok(h.lastSeenMin >= 0 && h.lastSeenMin < 1440, `got ${h.lastSeenMin}`);
});

register("screenHealth: playback is a separate axis from connectivity", () => {
  const s = { id: "s1", role: "primary", mirrors: null, online: true };
  const playing = screenHealth(s, 780, 0, { kind: "creative", reason: null });
  assert.equal(playing.playing, true);
  const idle = screenHealth(s, 780, 0, { kind: "idle", reason: "play.reason.outsideHours" });
  assert.equal(idle.online, true, "online");
  assert.equal(idle.playing, false, "but not playing");
  assert.equal(idle.playbackReason, "play.reason.outsideHours");
});

register("allScreenHealth keys every screen", () => {
  const screens = primaries();
  const h = allScreenHealth(screens, 780, 0);
  assert.deepEqual(Object.keys(h).sort(), ["s1", "s2", "s3"]);
});

register("healthSummary returns keys and counts, not sentences", () => {
  const all = healthSummary(primaries());
  assert.equal(all.allOnline, true);
  assert.equal(all.key, "screens.summaryAll");
  assertKey("screens.summaryAll");

  const screens = primaries();
  screens[0] = { ...screens[0], online: false };
  const some = healthSummary(screens);
  assert.equal(some.allOnline, false);
  assert.equal(some.key, "screens.summarySome");
  assert.deepEqual(some.vars, { online: 2, total: 3 });
  assertKey("screens.summarySome");
});

register("advanceClock wraps at midnight", () => {
  assert.equal(advanceClock(780, 60), 840);
  assert.equal(advanceClock(1400, 60), 20);
  assert.equal(advanceClock(0, -1), 1439);
  assert.equal(advanceClock(1439, 1), 0);
});

register("minutesUntilOpen", () => {
  assert.equal(minutesUntilOpen(480, HOURS), 60, "an hour before opening");
  assert.equal(minutesUntilOpen(540, HOURS), 0, "at opening");
  // 21:40 -> next 09:00 is 2h20m to midnight plus 9h.
  assert.equal(minutesUntilOpen(1300, HOURS), 140 + 540, "wraps to tomorrow");
  assert.equal(minutesUntilOpen(780, null), null);
});

// ---------------------------------------------------------------- purity ----

register("purity: no domain function mutates a deep-frozen argument", () => {
  const screens = deepFreeze(
    primaries().map((s, i) => (i === 1 ? { ...s, role: "secondary", mirrors: "s1" } : s))
  );
  const slots = deepFreeze([slot("b", 720, 900, "ci_b"), slot("a", 540, 720, "ci_a")]);
  const source = deepFreeze({
    s1: { activeHours: { ...HOURS }, slots },
    s2: { activeHours: { ...HOURS }, slots: [] },
  });
  const instances = deepFreeze({ ...CI });
  const hours = deepFreeze({ ...HOURS });

  // Any in-place write throws here, because the module graph is ESM strict mode.
  normalizeSlots(slots, { activeHours: hours, creativeInstances: instances });
  slotAt(slots, 600);
  scheduledMinutes(slots);
  findGaps(slots, hours);
  intersectsActiveHours(slots[0], hours);
  slotsOutsideHours(slots, hours);
  validateSlot(slot("new", 1000, 1100, "ci_a"), {
    slots,
    activeHours: hours,
    creativeInstances: instances,
  });
  validateActiveHours(hours);
  resolveChain(screens, "s2");
  canMirror(screens, "s3", "s1");
  followersOf(screens, "s1");
  allFollowersOf(screens, "s1");
  mirrorCandidates(screens, "s3");
  resolveScreen(source, screens, instances, "s1", 780);
  resolveScreen(source, screens, instances, "s2", 780);
  resolveAllScreens(source, screens, instances, 780);
  allScreenHealth(screens, 780, 2);
  healthSummary(screens);
  withinActiveHours(600, hours);
  slotGeometry(slots[0]);

  // And the inputs are unchanged.
  assert.deepEqual(slots.map((s) => s.id), ["b", "a"], "input order untouched");
  assert.equal(screens[1].mirrors, "s1");
});

register("purity: returned slots are copies, so a view cannot write through them", () => {
  const input = [slot("a", 540, 720, "ci_a")];
  const out = normalizeSlots(input, {});
  out[0].startMin = 999;
  assert.equal(input[0].startMin, 540, "the source slot is unaffected");
});

register("i18n: every play.reason.* key the domain can return exists in en and hi", () => {
  for (const reason of [
    "offline",
    "primaryOffline",
    "outsideHours",
    "gap",
    "creativeMissing",
    "cycle",
    "unknownScreen",
    "notConfigured",
  ]) {
    assertKey(`play.reason.${reason}`);
  }
});

register("i18n: en and hi key trees are still identical", () => {
  const a = flattenKeys(en);
  const b = flattenKeys(hi);
  const onlyEn = a.filter((k) => !b.includes(k));
  const onlyHi = b.filter((k) => !a.includes(k));
  assert.deepEqual(onlyEn, [], "keys only in en");
  assert.deepEqual(onlyHi, [], "keys only in hi");
  assert.equal(a.length, b.length);
});

// ------------------------------------------------- reducer (phase 4 cases) ----

register("SELECT_SCREEN changes selection and ignores unknown ids", () => {
  const next = reducer(initialState, selectScreen("s3"));
  assert.equal(next.selectedScreenId, "s3");
  assert.equal(
    reducer(next, selectScreen("s99")),
    next,
    "an unknown id returns the same object"
  );
  assert.equal(reducer(next, selectScreen("s3")), next, "re-selecting is a no-op");
});

register("SELECT_SCREEN never marks anything dirty", () => {
  const next = reducer(initialState, selectScreen("s4"));
  assert.equal(next.save.status, "clean", "looking around is not an edit");
  assert.deepEqual(next.save.dirtyScreens, []);
  assert.equal(next.draft, initialState.draft, "draft untouched");
  assert.equal(next.saved, initialState.saved, "saved untouched");
});

register("SIM_SET_TIME clamps, and scrubbing by hand pauses the clock", () => {
  const playing = reducer(initialState, simPlay());
  assert.equal(playing.sim.playing, true);
  const scrubbed = reducer(playing, simSetTime(615));
  assert.equal(scrubbed.sim.nowMin, 615);
  assert.equal(scrubbed.sim.playing, false, "a manual scrub stops playback");
  assert.equal(reducer(initialState, simSetTime(-10)).sim.nowMin, 0);
  assert.equal(reducer(initialState, simSetTime(99999)).sim.nowMin, 1440);
});

register("SIM_TICK advances by speed and wraps at midnight", () => {
  const s = { ...initialState, sim: { nowMin: 1400, playing: true, speed: 60 } };
  assert.equal(reducer(s, simTick()).sim.nowMin, 20, "1400 + 60 wraps to 00:20");
});

register("SIM_PLAY / SIM_PAUSE are idempotent", () => {
  const playing = reducer(initialState, simPlay());
  assert.equal(reducer(playing, simPlay()), playing);
  const paused = reducer(playing, simPause());
  assert.equal(paused.sim.playing, false);
  assert.equal(reducer(paused, simPause()), paused);
});

register("SIM_SET_SPEED rejects zero and nonsense", () => {
  assert.equal(reducer(initialState, simSetSpeed(30)).sim.speed, 30);
  assert.equal(reducer(initialState, simSetSpeed(0)), initialState);
  assert.equal(reducer(initialState, simSetSpeed(-5)), initialState);
  assert.equal(reducer(initialState, simSetSpeed("fast")), initialState);
});

register("HEALTH_TICK only bumps a counter, so figures are reproducible", () => {
  const once = reducer(initialState, healthTick());
  assert.equal(once.health.tick, 1);
  assert.equal(reducer(once, healthTick()).health.tick, 2);
  // The same tick must yield the same fleet figures, which is the whole point of
  // storing a counter rather than the numbers.
  const a = allScreenHealth(once.screens, once.sim.nowMin, once.health.tick);
  const b = allScreenHealth(once.screens, once.sim.nowMin, once.health.tick);
  assert.deepEqual(a, b);
});

register("TOGGLE_SCREEN_ONLINE writes both screens and saved.screens", () => {
  const next = reducer(initialState, toggleScreenOnline("s2"));
  assert.equal(next.screens.find((s) => s.id === "s2").online, false);
  assert.equal(
    next.saved.screens.find((s) => s.id === "s2").online,
    false,
    "previews resolve against saved.screens, so it must be written too"
  );
  assert.equal(next.screens.find((s) => s.id === "s1").online, true, "others untouched");
  const back = reducer(next, toggleScreenOnline("s2"));
  assert.equal(back.screens.find((s) => s.id === "s2").online, true, "it toggles");
  assert.equal(reducer(initialState, toggleScreenOnline("s99")), initialState);
});

register("taking a screen offline changes what the wall resolves", () => {
  const before = resolveScreen(
    initialState.saved.byScreen,
    initialState.saved.screens,
    initialState.creativeInstances,
    "s2",
    780
  );
  assert.notEqual(before.kind, "offline");
  const next = reducer(initialState, toggleScreenOnline("s2"));
  const after = resolveScreen(
    next.saved.byScreen,
    next.saved.screens,
    next.creativeInstances,
    "s2",
    780
  );
  assert.equal(after.kind, "offline");
  assert.equal(after.reason, "play.reason.offline");
});

register("UI view actions validate their input", () => {
  assert.equal(reducer(initialState, uiSetWallView("list")).ui.wallView, "list");
  assert.equal(reducer(initialState, uiSetWallView("sideways")), initialState);
  assert.equal(
    reducer(initialState, uiSetScheduleView("timeline")).ui.scheduleView,
    "timeline"
  );
  assert.equal(reducer(initialState, uiSetScheduleView("nope")), initialState);
});

register("the reducer never mutates the state it is given", () => {
  const frozen = deepFreeze(JSON.parse(JSON.stringify(initialState)));
  for (const action of [
    selectScreen("s5"),
    simSetTime(1000),
    simPlay(),
    simTick(),
    simSetSpeed(10),
    healthTick(),
    toggleScreenOnline("s3"),
    uiSetWallView("list"),
    uiSetScheduleView("timeline"),
  ]) {
    reducer(frozen, action); // throws if any case writes in place
  }
  assert.equal(frozen.selectedScreenId, "s1");
  assert.equal(frozen.sim.nowMin, 780);
  assert.equal(frozen.health.tick, 0);
});

register("the default screen wall resolves to a sensible starting state", () => {
  // Nothing is scheduled yet at intake, so every screen should say so rather than
  // showing an invented creative.
  const all = resolveAllScreens(
    initialState.saved.byScreen,
    initialState.saved.screens,
    initialState.creativeInstances,
    initialState.sim.nowMin
  );
  assert.equal(Object.keys(all).length, 5);
  for (const [id, r] of Object.entries(all)) {
    assert.equal(r.kind, "no-content", `${id} should be empty, not playing`);
    assert.equal(r.reason, "play.reason.gap");
  }
  // And outside the default 09:00-21:00 window they are idle, not empty.
  const night = resolveAllScreens(
    initialState.saved.byScreen,
    initialState.saved.screens,
    initialState.creativeInstances,
    120
  );
  for (const r of Object.values(night)) assert.equal(r.kind, "idle");
});

// --------------------------------------------- creatives (phase 5, no JSX) ----

register("every manifest entry is well formed", () => {
  assert.ok(allCreatives.length > 0, "the library is not empty");
  const ids = new Set();
  for (const tpl of allCreatives) {
    assert.ok(tpl.id, "has an id");
    assert.equal(ids.has(tpl.id), false, `duplicate template id ${tpl.id}`);
    ids.add(tpl.id);
    assert.ok(tpl.componentKey, `${tpl.id} has a componentKey`);
    assert.ok(Array.isArray(tpl.fields) && tpl.fields.length, `${tpl.id} declares fields`);
    assert.ok(tpl.palette && typeof tpl.palette === "object", `${tpl.id} has a palette`);
    assert.ok(["svg", "image", "video"].includes(tpl.mediaType), `${tpl.id} mediaType`);

    // Every field needs a limit, or CText would fall back to its default 40 and
    // silently overflow a template tuned for less.
    for (const field of tpl.fields) {
      assert.equal(
        typeof tpl.limits?.[field],
        "number",
        `${tpl.id}: field "${field}" has no limits entry`
      );
      assert.ok(tpl.limits[field] > 0, `${tpl.id}.${field} limit is positive`);
      // A default longer than its own limit would render clipped from the start.
      const def = tpl.defaults?.[field] ?? "";
      assert.ok(
        def.length <= tpl.limits[field],
        `${tpl.id}.${field} default (${def.length}) exceeds limit ${tpl.limits[field]}`
      );
    }
    // Names and descriptions must exist in BOTH languages.
    assertKey(tpl.nameKey);
    assertKey(tpl.descKey);
  }
});

register("registry lookups", () => {
  assert.equal(getTemplate("r_thali_combo").componentKey, "ThaliCombo");
  assert.equal(getTemplate("nope"), null);
  assert.ok(creativesFor("restaurant").length > 0);
  assert.ok(creativesFor("cafe").length > 0, "an empty industry falls back, never blank");
  assert.ok(creativesFor("").length > 0);
  assert.deepEqual(mediaTypesFor("restaurant"), ["svg"]);
});

register("clamp collapses whitespace and truncates with an ellipsis", () => {
  assert.equal(clamp("  hello   world  ", 40), "hello world");
  assert.equal(clamp("", 10), "");
  assert.equal(clamp(null, 10), "", "null never becomes the string 'null'");
  assert.equal(clamp(undefined, 10), "", "nor 'undefined'");
  assert.equal(clamp("abcdefghij", 10), "abcdefghij", "exactly at the limit is untouched");
  assert.equal(clamp("abcdefghijk", 10), "abcdefghi…", "over the limit gets an ellipsis");
  assert.equal(clamp("abcdefghijk", 10).length, 10, "and still fits the limit");
  assert.equal(clamp("a\n\nb\tc", 40), "a b c", "newlines and tabs collapse");
});

register("clamp is total: no input produces unbounded output", () => {
  const long = "x".repeat(5000);
  for (const limit of [1, 5, 8, 16, 24, 28, 34, 40]) {
    assert.ok(clamp(long, limit).length <= limit, `limit ${limit} not honoured`);
  }
  // Every real limit in every manifest must hold for pathological input.
  for (const tpl of allCreatives) {
    for (const field of tpl.fields) {
      const out = clamp(long, tpl.limits[field]);
      assert.ok(
        out.length <= tpl.limits[field],
        `${tpl.id}.${field} overflowed`
      );
    }
  }
});

register("wrapLines never drops a word silently and respects the line cap", () => {
  assert.deepEqual(wrapLines("", 10, 2), []);
  const two = wrapLines("Full Thali Combo Offer", 12, 2);
  assert.ok(two.length <= 2, "honours the line cap");
  assert.ok(two.join(" ").length > 0);
  // A single unbreakable word longer than the line still comes back clamped.
  const one = wrapLines("x".repeat(100), 10, 2);
  assert.ok(one.length <= 2);
  for (const row of one) assert.ok(row.length <= 20, `row too long: ${row.length}`);
});

// ------------------------------------------------- reducer: creatives (p5) ----

const TPL = "r_thali_combo";

register("CREATIVE_ADD allowlists fields against the manifest", () => {
  const next = reducer(
    initialState,
    creativeAdd("ci_1", TPL, { headline: "Hi", evil: "nope" }, 1000)
  );
  const inst = next.creativeInstances.ci_1;
  assert.ok(inst, "instance created");
  assert.equal(inst.headline, undefined);
  assert.equal(inst.fields.headline, "Hi");
  assert.equal("evil" in inst.fields, false, "an undeclared field cannot be stored");
  assert.deepEqual(
    Object.keys(inst.fields).sort(),
    [...getTemplate(TPL).fields].sort(),
    "exactly the declared fields, no more and no fewer"
  );
  assert.equal(inst.fields.price, getTemplate(TPL).defaults.price, "defaults fill the gaps");
  assert.equal(next.save.status, "dirty", "adding a creative is an edit");
});

register("CREATIVE_ADD coerces every value to a string", () => {
  const next = reducer(
    initialState,
    creativeAdd("ci_1", TPL, { headline: 42, price: null, cta: { a: 1 } }, 0)
  );
  for (const [k, v] of Object.entries(next.creativeInstances.ci_1.fields)) {
    assert.equal(typeof v, "string", `${k} is not a string`);
  }
  assert.equal(next.creativeInstances.ci_1.fields.headline, "42");
});

register("CREATIVE_ADD rejects an unknown template", () => {
  assert.equal(reducer(initialState, creativeAdd("ci_1", "nope", {}, 0)), initialState);
});

register("CREATIVE_FIELD edits ONE instance — a template never mutates globally", () => {
  let s = reducer(initialState, creativeAdd("ci_a", TPL, {}, 1));
  s = reducer(s, creativeAdd("ci_b", TPL, {}, 2));
  const before = s.creativeInstances.ci_b.fields.headline;

  s = reducer(s, creativeField("ci_a", "headline", "Only mine"));
  assert.equal(s.creativeInstances.ci_a.fields.headline, "Only mine");
  assert.equal(
    s.creativeInstances.ci_b.fields.headline,
    before,
    "the other instance of the SAME template is untouched"
  );
  // And the manifest itself must not have been written through.
  assert.equal(getTemplate(TPL).defaults.headline, "Full Thali Combo");
});

register("CREATIVE_FIELD rejects fields the template does not declare", () => {
  const s = reducer(initialState, creativeAdd("ci_a", TPL, {}, 1));
  assert.equal(reducer(s, creativeField("ci_a", "evil", "x")), s);
  assert.equal(reducer(s, creativeField("ci_missing", "headline", "x")), s);
});

register("CREATIVE_DUPLICATE gives an independent copy", () => {
  let s = reducer(initialState, creativeAdd("ci_a", TPL, { headline: "Original" }, 1));
  s = reducer(s, creativeDuplicate("ci_a", "ci_copy", 2));
  assert.equal(s.creativeInstances.ci_copy.fields.headline, "Original");
  s = reducer(s, creativeField("ci_copy", "headline", "Changed"));
  assert.equal(s.creativeInstances.ci_a.fields.headline, "Original", "source unaffected");
  assert.equal(s.creativeInstances.ci_copy.fields.headline, "Changed");
  assert.equal(reducer(s, creativeDuplicate("ci_missing", "x", 0)), s);
});

register("CREATIVE_REMOVE prunes slots referencing the instance", () => {
  let s = reducer(initialState, creativeAdd("ci_a", TPL, {}, 1));
  // Hand-place slots on two screens, as SLOT_ADD (phase 6) will.
  s = {
    ...s,
    draft: {
      byScreen: {
        ...s.draft.byScreen,
        s1: {
          ...s.draft.byScreen.s1,
          slots: [
            { id: "sl_1", startMin: 540, endMin: 720, instanceId: "ci_a", enabled: true },
            { id: "sl_2", startMin: 720, endMin: 900, instanceId: "ci_other", enabled: true },
          ],
        },
        s3: {
          ...s.draft.byScreen.s3,
          slots: [
            { id: "sl_3", startMin: 600, endMin: 660, instanceId: "ci_a", enabled: true },
          ],
        },
      },
    },
  };

  const next = reducer(s, creativeRemove("ci_a"));
  assert.equal("ci_a" in next.creativeInstances, false, "instance gone");
  assert.deepEqual(
    next.draft.byScreen.s1.slots.map((x) => x.id),
    ["sl_2"],
    "only the slot using it is pruned"
  );
  assert.deepEqual(next.draft.byScreen.s3.slots, [], "across every screen");
  assert.ok(
    next.save.dirtyScreens.includes("s1") && next.save.dirtyScreens.includes("s3"),
    "both affected screens are marked dirty"
  );
  // No slot anywhere may point at a removed instance — the ghost-slot invariant.
  for (const cfg of Object.values(next.draft.byScreen)) {
    for (const slot of cfg.slots) {
      assert.notEqual(slot.instanceId, "ci_a");
    }
  }
});

register("CREATIVE_REMOVE on an unknown id is a no-op", () => {
  const s = reducer(initialState, creativeAdd("ci_a", TPL, {}, 1));
  assert.equal(reducer(s, creativeRemove("ci_nope")), s);
});

register("a scheduled instance actually plays on the wall", () => {
  let s = reducer(initialState, creativeAdd("ci_a", TPL, { headline: "Lunch" }, 1));
  const byScreen = {
    ...s.saved.byScreen,
    s1: {
      ...s.saved.byScreen.s1,
      slots: [{ id: "sl_1", startMin: 540, endMin: 900, instanceId: "ci_a", enabled: true }],
    },
  };
  const r = resolveScreen(byScreen, s.saved.screens, s.creativeInstances, "s1", 780);
  assert.equal(r.kind, "creative");
  assert.equal(r.instanceId, "ci_a");
  // And after removal the same schedule reports the loss rather than inventing.
  s = reducer(s, creativeRemove("ci_a"));
  const after = resolveScreen(byScreen, s.saved.screens, s.creativeInstances, "s1", 780);
  assert.equal(after.kind, "no-content");
  assert.equal(after.reason, "play.reason.creativeMissing");
});

register("the creative reducer cases never mutate frozen state", () => {
  const frozen = deepFreeze(JSON.parse(JSON.stringify(initialState)));
  const added = reducer(frozen, creativeAdd("ci_a", TPL, {}, 1));
  deepFreeze(added);
  for (const action of [
    creativeField("ci_a", "headline", "x"),
    creativeDuplicate("ci_a", "ci_b", 2),
    creativeRemove("ci_a"),
  ]) {
    reducer(added, action);
  }
  assert.equal(Object.keys(frozen.creativeInstances).length, 0);
});

// -------------------------------------- reducer: schedule + save (phase 6) ----

/** A state with one creative instance, ready to be scheduled. */
function withCreative(id = "ci_a") {
  return reducer(initialState, creativeAdd(id, TPL, { headline: "Lunch" }, 1));
}

/** Add a slot and return the next state. Minutes, not strings. */
function addSlot(state, screenId, id, startMin, endMin, instanceId = "ci_a") {
  return reducer(state, slotAdd(screenId, { id, startMin, endMin, instanceId }));
}

register("SLOT_ADD stores a valid slot and marks only that screen dirty", () => {
  const next = addSlot(withCreative(), "s1", "sl_1", 540, 720);
  assert.deepEqual(
    next.draft.byScreen.s1.slots.map((s) => [s.startMin, s.endMin, s.instanceId]),
    [[540, 720, "ci_a"]]
  );
  assert.equal(next.draft.byScreen.s1.slots[0].enabled, true, "enabled by default");
  assert.equal(next.save.status, "dirty");
  assert.deepEqual(next.save.dirtyScreens, ["s1"], "per-action, per-screen");
  assert.deepEqual(next.draft.byScreen.s2.slots, [], "other screens untouched");
});

// THE blocking rule for this phase.
register("SLOT_ADD rejects an overlap, and validateSlot names the clashing slot", () => {
  const s = addSlot(withCreative(), "s1", "sl_1", 540, 720); // 09:00-12:00
  const clashing = addSlot(s, "s1", "sl_2", 660, 780); // 11:00-13:00
  assert.equal(clashing, s, "the overlapping add is rejected outright");
  assert.equal(clashing.draft.byScreen.s1.slots.length, 1);

  // And the message the view shows identifies WHICH slot is in the way.
  const result = validateSlot(
    { startMin: 660, endMin: 780, instanceId: "ci_a" },
    { slots: s.draft.byScreen.s1.slots, labelFor: () => "Thali Combo" }
  );
  assert.equal(result.ok, false);
  const overlap = result.errors.find((e) => e.key === "schedule.err.overlap");
  assert.ok(overlap, "the overlap error is present");
  assert.equal(overlap.slotId, "sl_1", "it names the clashing slot id");
  assert.equal(overlap.vars.creative, "Thali Combo", "and the creative in the way");
  assert.deepEqual(overlap.vars.range, { startMin: 540, endMin: 720 });
  assertKey("schedule.err.overlap");
});

// The half-open-interval payoff, asserted through the reducer rather than only
// through overlaps().
register("SLOT_ADD accepts 09:00-12:00 then 12:00-15:00 — adjacent, not overlapping", () => {
  let s = addSlot(withCreative(), "s1", "sl_1", 540, 720);
  s = addSlot(s, "s1", "sl_2", 720, 900);
  assert.equal(s.draft.byScreen.s1.slots.length, 2, "both slots are stored");
  assert.deepEqual(
    s.draft.byScreen.s1.slots.map((x) => x.id).sort(),
    ["sl_1", "sl_2"]
  );
});

register("SLOT_ADD rejects a slot shorter than 5 minutes, or ending before it starts", () => {
  const s = withCreative();
  assert.equal(addSlot(s, "s1", "sl_1", 540, 543), s, "3 minutes is too short");
  assert.equal(addSlot(s, "s1", "sl_1", 720, 540), s, "end before start");
  assert.equal(addSlot(s, "s1", "sl_1", 540, 540), s, "zero length");
  assert.equal(addSlot(s, "s1", "sl_1", 540, 545).draft.byScreen.s1.slots.length, 1, "5 is ok");
});

register("SLOT_ADD requires a creative that actually exists", () => {
  const s = withCreative();
  assert.equal(reducer(s, slotAdd("s1", { id: "sl_1", startMin: 540, endMin: 720 })), s);
  assert.equal(addSlot(s, "s1", "sl_1", 540, 720, "ci_ghost"), s, "unknown instance");
  assert.equal(addSlot(s, "s1", null, 540, 720), s, "a slot with no id is rejected");
  assert.equal(addSlot(s, "s99", "sl_1", 540, 720), s, "unknown screen");
});

// Outside active hours is a WARNING. The slot is legal; it simply never plays.
register("a slot outside active hours is ACCEPTED, with a warning", () => {
  const s = withCreative();
  const hours = s.draft.byScreen.s1.activeHours; // 09:00-21:00 by default
  const next = addSlot(s, "s1", "sl_night", 60, 240); // 01:00-04:00

  assert.equal(next.draft.byScreen.s1.slots.length, 1, "stored, not refused");

  const result = validateSlot(
    { startMin: 60, endMin: 240, instanceId: "ci_a" },
    { slots: [], activeHours: hours, creativeInstances: s.creativeInstances }
  );
  assert.equal(result.ok, true, "a warning does not make it invalid");
  assert.deepEqual(result.errors, []);
  assert.deepEqual(result.warnings, [{ key: "schedule.warn.outsideHours" }]);
  assertKey("schedule.warn.outsideHours");

  // And the list view sees it flagged, via the same normalizeSlots both views use.
  const [row] = normalizeSlots(next.draft.byScreen.s1.slots, { activeHours: hours });
  assert.equal(row.outsideHours, true);
});

register("the 8-slot cap blocks a 9th add but NOT an edit of an existing one", () => {
  let s = withCreative();
  // Eight 1-hour slots from 00:00, each adjacent to the last.
  for (let i = 0; i < 8; i += 1) {
    s = addSlot(s, "s1", `sl_${i}`, i * 60, i * 60 + 60);
  }
  assert.equal(s.draft.byScreen.s1.slots.length, 8, "eight fit");

  const ninth = addSlot(s, "s1", "sl_8", 540, 600);
  assert.equal(ninth, s, "a 9th is refused");

  // The cap must not make the full screen read-only. (Shrinking, because every
  // slot here is adjacent to the next — growing one would clash, correctly.)
  const edited = reducer(s, slotUpdate("s1", "sl_0", { endMin: 30 }));
  assert.notEqual(edited, s, "editing the 8th-of-8 screen still works");
  assert.equal(edited.draft.byScreen.s1.slots.find((x) => x.id === "sl_0").endMin, 30);
  assert.equal(edited.draft.byScreen.s1.slots.length, 8, "and does not add one");
});

register("SLOT_UPDATE excludes a slot from its own overlap test", () => {
  let s = addSlot(withCreative(), "s1", "sl_1", 540, 720);
  s = addSlot(s, "s1", "sl_2", 720, 900);

  // Shrinking sl_1 must not clash with itself.
  const shrunk = reducer(s, slotUpdate("s1", "sl_1", { endMin: 660 }));
  assert.equal(shrunk.draft.byScreen.s1.slots.find((x) => x.id === "sl_1").endMin, 660);

  // Growing it into its neighbour must still be refused.
  const grown = reducer(shrunk, slotUpdate("s1", "sl_1", { endMin: 780 }));
  assert.equal(grown, shrunk, "an edit into a neighbour is rejected");

  assert.equal(reducer(s, slotUpdate("s1", "sl_ghost", { endMin: 600 })), s);
  assert.equal(reducer(s, slotUpdate("s99", "sl_1", { endMin: 600 })), s);
});

register("SLOT_UPDATE allowlists its patch and will not rename a slot", () => {
  const s = addSlot(withCreative(), "s1", "sl_1", 540, 720);

  const next = reducer(
    s,
    slotUpdate("s1", "sl_1", { endMin: 660, id: "sl_hijack", evil: "nope" })
  );
  const [slot] = next.draft.byScreen.s1.slots;
  assert.equal(slot.id, "sl_1", "the id is not patchable");
  assert.equal(slot.endMin, 660, "the real change landed");
  assert.equal("evil" in slot, false, "an undeclared key cannot be stored");
  assert.deepEqual(
    Object.keys(slot).sort(),
    ["enabled", "endMin", "id", "instanceId", "startMin"],
    "exactly the declared shape"
  );

  // Pointing a slot at a creative that does not exist is refused, not stored —
  // that is the ghost-slot invariant from the other direction.
  assert.equal(reducer(s, slotUpdate("s1", "sl_1", { instanceId: "ci_ghost" })), s);
  assert.equal(reducer(s, slotUpdate("s1", "sl_1", { instanceId: null })), s);
});

register("SLOT_ADD refuses an id already on the screen", () => {
  const s = addSlot(withCreative(), "s1", "sl_1", 540, 720);
  const dup = addSlot(s, "s1", "sl_1", 900, 960);
  assert.equal(dup, s, "a duplicate id would overwrite nothing and duplicate everything");
  assert.equal(s.draft.byScreen.s1.slots.length, 1);
});

register("SLOT_REMOVE and SLOTS_CLEAR close the editor sheet behind them", () => {
  let s = addSlot(withCreative(), "s1", "sl_1", 540, 720);
  s = addSlot(s, "s1", "sl_2", 720, 900);
  s = reducer(s, uiEditSlot("sl_1"));
  assert.equal(s.ui.editingSlotId, "sl_1");

  const removed = reducer(s, slotRemove("s1", "sl_1"));
  assert.deepEqual(removed.draft.byScreen.s1.slots.map((x) => x.id), ["sl_2"]);
  assert.equal(removed.ui.editingSlotId, null, "the sheet was bound to the gone slot");
  assert.equal(reducer(removed, slotRemove("s1", "sl_1")), removed, "removing twice is a no-op");

  const cleared = reducer(removed, slotsClear("s1"));
  assert.deepEqual(cleared.draft.byScreen.s1.slots, []);
  assert.equal(reducer(cleared, slotsClear("s1")), cleared, "clearing an empty screen is a no-op");
});

register("ACTIVE_HOURS_SET validates, and rejects an overnight window in v1", () => {
  const s = withCreative();
  const ok = reducer(s, activeHoursSet("s1", { start: 600, end: 1320 }));
  assert.deepEqual(ok.draft.byScreen.s1.activeHours, { start: 600, end: 1320 });
  assert.deepEqual(ok.save.dirtyScreens, ["s1"]);

  assert.equal(reducer(s, activeHoursSet("s1", { start: 1320, end: 120 })), s, "overnight");
  assert.equal(reducer(s, activeHoursSet("s1", { start: 600, end: 600 })), s, "zero width");
  assert.equal(reducer(s, activeHoursSet("s1", { start: 600, end: 620 })), s, "under 30 min");
  assert.equal(reducer(s, activeHoursSet("s1", { start: 540, end: 1260 })), s, "no change");
  assert.equal(reducer(s, activeHoursSet("s99", { start: 600, end: 1320 })), s, "unknown screen");
});

// ---- the save machine ----

register("SAVE_SUCCESS is the only path into `saved`", () => {
  const before = withCreative();
  const edited = addSlot(before, "s1", "sl_1", 540, 720);

  assert.equal(edited.saved, before.saved, "a slot edit leaves `saved` the same object");
  assert.deepEqual(edited.saved.byScreen.s1.slots, [], "and therefore empty");

  // Every other case in the machine must leave it alone too.
  for (const action of [
    saveStart(),
    saveFail("network"),
    saveAppliedSettle(),
    uiEditSlot("sl_1"),
    uiToast("save.error"),
    slotUpdate("s1", "sl_1", { endMin: 780 }),
    activeHoursSet("s1", { start: 600, end: 1200 }),
    slotsClear("s1"),
  ]) {
    assert.equal(
      reducer(edited, action).saved,
      edited.saved,
      `${action.type} must not write saved`
    );
  }

  const saved = reducer(edited, saveSuccess(1700000000000));
  assert.deepEqual(
    saved.saved.byScreen.s1.slots.map((x) => x.id),
    ["sl_1"],
    "only SAVE_SUCCESS commits"
  );
  assert.equal(saved.savedAt, 1700000000000);
});

// The plan's phase-6 acceptance line: previews change only on save.
register("resolveScreen against `saved` returns the OLD answer until the save lands", () => {
  const s = withCreative();
  const edited = addSlot(s, "s1", "sl_1", 540, 900); // covers 13:00

  const beforeSave = resolveScreen(
    edited.saved.byScreen,
    edited.saved.screens,
    edited.creativeInstances,
    "s1",
    780
  );
  assert.equal(beforeSave.kind, "no-content", "the preview has not changed");
  assert.equal(beforeSave.reason, "play.reason.gap");

  // The draft, resolved, already shows it — proving the difference is the source
  // passed in and not the schedule being wrong.
  const draftView = resolveScreen(
    edited.draft.byScreen,
    edited.screens,
    edited.creativeInstances,
    "s1",
    780
  );
  assert.equal(draftView.kind, "creative", "the draft would play it");

  const saved = reducer(edited, saveSuccess(1));
  const afterSave = resolveScreen(
    saved.saved.byScreen,
    saved.saved.screens,
    saved.creativeInstances,
    "s1",
    780
  );
  assert.equal(afterSave.kind, "creative", "and now the preview does too");
  assert.equal(afterSave.instanceId, "ci_a");
});

register("the status chip walks clean -> dirty -> saving -> applied -> saved", () => {
  let s = withCreative();
  // withCreative already dirties (adding a creative is an edit), so start clean.
  s = reducer(s, saveSuccess(1));
  s = reducer(s, saveAppliedSettle());
  assert.equal(s.save.status, "saved");

  s = addSlot(s, "s1", "sl_1", 540, 720);
  assert.equal(s.save.status, "dirty");

  s = reducer(s, saveStart());
  assert.equal(s.save.status, "saving");
  assert.equal(reducer(s, saveStart()), s, "a second Save press while in flight is a no-op");

  s = reducer(s, saveSuccess(2));
  assert.equal(s.save.status, "applied", "the ~2.5s transient, not 'saved'");
  assert.deepEqual(s.save.dirtyScreens, [], "the dots clear on commit");

  s = reducer(s, saveAppliedSettle());
  assert.equal(s.save.status, "saved");
  assert.equal(reducer(s, saveAppliedSettle()), s, "settling twice is a no-op");
  for (const k of ["clean", "dirty", "saving", "saved", "applied", "error"]) {
    assertKey(k === "clean" ? "save.clean" : `save.${k === "dirty" ? "unsaved" : k}`);
  }
});

register("status never reaches 'saved' from SAVE_START without SAVE_SUCCESS", () => {
  const edited = addSlot(withCreative(), "s1", "sl_1", 540, 720);
  const saving = reducer(edited, saveStart());

  // Every action that is not SAVE_SUCCESS, applied through the saving state.
  for (const action of [
    saveFail("network"),
    saveStart(),
    saveAppliedSettle(),
    uiEditSlot("sl_1"),
    uiToast("save.error"),
    selectScreen("s2"),
    simSetTime(900),
    healthTick(),
    slotRemove("s1", "sl_1"),
  ]) {
    const next = reducer(saving, action);
    assert.notEqual(next.save.status, "saved", `${action.type} must not claim success`);
    assert.notEqual(next.save.status, "applied", `nor ${action.type} apply anything`);
  }

  // SAVE_FAIL in particular keeps the work and the dirty marks.
  const failed = reducer(saving, saveFail("network"));
  assert.equal(failed.save.status, "error");
  assert.equal(failed.save.error, "network");
  assert.deepEqual(failed.save.dirtyScreens, ["s1"], "the edits are still unsaved");
  assert.equal(failed.draft.byScreen.s1.slots.length, 1, "and still there to retry");
  assert.deepEqual(failed.saved.byScreen.s1.slots, [], "nothing was committed");
});

register("an edit during the 'applied' transient is not overwritten by the settle", () => {
  let s = reducer(withCreative(), saveSuccess(1));
  assert.equal(s.save.status, "applied");
  s = addSlot(s, "s1", "sl_1", 540, 720);
  assert.equal(s.save.status, "dirty");
  const settled = reducer(s, saveAppliedSettle());
  assert.equal(settled.save.status, "dirty", "the stale timer must not claim 'saved'");
  assert.equal(settled, s, "and it is a no-op outright");
});

register("DISCARD_DRAFT makes draft deep-equal saved again", () => {
  let s = reducer(withCreative(), saveSuccess(1));
  s = addSlot(s, "s1", "sl_1", 540, 720);
  s = reducer(s, activeHoursSet("s2", { start: 600, end: 1200 }));
  s = reducer(s, uiEditSlot("sl_1"));
  assert.notDeepEqual(s.draft.byScreen, s.saved.byScreen, "they have diverged");

  const discarded = reducer(s, discardDraft());
  assert.deepEqual(discarded.draft.byScreen, discarded.saved.byScreen);
  assert.deepEqual(discarded.draft.byScreen.s1.slots, [], "the added slot is gone");
  assert.deepEqual(discarded.draft.byScreen.s2.activeHours, { start: 540, end: 1260 });
  assert.equal(discarded.save.status, "clean");
  assert.deepEqual(discarded.save.dirtyScreens, []);
  assert.equal(discarded.ui.editingSlotId, null);
});

register("`saved` is a deep CLONE — later draft edits cannot reach it", () => {
  /**
   * This test mutates by hand, so the mutation must happen on a state that shares
   * nothing with `initialState`. The reducer spreads, so state.screens IS
   * initialState.screens until a case replaces it — writing through that poisons
   * every later test in this file with an offline screen, which is exactly what
   * it did while being written.
   */
  const real = reducer(addSlot(withCreative(), "s1", "sl_1", 540, 720), saveSuccess(1));

  // Not the same objects at any level. Asserted on the REAL reducer output, so
  // these are meaningful and not an artefact of copying.
  assert.notEqual(real.saved.byScreen, real.draft.byScreen);
  assert.notEqual(real.saved.byScreen.s1, real.draft.byScreen.s1);
  assert.notEqual(real.saved.byScreen.s1.slots, real.draft.byScreen.s1.slots);
  assert.notEqual(real.saved.byScreen.s1.slots[0], real.draft.byScreen.s1.slots[0]);
  assert.notEqual(real.saved.byScreen.s1.activeHours, real.draft.byScreen.s1.activeHours);
  assert.notEqual(real.saved.screens, real.screens);
  assert.notEqual(real.saved.screens[0], real.screens[0]);
  assert.deepEqual(
    real.saved.byScreen.s1.slots,
    real.draft.byScreen.s1.slots,
    "equal, not shared"
  );

  /**
   * Now the hand-mutation, on a detached copy. The identity assertions above
   * already proved saved and draft are distinct objects; what remains to show is
   * that writing through one does not surface in the other, and that has to be
   * done somewhere that cannot reach initialState's own screens array.
   */
  const s = JSON.parse(JSON.stringify(real));
  s.draft.byScreen.s1.slots[0].endMin = 1;
  s.draft.byScreen.s1.slots.push({ id: "sl_x" });
  s.screens[0].online = false;
  assert.equal(s.saved.byScreen.s1.slots[0].endMin, 720, "saved is unaffected");
  assert.equal(s.saved.byScreen.s1.slots.length, 1);
  assert.equal(s.saved.screens[0].online, true);

  // And the shared fixture is still intact for every test after this one.
  assert.equal(initialState.screens[0].online, true, "initialState was not poisoned");
});

register("UI_EDIT_SLOT and UI_TOAST carry keys, not sentences", () => {
  const opened = reducer(initialState, uiEditSlot("sl_1"));
  assert.equal(opened.ui.editingSlotId, "sl_1");
  assert.equal(reducer(opened, uiEditSlot("sl_1")), opened, "idempotent");
  assert.equal(reducer(opened, uiEditSlot(null)).ui.editingSlotId, null);

  const toasted = reducer(initialState, uiToast("save.success", { n: 1 }, "ok"));
  assert.deepEqual(toasted.ui.toast, { key: "save.success", vars: { n: 1 }, tone: "ok" });
  assertKey(toasted.ui.toast.key);
  assert.equal(reducer(toasted, uiToast(null)).ui.toast, null, "a null key clears it");
});

register("the schedule and save cases never mutate frozen state", () => {
  // Build a realistic state, then freeze it and run every case against it.
  let s = withCreative();
  s = addSlot(s, "s1", "sl_1", 540, 720);
  s = addSlot(s, "s1", "sl_2", 720, 900);
  s = reducer(s, saveSuccess(1));
  s = addSlot(s, "s2", "sl_3", 600, 660);
  const frozen = deepFreeze(s);

  for (const action of [
    slotAdd("s1", { id: "sl_4", startMin: 960, endMin: 1020, instanceId: "ci_a" }),
    slotUpdate("s1", "sl_1", { endMin: 660 }),
    slotUpdate("s1", "sl_1", { instanceId: "ci_a", enabled: false }),
    slotRemove("s1", "sl_1"),
    slotsClear("s1"),
    activeHoursSet("s1", { start: 600, end: 1200 }),
    saveStart(),
    saveSuccess(2),
    saveAppliedSettle(),
    saveFail("network"),
    discardDraft(),
    uiEditSlot("sl_2"),
    uiToast("save.saved"),
  ]) {
    reducer(frozen, action); // throws if any case writes in place
  }

  assert.equal(frozen.draft.byScreen.s1.slots.length, 2, "untouched");
  assert.equal(frozen.save.status, "dirty");
});

// ------------------------------ reducer: timeline and clock (phase 7) ----

register("the schedule view is reducer state, so both views share one switch", () => {
  // Not local state: the tutorial asserts on it, and the choice must survive
  // moving between screens and tabs.
  const timeline = reducer(initialState, uiSetScheduleView("timeline"));
  assert.equal(timeline.ui.scheduleView, "timeline");
  assert.equal(reducer(timeline, uiSetScheduleView("timeline")), timeline, "idempotent");
  assert.equal(reducer(timeline, uiSetScheduleView("list")).ui.scheduleView, "list");

  // Switching view is not an edit, so it must not dirty anything — otherwise
  // merely looking at the rail would light the save chip.
  let s = reducer(initialState, creativeAdd("ci_a", TPL, {}, 1));
  s = reducer(s, saveSuccess(1));
  s = reducer(s, saveAppliedSettle());
  const looked = reducer(s, uiSetScheduleView("timeline"));
  assert.equal(looked.save.status, "saved", "looking at the other view is not an edit");
  assert.deepEqual(looked.save.dirtyScreens, []);
  assert.equal(looked.draft, s.draft, "and the draft is the same object");
});

register("SIM_SET_SPEED takes the three paces the clock offers", () => {
  for (const speed of [1, 60, 180]) {
    assert.equal(reducer(initialState, simSetSpeed(speed)).sim.speed, speed);
  }
  // A speed change must not move the clock or start it.
  const fast = reducer(initialState, simSetSpeed(180));
  assert.equal(fast.sim.nowMin, initialState.sim.nowMin);
  assert.equal(fast.sim.playing, false);
});

register("the clock crosses a slot boundary exactly once", () => {
  // The half-open rule, through the clock rather than through overlaps(): at
  // 12:00 the 09:00-12:00 slot has stopped and nothing else has started.
  let s = reducer(initialState, creativeAdd("ci_a", TPL, {}, 1));
  // 10:00-12:00, so both boundaries fall INSIDE the default 09:00-21:00 window
  // and the answer isolates the slot rather than the active hours.
  s = reducer(s, slotAdd("s1", { id: "sl_1", startMin: 600, endMin: 720, instanceId: "ci_a" }));
  s = reducer(s, saveSuccess(1));

  const at = (nowMin) =>
    resolveScreen(s.saved.byScreen, s.saved.screens, s.creativeInstances, "s1", nowMin);

  assert.equal(at(599).kind, "no-content", "the minute before it starts");
  assert.equal(at(599).reason, "play.reason.gap", "and it says why");
  assert.equal(at(600).kind, "creative", "the first minute is inside");
  assert.equal(at(719).kind, "creative", "the last minute is inside");
  assert.equal(at(720).kind, "no-content", "and the end boundary is not");
  // Outside active hours it is idle, which is a different state from a gap.
  assert.equal(at(480).kind, "idle", "08:00 is before opening");
});

register("SIM_TICK walks the day at each speed without drifting off the rail", () => {
  for (const speed of [1, 60, 180]) {
    let s = { ...initialState, sim: { nowMin: 0, playing: true, speed } };
    // A full day's worth of ticks must land back where it started, which is what
    // makes the playhead's position a pure function of nowMin.
    for (let i = 0; i < 1440 / speed; i += 1) s = reducer(s, simTick());
    assert.equal(s.sim.nowMin, 0, `speed ${speed} wraps cleanly`);
    assert.ok(s.sim.nowMin >= 0 && s.sim.nowMin < 1440, "and stays on the rail");
  }
});

register("findGaps describes exactly what the rail hatches", () => {
  // The rail draws these, so the geometry it hands them must be in range and
  // ordered — a gap outside active hours would be drawn over the dimmed ground.
  const hours = { start: 540, end: 1260 };
  const slots = [
    { id: "a", startMin: 540, endMin: 720, instanceId: "ci", enabled: true },
    { id: "b", startMin: 900, endMin: 1080, instanceId: "ci", enabled: true },
  ];
  const gaps = findGaps(slots, hours);
  assert.deepEqual(gaps, [
    { startMin: 720, endMin: 900 },
    { startMin: 1080, endMin: 1260 },
  ]);
  for (const gap of gaps) {
    assert.ok(gap.startMin >= hours.start && gap.endMin <= hours.end, "inside the hours");
    const g = slotGeometry(gap);
    assert.ok(parseFloat(g.width) > 0, "and has a drawable width");
  }
  // A fully covered window leaves nothing to hatch.
  assert.deepEqual(
    findGaps([{ id: "c", startMin: 540, endMin: 1260, instanceId: "ci", enabled: true }], hours),
    []
  );
});

// ------------------------- reducer: role and mirroring (phase 8) ----

/** Link b -> a, so b mirrors a. */
function mirror(state, b, a) {
  return reducer(state, setMirror(b, a));
}

register("SET_MIRROR links a secondary and marks only that screen dirty", () => {
  const next = mirror(initialState, "s2", "s1");
  const s2 = next.screens.find((s) => s.id === "s2");
  assert.equal(s2.role, "secondary");
  assert.equal(s2.mirrors, "s1");
  assert.deepEqual(next.save.dirtyScreens, ["s2"], "the follower changed, not the primary");
  assert.equal(
    next.screens.find((s) => s.id === "s1").role,
    "primary",
    "the primary is untouched"
  );
  assert.equal(mirror(next, "s2", "s1"), next, "re-linking the same pair is a no-op");
});

// The two blocked shapes from the plan's acceptance line.
register("a screen cannot mirror ITSELF", () => {
  const next = mirror(initialState, "s2", "s2");
  assert.equal(next.screens.find((s) => s.id === "s2").role, "primary", "nothing changed");
  assert.equal(next.save.status, "clean", "and it is not an edit");
  assert.equal(next.ui.toast.key, "screens.cannotMirrorSelf", "it says why");
  assertKey(next.ui.toast.key);
});

register("A -> B -> A is blocked", () => {
  const linked = mirror(initialState, "s2", "s1"); // s2 mirrors s1
  const cycle = mirror(linked, "s1", "s2"); // s1 would mirror s2
  assert.equal(
    cycle.screens.find((s) => s.id === "s1").role,
    "primary",
    "the loop is refused"
  );
  assert.equal(cycle.ui.toast.key, "screens.cannotMirrorCycle");
  assertKey(cycle.ui.toast.key);
  // And so is the longer way round: s3 -> s2 -> s1, then s1 -> s3.
  let chain = mirror(initialState, "s2", "s1");
  chain = mirror(chain, "s3", "s2");
  const long = mirror(chain, "s1", "s3");
  assert.equal(long.screens.find((s) => s.id === "s1").role, "primary", "3-hop loop refused");
  assert.equal(long.ui.toast.key, "screens.cannotMirrorCycle");
});

register("a legal chain of mirrors still resolves to the one primary", () => {
  // s3 -> s2 -> s1 is not a cycle, and every screen in it shows s1's content.
  let s = mirror(initialState, "s2", "s1");
  s = mirror(s, "s3", "s2");
  const chain = resolveChain(s.screens, "s3");
  assert.equal(chain.status, "ok");
  assert.equal(chain.sourceId, "s1", "two hops up to the primary");
  assert.equal(chain.mirrored, true);
  assert.deepEqual(chain.path, ["s3", "s2", "s1"]);
});

register("a mirror shows the primary's content, INCLUDING its idle state", () => {
  // The plan's phase 8 acceptance line, and the one semantic judgement call in
  // playback.js: a secondary honours its PRIMARY's hours, not its own.
  let s = reducer(initialState, creativeAdd("ci_a", TPL, { headline: "Lunch" }, 1));
  s = reducer(s, slotAdd("s1", { id: "sl_1", startMin: 540, endMin: 720, instanceId: "ci_a" }));
  // s1 closes at 18:00; s2 would be open until 21:00 on its own stored hours.
  s = reducer(s, activeHoursSet("s1", { start: 540, end: 1080 }));
  s = mirror(s, "s2", "s1");
  s = reducer(s, saveSuccess(1));

  const at = (screenId, nowMin) =>
    resolveScreen(s.saved.byScreen, s.saved.screens, s.creativeInstances, screenId, nowMin);

  // Inside s1's hours and inside the slot: both show the creative.
  assert.equal(at("s1", 600).kind, "creative");
  assert.equal(at("s2", 600).kind, "creative", "the mirror plays it too");
  assert.equal(at("s2", 600).sourceScreenId, "s1");
  assert.equal(at("s2", 600).mirrored, true);

  // After s1 closes, the mirror goes idle WITH it — not on its own 21:00.
  assert.equal(at("s1", 1140).kind, "idle", "19:00 is past s1's closing");
  assert.equal(at("s2", 1140).kind, "idle", "and the mirror is idle too");
  assert.equal(at("s2", 1140).reason, "play.reason.outsideHours");
});

register("a mirror ignores its OWN slots — they are unreachable, not a fallback", () => {
  // The trap: a secondary with a stored schedule must show its primary's state,
  // including the primary's emptiness, rather than quietly playing its own.
  let s = reducer(initialState, creativeAdd("ci_a", TPL, {}, 1));
  s = reducer(s, slotAdd("s2", { id: "sl_own", startMin: 540, endMin: 900, instanceId: "ci_a" }));
  s = mirror(s, "s2", "s1"); // s1 has no slots at all
  s = reducer(s, saveSuccess(1));

  const r = resolveScreen(s.saved.byScreen, s.saved.screens, s.creativeInstances, "s2", 780);
  assert.equal(r.kind, "no-content", "it reports the primary's gap");
  assert.equal(r.reason, "play.reason.gap");
  assert.equal(r.sourceScreenId, "s1", "resolved through the primary");
  assert.notEqual(r.kind, "creative", "and never plays its own hidden slot");

  // But the slot is KEPT, so promotion is not destructive and neither is an
  // accidental demote followed by an undo.
  assert.equal(s.draft.byScreen.s2.slots.length, 1, "the stored slot survives");
});

register("a mirror of an OFFLINE primary is dark, and says whose fault it is", () => {
  let s = mirror(initialState, "s2", "s1");
  s = reducer(s, saveSuccess(1));
  s = reducer(s, toggleScreenOnline("s1"));

  const r = resolveScreen(s.saved.byScreen, s.saved.screens, s.creativeInstances, "s2", 780);
  assert.equal(r.kind, "offline");
  assert.equal(
    r.reason,
    "play.reason.primaryOffline",
    "it blames the primary, not this screen"
  );
  assertKey(r.reason);
  // Its own offline state is a different message.
  const own = resolveScreen(s.saved.byScreen, s.saved.screens, s.creativeInstances, "s1", 780);
  assert.equal(own.reason, "play.reason.offline");
});

register("a secondary pointing nowhere is a broken link, not a silent primary", () => {
  // Demoting without naming a target is representable, and must not fall back to
  // the screen's own (unreachable) schedule.
  const s = reducer(initialState, setScreenRole("s2", "secondary"));
  const screen = s.screens.find((x) => x.id === "s2");
  assert.equal(screen.role, "secondary");
  assert.equal(screen.mirrors, null);

  const saved = reducer(s, saveSuccess(1));
  const r = resolveScreen(
    saved.saved.byScreen,
    saved.saved.screens,
    saved.creativeInstances,
    "s2",
    780
  );
  assert.equal(r.kind, "broken-link");
  assert.equal(r.reason, "play.reason.unknownScreen");
});

register("promoting a secondary inherits a COPY of what it was showing", () => {
  let s = reducer(initialState, creativeAdd("ci_a", TPL, { headline: "Lunch" }, 1));
  s = reducer(s, slotAdd("s1", { id: "sl_1", startMin: 540, endMin: 720, instanceId: "ci_a" }));
  s = reducer(s, activeHoursSet("s1", { start: 600, end: 1200 }));
  s = mirror(s, "s2", "s1");

  const promoted = reducer(s, setScreenRole("s2", "primary", { slotIds: ["sl_new"] }));
  const screen = promoted.screens.find((x) => x.id === "s2");
  assert.equal(screen.role, "primary");
  assert.equal(screen.mirrors, null, "the link is gone");

  const cfg = promoted.draft.byScreen.s2;
  assert.deepEqual(cfg.activeHours, { start: 600, end: 1200 }, "it kept the hours it had");
  assert.equal(cfg.slots.length, 1, "and the slot that was playing");
  assert.equal(cfg.slots[0].instanceId, "ci_a");
  assert.equal(cfg.slots[0].startMin, 540);

  // A COPY. Fresh slot ids, and no shared arrays or objects with the source.
  assert.equal(cfg.slots[0].id, "sl_new", "the caller's fresh id, not the source's");
  assert.notEqual(cfg.slots[0].id, "sl_1", "two screens must not share a slot id");
  assert.notEqual(cfg.slots, promoted.draft.byScreen.s1.slots);
  assert.notEqual(cfg.slots[0], promoted.draft.byScreen.s1.slots[0]);
  assert.notEqual(cfg.activeHours, promoted.draft.byScreen.s1.activeHours);

  // Editing the promoted screen must not reach back into its old primary.
  const edited = reducer(promoted, slotUpdate("s2", "sl_new", { endMin: 660 }));
  assert.equal(edited.draft.byScreen.s2.slots[0].endMin, 660);
  assert.equal(
    edited.draft.byScreen.s1.slots[0].endMin,
    720,
    "the former primary is untouched"
  );
});

register("promotion falls back to a derived slot id when the caller forgets", () => {
  // Not a licence to forget — but a duplicate id across two screens is worse than
  // an ugly one, so the fallback is deterministic rather than absent.
  let s = reducer(initialState, creativeAdd("ci_a", TPL, {}, 1));
  s = reducer(s, slotAdd("s1", { id: "sl_1", startMin: 540, endMin: 720, instanceId: "ci_a" }));
  s = mirror(s, "s2", "s1");
  const promoted = reducer(s, setScreenRole("s2", "primary"));
  const id = promoted.draft.byScreen.s2.slots[0].id;
  assert.notEqual(id, "sl_1", "still not a shared id");
  assert.equal(id, "sl_1_s2");
});

register("CLEAR_MIRROR is promotion, through the same path", () => {
  let s = reducer(initialState, creativeAdd("ci_a", TPL, {}, 1));
  s = reducer(s, slotAdd("s1", { id: "sl_1", startMin: 540, endMin: 720, instanceId: "ci_a" }));
  s = mirror(s, "s2", "s1");

  const cleared = reducer(s, clearMirror("s2", ["sl_c"]));
  const screen = cleared.screens.find((x) => x.id === "s2");
  assert.equal(screen.role, "primary");
  assert.equal(screen.mirrors, null);
  assert.equal(cleared.draft.byScreen.s2.slots[0].id, "sl_c", "and it inherits, as promotion does");
  // Only meaningful on a secondary.
  assert.equal(reducer(cleared, clearMirror("s2")), cleared, "already primary");
  assert.equal(reducer(cleared, clearMirror("s99")), cleared, "unknown screen");
});

register("demoting a screen that has followers leaves them following it", () => {
  // s3 mirrors s2; then s2 is pointed at s1. s3 now follows s2 -> s1, which is a
  // legal two-hop chain, so the dialog warns rather than the reducer refusing.
  let s = mirror(initialState, "s3", "s2");
  s = mirror(s, "s2", "s1");

  assert.deepEqual(
    followersOf(s.screens, "s2").map((x) => x.id),
    ["s3"],
    "s3 still points at s2"
  );
  assert.deepEqual(
    allFollowersOf(s.screens, "s1").map((x) => x.id).sort(),
    ["s2", "s3"],
    "and both are downstream of s1 — what the dialog counts"
  );
  // Every one of them resolves to s1's config.
  for (const id of ["s2", "s3"]) {
    assert.equal(resolveChain(s.screens, id).sourceId, "s1");
  }
});

register("role and mirror edits are DRAFT-only — previews wait for the save", () => {
  // The subtle invariant: saved.screens, not screens. Getting this wrong leaks a
  // mirror link into the wall before the visitor saves.
  let s = reducer(initialState, creativeAdd("ci_a", TPL, {}, 1));
  s = reducer(s, slotAdd("s1", { id: "sl_1", startMin: 540, endMin: 900, instanceId: "ci_a" }));
  s = reducer(s, saveSuccess(1));
  s = reducer(s, saveAppliedSettle());

  const linked = mirror(s, "s2", "s1");
  assert.equal(linked.save.status, "dirty", "it is an edit");
  assert.equal(
    linked.saved.screens.find((x) => x.id === "s2").role,
    "primary",
    "the saved snapshot still says primary"
  );

  // So the preview does NOT yet show s1's content on s2.
  const before = resolveScreen(
    linked.saved.byScreen,
    linked.saved.screens,
    linked.creativeInstances,
    "s2",
    780
  );
  assert.equal(before.kind, "no-content", "s2 is still showing its own empty schedule");
  assert.equal(before.mirrored, false);

  const after = reducer(linked, saveSuccess(2));
  const r = resolveScreen(
    after.saved.byScreen,
    after.saved.screens,
    after.creativeInstances,
    "s2",
    780
  );
  assert.equal(r.kind, "creative", "and only now does the mirror light up");
  assert.equal(r.mirrored, true);
  assert.equal(r.sourceScreenId, "s1");
});

register("mirrorCandidates offers only links that would be legal", () => {
  let s = mirror(initialState, "s2", "s1");
  s = mirror(s, "s3", "s2");

  // s1 may not point at s2 or s3 — both would close a loop through s1.
  const forS1 = mirrorCandidates(s.screens, "s1").map((x) => x.id);
  assert.deepEqual(forS1.sort(), ["s4", "s5"], "only the unrelated screens");
  assert.equal(forS1.includes("s1"), false, "never itself");

  // Every offered link must actually be accepted by the reducer.
  for (const target of forS1) {
    const next = reducer(s, setMirror("s1", target));
    assert.equal(next.ui.toast, null, `${target} was offered and refused`);
    assert.equal(next.screens.find((x) => x.id === "s1").mirrors, target);
  }
});

register("HEALTH_TICK figures are reproducible and never claim perfection", () => {
  const s = reducer(initialState, healthTick());
  const h = allScreenHealth(s.screens, s.sim.nowMin, s.health.tick);
  for (const [id, entry] of Object.entries(h)) {
    assert.ok(entry.uptimePct < 100, `${id} must not claim 100% uptime`);
    assert.ok(entry.uptimePct >= 97, `${id} is online, so it should read healthy`);
    assert.equal(entry.online, true);
  }
  // Same tick, same numbers — which is why the reducer stores a counter.
  assert.deepEqual(allScreenHealth(s.screens, s.sim.nowMin, s.health.tick), h);
  // A different tick genuinely re-rolls.
  const next = reducer(s, healthTick());
  assert.notDeepEqual(allScreenHealth(next.screens, next.sim.nowMin, next.health.tick), h);
});

register("an offline screen reads as stale, not as 'last seen now'", () => {
  const s = reducer(initialState, toggleScreenOnline("s2"));
  const h = screenHealth(
    s.screens.find((x) => x.id === "s2"),
    780,
    0
  );
  assert.equal(h.online, false);
  assert.ok(h.staleMinutes >= 2, "a dark screen was last seen a while ago");
  assert.notEqual(h.lastSeenMin, 780, "not the current minute");
  assert.ok(h.uptimePct < 95, "and its uptime reflects the outage");
});

register("playback is a separate axis from connectivity", () => {
  // An online screen outside its hours is healthy AND not playing. Both rows.
  let s = reducer(initialState, creativeAdd("ci_a", TPL, {}, 1));
  s = reducer(s, slotAdd("s1", { id: "sl_1", startMin: 540, endMin: 720, instanceId: "ci_a" }));
  s = reducer(s, saveSuccess(1));

  const resolutions = resolveAllScreens(
    s.saved.byScreen,
    s.saved.screens,
    s.creativeInstances,
    120 // 02:00 — outside the default window
  );
  const h = allScreenHealth(s.saved.screens, 120, s.health.tick, resolutions);
  assert.equal(h.s1.online, true, "connectivity is fine");
  assert.equal(h.s1.playing, false, "but nothing is playing");
  assert.equal(h.s1.playbackReason, "play.reason.outsideHours", "and it says which");
  assertKey(h.s1.playbackReason);
});

register("the role and mirror cases never mutate frozen state", () => {
  let s = reducer(initialState, creativeAdd("ci_a", TPL, {}, 1));
  s = reducer(s, slotAdd("s1", { id: "sl_1", startMin: 540, endMin: 720, instanceId: "ci_a" }));
  s = mirror(s, "s2", "s1");
  const frozen = deepFreeze(s);

  for (const action of [
    setMirror("s3", "s1"),
    setMirror("s3", "s3"),
    setMirror("s1", "s2"),
    setScreenRole("s2", "primary", { slotIds: ["sl_x"] }),
    setScreenRole("s4", "secondary", { mirrors: "s1" }),
    clearMirror("s2", ["sl_y"]),
  ]) {
    reducer(frozen, action); // throws if any case writes in place
  }

  assert.equal(frozen.screens.find((x) => x.id === "s2").mirrors, "s1", "untouched");
  assert.equal(frozen.screens.find((x) => x.id === "s3").role, "primary");
  assert.equal(frozen.draft.byScreen.s1.slots.length, 1);
});

// ----------------------------------- the language-switch guarantee (p9) ----

/**
 * The explicit brief requirement, asserted structurally rather than by clicking.
 *
 * A language switch must not reset business details, the selected screen, draft
 * edits, saved config or tutorial progress. That holds because of THREE
 * properties, and each is checkable here:
 *   1. `lang` is not in the reducer's state shape, so no action can carry it.
 *   2. No reducer case reads it, so the same action gives the same result
 *      whatever the language.
 *   3. No state value is a translated string — they are i18n KEYS — so nothing
 *      stored needs re-deriving when the language changes.
 * The fourth property (no key={lang} above TestDriveProvider) is a JSX fact,
 * commented at the provider and not reachable from here.
 */
register("the reducer has no notion of language at all", () => {
  const keys = Object.keys(initialState);
  assert.equal(keys.includes("lang"), false, "lang is not in the state shape");
  assert.equal(keys.includes("language"), false);
  assert.equal(keys.includes("locale"), false);
  // Nor nested anywhere: a lang hidden in ui or business would reset just as hard.
  const json = JSON.stringify(initialState);
  for (const probe of ['"lang"', '"locale"', '"language"']) {
    assert.equal(json.includes(probe), false, `${probe} appears in the state shape`);
  }
});

register("a full mid-edit session is identical whatever the language", () => {
  /**
   * There is no language to pass in, so "switching" cannot be simulated by
   * dispatching. What CAN be proved is the thing that makes a switch safe: the
   * reducer is a pure function of (state, action) with no other input, so the
   * same sequence always lands in the same state. Were a case reading a locale
   * from anywhere — navigator.language, a module global — this would be the test
   * that caught it, because the run below is deterministic.
   */
  const run = () => {
    let s = initialState;
    s = reducer(s, businessField("businessName", "गंगा ढाबा"));
    s = reducer(s, businessField("industry", "cafe"));
    s = reducer(s, businessSubmitOk("lead_1"));
    s = reducer(s, enterConsole());
    s = reducer(s, selectScreen("s3"));
    s = reducer(s, creativeAdd("ci_a", TPL, { headline: "दोपहर का भोजन" }, 1));
    s = reducer(s, slotAdd("s3", { id: "sl_1", startMin: 540, endMin: 720, instanceId: "ci_a" }));
    s = reducer(s, saveSuccess(1));
    s = reducer(s, saveAppliedSettle());
    // Unsaved work on top of the save, so the test covers draft AND saved.
    s = reducer(s, slotAdd("s3", { id: "sl_2", startMin: 720, endMin: 900, instanceId: "ci_a" }));
    s = reducer(s, activeHoursSet("s3", { start: 600, end: 1320 }));
    s = reducer(s, setMirror("s4", "s3"));
    s = reducer(s, uiSetScheduleView("timeline"));
    return s;
  };

  assert.deepEqual(run(), run(), "the reducer is a pure function of its inputs");

  // And the things the brief names are all present and distinct afterwards.
  const s = run();
  assert.equal(s.business.businessName, "गंगा ढाबा", "business details survive");
  assert.equal(s.business.industry, "cafe");
  assert.equal(s.lead.id, "lead_1", "the lead id survives");
  assert.equal(s.selectedScreenId, "s3", "selection survives");
  assert.equal(s.draft.byScreen.s3.slots.length, 2, "draft edits survive");
  assert.deepEqual(s.draft.byScreen.s3.activeHours, { start: 600, end: 1320 });
  assert.equal(s.saved.byScreen.s3.slots.length, 1, "and saved is still its own thing");
  assert.equal(s.screens.find((x) => x.id === "s4").mirrors, "s3", "role edits survive");
  assert.equal(s.ui.scheduleView, "timeline");
  assert.equal(s.save.status, "dirty");
});

register("no stored value is a translated string — every one is a key", () => {
  // Copy resolves at render via t(). A sentence in state would have to be
  // re-derived on a language switch, and nothing does that.
  let s = reducer(initialState, creativeAdd("ci_a", TPL, {}, 1));
  s = reducer(s, setMirror("s2", "s2")); // rejected, so it sets a toast
  assert.ok(s.ui.toast, "a toast was set");
  // The toast carries a key, not a sentence: it resolves in both dictionaries
  // and has no spaces, which a sentence would.
  assertKey(s.ui.toast.key);
  assert.equal(s.ui.toast.key.includes(" "), false, "a key has no spaces");

  // The one deliberate exception is visitor-supplied creative text, which is
  // their own words and must NOT be translated.
  s = reducer(s, creativeField("ci_a", "headline", "मेरा ऑफ़र"));
  assert.equal(s.creativeInstances.ci_a.fields.headline, "मेरा ऑफ़र", "their text is kept verbatim");
});

register("both industries resolve to a full, correctly-filed library", () => {
  for (const [industry, prefix] of [
    ["restaurant", "r_"],
    ["cafe", "c_"],
  ]) {
    const list = creativesFor(industry);
    assert.equal(list.length, 8, `${industry} has eight creatives`);
    for (const tpl of list) {
      assert.equal(tpl.industry, industry, `${tpl.id} is filed under ${industry}`);
      assert.ok(tpl.id.startsWith(prefix), `${tpl.id} carries the ${prefix} prefix`);
      assert.ok(getTemplate(tpl.id), `${tpl.id} resolves through the registry`);
      // Names and descriptions must read in both languages.
      assertKey(tpl.nameKey);
      assertKey(tpl.descKey);
    }
  }
  assert.equal(allCreatives.length, 16, "sixteen in total");
  // Café no longer falls back to restaurant, which it did until this phase.
  assert.notDeepEqual(creativesFor("cafe"), creativesFor("restaurant"));
  // An industry the intake form does not offer still gets a library rather than
  // an empty panel — reachable via stale persisted state.
  assert.deepEqual(creativesFor("laundromat"), creativesFor("restaurant"));
});

// ------------------------------- audio engine and tutorial (phase 10) ----

/**
 * A stand-in for HTMLAudioElement.
 *
 * The engine's status machine is driven entirely by media events, so a stub that
 * records what was asked of it and can fire those events is enough to exercise
 * every transition in node. It goes through the engine's own wire() — see
 * __reset — so this tests the production listeners, not a copy of them.
 */
function stubAudio({ failOnPlay = null } = {}) {
  const handlers = {};
  return {
    src: "",
    muted: false,
    currentTime: 0,
    preload: "",
    paused: true,
    plays: 0,
    pauses: 0,
    addEventListener(type, fn) {
      (handlers[type] ||= []).push(fn);
    },
    removeAttribute(name) {
      if (name === "src") this.src = "";
    },
    async play() {
      this.plays += 1;
      if (failOnPlay) {
        const err = new Error(failOnPlay);
        err.name = failOnPlay;
        throw err;
      }
      this.paused = false;
      this.fire("playing");
    },
    pause() {
      this.pauses += 1;
      this.paused = true;
      this.fire("pause");
    },
    /** Fire a media event, as the browser would. */
    fire(type) {
      for (const fn of handlers[type] ?? []) fn();
    },
  };
}

registerSerial("audio: a cue loads, plays and ends, and the status follows", async () => {
  const el = engine.__reset(stubAudio());
  assert.equal(engine.getState().status, "idle");

  const result = await engine.play("welcome", "en");
  assert.equal(result, "playing");
  assert.equal(el.src, "/assets/audio/en/00_welcome.mp3", "the manifest's path");
  assert.equal(engine.getState().status, "playing");
  assert.equal(engine.getState().cueId, "welcome");

  el.fire("ended");
  assert.equal(engine.getState().status, "ended");
  // A pause event after the end must not overwrite the terminal state.
  el.fire("pause");
  assert.equal(engine.getState().status, "ended", "ended is terminal");
});

registerSerial("audio: only ONE narration ever plays", async () => {
  const el = engine.__reset(stubAudio());
  await engine.play("welcome", "en");
  assert.equal(engine.getState().cueId, "welcome");

  await engine.play("exploreScreens", "en");
  assert.equal(engine.getState().cueId, "exploreScreens", "the second cue took over");
  assert.ok(el.pauses >= 1, "and the first was stopped, not left running");
  assert.equal(el.src, "/assets/audio/en/01_explore_screens.mp3");
});

registerSerial("audio: a language switch stops cleanly, with no src left loaded", async () => {
  const el = engine.__reset(stubAudio());
  await engine.play("exploreScreens", "en");
  engine.stop();
  assert.equal(engine.getState().status, "idle");
  assert.equal(engine.getState().cueId, null);
  // Clearing src matters: a paused element with a src keeps buffering and could
  // resume in the OLD language after the switch.
  assert.equal(el.src, "", "the recording is detached, not merely paused");

  // The new language then plays its own file.
  await engine.play("exploreScreens", "hi");
  assert.equal(el.src, "/assets/audio/hi/01_explore_screens.mp3");
});

registerSerial("audio: a missing file resolves the loading state rather than hanging", async () => {
  const el = engine.__reset(stubAudio());
  const pending = engine.play("welcome", "en");
  await pending;
  // The browser discovers the 404 asynchronously, after play() resolved.
  el.fire("error");
  assert.equal(engine.getState().status, "error", "the loading state is resolved");
  assert.equal(engine.hasFailed("welcome", "en"), true, "and remembered");
  assert.equal(engine.hasFailed("welcome", "hi"), false, "per language — files differ");

  // A retry must not re-request a known 404 on every mission change.
  const before = el.plays;
  const result = await engine.play("welcome", "en");
  assert.equal(result, "error");
  assert.equal(el.plays, before, "no second request for a file known to be missing");
});

registerSerial("audio: a blocked autoplay is NORMAL, not an error", async () => {
  // Mobile rejects play() outside a user gesture. That must not show the
  // "narration unavailable" indicator, because nothing is wrong with the file.
  engine.__reset(stubAudio({ failOnPlay: "NotAllowedError" }));
  const result = await engine.play("welcome", "en");
  assert.equal(result, "blocked");
  assert.equal(engine.getState().status, "paused", "resumable, not failed");
  assert.notEqual(engine.getState().status, "error");

  // A file that genuinely cannot be decoded IS an error, and is told apart by
  // the DOMException name rather than lumped in with autoplay.
  engine.__reset(stubAudio({ failOnPlay: "NotSupportedError" }));
  assert.equal(await engine.play("welcome", "en"), "error");
  assert.equal(engine.getState().status, "error");
});

registerSerial("audio: no Audio constructor degrades to unavailable, never throws", async () => {
  engine.__reset(null); // no element, and node has no global Audio
  const result = await engine.play("welcome", "en");
  assert.equal(result, "unavailable");
  assert.equal(engine.getState().status, "unavailable");
  // And the rest of the surface stays callable rather than exploding.
  engine.pause();
  engine.stop();
  engine.setMuted(true);
  assert.equal(engine.isMuted(), true);
});

registerSerial("audio: an unknown cue is refused without touching the element", async () => {
  const el = engine.__reset(stubAudio());
  assert.equal(await engine.play("nope", "en"), "unknown");
  assert.equal(el.plays, 0);
  assert.equal(cuePath("nope", "en"), null);
  assert.equal(cuePath("welcome", "de"), null, "and an unknown language");
});

registerSerial("audio: subscribers get a fresh snapshot per change", async () => {
  engine.__reset(stubAudio());
  const seen = [];
  const off = engine.subscribe((s) => seen.push(s));
  assert.equal(seen.length, 1, "the current state arrives immediately");

  await engine.play("welcome", "en");
  assert.ok(seen.length > 1, "and again on each change");
  // Fresh objects: subscribers compare by identity to decide whether to render.
  assert.notEqual(seen[0], seen[seen.length - 1]);
  off();
  const count = seen.length;
  engine.stop();
  assert.equal(seen.length, count, "unsubscribe stops delivery");
});

registerSerial("audio: every mission cue and both hours exist in the manifest", () => {
  assert.equal(CUE_IDS.length, 11, "eleven cues");
  for (const cueId of CUE_IDS) {
    for (const lang of ["en", "hi"]) {
      const path = cuePath(cueId, lang);
      assert.match(path, /^\/assets\/audio\/(en|hi)\/\d\d_[a-z_]+\.mp3$/, `${cueId} ${lang}`);
      assert.ok(path.includes(`/${lang}/`), "filed under its language");
    }
  }
  // One file name per cue, both languages derived — so en and hi cannot drift
  // apart in name and 404 in one language only.
  for (const cueId of CUE_IDS) {
    const en_ = cuePath(cueId, "en").split("/").pop();
    const hi_ = cuePath(cueId, "hi").split("/").pop();
    assert.equal(en_, hi_, `${cueId}: the two languages share a file name`);
  }
});

// ---- the missions ----

register("every mission is well formed and reads in both languages", () => {
  assert.equal(MISSIONS.length, 6, "the brief's six missions");
  const ids = new Set();
  const orders = new Set();
  for (const m of MISSIONS) {
    assert.ok(m.id, "has an id");
    assert.equal(ids.has(m.id), false, `duplicate mission id ${m.id}`);
    ids.add(m.id);
    assert.equal(orders.has(m.order), false, `duplicate order ${m.order}`);
    orders.add(m.order);
    assertKey(m.titleKey);
    assertKey(m.bodyKey);
    assertKey(m.hintKey);
    assert.ok(CUES[m.cueId], `${m.id}: cue "${m.cueId}" is not in the manifest`);
    assert.equal(typeof m.isComplete, "function", `${m.id}: no predicate`);
    assert.equal(typeof m.target, "string", `${m.id}: no spotlight target`);
  }
  assert.deepEqual([...orders].sort((a, b) => a - b), [1, 2, 3, 4, 5, 6]);
});

register("NO mission is already complete at the start", () => {
  // A mission true on arrival teaches nothing and would advance itself. The one
  // that nearly was is m1: s1 is selected by default, which is why its predicate
  // requires a DIFFERENT screen.
  for (const m of MISSIONS) {
    assert.equal(m.isComplete(initialState), false, `${m.id} is already satisfied`);
  }
});

register("each mission is completed by its own action and no other", () => {
  /** Build the state each mission's action produces, from a clean start. */
  const steps = {
    m1: (s) => reducer(reducer(s, selectScreen("s2")), uiSetWallView("list")),
    m2: (s) => reducer(s, healthTick()),
    m3: (s) => {
      let n = reducer(s, creativeAdd("ci_a", TPL, {}, 1));
      return reducer(n, slotAdd("s1", { id: "sl_1", startMin: 540, endMin: 720, instanceId: "ci_a" }));
    },
    m4: (s) => reducer(s, setMirror("s2", "s1")),
    m5: (s) => reducer(s, toggleScreenOnline("s3")),
    m6: (s) => reducer(s, saveSuccess(1)),
  };

  for (const m of MISSIONS) {
    const after = steps[m.id](initialState);
    assert.equal(m.isComplete(after), true, `${m.id} is not completed by its own action`);
    // And the action must not accidentally satisfy a LATER mission, which would
    // let the visitor skip past something they were never shown.
    for (const other of MISSIONS) {
      if (other.id === m.id) continue;
      if (other.order < m.order) continue;
      assert.equal(
        other.isComplete(after),
        false,
        `${m.id}'s action also completed ${other.id}`
      );
    }
  }
});

register("m1 needs BOTH halves of its action", () => {
  const selected = reducer(initialState, selectScreen("s2"));
  assert.equal(MISSIONS[0].isComplete(selected), false, "selecting alone is not enough");
  const viewed = reducer(initialState, uiSetWallView("list"));
  assert.equal(MISSIONS[0].isComplete(viewed), false, "nor switching view alone");
  assert.equal(MISSIONS[0].isComplete(reducer(selected, uiSetWallView("list"))), true);
});

register("m3 needs a creative AND a time for it", () => {
  const m3 = MISSIONS[2];
  const withCreativeOnly = reducer(initialState, creativeAdd("ci_a", TPL, {}, 1));
  assert.equal(m3.isComplete(withCreativeOnly), false, "a creative that never plays");
  const scheduled = reducer(
    withCreativeOnly,
    slotAdd("s1", { id: "sl_1", startMin: 540, endMin: 720, instanceId: "ci_a" })
  );
  assert.equal(m3.isComplete(scheduled), true);
});

register("m4 needs a real link, not just the secondary role", () => {
  const m4 = MISSIONS[3];
  // A secondary pointing nowhere is a broken link, not a finished mission.
  const orphaned = reducer(initialState, setScreenRole("s2", "secondary"));
  assert.equal(orphaned.screens.find((x) => x.id === "s2").role, "secondary");
  assert.equal(m4.isComplete(orphaned), false, "role without a target is incomplete");
  assert.equal(m4.isComplete(reducer(orphaned, setMirror("s2", "s1"))), true);
});

register("m6 needs a save that SUCCEEDED", () => {
  const m6 = MISSIONS[5];
  let s = reducer(initialState, creativeAdd("ci_a", TPL, {}, 1));
  s = reducer(s, saveStart());
  assert.equal(m6.isComplete(s), false, "pressing Save is not completing it");
  const failed = reducer(s, saveFail("network"));
  assert.equal(m6.isComplete(failed), false, "and a failed save updates no preview");
  assert.equal(m6.isComplete(reducer(s, saveSuccess(1))), true);
});

register("every mission predicate is pure and survives a round-trip", () => {
  /**
   * Progress must survive a refresh. Persistence (phase 11) stores JSON, so a
   * predicate that depended on object identity or on a non-serialisable value
   * would evaluate differently after rehydration. Serialising and re-reading is
   * exactly what a refresh does.
   */
  let s = reducer(initialState, selectScreen("s2"));
  s = reducer(s, uiSetWallView("list"));
  s = reducer(s, healthTick());
  s = reducer(s, creativeAdd("ci_a", TPL, {}, 1));
  s = reducer(s, slotAdd("s1", { id: "sl_1", startMin: 540, endMin: 720, instanceId: "ci_a" }));
  s = reducer(s, setMirror("s2", "s1"));
  s = reducer(s, toggleScreenOnline("s3"));
  s = reducer(s, saveSuccess(1));

  const rehydrated = JSON.parse(JSON.stringify(s));
  for (const m of MISSIONS) {
    assert.equal(m.isComplete(s), true, `${m.id} should be done`);
    assert.equal(
      m.isComplete(rehydrated),
      m.isComplete(s),
      `${m.id} evaluates differently after a round-trip`
    );
    // Pure: calling it twice cannot change the answer or the state.
    assert.equal(m.isComplete(s), m.isComplete(s));
  }
  assert.deepEqual(rehydrated, s, "and nothing in the state is unserialisable");
});

register("predicates do not mutate the state they are handed", () => {
  const frozen = deepFreeze(JSON.parse(JSON.stringify(initialState)));
  for (const m of MISSIONS) {
    m.isComplete(frozen); // throws if a predicate writes
  }
});

register("every spotlight target exists somewhere in the components", () => {
  // A target with no matching data-td-target draws no ring, silently — the
  // mission would still work but would point at nothing.
  const KNOWN = new Set([
    "screen-wall",
    "health-panel",
    "control-panel",
    "mirror-editor",
    "save-bar",
  ]);
  for (const m of MISSIONS) {
    assert.ok(KNOWN.has(m.target), `${m.id}: target "${m.target}" is not a known target`);
  }
});

// ---- the tutorial reducer cases ----

register("TUT_COMPLETE is idempotent, because a true predicate stays true", () => {
  const once = reducer(initialState, tutComplete("m1"));
  assert.deepEqual(once.tutorial.completed, ["m1"]);
  assert.equal(reducer(once, tutComplete("m1")), once, "the same mission twice is a no-op");
  const twice = reducer(once, tutComplete("m2"));
  assert.deepEqual(twice.tutorial.completed, ["m1", "m2"]);
  assert.equal(reducer(initialState, tutComplete(null)), initialState);
});

register("TUT_ADVANCE stops at the last mission", () => {
  let s = initialState;
  for (let i = 0; i < 20; i += 1) s = reducer(s, tutAdvance(6));
  assert.equal(s.tutorial.missionIndex, 6, "one past the last index, and no further");
  assert.equal(reducer(s, tutAdvance(6)), s, "and then it is a no-op");
});

register("skipping does NOT mark anything complete", () => {
  // The completion checklist has to be honest: skipped is not done.
  const skipped = reducer(initialState, tutSkipAll());
  assert.equal(skipped.tutorial.mode, "explore");
  assert.deepEqual(skipped.tutorial.completed, [], "skipping completes nothing");

  const stepped = reducer(initialState, tutAdvance(6));
  assert.deepEqual(stepped.tutorial.completed, [], "nor does skipping one step");
});

register("TUT_REPLAY restarts the run but keeps what was done", () => {
  let s = reducer(initialState, tutComplete("m1"));
  s = reducer(s, tutComplete("m2"));
  s = reducer(s, tutAdvance(6));
  s = reducer(s, tutSkipAll());
  assert.equal(s.tutorial.mode, "explore");

  const replayed = reducer(s, tutReplay());
  assert.equal(replayed.tutorial.missionIndex, 0, "back to the first mission");
  assert.equal(replayed.tutorial.mode, "guided");
  assert.deepEqual(
    replayed.tutorial.completed,
    ["m1", "m2"],
    "they still did those things — the checklist must not lie about it"
  );
});

register("TUT_SET_MODE and TUT_OPEN_HELP validate and are idempotent", () => {
  assert.equal(reducer(initialState, tutSetMode("explore")).tutorial.mode, "explore");
  assert.equal(reducer(initialState, tutSetMode("guided")), initialState, "already guided");
  assert.equal(reducer(initialState, tutSetMode("nonsense")), initialState, "unknown mode");

  const helped = reducer(initialState, tutOpenHelp("m3"));
  assert.equal(helped.tutorial.helpOpenFor, "m3");
  assert.equal(reducer(helped, tutOpenHelp("m3")), helped);
  assert.equal(reducer(helped, tutOpenHelp(null)).tutorial.helpOpenFor, null);

  const seen = reducer(initialState, tutSkipIntro());
  assert.equal(seen.tutorial.introSeen, true);
  assert.equal(reducer(seen, tutSkipIntro()), seen);
});

register("the tutorial cases never mutate frozen state", () => {
  const frozen = deepFreeze(JSON.parse(JSON.stringify(initialState)));
  for (const action of [
    tutComplete("m1"),
    tutAdvance(6),
    tutSkipAll(),
    tutSkipIntro(),
    tutReplay(),
    tutSetMode("explore"),
    tutOpenHelp("m2"),
  ]) {
    reducer(frozen, action);
  }
  assert.deepEqual(frozen.tutorial.completed, []);
  assert.equal(frozen.tutorial.missionIndex, 0);
  assert.equal(frozen.tutorial.mode, "guided");
});

// --------------------------------------------- persistence (phase 11) ----

/** A state worth persisting: mid-edit, part-saved, part-way through the tutorial. */
function midSession() {
  let s = reducer(initialState, businessField("businessName", "Ganga Dhaba"));
  s = reducer(s, businessField("industry", "cafe"));
  s = reducer(s, businessField("phone", "+91 98765 43210"));
  s = reducer(s, businessField("email", "owner@ganga.example"));
  s = reducer(s, businessField("name", "Asha"));
  s = reducer(s, businessSubmitOk("lead_42"));
  s = reducer(s, enterConsole());
  s = reducer(s, selectScreen("s3"));
  s = reducer(s, creativeAdd("ci_a", TPL, { headline: "Lunch" }, 1));
  s = reducer(s, slotAdd("s3", { id: "sl_1", startMin: 540, endMin: 720, instanceId: "ci_a" }));
  s = reducer(s, saveSuccess(1700000000000));
  s = reducer(s, saveAppliedSettle());
  // Unsaved work on top, so draft and saved genuinely differ.
  s = reducer(s, slotAdd("s3", { id: "sl_2", startMin: 720, endMin: 900, instanceId: "ci_a" }));
  s = reducer(s, setMirror("s4", "s3"));
  s = reducer(s, tutComplete("m1"));
  s = reducer(s, tutAdvance(6));
  s = reducer(s, healthTick());
  s = reducer(s, uiSetScheduleView("timeline"));
  s = reducer(s, uiEditSlot("sl_2"));
  return s;
}

/** Round-trip a state the way the browser would: select, serialise, merge back. */
function roundTrip(state) {
  const patch = {
    progress: JSON.parse(JSON.stringify(selectProgress(state))),
    contact: JSON.parse(JSON.stringify(selectSession(state))),
  };
  return hydrate(initialState, patch);
}

register("persistence: the PII split keeps contact details out of localStorage", () => {
  const s = midSession();
  const progress = JSON.stringify(selectProgress(s));

  // Phone, email and the contact name must not appear in the localStorage blob
  // at all — that is the entire reason for the two-store split.
  for (const secret of ["+91 98765 43210", "owner@ganga.example", "Asha"]) {
    assert.equal(progress.includes(secret), false, `${secret} leaked into td.progress`);
  }
  // The trading name DOES belong there: it is printed on every creative, and
  // losing it would leave the previews saying someone else's name.
  assert.ok(progress.includes("Ganga Dhaba"), "the trading name is kept");

  // And the session store holds exactly the PII and the lead id.
  const session = selectSession(s);
  assert.deepEqual(Object.keys(session).sort(), [
    "email",
    "leadId",
    "leadStatus",
    "name",
    "phone",
  ]);
  assert.equal(session.phone, "+91 98765 43210");
  assert.equal(session.leadId, "lead_42");
});

register("persistence: a refresh mid-flow restores the work", () => {
  const before = midSession();
  const after = roundTrip(before);

  assert.equal(after.step, "console", "straight back into the console");
  assert.equal(after.business.businessName, "Ganga Dhaba");
  assert.equal(after.business.industry, "cafe");
  assert.equal(after.business.phone, "+91 98765 43210", "from sessionStorage");
  assert.equal(after.lead.id, "lead_42");
  assert.equal(after.selectedScreenId, "s3", "selection survives");
  assert.deepEqual(
    after.draft.byScreen.s3.slots.map((x) => x.id),
    ["sl_1", "sl_2"],
    "draft edits survive"
  );
  assert.equal(after.saved.byScreen.s3.slots.length, 1, "and saved is still its own thing");
  assert.equal(after.savedAt, 1700000000000);
  assert.equal(after.screens.find((x) => x.id === "s4").mirrors, "s3", "role edits survive");
  assert.deepEqual(after.tutorial.completed, ["m1"], "tutorial progress survives");
  assert.equal(after.tutorial.missionIndex, 1);
  assert.equal(after.creativeInstances.ci_a.fields.headline, "Lunch");
  assert.equal(after.health.tick, 1, "so the health figures do not reshuffle");
});

register("persistence: tutorial progress survives a refresh", () => {
  /**
   * Predicates over events is what makes this work — but with one wrinkle this
   * test exists to pin down.
   *
   * `ui` is deliberately not persisted (plan §11), and m1 asks for a wall-view
   * switch, which lives in ui.wallView. So after a refresh m1's PREDICATE is
   * false again even though the visitor plainly did it. The durable record is
   * `completed`, which TUT_COMPLETE appends to and which IS persisted — and
   * TutorialContext reads both, so Continue does not re-lock on a mission
   * already finished.
   */
  let s = reducer(initialState, selectScreen("s2"));
  s = reducer(s, uiSetWallView("list"));
  s = reducer(s, healthTick());
  s = reducer(s, creativeAdd("ci_a", TPL, {}, 1));
  s = reducer(s, slotAdd("s1", { id: "sl_1", startMin: 540, endMin: 720, instanceId: "ci_a" }));
  s = reducer(s, setMirror("s2", "s1"));
  s = reducer(s, toggleScreenOnline("s3"));
  s = reducer(s, saveSuccess(1));
  // As TutorialProvider's effect would, once each predicate turned true.
  for (const m of MISSIONS) {
    assert.equal(m.isComplete(s), true, `${m.id} should be satisfied`);
    s = reducer(s, tutComplete(m.id));
  }

  const restored = roundTrip(s);
  assert.deepEqual(
    restored.tutorial.completed,
    MISSIONS.map((m) => m.id),
    "every mission is still recorded as done"
  );

  // Five of the six re-evaluate true off persisted state alone. m1 is the
  // exception, and the reason the `completed` record is load-bearing.
  for (const m of MISSIONS) {
    const live = m.isComplete(restored);
    if (m.id === "m1") {
      assert.equal(live, false, "m1's predicate reads ui, which is not persisted");
    } else {
      assert.equal(live, true, `${m.id} re-evaluates true from persisted state`);
    }
    assert.ok(
      live || restored.tutorial.completed.includes(m.id),
      `${m.id} is done by neither route`
    );
  }
});

register("persistence: ui and sim.playing are NEVER restored", () => {
  let s = midSession();
  s = reducer(s, simPlay());
  assert.equal(s.sim.playing, true);
  assert.equal(s.ui.editingSlotId, "sl_2");
  assert.equal(s.ui.scheduleView, "timeline");

  const after = roundTrip(s);
  // A clock running on page load, before the visitor has touched anything,
  // reads as a bug rather than as a restored session.
  assert.equal(after.sim.playing, false, "the clock does not restart itself");
  assert.equal(after.sim.nowMin, s.sim.nowMin, "but the time it was at is kept");
  // ui is absent from selectProgress entirely, so there is nothing to ignore.
  assert.equal(after.ui.editingSlotId, null, "no sheet reopens");
  assert.equal(after.ui.scheduleView, initialState.ui.scheduleView);
  assert.equal(after.ui.toast, null);
  assert.equal("ui" in selectProgress(s), false, "ui is not even selected");
});

register("persistence: an in-flight save settles to an honest resting state", () => {
  // "saving" and "applied" are owned by a timer that did not survive the
  // refresh. Restoring either leaves the chip spinning forever or claiming an
  // apply that is not happening.
  for (const status of ["saving", "applied"]) {
    const s = { ...midSession(), save: { status, error: null, dirtyScreens: ["s3"] } };
    const after = roundTrip(s);
    assert.equal(after.save.status, "dirty", `${status} must not be restored as-is`);
    assert.deepEqual(after.save.dirtyScreens, ["s3"], "and the work is still unsaved");
  }
  // A settled status comes back unchanged.
  for (const status of ["clean", "dirty", "saved", "error"]) {
    const s = { ...midSession(), save: { status, error: "boom", dirtyScreens: [] } };
    const after = roundTrip(s);
    assert.equal(after.save.status, status);
    assert.equal(after.save.error, null, "but a previous visit's error is not this visit's");
  }
});

register("persistence: a lead left 'sending' comes back idle", () => {
  const s = { ...midSession(), lead: { status: "sending", id: null, error: "x" } };
  const after = roundTrip(s);
  assert.equal(after.lead.status, "idle", "nothing is in flight any more");
  assert.equal(after.lead.error, null);
});

register("persistence: HYDRATE merges key by key, never a top-level spread", () => {
  /**
   * The plan calls this out and it is the right call. A spread would accept any
   * garbage the stored shape happened to contain, and would silently keep a key
   * a later version removed.
   */
  const hostile = {
    progress: {
      step: "nonsense",
      savedAt: "not a number",
      business: { businessName: 42, industry: null, phone: "LEAKED", email: "LEAKED" },
      screens: [{ id: "oops" }],
      selectedScreenId: "s99",
      sim: { nowMin: "noon", speed: null, playing: true },
      health: { tick: "lots" },
      tutorial: { missionIndex: "two", completed: "m1", mode: "wizard", helpOpenFor: "m3" },
      save: { status: 7, dirtyScreens: "s1" },
      // A key from an imaginary future shape.
      somethingNew: { nested: true },
    },
    contact: null,
  };
  const after = hydrate(initialState, hostile);

  assert.equal(after.step, "intake", "an unknown step is refused");
  assert.equal(after.savedAt, null, "as is a non-numeric timestamp");
  assert.equal(after.business.businessName, "42", "coerced, not trusted");
  assert.equal(after.business.industry, "");
  // phone and email are NOT in the progress projection, so a hand-edited
  // localStorage cannot inject them.
  assert.equal(after.business.phone, "", "progress cannot carry PII back in");
  assert.equal(after.business.email, "");
  assert.deepEqual(after.screens, initialState.screens, "a wrong-shaped fleet is refused");
  assert.equal(after.selectedScreenId, "s1", "an unknown screen id is refused");
  assert.equal(after.sim.nowMin, initialState.sim.nowMin);
  assert.equal(after.sim.playing, false);
  assert.equal(after.health.tick, 0);
  assert.equal(after.tutorial.missionIndex, 0);
  assert.deepEqual(after.tutorial.completed, []);
  assert.equal(after.tutorial.mode, "guided");
  assert.equal(after.tutorial.helpOpenFor, null);
  assert.deepEqual(after.save.dirtyScreens, []);
  assert.equal("somethingNew" in after, false, "an unknown key cannot sneak in");
  // And the shape is still exactly the shape.
  assert.deepEqual(Object.keys(after).sort(), Object.keys(initialState).sort());
});

register("persistence: a four-screen fleet from an older build is refused", () => {
  // Accepting it would break every screens.find() in the feature.
  const patch = {
    progress: { ...selectProgress(midSession()), screens: [{ id: "s1" }, { id: "s2" }] },
    contact: null,
  };
  const after = hydrate(initialState, patch);
  assert.equal(after.screens.length, 5);
  assert.deepEqual(after.screens, initialState.screens);
});

register("persistence: hydrate merges onto the CURRENT state, not initialState", () => {
  // It is dispatched from an effect, so one frame renders first. Anything typed
  // into that frame must survive.
  const typed = reducer(initialState, businessField("businessName", "Typed First"));
  const patch = { progress: null, contact: { phone: "+91 11111 11111" } };
  const after = hydrate(typed, patch);
  assert.equal(after.business.businessName, "Typed First", "the live value is kept");
  assert.equal(after.business.phone, "+91 11111 11111", "and the stored one lands");
});

register("persistence: HYDRATE with no patch is a no-op", () => {
  assert.equal(reducer(initialState, hydrateState(null)), initialState);
  assert.equal(hydrate(initialState, null), initialState);
  assert.equal(hydrate(initialState, { progress: null, contact: null }), initialState);
});

register("persistence: nothing in the persisted shape is unserialisable", () => {
  // Storage is JSON. A Date, a Map or a function anywhere in the projection
  // would survive selectProgress and vanish on the way back.
  const s = midSession();
  const progress = selectProgress(s);
  assert.deepEqual(JSON.parse(JSON.stringify(progress)), progress);
  const session = selectSession(s);
  assert.deepEqual(JSON.parse(JSON.stringify(session)), session);
});

register("persistence: selectProgress does not alias the state it reads", () => {
  // It is serialised asynchronously, after a debounce. If it aliased live
  // arrays, an edit landing inside that window would be written as though it
  // had already happened — and on a failed write, half-written.
  const s = midSession();
  const progress = selectProgress(s);
  const json = JSON.stringify(progress);
  // A later edit must not change what was selected.
  reducer(s, slotRemove("s3", "sl_1"));
  assert.equal(JSON.stringify(selectProgress(s)), json, "the source state is untouched");
});

register("RESTART returns a pristine state and keeps nothing", () => {
  const s = midSession();
  const after = reducer(s, restart());

  assert.equal(after.step, "intake");
  assert.equal(after.business.businessName, "");
  assert.equal(after.business.phone, "", "the PII is gone from memory too");
  assert.equal(after.business.email, "");
  assert.equal(after.lead.id, null);
  assert.deepEqual(after.draft.byScreen.s3.slots, []);
  assert.deepEqual(after.saved.byScreen.s3.slots, []);
  assert.deepEqual(after.creativeInstances, {});
  assert.deepEqual(after.tutorial.completed, []);
  assert.equal(after.tutorial.missionIndex, 0);
  assert.equal(after.savedAt, null);
  assert.equal(after.screens.find((x) => x.id === "s4").mirrors, null);
  assert.equal(after.health.tick, 0);
  // Deep-equal to a pristine state, with nothing left behind anywhere.
  assert.deepEqual(after, initialState);
  assert.equal(JSON.stringify(after).includes("Ganga"), false, "no trace of the session");
});

register("persistence: the session and progress cases never mutate frozen state", () => {
  const frozen = deepFreeze(JSON.parse(JSON.stringify(midSession())));
  // selectProgress / selectSession read, and hydrate merges — none may write.
  selectProgress(frozen);
  selectSession(frozen);
  hydrate(frozen, { progress: selectProgress(frozen), contact: selectSession(frozen) });
  reducer(frozen, restart());
  reducer(frozen, hydrateState({ progress: null, contact: { phone: "x" } }));
  assert.equal(frozen.business.businessName, "Ganga Dhaba", "untouched");
});

// ------------------------------------------------------------------ report ----

// Settle every registered test, including the async ones, before counting.
await Promise.all(pending);

for (const { name, err } of failures) {
  console.error(`\nFAIL  ${name}\n      ${err.message.split("\n").join("\n      ")}`);
}
const total = passed + failures.length;
console.log(
  `\n${failures.length ? "FAILED" : "PASSED"}  ${passed}/${total} test-drive tests` +
    (failures.length ? ` (${failures.length} failing)` : "")
);
process.exit(failures.length ? 1 : 0);
