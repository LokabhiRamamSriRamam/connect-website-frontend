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
 * On mobile the panel is full-width below the wall, never a narrow sidebar.
 *
 * The mission card is fixed to the bottom of the viewport rather than placed in
 * this flow, so it follows the visitor while they work. Extra bottom padding
 * below keeps it from covering the save bar on a short screen.
 */
export default function Console() {
  const { t } = useI18n();
  const { business, lead } = useTd();
  const { guided } = useTutorial();

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

        <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
          <ScreenWall />

          <aside className="flex flex-col gap-4">
            <SimClock />

            {/* Content, schedule, active hours, role and health. The
                connectivity toggles that used to sit here are now the fleet list
                inside the panel's health tab, which is where someone looking for
                a dropped screen would go. */}
            <ControlPanel />

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
