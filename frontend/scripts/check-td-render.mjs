/**
 * Render check for the test-drive components, in node.
 *
 * There is no browser available in this environment and no test renderer in the
 * repo, so the components are mounted through react-dom/server against a chosen
 * reducer state and the emitted HTML is asserted. That verifies rather less than
 * clicking would — no effects run, no timers fire, nothing is tapped — and it is
 * stated plainly rather than implied: what this proves is that each component
 * mounts, reads the state it claims to read, and puts the right copy on screen in
 * both languages.
 *
 * The save machine's transitions and every schedule rule are asserted properly in
 * scripts/test-td.mjs, against the pure reducer. This file is the complement: that
 * the UI is wired to it.
 *
 * Run with `npm run check:td-render`, which bundles with esbuild first, as
 * check-creative-safety.mjs does — bare node cannot parse .jsx. Named .mjs for
 * the same reason as the other scripts: eslint lints .js/.jsx with browser
 * globals, so a node script with those extensions errors on `process`.
 */
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { StateCtx, DispatchCtx } from "../src/pages/test-drive/state/contexts.js";
import { reducer, initialState } from "../src/pages/test-drive/state/reducer.js";
import {
  activeHoursSet,
  creativeAdd,
  saveFail,
  saveStart,
  saveSuccess,
  slotAdd,
} from "../src/pages/test-drive/state/actions.js";
import { createT } from "../src/pages/test-drive/i18n/index.js";
import { en, hi } from "../src/pages/test-drive/i18n/index.js";

import ScheduleListView from "../src/pages/test-drive/components/ScheduleListView.jsx";
import ActiveHoursEditor from "../src/pages/test-drive/components/ActiveHoursEditor.jsx";
import SlotEditor from "../src/pages/test-drive/components/SlotEditor.jsx";
import SaveBar from "../src/pages/test-drive/components/SaveBar.jsx";
import ControlPanel from "../src/pages/test-drive/components/ControlPanel.jsx";
import ScreenTile from "../src/pages/test-drive/components/ScreenTile.jsx";
import ScheduleTimelineView from "../src/pages/test-drive/components/ScheduleTimelineView.jsx";
import ScheduleSection from "../src/pages/test-drive/components/ScheduleSection.jsx";
import SimClock from "../src/pages/test-drive/components/SimClock.jsx";

const { createElement: h } = React;

/**
 * The real I18nProvider, which reads only localStorage and the query string —
 * both absent under node, so it resolves to English. Its context is
 * module-private by design, so these checks render in English and the Hindi pass
 * at the bottom asserts the dictionary instead. A bilingual render is a browser
 * check and is not claimed here.
 */
import { I18nProvider } from "../src/pages/test-drive/i18n/I18nContext.jsx";

/** Mount a component against a fixed state. dispatch is a recorder. */
function render(node, state) {
  const calls = [];
  const html = renderToStaticMarkup(
    h(
      I18nProvider,
      null,
      h(
        StateCtx.Provider,
        { value: state },
        h(DispatchCtx.Provider, { value: (a) => calls.push(a) }, node)
      )
    )
  );
  return { html, calls };
}

let passed = 0;
const failures = [];
function check(name, fn) {
  try {
    fn();
    passed += 1;
  } catch (err) {
    failures.push({ name, err });
  }
}

// ---- fixtures ----

const TPL = "r_thali_combo";

/** A visitor mid-edit: one creative, one good slot, one outside active hours. */
function populated() {
  let s = reducer(initialState, creativeAdd("ci_a", TPL, { headline: "Thali Time" }, 1));
  s = reducer(s, slotAdd("s1", { id: "sl_1", startMin: 540, endMin: 720, instanceId: "ci_a" }));
  s = reducer(s, slotAdd("s1", { id: "sl_2", startMin: 60, endMin: 240, instanceId: "ci_a" }));
  return {
    ...s,
    business: { ...s.business, businessName: "Ganga Dhaba", industry: "restaurant" },
  };
}

const t = createT("en");

// ---- the schedule list ----

