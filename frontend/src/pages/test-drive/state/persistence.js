/**
 * Persistence, split by sensitivity across two stores (plan §11).
 *
 *   sessionStorage (td.session)  — phone, email, name, lead.id
 *   localStorage   (td.progress) — tutorial, screens, draft, saved, businessName
 *
 * THE SPLIT IS THE POINT. Contact details die with the tab, so "minimal PII in
 * browser storage" needs no cleanup job and no expiry logic — closing the tab IS
 * the cleanup. Everything in localStorage is either non-personal or a public
 * trading name: businessName lives there because it is printed on every creative,
 * and losing it would leave the previews saying someone else's name back to them.
 *
 * `lang` and `muted` are persisted by their own providers under their own keys,
 * not here: they belong to I18nProvider and AudioProvider, which sit ABOVE the
 * simulator and must not depend on its storage.
 *
 * Plain .js, no React: the merge is the easiest thing in the feature to get
 * subtly wrong, so it is unit-tested in node.
 */
import { initialState } from "./initialState.js";

export const PROGRESS_KEY = "td.progress";
export const SESSION_KEY = "td.session";

/** Bumped when the persisted shape changes. A mismatch drops stored progress. */
export const PERSIST_VERSION = initialState.version;

/** Stored progress older than this is dropped. 12 hours, per the plan. */
export const MAX_AGE_MS = 12 * 60 * 60 * 1000;

/** Writes are debounced by this much, so typing does not hit storage per keystroke. */
export const WRITE_DEBOUNCE_MS = 400;

/**
 * Every storage call is wrapped.
 *
 * Safari in private mode throws on setItem rather than failing quietly, and a
 * storage failure must degrade to in-memory rather than taking the test drive
 * down. Reads can also throw where the whole API is blocked by policy.
 */
function safeGet(store, key) {
  try {
    return store?.getItem(key) ?? null;
  } catch {
    return null;
  }
}

