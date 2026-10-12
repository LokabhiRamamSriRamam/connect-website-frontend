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
import { getTemplate } from "../creatives/registry.js";
import { validateActiveHours, validateSlot } from "../domain/schedule.js";
import { canMirror } from "../domain/mirroring.js";

export { initialState };

/**
 * Record that a screen has unsaved changes.
 *
 * Per-action rather than a deep comparison on render: cheaper, more honest (it
 * reflects "you edited this", not "this differs"), and it gives the per-screen
 * unsaved dots for free. Pass no screenId for an edit that is not scoped to one
 * screen, such as editing a creative instance shared by several.
 */
function markDirty(next, screenId = null) {
  const dirtyScreens =
    screenId && !next.save.dirtyScreens.includes(screenId)
      ? [...next.save.dirtyScreens, screenId]
      : next.save.dirtyScreens;
  return {
    ...next,
    save: { ...next.save, status: "dirty", error: null, dirtyScreens },
  };
}

/** Screens whose draft slots reference a creative instance. */
function screensUsingInstance(byScreen, instanceId) {
  return Object.entries(byScreen)
    .filter(([, cfg]) => cfg.slots.some((s) => s.instanceId === instanceId))
    .map(([id]) => id);
}

/**
 * Write one screen's draft config and mark it dirty. Every schedule case goes
 * through here, so "edited the schedule" and "the screen has unsaved changes"
 * cannot drift apart.
 */
function writeDraft(state, screenId, patch) {
  const current = state.draft.byScreen[screenId];
  return markDirty(
    {
      ...state,
      draft: {
        ...state.draft,
        byScreen: { ...state.draft.byScreen, [screenId]: { ...current, ...patch } },
      },
    },
    screenId
  );
}

/**
 * A deep clone of a screen-config map.
 *
 * SAVE_SUCCESS must not alias draft's arrays into `saved`: a later SLOT_UPDATE
 * replaces the array it writes, but a hand-mutation or a future case that pushed
 * in place would otherwise be visible in `saved` without a save ever happening.
 * Structural, not structuredClone, because the shape is known and plain.
 */
