import { useMemo } from "react";
import { useI18n } from "../i18n/I18nContext.jsx";
import { useTd, useTdDispatch } from "../state/TestDriveContext.jsx";
import { selectScreen, uiSetWallView } from "../state/actions.js";
import { resolveAllScreens } from "../domain/playback.js";
import { allScreenHealth, healthSummary } from "../domain/health.js";
import ScreenTile from "./ScreenTile.jsx";
import ScreenPreview from "./ScreenPreview.jsx";

/**
 * The five virtual screens, and the large preview of whichever is selected.
 *
 * Reads SAVED config, never draft — `saved.byScreen` and `saved.screens`. That is
 * the subtle invariant from the plan: previews must change only when the visitor
 * saves, so passing `state.screens` here would leak role and mirror edits into
 * the wall before a save and make "Save and see the result" a lie.
 *
 * The only exception is connectivity, which TOGGLE_SCREEN_ONLINE writes to both
 * snapshots on purpose — it is part of the simulated environment rather than part
 * of the configuration being drafted. That reasoning is in the reducer case.
 */
export default function ScreenWall() {
  const { t } = useI18n();
  const state = useTd();
  const dispatch = useTdDispatch();
  const { saved, creativeInstances, sim, health, selectedScreenId, ui, save } = state;

  /**
   * Five pure resolutions, recomputed only when something that can change what is
   * on screen changes. sim.nowMin is in the deps because every minute of scrub
   * can cross a slot boundary; draft is deliberately NOT, for the reason above.
   */
  const resolutions = useMemo(
    () => resolveAllScreens(saved.byScreen, saved.screens, creativeInstances, sim.nowMin),
    [saved.byScreen, saved.screens, creativeInstances, sim.nowMin]
  );

  const healthByScreen = useMemo(
    () => allScreenHealth(saved.screens, sim.nowMin, health.tick, resolutions),
    [saved.screens, sim.nowMin, health.tick, resolutions]
  );

  const summary = useMemo(() => healthSummary(saved.screens), [saved.screens]);

  const selected = saved.screens.find((s) => s.id === selectedScreenId) ?? saved.screens[0];
  const selectedResolution = resolutions[selected?.id];

  /** Screen labels are generated, so resolve a mirror target to its real label. */
  const labelFor = (screenId) =>
    saved.screens.find((s) => s.id === screenId)?.label ?? "";

  const grid = ui.wallView === "grid";

  return (
    <section data-td-target="screen-wall" aria-label={t("screens.title")}>
      <header className="flex flex-wrap items-center gap-2">
        <h2 className="text-lg font-extrabold tracking-tight">{t("screens.title")}</h2>

        <span className="rounded-full border-2 border-sb-ink bg-white px-2.5 py-0.5 text-[10px] font-extrabold">
          {t(summary.key, summary.vars)}
        </span>

        {/* Mission 1 asks the visitor to switch views, so this is a real control,
            not decoration. Value-based, like LangToggle — never Seg's index. */}
        <div
          role="group"
          aria-label={t("screens.select")}
          className="ml-auto inline-flex items-center gap-1 rounded-full border-2 border-sb-ink bg-white p-1"
        >
          {[
            ["grid", t("screens.gridView")],
            ["list", t("screens.listView")],
          ].map(([view, label]) => (
            <button
              key={view}
              type="button"
              onClick={() => dispatch(uiSetWallView(view))}
              aria-pressed={ui.wallView === view}
              className={`td-tap rounded-full px-2.5 py-1 text-[11px] font-extrabold transition-all ${
                ui.wallView === view
                  ? "bg-sb-gradient text-white shadow-[2px_2px_0_#191919]"
                  : "text-sb-ink hover:bg-sb-lilac"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      {/* The selected screen, large. Placed above the wall on mobile so that
          tapping a tile shows its effect without scrolling. */}
      {selected && (
        <div className="mt-3 rounded-2xl border-2 border-sb-ink bg-white p-3 shadow-[4px_4px_0_#191919]">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-extrabold">{selected.label}</h3>
            <span className="rounded-full border-2 border-sb-ink bg-sb-lilac px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wide">
              {t("sim.virtualScreen")}
            </span>
            <span className="ml-auto text-[11px] font-bold text-sb-muted">
              {selectedResolution?.reason
                ? t(selectedResolution.reason)
                : t("screens.nowPlaying")}
            </span>
          </div>

          <ScreenPreview
            resolution={selectedResolution}
            scan
            className="mt-2 aspect-video w-full"
          />

          {/* A mirror's large preview must say whose content this is, or the
              visitor reads it as this screen's own schedule. */}
          {selectedResolution?.mirrored && selectedResolution.sourceScreenId && (
            <p className="mt-2 text-[11px] font-bold text-sb-iris">
              {t("screens.secondaryNotice", {
                screen: labelFor(selectedResolution.sourceScreenId),
              })}
            </p>
          )}
        </div>
      )}

      <ul
        className={
          grid
            ? "mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5"
            : "mt-3 flex flex-col gap-2.5"
        }
      >
        {saved.screens.map((screen) => (
          <li key={screen.id}>
            <ScreenTile
              screen={screen}
              resolution={resolutions[screen.id]}
              health={healthByScreen[screen.id]}
              selected={screen.id === selectedScreenId}
              onSelect={(id) => dispatch(selectScreen(id))}
              mirrorLabel={labelFor(screen.mirrors)}
              compact={grid}
              dirty={save.dirtyScreens.includes(screen.id)}
            />
          </li>
        ))}
      </ul>

      <p className="mt-3 text-[11px] font-bold text-sb-muted">{t("sim.simulatedHealth")}</p>
    </section>
  );
}
