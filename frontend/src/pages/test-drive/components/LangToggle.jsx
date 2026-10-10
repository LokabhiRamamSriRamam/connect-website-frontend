import { LANG_LABELS, LANGS } from "../i18n/index.js";
import { useI18n } from "../i18n/I18nContext.jsx";

/**
 * EN / हिन्दी segmented selector.
 *
 * A value-based control on purpose: pages/blog/kit.jsx exports a `Seg` whose value
 * is an array INDEX, which is easy to misuse. This keeps language codes explicit.
 *
 * Switching language must not reset simulator state — see I18nContext.jsx.
 */
export default function LangToggle({ className = "", size = "md" }) {
  const { lang, setLang, t } = useI18n();
  const pad = size === "sm" ? "px-2.5 py-1 text-[11px]" : "px-3.5 py-1.5 text-xs";

  return (
    <div
      role="group"
      aria-label={t("welcome.langLabel")}
      className={`inline-flex items-center gap-1 rounded-full border-2 border-sb-ink bg-white p-1 ${className}`}
    >
      {LANGS.map((code) => {
        const on = code === lang;
        return (
          <button
            key={code}
            type="button"
            lang={code}
            onClick={() => setLang(code)}
            aria-pressed={on}
            className={`rounded-full font-extrabold transition-all ${pad} ${
              on
                ? "bg-sb-gradient text-white shadow-[2px_2px_0_#191919]"
                : "text-sb-ink hover:bg-sb-lilac"
            }`}
          >
            {LANG_LABELS[code]}
          </button>
        );
      })}
    </div>
  );
}
