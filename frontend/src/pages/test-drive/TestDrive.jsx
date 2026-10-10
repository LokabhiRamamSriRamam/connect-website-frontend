import { useState } from "react";
import { MotionConfig } from "framer-motion";
import { I18nProvider, useI18n } from "./i18n/I18nContext.jsx";
import TdShell from "./components/TdShell.jsx";
import Welcome from "./components/Welcome.jsx";
import "../../components/screenbazaar/sb.css";
import "./td.css";

/**
 * Screen Bazaar test drive — route entry.
 *
 * PROVIDER ORDER IS LOAD-BEARING. Do not "tidy" it.
 *
 *   <I18nProvider>          owns ONLY { lang }
 *     <AudioProvider>       thin wrapper over a module singleton   (phase 10)
 *       <TestDriveProvider> the simulator reducer                  (phase 2+)
 *         <TutorialProvider> reads simulator state                 (phase 10)
 *
 * Language lives in its own provider ABOVE the simulator so that switching it is a
 * pure re-render: business details, the selected screen, draft edits, saved config
 * and tutorial progress all survive. Two rules keep that true:
 *   1. Never put `lang` in a `key` prop on any ancestor of TestDriveProvider.
 *   2. Never store translated strings in simulator state — translate at render.
 *
 * Stages are component state, not routes: a nested route would remount on
 * navigation, which is exactly what the brief forbids.
 */
export default function TestDrive() {
  return (
    <I18nProvider>
      {/* reducedMotion="user" makes framer-motion respect the OS setting, as the
          signage pages do via SignageChrome. */}
      <MotionConfig reducedMotion="user">
        <TestDriveStages />
      </MotionConfig>
    </I18nProvider>
  );
}

function TestDriveStages() {
  const { t } = useI18n();
  // "welcome" -> "intake" -> "console". Replaced by reducer state in phase 2.
  const [stage, setStage] = useState("welcome");

  if (stage === "welcome") {
    return (
      <TdShell>
        <Welcome onStart={() => setStage("intake")} />
      </TdShell>
    );
  }

  // Phase 1 placeholder. IntakeForm lands in phase 2.
  return (
    <TdShell showBadge>
      <section className="mx-auto w-full max-w-xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-extrabold tracking-tight">{t("intake.heading")}</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-sb-slate">{t("intake.description")}</p>
        <p className="mt-8 rounded-2xl border-2 border-dashed border-sb-taupe bg-white px-5 py-4 text-sm font-bold text-sb-muted">
          Intake form arrives in phase 2.
        </p>
        <button
          type="button"
          onClick={() => setStage("welcome")}
          className="mt-6 rounded-full border-2 border-sb-ink bg-white px-5 py-2.5 text-sm font-extrabold shadow-[3px_3px_0_#191919]"
        >
          {t("common.back")}
        </button>
      </section>
    </TdShell>
  );
}
