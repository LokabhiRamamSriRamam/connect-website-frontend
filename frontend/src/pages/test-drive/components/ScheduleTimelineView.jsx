import { useMemo } from "react";
import { useI18n } from "../i18n/I18nContext.jsx";
import { useTd, useTdDispatch } from "../state/TestDriveContext.jsx";
import { uiEditSlot } from "../state/actions.js";
import { MAX_SLOTS_PER_SCREEN, findGaps, normalizeSlots } from "../domain/schedule.js";
import { minutesToHHMM, pct, slotGeometry } from "../domain/time.js";
import { getTemplate } from "../creatives/registry.js";
import CreativeFrame from "../creatives/CreativeFrame.jsx";
import SlotEditor from "./SlotEditor.jsx";

/**
 * The schedule as a proportional 24-hour rail. The second of the two views.
 *
 * THE RAIL MUST NOT LIE. Every block is positioned and sized by percentage of
 * the day straight from slotGeometry(), so 09:00-12:00 is left: 37.5%, width:
 * 12.5% — exactly 3/24 — and a glance at the rail is a true statement about
 * duration. Percentages also mean it reflows on rotate with no JS and no resize
 * listener.
 *
 * A 15-minute slot is 1.04% of the rail, about 4px on a phone. The block keeps
 * that true width and td.css gives it an invisible 44px tap target instead
 * (.td-slot::before). Widening the block to make it tappable is the one thing
 * this component must never do.
 *
 * SINGLE SOURCE OF TRUTH. Same data as the list view, same call: it reads
 * draft.byScreen[id].slots through normalizeSlots() and edits through the same
 * SLOT_UPDATE dispatch in the same SlotEditor. There is no copy here to keep in
 * step, which is why switching views mid-edit shows the same schedule.
 */

/** Hour marks: every 3h from sm up, every 6h below, where 24 labels would collide. */
const LABEL_HOURS_SM = [0, 3, 6, 9, 12, 15, 18, 21, 24];
const LABEL_HOURS_XS = [0, 6, 12, 18, 24];

