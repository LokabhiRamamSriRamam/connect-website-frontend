import { useMemo } from "react";
import { useI18n } from "../i18n/I18nContext.jsx";
import { useTd, useTdDispatch } from "../state/TestDriveContext.jsx";
import { slotsClear, uiEditSlot } from "../state/actions.js";
import { MAX_SLOTS_PER_SCREEN, normalizeSlots } from "../domain/schedule.js";
import { minutesToHHMM } from "../domain/time.js";
import { getTemplate } from "../creatives/registry.js";
import CreativeFrame from "../creatives/CreativeFrame.jsx";
import SlotEditor from "./SlotEditor.jsx";

/**
 * The schedule as a list of rows. One of the two views over the SAME data.
 *
 * SINGLE SOURCE OF TRUTH. This component holds no copy of the schedule: it reads
 * draft.byScreen[screenId].slots, runs it through normalizeSlots() and renders
 * the result. The timeline view in phase 7 will do exactly the same with exactly
 * the same call, and both edit through SLOT_UPDATE. That is why "both views
 * reflect the same edit instantly" needs no synchronisation — there is nothing to
 * synchronise.
 *
 * normalizeSlots also hands back the derived display facts (duration, whether a
 * slot sits outside active hours, whether its creative has gone), so no row
 * recomputes them and the two views cannot disagree about a slot's status.
 */
export default function ScheduleListView({ screenId }) {
  const { t } = useI18n();
  const { draft, creativeInstances, ui, sim } = useTd();
  const dispatch = useTdDispatch();

  const cfg = draft.byScreen[screenId];

  const rows = useMemo(
    () =>
      normalizeSlots(cfg.slots, {
        activeHours: cfg.activeHours,
        creativeInstances,
      }),
    [cfg.slots, cfg.activeHours, creativeInstances]
  );

  const editingId = ui.editingSlotId;
  /** "new" is the sentinel for the add form; any other value is a slot id. */
  const adding = editingId === "new";
  const editingRow = rows.find((r) => r.id === editingId) ?? null;

  const atCap = cfg.slots.length >= MAX_SLOTS_PER_SCREEN;

  const nameOf = (row) => {
    const inst = creativeInstances[row.instanceId];
    if (!inst) return t("library.empty");
    const tpl = getTemplate(inst.templateId);
    return inst.fields.headline || (tpl ? t(tpl.nameKey) : "");
  };

  return (
    <section data-td-target="schedule-list" aria-label={t("schedule.title")}>
      <header className="flex flex-wrap items-baseline gap-2">
        <h3 className="text-sm font-extrabold">{t("schedule.title")}</h3>
        <span className="text-[10px] font-bold tabular-nums text-sb-muted">
          {t("schedule.slotCount", {
            count: cfg.slots.length,
            max: MAX_SLOTS_PER_SCREEN,
          })}
        </span>
      </header>

      {rows.length === 0 ? (
        <p className="mt-2 text-[11px] font-bold text-sb-muted">{t("schedule.empty")}</p>
      ) : (
        <ul className="mt-2 flex flex-col gap-1.5">
          {rows.map((row) => {
            const inst = creativeInstances[row.instanceId];
            // Half-open containment, so exactly one row can read as "now".
            const now = row.startMin <= sim.nowMin && sim.nowMin < row.endMin;
            return (
              <li key={row.id}>
                <button
                  type="button"
                  onClick={() => dispatch(uiEditSlot(row.id === editingId ? null : row.id))}
                  aria-expanded={row.id === editingId}
                  className={`td-tap flex w-full items-center gap-2 rounded-xl border-2 border-sb-ink bg-white p-1.5 text-left ${
                    row.id === editingId ? "shadow-[3px_3px_0_#914bfa]" : "shadow-[2px_2px_0_#191919]"
                  }`}
                >
                  <span className="w-14 shrink-0 overflow-hidden rounded-lg border-2 border-sb-ink">
                    <span className="block aspect-video w-full">
                      {inst ? (
                        <CreativeFrame
                          templateId={inst.templateId}
                          fields={inst.fields}
                          label={nameOf(row)}
                        />
                      ) : null}
                    </span>
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-[12px] font-extrabold tabular-nums">
                      {minutesToHHMM(row.startMin)}–{minutesToHHMM(row.endMin)}
                    </span>
                    <span className="block truncate text-[11px] font-bold text-sb-muted">
                      {nameOf(row)}
                    </span>
                  </span>

                  <span className="flex shrink-0 flex-col items-end gap-0.5">
                    {now && (
                      <span className="rounded-full border-2 border-sb-ink bg-sb-gradient px-1.5 text-[9px] font-extrabold text-white">
                        {t("sim.now")}
                      </span>
                    )}
                    {/* A warning, not an error: the slot is legal, it just never
                        plays. sb-blush is the palette's only warning fill —
                        there is no sb-alert token. */}
                    {row.outsideHours && (
                      <span className="rounded-full border-2 border-sb-ink bg-sb-blush px-1.5 text-[9px] font-extrabold">
                        {t("schedule.outsideHoursBadge")}
                      </span>
                    )}
                  </span>
                </button>

                {row.id === editingId && (
                  <div className="mt-1.5">
                    <SlotEditor screenId={screenId} slotId={row.id} />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {adding && (
        <div className="mt-2">
          <SlotEditor screenId={screenId} slotId={null} />
        </div>
      )}

      {!adding && !editingRow && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          <button
            type="button"
            data-td-target="add-slot"
            onClick={() => dispatch(uiEditSlot("new"))}
            disabled={atCap}
            className="td-tap rounded-full border-2 border-sb-ink bg-sb-gradient px-3 py-1 text-[11px] font-extrabold text-white shadow-[2px_2px_0_#191919] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {t("schedule.addSlot")}
          </button>
          {cfg.slots.length > 0 && (
            <button
              type="button"
              onClick={() => dispatch(slotsClear(screenId))}
              className="td-tap rounded-full border-2 border-sb-ink bg-white px-3 py-1 text-[11px] font-extrabold"
            >
              {t("schedule.remove")}
            </button>
          )}
        </div>
      )}

      {/* The cap is explained where it bites, rather than only as a count. */}
      {atCap && !adding && (
        <p className="mt-1.5 text-[10px] font-bold text-sb-muted">
          {t("schedule.err.tooMany", { max: MAX_SLOTS_PER_SCREEN })}
        </p>
      )}
    </section>
  );
}
