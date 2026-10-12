import { useContext, useReducer } from "react";
import { initialState, reducer } from "./reducer.js";
import { DispatchCtx, StateCtx } from "./contexts.js";

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
