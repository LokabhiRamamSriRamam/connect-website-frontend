import { useCallback, useContext, useEffect, useMemo, useRef } from "react";
import { useTd, useTdDispatch } from "../state/TestDriveContext.jsx";
import { tutAdvance, tutComplete, tutOpenHelp, tutReplay, tutSetMode, tutSkipAll } from "../state/actions.js";
import { useAudio } from "../audio/AudioContext.jsx";
import { MISSIONS, MISSION_COUNT, getMission } from "./missions.js";
import { TutorialCtx } from "./contexts.js";

/**
 * The tutorial engine. DERIVED ONLY — it stores nothing of its own.
 *
 * Sits below TestDriveProvider and reads its state. Every mission's `isComplete`
 * is a pure predicate over that state, re-evaluated on each change, which is
 * what makes progress survive a refresh: the restored state re-evaluates to the
 * same answers rather than needing events replayed.
 *
 * The provider's one side effect is dispatching TUT_COMPLETE when a predicate
 * turns true. It does NOT auto-advance: a mission going green and the visitor
 * choosing to move on are different moments, and yanking the card away mid-action
 * would hide the thing they just achieved.
 */

export function TutorialProvider({ children }) {
  const state = useTd();
  const dispatch = useTdDispatch();
  const audio = useAudio();

  const { missionIndex, completed, mode, helpOpenFor } = state.tutorial;
  const guided = mode === "guided";
  const mission = guided ? getMission(missionIndex) : null;

  /**
   * Evaluate every mission, not only the current one.
   *
   * A visitor who does mission 4's action while on mission 2 has still done it,
   * and being asked again later would be a worse experience than the small cost
   * of six cheap predicates per dispatch.
   */
  const completionMap = useMemo(() => {
    const out = {};
    for (const m of MISSIONS) {
      try {
        out[m.id] = Boolean(m.isComplete(state));
      } catch (err) {
        // A throwing predicate must not take the tutorial — or the page — down.
        if (import.meta.env?.DEV) console.warn(`[td-tutorial] ${m.id} predicate threw`, err);
        out[m.id] = false;
      }
    }
    return out;
  }, [state]);

  // Record newly satisfied missions. TUT_COMPLETE is idempotent, so a predicate
  // that stays true does not re-dispatch forever.
  useEffect(() => {
    for (const m of MISSIONS) {
      if (completionMap[m.id] && !completed.includes(m.id)) {
        dispatch(tutComplete(m.id));
      }
    }
  }, [completionMap, completed, dispatch]);

  /**
   * Play the current mission's narration when the mission changes.
   *
   * Keyed on the cue id, not on the mission object, so a re-render cannot
   * restart the narration mid-sentence. A blocked autoplay is normal and
   * handled in the engine; nothing here treats it as a failure.
   */
  const lastCue = useRef(null);
  useEffect(() => {
    if (!guided || !mission?.cueId) return;
    if (lastCue.current === mission.cueId) return;
    lastCue.current = mission.cueId;
    if (!audio.muted) audio.play(mission.cueId);
  }, [guided, mission?.cueId, audio]);

  const currentComplete = mission ? Boolean(completionMap[mission.id]) : false;
  const isLast = missionIndex >= MISSION_COUNT - 1;

  /**
   * Advance. Refuses while the current mission's action is undone — the brief
   * requires that a mission cannot be clicked past — and Skip is the way out,
   * which is always offered separately.
   */
  const advance = useCallback(() => {
    if (!currentComplete) return false;
    dispatch(tutAdvance(MISSION_COUNT));
    return true;
  }, [currentComplete, dispatch]);

  const value = useMemo(
    () => ({
      mission,
      missionIndex,
      total: MISSION_COUNT,
      /** 1-based, for "Step N of 6". */
      step: Math.min(missionIndex + 1, MISSION_COUNT),
      guided,
      mode,
      completed,
      completionMap,
      currentComplete,
      isLast,
      /** True once every mission's action has actually been done. */
      allComplete: MISSIONS.every((m) => completed.includes(m.id)),
      helpOpenFor,
      advance,
      skipStep: () => dispatch(tutAdvance(MISSION_COUNT)),
      skipAll: () => {
        audio.stop();
        dispatch(tutSkipAll());
      },
      replay: () => dispatch(tutReplay()),
      setMode: (next) => dispatch(tutSetMode(next)),
      openHelp: (id) => dispatch(tutOpenHelp(id)),
    }),
    [
      mission,
      missionIndex,
      guided,
      mode,
      completed,
      completionMap,
      currentComplete,
      isLast,
      helpOpenFor,
      advance,
      dispatch,
      audio,
    ]
  );

  return <TutorialCtx.Provider value={value}>{children}</TutorialCtx.Provider>;
}

export function useTutorial() {
  const ctx = useContext(TutorialCtx);
  if (!ctx) throw new Error("useTutorial must be used inside <TutorialProvider>");
  return ctx;
}
