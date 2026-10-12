import { createContext } from "react";

/**
 * The two context objects behind TestDriveProvider.
 *
 * In their own plain .js module rather than inside TestDriveContext.jsx for one
 * reason: react-refresh/only-export-components warns when a .jsx file exports
 * anything that is not a component, and a non-component export alongside a
 * provider also degrades fast refresh for real. Here they are plain values in a
 * plain module and neither applies.
 *
 * State and dispatch are separate so a component that only dispatches — a
 * button, a field — does not re-render when unrelated state changes. `dispatch`
 * from useReducer has a stable identity for the life of the provider, so
 * DispatchCtx never produces a new value at all.
 *
 * Application code uses TestDriveProvider, useTd and useTdDispatch, never these
 * directly. The one exception is scripts/check-td-render.mjs, which provides a
 * chosen state so components can be rendered without a browser.
 */
export const StateCtx = createContext(null);
export const DispatchCtx = createContext(null);
