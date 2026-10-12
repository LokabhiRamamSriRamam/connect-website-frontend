import { useContext, useEffect, useReducer, useRef } from "react";
import { initialState, reducer } from "./reducer.js";
import { DispatchCtx, StateCtx } from "./contexts.js";
import { hydrateState } from "./actions.js";
import { WRITE_DEBOUNCE_MS, load, save } from "./persistence.js";

/**
 * The simulator's state, split across the two contexts in contexts.js (which
 * explains why they live in their own module).
 *
 * This provider must sit INSIDE I18nProvider, and nothing above it may carry
 * key={lang}. That is what keeps a language switch from resetting business
 * details, selection, draft, saved config and tutorial progress. The full
 * reasoning is in the provider-order comment in TestDrive.jsx.
 */

export function TestDriveProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  /**
   * Restore a previous visit, once.
   *
   * In an effect rather than as useReducer's third argument, because reading
   * storage during render is a side effect and would run twice under
   * StrictMode. HYDRATE merges onto the CURRENT state, so the one frame rendered
   * before this lands cannot lose anything the visitor typed into it.
   */
  const hydrated = useRef(false);
  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;
    const patch = load();
    if (patch) dispatch(hydrateState(patch));
  }, []);

  /**
   * Persist on change, debounced.
   *
   * Debounced because BUSINESS_FIELD fires per keystroke and CREATIVE_FIELD per
   * character of a headline — writing the whole envelope each time would
   * serialise the entire draft dozens of times a second. 400ms is long enough to
   * coalesce typing and short enough that a refresh loses nothing noticeable.
   *
   * Skipped until the hydrate has run, or the empty first render would overwrite
   * the very progress we are about to load.
   */
  useEffect(() => {
    if (!hydrated.current) return undefined;
    const id = setTimeout(() => save(state), WRITE_DEBOUNCE_MS);
    return () => clearTimeout(id);
  }, [state]);

  /**
   * One last write on the way out.
   *
   * A visitor who edits and immediately closes the tab would otherwise lose the
   * last 400ms of work to the pending debounce. `pagehide` rather than
   * `beforeunload`: it fires on mobile Safari when the tab is backgrounded,
   * which is how a phone usually leaves a page, and it does not block the
   * navigation.
   */
  useEffect(() => {
    const flush = () => save(state);
    window.addEventListener("pagehide", flush);
    return () => window.removeEventListener("pagehide", flush);
  }, [state]);

  return (
    <StateCtx.Provider value={state}>
      <DispatchCtx.Provider value={dispatch}>{children}</DispatchCtx.Provider>
    </StateCtx.Provider>
  );
}

export function useTd() {
  const ctx = useContext(StateCtx);
  if (!ctx) throw new Error("useTd must be used inside <TestDriveProvider>");
  return ctx;
}

export function useTdDispatch() {
  const ctx = useContext(DispatchCtx);
  if (!ctx) throw new Error("useTdDispatch must be used inside <TestDriveProvider>");
  return ctx;
}
