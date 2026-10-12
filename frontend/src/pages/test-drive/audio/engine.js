/**
 * The narration engine: a module singleton owning exactly one HTMLAudioElement.
 *
 * NOT in reducer state. An HTMLAudioElement is mutable and non-serialisable, so
 * putting it in state would break the two rules initialState.js exists to
 * protect, and would make every state snapshot un-persistable. The element lives
 * here; the reducer never hears about it. Components read status through
 * AudioContext, which subscribes to the events below.
 *
 * Three guarantees, each of which is a bug someone would otherwise hit:
 *   1. Only one narration ever plays. Starting a cue stops whatever is playing,
 *      because two voices talking over each other is worse than silence.
 *   2. A language switch cuts cleanly. The en and hi recordings of one cue are
 *      different files; without an explicit stop, switching mid-sentence leaves
 *      the old language playing under the new one.
 *   3. A missing or broken file resolves the loading state rather than hanging.
 *      "Loading narration…" forever is the failure the brief calls out, and an
 *      `error` event is the only thing that can end it.
 *
 * Plain .js, no React: the status machine is exercised in node with a stub
 * element, which is the only way to test it without a browser.
 */
import { cuePath, CUES } from "./manifest.js";

/** "idle" | "loading" | "playing" | "paused" | "ended" | "error" | "unavailable" */
export const STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  PLAYING: "playing",
  PAUSED: "paused",
  ENDED: "ended",
  /** This cue's file would not load. The text tutorial carries on regardless. */
  ERROR: "error",
  /** No Audio constructor at all — SSR, or a browser with media disabled. */
  UNAVAILABLE: "unavailable",
};

/**
 * Cues already known to be broken, so a retry does not re-request a 404 on every
 * mission change. Keyed `cueId:lang`, since a file can be missing in one
 * language only — which is the most likely shape of the problem.
 */
const failed = new Set();

/** One dev warning per cue. Never contains visitor data — a cue id is not PII. */
const warned = new Set();

const listeners = new Set();

let element = null;
let state = { status: STATUS.IDLE, cueId: null, lang: null, muted: false };

function emit() {
  // A fresh object each time: subscribers compare by identity to decide whether
  // to re-render, and mutating in place would make every update invisible.
  const snapshot = { ...state };
  for (const listener of listeners) listener(snapshot);
}

function set(patch) {
  state = { ...state, ...patch };
  emit();
}

/** Subscribe to status changes. Returns an unsubscribe function. */
export function subscribe(listener) {
  listeners.add(listener);
  listener({ ...state });
  return () => listeners.delete(listener);
}

export function getState() {
  return { ...state };
}

/**
 * The one element, created lazily.
 *
 * Lazily because this module is imported during SSR and at module scope in the
 * browser, and `new Audio()` on the server throws. Returning null rather than
 * throwing lets every caller below degrade to "unavailable" instead of taking
 * the page down over narration.
 */
function getElement() {
  if (element) return element;
  if (typeof Audio === "undefined") return null;
  element = wire(new Audio());
  return element;
}

/**
 * Attach the status listeners to an element. Split out of getElement so a test
 * stub goes through exactly the same wiring as the real element — a stub with
 * hand-rolled listeners would be testing the test.
 */
function wire(el) {
  el.preload = "none";
  el.addEventListener("playing", () => set({ status: STATUS.PLAYING }));
  el.addEventListener("pause", () => {
    // A pause fired at the very end is the `ended` event's doing; do not
    // overwrite the terminal state with "paused".
    if (state.status !== STATUS.ENDED) set({ status: STATUS.PAUSED });
  });
  el.addEventListener("ended", () => set({ status: STATUS.ENDED }));
  el.addEventListener("error", onError);
  return el;
}

function onError() {
  const { cueId, lang } = state;
  if (cueId && lang) {
    failed.add(`${cueId}:${lang}`);
    if (!warned.has(`${cueId}:${lang}`)) {
      warned.add(`${cueId}:${lang}`);
      if (import.meta.env?.DEV) {
        console.warn(`[td-audio] cue "${cueId}" (${lang}) failed to load`);
      }
    }
  }
  // THE guarantee: an error resolves the loading state. Without this the UI sits
  // on "Loading narration…" forever, which the brief names explicitly.
  set({ status: STATUS.ERROR });
}

