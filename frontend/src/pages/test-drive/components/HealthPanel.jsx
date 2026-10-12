import { useMemo } from "react";
import { RefreshCw } from "lucide-react";
import { useI18n } from "../i18n/I18nContext.jsx";
import { screenLabel } from "../i18n/index.js";
import { useTd, useTdDispatch } from "../state/TestDriveContext.jsx";
import { healthTick, toggleScreenOnline } from "../state/actions.js";
import { allScreenHealth, healthSummary } from "../domain/health.js";
import { resolveAllScreens } from "../domain/playback.js";
import { minutesToHHMM } from "../domain/time.js";

/**
 * Simulated connectivity and playback for the fleet, and for one screen in
 * detail.
 *
 * SIMULATED, and labelled so wherever it appears. Inventing plausible hardware
 * telemetry and presenting it as real would misrepresent what this test drive
 * is; the disclaimer is not boilerplate, it is the thing that makes showing
 * numbers at all honest.
 *
 * Connectivity and playback are two axes, shown as two rows. An online screen
 * outside its active hours is perfectly healthy AND showing nothing, and
 * collapsing that into one "status" would either cry wolf about a closed shop or
 * hide a screen that has genuinely dropped.
 *
 * Reads SAVED screens, like the wall does, so the figures describe what is on
 * the glass rather than what the visitor is drafting.
 */
export default function HealthPanel({ screenId }) {
  const { t } = useI18n();
  const { saved, creativeInstances, sim, health } = useTd();
  const dispatch = useTdDispatch();

  const resolutions = useMemo(
    () => resolveAllScreens(saved.byScreen, saved.screens, creativeInstances, sim.nowMin),
    [saved.byScreen, saved.screens, creativeInstances, sim.nowMin]
  );

  const byScreen = useMemo(
    () => allScreenHealth(saved.screens, sim.nowMin, health.tick, resolutions),
    [saved.screens, sim.nowMin, health.tick, resolutions]
  );

  const summary = useMemo(() => healthSummary(saved.screens), [saved.screens]);

  const screen = saved.screens.find((s) => s.id === screenId) ?? saved.screens[0];
  const detail = byScreen[screen?.id];
  const resolution = resolutions[screen?.id];

  /** What is on this screen right now, named if it is a creative. */
  const nowShowing = () => {
    if (!resolution) return t("health.none");
    if (resolution.kind !== "creative") {
      return resolution.reason ? t(resolution.reason) : t("health.none");
    }
    const inst = creativeInstances[resolution.instanceId];
    return inst?.fields.headline || t("screens.nowPlaying");
  };

  return (
    <section data-td-target="health-panel" aria-label={t("health.title")}>
      <header className="flex flex-wrap items-center gap-2">
        <h3 className="text-sm font-extrabold">{t("health.title")}</h3>
        <span className="rounded-full border-2 border-sb-ink bg-white px-2 py-0.5 text-[10px] font-extrabold">
          {t(summary.key, summary.vars)}
        </span>
        {/* Re-rolling is deterministic: the reducer bumps a counter and the
            figures are derived from (screenId, tick), so the same tick always
            shows the same numbers and a refresh does not reshuffle the fleet. */}
        <button
          type="button"
          data-td-target="health-refresh"
          onClick={() => dispatch(healthTick())}
          className="td-tap ml-auto inline-flex items-center gap-1 rounded-full border-2 border-sb-ink bg-white px-2 py-0.5 text-[10px] font-extrabold"
        >
          <RefreshCw size={11} aria-hidden="true" />
          {t("health.refresh")}
        </button>
      </header>

      {/* The selected screen in detail: two axes, two rows. */}
      {detail && (
        <dl className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5 rounded-xl border-2 border-sb-ink bg-white p-2.5 text-[11px] font-bold">
          <dt className="text-sb-muted">{t("health.connectivity")}</dt>
          <dd className="font-extrabold">
            {detail.online ? t("screens.online") : t("screens.offline")}
          </dd>

          <dt className="text-sb-muted">{t("health.playback")}</dt>
          <dd className="font-extrabold">
            {detail.playing ? t("screens.playbackActive") : t("screens.playbackInactive")}
          </dd>

          <dt className="text-sb-muted">{t("health.uptime")}</dt>
          {/* toFixed(1) with an ASCII point: a simulated figure must not pick up
              a locale separator, for the same reason time is an integer. */}
          <dd className="font-extrabold tabular-nums">{detail.uptimePct.toFixed(1)}%</dd>

          <dt className="text-sb-muted">{t("health.lastSeen")}</dt>
          <dd className="font-extrabold tabular-nums">
            {detail.online ? t("sim.now") : minutesToHHMM(detail.lastSeenMin)}
          </dd>

          <dt className="text-sb-muted">{t("health.currentContent")}</dt>
          <dd className="truncate font-extrabold">{nowShowing()}</dd>
        </dl>
      )}

      {/* The fleet, with the connectivity toggles. Without a way to take a
          display dark, the offline and primaryOffline playback states cannot be
          reached from the UI at all. */}
      <ul className="mt-2 flex flex-col gap-1">
        {saved.screens.map((s) => {
          const entry = byScreen[s.id];
          const online = entry?.online !== false;
          return (
            <li
              key={s.id}
              className={`flex items-center gap-2 rounded-xl border-2 px-2 py-1 ${
                s.id === screen?.id ? "border-sb-violet bg-sb-lavender" : "border-sb-mist bg-white"
              }`}
            >
              {/* Colour AND text: colour alone would fail anyone who cannot
                  distinguish it. */}
              <span
                aria-hidden="true"
                className={`h-2 w-2 shrink-0 rounded-full ${
                  online ? "bg-sb-green" : "bg-sb-muted"
                }`}
              />
              <span className="min-w-0 flex-1 truncate text-[11px] font-bold">
                {screenLabel(t, s)}
              </span>
              <span className="shrink-0 text-[10px] font-bold tabular-nums text-sb-muted">
                {entry ? `${entry.uptimePct.toFixed(1)}%` : ""}
              </span>
              <button
                type="button"
                onClick={() => dispatch(toggleScreenOnline(s.id))}
                aria-pressed={online}
                className={`td-tap shrink-0 rounded-full border-2 border-sb-ink px-2 py-0.5 text-[10px] font-extrabold ${
                  online ? "bg-sb-green/20 text-sb-ink" : "bg-sb-sand text-sb-muted"
                }`}
              >
                {online ? t("screens.online") : t("screens.offline")}
              </button>
            </li>
          );
        })}
      </ul>

      <p className="mt-2 text-[10px] font-bold text-sb-muted">{t("health.disclaimer")}</p>
    </section>
  );
}
