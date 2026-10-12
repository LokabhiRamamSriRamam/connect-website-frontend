/**
 * Primary / secondary (mirroring) domain.
 *
 * A secondary screen has role "secondary" and mirrors a screen id. It holds no
 * schedule of its own: its content is resolved from its primary's config. The
 * chain is normally one hop, but the data shape permits longer chains, so this
 * module resolves them and — more importantly — refuses to loop forever.
 *
 * SET_MIRROR will reject self-mirrors and cycles at the reducer, so resolveChain's
 * cycle detection is DEFENSIVE: it protects against hydrated localStorage from an
 * older build, hand-edited state, and a future action that forgets the check. A
 * render path that can hang the tab on bad data is not acceptable, however
 * unlikely the data is.
 *
 * Plain .js, no React — unit-tested in node.
 */

/** Hard cap on hops. Five screens means a legitimate chain cannot exceed 4. */
export const MAX_MIRROR_DEPTH = 8;

/** Find a screen by id in the screens array, or null. */
export function getScreen(screens, screenId) {
  if (!Array.isArray(screens)) return null;
  return screens.find((s) => s && s.id === screenId) || null;
}

/**
 * Follow a screen's mirror links to the screen whose config actually drives it.
 *
 * Returns:
 *   { sourceId, mirrored, path, status }
 *     sourceId — the screen whose config to read, or null when unresolvable
 *     mirrored — true when sourceId !== screenId (so the caller can badge it)
 *     path     — ids walked, starting with screenId
 *     status   — "ok" | "unknown-screen" | "cycle" | "broken-link" | "depth"
 *
 * A "secondary" screen with mirrors: null is a broken link, not a primary: it was
 * demoted without being pointed anywhere, and showing its own (empty) schedule
 * would be a quiet lie about what hardware would do.
 */
export function resolveChain(screens, screenId) {
  const path = [];
  const seen = new Set();
  let currentId = screenId;

  for (let hop = 0; hop <= MAX_MIRROR_DEPTH; hop += 1) {
    const screen = getScreen(screens, currentId);
    if (!screen) {
      return { sourceId: null, mirrored: path.length > 0, path, status: "unknown-screen" };
    }
    if (seen.has(currentId)) {
      return { sourceId: null, mirrored: true, path, status: "cycle" };
    }
    seen.add(currentId);
    path.push(currentId);

    if (screen.role !== "secondary") {
      return {
        sourceId: currentId,
        mirrored: currentId !== screenId,
        path,
        status: "ok",
      };
    }
    if (!screen.mirrors) {
      return { sourceId: null, mirrored: true, path, status: "broken-link" };
    }
    currentId = screen.mirrors;
  }

  // Depth exhausted without resolving or revisiting — only reachable with more
  // screens than this build has, but it must terminate rather than recurse on.
  return { sourceId: null, mirrored: true, path, status: "depth" };
}

/**
 * Would pointing `screenId` at `targetId` create a self-mirror or a loop?
 * This is the check SET_MIRROR runs before committing, so resolveChain's own
 * detection never has to fire in practice.
 *
 * Returns { ok, reason } where reason is an i18n KEY on rejection.
 */
export function canMirror(screens, screenId, targetId) {
  if (!screenId || !targetId) {
    return { ok: false, reason: "play.reason.unknownScreen" };
  }
  if (screenId === targetId) {
    return { ok: false, reason: "screens.cannotMirrorSelf" };
  }
  if (!getScreen(screens, screenId) || !getScreen(screens, targetId)) {
    return { ok: false, reason: "play.reason.unknownScreen" };
  }
  // Walk up from the proposed target: if we arrive back at screenId, the link
  // would close a loop. Capped by MAX_MIRROR_DEPTH like every other walk here.
  let cursor = targetId;
  for (let hop = 0; hop <= MAX_MIRROR_DEPTH; hop += 1) {
    if (cursor === screenId) return { ok: false, reason: "screens.cannotMirrorCycle" };
    const screen = getScreen(screens, cursor);
    if (!screen || screen.role !== "secondary" || !screen.mirrors) {
      return { ok: true, reason: null };
    }
    cursor = screen.mirrors;
  }
  return { ok: false, reason: "screens.cannotMirrorCycle" };
}

/** Screens that mirror `screenId` directly — its immediate followers. */
export function followersOf(screens, screenId) {
  if (!Array.isArray(screens)) return [];
  return screens.filter((s) => s && s.role === "secondary" && s.mirrors === screenId);
}

/**
 * Every screen downstream of `screenId`, direct and indirect. What the promote /
 * demote dialog counts when it warns "{count} other screen(s) mirror this one".
 */
export function allFollowersOf(screens, screenId) {
  const out = [];
  const queue = [screenId];
  const seen = new Set([screenId]);
  while (queue.length) {
    const id = queue.shift();
    for (const follower of followersOf(screens, id)) {
      if (seen.has(follower.id)) continue;
      seen.add(follower.id);
      out.push(follower);
      queue.push(follower.id);
    }
  }
  return out;
}

/** Candidate primaries for `screenId` to mirror — everything a link may point at. */
export function mirrorCandidates(screens, screenId) {
  if (!Array.isArray(screens)) return [];
  return screens.filter((s) => s && s.id !== screenId && canMirror(screens, screenId, s.id).ok);
}