check("ScheduleListView renders both slots from draft, sorted by start", () => {
  const s = populated();
  const { html } = render(h(ScheduleListView, { screenId: "s1" }), s);
  // 01:00-04:00 sorts before 09:00-12:00 — normalizeSlots' ordering, visible.
  assert.ok(html.indexOf("01:00") < html.indexOf("09:00"), "sorted by start time");
  assert.ok(html.includes("04:00") && html.includes("12:00"), "both ends shown");
  assert.ok(html.includes("Thali Time"), "named by the headline the visitor typed");
  assert.ok(html.includes(t("schedule.slotCount", { count: 2, max: 8 })), "the count");
});

check("the outside-active-hours slot is flagged as a warning, not refused", () => {
  const s = populated();
  const { html } = render(h(ScheduleListView, { screenId: "s1" }), s);
  assert.ok(html.includes(t("schedule.outsideHoursBadge")), "the badge is shown");
  // sb-blush is the palette's only warning fill; there is no sb-alert token.
  assert.ok(html.includes("bg-sb-blush"), "styled as a warning");
  assert.equal(s.draft.byScreen.s1.slots.length, 2, "and the slot is still stored");
});

check("an empty screen says so rather than rendering an empty list", () => {
  const { html } = render(h(ScheduleListView, { screenId: "s2" }), populated());
  assert.ok(html.includes(t("schedule.empty")));
  assert.ok(!html.includes("01:00"), "and shows no other screen's slots");
});

check("ScheduleListView holds no copy: it renders whatever draft says", () => {
  const s = populated();
  const edited = reducer(s, {
    type: "SLOT_UPDATE",
    screenId: "s1",
    slotId: "sl_1",
    patch: { endMin: 660 },
  });
  const { html } = render(h(ScheduleListView, { screenId: "s1" }), edited);
  assert.ok(html.includes("11:00"), "the edit is on screen");
  assert.ok(!html.includes("12:00"), "and the old value is gone");
});

check("the 8-slot cap disables Add rather than failing on press", () => {
  let s = reducer(initialState, creativeAdd("ci_a", TPL, {}, 1));
  for (let i = 0; i < 8; i += 1) {
    s = reducer(s, slotAdd("s1", { id: `sl_${i}`, startMin: i * 60, endMin: i * 60 + 60, instanceId: "ci_a" }));
  }
  const { html } = render(h(ScheduleListView, { screenId: "s1" }), s);
  // The attribute, not the substring — see the note in the SaveBar check below.
  assert.ok(
    /<button[^>]*data-td-target="add-slot"[^>]*\sdisabled(\s|=|>)/.test(html),
    "the add button is disabled at the cap"
  );
  assert.ok(html.includes(t("schedule.err.tooMany", { max: 8 })), "and says why");

  // And one slot fewer leaves it live, so the assertion above is not vacuous.
  const under = render(
    h(ScheduleListView, { screenId: "s2" }),
    s
  ).html;
  assert.ok(
    !/<button[^>]*data-td-target="add-slot"[^>]*\sdisabled(\s|=|>)/.test(under),
    "an empty screen can still add"
  );
});

// ---- the slot editor ----

check("SlotEditor binds its time inputs to integer minutes", () => {
  const s = populated();
  const { html } = render(h(SlotEditor, { screenId: "s1", slotId: "sl_1" }), s);
  assert.ok(html.includes('type="time"'), "native time inputs, for the mobile picker");
  assert.ok(html.includes('value="09:00"'), "540 renders as 09:00");
  assert.ok(html.includes('value="12:00"'), "720 renders as 12:00");
});

check("SlotEditor shows the outside-hours warning immediately", () => {
  const s = populated();
  const { html } = render(h(SlotEditor, { screenId: "s1", slotId: "sl_2" }), s);
  assert.ok(html.includes(t("schedule.warn.outsideHours")), "information, not a complaint");
  // A warning must not be dressed as an error.
  assert.ok(!html.includes('role="alert"'), "no alert role for a warning");
});

check("a new slot opens at the start of active hours, not midnight", () => {
  const s = populated();
  const { html } = render(h(SlotEditor, { screenId: "s2", slotId: null }), s);
  assert.ok(html.includes('value="09:00"'), "the default window opens at 09:00");
  assert.ok(html.includes('value="10:00"'), "for an hour");
  assert.ok(html.includes(t("schedule.addSlot")));
});

// ---- active hours ----

