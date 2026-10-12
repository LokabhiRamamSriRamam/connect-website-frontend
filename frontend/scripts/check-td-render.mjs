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
  setMirror,
  toggleScreenOnline,
} from "../src/pages/test-drive/state/actions.js";
import { createT } from "../src/pages/test-drive/i18n/index.js";
import { en, hi } from "../src/pages/test-drive/i18n/index.js";

import ScheduleListView from "../src/pages/test-drive/components/ScheduleListView.jsx";
import ActiveHoursEditor from "../src/pages/test-drive/components/ActiveHoursEditor.jsx";
import SlotEditor from "../src/pages/test-drive/components/SlotEditor.jsx";
import SaveBar from "../src/pages/test-drive/components/SaveBar.jsx";
import ControlPanel, {
  SecondaryNotice,
} from "../src/pages/test-drive/components/ControlPanel.jsx";
import ScreenTile from "../src/pages/test-drive/components/ScreenTile.jsx";
import ScheduleTimelineView from "../src/pages/test-drive/components/ScheduleTimelineView.jsx";
import ScheduleSection from "../src/pages/test-drive/components/ScheduleSection.jsx";
import SimClock from "../src/pages/test-drive/components/SimClock.jsx";
import MirrorEditor from "../src/pages/test-drive/components/MirrorEditor.jsx";
import HealthPanel from "../src/pages/test-drive/components/HealthPanel.jsx";
import ScreenWall from "../src/pages/test-drive/components/ScreenWall.jsx";
import { AudioCtx } from "../src/pages/test-drive/audio/contexts.js";
import { TutorialCtx } from "../src/pages/test-drive/tutorial/contexts.js";
import MissionCard from "../src/pages/test-drive/tutorial/MissionCard.jsx";
import CompletionCard from "../src/pages/test-drive/tutorial/CompletionCard.jsx";
import Spotlight from "../src/pages/test-drive/tutorial/Spotlight.jsx";
import { MISSIONS, helpCueFor } from "../src/pages/test-drive/tutorial/missions.js";
import CreativePicker from "../src/pages/test-drive/components/CreativePicker.jsx";
import RestartDialog from "../src/pages/test-drive/components/RestartDialog.jsx";
import { selectProgress } from "../src/pages/test-drive/state/persistence.js";
import CreativeFrame from "../src/pages/test-drive/creatives/CreativeFrame.jsx";
import {
  allCreatives,
  creativesFor,
} from "../src/pages/test-drive/creatives/registry.js";

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

/**
 * Escape a string the way React escapes a text child.
 *
 * A copy containing & or ' arrives in the markup as an entity ("You&#x27;re in
 * control.", "Iced &amp; Cold Brew"). Comparing the raw string would fail on
 * exactly the strings that prove escaping works, so expectations are escaped to
 * match. Any check asserting on copy that might contain punctuation uses this.
 */