function safeSet(store, key, value) {
  try {
    store?.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

function safeRemove(store, key) {
  try {
    store?.removeItem(key);
  } catch {
    /* nothing to do: the value is already unreachable */
  }
}

/** The stores, or null under SSR. Looked up per call rather than captured. */
function stores() {
  if (typeof window === "undefined") return { local: null, session: null };
  return {
    local: window.localStorage ?? null,
    session: window.sessionStorage ?? null,
  };
}

/**
 * What goes to localStorage. An explicit projection, never a spread of state:
 * `ui` and `sim.playing` must not be restored, `lead.error` is a stale failure
 * from a previous visit, and a top-level spread would carry all of it plus
 * anything a future phase adds.
 */
export function selectProgress(state) {
  return {
    step: state.step,
    savedAt: state.savedAt,
    // The trading name only. Phone, email and the contact name are session data.
    business: {
      businessName: state.business.businessName,
      industry: state.business.industry,
    },
    screens: state.screens,
    selectedScreenId: state.selectedScreenId,
    creativeInstances: state.creativeInstances,
    draft: state.draft,
    saved: state.saved,
    save: state.save,
    sim: { nowMin: state.sim.nowMin, speed: state.sim.speed },
    health: state.health,
    tutorial: state.tutorial,
  };
}

/** What goes to sessionStorage: the PII, and nothing else. */
export function selectSession(state) {
  return {
    phone: state.business.phone,
    email: state.business.email,
    name: state.business.name,
    leadId: state.lead.id,
    leadStatus: state.lead.status,
  };
}

/** Write both stores. Returns false if either was refused. */
export function save(state) {
  const { local, session } = stores();
  const envelope = JSON.stringify({
    v: PERSIST_VERSION,
    at: Date.now(),
    data: selectProgress(state),
  });
  const okProgress = safeSet(local, PROGRESS_KEY, envelope);
  const okSession = safeSet(session, SESSION_KEY, JSON.stringify(selectSession(state)));
  return okProgress && okSession;
}

/**
 * Read both stores and return a patch for HYDRATE, or null if there is nothing
 * usable. Returning null rather than an empty object lets the caller skip the
 * dispatch entirely on a first visit.
 */
export function load() {
  const { local, session } = stores();

  let progress = null;
  const rawProgress = safeGet(local, PROGRESS_KEY);
  if (rawProgress) {
    try {
      const envelope = JSON.parse(rawProgress);
      // A version bump or a stale visit drops it: a shape from an older build
      // merged key-by-key would pass every check and still be wrong.
      if (envelope?.v === PERSIST_VERSION && typeof envelope.at === "number") {
        if (Date.now() - envelope.at <= MAX_AGE_MS) progress = envelope.data ?? null;
      }
      if (!progress) safeRemove(local, PROGRESS_KEY);
    } catch {
      // Corrupt JSON. Drop it rather than carrying it forward forever.
      safeRemove(local, PROGRESS_KEY);
    }
  }

  let contact = null;
  const rawSession = safeGet(session, SESSION_KEY);
  if (rawSession) {
    try {
      contact = JSON.parse(rawSession);
    } catch {
      safeRemove(session, SESSION_KEY);
    }
  }

  if (!progress && !contact) return null;
  return { progress, contact };
}

/** Clear both keys. What RESTART does, and the only place PII is deleted. */
export function clear() {
  const { local, session } = stores();
  safeRemove(local, PROGRESS_KEY);
  safeRemove(session, SESSION_KEY);
}

/**
 * Merge a loaded patch over initialState, KEY BY KEY for known keys only.
 *
 * Never a top-level spread. The plan calls this out and it is the right call:
 * a spread would carry `ui` and `sim.playing` back in, would resurrect a stale
 * `lead.error` from a previous visit, and — worse — would silently accept any
 * key a future shape change removed, so the state would be part-new part-old
 * with no complaint from anywhere.
 *
 * Each branch below validates the TYPE it expects, because the input is JSON
 * from browser storage: it can be edited by hand, corrupted by a half-written
 * quota failure, or left over from a build that shaped things differently.
 */
export function hydrate(state, patch) {
  if (!patch) return state;
  const { progress, contact } = patch;
  let next = state;

  if (progress) {
    const merged = { ...next };

    if (progress.step === "console" || progress.step === "intake") {
      merged.step = progress.step;
    }
    if (progress.savedAt === null || typeof progress.savedAt === "number") {
      merged.savedAt = progress.savedAt;
    }

    if (progress.business && typeof progress.business === "object") {
      merged.business = {
        ...merged.business,
        businessName: String(progress.business.businessName ?? ""),
        industry: String(progress.business.industry ?? ""),
      };
    }

    // The five screens, only if the stored array still has five of them with the
    // ids this build uses. A four-screen array would break every lookup.
    if (
      Array.isArray(progress.screens) &&
      progress.screens.length === state.screens.length &&
      progress.screens.every((s, i) => s && s.id === state.screens[i].id)
    ) {
      merged.screens = progress.screens;
    }

    if (
      typeof progress.selectedScreenId === "string" &&
      merged.screens.some((s) => s.id === progress.selectedScreenId)
    ) {
      merged.selectedScreenId = progress.selectedScreenId;
    }

    if (progress.creativeInstances && typeof progress.creativeInstances === "object") {
      merged.creativeInstances = progress.creativeInstances;
    }

    if (progress.draft?.byScreen && typeof progress.draft.byScreen === "object") {
      merged.draft = { byScreen: progress.draft.byScreen };
    }
    if (progress.saved?.byScreen && Array.isArray(progress.saved.screens)) {
      merged.saved = {
        byScreen: progress.saved.byScreen,
        screens: progress.saved.screens,
      };
    }

    if (progress.save && typeof progress.save === "object") {
      /**
       * "saving" and "applied" are both in-flight states owned by a timer that
       * did not survive the refresh. Restoring either would leave the chip
       * spinning forever or claiming an apply that is not happening, so they
       * settle to the honest resting state instead.
       */
      const status =
        progress.save.status === "saving" || progress.save.status === "applied"
          ? "dirty"
          : progress.save.status;
      merged.save = {
        status: typeof status === "string" ? status : "clean",
        error: null, // a failure from a previous visit is not this visit's problem
        dirtyScreens: Array.isArray(progress.save.dirtyScreens)
          ? progress.save.dirtyScreens
          : [],
      };
    }

    if (progress.sim && typeof progress.sim === "object") {
      // playing is deliberately NOT restored: a clock that starts running on
      // page load, before the visitor has touched anything, reads as a bug.
      merged.sim = {
        ...merged.sim,
        nowMin: Number.isInteger(progress.sim.nowMin) ? progress.sim.nowMin : merged.sim.nowMin,
        speed: Number.isInteger(progress.sim.speed) ? progress.sim.speed : merged.sim.speed,
        playing: false,
      };
    }

    if (progress.health && Number.isInteger(progress.health.tick)) {
      merged.health = { tick: progress.health.tick };
    }

    if (progress.tutorial && typeof progress.tutorial === "object") {
      merged.tutorial = {
        ...merged.tutorial,
        missionIndex: Number.isInteger(progress.tutorial.missionIndex)
          ? progress.tutorial.missionIndex
          : 0,
        completed: Array.isArray(progress.tutorial.completed)
          ? progress.tutorial.completed
          : [],
        mode: progress.tutorial.mode === "explore" ? "explore" : "guided",
        introSeen: Boolean(progress.tutorial.introSeen),
        // Never restored: a help panel reopening on load is noise.
        helpOpenFor: null,
      };
    }

    next = merged;
  }

  if (contact && typeof contact === "object") {
    next = {
      ...next,
      business: {
        ...next.business,
        phone: String(contact.phone ?? ""),
        email: String(contact.email ?? ""),
        name: String(contact.name ?? ""),
      },
      lead: {
        ...next.lead,
        id: contact.leadId ?? null,
        // "sending" was in flight when the tab closed and is not any more.
        status: contact.leadStatus === "sending" ? "idle" : (contact.leadStatus ?? "idle"),
        error: null,
      },
    };
  }

  // `ui` is never restored, by omission rather than by deletion — it is simply
  // not in selectProgress, so there is nothing here to ignore.
  return next;
}
