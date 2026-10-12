import { Check, HelpCircle, Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { useI18n } from "../i18n/I18nContext.jsx";
import { useAudio } from "../audio/AudioContext.jsx";
import { useTutorial } from "./TutorialContext.jsx";
import { helpCueFor } from "./missions.js";
import Spotlight from "./Spotlight.jsx";

/**
 * The current mission: what to do, whether it is done, and the narration.
 *
 * A bottom sheet on mobile and a floating card from sm up. It sits at the bottom
 * on purpose — the controls every mission points at are in the Control Panel and
 * on the wall, both above it, so the card never covers its own target. The
 * Spotlight handles the rest by drawing outside the element.
 *
 * The caption text IS the narration script, so a muted visitor loses nothing:
 * the body below is the same i18n string the recording says. That is why the
 * plan requires the on-screen wording to stay consistent with the fixed audio.
 */
export default function MissionCard() {
  const { t } = useI18n();
  const audio = useAudio();
  const tutorial = useTutorial();

  const { mission, step, total, currentComplete, isLast, guided } = tutorial;
  if (!guided || !mission) return null;

  const playing = audio.status === "playing" && audio.cueId === mission.cueId;
  const loading = audio.status === "loading" && audio.cueId === mission.cueId;

  /**
   * Two missions have a second, deeper recording — the timeline and
   * primary/secondary explainers. Offered on request rather than autoplayed:
   * two cues per mission would have the card talking for twice as long.
   */
  const helpCue = helpCueFor(mission.id);

  return (
    <>
      <Spotlight target={mission.target} />

      <aside
        data-td-target="mission-card"
        aria-label={t(mission.titleKey)}
        className="td-safe-bottom fixed inset-x-0 bottom-0 z-50 border-t-2 border-sb-ink bg-white px-4 pt-3 shadow-[0_-6px_0_rgba(25,25,25,0.08)] sm:inset-x-auto sm:bottom-4 sm:left-4 sm:max-w-sm sm:rounded-2xl sm:border-2 sm:px-4 sm:pb-3 sm:shadow-[5px_5px_0_#191919]"
      >
        <header className="flex items-center gap-2">
          <span className="rounded-full border-2 border-sb-ink bg-sb-lilac px-2 py-0.5 text-[10px] font-extrabold tabular-nums">
            {t("tutorial.progress", { current: step, total })}
          </span>

          {/* Done is derived from the predicate, never from a click. */}
          {currentComplete && (
            <span className="inline-flex items-center gap-1 rounded-full border-2 border-sb-ink bg-sb-green/20 px-2 py-0.5 text-[10px] font-extrabold">
              <Check size={11} aria-hidden="true" />
              {t("tutorial.done")}
            </span>
          )}

          <div className="ml-auto flex items-center gap-1">
            {/* Mute, and a play control that is ALWAYS present — mobile blocks
                autoplay routinely, and a blocked cue with no way to start it is
                the failure the brief calls out. */}
            <button
              type="button"
              onClick={audio.toggleMute}
              aria-pressed={audio.muted}
              aria-label={audio.muted ? t("audio.unmute") : t("audio.mute")}
              className="td-tap rounded-full border-2 border-sb-ink bg-white p-1"
            >
              {audio.muted ? (
                <VolumeX size={12} aria-hidden="true" />
              ) : (
                <Volume2 size={12} aria-hidden="true" />
              )}
            </button>

            <button
              type="button"
              onClick={() => (playing ? audio.pause() : audio.play(mission.cueId))}
              aria-label={playing ? t("audio.pause") : t("audio.play")}
              className="td-tap rounded-full border-2 border-sb-ink bg-white p-1"
            >
              {playing ? (
                <Pause size={12} aria-hidden="true" />
              ) : (
                <Play size={12} aria-hidden="true" />
              )}
            </button>

            <button
              type="button"
              onClick={() => audio.replay(mission.cueId)}
              aria-label={t("audio.replay")}
              className="td-tap rounded-full border-2 border-sb-ink bg-white p-1"
            >
              <RotateCcw size={12} aria-hidden="true" />
            </button>
          </div>
        </header>

        <h2 className="mt-2 text-[15px] font-extrabold leading-tight tracking-tight">
          {t(mission.titleKey)}
        </h2>

        {/* The same string the narration speaks. Captions by construction. */}
        <p className="mt-1 text-[12.5px] font-semibold leading-relaxed text-sb-slate">
          {t(mission.bodyKey)}
        </p>

        {/* The hint appears only while the action is outstanding. Once it is
            done, repeating the instruction reads as not having noticed. */}
        {!currentComplete && (
          <p className="mt-1.5 rounded-xl border-2 border-sb-taupe bg-sb-cream px-2.5 py-1.5 text-[11.5px] font-bold text-sb-ink">
            {t(mission.hintKey)}
          </p>
        )}

        {/* A subtle, non-blocking indicator. The text tutorial above is fully
            functional without audio, so this must not look like an error. */}
        {audio.unavailable && (
          <p className="mt-1.5 text-[10px] font-bold text-sb-muted">
            {t("audio.unavailable")}
          </p>
        )}
        {loading && (
          <p className="mt-1.5 text-[10px] font-bold text-sb-muted">{t("audio.loading")}</p>
        )}

        <div className="mt-2.5 flex flex-wrap items-center gap-1.5 pb-1">
          <button
            type="button"
            data-td-target="mission-next"
            onClick={tutorial.advance}
            disabled={!currentComplete}
            /* Cannot be clicked past while the action is undone — the brief's
               requirement. Skip, below, is the always-available way out. */
            className="td-tap rounded-full border-2 border-sb-ink bg-sb-gradient px-3 py-1.5 text-[11.5px] font-extrabold text-white shadow-[2px_2px_0_#191919] disabled:cursor-not-allowed disabled:opacity-55"
          >
            {isLast ? t("tutorial.finish") : t("tutorial.next")}
          </button>

          <button
            type="button"
            onClick={tutorial.skipStep}
            className="td-tap rounded-full border-2 border-sb-ink bg-white px-2.5 py-1.5 text-[11px] font-extrabold"
          >
            {t("tutorial.skipStep")}
          </button>

          {helpCue && (
            <button
              type="button"
              data-td-target="mission-help"
              onClick={() => audio.play(helpCue)}
              className="td-tap inline-flex items-center gap-1 rounded-full border-2 border-sb-ink bg-sb-lilac px-2.5 py-1.5 text-[11px] font-extrabold"
            >
              <HelpCircle size={11} aria-hidden="true" />
              {t("tutorial.help")}
            </button>
          )}

          <button
            type="button"
            onClick={tutorial.skipAll}
            className="td-tap ml-auto text-[10.5px] font-extrabold text-sb-muted underline"
          >
            {t("tutorial.skip")}
          </button>
        </div>

        {/* Why Continue is disabled, said once rather than left to be guessed. */}
        {!currentComplete && (
          <p className="pb-1 text-[10px] font-bold text-sb-muted">
            {t("tutorial.actionNeeded")}
          </p>
        )}
      </aside>
    </>
  );
}
