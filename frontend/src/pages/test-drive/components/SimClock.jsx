import { useEffect } from "react";
import { useI18n } from "../i18n/I18nContext.jsx";
import { useTd, useTdDispatch } from "../state/TestDriveContext.jsx";
import { simPause, simPlay, simSetTime, simTick } from "../state/actions.js";
import { MINUTES_PER_DAY, hhmmToMinutes, minutesToInputValue } from "../domain/time.js";

/**
 * The preview clock: scrub or play time to watch the five screens change.
 *
 * This is what makes every playback state reachable without editing a schedule,
 * and therefore what makes this phase judgeable in a browser.
 *
 * Two inputs onto one value, deliberately: a range for exploring (drag across the
 * day and watch the wall react) and a native time input for precision. Both
 * dispatch SIM_SET_TIME; neither holds its own copy of the time, so they can
 * never disagree. The native input also gives the platform picker on mobile.
 */
export default function SimClock() {
  const { t } = useI18n();
  const { sim } = useTd();
  const dispatch = useTdDispatch();

  /**
   * The clock interval lives here, not in state: a timer id is not serialisable
   * and has no business in the reducer. A fixed 1s cadence with a variable step
   * (sim.speed minutes per tick) keeps the motion smooth and the arithmetic in
   * the pure advanceClock().
   */
  useEffect(() => {
    if (!sim.playing) return undefined;
    const id = setInterval(() => dispatch(simTick()), 1000);
    return () => clearInterval(id);
  }, [sim.playing, dispatch]);

  return (
    <section
      data-td-target="sim-clock"
      aria-label={t("sim.time")}
      className="rounded-2xl border-2 border-sb-ink bg-white p-3 shadow-[3px_3px_0_#191919]"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-sb-muted">
          {t("sim.time")}
        </span>

        {/* The current time, big enough to read while dragging. tabular-nums stops
            the row jittering as digits change width. */}
        <output className="rounded-full border-2 border-sb-ink bg-sb-lilac px-2.5 py-0.5 text-[13px] font-extrabold tabular-nums">
          {minutesToInputValue(sim.nowMin)}
        </output>

        <button
          type="button"
          onClick={() => dispatch(sim.playing ? simPause() : simPlay())}
          className="td-tap ml-auto rounded-full border-2 border-sb-ink bg-sb-gradient px-3 py-1 text-[11px] font-extrabold text-white shadow-[2px_2px_0_#191919]"
        >
          {sim.playing ? t("sim.pause") : t("sim.play")}
        </button>

        <label className="flex items-center gap-1.5">
          <span className="sr-only">{t("sim.time")}</span>
          <input
            type="time"
            value={minutesToInputValue(sim.nowMin)}
            onChange={(e) => {
              // hhmmToMinutes returns null for a cleared or half-typed value;
              // ignoring it leaves the clock where it was rather than jumping to
              // midnight mid-edit.
              const min = hhmmToMinutes(e.target.value);
              if (min !== null) dispatch(simSetTime(min));
            }}
            className="td-tap rounded-xl border-2 border-sb-ink bg-white px-2 py-1 text-[12px] font-bold tabular-nums"
          />
        </label>
      </div>

      <label className="mt-2.5 block">
        <span className="sr-only">{t("sim.time")}</span>
        <input
          type="range"
          min="0"
          max={MINUTES_PER_DAY}
          step="5"
          value={sim.nowMin}
          onChange={(e) => dispatch(simSetTime(Number(e.target.value)))}
          className="w-full accent-sb-violet"
        />
      </label>

      {/* Fixed ASCII endpoints: these are rail markers, not localised clock
          values, and they must line up with the 0-1440 range above. */}
      <div className="flex justify-between text-[10px] font-bold tabular-nums text-sb-muted">
        <span>00:00</span>
        <span className="hidden sm:inline">12:00</span>
        <span>24:00</span>
      </div>
    </section>
  );
}
