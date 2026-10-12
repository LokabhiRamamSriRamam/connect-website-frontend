import { useI18n } from "../i18n/I18nContext.jsx";
import { useTd, useTdDispatch } from "../state/TestDriveContext.jsx";
import { creativeDuplicate, creativeField, creativeRemove } from "../state/actions.js";
import { getTemplate } from "../creatives/registry.js";
import CreativeFrame from "../creatives/CreativeFrame.jsx";
import { newInstanceId } from "../state/ids.js";

/**
 * Customise one creative instance: type into its fields, watch the preview and
 * the screen tiles update as you type.
 *
 * No local copy of the field values. Each input is driven straight from
 * creativeInstances[id].fields and dispatches CREATIVE_FIELD on change, so the
 * preview here, the library thumbnail and the wall tile are the same data
 * rendered three times and cannot drift apart. (The schedule's time inputs will
 * need an editing buffer for half-typed values like "09:3" — text fields have no
 * equivalent intermediate invalid state, so they do not.)
 */
export default function CreativeEditor({ instanceId, onBack }) {
  const { t } = useI18n();
  const { creativeInstances } = useTd();
  const dispatch = useTdDispatch();

  const instance = creativeInstances[instanceId];
  const tpl = instance ? getTemplate(instance.templateId) : null;

  if (!instance || !tpl) {
    return (
      <p className="text-[12px] font-bold text-sb-muted">{t("library.empty")}</p>
    );
  }

  return (
    <div data-td-target="creative-editor">
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-extrabold">{t("library.editFields")}</h3>
        <span className="truncate rounded-full border-2 border-sb-ink bg-sb-lilac px-2 py-0.5 text-[10px] font-extrabold">
          {t(tpl.nameKey)}
        </span>
      </div>

      {/* The live preview. Same CreativeFrame as the wall tile, so what is shown
          here is exactly what will play. */}
      <div className="mt-2 overflow-hidden rounded-xl border-2 border-sb-ink shadow-[3px_3px_0_#191919]">
        <div className="aspect-video w-full">
          <CreativeFrame
            templateId={instance.templateId}
            fields={instance.fields}
            label={t(tpl.nameKey)}
          />
        </div>
      </div>

      <p className="mt-2 text-[10px] font-bold text-sb-muted">{t("library.fieldHint")}</p>

      <div className="mt-2 flex flex-col gap-2">
        {tpl.fields.map((field) => {
          const limit = tpl.limits?.[field];
          const value = instance.fields[field] ?? "";
          return (
            <label key={field} className="block">
              <span className="flex items-baseline justify-between text-[11px] font-extrabold">
                {t(`library.fields.${field}`)}
                {/* The cap is shown, not enforced by maxLength: silently refusing
                    keystrokes reads as a broken input. CText truncates with an
                    ellipsis, so going over is visible in the preview instead. */}
                {limit ? (
                  <span
                    className={`font-bold tabular-nums ${
                      value.length > limit ? "text-sb-violet" : "text-sb-muted"
                    }`}
                  >
                    {value.length}/{limit}
                  </span>
                ) : null}
              </span>
              <input
                type="text"
                value={value}
                onChange={(e) => dispatch(creativeField(instanceId, field, e.target.value))}
                className="td-tap mt-1 w-full rounded-xl border-2 border-sb-ink bg-white px-2.5 py-1.5 text-[13px] font-bold"
              />
            </label>
          );
        })}
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => {
            // Duplicating gives a second screen an independent copy, which is the
            // escape hatch from "editing this changed both screens".
            const id = newInstanceId();
            dispatch(creativeDuplicate(instanceId, id, Date.now()));
            onBack?.(id);
          }}
          className="td-tap rounded-full border-2 border-sb-ink bg-white px-3 py-1 text-[11px] font-extrabold"
        >
          {t("library.duplicate")}
        </button>

        <button
          type="button"
          onClick={() => {
            // The confirm names the consequence: removing prunes schedule slots.
            if (window.confirm(t("library.removeConfirm"))) {
              dispatch(creativeRemove(instanceId));
              onBack?.(null);
            }
          }}
          /* tailwind.config.js has no sb-alert token — sb-blush is the palette's
             only warning fill, so the destructive action is signalled with that
             rather than an invented class name that would silently no-op. */
          className="td-tap rounded-full border-2 border-sb-ink bg-sb-blush px-3 py-1 text-[11px] font-extrabold"
        >
          {t("library.remove")}
        </button>

        <button
          type="button"
          onClick={() => onBack?.(null)}
          className="td-tap ml-auto rounded-full border-2 border-sb-ink bg-white px-3 py-1 text-[11px] font-extrabold"
        >
          {t("common.back")}
        </button>
      </div>
    </div>
  );
}
