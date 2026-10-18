/**
 * The six missions, declarative.
 *
 * PREDICATES OVER STATE, not event subscription. Three reasons, all of which
 * bite the alternative:
 *   1. Idempotent. Re-evaluating on every state change cannot double-advance,
 *      and cannot miss a change that happened between renders.
 *   2. Survives a refresh. Persisted progress rehydrates and the predicates
 *      re-evaluate against the restored state, so a half-finished mission is
 *      still half-finished. An event listener would have missed the event.
 *   3. Cannot miss an action. A visitor who does the thing before being asked —
 *      and they will, the controls are right there — has already completed the
 *      mission when it opens, rather than being told to do it again.
 *
 * `isComplete` receives the whole TestDrive state and returns a boolean. It must
 * be PURE and cheap: it runs on every dispatch.
 *
 * Plain .js, no JSX and no React: scripts/check-test-drive.mjs validates the
 * titleKey/bodyKey/hintKey of every mission against both dictionaries, and the
 * cueId against the audio manifest.
 */
import { CUES } from "../audio/manifest.js";

/** Did the visitor configure at least one creative of their own? */
const hasInstance = (s) => Object.keys(s.creativeInstances).length > 0;

/** Every slot the visitor has placed, across all screens. */
const allSlots = (s) =>
  Object.values(s.draft.byScreen).flatMap((cfg) => cfg.slots);