export default function ScheduleTimelineView({ screenId }) {
  const { t } = useI18n();
  const { draft, creativeInstances, ui, sim } = useTd();
  const dispatch = useTdDispatch();

  const cfg = draft.byScreen[screenId];

  const rows = useMemo(
    () => normalizeSlots(cfg.slots, { activeHours: cfg.activeHours, creativeInstances }),
    [cfg.slots, cfg.activeHours, creativeInstances]
  );

  /** Uncovered stretches inside active hours — what the rail hatches. */
  const gaps = useMemo(() => findGaps(cfg.slots, cfg.activeHours), [cfg.slots, cfg.activeHours]);

  const editingId = ui.editingSlotId;
  const editingRow = rows.find((r) => r.id === editingId) ?? null;

  const nameOf = (row) => {
    const inst = creativeInstances[row.instanceId];
    if (!inst) return t("library.empty");
    const tpl = getTemplate(inst.templateId);
    return inst.fields.headline || (tpl ? t(tpl.nameKey) : "");
  };

  /** The lit window. start < end here because ACTIVE_HOURS_SET rejects overnight. */
  const lit = {
    left: `${pct(cfg.activeHours.start)}%`,
    width: `${pct(cfg.activeHours.end) - pct(cfg.activeHours.start)}%`,
  };

  return (
    <section data-td-target="schedule-timeline" aria-label={t("schedule.timelineView")}>
      <header className="flex flex-wrap items-baseline gap-2">
        <h3 className="text-sm font-extrabold">{t("schedule.title")}</h3>
        <span className="text-[10px] font-bold text-sb-muted">{t("schedule.hours24")}</span>
      </header>

      {/*
        The rail. 24 gridlines at each hour (25 positions, but 0% and 100% are the
        borders themselves, so they are skipped) and the hour labels below.
      */}
      <div className="mt-2">
        <div
          data-td-target="timeline-rail"
          className="td-rail td-rail-dim h-14 rounded-xl border-2 border-sb-ink"
        >
          {/* Active hours, lit. Drawn first so slots and the playhead sit above. */}
          <div className="td-rail-lit" style={lit} aria-hidden="true" />

          {/* Nothing scheduled, inside the hours where something could be. */}
          {gaps.map((gap) => (
            <div
              key={`gap-${gap.startMin}-${gap.endMin}`}
              className="td-rail-gap td-hatch"
              style={slotGeometry(gap)}
              aria-hidden="true"
            />
          ))}

          {/* The plan asks for 25 gridlines — 00:00 through 24:00 inclusive. The
              two at the ends are the rail's own 2px border, so drawing them again
              would double their weight; these are the 23 interior marks. */}
          {Array.from({ length: 23 }, (_, i) => i + 1).map((hour) => (
            <span
              key={hour}
              className="td-gridline"
              style={{ left: `${pct(hour * 60)}%` }}
              aria-hidden="true"
            />
          ))}

          {rows.map((row) => {
            const inst = creativeInstances[row.instanceId];
            const selected = row.id === editingId;
            return (
              <button
                key={row.id}
                type="button"
                onClick={() => dispatch(uiEditSlot(selected ? null : row.id))}
                aria-pressed={selected}
                data-td-slot={row.id}
                /* True proportional geometry, straight from the domain layer.
                   The 44px hit area is .td-slot::before in td.css — never a
                   minimum width on the block, which would misreport duration. */
                style={slotGeometry(row)}
                title={`${minutesToHHMM(row.startMin)}–${minutesToHHMM(row.endMin)} · ${nameOf(row)}`}
                className={`td-slot overflow-hidden border-x-2 border-sb-ink ${
                  selected ? "bg-sb-violet" : row.outsideHours ? "bg-sb-blush" : "bg-sb-gradient"
                }`}
              >
                <span className="sr-only">
                  {minutesToHHMM(row.startMin)}–{minutesToHHMM(row.endMin)} {nameOf(row)}
                  {row.outsideHours ? ` ${t("schedule.outsideHoursBadge")}` : ""}
                </span>
                {/* The creative itself, when the block is wide enough for it to be
                    anything but a smear. Below that the block is a coloured bar,
                    which is honest about what it can show at 4px. */}
                {inst && row.durationMin >= 120 && (
                  <span aria-hidden="true" className="block h-full w-full opacity-80">
                    <CreativeFrame
                      templateId={inst.templateId}
                      fields={inst.fields}
                      label={nameOf(row)}
                    />
                  </span>
                )}
              </button>
            );
          })}

          {/* Where the preview clock is. td.css kills its transition under
              prefers-reduced-motion so it jumps rather than slides. */}
          <span
            className="td-playhead"
            style={{ left: `${pct(sim.nowMin)}%` }}
            aria-hidden="true"
          />
        </div>

        {/* Hour labels, outside the rail so they never overlap a block. Two sets,
            swapped by breakpoint: 9 labels collide below sm at 360px. */}
        <div className="relative mt-1 h-3.5" aria-hidden="true">
          {LABEL_HOURS_SM.map((hour) => (
            <span
              key={hour}
              /* sm:block, not sm:inline — an absolutely positioned element is
                 block-level, and `inline` would undo the positioning. */
              className={`absolute top-0 text-[9px] font-bold tabular-nums text-sb-muted ${
                LABEL_HOURS_XS.includes(hour) ? "" : "hidden sm:block"
              }`}
              /* The first and last labels are pulled inside the rail's ends so
                 they do not hang off the panel; the rest are centred on the mark. */
              style={{
                left: `${pct(hour * 60)}%`,
                transform:
                  hour === 0 ? "none" : hour === 24 ? "translateX(-100%)" : "translateX(-50%)",
              }}
            >
              {minutesToHHMM(hour * 60)}
            </span>
          ))}
        </div>
      </div>

      {/* A legend: every fill on the rail means something, and four of them is
          past the point where they are self-evident. */}
      <ul className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[9px] font-bold text-sb-muted">
        {[
          ["bg-sb-gradient", "schedule.creative"],
          ["bg-white", "hours.title"],
          ["td-hatch bg-white", "schedule.gap"],
          ["bg-sb-blush", "schedule.outsideHoursBadge"],
        ].map(([swatch, labelKey]) => (
          <li key={labelKey} className="flex items-center gap-1">
            <span
              aria-hidden="true"
              className={`h-2 w-3 shrink-0 rounded-sm border border-sb-ink ${swatch}`}
            />
            {t(labelKey)}
          </li>
        ))}
      </ul>

      {rows.length === 0 ? (
        <p className="mt-2 text-[11px] font-bold text-sb-muted">{t("schedule.empty")}</p>
      ) : (
        /* Tapping a 4px block is possible but not pleasant, so the rail is
           backed by a plain list of times. It is the same rows, so it cannot
           disagree with what is drawn above it. */
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {rows.map((row) => (
            <li key={row.id}>
              <button
                type="button"
                onClick={() => dispatch(uiEditSlot(row.id === editingId ? null : row.id))}
                aria-pressed={row.id === editingId}
                className={`td-tap rounded-full border-2 border-sb-ink px-2 py-0.5 text-[10px] font-extrabold tabular-nums ${
                  row.id === editingId ? "bg-sb-violet text-white" : "bg-white text-sb-ink"
                }`}
              >
                {minutesToHHMM(row.startMin)}–{minutesToHHMM(row.endMin)}
              </button>
            </li>
          ))}
        </ul>
      )}

      {editingRow && (
        <div className="mt-2">
          <SlotEditor screenId={screenId} slotId={editingRow.id} />
        </div>
      )}

      {editingId === "new" && (
        <div className="mt-2">
          <SlotEditor screenId={screenId} slotId={null} />
        </div>
      )}

      {!editingId && (
        <button
          type="button"
          data-td-target="add-slot-timeline"
          onClick={() => dispatch(uiEditSlot("new"))}
          disabled={cfg.slots.length >= MAX_SLOTS_PER_SCREEN}
          className="td-tap mt-2 rounded-full border-2 border-sb-ink bg-sb-gradient px-3 py-1 text-[11px] font-extrabold text-white shadow-[2px_2px_0_#191919] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {t("schedule.addSlot")}
        </button>
      )}
    </section>
  );
}
