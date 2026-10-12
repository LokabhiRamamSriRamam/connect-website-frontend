import { useState } from "react";
import { useI18n } from "../i18n/I18nContext.jsx";
import { useTd, useTdDispatch } from "../state/TestDriveContext.jsx";
import { activeHoursSet } from "../state/actions.js";
import { slotsOutsideHours, validateActiveHours } from "../domain/schedule.js";
import { hhmmToMinutes, minutesToHHMM, minutesToInputValue } from "../domain/time.js";

/**
 * When a screen is awake. Outside this window it shows an idle state rather than
 * a creative — which is why narrowing it can silently kill a schedule, and why
 * this editor warns about the slots that would stop playing BEFORE committing.
 *
 * Same local-state rule as SlotEditor: `buf` is in-flight input text only,
 * committed on blur. The committed values live in draft.byScreen[id].activeHours.
 */
export default function ActiveHoursEditor({ screenId }) {
  const { t } = useI18n();
  const { draft } = useTd();
  const dispatch = useTdDispatch();

  const cfg = draft.byScreen[screenId];
  const [buf, setBuf] = useState({});

  const commit = (field) => {
    const text = buf[field];
    setBuf((b) => {
      const next = { ...b };
      delete next[field];
      return next;
    });
    if (text === undefined) return;
    const min = hhmmToMinutes(text);
    if (min === null) return;
    const proposed = { ...cfg.activeHours, [field]: min };
    // Rejected values simply do not commit, and the input falls back to showing
    // the last good one. The reason is shown below either way.
    if (!validateActiveHours(proposed).ok) return;
    dispatch(activeHoursSet(screenId, proposed));
  };

  /** The proposed window, including whatever is mid-typing, for the live check. */
  const proposed = {
    start: buf.start !== undefined ? (hhmmToMinutes(buf.start) ?? cfg.activeHours.start) : cfg.activeHours.start,
    end: buf.end !== undefined ? (hhmmToMinutes(buf.end) ?? cfg.activeHours.end) : cfg.activeHours.end,
  };
  const check = validateActiveHours(proposed);
  const stranded = check.ok ? slotsOutsideHours(cfg.slots, proposed) : [];

  const field = (key, label) => (
    <label className="block flex-1">
      <span className="text-[11px] font-extrabold">{label}</span>
      <input
        type="time"
        value={buf[key] ?? minutesToInputValue(cfg.activeHours[key])}
        onChange={(e) => setBuf((b) => ({ ...b, [key]: e.target.value }))}
        onBlur={() => commit(key)}
        className="td-tap mt-1 w-full rounded-xl border-2 border-sb-ink bg-white px-2.5 py-1.5 text-[13px] font-bold tabular-nums"
      />
    </label>
  );

  return (
    <section data-td-target="active-hours" aria-label={t("hours.title")}>
      <h3 className="text-sm font-extrabold">{t("hours.title")}</h3>
      <p className="mt-0.5 text-[11px] font-bold text-sb-muted">{t("hours.description")}</p>

      <div className="mt-2 flex gap-2">
        {field("start", t("hours.start"))}
        {field("end", t("hours.end"))}
      </div>

      {!check.ok &&
        check.errors.map((err) => (
          <p
            key={err.key}
            role="alert"
            className="mt-2 rounded-lg border-2 border-sb-ink bg-sb-blush px-2 py-1 text-[11px] font-bold"
          >
            {t(err.key, err.vars)}
          </p>
        ))}

      {/* Narrowing the window is legal but consequential: name the slots that
          would stop playing, with their times, so it is a choice and not a
          surprise two screens later. */}
      {stranded.length > 0 && (
        <p
          role="status"
          className="mt-2 rounded-lg border-2 border-sb-taupe bg-white px-2 py-1 text-[11px] font-bold text-sb-muted"
        >
          {t("schedule.warn.outsideHours")}{" "}
          <span className="tabular-nums">
            {stranded
              .map((s) => `${minutesToHHMM(s.startMin)}–${minutesToHHMM(s.endMin)}`)
              .join(", ")}
          </span>
        </p>
      )}

      <p className="mt-2 text-[10px] font-bold text-sb-muted">{t("hours.outside")}</p>
    </section>
  );
}
