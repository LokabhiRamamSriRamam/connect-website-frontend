import { useEffect, useRef } from "react";
import { Check, Loader2, MonitorUp, TriangleAlert } from "lucide-react";
import { useI18n } from "../i18n/I18nContext.jsx";
import { useTd, useTdDispatch } from "../state/TestDriveContext.jsx";
import {
  businessSubmitOk,
  discardDraft,
  saveAppliedSettle,
  saveFail,
  saveStart,
  saveSuccess,
} from "../state/actions.js";
import { SB_SERVICE, LEAD_SOURCE_TEST_DRIVE } from "../../../components/forms/services";
import { INDUSTRY_LEAD_LABEL } from "../state/initialState.js";

/** How long "Applied to virtual screens" stays up before settling to "Saved". */
const APPLIED_MS = 2500;

/**
 * Simulated save latency. The save machine is only honest if saving takes time:
 * an instant commit makes "Saving…" unobservable and the visitor never learns
 * that previews update on save rather than on edit.
 */
const LATENCY_MIN_MS = 600;
const LATENCY_MAX_MS = 900;

/** ?tdFailSave=1 forces the error path, for verifying save honesty by hand. */
function forcedFailure() {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("tdFailSave") === "1";
}

/**
 * The save status chip and the Save button.
 *
 * The chip is the visitor's only evidence that the simulator is honest, so what
 * it says is tied strictly to the machine: clean → dirty → saving → applied →
 * saved, with "applied" a ~2.5s transient. Because only SAVE_SUCCESS writes
 * `saved` — and the wall resolves against `saved` — "Saved" cannot appear before
 * the save has landed, and the previews cannot change before it either.
 */
export default function SaveBar() {
  const { t } = useI18n();
  const { save, business, lead, savedAt } = useTd();
  const dispatch = useTdDispatch();

  const status = save.status;

  /**
   * Settle the "applied" transient.
   *
   * Keyed on `savedAt` as well as status so two saves in quick succession each
   * get their own full 2.5s rather than the second inheriting the first's timer.
   * SAVE_APPLIED_SETTLE is a no-op unless the status is still "applied", so a
   * timer that fires after an edit cannot overwrite "dirty" with "saved".
   */
  useEffect(() => {
    if (status !== "applied") return undefined;
    const id = setTimeout(() => dispatch(saveAppliedSettle()), APPLIED_MS);
    return () => clearTimeout(id);
  }, [status, savedAt, dispatch]);

  /**
   * The quiet lead retry (plan §10, owner decision). If the intake POST failed,
   * try it once more on the first Save — the visitor has now demonstrated real
   * intent, so the lead is worth more than it was at intake.
   *
   * Deliberately NOT awaited by the save: a second network failure must not make
   * the visitor's schedule look unsaved. It is fire-and-forget, and a ref makes
   * sure one failed intake produces one retry, not one per Save press.
   */
  const retried = useRef(false);
  const retryLead = () => {
    if (retried.current || lead.status !== "error") return;
    retried.current = true;
    const payload = {
      name: business.name.trim(),
      businessName: business.businessName.trim(),
      industry: INDUSTRY_LEAD_LABEL[business.industry] ?? "",
      phone: business.phone.trim(),
      email: business.email.trim(),
      service: SB_SERVICE,
      source: LEAD_SOURCE_TEST_DRIVE,
    };
    fetch(`${import.meta.env.VITE_API_URL}/api/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((r) => (r.ok ? r.json().catch(() => ({})) : null))
      .then((data) => {
        if (data) dispatch(businessSubmitOk(data.id ?? null));
      })
      .catch(() => {
        // Swallowed on purpose. The visitor is mid-demo and there is nothing for
        // them to do about it; the intake notice already said we would retry.
      });
  };

  const onSave = () => {
    if (status === "saving") return;
    retryLead();
    dispatch(saveStart());
    const delay = LATENCY_MIN_MS + Math.random() * (LATENCY_MAX_MS - LATENCY_MIN_MS);
    setTimeout(() => {
      if (forcedFailure()) {
        dispatch(saveFail("simulated"));
        return;
      }
      dispatch(saveSuccess(Date.now()));
    }, delay);
  };

  const chip = {
    clean: { key: "save.clean", cls: "bg-white text-sb-muted", Icon: Check },
    dirty: { key: "save.unsaved", cls: "bg-sb-gold/30 text-sb-ink", Icon: TriangleAlert },
    saving: { key: "save.saving", cls: "bg-white text-sb-ink", Icon: Loader2 },
    applied: { key: "save.applied", cls: "bg-sb-gradient text-white", Icon: MonitorUp },
    saved: { key: "save.saved", cls: "bg-sb-green/20 text-sb-ink", Icon: Check },
    error: { key: "save.error", cls: "bg-sb-blush text-sb-ink", Icon: TriangleAlert },
  }[status] ?? { key: "save.clean", cls: "bg-white text-sb-muted", Icon: Check };

  const { Icon } = chip;
  const canSave = status === "dirty" || status === "error";

  return (
    <div
      data-td-target="save-bar"
      className="td-safe-bottom sticky bottom-0 z-30 -mx-4 mt-5 border-t-2 border-sb-ink bg-sb-cream/95 px-4 pt-3 backdrop-blur sm:-mx-6 sm:px-6"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          role="status"
          /* The chip's text IS the machine's state, so a key on the status makes
             React remount it and the flash animation plays on each transition.
             td.css guards td-chip-flash with prefers-reduced-motion. */
          key={status}
          className={`td-chip-flash inline-flex items-center gap-1.5 rounded-full border-2 border-sb-ink px-3 py-1 text-[11px] font-extrabold ${chip.cls}`}
        >
          <Icon size={13} className={status === "saving" ? "animate-spin" : ""} aria-hidden="true" />
          {t(chip.key)}
          {save.dirtyScreens.length > 0 && status === "dirty" && (
            <span className="td-dot-dirty ml-0.5 h-1.5 w-1.5 rounded-full bg-sb-violet" />
          )}
        </span>

        <button
          type="button"
          data-td-target="save-button"
          onClick={onSave}
          disabled={!canSave}
          className="td-tap ml-auto rounded-full border-2 border-sb-ink bg-sb-gradient px-4 py-1.5 text-[12px] font-extrabold text-white shadow-[3px_3px_0_#191919] disabled:cursor-not-allowed disabled:opacity-55"
        >
          {t("save.action")}
        </button>

        {canSave && (
          <button
            type="button"
            onClick={() => {
              if (window.confirm(t("save.discardConfirm"))) dispatch(discardDraft());
            }}
            className="td-tap rounded-full border-2 border-sb-ink bg-white px-3 py-1.5 text-[12px] font-extrabold"
          >
            {t("save.discard")}
          </button>
        )}
      </div>

      <p className="mt-1.5 pb-1 text-[10px] font-bold text-sb-muted">{t("save.note")}</p>
    </div>
  );
}
