/**
 * Id generation, deliberately OUTSIDE the reducer.
 *
 * A reducer that calls Math.random() or Date.now() is not a pure function: the
 * same (state, action) stops producing the same result, so it cannot be asserted
 * by equality in a test or replayed from a persisted action log. Callers generate
 * the id and pass it in the action instead.
 *
 * Plain .js so the reducer's tests can import it in node.
 */

let counter = 0;

/**
 * A short, collision-resistant-enough id. These live only in one visitor's
 * browser session and never reach a database, so a monotonic counter plus a
 * random suffix is sufficient — crypto.randomUUID would also do, but it is 36
 * characters in a state dump a human has to read while debugging.
 */
function nextId(prefix) {
  counter += 1;
  const rand = Math.random().toString(36).slice(2, 7);
  return `${prefix}_${counter.toString(36)}${rand}`;
}

/** A configured creative instance: ci_xxxx. */
export const newInstanceId = () => nextId("ci");

/** A schedule slot: sl_xxxx. */
export const newSlotId = () => nextId("sl");
