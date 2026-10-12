import { useI18n } from "../i18n/I18nContext.jsx";
import { useTd, useTdDispatch } from "../state/TestDriveContext.jsx";
import { uiSetScheduleView } from "../state/actions.js";
import ScheduleListView from "./ScheduleListView.jsx";
import ScheduleTimelineView from "./ScheduleTimelineView.jsx";

/**
 * The schedule tab: the List/Timeline switch and whichever view is chosen.
 *
 * The two views are alternative renderings of draft.byScreen[id].slots, not two
 * stores — so this switch is only a choice of presentation and switching mid-edit
 * cannot lose an edit or show a stale schedule. Which is chosen lives in
 * ui.scheduleView rather than local state, so the tutorial can assert on it and
 * the choice survives moving between screens.
 *
 * Value-based, never Seg's index: Seg's `value` is an index, which is the sharp
 * edge flagged in the plan's risks, and two index-based toggles in one feature is
 * how you end up showing the timeline when someone asked for the list.
 */
const VIEWS = [
  ["list", "schedule.listView"],
  ["timeline", "schedule.timelineView"],
];

export default function ScheduleSection({ screenId }) {
  const { t } = useI18n();
  const { ui } = useTd();
  const dispatch = useTdDispatch();

  const view = ui.scheduleView === "timeline" ? "timeline" : "list";

  return (
    <div>
      <div
        role="group"
        aria-label={t("schedule.title")}
        data-td-target="schedule-view-toggle"
        className="mb-2 inline-flex items-center gap-1 rounded-full border-2 border-sb-ink bg-white p-1"
      >
        {VIEWS.map(([id, labelKey]) => (
          <button
            key={id}
            type="button"
            onClick={() => dispatch(uiSetScheduleView(id))}
            aria-pressed={view === id}
            className={`td-tap rounded-full px-2.5 py-1 text-[11px] font-extrabold transition-colors ${
              view === id
                ? "bg-sb-gradient text-white shadow-[2px_2px_0_#191919]"
                : "text-sb-ink hover:bg-sb-lilac"
            }`}
          >
            {t(labelKey)}
          </button>
        ))}
      </div>

      {view === "timeline" ? (
        <ScheduleTimelineView screenId={screenId} />
      ) : (
        <ScheduleListView screenId={screenId} />
      )}
    </div>
  );
}
