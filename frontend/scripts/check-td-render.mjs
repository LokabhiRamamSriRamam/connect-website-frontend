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
