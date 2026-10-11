import { ScreenBazaarMark } from "../../../components/screenbazaar/ScreenBazaarLogo";
import { useI18n } from "../i18n/I18nContext.jsx";
import LangToggle from "./LangToggle.jsx";

/**
 * Chrome for every test-drive stage: brand, language, and a slot for stage actions.
 *
 * Standalone on purpose — no TopNav/Footer. This is an app surface, not a content
 * page, and the nav's marketing links would invite the visitor straight back out of
 * the simulator.
 */
export default function TdShell({ children, actions, showBadge = false }) {
  const { t } = useI18n();

  return (
    <div className="td-root flex min-h-screen flex-col overflow-x-clip">
      <header className="td-safe-top sticky top-0 z-40 border-b-2 border-sb-ink bg-sb-cream/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 pb-2 sm:px-6">
          <a href="/" className="td-tap flex items-center gap-2" aria-label={t("brand.name")}>
            <ScreenBazaarMark size={28} />
            <span className="hidden text-sm font-extrabold tracking-tight sm:block">
              {t("brand.name")}
            </span>
          </a>

          {showBadge && (
            <span className="hidden rounded-full border-2 border-sb-ink bg-white px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider md:block">
              {t("sim.badge")}
            </span>
          )}

          <div className="ml-auto flex items-center gap-2">
            {actions}
            <LangToggle size="sm" />
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t-2 border-sb-ink bg-sb-cream px-4 py-4 text-center sm:px-6">
        <p className="text-[11px] font-bold text-sb-muted">
          {t("brand.name")} {t("brand.parent")} · {t("sim.note")}
        </p>
      </footer>
    </div>
  );
}
