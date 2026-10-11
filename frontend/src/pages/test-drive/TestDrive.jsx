import { useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import { I18nProvider, useI18n } from "./i18n/I18nContext.jsx";
import { TestDriveProvider, useTd } from "./state/TestDriveContext.jsx";
import TdShell from "./components/TdShell.jsx";
import Welcome from "./components/Welcome.jsx";
import IntakeForm from "./components/IntakeForm.jsx";
import "../../components/screenbazaar/sb.css";
import "./td.css";

/**
 * Screen Bazaar test drive — route entry.
 *
 * PROVIDER ORDER IS LOAD-BEARING. Do not "tidy" it.
 *
 *   <I18nProvider>          owns ONLY { lang }
 *     <AudioProvider>       thin wrapper over a module singleton   (phase 10)
 *       <TestDriveProvider> the simulator reducer
 *         <TutorialProvider> reads simulator state                 (phase 10)
 *
 * Language lives in its own provider ABOVE the simulator so that switching it is a
 * pure re-render: business details, the selected screen, draft edits, saved config
 * and tutorial progress all survive. Two rules keep that true:
 *   1. Never put `lang` in a `key` prop on any ancestor of TestDriveProvider.
 *   2. Never store translated strings in simulator state, and never pass `lang`
 *      into the reducer — translate at render with t().
 *
 * Stages are reducer state, not routes: a nested route would remount on
 * navigation, which is exactly what the brief forbids.
 */
export default function TestDrive() {
  return (
    <I18nProvider>
      {/* reducedMotion="user" makes framer-motion respect the OS setting, as the
          signage pages do via SignageChrome. */}
      <MotionConfig reducedMotion="user">
        <TestDriveProvider>
          <TestDriveStages />
        </TestDriveProvider>
      </MotionConfig>
    </I18nProvider>
  );
}

function TestDriveStages() {
  const { step } = useTd();
  /**
   * Whether the visitor has pressed "Personalise my experience" yet. Local state
   * rather than a reducer step because it is a one-way curtain in front of intake
   * with nothing to preserve — the form's own values live in the reducer, so going
   * back here and forward again keeps everything typed.
   */
  const [started, setStarted] = useState(false);

  /**
   * Each stage is a new screen, so it starts at the top. Without this the browser
   * keeps the old scroll offset: tapping the welcome CTA at y=461 left the intake
   * heading 25px above the fold, because the stages are different heights.
   */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [started, step]);

  if (step === "console") return <Console />;

  if (!started) {
    return (
      <TdShell>
        <Welcome onStart={() => setStarted(true)} />
      </TdShell>
    );
  }

  return (
    <TdShell showBadge>
      <IntakeForm onBack={() => setStarted(false)} />
    </TdShell>
  );
}

/**
 * PLACEHOLDER — the console stage.
 *
 * Phase 4 replaces this with ScreenWall plus the Control Panel. It stays in this
 * file for now so the intake handoff is reviewable; it moves to
 * components/Console.jsx when there is something to put in it.
 */
function Console() {
  const { t } = useI18n();
  const { business, lead } = useTd();

  return (
    <TdShell showBadge>
      <section className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          {business.businessName
            ? t("intro.arrival", { business: business.businessName })
            : t("intro.arrivalGeneric")}
        </h1>
        <p className="mt-3 text-[15px] font-semibold leading-relaxed text-sb-slate">
          {t("intro.reveal")}
        </p>

        {lead.status === "error" && (
          <p
            role="status"
            className="mt-6 rounded-2xl border-2 border-sb-taupe bg-white px-4 py-3 text-[13px] font-bold text-sb-muted"
          >
            {t("intake.leadFailed")}
          </p>
        )}

        <p
          data-td-target="console-placeholder"
          className="mt-8 rounded-2xl border-2 border-dashed border-sb-taupe bg-white px-5 py-4 text-sm font-bold text-sb-muted"
        >
          Screen wall arrives in phase 4.
        </p>
      </section>
    </TdShell>
  );
}
