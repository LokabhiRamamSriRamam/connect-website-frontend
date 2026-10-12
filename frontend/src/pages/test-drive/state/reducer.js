/**
 * The one test-drive reducer.
 *
 * Pure, plain .js, no React import — so it can be exercised directly in node
 * rather than only through the UI. Every case returns a new object; nothing is
 * mutated in place.
 *
 * `lang` is deliberately absent. It lives in I18nProvider above this reducer and is
 * never passed in, which is what makes a language switch a pure re-render instead
 * of a reset. See the provider-order comment in TestDrive.jsx.
 *
 * Phase 2 implements the intake group only. The rest of the vocabulary is declared
 * in actions.js so the default case below can tell a typo from a not-yet-built
 * action.
 */
import { A } from "./actions.js";
import { initialState } from "./initialState.js";
import { clampMinute } from "../domain/time.js";
import { advanceClock } from "../domain/health.js";

export { initialState };

export function reducer(state, action) {
  switch (action.type) {
    case A.BUSINESS_FIELD: {
      // Guard the field name: a typo'd key would silently add junk to a shape that
      // has no type checker to catch it.
      if (!Object.prototype.hasOwnProperty.call(state.business, action.field)) {
        if (import.meta.env?.DEV) {
          console.warn(`[td] BUSINESS_FIELD: unknown field "${action.field}"`);
        }
        return state;
      }
      return {
        ...state,
        business: { ...state.business, [action.field]: action.value },
        // Editing after a failure clears the stale error but keeps status honest.
        lead: state.lead.error ? { ...state.lead, error: null } : state.lead,
      };
    }

    case A.BUSINESS_SUBMIT_START:
      return { ...state, lead: { ...state.lead, status: "sending", error: null } };

    case A.BUSINESS_SUBMIT_OK:
      return {
        ...state,
        lead: { status: "sent", id: action.id ?? null, error: null },
      };

    case A.BUSINESS_SUBMIT_FAIL:
      // Does not touch `step`. The caller still dispatches ENTER_CONSOLE: losing
      // the visitor to a network blip costs more than losing the lead, and a retry
      // hook lands on first Save.
      return {
        ...state,
        lead: { ...state.lead, status: "error", error: action.error ?? null },
      };

    case A.ENTER_CONSOLE:
      if (state.step === "console") return state;
      return { ...state, step: "console" };

    // ---- screens and simulation (phase 4) ----

    case A.SELECT_SCREEN: {
      // Selection is navigation, not an edit: it must never mark the screen dirty
      // or the save chip would light up from merely looking around.
      if (!state.screens.some((s) => s.id === action.screenId)) {
        if (import.meta.env?.DEV) {
          console.warn(`[td] SELECT_SCREEN: unknown screen "${action.screenId}"`);
        }
        return state;
      }
      if (state.selectedScreenId === action.screenId) return state;
      return { ...state, selectedScreenId: action.screenId };
    }

    case A.TOGGLE_SCREEN_ONLINE: {
      const exists = state.screens.some((s) => s.id === action.screenId);
      if (!exists) return state;
      /**
       * Connectivity is part of the simulated environment, not part of the
       * configuration the visitor is drafting, so this writes `screens` AND the
       * saved snapshot. Previews resolve against saved.screens; if it only wrote
       * `screens`, taking a display dark would do nothing visible until the next
       * save, which would read as a bug rather than as a deliberate boundary.
       * Role and mirror edits, which ARE configuration, stay draft-only.
       */
      const flip = (list) =>
        list.map((s) => (s.id === action.screenId ? { ...s, online: !s.online } : s));
      return {
        ...state,
        screens: flip(state.screens),
        saved: { ...state.saved, screens: flip(state.saved.screens) },
      };
    }

    case A.SIM_SET_TIME: {
      const nowMin = clampMinute(action.nowMin);
      if (state.sim.nowMin === nowMin) return state;
      // Scrubbing by hand stops the clock, or the next tick would yank the
      // playhead away from where the visitor just put it.
      return { ...state, sim: { ...state.sim, nowMin, playing: false } };
    }

    case A.SIM_PLAY:
      if (state.sim.playing) return state;
      return { ...state, sim: { ...state.sim, playing: true } };

    case A.SIM_PAUSE:
      if (!state.sim.playing) return state;
      return { ...state, sim: { ...state.sim, playing: false } };

    case A.SIM_TICK:
      return {
        ...state,
        sim: { ...state.sim, nowMin: advanceClock(state.sim.nowMin, state.sim.speed) },
      };

    case A.SIM_SET_SPEED: {
      const speed = Number(action.speed);
      if (!Number.isFinite(speed) || speed <= 0) return state;
      return { ...state, sim: { ...state.sim, speed: Math.round(speed) } };
    }

    case A.HEALTH_TICK:
      // Just a counter — see the health comment in initialState.js.
      return { ...state, health: { ...state.health, tick: (state.health.tick ?? 0) + 1 } };

    // ---- ui (phase 4) ----

    case A.UI_SET_WALL_VIEW: {
      if (action.view !== "grid" && action.view !== "list") return state;
      if (state.ui.wallView === action.view) return state;
      return { ...state, ui: { ...state.ui, wallView: action.view } };
    }

    case A.UI_SET_SCHEDULE_VIEW: {
      if (action.view !== "list" && action.view !== "timeline") return state;
      if (state.ui.scheduleView === action.view) return state;
      return { ...state, ui: { ...state.ui, scheduleView: action.view } };
    }

    default:
      if (import.meta.env?.DEV) {
        const known = Object.prototype.hasOwnProperty.call(A, action?.type);
        console.warn(
          known
            ? `[td] action "${action.type}" is declared but not implemented yet`
            : `[td] unknown action type: ${String(action?.type)}`
        );
      }
      return state;
  }
}