/** Has this cue already failed in this language? */
export function hasFailed(cueId, lang) {
  return failed.has(`${cueId}:${lang}`);
}

/**
 * Play a cue. Stops whatever is playing first, so only one narration is ever
 * audible.
 *
 * Returns a promise that resolves to the outcome rather than rejecting: a
 * blocked autoplay is NORMAL on mobile, not an error, and a caller should not
 * have to try/catch around it. "blocked" and "error" are different answers and
 * the UI treats them differently — blocked offers a play button, error shows the
 * unavailable indicator.
 */
export async function play(cueId, lang) {
  const el = getElement();
  if (!el) {
    set({ status: STATUS.UNAVAILABLE, cueId, lang });
    return "unavailable";
  }
  if (!CUES[cueId]) {
    if (import.meta.env?.DEV) console.warn(`[td-audio] unknown cue "${cueId}"`);
    return "unknown";
  }

  stop();

  if (hasFailed(cueId, lang)) {
    // Already known broken. Report it without issuing another request.
    set({ status: STATUS.ERROR, cueId, lang });
    return "error";
  }

  const src = cuePath(cueId, lang);
  if (!src) {
    set({ status: STATUS.ERROR, cueId, lang });
    return "error";
  }

  set({ status: STATUS.LOADING, cueId, lang });
  el.src = src;
  el.muted = state.muted;
  el.currentTime = 0;

  try {
    await el.play();
    return "playing";
  } catch (err) {
    /**
     * Autoplay policy, almost always. Mobile browsers reject play() that is not
     * inside a user gesture, and that is expected rather than broken: the cue is
     * simply paused, a visible play button is always offered, and the captions
     * carry the same text so a muted visitor loses nothing.
     *
     * NotSupportedError is the other case — a file that cannot be decoded — and
     * that IS an error, so the two are separated by name rather than lumped.
     */
    if (err?.name === "NotSupportedError") {
      onError();
      return "error";
    }
    set({ status: STATUS.PAUSED });
    return "blocked";
  }
}

/** Resume the current cue, after a blocked autoplay or a manual pause. */
export async function resume() {
  const el = getElement();
  if (!el || !state.cueId) return "idle";
  try {
    await el.play();
    return "playing";
  } catch {
    set({ status: STATUS.PAUSED });
    return "blocked";
  }
}

export function pause() {
  const el = getElement();
  if (!el) return;
  el.pause();
}

/**
 * Stop and detach. Clearing `src` matters: a paused element with a src keeps
 * buffering, and on a language switch the old recording would still be loaded
 * and ready to resume in the wrong language.
 */
export function stop() {
  const el = element;
  if (!el) {
    set({ status: STATUS.IDLE, cueId: null });
    return;
  }
  el.pause();
  el.removeAttribute("src");
  set({ status: STATUS.IDLE, cueId: null });
}

/** Replay the current cue from the beginning. */
export async function replay(cueId = state.cueId, lang = state.lang) {
  if (!cueId || !lang) return "idle";
  return play(cueId, lang);
}

export function setMuted(muted) {
  const next = Boolean(muted);
  if (element) element.muted = next;
  set({ muted: next });
}

export function isMuted() {
  return state.muted;
}

/**
 * Reset the singleton. For tests only — the app has one engine for its lifetime.
 * Exported rather than reached into so a test does not have to know the internals.
 */
export function __reset(stubElement = null) {
  if (element) {
    try {
      element.pause();
    } catch {
      /* a stub may not implement pause */
    }
  }
  failed.clear();
  warned.clear();
  listeners.clear();
  state = { status: STATUS.IDLE, cueId: null, lang: null, muted: false };
  // Through the same wire() the real element goes through, so a test drives the
  // production status machine rather than a parallel one.
  element = stubElement ? wire(stubElement) : null;
  return element;
}
