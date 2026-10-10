import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { createT, DEFAULT_LANG, LANGS } from "./index.js";

/**
 * Language state for the test drive — and nothing else.
 *
 * This provider sits ABOVE TestDriveProvider and owns only { lang }. That is
 * deliberate and load-bearing: switching language re-renders consumers but never
 * remounts the simulator, so business details, the selected screen, draft edits,
 * saved config and tutorial progress all survive a switch.
 *
 * Two rules to keep that true:
 *   1. Never put `lang` in a `key` prop on any ancestor of TestDriveProvider.
 *   2. Never store translated strings in simulator state — translate at render
 *      with t(), so a switch is a pure re-render.
 */

const LANG_KEY = "td.lang";

const I18nCtx = createContext(null);

function readStoredLang() {
  if (typeof window === "undefined") return DEFAULT_LANG;
  // ?lang=hi wins once, so a link can open straight into Hindi.
  try {
    const q = new URLSearchParams(window.location.search).get("lang");
    if (LANGS.includes(q)) return q;
  } catch {
    /* malformed query string — fall through */
  }
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (LANGS.includes(saved)) return saved;
  } catch {
    /* storage blocked (private mode) — fall through */
  }
  return DEFAULT_LANG;
}

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(readStoredLang);

  const setLang = useCallback((next) => {
    if (!LANGS.includes(next)) return;
    setLangState(next);
    try {
      localStorage.setItem(LANG_KEY, next);
    } catch {
      /* non-fatal: the choice just won't persist */
    }
  }, []);

  // Keep the document language honest for screen readers and font selection.
  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t: createT(lang) }), [lang, setLang]);

  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