export const MISSIONS = [
  {
    id: "m1",
    order: 1,
    titleKey: "tutorial.m1.title",
    bodyKey: "tutorial.m1.body",
    hintKey: "tutorial.m1.hint",
    cueId: "exploreScreens",
    target: "screen-wall",
    // Any non-default tile completes it; s2 is the one the arrow names.
    arrowTargets: ["screen-tile-s2", "screen-wall", "console-tab-screens"],
    /**
     * Tap any screen other than the default s1. The wallView requirement was
     * removed: on mobile the view toggle is easy to miss, and blocking "next"
     * until two separate controls are used frustrated visitors who had clearly
     * understood the mission (they'd tapped a screen).
     */
    isComplete: (s) => s.selectedScreenId !== "s1",
  },
  {
    id: "m2",
    order: 2,
    titleKey: "tutorial.m2.title",
    bodyKey: "tutorial.m2.body",
    hintKey: "tutorial.m2.hint",
    cueId: "controlPanelHealth",
    target: "health-panel",
    panelTab: "health",
    // Refresh once the health tab is open, the health tab while the panel is
    // open, the console tab before that. The predicate is health.tick, so the
    // chain must END on Refresh — opening the tab alone does not complete it.
    arrowTargets: ["health-refresh", "panel-tab-health", "console-tab-panel"],
    /**
     * Opening a tab is local component state, which a predicate over reducer
     * state cannot see — and moving it into the reducer to make it observable
     * would be the tail wagging the dog.
     *
     * Re-rolling the simulated health IS observable (health.tick), is the thing
     * the mission actually asks for ("start by checking its health"), and is
     * only reachable from inside the health tab. So the predicate tests the
     * action rather than the navigation to it.
     */
    isComplete: (s) => s.health.tick > 0,
  },
  {
    id: "m3",
    order: 3,
    titleKey: "tutorial.m3.title",
    bodyKey: "tutorial.m3.body",
    hintKey: "tutorial.m3.hint",
    cueId: "contentLibrary",
    target: "control-panel",
    // Opens on the content library, which is the mission's first instruction.
    panelTab: "creative",
    /**
     * TWO PHASES, so the chain is a function of state rather than a fixed list.
     *
     * A fixed list could not express this and got it wrong: `panel-tab-schedule`
     * sat above `creative-library`, and because that tab button is always
     * rendered the chain stopped there every time. For the whole of phase one
     * the arrow pointed at the Schedule tab while the instruction said "open the
     * content library" — it never once pointed at the library, at "Use this
     * creative", or at the editor.
     *
     * Phase one: no creative yet, so point into the library. Phase two: the
     * creative exists, so send them to Schedule and then to Add a time slot.
     */
    arrowTargets: (s) =>
      hasInstance(s)
        ? [
            "add-slot",
            "add-slot-timeline",
            "panel-tab-schedule",
            "console-tab-panel",
          ]
        : [
            "creative-use-first",
            "creative-library",
            "panel-tab-creative",
            "console-tab-panel",
          ],
    /**
     * Pick a creative AND give it a time. Both halves are required because
     * either alone leaves nothing on screen: a creative with no slot never
     * plays, and the slot cannot exist without a creative to point at.
     */
    isComplete: (s) => hasInstance(s) && allSlots(s).length > 0,
  },
  {
    id: "m4",
    order: 4,
    titleKey: "tutorial.m4.title",
    bodyKey: "tutorial.m4.body",
    hintKey: "tutorial.m4.hint",
    cueId: "primarySecondary",
    target: "mirror-editor",
    panelTab: "mirror",
    /**
     * `demote-screen` first, NOT `promote-screen`. The mission asks for a
     * primary to be made secondary, and promote is the opposite button — it
     * renders only on a screen that is already secondary, so it is absent for
     * the whole of the mission it was supposed to be pointing at. The arrow fell
     * through to save-bar, aiming at Save during a mirroring step.
     */
    arrowTargets: [
      "demote-screen",
      "mirror-editor",
      "panel-tab-mirror",
      "console-tab-panel",
    ],
    /** A real mirror link: role AND a target, since a secondary pointing
        nowhere is a broken link rather than a completed mission. */
    isComplete: (s) =>
      s.screens.some((screen) => screen.role === "secondary" && Boolean(screen.mirrors)),
  },
  {
    id: "m5",
    order: 5,
    titleKey: "tutorial.m5.title",
    bodyKey: "tutorial.m5.body",
    hintKey: "tutorial.m5.hint",
    cueId: "monitorSetup",
    target: "health-panel",
    panelTab: "health",
    /**
     * The fleet row, which opens that screen's readings in the detail block.
     * s2's is the one the arrow names.
     *
     * It used to name the connectivity toggle, which was the only live control
     * in the list — the rows themselves were inert text, so "inspect one
     * screen's status" asked for something the panel gave no way to do, and
     * completion secretly depended on taking a screen offline instead.
     */
    arrowTargets: [
      "health-row-s2",
      "health-panel",
      "panel-tab-health",
      "console-tab-panel",
    ],
    /**
     * EITHER inspecting a screen's readings OR taking one offline.
     *
     * The mission says "check connectivity and playback… then inspect one
     * screen's status", and the narration says the same, so inspecting must
     * satisfy it — requiring an offline toggle meant the stated action did
     * nothing and an unstated one was the real gate.
     *
     * The offline branch is kept because taking a screen down is the only way
     * to reach the offline and primaryOffline playback states, and a visitor
     * who explores that way has done more than the mission asked, not less.
     */
    isComplete: (s) =>
      s.health.inspected === true || s.screens.some((screen) => screen.online === false),
  },
  {
    id: "m6",
    order: 6,
    titleKey: "tutorial.m6.title",
    bodyKey: "tutorial.m6.body",
    hintKey: "tutorial.m6.hint",
    cueId: "saveSeeChanges",
    target: "save-bar",
    arrowTargets: ["save-button", "save-bar"],
    /**
     * A SUCCESSFUL save, not a press. `savedAt` is written only by SAVE_SUCCESS,
     * so this cannot complete on a save that failed — which matters, because the
     * mission's whole point is watching the previews update, and a failed save
     * updates nothing.
     */
    isComplete: (s) => s.savedAt !== null,
  },
];

export const MISSION_COUNT = MISSIONS.length;

/**
 * Supplementary narration, offered as contextual help rather than played
 * automatically.
 *
 * Two recordings exist that no mission's own cue covers: a deeper explanation of
 * the timeline, and one of primary/secondary. They are extra depth on a mission
 * the visitor is already in, so autoplaying them would mean two cues per mission
 * and a card that talks for twice as long. Offered on request instead, from the
 * mission they belong to.
 *
 * check:td asserts that every cue is either a mission's or listed here, so a
 * recording cannot sit unreferenced and unheard.
 */
export const HELP_CUES = {
  m3: "scheduleTimeline",
  m4: "mirrorExplainer",
};

/** The extra cue available on a mission, or null. */
export function helpCueFor(missionId) {
  return HELP_CUES[missionId] ?? null;
}

export function getMission(index) {
  return MISSIONS[index] ?? null;
}

export function missionById(id) {
  return MISSIONS.find((m) => m.id === id) ?? null;
}

/** Every cue a mission refers to must exist in the audio manifest. */
export function missionCueIds() {
  return MISSIONS.map((m) => m.cueId).filter((id) => Boolean(CUES[id]));
}