check("ActiveHoursEditor reads draft and warns about stranded slots", () => {
  const s = populated();
  const { html } = render(h(ActiveHoursEditor, { screenId: "s1" }), s);
  assert.ok(html.includes('value="09:00"') && html.includes('value="21:00"'), "the window");
  // sl_2 (01:00-04:00) cannot play inside 09:00-21:00, and it is named.
  assert.ok(html.includes(t("schedule.warn.outsideHours")), "the consequence is stated");
  assert.ok(html.includes("01:00"), "with the slot's own times");
});

check("ActiveHoursEditor reflects a committed change", () => {
  const s = reducer(populated(), activeHoursSet("s1", { start: 600, end: 1320 }));
  const { html } = render(h(ActiveHoursEditor, { screenId: "s1" }), s);
  assert.ok(html.includes('value="10:00"') && html.includes('value="22:00"'));
});

// ---- the save bar ----

const CHIP = {
  clean: "save.clean",
  dirty: "save.unsaved",
  saving: "save.saving",
  applied: "save.applied",
  saved: "save.saved",
  error: "save.error",
};

check("the chip says exactly what the machine's status is, in every state", () => {
  const base = populated();
  for (const [status, key] of Object.entries(CHIP)) {
    const s = { ...base, save: { ...base.save, status } };
    const { html } = render(h(SaveBar, null), s);
    assert.ok(html.includes(t(key)), `${status} shows ${key}`);
    // The critical one: nothing else may claim success.
    if (status !== "saved") {
      assert.ok(
        !html.includes(`>${t("save.saved")}<`),
        `${status} must not render the word "Saved"`
      );
    }
  }
});

check('"Saved" is unreachable before SAVE_SUCCESS, through the real machine', () => {
  let s = populated();
  const seen = [];
  const capture = () => {
    const { html } = render(h(SaveBar, null), s);
    seen.push(html.includes(t("save.saved")));
  };
  capture(); // dirty
  s = reducer(s, saveStart());
  capture(); // saving
  s = reducer(s, saveFail("simulated"));
  capture(); // error
  assert.deepEqual(seen, [false, false, false], "no state before success says Saved");

  s = reducer(s, saveSuccess(1));
  const { html } = render(h(SaveBar, null), s);
  assert.ok(html.includes(t("save.applied")), "success shows the applied transient first");
  assert.ok(!html.includes(t("save.saved")), "and still not 'Saved'");
});

check("Save is disabled when there is nothing to save, enabled when there is", () => {
  const base = populated();
  /**
   * The ATTRIBUTE, not the substring: the button's className carries Tailwind
   * `disabled:` variants in every state, so `html.includes("disabled")` is true
   * even when the button is live. An easy false pass to write.
   */
  const isDisabled = (status) =>
    /<button[^>]*data-td-target="save-button"[^>]*\sdisabled(\s|=|>)/.test(
      render(h(SaveBar, null), { ...base, save: { ...base.save, status } }).html
    );

  assert.equal(isDisabled("clean"), true, "clean offers nothing to press");
  assert.equal(isDisabled("saving"), true, "no double submit while in flight");
  assert.equal(isDisabled("dirty"), false, "dirty is pressable");
  assert.equal(isDisabled("error"), false, "and an error leaves Save pressable to retry");

  const dirty = render(h(SaveBar, null), { ...base, save: { ...base.save, status: "dirty" } });
  assert.ok(dirty.html.includes(t("save.discard")), "dirty also offers Discard");
  const clean = render(h(SaveBar, null), { ...base, save: { ...base.save, status: "clean" } });
  assert.ok(!clean.html.includes(t("save.discard")), "clean has nothing to discard");
});

// ---- the proportional timeline (phase 7) ----

/** The style attribute of the rail block for one slot id. */
function slotStyle(html, slotId) {
  const m = new RegExp(`<button[^>]*data-td-slot="${slotId}"[^>]*>`).exec(html);
  assert.ok(m, `no rail block rendered for ${slotId}`);
  const style = /style="([^"]*)"/.exec(m[0]);
  assert.ok(style, `${slotId} has no style attribute`);
  return style[1];
}

