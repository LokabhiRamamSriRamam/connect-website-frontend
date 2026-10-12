import { Check } from "lucide-react";
import { useI18n } from "../i18n/I18nContext.jsx";
import { useAudio } from "../audio/AudioContext.jsx";
import { useTutorial } from "./TutorialContext.jsx";

/**
 * Shown once the guided tutorial is over: what the visitor actually did, and
 * what to do next.
 *
 * The checklist is driven by `completed`, which only TUT_COMPLETE writes and
 * only a satisfied predicate triggers. So a skipped mission shows UNTICKED. That
 * is deliberate: a checklist that ticks everything regardless is a participation
 * certificate, and the one thing this screen has to be is true.
 */

/** Checklist row -> the mission whose completion ticks it. */
const ROWS = [
  ["complete.checklist.explore", "m1"],
  ["complete.checklist.schedule", "m3"],
  ["complete.checklist.mirror", "m4"],
  ["complete.checklist.monitor", "m5"],
  ["complete.checklist.save", "m6"],
];

export default function CompletionCard() {
  const { t } = useI18n();
  const audio = useAudio();
  const { completed, allComplete, replay, setMode } = useTutorial();

  return (
    <section
      data-td-target="completion-card"
      aria-label={t("complete.title")}
      className="rounded-2xl border-2 border-sb-ink bg-sb-ivory p-4 shadow-[4px_4px_0_#191919]"
    >
      <h2 className="text-lg font-extrabold leading-tight tracking-tight">
        {t("complete.title")}
      </h2>
      <p className="mt-1.5 text-[13px] font-semibold leading-relaxed text-sb-slate">
        {t("complete.body")}
      </p>

      {allComplete && (
        <p className="mt-2 inline-flex items-center gap-1 rounded-full border-2 border-sb-ink bg-sb-green/20 px-2.5 py-0.5 text-[10px] font-extrabold">
          <Check size={11} aria-hidden="true" />
          {t("tutorial.completeBadge")}
        </p>
      )}

      <ul className="mt-3 flex flex-col gap-1.5">
        {ROWS.map(([labelKey, missionId]) => {
          const done = completed.includes(missionId);
          return (
            <li key={missionId} className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-sb-ink ${
                  done ? "bg-sb-green/30" : "bg-white"
                }`}
              >
                {done && <Check size={9} aria-hidden="true" />}
              </span>
              <span
                className={`text-[12px] font-bold ${done ? "text-sb-ink" : "text-sb-muted"}`}
              >
                {t(labelKey)}
              </span>
              {/* Stated in words too: a tick is a colour and a glyph, and a
                  screen reader should not have to infer from either. */}
              <span className="sr-only">
                {done ? t("tutorial.done") : t("tutorial.actionNeeded")}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="mt-4 flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => {
            audio.stop();
            replay();
          }}
          className="td-tap rounded-full border-2 border-sb-ink bg-sb-gradient px-3 py-1.5 text-[11.5px] font-extrabold text-white shadow-[2px_2px_0_#191919]"
        >
          {t("complete.replay")}
        </button>
        <button
          type="button"
          onClick={() => setMode("explore")}
          className="td-tap rounded-full border-2 border-sb-ink bg-white px-3 py-1.5 text-[11.5px] font-extrabold"
        >
          {t("complete.exploreFreely")}
        </button>
        <a
          href="/get-in-touch"
          className="td-tap rounded-full border-2 border-sb-ink bg-sb-gold px-3 py-1.5 text-[11.5px] font-extrabold"
        >
          {t("complete.talk")}
        </a>
      </div>
    </section>
  );
}
