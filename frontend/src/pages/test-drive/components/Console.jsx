import { useEffect, useState } from "react";
import { useI18n } from "../i18n/I18nContext.jsx";
import { useTd } from "../state/TestDriveContext.jsx";
import TdShell from "./TdShell.jsx";
import ScreenWall from "./ScreenWall.jsx";
import SimClock from "./SimClock.jsx";
import ControlPanel from "./ControlPanel.jsx";
import SaveBar from "./SaveBar.jsx";
import RestartDialog from "./RestartDialog.jsx";
import MissionCard from "../tutorial/MissionCard.jsx";
import CompletionCard from "../tutorial/CompletionCard.jsx";
import { useTutorial } from "../tutorial/TutorialContext.jsx";

/**
 * The console stage: the screen wall, the preview clock, the Control Panel and
 * the save bar.
 *
 * The wall reads SAVED config and the Control Panel writes DRAFT, which is the
 * whole point of the layout: edits appear in the panel immediately and on the
 * screens only when the visitor saves. The save bar is sticky at the bottom so
 * the chip is visible from wherever they are editing.
 *
 * BELOW lg the wall and the panel are two TABS, not one long scroll. Stacked,
 * the Control Panel began about a screen and a half below the fold, so a mission
 * that points into the panel was pointing at something the visitor could not see
 * and had been given no reason to scroll to. At lg and up both are visible in
 * two columns and the tabs would be a regression, so they are mobile-only: the
 * tab row is `lg:hidden` and each half carries `lg:block` to override the
 * hiding.
 *
 * The open tab is LOCAL state, deliberately. It is view position with nothing to
 * preserve, and keeping it out of the reducer keeps it out of `ui` — which no
 * mission predicate may read, since `ui` is not persisted and a predicate over
 * it re-evaluates false after a refresh (the m1 bug).
 *
 * The mission card is fixed to the bottom of the viewport rather than placed in
 * this flow, so it follows the visitor while they work. Extra bottom padding
 * below keeps it from covering the save bar on a short screen.
 */

/** Which half is showing below lg. */
const TABS = [
  ["screens", "screens.title"],
  ["panel", "panel.title"],
];

export default function Console() {
  const { t } = useI18n();
  const { business, lead } = useTd();
  const { guided, mission } = useTutorial();

  const [tab, setTab] = useState("screens");
  const [panelTab, setPanelTab] = useState("creative");

  /**
   * Follow the mission into the half it is teaching, AND into the Control Panel
   * tab it is teaching.
   *
   * Every mission from m2 on points at a control inside the Control Panel, so on
   * a phone the arrow would otherwise hang over a collapsed tab. Mission 3 was
   * worse than that: it arrived with Health still open from mission 2, so the
   * content library it asks for was not in the DOM at all and the arrow fell
   * through to the Schedule tab — sending the visitor somewhere the instruction
   * never mentioned.
   *
   * It runs on mission.id only — not on `tab` or `panelTab` — so a visitor who
   * navigates away mid-mission is not yanked back on the next render.
   */
  useEffect(() => {
    if (!guided || !mission) return;
    setTab(mission.id === "m1" ? "screens" : "panel");
    if (mission.panelTab) setPanelTab(mission.panelTab);
  }, [guided, mission?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <TdShell showBadge>
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          {business.businessName
            ? t("intro.arrival", { business: business.businessName })
            : t("intro.arrivalGeneric")}
        </h1>
        <div className="mt-1.5 flex flex-wrap items-center gap-3">
          <p className="text-[14px] font-semibold leading-relaxed text-sb-slate">
            {t("intro.control")}
          </p>
          {/* Destructive, and behind a confirm that names what is lost. Up here
              rather than in the save bar, so it is nowhere near Save. */}
          <span className="ml-auto">
            <RestartDialog />
          </span>
        </div>

        {lead.status === "error" && (
          <p
            role="status"
            className="mt-4 rounded-2xl border-2 border-sb-taupe bg-white px-4 py-3 text-[13px] font-bold text-sb-muted"
          >
            {t("intake.leadFailed")}
          </p>
        )}

        {/* grid-cols-[minmax(0,1fr)] on the base, not just at lg: an implicit grid
            column is `auto`, which sizes to max-content, so below lg the single
            column grew to the widest tile and pushed the whole wall off a 360px
            screen. The minmax(0,…) floor is what lets it shrink. */}
        {/* items-start: a grid row stretches its items by default, so the wall's
            white panel was being pulled down to the control panel's height and
            trailing ~460px of empty cream below the thumbnails. Each column should
            size to its own content. */}
        {/* Two tabs below lg only. Full-width halves of a row that is already
            two columns at lg, so this row is hidden there. */}
        <div
          role="tablist"
          aria-label={t("panel.title")}
          className="mt-5 flex gap-1 rounded-full border-2 border-sb-ink bg-sb-cream p-1 lg:hidden"
        >
          {TABS.map(([id, labelKey]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              data-td-target={`console-tab-${id}`}
              onClick={() => setTab(id)}
              className={`td-tap flex-1 whitespace-nowrap rounded-full px-3 py-1.5 text-[12px] font-extrabold transition-colors ${
                tab === id
                  ? "bg-sb-gradient text-white shadow-[2px_2px_0_#191919]"
                  : "text-sb-ink hover:bg-sb-lilac"
              }`}
            >
              {t(labelKey)}
            </button>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-[minmax(0,1fr)] items-start gap-5 lg:mt-5 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* `hidden lg:block` rather than unmounting: a remount would reset the
              Control Panel's own open tab and the creative editor it may have
              open, so switching back to Screens and forward again would silently
              throw away where the visitor was. */}
          <div className={tab === "screens" ? "" : "hidden lg:block"}>
            <ScreenWall />
          </div>

          <aside
            className={`flex-col gap-4 lg:flex ${
              tab === "panel" ? "flex" : "hidden"
            }`}
          >
            <SimClock />

            {/* Content, schedule, active hours, role and health. The
                connectivity toggles that used to sit here are now the fleet list
                inside the panel's health tab, which is where someone looking for
                a dropped screen would go. */}
            <ControlPanel tab={panelTab} onTabChange={setPanelTab} />

          </aside>
        </div>

        {/* Once the guided run is over, what they actually did. Driven by
            `completed`, so a skipped mission shows unticked. */}
        {!guided && (
          <div className="mt-5">
            <CompletionCard />
          </div>
        )}

        <SaveBar />

        {/* Room for the fixed mission card, which would otherwise sit on top of
            the save bar at the bottom of a short viewport. */}
        {guided && <div aria-hidden="true" className="h-44 sm:h-0" />}
      </div>

      <MissionCard />
    </TdShell>
  );
}