// THE phase 7 acceptance check (plan §12 row 7, §13): measured, not eyeballed.
check("a 09:00-12:00 slot is exactly 12.5% wide at 37.5% left", () => {
  const s = populated(); // sl_1 is 540-720
  const { html } = render(h(ScheduleTimelineView, { screenId: "s1" }), s);
  const style = slotStyle(html, "sl_1");
  assert.match(style, /left:\s*37\.5%/, "3/8 of the day in");
  assert.match(style, /width:\s*12\.5%/, "exactly 3/24 of the rail");
});

check("the rail does not lie about a 15-minute slot", () => {
  let s = reducer(initialState, creativeAdd("ci_a", TPL, { headline: "Quick" }, 1));
  s = reducer(s, slotAdd("s1", { id: "sl_q", startMin: 600, endMin: 615, instanceId: "ci_a" }));
  const { html } = render(h(ScheduleTimelineView, { screenId: "s1" }), s);
  const style = slotStyle(html, "sl_q");

  // 15/1440 = 1.0416…%. The block keeps its true width — the 44px tap target is
  // .td-slot::before in td.css, NOT a minimum width here, which would misreport
  // the duration. Widening the block is the one thing this view must never do.
  assert.match(style, /width:\s*1\.0416/, "its true proportional width, not a padded one");
  assert.ok(!/min-width/.test(style), "no minimum width on the block itself");
  assert.ok(html.includes("td-slot"), "it carries the class that provides the 44px target");
});

check("the playhead sits at the clock's position", () => {
  const s = { ...populated(), sim: { nowMin: 720, playing: false, speed: 60 } };
  const { html } = render(h(ScheduleTimelineView, { screenId: "s1" }), s);
  const m = /<span class="td-playhead" style="left:\s*([^"%]*)%/.exec(html);
  assert.ok(m, "the playhead is drawn");
  assert.equal(Number(m[1]), 50, "12:00 is halfway across the day");
});

check("active hours are drawn as the lit window", () => {
  const s = populated(); // 09:00-21:00
  const { html } = render(h(ScheduleTimelineView, { screenId: "s1" }), s);
  const m = /class="td-rail-lit" style="left:\s*([\d.]+)%;\s*width:\s*([\d.]+)%/.exec(html);
  assert.ok(m, "the lit window is drawn");
  assert.equal(Number(m[1]), 37.5, "opens at 09:00");
  assert.equal(Number(m[2]), 50, "and runs for 12 of the 24 hours");
  assert.ok(html.includes("td-rail-dim"), "against a dimmed remainder");
});

