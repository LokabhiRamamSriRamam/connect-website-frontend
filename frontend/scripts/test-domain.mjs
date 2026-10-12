/**
 * Node test run for the test drive's domain layer (plan §13, phase 3).
 *
 * There is no UI for any of this yet — correctness is won here, in node, before
 * pixels. Run with:  node scripts/test-domain.mjs
 *
 * No test framework: the repo has none, and adding one for five modules would be
 * a bigger decision than this phase. Assertions are plain, failures are named and
 * the process exits non-zero, which is all CI would need.
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

import { en } from "../src/pages/test-drive/i18n/en.js";
import { hi } from "../src/pages/test-drive/i18n/hi.js";
import { flattenKeys } from "../src/pages/test-drive/i18n/index.js";

let passed = 0;
const failures = [];

function test(name, fn) {
  try {
    fn();
    passed += 1;
  } catch (err) {
    failures.push({ name, err });
  }
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

test("minute validity and clamping", () => {
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

test("wrapMinute folds past midnight, 1440 -> 0", () => {
  assert.equal(wrapMinute(0), 0);
  assert.equal(wrapMinute(1440), 0);
  assert.equal(wrapMinute(1500), 60);
  assert.equal(wrapMinute(-30), 1410);
  assert.equal(wrapMinute(-1440), 0);
});

test("HH:MM round-trips, including the 0 and 1440 edges", () => {
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

test("HH:MM rejects junk rather than coercing it to midnight", () => {
  for (const bad of ["", "abc", "9", "09:60", "25:00", "09:5", null, undefined, 540, "09:00:00"]) {
    assert.equal(hhmmToMinutes(bad), null, `should reject ${JSON.stringify(bad)}`);
  }
});

test("minutesToInputValue folds 24:00 to a value an input accepts", () => {
  assert.equal(minutesToInputValue(1440), "23:59");
  assert.equal(minutesToInputValue(540), "09:00");
  assert.equal(minutesToInputValue(0), "00:00");
});

test("durationMinutes never goes negative", () => {
  assert.equal(durationMinutes(540, 720), 180);
  assert.equal(durationMinutes(720, 540), 0);
  assert.equal(durationMinutes(0, 1440), 1440);
});

// THE case for this phase: half-open intervals.
test("overlap: 09:00-12:00 and 12:00-15:00 are adjacent, NOT overlapping", () => {
  const a = { startMin: 540, endMin: 720 };
  const b = { startMin: 720, endMin: 900 };
  assert.equal(overlaps(a, b), false);
  assert.equal(overlaps(b, a), false, "and symmetrically");
});

test("overlap: a 1-minute intersection DOES clash", () => {
  const a = { startMin: 540, endMin: 720 };
  assert.equal(overlaps(a, { startMin: 719, endMin: 900 }), true, "clips the end by 1");
  assert.equal(overlaps(a, { startMin: 300, endMin: 541 }), true, "clips the start by 1");
  assert.equal(overlaps(a, { startMin: 541, endMin: 719 }), true, "fully contained");
  assert.equal(overlaps(a, { startMin: 300, endMin: 900 }), true, "fully containing");
  assert.equal(overlaps(a, a), true, "identical");
});

test("overlap: zero-length and degenerate inputs", () => {
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

test("withinActiveHours: normal window, half-open", () => {
  const h = { start: 540, end: 1260 }; // 09:00-21:00
  assert.equal(withinActiveHours(540, h), true, "inclusive at open");
  assert.equal(withinActiveHours(780, h), true);
  assert.equal(withinActiveHours(1259, h), true);
  assert.equal(withinActiveHours(1260, h), false, "exclusive at close");
  assert.equal(withinActiveHours(539, h), false);
  assert.equal(withinActiveHours(0, h), false);
});

test("withinActiveHours: wrapping window 22:00-02:00", () => {
  const h = { start: 1320, end: 120 };
  assert.equal(withinActiveHours(1410, h), true, "23:30 is inside");
  assert.equal(withinActiveHours(60, h), true, "01:00 is inside");
  assert.equal(withinActiveHours(1320, h), true, "22:00 inclusive");
  assert.equal(withinActiveHours(0, h), true, "midnight is inside");
  assert.equal(withinActiveHours(120, h), false, "02:00 exclusive");
  assert.equal(withinActiveHours(180, h), false, "03:00 is outside");
  assert.equal(withinActiveHours(720, h), false, "midday is outside");
});

test("withinActiveHours: start === end is closed, not 24h", () => {
  assert.equal(withinActiveHours(600, { start: 540, end: 540 }), false);
  assert.equal(withinActiveHours(600, null), false);
  assert.equal(withinActiveHours(600, { start: 0, end: 1440 }), true, "00:00-24:00 is always on");
});

test("pct and slotGeometry: exact arithmetic", () => {
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

test("isPlayableSlot rejects disabled and malformed slots", () => {
  assert.equal(isPlayableSlot(slot("s", 540, 720)), true);
  assert.equal(isPlayableSlot(slot("s", 540, 720, "ci_a", false)), false);
  assert.equal(isPlayableSlot(slot("s", 720, 540)), false);
  assert.equal(isPlayableSlot(slot("s", 600, 600)), false);
  assert.equal(isPlayableSlot(null), false);
});

test("normalizeSlots sorts, decorates and does not mutate its input", () => {
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

test("normalizeSlots flags outside-hours, partial and missing creatives", () => {
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

test("normalizeSlots reports pre-existing overlaps in hydrated data", () => {
  const out = normalizeSlots([slot("a", 540, 720), slot("b", 700, 800)], {});
  assert.deepEqual(out.find((s) => s.id === "a").conflictsWith, ["b"]);
  assert.deepEqual(out.find((s) => s.id === "b").conflictsWith, ["a"]);
});

test("intersectsActiveHours handles an overnight window", () => {
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

test("slotAt is half-open at both ends", () => {
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

test("scheduledMinutes sums only playable slots", () => {
  assert.equal(
    scheduledMinutes([slot("a", 540, 720), slot("b", 720, 780, "ci_a", false)]),
    180
  );
});

test("findGaps walks the active window", () => {
  assert.deepEqual(findGaps([slot("a", 600, 720)], HOURS), [
    { startMin: 540, endMin: 600 },
    { startMin: 720, endMin: 1260 },
  ]);
  assert.deepEqual(findGaps([slot("a", 540, 1260)], HOURS), [], "fully covered");
  assert.deepEqual(findGaps([], HOURS), [{ startMin: 540, endMin: 1260 }]);
  assert.equal(findGaps([slot("a", 1380, 1440)], { start: 1320, end: 120 }).length, 2);
});

test("validateSlot: a clean slot passes", () => {
  const r = validateSlot(slot("new", 540, 720), {
    slots: [],
    activeHours: HOURS,
    creativeInstances: CI,
  });
  assert.equal(r.ok, true);
  assert.deepEqual(r.errors, []);
  assert.deepEqual(r.warnings, []);
});

test("validateSlot: end must be after start, with a 5-minute minimum", () => {
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

test("validateSlot rejects a zero-length slot before overlap matters", () => {
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

test("validateSlot: a creative is required and must exist", () => {
  const none = validateSlot({ id: "x", startMin: 540, endMin: 720 }, { creativeInstances: CI });
  assert.equal(none.ok, false);
  assert.ok(none.errors.some((e) => e.key === "schedule.err.pickCreative"));
  assertKey("schedule.err.pickCreative");

  const gone = validateSlot(slot("x", 540, 720, "ci_gone"), { creativeInstances: CI });
  assert.equal(gone.ok, false);
  assert.ok(gone.errors.some((e) => e.key === "schedule.err.pickCreative"));
});

test("validateSlot: overlap is BLOCKING and names the clashing slot", () => {
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

test("validateSlot: an adjacent slot is NOT an overlap", () => {
  const r = validateSlot(slot("new", 720, 900, "ci_b"), {
    slots: [slot("lunch", 540, 720, "ci_a")],
    activeHours: HOURS,
    creativeInstances: CI,
  });
  assert.equal(r.ok, true, "12:00 start against a 12:00 end must be accepted");
});

test("validateSlot: editing a slot does not clash with itself", () => {
  const existing = [slot("lunch", 540, 720, "ci_a")];
  const r = validateSlot(slot("lunch", 560, 740, "ci_a"), {
    slots: existing,
    activeHours: HOURS,
    creativeInstances: CI,
  });
  assert.equal(r.ok, true);
});

test("validateSlot: outside active hours is a WARNING, not an error", () => {
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

test("validateSlot: the 8-slot cap applies to adds, not edits", () => {
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

test("validateActiveHours", () => {
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

test("slotsOutsideHours names what a narrower window would silence", () => {
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

test("resolveChain: a primary resolves to itself, unmirrored", () => {
  const r = resolveChain(primaries(), "s1");
  assert.equal(r.status, "ok");
  assert.equal(r.sourceId, "s1");
  assert.equal(r.mirrored, false);
  assert.deepEqual(r.path, ["s1"]);
});

test("resolveChain: one hop", () => {
  const screens = primaries();
  screens[1] = { ...screens[1], role: "secondary", mirrors: "s1" };
  const r = resolveChain(screens, "s2");
  assert.equal(r.status, "ok");
  assert.equal(r.sourceId, "s1");
  assert.equal(r.mirrored, true);
  assert.deepEqual(r.path, ["s2", "s1"]);
});

test("resolveChain: a long chain resolves to the one primary", () => {
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

test("resolveChain: self-mirror is detected, not looped on", () => {
  const screens = primaries();
  screens[0] = { ...screens[0], role: "secondary", mirrors: "s1" };
  const r = resolveChain(screens, "s1");
  assert.equal(r.status, "cycle");
  assert.equal(r.sourceId, null);
});

test("resolveChain: A->B->A is detected", () => {
  const screens = [
    { id: "s1", role: "secondary", mirrors: "s2", online: true },
    { id: "s2", role: "secondary", mirrors: "s1", online: true },
  ];
  assert.equal(resolveChain(screens, "s1").status, "cycle");
  assert.equal(resolveChain(screens, "s2").status, "cycle");
});

test("resolveChain: a three-screen ring is detected", () => {
  const screens = [
    { id: "s1", role: "secondary", mirrors: "s2", online: true },
    { id: "s2", role: "secondary", mirrors: "s3", online: true },
    { id: "s3", role: "secondary", mirrors: "s1", online: true },
  ];
  assert.equal(resolveChain(screens, "s1").status, "cycle");
});

test("resolveChain: a chain longer than the depth cap terminates", () => {
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

test("resolveChain: a secondary pointing nowhere is a broken link", () => {
  const screens = primaries();
  screens[1] = { ...screens[1], role: "secondary", mirrors: null };
  assert.equal(resolveChain(screens, "s2").status, "broken-link");
});

test("resolveChain: a link to a screen that is gone", () => {
  const screens = primaries();
  screens[1] = { ...screens[1], role: "secondary", mirrors: "s99" };
  assert.equal(resolveChain(screens, "s2").status, "unknown-screen");
  assert.equal(resolveChain(screens, "nope").status, "unknown-screen");
});

test("canMirror blocks self and cycles, with i18n keys", () => {
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

test("followersOf and allFollowersOf", () => {
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

test("mirrorCandidates excludes self and anything that would loop", () => {
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

test("resolveScreen kind=creative — requires a real slot AND a real instance", () => {
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

test("resolveScreen kind=offline — wins over an otherwise playing schedule", () => {
  const screens = primaries();
  screens[0] = { ...screens[0], online: false };
  const source = { s1: cfg([slot("lunch", 540, 900, "ci_a")]) };
  const r = resolveScreen(source, screens, CI, "s1", 780);
  assert.equal(r.kind, "offline");
  assert.equal(r.reason, "play.reason.offline");
  assert.equal(r.slot, null, "no slot is reported on a dark screen");
  assertKey("play.reason.offline");
});

test("resolveScreen kind=idle — outside active hours", () => {
  const screens = primaries();
  const source = { s1: cfg([slot("lunch", 540, 900, "ci_a")]) };
  const r = resolveScreen(source, screens, CI, "s1", 60); // 01:00
  assert.equal(r.kind, "idle");
  assert.equal(r.reason, "play.reason.outsideHours");
  assertKey("play.reason.outsideHours");
});

test("resolveScreen kind=no-content, reason=gap — open, but nothing scheduled", () => {
  const screens = primaries();
  const source = { s1: cfg([slot("morning", 540, 600, "ci_a")]) };
  const r = resolveScreen(source, screens, CI, "s1", 780);
  assert.equal(r.kind, "no-content");
  assert.equal(r.reason, "play.reason.gap");
  assertKey("play.reason.gap");
});

test("resolveScreen reason=creativeMissing — never substitutes another creative", () => {
  const screens = primaries();
  const source = { s1: cfg([slot("lunch", 540, 900, "ci_gone")]) };
  const r = resolveScreen(source, screens, CI, "s1", 780);
  assert.equal(r.kind, "no-content");
  assert.equal(r.reason, "play.reason.creativeMissing");
  assert.equal(r.instanceId, "ci_gone", "reports what was asked for");
  assert.equal(r.slot.id, "lunch");
  assertKey("play.reason.creativeMissing");
});

test("resolveScreen reason=notConfigured — no config for the source screen", () => {
  const r = resolveScreen({}, primaries(), CI, "s1", 780);
  assert.equal(r.kind, "no-content");
  assert.equal(r.reason, "play.reason.notConfigured");
  assertKey("play.reason.notConfigured");
});

test("resolveScreen kind=broken-link, reason=unknownScreen", () => {
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

test("resolveScreen kind=broken-link, reason=cycle", () => {
  const screens = [
    { id: "s1", role: "secondary", mirrors: "s2", online: true },
    { id: "s2", role: "secondary", mirrors: "s1", online: true },
  ];
  const r = resolveScreen({ s1: cfg([]) }, screens, CI, "s1", 780);
  assert.equal(r.kind, "broken-link");
  assert.equal(r.reason, "play.reason.cycle");
  assertKey("play.reason.cycle");
});

test("resolveScreen reason=primaryOffline — a mirror of a dark primary", () => {
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

test("a mirror shows its primary's content", () => {
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
test("a mirror shows its primary's IDLE state, ignoring its own active hours", () => {
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

test("a mirror that is itself offline reports its OWN offline state", () => {
  const screens = primaries();
  screens[1] = { ...screens[1], role: "secondary", mirrors: "s1", online: false };
  const source = { s1: cfg([slot("lunch", 540, 900, "ci_a")]) };
  const r = resolveScreen(source, screens, CI, "s2", 780);
  assert.equal(r.kind, "offline");
  assert.equal(r.reason, "play.reason.offline", "offline is checked before the chain");
});

test("every resolveScreen result has the full shape", () => {
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

test("resolveAllScreens keys every screen", () => {
  const screens = primaries();
  const all = resolveAllScreens({ s1: cfg([slot("a", 540, 900, "ci_a")]) }, screens, CI, 780);
  assert.deepEqual(Object.keys(all).sort(), ["s1", "s2", "s3"]);
  assert.equal(all.s1.kind, "creative");
  assert.equal(all.s2.kind, "no-content");
});

// -------------------------------------------------------------- health.js ----

test("seededUnit is deterministic and in range", () => {
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

test("screenHealth: online screen, plausible and repeatable figures", () => {
  const s = { id: "s1", role: "primary", mirrors: null, online: true };
  const h = screenHealth(s, 780, 3);
  assert.equal(h.status, "online");
  assert.equal(h.online, true);
  assert.equal(h.lastSeenMin, 780, "an online screen was seen now");
  assert.ok(h.uptimePct >= 97 && h.uptimePct < 100, `uptime ${h.uptimePct}`);
  assert.deepEqual(h, screenHealth(s, 780, 3), "same tick, same figures");
});

test("screenHealth: offline screen was last seen in the past", () => {
  const s = { id: "s4", role: "primary", mirrors: null, online: false };
  const h = screenHealth(s, 780, 1);
  assert.equal(h.status, "offline");
  assert.ok(h.staleMinutes >= 2, "a visible gap");
  assert.equal(h.lastSeenMin, 780 - h.staleMinutes);
  assert.ok(h.uptimePct >= 80 && h.uptimePct < 95, `uptime ${h.uptimePct}`);
});

test("screenHealth: lastSeenMin wraps rather than going negative", () => {
  const s = { id: "s4", role: "primary", mirrors: null, online: false };
  const h = screenHealth(s, 1, 1);
  assert.ok(h.lastSeenMin >= 0 && h.lastSeenMin < 1440, `got ${h.lastSeenMin}`);
});

test("screenHealth: playback is a separate axis from connectivity", () => {
  const s = { id: "s1", role: "primary", mirrors: null, online: true };
  const playing = screenHealth(s, 780, 0, { kind: "creative", reason: null });
  assert.equal(playing.playing, true);
  const idle = screenHealth(s, 780, 0, { kind: "idle", reason: "play.reason.outsideHours" });
  assert.equal(idle.online, true, "online");
  assert.equal(idle.playing, false, "but not playing");
  assert.equal(idle.playbackReason, "play.reason.outsideHours");
});

test("allScreenHealth keys every screen", () => {
  const screens = primaries();
  const h = allScreenHealth(screens, 780, 0);
  assert.deepEqual(Object.keys(h).sort(), ["s1", "s2", "s3"]);
});

test("healthSummary returns keys and counts, not sentences", () => {
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

test("advanceClock wraps at midnight", () => {
  assert.equal(advanceClock(780, 60), 840);
  assert.equal(advanceClock(1400, 60), 20);
  assert.equal(advanceClock(0, -1), 1439);
  assert.equal(advanceClock(1439, 1), 0);
});

test("minutesUntilOpen", () => {
  assert.equal(minutesUntilOpen(480, HOURS), 60, "an hour before opening");
  assert.equal(minutesUntilOpen(540, HOURS), 0, "at opening");
  // 21:40 -> next 09:00 is 2h20m to midnight plus 9h.
  assert.equal(minutesUntilOpen(1300, HOURS), 140 + 540, "wraps to tomorrow");
  assert.equal(minutesUntilOpen(780, null), null);
});

// ---------------------------------------------------------------- purity ----

test("purity: no domain function mutates a deep-frozen argument", () => {
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

test("purity: returned slots are copies, so a view cannot write through them", () => {
  const input = [slot("a", 540, 720, "ci_a")];
  const out = normalizeSlots(input, {});
  out[0].startMin = 999;
  assert.equal(input[0].startMin, 540, "the source slot is unaffected");
});

test("i18n: every play.reason.* key the domain can return exists in en and hi", () => {
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

test("i18n: en and hi key trees are still identical", () => {
  const a = flattenKeys(en);
  const b = flattenKeys(hi);
  const onlyEn = a.filter((k) => !b.includes(k));
  const onlyHi = b.filter((k) => !a.includes(k));
  assert.deepEqual(onlyEn, [], "keys only in en");
  assert.deepEqual(onlyHi, [], "keys only in hi");
  assert.equal(a.length, b.length);
});

// ------------------------------------------------------------------ report ----

for (const { name, err } of failures) {
  console.error(`\nFAIL  ${name}\n      ${err.message.split("\n").join("\n      ")}`);
}
const total = passed + failures.length;
console.log(
  `\n${failures.length ? "FAILED" : "PASSED"}  ${passed}/${total} domain tests` +
    (failures.length ? ` (${failures.length} failing)` : "")
);
process.exit(failures.length ? 1 : 0);
