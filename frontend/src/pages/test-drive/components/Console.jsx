import { useState } from "react";
import { useI18n } from "../i18n/I18nContext.jsx";
import { useTd, useTdDispatch } from "../state/TestDriveContext.jsx";
import { toggleScreenOnline } from "../state/actions.js";
import TdShell from "./TdShell.jsx";
import ScreenWall from "./ScreenWall.jsx";
import SimClock from "./SimClock.jsx";
import CreativePicker from "./CreativePicker.jsx";
import CreativeEditor from "./CreativeEditor.jsx";

/**
 * The console stage: the screen wall and the preview clock.
 *
 * The Control Panel (content library, schedule, active hours, role, health) lands
 * in phases 5-8 and will sit beside the wall on desktop and in a full-width sheet
 * on mobile — never a narrow sidebar, per the mobile requirement.
 */
export default function Console() {
  const { t } = useI18n();
  const { business, lead, saved } = useTd();
  const dispatch = useTdDispatch();
  /**
   * Which instance the editor is open on. Local state, not reducer state: it is
   * transient view position with nothing to preserve across a refresh, and
   * `ui.editingSlotId` in the state spec is the schedule's equivalent, not this.
   */
  const [editingId, setEditingId] = useState(null);

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

            {/*
              The content library and editor.
              Phases 6-8 fold these into the full Control Panel alongside the
              schedule, active hours, role and health sections — full-width in a
              sheet on mobile, never a narrow sidebar. Until then they sit here so
              phase 5 is reachable and judgeable on its own.
            */}
            <section
              data-td-target="content-panel"
              aria-label={t("library.title")}
              className="rounded-2xl border-2 border-sb-ink bg-white p-3 shadow-[3px_3px_0_#191919]"
            >
              {editingId ? (
                <CreativeEditor
                  instanceId={editingId}
                  onBack={(next) => setEditingId(next ?? null)}
                />
              ) : (
                <CreativePicker onEdit={(id) => setEditingId(id)} />
              )}
            </section>

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
      </div>
    </TdShell>
  );
}
