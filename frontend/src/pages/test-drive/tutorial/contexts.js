import { createContext } from "react";

/**
 * The tutorial context object. In its own plain .js module for the reason given
 * in audio/contexts.js — react-refresh warns on a non-component export beside a
 * provider, and fast refresh genuinely degrades.
 *
 * Application code uses TutorialProvider and useTutorial, never this directly;
 * scripts/check-td-render.mjs provides a chosen value to render MissionCard.
 */
export const TutorialCtx = createContext(null);
