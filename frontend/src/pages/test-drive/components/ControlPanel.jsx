import { useState } from "react";
import { useI18n } from "../i18n/I18nContext.jsx";
import { useTd } from "../state/TestDriveContext.jsx";
import CreativePicker from "./CreativePicker.jsx";
import CreativeEditor from "./CreativeEditor.jsx";
import ScheduleSection from "./ScheduleSection.jsx";
import ActiveHoursEditor from "./ActiveHoursEditor.jsx";
import MirrorEditor from "./MirrorEditor.jsx";
import HealthPanel from "./HealthPanel.jsx";

/**
 * The Control Panel: everything the visitor can change about the selected screen.
 *
 * Full-width on mobile and a column beside the wall on desktop — never a narrow
 * sidebar, per the mobile requirement. Console owns that layout; this component
 * fills whatever width it is given.
 */

/** Tab id -> label key. */
const TABS = [
  ["creative", "panel.creative"],
  ["schedule", "panel.schedule"],
  ["hours", "panel.hours"],
  ["mirror", "panel.mirror"],
  ["health", "panel.health"],
];

/**
 * Shown in place of the schedule and hours editors on a secondary screen, naming
 * the primary that owns them. A "secondary" with no target is a broken link, so
 * it gets the same honest report the wall gives it rather than a primary's name.
 *
 * Exported for scripts/check-td-render.mjs: the panel's open tab is local state,
 * so SSR cannot click through to the tab this replaces.
 */
export function SecondaryNotice({ screen }) {
  const { t } = useI18n();
  const { screens } = useTd();
  const primary = screens.find((s) => s.id === screen.mirrors);

  return (
    <p
      data-td-target="secondary-notice"
      className="rounded-xl border-2 border-sb-taupe bg-white px-3 py-2 text-[12px] font-bold leading-relaxed text-sb-muted"
    >
      {primary
        ? t("screens.secondaryNotice", { screen: primary.label })
        : t("play.reason.unknownScreen")}
    </p>
  );
}

export default function ControlPanel() {
  const { t } = useI18n();
  const { screens, selectedScreenId } = useTd();
  /** Which tab is open. Local state: view position with nothing to preserve. */
  const [tab, setTab] = useState("creative");
  /** Which creative instance the editor is open on, within the content tab. */
  const [editingId, setEditingId] = useState(null);

  const screen = screens.find((s) => s.id === selectedScreenId) ?? screens[0];
  /**
   * Role is read from `screens`, the draft — not saved.screens. The panel edits
   * the draft, so it must describe the draft: after demoting a screen the content
   * tabs should close immediately, even though the wall keeps showing the old
   * arrangement until Save.
   */
  const isSecondary = screen?.role === "secondary";

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

      {/* Five tabs do not fit across 360px, and Hindi labels run longer still, so
          the row scrolls rather than wrapping to two lines or shrinking the text
          below legibility. flex-none, not flex-1: equal shares of an overflowing
          row is what crushes them. */}
      <div
        role="tablist"
        aria-label={t("panel.title")}
        className="mt-2 -mx-1 flex gap-1 overflow-x-auto rounded-full border-2 border-sb-ink bg-sb-cream p-1"
      >
        {TABS.map(([id, labelKey]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={`td-tap flex-none whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-extrabold transition-colors ${
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

        {/*
          A secondary screen has no schedule and no hours of its own — it shows
          what its primary shows, including its primary's idle state. Rendering
          the editors anyway would let the visitor carefully build a schedule that
          can never play, so those two tabs say where to go instead. The stored
          slots are left intact underneath: promotion inherits from the primary,
          but an accidental demote should not destroy work.
        */}
        {tab === "schedule" &&
          (isSecondary ? <SecondaryNotice screen={screen} /> : <ScheduleSection screenId={screen.id} />)}
        {tab === "hours" &&
          (isSecondary ? <SecondaryNotice screen={screen} /> : <ActiveHoursEditor screenId={screen.id} />)}

        {tab === "mirror" && <MirrorEditor screenId={screen.id} />}
        {tab === "health" && <HealthPanel screenId={screen.id} />}
      </div>
    </section>
  );
}
