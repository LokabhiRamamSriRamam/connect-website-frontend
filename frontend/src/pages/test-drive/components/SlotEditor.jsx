import { useState } from "react";
import { useI18n } from "../i18n/I18nContext.jsx";
import { useTd, useTdDispatch } from "../state/TestDriveContext.jsx";
import { slotAdd, slotRemove, slotUpdate, uiEditSlot } from "../state/actions.js";
import { validateSlot } from "../domain/schedule.js";
import { hhmmToMinutes, minutesToHHMM, minutesToInputValue } from "../domain/time.js";
import { getTemplate } from "../creatives/registry.js";
import { newSlotId } from "../state/ids.js";
import CreativeFrame from "../creatives/CreativeFrame.jsx";

/**
 * Add or edit one time slot.
 *
 * THE LOCAL-STATE RULE. There is exactly one piece of local state here, `buf`,
 * and it holds in-flight input text only: while someone types "09:3" the value is
 * not yet a time, so it cannot go into the reducer without either being rejected
 * or being coerced into something they did not type. It is committed on blur and
 * on submit and discarded otherwise. It is an editing buffer, never schedule
 * state — the committed truth is draft.byScreen[id].slots and nothing else, which
 * is why the timeline view (phase 7) will reflect an edit made here instantly
 * without any synchronisation between the two.
 *
 * Validation is the domain layer's. validateSlot is called with a labelFor
 * callback so an overlap message names the creative in the way rather than saying
 * "that time is taken".
 */
