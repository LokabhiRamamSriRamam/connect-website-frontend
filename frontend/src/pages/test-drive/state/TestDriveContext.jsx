import { createContext, useContext, useReducer } from "react";
import { initialState, reducer } from "./reducer.js";

/**
 * The simulator's state, split across two contexts.
 *
 * State and dispatch are separate so that a component which only dispatches — a
 * button, a field — does not re-render when unrelated state changes. `dispatch`
 * from useReducer has a stable identity for the life of the provider, so
 * DispatchCtx never produces a new value at all.
 *
 * This provider must sit INSIDE I18nProvider, and nothing above it may carry
 * key={lang}. That is what keeps a language switch from resetting business
 * details, selection, draft, saved config and tutorial progress. The full
 * reasoning is in the provider-order comment in TestDrive.jsx.
 */

const StateCtx = createContext(null);
const DispatchCtx = createContext(null);

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