const esc = (str) =>
  String(str).replace(/&/g, "&amp;").replace(/'/g, "&#x27;").replace(/</g, "&lt;");

/** t(), escaped — the usual way to assert that a piece of copy is on screen. */
const tEsc = (key, vars) => esc(t(key, vars));

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

// ---- mirroring and health (phase 8) ----

/** populated(), plus s2 mirroring s1 in the DRAFT only. */
function mirrored() {
  return reducer(populated(), setMirror("s2", "s1"));
}

check("MirrorEditor states what the screen is before offering to change it", () => {
  const primary = render(h(MirrorEditor, { screenId: "s1" }), populated()).html;
  assert.ok(primary.includes(t("screens.primary")), "a primary says so");
  assert.ok(primary.includes(t("screens.demoteConfirm")), "and is offered the demote");
  assert.ok(!primary.includes(t("screens.promoteConfirm")), "not the promote");

  const secondary = render(h(MirrorEditor, { screenId: "s2" }), mirrored()).html;
  assert.ok(
    secondary.includes(t("screens.mirroring", { screen: "Screen 1" })),
    "a secondary names its primary"
  );
  assert.ok(secondary.includes(t("screens.promoteConfirm")), "and is offered the promote");
  assert.ok(
    secondary.includes(t("screens.secondaryNotice", { screen: "Screen 1" })),
    "and is told where its content lives"
  );
});

check("the primary dropdown offers only links that would be legal", () => {
  let s = reducer(populated(), setMirror("s2", "s1"));
  s = reducer(s, setMirror("s3", "s2"));
  const { html } = render(h(MirrorEditor, { screenId: "s1" }), s);

  // s1 may not point at s2 or s3 — both close a loop back through s1 — nor itself.
  const options = [...html.matchAll(/<option value="(s\d)">/g)].map((m) => m[1]);
  assert.deepEqual(options.sort(), ["s4", "s5"], "only the unrelated screens");
  assert.equal(options.includes("s1"), false, "never itself");
});

check("demoting a followed screen warns, with a count", () => {
  let s = reducer(populated(), setMirror("s3", "s2"));
  s = reducer(s, setMirror("s4", "s3"));
  // s2 is followed by s3 and, through it, s4.
  const { html } = render(h(MirrorEditor, { screenId: "s2" }), s);
  assert.ok(
    html.includes(t("screens.followersWarning", { count: 2 })),
    "both followers are counted, two hops deep"
  );
});

check("a last primary cannot be demoted into nothing", () => {
  // Every other screen mirrors s1, so there is no legal target left.
  let s = populated();
  for (const id of ["s2", "s3", "s4", "s5"]) s = reducer(s, setMirror(id, "s1"));
  const { html } = render(h(MirrorEditor, { screenId: "s1" }), s);
  assert.ok(html.includes(t("screens.noPrimaries")), "it says why, rather than offering nothing");
  assert.ok(!html.includes("<option"), "and presents no dropdown at all");
});

/**
 * The panel's open tab is local state, so SSR always renders the first one and a
 * check cannot click to the others. These two assert the gating from either side:
 * the branch itself, and that the panel does branch on the draft's role.
 */
check("a secondary gets the notice where a primary gets the editor", () => {
  const s = { ...mirrored(), selectedScreenId: "s2" };
  const notice = render(h(SecondaryNotice, { screen: s.screens[1] }), s).html;
  assert.ok(notice.includes('data-td-target="secondary-notice"'));
  assert.ok(notice.includes(t("screens.secondaryNotice", { screen: "Screen 1" })), "names it");

  // A "secondary" pointing nowhere is a broken link, not a primary's name.
  const orphan = { ...s.screens[1], role: "secondary", mirrors: null };
  const broken = render(h(SecondaryNotice, { screen: orphan }), s).html;
  assert.ok(broken.includes(t("play.reason.unknownScreen")), "reported, not papered over");

  // And a primary's schedule tab is the real editor.
  const real = render(h(ScheduleSection, { screenId: "s1" }), s).html;
  assert.ok(real.includes('data-td-target="schedule-list"'));
});

check("the panel branches on the DRAFT's role, not the saved one", () => {
  // Demoting must close the content tabs immediately, even though the wall keeps
  // the old arrangement until Save — the panel edits the draft, so it describes
  // the draft.
  const s = mirrored();
  assert.equal(s.screens.find((x) => x.id === "s2").role, "secondary", "draft says secondary");
  assert.equal(
    s.saved.screens.find((x) => x.id === "s2").role,
    "primary",
    "saved still says primary"
  );
  // The panel's own default tab is "creative", which both roles share, so what
  // this proves is that the role it would branch on comes from `screens`.
  const html = render(h(ControlPanel, null), { ...s, selectedScreenId: "s2" }).html;
  assert.ok(html.includes(t("panel.forScreen", { screen: "Screen 2" })), "scoped to s2");
  assert.ok(html.includes(t("panel.mirror")), "and the role tab is reachable");
});

check("the Control Panel offers all five tabs, in a row that can scroll", () => {
  const { html } = render(h(ControlPanel, null), populated());
  for (const key of ["panel.creative", "panel.schedule", "panel.hours", "panel.mirror", "panel.health"]) {
    assert.ok(html.includes(t(key)), `${key} is a tab`);
  }
  // Five tabs do not fit across 360px, and Hindi runs longer.
  assert.ok(html.includes("overflow-x-auto"), "the row scrolls rather than crushing them");
  assert.ok(html.includes("whitespace-nowrap"), "and no label wraps mid-word");
});

check("HealthPanel shows connectivity and playback as separate axes", () => {
  // 02:00: every screen is online AND showing nothing, which is two facts.
  const s = { ...populated(), sim: { nowMin: 120, playing: false, speed: 60 } };
  const { html } = render(h(HealthPanel, { screenId: "s1" }), s);
  assert.ok(html.includes(t("health.connectivity")), "connectivity row");
  assert.ok(html.includes(t("health.playback")), "playback row");
  assert.ok(html.includes(t("screens.online")), "online");
  assert.ok(html.includes(t("screens.playbackInactive")), "and not playing — both true at once");
  assert.ok(html.includes(t("health.uptime")) && html.includes(t("health.lastSeen")));
});

check("health figures are labelled simulated and never claim 100%", () => {
  const { html } = render(h(HealthPanel, { screenId: "s1" }), populated());
  assert.ok(html.includes(t("health.disclaimer")), "said plainly, not implied");
  const pcts = [...html.matchAll(/(\d{2}\.\d)%/g)].map((m) => Number(m[1]));
  assert.ok(pcts.length > 0, "uptime figures are shown");
  for (const p of pcts) {
    assert.ok(p < 100, `${p}% claims too much for a simulation`);
    // ASCII decimal point, like every other number in the feature.
    assert.match(String(p), /^\d+\.\d$/);
  }
});

check("an offline screen reads as offline, with a stale last-seen", () => {
  const s = reducer(populated(), toggleScreenOnline("s1"));
  const { html } = render(h(HealthPanel, { screenId: "s1" }), s);
  assert.ok(html.includes(t("screens.offline")), "it says offline");
  // Online screens read "Now"; an offline one must show a clock time instead.
  assert.ok(!/>Now</.test(html), "not 'last seen now' on a screen that is dark");
  assert.match(html, /\d{2}:\d{2}/, "a real elapsed time");
});

check("the fleet list carries the connectivity toggles", () => {
  const { html } = render(h(HealthPanel, { screenId: "s1" }), populated());
  for (let i = 1; i <= 5; i += 1) {
    assert.ok(html.includes(`Screen ${i}`), `Screen ${i} is listed`);
  }
  // Without a way to take a display dark, the offline and primaryOffline playback
  // states are unreachable from the UI entirely.
  assert.equal([...html.matchAll(/aria-pressed="true"/g)].length, 5, "five online toggles");
  assert.ok(html.includes(t("health.refresh")), "and a deterministic re-roll");
});

// The phase 8 acceptance line, from the UI's side.
check("a mirror link does not reach the wall before the save", () => {
  const linked = mirrored();
  const before = render(h(ScreenWall, null), linked).html;
  // ScreenTile badges from saved.screens, so s2 is still a primary on the wall.
  assert.equal(
    [...before.matchAll(new RegExp(t("screens.secondary"), "g"))].length,
    0,
    "no secondary badge yet"
  );
  assert.ok(!before.includes(t("screens.mirroring", { screen: "Screen 1" })));

  const saved = reducer(linked, saveSuccess(1));
  const after = render(h(ScreenWall, null), saved).html;
  assert.ok(after.includes(t("screens.secondary")), "and now the badge is there");
  assert.ok(
    after.includes(t("screens.mirroring", { screen: "Screen 1" })),
    "naming the screen it follows"
  );
});

// ---- the café library (phase 9) ----

check("a café visitor sees the café library, not the restaurant's", () => {
  /**
   * A clean state, not populated(): that fixture configures an instance of a
   * RESTAURANT template, and the picker lists configured instances under "Your
   * creatives" whatever the industry — correctly, since they are the visitor's
   * own work. What is being checked here is the template catalogue below that.
   */
  const s = {
    ...initialState,
    business: { ...initialState.business, industry: "cafe", businessName: "Ganga Cafe" },
  };
  const { html } = render(h(CreativePicker, { onEdit: () => {} }), s);
  for (const tpl of creativesFor("cafe")) {
    assert.ok(html.includes(esc(t(tpl.nameKey))), `${tpl.id} is offered`);
  }
  // And none of the restaurant set leaks in.
  for (const tpl of creativesFor("restaurant")) {
    assert.ok(!html.includes(esc(t(tpl.nameKey))), `${tpl.id} should not be here`);
  }
});

check("all 16 creatives render their defaults without a blank or an 'undefined'", () => {
  for (const tpl of allCreatives) {
    const { html } = render(
      h(CreativeFrame, { templateId: tpl.id, fields: tpl.defaults, label: tpl.id }),
      populated()
    );
    assert.ok(html.includes("<svg"), `${tpl.id} renders an svg`);
    assert.ok(!html.includes("undefined"), `${tpl.id} leaked "undefined" into the markup`);
    assert.ok(!html.includes("NaN"), `${tpl.id} leaked NaN into a coordinate`);
    // A creative that draws no text at all is a blank screen in production.
    assert.ok(/<text[\s>]/.test(html), `${tpl.id} drew no text`);
  }
});

check("the field editor has a label for every field all 16 declare", () => {
  // CreativeEditor renders t(`library.fields.${field}`), so a missing label
  // shows the visitor a raw dotted key.
  const fields = new Set(allCreatives.flatMap((tpl) => tpl.fields));
  for (const field of fields) {
    const key = `library.fields.${field}`;
    assert.notEqual(t(key), key, `no English label for ${field}`);
    assert.notEqual(createT("hi")(key), key, `no Hindi label for ${field}`);
  }
  // Three shapes across the two sets, which is what keeps the allowlist honestly
  // per-template rather than a global five-field assumption.
  const shapes = new Set(allCreatives.map((tpl) => tpl.fields.length));
  assert.ok(shapes.size >= 3, `expected 3 field-count shapes, got ${[...shapes]}`);
});

// ---- the tutorial (phase 10) ----

/**
 * MissionCard reads three contexts, two of which are not the simulator's. Rather
 * than a second harness, the tutorial and audio values are provided directly —
 * the card is a presentation component over them, which is what makes it
 * checkable at all without a browser.
 */
/** The default audio context value: nothing playing, nothing broken. */
const idleAudio = () => ({
  status: "idle",
  cueId: null,
  muted: false,
  unavailable: false,
  resumable: false,
  play: () => {},
  replay: () => {},
  pause: () => {},
  stop: () => {},
  toggleMute: () => {},
});

/** Mount a node that needs the simulator AND the audio context. */
function renderWithAudio(node, state, audioValue = {}) {
  return renderToStaticMarkup(
    h(
      I18nProvider,
      null,
      h(
        StateCtx.Provider,
        { value: state },
        h(
          DispatchCtx.Provider,
          { value: () => {} },
          h(AudioCtx.Provider, { value: { ...idleAudio(), ...audioValue } }, node)
        )
      )
    )
  );
}

function renderCard(state, tutorialValue, audioValue = {}) {
  return renderWithAudio(
    h(TutorialCtx.Provider, { value: tutorialValue }, h(MissionCard)),
    state,
    audioValue
  );
}

/** A tutorial context value for one mission. */
function tutorialOn(index, { done = false } = {}) {
  const mission = MISSIONS[index];
  return {
    mission,
    missionIndex: index,
    total: MISSIONS.length,
    step: index + 1,
    guided: true,
    mode: "guided",
    completed: [],
    completionMap: {},
    currentComplete: done,
    isLast: index === MISSIONS.length - 1,
    allComplete: false,
    helpOpenFor: null,
    advance: () => {},
    skipStep: () => {},
    skipAll: () => {},
    replay: () => {},
    setMode: () => {},
    openHelp: () => {},
  };
}

check("the card shows the step, the title and the narration script", () => {
  const html = renderCard(populated(), tutorialOn(0));
  assert.ok(html.includes(t("tutorial.progress", { current: 1, total: 6 })), "Step 1 of 6");
  assert.ok(html.includes(tEsc("tutorial.m1.title")));
  // The body IS the caption: a muted visitor reads what the recording says.
  assert.ok(html.includes(tEsc("tutorial.m1.body")), "the script is on screen");
  assert.ok(html.includes(tEsc("tutorial.m1.hint")), "and the hint, while undone");
});

// The brief's requirement: a mission cannot be clicked past.
check("Continue is disabled until the mission's action is done", () => {
  const undone = renderCard(populated(), tutorialOn(0, { done: false }));
  assert.ok(
    /<button[^>]*data-td-target="mission-next"[^>]*\sdisabled(\s|=|>)/.test(undone),
    "the attribute, not the Tailwind variant"
  );
  assert.ok(undone.includes(tEsc("tutorial.actionNeeded")), "and it says why");
  assert.ok(!undone.includes(t("tutorial.done")), "no done badge yet");

  const done = renderCard(populated(), tutorialOn(0, { done: true }));
  assert.ok(
    !/<button[^>]*data-td-target="mission-next"[^>]*\sdisabled(\s|=|>)/.test(done),
    "and it unlocks once the action is done"
  );
  assert.ok(done.includes(t("tutorial.done")), "with a done badge");
  assert.ok(!done.includes(tEsc("tutorial.m1.hint")), "the hint goes once it is done");
});

check("Skip is offered whatever the state", () => {
  for (const done of [false, true]) {
    const html = renderCard(populated(), tutorialOn(2, { done }));
    assert.ok(html.includes(t("tutorial.skip")), "skip the tutorial");
    assert.ok(html.includes(t("tutorial.skipStep")), "and skip this step");
  }
});

check("the last mission says Finish rather than Continue", () => {
  const last = renderCard(populated(), tutorialOn(5, { done: true }));
  assert.ok(last.includes(t("tutorial.finish")));
  assert.ok(!last.includes(t("tutorial.next")));
  const first = renderCard(populated(), tutorialOn(0, { done: true }));
  assert.ok(first.includes(t("tutorial.next")));
});

check("a play control is ALWAYS present, for a blocked autoplay", () => {
  // Mobile rejects autoplay routinely. A cue with no way to start it is the
  // failure the brief names.
  const blocked = renderCard(populated(), tutorialOn(0), {
    status: "paused",
    cueId: "exploreScreens",
    resumable: true,
  });
  assert.ok(blocked.includes(t("audio.play")), "a play button");
  assert.ok(blocked.includes(t("audio.replay")), "and a replay");
  assert.ok(blocked.includes(t("audio.mute")), "and a mute");
  // Nothing about a blocked cue should read as an error.
  assert.ok(!blocked.includes(t("audio.unavailable")), "blocked is not unavailable");

  const playing = renderCard(populated(), tutorialOn(0), {
    status: "playing",
    cueId: "exploreScreens",
  });
  assert.ok(playing.includes(t("audio.pause")), "and it offers Pause while playing");
});

check("missing narration is subtle and non-blocking", () => {
  const html = renderCard(populated(), tutorialOn(0), {
    status: "error",
    cueId: "exploreScreens",
    unavailable: true,
  });
  assert.ok(html.includes(t("audio.unavailable")), "an indicator appears");
  // THE requirement: the text tutorial stays fully functional.
  assert.ok(html.includes(tEsc("tutorial.m1.title")), "the mission is still there");
  assert.ok(html.includes(tEsc("tutorial.m1.body")), "and its script");
  assert.ok(html.includes(tEsc("tutorial.m1.hint")), "and its hint");
  assert.ok(!html.includes(t("audio.loading")), "and it is not still 'loading'");
});

check("a loading cue says so, and an idle one does not", () => {
  const loading = renderCard(populated(), tutorialOn(0), {
    status: "loading",
    cueId: "exploreScreens",
  });
  assert.ok(loading.includes(t("audio.loading")));
  const idle = renderCard(populated(), tutorialOn(0));
  assert.ok(!idle.includes(t("audio.loading")), "no spinner text when nothing is loading");
});

check("the two supplementary recordings are reachable from their missions", () => {
  // m3 and m4 have a second, deeper cue. Without this button those two
  // recordings would exist and never be heard.
  for (const [index, missionId] of [[2, "m3"], [3, "m4"]]) {
    assert.ok(helpCueFor(missionId), `${missionId} has a help cue`);
    const html = renderCard(populated(), tutorialOn(index));
    assert.ok(html.includes('data-td-target="mission-help"'), `${missionId} offers it`);
    assert.ok(html.includes(t("tutorial.help")));
  }
  // And a mission without one does not show an inert button.
  const m1 = renderCard(populated(), tutorialOn(0));
  assert.ok(!m1.includes('data-td-target="mission-help"'), "m1 has no second cue");
});

check("the card is not rendered at all outside guided mode", () => {
  const exploring = { ...tutorialOn(0), guided: false, mode: "explore" };
  assert.equal(renderCard(populated(), exploring), "", "nothing to dismiss");
  const noMission = { ...tutorialOn(0), mission: null };
  assert.equal(renderCard(populated(), noMission), "");
});

check("the completion checklist ticks only what was actually done", () => {
  // Driven by `completed`, which only a satisfied predicate writes. A skipped
  // mission must show UNTICKED, or the screen is a participation certificate.
  const value = {
    ...tutorialOn(5),
    guided: false,
    completed: ["m1", "m3"],
    allComplete: false,
  };
  const html = renderToStaticMarkup(
    h(
      I18nProvider,
      null,
      h(
        StateCtx.Provider,
        { value: populated() },
        h(
          DispatchCtx.Provider,
          { value: () => {} },
          h(
            AudioCtx.Provider,
            { value: { status: "idle", cueId: null, muted: false, stop: () => {} } },
            h(TutorialCtx.Provider, { value }, h(CompletionCard))
          )
        )
      )
    )
  );
  assert.ok(html.includes(tEsc("complete.title")));
  for (const key of [
    "complete.checklist.explore",
    "complete.checklist.schedule",
    "complete.checklist.mirror",
    "complete.checklist.monitor",
    "complete.checklist.save",
  ]) {
    assert.ok(html.includes(tEsc(key)), `${key} is listed`);
  }
  // Two done, three not: the ticks must not be five.
  const ticked = [...html.matchAll(/bg-sb-green\/30/g)].length;
  assert.equal(ticked, 2, `expected 2 ticks for ["m1","m3"], got ${ticked}`);
  assert.ok(!html.includes(t("tutorial.completeBadge")), "no completion badge while partial");

  const all = { ...value, completed: ["m1", "m2", "m3", "m4", "m5", "m6"], allComplete: true };
  const fullHtml = renderToStaticMarkup(
    h(
      I18nProvider,
      null,
      h(
        StateCtx.Provider,
        { value: populated() },
        h(
          DispatchCtx.Provider,
          { value: () => {} },
          h(
            AudioCtx.Provider,
            { value: { status: "idle", cueId: null, muted: false, stop: () => {} } },
            h(TutorialCtx.Provider, { value: all }, h(CompletionCard))
          )
        )
      )
    )
  );
  assert.equal([...fullHtml.matchAll(/bg-sb-green\/30/g)].length, 5, "all five ticked");
  assert.ok(fullHtml.includes(t("tutorial.completeBadge")), "and now the badge");
});

check("the spotlight renders nothing on the server", () => {
  // It measures the DOM, which does not exist here. Returning null rather than a
  // ring at 0,0 is what keeps it from flashing in the corner on first paint.
  const html = renderToStaticMarkup(h(Spotlight, { target: "screen-wall" }));
  assert.equal(html, "");
});

// ---- restart and persistence (phase 11) ----

check("the restart button is offered but the dialog is shut", () => {
  // RestartDialog stops the narration as well as clearing storage, so it needs
  // the audio context — hence renderWithAudio rather than the bare harness.
  const html = renderWithAudio(h(RestartDialog, null), populated());
  assert.ok(html.includes('data-td-target="restart"'), "the control is there");
  assert.ok(html.includes(tEsc("tutorial.restart")));
  /**
   * The confirm is a portal and closed by default, so none of its copy should be
   * in the markup yet. Asserted on the BODY and the title, not on
   * restart.confirm — that one is "Restart", which is a substring of the
   * button's own "Restart test drive" and would fail for the wrong reason.
   */
  assert.ok(!html.includes(tEsc("restart.body")), "the dialog is not open");
  assert.ok(!html.includes(tEsc("restart.title")));
  assert.ok(!html.includes('role="dialog"'));
});

check("the restart confirm names what is lost", () => {
  // "Are you sure?" is not good enough for ten minutes of someone's work.
  const body = t("restart.body");
  for (const thing of ["business details", "schedules", "tutorial progress"]) {
    assert.ok(body.includes(thing), `the copy should mention ${thing}`);
  }
  // And the Hindi says something, rather than falling back.
  assert.notEqual(createT("hi")("restart.body"), "restart.body");
});

check("a mission already done stays unlocked after a refresh", () => {
  /**
   * m1 asks for a wall-view switch, which lives in ui.wallView — and `ui` is
   * deliberately never persisted. So its predicate reads false after a refresh.
   * The card must still show it as done, off the persisted `completed` record,
   * or Continue re-locks and the visitor is asked to do it twice.
   */
  const restored = { ...populated(), tutorial: { ...populated().tutorial, completed: ["m1"] } };
  assert.equal(MISSIONS[0].isComplete(restored), false, "the live predicate is false");

  const value = { ...tutorialOn(0), completed: ["m1"], currentComplete: true };
  const html = renderCard(restored, value);
  assert.ok(html.includes(tEsc("tutorial.done")), "it still reads as done");
  assert.ok(
    !/<button[^>]*data-td-target="mission-next"[^>]*\sdisabled(\s|=|>)/.test(html),
    "and Continue is not re-locked"
  );
});

check("the persisted projection excludes ui and sim.playing", () => {
  // Asserted here as well as in check:td, because this is the one that would
  // notice a component reaching into persistence and widening the projection.
  const progress = selectProgress(populated());
  assert.equal("ui" in progress, false);
  assert.equal("playing" in progress.sim, false);
  assert.equal("phone" in progress.business, false, "no PII in localStorage");
  assert.equal("email" in progress.business, false);
  assert.ok("businessName" in progress.business, "but the trading name is kept");
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
    "panel.mirror",
    "panel.health",
    "screens.role",
    "screens.primary",
    "screens.secondary",
    "screens.mirroring",
    "screens.changePrimary",
    "screens.secondaryNotice",
    "screens.promoteTitle",
    "screens.promoteBody",
    "screens.promoteConfirm",
    "screens.demoteTitle",
    "screens.demoteBody",
    "screens.demoteConfirm",
    "screens.followersWarning",
    "screens.cannotMirrorSelf",
    "screens.cannotMirrorCycle",
    "screens.noPrimaries",
    "screens.online",
    "screens.offline",
    "screens.playbackActive",
    "screens.playbackInactive",
    "health.title",
    "health.disclaimer",
    "health.connectivity",
    "health.playback",
    "health.lastSeen",
    "health.uptime",
    "health.currentContent",
    "health.refresh",
    "play.reason.primaryOffline",
    "play.reason.unknownScreen",
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
