import { useMemo, useState } from "react";
import { useI18n } from "../i18n/I18nContext.jsx";
import { useTd, useTdDispatch } from "../state/TestDriveContext.jsx";
import { creativeAdd } from "../state/actions.js";
import { creativesFor, getTemplate, mediaTypesFor } from "../creatives/registry.js";
import CreativeFrame from "../creatives/CreativeFrame.jsx";
import { newInstanceId } from "../state/ids.js";

/**
 * The content library: templates for this visitor's industry, plus the instances
 * they have already configured.
 *
 * The library filters on media types the industry ACTUALLY has, rather than
 * showing empty "Videos" and "Images" tabs — the restaurant set is all SVG in
 * this build, so with one type present the filter row is hidden entirely.
 */
export default function CreativePicker({ onEdit }) {
  const { t } = useI18n();
  const { business, creativeInstances } = useTd();
  const dispatch = useTdDispatch();
  const [mediaFilter, setMediaFilter] = useState("all");

  const templates = useMemo(() => creativesFor(business.industry), [business.industry]);
  const types = useMemo(() => mediaTypesFor(business.industry), [business.industry]);

  const shown = templates.filter(
    (tpl) => mediaFilter === "all" || tpl.mediaType === mediaFilter
  );

  const instances = Object.values(creativeInstances).sort(
    (a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0)
  );

  /**
   * Configuring a template creates an INSTANCE. The id and timestamp are
   * generated here, not in the reducer: a reducer that calls Date.now() is not
   * replayable and cannot be asserted by equality in a test.
   *
   * businessName defaults to what the visitor typed at intake, so the first
   * preview already says their name back to them rather than showing a blank.
   */
  const use = (tpl) => {
    const id = newInstanceId();
    dispatch(
      creativeAdd(
        id,
        tpl.id,
        { ...tpl.defaults, businessName: business.businessName || tpl.defaults.businessName },
        Date.now()
      )
    );
    onEdit?.(id);
  };

  return (
    <div data-td-target="creative-library">
      <header>
        <h3 className="text-sm font-extrabold">{t("library.title")}</h3>
        <p className="mt-0.5 text-[11px] font-bold text-sb-muted">{t("library.subtitle")}</p>
      </header>

      {types.length > 1 && (
        <div role="group" className="mt-2 flex flex-wrap gap-1.5">
          {["all", ...types].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setMediaFilter(type)}
              aria-pressed={mediaFilter === type}
              className={`td-tap rounded-full border-2 border-sb-ink px-2.5 py-0.5 text-[10px] font-extrabold ${
                mediaFilter === type ? "bg-sb-gradient text-white" : "bg-white text-sb-ink"
              }`}
            >
              {t(`library.${type}`)}
            </button>
          ))}
        </div>
      )}

      {/* Already-configured instances come first: once the visitor has made one,
          it is more likely what they want than a fresh template. */}
      {instances.length > 0 && (
        <section className="mt-3">
          <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-sb-muted">
            {t("library.yours")}
          </h4>
          <ul className="mt-1.5 grid grid-cols-2 gap-2">
            {instances.map((inst) => {
              const tpl = getTemplate(inst.templateId);
              return (
                <li key={inst.id}>
                  <button
                    type="button"
                    onClick={() => onEdit?.(inst.id)}
                    className="td-tap block w-full overflow-hidden rounded-xl border-2 border-sb-ink bg-white text-left shadow-[2px_2px_0_#191919]"
                  >
                    <div className="aspect-video w-full">
                      <CreativeFrame
                        templateId={inst.templateId}
                        fields={inst.fields}
                        label={tpl ? t(tpl.nameKey) : ""}
                      />
                    </div>
                    <span className="block truncate px-2 py-1 text-[11px] font-extrabold">
                      {/* The instance's own headline identifies it better than the
                          template name once several share a template. */}
                      {inst.fields.headline || (tpl ? t(tpl.nameKey) : "")}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <section className="mt-3">
        <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-sb-muted">
          {t("library.addNew")}
        </h4>

        {shown.length === 0 ? (
          <p className="mt-2 text-[11px] font-bold text-sb-muted">{t("library.empty")}</p>
        ) : (
          <ul className="mt-1.5 flex flex-col gap-2">
            {shown.map((tpl) => (
              <li
                key={tpl.id}
                className="overflow-hidden rounded-xl border-2 border-sb-ink bg-white shadow-[2px_2px_0_#191919]"
              >
                <div className="aspect-video w-full">
                  {/* Previewed with the manifest defaults — a template has no
                      instance yet, so there is no visitor text to show. */}
                  <CreativeFrame
                    templateId={tpl.id}
                    fields={tpl.defaults}
                    label={t(tpl.nameKey)}
                  />
                </div>
                <div className="p-2">
                  <p className="text-[12px] font-extrabold">{t(tpl.nameKey)}</p>
                  <p className="mt-0.5 text-[10px] font-bold leading-snug text-sb-muted">
                    {t(tpl.descKey)}
                  </p>
                  <button
                    type="button"
                    onClick={() => use(tpl)}
                    className="td-tap mt-1.5 rounded-full border-2 border-sb-ink bg-sb-gradient px-3 py-1 text-[11px] font-extrabold text-white shadow-[2px_2px_0_#191919]"
                  >
                    {t("library.use")}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
