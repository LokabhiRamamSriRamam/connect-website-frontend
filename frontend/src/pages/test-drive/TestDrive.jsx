import { useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import { I18nProvider } from "./i18n/I18nContext.jsx";
import { AudioProvider } from "./audio/AudioContext.jsx";
import { TestDriveProvider, useTd } from "./state/TestDriveContext.jsx";
import { TutorialProvider } from "./tutorial/TutorialContext.jsx";
import TdShell from "./components/TdShell.jsx";
import Welcome from "./components/Welcome.jsx";
import IntakeForm from "./components/IntakeForm.jsx";
import Console from "./components/Console.jsx";
import "../../components/screenbazaar/sb.css";
import "./td.css";

/**
 * Screen Bazaar test drive — route entry.
 *
 * PROVIDER ORDER IS LOAD-BEARING. Do not "tidy" it.
 *
 *   <I18nProvider>          owns ONLY { lang }
 *     <AudioProvider>       thin wrapper over a module singleton
 *       <TestDriveProvider> the simulator reducer
 *         <TutorialProvider> derived only; reads simulator state
 *
 * AudioProvider sits above the simulator because it needs `lang` from I18n and
 * owns no simulator state — and because a language switch must stop narration,
 * which is an effect on `lang` alone. TutorialProvider sits below because every
 * mission predicate is a function of simulator state.
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
        <AudioProvider>
          <TestDriveProvider>
            <TutorialProvider>
              <TestDriveStages />
            </TutorialProvider>
          </TestDriveProvider>
        </AudioProvider>
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
