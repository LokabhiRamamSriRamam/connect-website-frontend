import { useState } from "react";
import { useI18n } from "../i18n/I18nContext.jsx";
import { useTd } from "../state/TestDriveContext.jsx";
import CreativePicker from "./CreativePicker.jsx";
import CreativeEditor from "./CreativeEditor.jsx";
import ScheduleListView from "./ScheduleListView.jsx";
import ActiveHoursEditor from "./ActiveHoursEditor.jsx";

/**
 * The Control Panel: everything the visitor can change about the selected screen.
 *
 * Starts here in phase 6 with content, schedule and active hours. Role/mirroring
 * and health join as further tabs in phase 8, which is why the tab list is data
 * rather than three hand-written buttons.
 *
 * Full-width on mobile and a column beside the wall on desktop — never a narrow
 * sidebar, per the mobile requirement. Console owns that layout; this component
 * fills whatever width it is given.
 */

/** Tab id -> label key. Data, so phase 8 adds its two by appending here. */
const TABS = [
  ["creative", "panel.creative"],
  ["schedule", "panel.schedule"],
  ["hours", "panel.hours"],
];

export default function ControlPanel() {
  const { t } = useI18n();
  const { screens, selectedScreenId } = useTd();
  /** Which tab is open. Local state: view position with nothing to preserve. */
  const [tab, setTab] = useState("creative");
  /** Which creative instance the editor is open on, within the content tab. */
  const [editingId, setEditingId] = useState(null);

  const screen = screens.find((s) => s.id === selectedScreenId) ?? screens[0];

  return (
    <section
      data-td-target="control-panel"
      aria-label={t("panel.title")}
      className="rounded-2xl border-2 border-sb-ink bg-white p-3 shadow-[3px_3px_0_#191919]"
    >
      <header className="flex flex-wrap items-baseline gap-x-2">
        <h2 className="text-[11px] font-extrabold uppercase tracking-wider text-sb-muted">
          {t("panel.title")}
        </h2>
        {/* Which screen this panel is acting on. Without it, a panel beside five
            screens is ambiguous — and every edit below is scoped to this one. */}
        <span className="text-[11px] font-bold text-sb-iris">
          {t("panel.forScreen", { screen: screen?.label ?? "" })}
        </span>
      </header>

      <div
        role="tablist"
        aria-label={t("panel.title")}
        className="mt-2 flex gap-1 rounded-full border-2 border-sb-ink bg-sb-cream p-1"
      >
        {TABS.map(([id, labelKey]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={`td-tap flex-1 rounded-full px-2 py-1 text-[11px] font-extrabold transition-colors ${
              tab === id
                ? "bg-sb-gradient text-white shadow-[2px_2px_0_#191919]"
                : "text-sb-ink hover:bg-sb-lilac"
            }`}
          >
            {t(labelKey)}
          </button>
        ))}
      </div>

      <div className="mt-3">
        {tab === "creative" &&
          (editingId ? (
            <CreativeEditor
              instanceId={editingId}
              onBack={(next) => setEditingId(next ?? null)}
            />
          ) : (
            <CreativePicker onEdit={(id) => setEditingId(id)} />
          ))}

        {/* Both schedule sections read and write draft.byScreen[selected] through
            the reducer, so switching tabs or screens never carries a stale copy
            of a schedule with it — there is no copy to carry. */}
        {tab === "schedule" && <ScheduleListView screenId={screen.id} />}
        {tab === "hours" && <ActiveHoursEditor screenId={screen.id} />}
      </div>
    </section>
  );
}
