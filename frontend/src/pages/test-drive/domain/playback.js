/**
 * What is on a screen right now. One pure function; the five previews are five
 * calls to it, memoised on [saved, creativeInstances, sim.nowMin].
 *
 * resolveScreen(cfgSource, screens, creativeInstances, screenId, nowMin)
 *   -> { kind, screenId, sourceScreenId, mirrored, instanceId, slot, reason }
 *
 * `reason` is always an i18n KEY ("play.reason.gap"), never a sentence. The domain
 * layer has no language.
 *
 * NEVER INVENTS A CREATIVE: kind "creative" requires a real slot AND a real
 * instance in creativeInstances. Every other outcome is a named state with a
 * reason, so a missing creative reads as a missing creative rather than as a
 * silently different one.
 *
 * Callers pass `saved.byScreen` and `saved.screens` — not `draft` and not
 * `state.screens` — or role and mirror edits leak into the previews before save.
 *
 * Plain .js, no React — unit-tested in node.
 */
import { slotAt } from "./schedule.js";
import { getScreen, resolveChain } from "./mirroring.js";
import { withinActiveHours } from "./time.js";

/** The five renderings in art/EmptyStates.jsx. */
export const PLAY_KINDS = ["creative", "idle", "no-content", "offline", "broken-link"];

function result(kind, reason, extra = {}) {
  return {
    kind,
    screenId: null,
    sourceScreenId: null,
    mirrored: false,
    instanceId: null,
    slot: null,
    reason,
    ...extra,
  };
}

/**
 * Resolution order is deliberate and load-bearing:
 *
 *   1. offline        — a dark screen shows nothing, whatever the schedule says.
 *                       Wins over everything, including a mirror's state.
 *   2. mirror chain   — decide WHOSE config we are reading before reading any.
 *   3. active hours   — on the SOURCE screen's config (see the note below).
 *   4. slot           — the half-open interval containing nowMin.
 *   5. instance exists— only now may we claim a creative is playing.
 *
 * Reordering any pair of these changes what the visitor is told. In particular,
 * checking hours before the chain would let a mirror show its own idle window
 * instead of its primary's, and checking the slot before hours would report
 * "nothing scheduled" on a screen that is simply closed.
 */
export function resolveScreen(cfgSource, screens, creativeInstances, screenId, nowMin) {
  const screen = getScreen(screens, screenId);
  if (!screen) {
    return result("broken-link", "play.reason.unknownScreen", { screenId });
  }

  // 1. Offline wins over everything.
  if (screen.online === false) {
    return result("offline", "play.reason.offline", { screenId });
  }

  // 2. Whose config drives this screen?
  const chain = resolveChain(screens, screenId);
  if (chain.status === "cycle" || chain.status === "depth") {
    return result("broken-link", "play.reason.cycle", {
      screenId,
      mirrored: true,
    });
  }
  if (chain.status !== "ok" || !chain.sourceId) {
    // "secondary" with nothing to mirror, or a link to a screen that is gone.
    return result("broken-link", "play.reason.unknownScreen", {
      screenId,
      mirrored: true,
    });
  }

  const sourceScreenId = chain.sourceId;
  const mirrored = chain.mirrored;
  const base = { screenId, sourceScreenId, mirrored };

  // A mirror of an offline primary is dark too — the signal it is repeating has
  // gone away. Distinguished from its own offline state by the reason key, so the
  // UI can say "the primary is offline" rather than blaming this screen.
  const source = getScreen(screens, sourceScreenId);
  if (mirrored && source && source.online === false) {
    return result("offline", "play.reason.primaryOffline", base);
  }

  const cfg = cfgSource && cfgSource[sourceScreenId];
  if (!cfg) {
    return result("no-content", "play.reason.notConfigured", base);
  }

  // 3. Active hours, checked on the SOURCE screen's config.
  //
  //    This is the one semantic judgement call in the domain layer. A secondary
  //    screen repeats its primary, and that includes the primary's idle state: if
  //    the primary is closed for the evening, its mirrors go idle with it, even
  //    where the mirror's own stored activeHours would still be open. The
  //    alternative — each mirror honouring its own hours — would mean a mirror
  //    showing content its primary is not showing, which is not what mirroring
  //    means on real hardware, and would make a secondary's hidden, unreachable
  //    activeHours value matter. A secondary's own activeHours is therefore
  //    deliberately ignored until it is promoted back to primary.
  if (!withinActiveHours(nowMin, cfg.activeHours)) {
    return result("idle", "play.reason.outsideHours", base);
  }

  // 4. The slot covering this minute.
  const slot = slotAt(cfg.slots, nowMin);
  if (!slot) {
    return result("no-content", "play.reason.gap", base);
  }

  // 5. Only now may a creative be claimed. A slot pointing at an instance that no
  //    longer exists is reported as such — never substituted with another.
  const instance =
    slot.instanceId && creativeInstances
      ? creativeInstances[slot.instanceId]
      : null;
  if (!instance) {
    return result("no-content", "play.reason.creativeMissing", {
      ...base,
      slot,
      instanceId: slot.instanceId ?? null,
    });
  }

  return result("creative", null, {
    ...base,
    slot,
    instanceId: instance.id ?? slot.instanceId,
  });
}

/** Resolve all screens at once — what ScreenWall memoises. */
export function resolveAllScreens(cfgSource, screens, creativeInstances, nowMin) {
  const list = Array.isArray(screens) ? screens : [];
  return Object.fromEntries(
    list.map((s) => [
      s.id,
      resolveScreen(cfgSource, screens, creativeInstances, s.id, nowMin),
    ])
  );
}

/** True when the screen is showing a real creative right now. */
export function isPlaying(resolution) {
  return resolution?.kind === "creative";
}