function cloneByScreen(byScreen) {
  return Object.fromEntries(
    Object.entries(byScreen).map(([id, cfg]) => [
      id,
      { activeHours: { ...cfg.activeHours }, slots: cfg.slots.map((s) => ({ ...s })) },
    ])
  );
}

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

    // ---- role and mirroring (phase 8) ----

    case A.SET_SCREEN_ROLE: {
      const screen = state.screens.find((s) => s.id === action.screenId);
      if (!screen) return state;
      const role = action.role === "secondary" ? "secondary" : "primary";
      if (screen.role === role && (role === "primary" ? !screen.mirrors : true)) {
        return state;
      }

      if (role === "primary") {
        /**
         * PROMOTING a secondary.
         *
         * It starts with a COPY of the primary's schedule rather than its own
         * stored one. A secondary's own activeHours and slots are unreachable
         * while it mirrors — resolveScreen deliberately ignores them — so after
         * a long mirroring session they are stale defaults the visitor has never
         * seen. Handing them back would make promotion look like it wiped the
         * schedule. Copying what was actually on the glass makes promotion
         * continuous: the screen keeps showing what it was showing, and is now
         * editable.
         *
         * The copy is deep, or the two screens would share a slots array and
         * editing the new primary would silently edit the old one.
         */
        const sourceId = screen.mirrors;
        const sourceCfg = sourceId ? state.draft.byScreen[sourceId] : null;
        const screens = state.screens.map((s) =>
          s.id === action.screenId ? { ...s, role: "primary", mirrors: null } : s
        );

        let next = { ...state, screens };
        if (sourceCfg) {
          next = {
            ...next,
            draft: {
              ...next.draft,
              byScreen: {
                ...next.draft.byScreen,
                [action.screenId]: {
                  activeHours: { ...sourceCfg.activeHours },
                  // Slot ids must be regenerated, so the caller passes them in —
                  // two screens sharing a slot id would make SLOT_UPDATE on one
                  // ambiguous. A reducer cannot mint them and stay pure.
                  slots: sourceCfg.slots.map((slot, i) => ({
                    ...slot,
                    id: action.slotIds?.[i] ?? `${slot.id}_${action.screenId}`,
                  })),
                },
              },
            },
          };
        }
        return markDirty(next, action.screenId);
      }

      /**
       * DEMOTING a primary to secondary without naming a target.
       *
       * Left as mirrors: null, which resolveChain reports as a broken link rather
       * than silently falling back to its own schedule — "secondary pointing
       * nowhere" is a real state the UI must show, not paper over. The MirrorEditor
       * dispatches SET_MIRROR straight after, so the broken state is momentary in
       * practice; it is representable because hydrated data could be in it.
       *
       * The screen's own slots are left in the draft untouched. They are
       * unreachable while it mirrors, and keeping them costs nothing — whereas
       * clearing them would throw away work if the visitor demotes by accident.
       */
      return markDirty(
        {
          ...state,
          screens: state.screens.map((s) =>
            s.id === action.screenId
              ? { ...s, role: "secondary", mirrors: action.mirrors ?? null }
              : s
          ),
        },
        action.screenId
      );
    }

    case A.SET_MIRROR: {
      // canMirror rejects a self-mirror and anything that would close a loop,
      // which is what keeps resolveChain's own cycle detection from ever firing
      // on data this reducer produced.
      const check = canMirror(state.screens, action.screenId, action.targetId);
      if (!check.ok) {
        return {
          ...state,
          ui: { ...state.ui, toast: { key: check.reason, vars: null, tone: "warn" } },
        };
      }
      const screen = state.screens.find((s) => s.id === action.screenId);
      if (screen.role === "secondary" && screen.mirrors === action.targetId) return state;

      return markDirty(
        {
          ...state,
          screens: state.screens.map((s) =>
            s.id === action.screenId
              ? { ...s, role: "secondary", mirrors: action.targetId }
              : s
          ),
          ui: { ...state.ui, toast: null },
        },
        action.screenId
      );
    }

    case A.CLEAR_MIRROR: {
      const screen = state.screens.find((s) => s.id === action.screenId);
      if (!screen || screen.role !== "secondary") return state;
      /**
       * Unlinking is promotion by another name, so it routes through the same
       * case rather than duplicating the schedule-copy logic — one path means the
       * schedule can only be inherited one way.
       */
      return reducer(state, {
        type: A.SET_SCREEN_ROLE,
        screenId: action.screenId,
        role: "primary",
        slotIds: action.slotIds,
      });
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

    // ---- creatives (phase 5) ----

    case A.CREATIVE_ADD: {
      const tpl = getTemplate(action.templateId);
      if (!tpl) {
        if (import.meta.env?.DEV) {
          console.warn(`[td] CREATIVE_ADD: unknown template "${action.templateId}"`);
        }
        return state;
      }
      // Allowlist on the way IN as well as at render: an instance should never
      // hold a key the template does not declare, so a later template change
      // cannot resurrect stale data as a visible field.
      const fields = {};
      for (const key of tpl.fields) {
        fields[key] = String(action.fields?.[key] ?? tpl.defaults?.[key] ?? "");
      }
      return markDirty({
        ...state,
        creativeInstances: {
          ...state.creativeInstances,
          [action.id]: {
            id: action.id,
            templateId: action.templateId,
            fields,
            createdAt: action.createdAt ?? 0,
          },
        },
      });
    }

    case A.CREATIVE_FIELD: {
      const instance = state.creativeInstances[action.id];
      if (!instance) return state;
      const tpl = getTemplate(instance.templateId);
      // Reject a field the template does not declare, for the reason above.
      if (tpl && !tpl.fields.includes(action.field)) {
        if (import.meta.env?.DEV) {
          console.warn(`[td] CREATIVE_FIELD: "${action.field}" not in ${instance.templateId}`);
        }
        return state;
      }
      /**
       * Writes to ONE instance. A template is never touched, so customising a
       * creative on screen 1 cannot change what screen 2 shows — the four
       * concepts (template, instance, slot assignment, resolved output) stay
       * distinct. Two screens only move together if they share an instance id,
       * which is what Duplicate exists to avoid.
       */
      const next = {
        ...state,
        creativeInstances: {
          ...state.creativeInstances,
          [action.id]: {
            ...instance,
            fields: { ...instance.fields, [action.field]: String(action.value ?? "") },
          },
        },
      };
      // Every screen scheduling this instance now differs from saved.
      const affected = screensUsingInstance(state.draft.byScreen, action.id);
      return affected.reduce((acc, id) => markDirty(acc, id), markDirty(next));
    }

    case A.CREATIVE_DUPLICATE: {
      const source = state.creativeInstances[action.id];
      if (!source || !action.newId) return state;
      return markDirty({
        ...state,
        creativeInstances: {
          ...state.creativeInstances,
          [action.newId]: {
            ...source,
            id: action.newId,
            fields: { ...source.fields },
            createdAt: action.createdAt ?? 0,
          },
        },
      });
    }

    case A.CREATIVE_REMOVE: {
      if (!state.creativeInstances[action.id]) return state;
      const creativeInstances = { ...state.creativeInstances };
      delete creativeInstances[action.id];

      /**
       * Prune slots referencing the instance HERE, in the reducer — not in the
       * view. A slot pointing at a deleted instance would otherwise render as a
       * ghost row in the schedule and resolve to "creativeMissing" on the wall,
       * which is a correct report of an incorrect state. The pruning is what
       * keeps that state from existing.
       */
      const affected = screensUsingInstance(state.draft.byScreen, action.id);
      const byScreen = { ...state.draft.byScreen };
      for (const screenId of affected) {
        byScreen[screenId] = {
          ...byScreen[screenId],
          slots: byScreen[screenId].slots.filter((s) => s.instanceId !== action.id),
        };
      }

      const next = {
        ...state,
        creativeInstances,
        draft: { ...state.draft, byScreen },
      };
      return affected.reduce((acc, id) => markDirty(acc, id), markDirty(next));
    }

    // ---- schedule (phase 6) ----

    case A.SLOT_ADD: {
      const cfg = state.draft.byScreen[action.screenId];
      if (!cfg) return state;

      const slot = {
        id: action.slot?.id,
        startMin: clampMinute(action.slot?.startMin),
        endMin: clampMinute(action.slot?.endMin),
        instanceId: action.slot?.instanceId ?? null,
        enabled: action.slot?.enabled !== false,
      };
      if (!slot.id) return state;

      // An id already in use would overwrite nothing and duplicate everything.
      if (cfg.slots.some((s) => s.id === slot.id)) return state;

      /**
       * Re-validate here even though the view validated first.
       *
       * The view's validation exists to show the visitor a message naming the
       * clashing creative; this one exists so an invalid slot cannot reach state
       * by any other route. Only `errors` block — a slot outside active hours is
       * a warning and is stored, because it is legal and simply never plays.
       *
       * The id is withheld from the validator deliberately: validateSlot reads a
       * present id as "editing an existing slot" and skips the per-screen cap, so
       * passing the freshly generated one would let a 9th slot through.
       */
      const { ok } = validateSlot(
        {
          startMin: slot.startMin,
          endMin: slot.endMin,
          instanceId: slot.instanceId,
          enabled: slot.enabled,
        },
        { slots: cfg.slots, creativeInstances: state.creativeInstances }
      );
      if (!ok) return state;

      return writeDraft(state, action.screenId, { slots: [...cfg.slots, slot] });
    }

    case A.SLOT_UPDATE: {
      const cfg = state.draft.byScreen[action.screenId];
      if (!cfg) return state;
      const existing = cfg.slots.find((s) => s.id === action.slotId);
      if (!existing) return state;

      /**
       * Allowlist the patch, as CREATIVE_FIELD allowlists field names: a slot
       * should never grow a key the shape does not declare, since there is no
       * type checker here to notice one. `id` is deliberately not patchable —
       * renaming a slot would make it a different slot that happens to overwrite
       * this one, and it would be excluded from the wrong row's overlap test on
       * the way there.
       */
      const patch = action.patch ?? {};
      const candidate = { ...existing, id: existing.id };
      // Boundaries are re-clamped; whichever the patch omits is left as-is.
      if (Object.prototype.hasOwnProperty.call(patch, "startMin")) {
        candidate.startMin = clampMinute(patch.startMin);
      }
      if (Object.prototype.hasOwnProperty.call(patch, "endMin")) {
        candidate.endMin = clampMinute(patch.endMin);
      }
      if (Object.prototype.hasOwnProperty.call(patch, "instanceId")) {
        candidate.instanceId = patch.instanceId ?? null;
      }
      if (Object.prototype.hasOwnProperty.call(patch, "enabled")) {
        candidate.enabled = patch.enabled !== false;
      }

      /**
       * `candidate` carries its own id, so validateSlot excludes it from its own
       * overlap test and does not apply the per-screen cap — editing the 8th slot
       * of 8 stays possible, only adding a 9th does not.
       */
      const { ok } = validateSlot(candidate, {
        slots: cfg.slots,
        creativeInstances: state.creativeInstances,
      });
      if (!ok) return state;

      return writeDraft(state, action.screenId, {
        slots: cfg.slots.map((s) => (s.id === action.slotId ? candidate : s)),
      });
    }

    case A.SLOT_REMOVE: {
      const cfg = state.draft.byScreen[action.screenId];
      if (!cfg || !cfg.slots.some((s) => s.id === action.slotId)) return state;
      const next = writeDraft(state, action.screenId, {
        slots: cfg.slots.filter((s) => s.id !== action.slotId),
      });
      // Close the editor if it was open on the slot that just went away, or the
      // sheet would sit there bound to nothing.
      return state.ui.editingSlotId === action.slotId
        ? { ...next, ui: { ...next.ui, editingSlotId: null } }
        : next;
    }

    case A.SLOTS_CLEAR: {
      const cfg = state.draft.byScreen[action.screenId];
      if (!cfg || cfg.slots.length === 0) return state;
      const next = writeDraft(state, action.screenId, { slots: [] });
      return { ...next, ui: { ...next.ui, editingSlotId: null } };
    }

    case A.ACTIVE_HOURS_SET: {
      const cfg = state.draft.byScreen[action.screenId];
      if (!cfg) return state;
      const activeHours = {
        start: clampMinute(action.activeHours?.start),
        end: clampMinute(action.activeHours?.end),
      };
      // Rejects an overnight window: v1's UI does not author them, though
      // withinActiveHours resolves them so stored data still plays correctly.
      if (!validateActiveHours(activeHours).ok) return state;
      if (
        cfg.activeHours.start === activeHours.start &&
        cfg.activeHours.end === activeHours.end
      ) {
        return state;
      }
      return writeDraft(state, action.screenId, { activeHours });
    }

    // ---- save (phase 6) ----

    case A.SAVE_START:
      if (state.save.status === "saving") return state;
      return { ...state, save: { ...state.save, status: "saving", error: null } };

    case A.SAVE_SUCCESS:
      /**
       * The ONLY write to `saved`, and therefore the only way the previews can
       * change. A deep clone of draft plus a snapshot of `screens`: the wall
       * resolves against saved.byScreen and saved.screens, so role and mirror
       * edits (phase 8) stay invisible until this moment too.
       *
       * Status goes to "applied", not "saved" — the ~2.5s transient that says
       * "Applied to virtual screens" and settles via SAVE_APPLIED_SETTLE.
       */
      return {
        ...state,
        saved: {
          byScreen: cloneByScreen(state.draft.byScreen),
          screens: state.screens.map((s) => ({ ...s })),
        },
        savedAt: typeof action.at === "number" ? action.at : null,
        save: { status: "applied", error: null, dirtyScreens: [] },
      };

    case A.SAVE_APPLIED_SETTLE:
      // Only settles the transient. An edit made during those 2.5s has already
      // set "dirty", and that must not be overwritten with "saved".
      if (state.save.status !== "applied") return state;
      return { ...state, save: { ...state.save, status: "saved" } };

    case A.SAVE_FAIL:
      // Leaves draft and dirtyScreens alone: the edits are still unsaved, and the
      // visitor needs them intact to retry.
      return {
        ...state,
        save: { ...state.save, status: "error", error: action.error ?? "error" },
      };

    case A.DISCARD_DRAFT: {
      // Restore from saved, deep-cloned in the other direction so the two never
      // share arrays.
      return {
        ...state,
        draft: { byScreen: cloneByScreen(state.saved.byScreen) },
        save: { status: "clean", error: null, dirtyScreens: [] },
        ui: { ...state.ui, editingSlotId: null },
      };
    }

    // ---- tutorial (phase 10) ----

    case A.TUT_COMPLETE: {
      /**
       * Mark a mission done. Dispatched by TutorialProvider when a mission's
       * predicate turns true — never by a component claiming completion, so
       * "done" always means the visitor did the thing.
       *
       * Idempotent, because the predicate stays true after it fires and would
       * otherwise re-dispatch on every subsequent state change.
       */
      if (!action.missionId || state.tutorial.completed.includes(action.missionId)) {
        return state;
      }
      return {
        ...state,
        tutorial: {
          ...state.tutorial,
          completed: [...state.tutorial.completed, action.missionId],
        },
      };
    }

    case A.TUT_ADVANCE: {
      const total = Number.isInteger(action.total) ? action.total : 6;
      const next = Math.min(state.tutorial.missionIndex + 1, total);
      if (next === state.tutorial.missionIndex) return state;
      return { ...state, tutorial: { ...state.tutorial, missionIndex: next } };
    }

    case A.TUT_SKIP_ALL:
      // Explicit, and always offered. Leaves `completed` alone: skipping is not
      // doing, and the completion screen's checklist should say so honestly.
      return {
        ...state,
        tutorial: { ...state.tutorial, mode: "explore", helpOpenFor: null },
      };

    case A.TUT_SKIP_INTRO:
      if (state.tutorial.introSeen) return state;
      return { ...state, tutorial: { ...state.tutorial, introSeen: true } };

    case A.TUT_REPLAY:
      // Back to the first mission in guided mode, keeping `completed`: the
      // visitor has still done those things, and the checklist should not lie
      // about it just because they are watching again.
      return {
        ...state,
        tutorial: { ...state.tutorial, missionIndex: 0, mode: "guided", helpOpenFor: null },
      };

    case A.TUT_SET_MODE: {
      const mode = action.mode === "explore" ? "explore" : "guided";
      if (state.tutorial.mode === mode) return state;
      return { ...state, tutorial: { ...state.tutorial, mode } };
    }

    case A.TUT_OPEN_HELP: {
      const helpOpenFor = action.missionId ?? null;
      if (state.tutorial.helpOpenFor === helpOpenFor) return state;
      return { ...state, tutorial: { ...state.tutorial, helpOpenFor } };
    }

    // ---- ui (phase 4) ----

    case A.UI_EDIT_SLOT:
      if (state.ui.editingSlotId === (action.slotId ?? null)) return state;
      return { ...state, ui: { ...state.ui, editingSlotId: action.slotId ?? null } };

    case A.UI_TOAST:
      // An i18n key and its vars, never a sentence — a toast must re-render in the
      // new language if the visitor switches while it is up.
      return {
        ...state,
        ui: {
          ...state.ui,
          toast: action.key
            ? { key: action.key, vars: action.vars ?? null, tone: action.tone ?? "info" }
            : null,
        },
      };

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
