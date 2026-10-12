import { createContext } from "react";

/**
 * The audio context object.
 *
 * In its own plain .js module for the same reason as state/contexts.js:
 * react-refresh/only-export-components warns when a .jsx file exports anything
 * that is not a component, and a non-component export alongside a provider also
 * degrades fast refresh for real.
 *
 * Application code uses AudioProvider and useAudio, never this directly. The
 * exception is scripts/check-td-render.mjs, which provides a chosen value so
 * MissionCard can be rendered without a browser — it reads three contexts, and
 * two of them are not the simulator's.
 */
export const AudioCtx = createContext(null);