check("the rail hatches what is scheduled nowhere, inside the hours", () => {
  const s = populated(); // 09:00-12:00 inside 09:00-21:00 leaves 12:00-21:00 open
  const { html } = render(h(ScheduleTimelineView, { screenId: "s1" }), s);
  const gaps = [
    ...html.matchAll(/class="td-rail-gap td-hatch" style="left:\s*([\d.]+)%;\s*width:\s*([\d.]+)%/g),
  ];
  assert.equal(gaps.length, 1, "one uncovered stretch");
  assert.equal(Number(gaps[0][1]), 50, "from 12:00");
  assert.equal(Number(gaps[0][2]), 37.5, "to 21:00 — nine hours of the day");
});

check("23 gridlines, and hour labels at both densities", () => {
  const { html } = render(h(ScheduleTimelineView, { screenId: "s1" }), populated());
  // 25 hour positions, less 0% and 100% which are the rail's own borders.
  assert.equal([...html.matchAll(/class="td-gridline"/g)].length, 23);
  for (const label of ["00:00", "06:00", "12:00", "18:00", "24:00"]) {
    assert.ok(html.includes(`>${label}<`), `${label} is always shown`);
  }
  // The 3-hourly ones exist but are hidden below sm, where 9 labels collide.
  for (const label of ["03:00", "09:00", "15:00", "21:00"]) {
    assert.ok(html.includes(`>${label}<`), `${label} is rendered`);
  }
  assert.ok(html.includes("hidden sm:block"), "and suppressed at phone width");
});

// The single-source-of-truth claim, from the other side.
check("both views render the SAME slots from the same draft", () => {
  const s = populated();
  const list = render(h(ScheduleListView, { screenId: "s1" }), s).html;
  const rail = render(h(ScheduleTimelineView, { screenId: "s1" }), s).html;
  for (const time of ["09:00", "12:00", "01:00", "04:00"]) {
    assert.ok(list.includes(time), `the list shows ${time}`);
    assert.ok(rail.includes(time), `and so does the rail`);
  }
  // An edit through the shared dispatch shows up in both, with no sync step.
  const edited = reducer(s, { type: "SLOT_UPDATE", screenId: "s1", slotId: "sl_1", patch: { endMin: 660 } });
  const list2 = render(h(ScheduleListView, { screenId: "s1" }), edited).html;
  const rail2 = render(h(ScheduleTimelineView, { screenId: "s1" }), edited).html;
  assert.ok(list2.includes("11:00") && rail2.includes("11:00"), "both moved");
  assert.match(slotStyle(rail2, "sl_1"), /width:\s*8\.3333/, "and the rail re-measured it");
});

check("the outside-hours slot is distinguishable on the rail", () => {
  const { html } = render(h(ScheduleTimelineView, { screenId: "s1" }), populated());
  // sl_2 is 01:00-04:00, outside 09:00-21:00. sb-blush is the only warning fill.
  const m = new RegExp(`<button[^>]*data-td-slot="sl_2"[^>]*>`).exec(html);
  assert.ok(m[0].includes("bg-sb-blush"), "flagged, not hidden");
  const ok = new RegExp(`<button[^>]*data-td-slot="sl_1"[^>]*>`).exec(html);
  assert.ok(ok[0].includes("bg-sb-gradient"), "and a playable slot is not");
  // Screen readers get it as words, not colour.
  assert.ok(html.includes(t("schedule.outsideHoursBadge")));
});

// ---- the view toggle ----

check("the view toggle reflects ui.scheduleView and offers the other", () => {
  const s = populated();
  const list = render(h(ScheduleSection, { screenId: "s1" }), s).html;
  assert.ok(list.includes('data-td-target="schedule-list"'), "list by default");
  assert.ok(!list.includes('data-td-target="schedule-timeline"'), "one view at a time");

  const timeline = render(h(ScheduleSection, { screenId: "s1" }), {
    ...s,
    ui: { ...s.ui, scheduleView: "timeline" },
  }).html;
  assert.ok(timeline.includes('data-td-target="schedule-timeline"'), "timeline when asked");
  assert.ok(!timeline.includes('data-td-target="schedule-list"'));
  assert.ok(timeline.includes(t("schedule.listView")), "and the way back is offered");
});

// ---- the sim clock ----

check("the sim clock shows the time and marks the chosen speed", () => {
  const s = { ...populated(), sim: { nowMin: 780, playing: false, speed: 60 } };
  const { html } = render(h(SimClock, null), s);
  assert.ok(html.includes("13:00"), "780 reads as 13:00");
  assert.ok(html.includes(t("sim.play")), "paused offers Play");
  assert.ok(html.includes(t("sim.speedHour", { n: 1 })), "60 min/sec reads as 1 hr/sec");
  assert.ok(html.includes(t("sim.speedMin", { n: 1 })), "and 1 is offered as real time");
  // The chosen speed is the pressed one.
  assert.match(html, /aria-pressed="true"[^>]*>1 hr\/sec/);

  const playing = render(h(SimClock, null), {
    ...s,
    sim: { ...s.sim, playing: true },
  }).html;
  assert.ok(playing.includes(t("sim.pause")), "playing offers Pause");
});

check("the clock's time never carries a locale numeral", () => {
  // The whole reason time is an integer: Hindi numerals must not reach the UI's
  // clock values, where they would also break the native time input.
  for (const nowMin of [0, 545, 780, 1439]) {
    const { html } = render(h(SimClock, null), {
      ...populated(),
      sim: { nowMin, playing: false, speed: 60 },
    });
    const times = [...html.matchAll(/\d{2}:\d{2}/g)].map((x) => x[0]);
    assert.ok(times.length > 0, `a clock value is shown at ${nowMin}`);
    for (const time of times) {
      assert.match(time, /^[0-9]{2}:[0-9]{2}$/, `ASCII digits only, got ${time}`);
    }
  }
});

// ---- the per-screen unsaved dots ----

check("the edited screen carries an unsaved dot, and the others do not", () => {
  const s = populated(); // only s1 was edited
  assert.deepEqual(s.save.dirtyScreens, ["s1"], "the fixture edited one screen");

  const dotted = (screen) =>
    render(
      h(ScreenTile, {
        screen,
        resolution: null,
        health: null,
        selected: false,
        onSelect: () => {},
        dirty: s.save.dirtyScreens.includes(screen.id),
      }),
      s
    ).html.includes("td-dot-dirty");

  assert.equal(dotted(s.screens[0]), true, "s1 has edits the preview does not show");
  assert.equal(dotted(s.screens[1]), false, "s2 was not touched");

  // And the dots clear on commit, not on the settle.
  const after = reducer(s, saveSuccess(1));
  assert.deepEqual(after.save.dirtyScreens, [], "SAVE_SUCCESS clears them");
});

// ---- the control panel ----

check("ControlPanel names the screen it is acting on", () => {
  const s = { ...populated(), selectedScreenId: "s3" };
  const { html } = render(h(ControlPanel, null), s);
  assert.ok(html.includes(t("panel.forScreen", { screen: "Screen 3" })), "scoped, visibly");
  assert.ok(html.includes(t("panel.schedule")) && html.includes(t("panel.hours")), "tabs");
  assert.ok(html.includes('role="tablist"'));
});

// ---- Hindi ----

/**
 * The provider resolves to English in node (no localStorage, no query string), so
 * the Hindi pass asserts the dictionary rather than a render: that every key this
 * phase uses exists in BOTH trees and is non-empty Devanagari, not an English
 * fallback silently filling in. A real bilingual render is a browser check and is
 * not claimed here.
 */
check("every key this phase renders exists in Hindi, and is not English", () => {
  const keys = [
    "schedule.title",
    "schedule.addSlot",
    "schedule.editSlot",
    "schedule.startTime",
    "schedule.endTime",
    "schedule.creative",
    "schedule.empty",
    "schedule.outsideHoursBadge",
    "schedule.remove",
    "schedule.save",
    "schedule.cancel",
    "schedule.slotCount",
    "schedule.err.overlap",
    "schedule.err.tooMany",
    "schedule.err.endAfterStart",
    "schedule.err.minFive",
    "schedule.err.pickCreative",
    "schedule.warn.outsideHours",
    "schedule.listView",
    "schedule.timelineView",
    "schedule.hours24",
    "schedule.gap",
    "sim.time",
    "sim.play",
    "sim.pause",
    "sim.now",
    "sim.speed",
    "sim.speedMin",
    "sim.speedHour",
    "hours.title",
    "hours.description",
    "hours.start",
    "hours.end",
    "hours.outside",
    "hours.err.endAfterStart",
    "hours.err.tooShort",
    "save.action",
    "save.unsaved",
    "save.saving",
    "save.saved",
    "save.applied",
    "save.error",
    "save.discard",
    "save.discardConfirm",
    "save.clean",
    "save.note",
    "panel.title",
    "panel.creative",
    "panel.schedule",
    "panel.hours",
    "panel.forScreen",
  ];
  const tHi = createT("hi");
  for (const key of keys) {
    const lookup = (d) => key.split(".").reduce((n, p) => n?.[p], d);
    assert.equal(typeof lookup(en), "string", `missing en: ${key}`);
    assert.equal(typeof lookup(hi), "string", `missing hi: ${key}`);
    assert.ok(lookup(hi).trim().length > 0, `empty hi: ${key}`);
    assert.notEqual(tHi(key), key, `hi fell back to the key: ${key}`);
    // Devanagari somewhere in it, so a copy-pasted English string is caught.
    // Exceptions: strings that are only a placeholder or punctuation.
    if (!/^[\s{}\w.–-]*$/.test(lookup(hi))) {
      assert.ok(/[ऀ-ॿ]/.test(lookup(hi)), `not Devanagari: ${key}`);
    }
  }
});

// ---- report ----

for (const { name, err } of failures) {
  console.error(`\nFAIL  ${name}\n      ${err.message.split("\n").join("\n      ")}`);
}
const total = passed + failures.length;
console.log(
  `\n${failures.length ? "FAILED" : "PASSED"}  ${passed}/${total} test-drive render checks` +
    (failures.length ? ` (${failures.length} failing)` : "")
);
process.exit(failures.length ? 1 : 0);
