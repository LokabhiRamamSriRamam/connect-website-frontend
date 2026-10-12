/**
 * Simulated screen health. Labelled as simulated everywhere it surfaces
 * (health.disclaimer), because inventing plausible hardware telemetry and
 * presenting it as real would be dishonest about what this test drive is.
 *
 * Deterministic by construction: no Math.random and no Date in here. A seeded
 * integer hash turns (screenId, tick) into a stable number, so HEALTH_TICK is a
 * pure reducer case, the same tick always renders the same figures, and a refresh
 * that rehydrates the same tick does not reshuffle every screen's uptime. The
 * reducer owns the tick counter; this module owns the arithmetic.
 *
 * Plain .js, no React — unit-tested in node.
 */
import { MINUTES_PER_DAY, clampMinute, wrapMinute } from "./time.js";
import { isPlaying } from "./playback.js";

/** Connectivity states. These map onto screens.online / screens.offline copy. */
export const HEALTH_STATUS = { ONLINE: "online", OFFLINE: "offline" };

/**
 * A small deterministic hash: (string, number) -> [0, 1). FNV-1a style, kept
 * inline rather than pulled in, since it exists only to make the simulation
 * repeatable.
 */
export function seededUnit(key, tick = 0) {
  let h = 0x811c9dc5;
  const input = `${key}#${tick}`;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h / 0x100000000;
}

/**
 * Health for one screen at a given sim minute and tick.
 *
 * lastSeenMin — for an online screen, now. For an offline one, a few minutes ago,
 *               so "Last seen" reads as a real elapsed gap rather than "now" on a
 *               screen that is plainly dark.
 * uptimePct   — 97.0-99.9 online, 80.0-94.9 offline. One decimal, as a number;
 *               the view formats it. Never 100: a claim of perfect uptime from a
 *               simulation is the least believable number we could print.
 */
export function screenHealth(screen, nowMin, tick = 0, resolution = null) {
  const id = screen?.id ?? "unknown";
  const online = screen?.online !== false;
  const now = clampMinute(nowMin);
  const r = seededUnit(id, tick);

  const staleBy = online ? 0 : 2 + Math.floor(seededUnit(`${id}:stale`, tick) * 27);
  const uptimePct = online
    ? Math.round((97 + r * 2.9) * 10) / 10
    : Math.round((80 + r * 14.9) * 10) / 10;

  return {
    status: online ? HEALTH_STATUS.ONLINE : HEALTH_STATUS.OFFLINE,
    online,
    lastSeenMin: online ? now : wrapMinute(now - staleBy),
    staleMinutes: staleBy,
    uptimePct,
    // Playback is a separate axis from connectivity: an online screen outside its
    // active hours is healthy AND not playing, and the panel shows both rows.
    playing: resolution ? isPlaying(resolution) : false,
    playbackReason: resolution?.reason ?? null,
  };
}

/** Health for every screen, keyed by id — the shape of state.health. */
export function allScreenHealth(screens, nowMin, tick = 0, resolutions = null) {
  const list = Array.isArray(screens) ? screens : [];
  return Object.fromEntries(
    list.map((s) => [s.id, screenHealth(s, nowMin, tick, resolutions?.[s.id] ?? null)])
  );
}

/**
 * The one-line fleet summary above the wall. Returns i18n KEYS plus counts, so
 * the view picks summaryAll or summarySome and interpolates.
 */
export function healthSummary(screens) {
  const list = (Array.isArray(screens) ? screens : []).filter(Boolean);
  const total = list.length;
  const online = list.filter((s) => s.online !== false).length;
  return {
    total,
    online,
    offline: total - online,
    allOnline: total > 0 && online === total,
    key: total > 0 && online === total ? "screens.summaryAll" : "screens.summarySome",
    vars: { online, total },
  };
}

/**
 * Advance the sim clock by `speed` minutes, wrapping at midnight. Lives here
 * rather than in the reducer so SIM_TICK stays a one-liner and the wrap is tested
 * with the rest of the time arithmetic.
 */
export function advanceClock(nowMin, speed = 1) {
  const step = Number.isFinite(speed) ? Math.round(speed) : 1;
  return wrapMinute(clampMinute(nowMin) + step);
}

/** Minutes until a screen's active hours next open — for play.idleBody's {start}. */
export function minutesUntilOpen(nowMin, activeHours) {
  if (!activeHours || !Number.isFinite(activeHours.start)) return null;
  const now = wrapMinute(nowMin);
  const start = wrapMinute(activeHours.start);
  return (start - now + MINUTES_PER_DAY) % MINUTES_PER_DAY;
}
