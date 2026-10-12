import { useI18n } from "../i18n/I18nContext.jsx";
import { useTd, useTdDispatch } from "../state/TestDriveContext.jsx";
import { toggleScreenOnline } from "../state/actions.js";
import TdShell from "./TdShell.jsx";
import ScreenWall from "./ScreenWall.jsx";
import SimClock from "./SimClock.jsx";
import ControlPanel from "./ControlPanel.jsx";
import SaveBar from "./SaveBar.jsx";

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
 */
export default function Console() {
  const { t } = useI18n();
  const { business, lead, saved } = useTd();
  const dispatch = useTdDispatch();

  return (
    <TdShell showBadge>
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          {business.businessName
            ? t("intro.arrival", { business: business.businessName })
            : t("intro.arrivalGeneric")}
        </h1>
        <p className="mt-1.5 text-[14px] font-semibold leading-relaxed text-sb-slate">
          {t("intro.control")}
        </p>

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

            {/* Content, schedule and active hours. Role and health join it as
                further tabs in phase 8. */}
            <ControlPanel />

            {/*
              Simulated connectivity.
              Without a way to take a display dark, the offline and primaryOffline
              playback states cannot be reached from the UI at all, which would
              make two of the five renderings unverifiable in a browser. It also
              sets up the health mission in phase 8, which asks the visitor to
              notice a screen that has dropped.
            */}
            <section
              data-td-target="connectivity"
              aria-label={t("health.connectivity")}
              className="rounded-2xl border-2 border-sb-ink bg-white p-3 shadow-[3px_3px_0_#191919]"
            >
              <h2 className="text-[11px] font-extrabold uppercase tracking-wider text-sb-muted">
                {t("health.connectivity")}
              </h2>
              <ul className="mt-2 flex flex-col gap-1.5">
                {saved.screens.map((screen) => {
                  const online = screen.online !== false;
                  return (
                    <li key={screen.id} className="flex items-center gap-2">
                      <span className="flex-1 truncate text-[12px] font-bold">
                        {screen.label}
                      </span>
                      <button
                        type="button"
                        onClick={() => dispatch(toggleScreenOnline(screen.id))}
                        aria-pressed={online}
                        className={`td-tap rounded-full border-2 border-sb-ink px-2.5 py-0.5 text-[10px] font-extrabold ${
                          online ? "bg-sb-green/20 text-sb-ink" : "bg-sb-sand text-sb-muted"
                        }`}
                      >
                        {online ? t("screens.online") : t("screens.offline")}
                      </button>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-2 text-[10px] font-bold text-sb-muted">
                {t("health.disclaimer")}
              </p>
            </section>
          </aside>
        </div>

        <SaveBar />
      </div>
    </TdShell>
  );
}
