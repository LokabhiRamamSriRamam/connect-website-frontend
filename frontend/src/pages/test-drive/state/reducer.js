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
