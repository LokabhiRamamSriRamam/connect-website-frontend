import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useI18n } from "../i18n/I18nContext.jsx";
import * as engine from "./engine.js";
import { AudioCtx } from "./contexts.js";

/**
 * A thin wrapper over the engine singleton.
 *
 * Thin on purpose: the element, the status machine and the one-cue-at-a-time
 * guarantee all live in engine.js, which is plain .js and testable in node. This
 * provider only subscribes, exposes the current snapshot, and knows the current
 * language — which the engine deliberately does not, so that the language rule
 * lives in one place.
 *
 * Sits BETWEEN I18nProvider and TestDriveProvider (see the provider-order
 * comment in TestDrive.jsx): it needs `lang` from above, and the simulator below
 * needs to be able to trigger cues. It owns no simulator state.
 */

const MUTE_KEY = "td.muted";

function readStoredMute() {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(MUTE_KEY) === "1";
  } catch {
    // Private mode throws on access. Narration on is the better default.
    return false;
  }
}

export function AudioProvider({ children }) {
  const { lang } = useI18n();
  const [snapshot, setSnapshot] = useState(() => engine.getState());
  const [muted, setMutedState] = useState(readStoredMute);

  // One subscription for the life of the provider. The engine hands out a fresh
  // object per change, so this re-renders exactly when the status moves.
  useEffect(() => engine.subscribe(setSnapshot), []);

  // Apply the stored preference once the engine exists.
  useEffect(() => {
    engine.setMuted(muted);
  }, [muted]);

  /**
   * A language switch stops narration mid-sentence, deliberately.
   *
   * The en and hi recordings are different files saying the same thing, so
   * continuing would leave the old language playing under the new UI. Stopping
   * is the honest outcome; the mission card's text has already switched, and the
   * visitor can press play to hear it in the new language.
   *
   * Keyed on `lang` alone: this must fire on a switch and NOT on a cue change.
   */
  useEffect(() => {
    engine.stop();
  }, [lang]);

  const play = useCallback((cueId) => engine.play(cueId, lang), [lang]);

  const replay = useCallback(
    (cueId) => engine.replay(cueId ?? engine.getState().cueId, lang),
    [lang]
  );

  const toggleMute = useCallback(() => {
    setMutedState((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(MUTE_KEY, next ? "1" : "0");
      } catch {
        /* non-fatal: the choice just will not persist */
      }
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      status: snapshot.status,
      cueId: snapshot.cueId,
      muted,
      /** True when this cue will not load — the subtle, non-blocking indicator. */
      unavailable: snapshot.status === "error" || snapshot.status === "unavailable",
      /** True while a cue is paused but resumable, e.g. a blocked autoplay. */
      resumable: snapshot.status === "paused" && Boolean(snapshot.cueId),
      play,
      replay,
      pause: engine.pause,
      stop: engine.stop,
      toggleMute,
    }),
    [snapshot, muted, play, replay, toggleMute]
  );

  return <AudioCtx.Provider value={value}>{children}</AudioCtx.Provider>;
}

export function useAudio() {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error("useAudio must be used inside <AudioProvider>");
  return ctx;
}