export default function SlotEditor({ screenId, slotId, onClose }) {
  const { t } = useI18n();
  const { draft, creativeInstances } = useTd();
  const dispatch = useTdDispatch();

  const cfg = draft.byScreen[screenId];
  const existing = slotId ? cfg?.slots.find((s) => s.id === slotId) : null;
  const isNew = !existing;

  const instances = Object.values(creativeInstances).sort(
    (a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0)
  );

  /**
   * A new slot opens on a sensible first guess rather than 00:00: the start of
   * active hours, for an hour. Both are integers from the moment they exist.
   */
  const [form, setForm] = useState(() => ({
    startMin: existing ? existing.startMin : cfg.activeHours.start,
    endMin: existing ? existing.endMin : Math.min(cfg.activeHours.start + 60, 1440),
    instanceId: existing ? existing.instanceId : (instances[0]?.id ?? null),
  }));

  /** In-flight input text, keyed by field. Absent means "show the committed value". */
  const [buf, setBuf] = useState({});

  const [submitted, setSubmitted] = useState(false);

  /**
   * A slot's creative, named by its own headline — what the visitor typed.
   * Accepts EITHER a slot (with .instanceId) OR an instance (with .id / .templateId)
   * directly, so it works for both validation messages and the <option> list.
   */
  const labelFor = (slotOrInst) => {
    // If it looks like an instance (has templateId), use it directly.
    const inst = slotOrInst?.templateId
      ? slotOrInst
      : creativeInstances[slotOrInst?.instanceId];
    if (!inst) return t("schedule.chooseCreative");
    const tpl = getTemplate(inst.templateId);
    return inst.fields.headline || (tpl ? t(tpl.nameKey) : "");
  };

  const candidate = { ...form, ...(existing ? { id: existing.id } : null), enabled: true };
  const result = validateSlot(candidate, {
    slots: cfg.slots,
    activeHours: cfg.activeHours,
    creativeInstances,
    labelFor,
  });

  /** Render one domain message. The vars may carry a minute range to format. */
  const message = (m) =>
    t(
      m.key,
      m.vars?.range
        ? {
            ...m.vars,
            range: `${minutesToHHMM(m.vars.range.startMin)}–${minutesToHHMM(
              m.vars.range.endMin
            )}`,
          }
        : m.vars
    );

  /** Commit a time input. Junk text is discarded, leaving the last good value. */
  const commitTime = (field) => {
    const text = buf[field];
    setBuf((b) => {
      const next = { ...b };
      delete next[field];
      return next;
    });
    if (text === undefined) return;
    const min = hhmmToMinutes(text);
    if (min === null) return;
    setForm((f) => ({ ...f, [field]: min }));
  };

  const submit = (e) => {
    e.preventDefault();
    // Commit anything still mid-edit, then validate what that produced. Reading
    // `result` here would use the pre-blur value on a submit from the keyboard.
    const pending = {};
    for (const field of ["startMin", "endMin"]) {
      const min = buf[field] === undefined ? null : hhmmToMinutes(buf[field]);
      if (min !== null) pending[field] = min;
    }
    const next = { ...form, ...pending };
    const check = validateSlot(
      { ...next, ...(existing ? { id: existing.id } : null), enabled: true },
      { slots: cfg.slots, activeHours: cfg.activeHours, creativeInstances, labelFor }
    );
    setForm(next);
    setBuf({});
    setSubmitted(true);
    if (!check.ok) return;

    if (existing) {
      dispatch(slotUpdate(screenId, existing.id, next));
    } else {
      dispatch(slotAdd(screenId, { id: newSlotId(), ...next, enabled: true }));
    }
    dispatch(uiEditSlot(null));
    onClose?.();
  };

  const close = () => {
    dispatch(uiEditSlot(null));
    onClose?.();
  };

  const timeField = (field, label) => (
    <label className="block flex-1">
      <span className="text-[11px] font-extrabold">{label}</span>
      <input
        type="time"
        value={buf[field] ?? minutesToInputValue(form[field])}
        onChange={(e) => setBuf((b) => ({ ...b, [field]: e.target.value }))}
        onBlur={() => commitTime(field)}
        className="td-tap mt-1 w-full rounded-xl border-2 border-sb-ink bg-white px-2.5 py-1.5 text-[13px] font-bold tabular-nums"
      />
    </label>
  );

  return (
    <form
      onSubmit={submit}
      data-td-target="slot-editor"
      className="rounded-2xl border-2 border-sb-ink bg-sb-ivory p-3"
    >
      <h4 className="text-[12px] font-extrabold">
        {isNew ? t("schedule.addSlot") : t("schedule.editSlot")}
      </h4>

      <div className="mt-2 flex gap-2">
        {timeField("startMin", t("schedule.startTime"))}
        {timeField("endMin", t("schedule.endTime"))}
      </div>

      <label className="mt-2 block">
        <span className="text-[11px] font-extrabold">{t("schedule.creative")}</span>
        {instances.length === 0 ? (
          <p className="mt-1 text-[11px] font-bold text-sb-muted">
            {t("schedule.noCreativesYet")}
          </p>
        ) : (
          <select
            value={form.instanceId ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, instanceId: e.target.value || null }))}
            className="td-tap mt-1 w-full rounded-xl border-2 border-sb-ink bg-white px-2.5 py-1.5 text-[13px] font-bold"
          >
            <option value="">{t("schedule.chooseCreative")}</option>
            {instances.map((inst) => (
              <option key={inst.id} value={inst.id}>
                {labelFor(inst)}
              </option>
            ))}
          </select>
        )}
      </label>

      {/* What this slot will actually show, at the size of a timeline chip. */}
      {form.instanceId && creativeInstances[form.instanceId] && (
        <div className="mt-2 w-24 overflow-hidden rounded-lg border-2 border-sb-ink">
          <div className="aspect-video w-full">
            <CreativeFrame
              templateId={creativeInstances[form.instanceId].templateId}
              fields={creativeInstances[form.instanceId].fields}
              label={labelFor(creativeInstances[form.instanceId])}
            />
          </div>
        </div>
      )}

      {/* Errors block; warnings do not. Only shown after a submit attempt, so the
          form does not scold a half-filled slot before anyone has tried it. */}
      {submitted && result.errors.length > 0 && (
        <ul role="alert" className="mt-2 flex flex-col gap-1">
          {result.errors.map((err, i) => (
            <li
              key={`${err.key}-${i}`}
              className="rounded-lg border-2 border-sb-ink bg-sb-blush px-2 py-1 text-[11px] font-bold"
            >
              {message(err)}
            </li>
          ))}
        </ul>
      )}

      {/* The warning shows immediately: it is information, not a complaint, and
          seeing it before pressing Done is the point. */}
      {result.warnings.map((warn) => (
        <p
          key={warn.key}
          role="status"
          className="mt-2 rounded-lg border-2 border-sb-taupe bg-white px-2 py-1 text-[11px] font-bold text-sb-muted"
        >
          {message(warn)}
        </p>
      ))}

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <button
          type="submit"
          className="td-tap rounded-full border-2 border-sb-ink bg-sb-gradient px-3 py-1 text-[11px] font-extrabold text-white shadow-[2px_2px_0_#191919]"
        >
          {t("schedule.save")}
        </button>
        <button
          type="button"
          onClick={close}
          className="td-tap rounded-full border-2 border-sb-ink bg-white px-3 py-1 text-[11px] font-extrabold"
        >
          {t("schedule.cancel")}
        </button>
        {existing && (
          <button
            type="button"
            onClick={() => {
              dispatch(slotRemove(screenId, existing.id));
              onClose?.();
            }}
            className="td-tap ml-auto rounded-full border-2 border-sb-ink bg-sb-blush px-3 py-1 text-[11px] font-extrabold"
          >
            {t("schedule.remove")}
          </button>
        )}
      </div>
    </form>
  );
}
