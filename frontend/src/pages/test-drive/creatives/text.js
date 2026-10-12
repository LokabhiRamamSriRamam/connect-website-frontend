/**
 * Text fitting for creatives. Plain .js, no JSX — this is the layout-safety
 * guarantee for visitor-supplied strings, so it is testable in node rather than
 * only by eye.
 *
 * Why truncation is a necessity and not politeness: SVG <text> does not wrap and
 * does not shrink. A headline that fits a fixed template in English will overflow
 * it in Devanagari, which sets wider at the same point size. Without a hard cap
 * the text simply runs out of the frame.
 *
 * These functions never produce markup — they only ever return strings, which
 * kit.jsx then renders as JSX text children. See CreativeFrame for the full field
 * contract.
 */

/**
 * Collapse whitespace and clamp to a character limit.
 *
 * Returns "" for null, undefined and blank input, so callers can skip rendering
 * entirely rather than drawing the literal text "undefined" on a screen.
 */
export function clamp(value, limit = 40) {
  const s = String(value ?? "")
    .replace(/\s+/g, " ")
    .trim();
  if (!s) return "";
  if (!Number.isFinite(limit) || limit <= 0) return s;
  if (s.length <= limit) return s;
  // The ellipsis costs a character, so cut to limit-1 and append. At limit 1 there
  // is no room for both, so the ellipsis alone is the honest answer — it still
  // signals "there is more", and the result is never longer than the limit, which
  // the tests assert against every manifest limit and a 5000-character input.
  return limit === 1 ? "…" : `${s.slice(0, limit - 1)}…`;
}

/**
 * Break text into at most `lines` rows of roughly `per` characters, splitting on
 * spaces.
 *
 * Crude by design: measuring real glyph widths needs a canvas or a DOM read, and
 * this runs inside an SVG with no layout pass available. Each manifest's `limits`
 * are tuned so the crude answer is good enough in both languages — the Hindi-safe
 * number, since that is the wider script.
 */
export function wrapLines(value, per = 18, lines = 2) {
  const s = clamp(value, per * lines);
  if (!s) return [];
  if (lines <= 1) return [s];

  const words = s.split(" ");
  const out = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length <= per || !current) {
      current = next;
    } else {
      out.push(current);
      current = word;
      if (out.length === lines - 1) break;
    }
  }
  if (current && out.length < lines) out.push(current);

  // Anything that did not fit is folded onto the last row and clamped, so no word
  // vanishes without an ellipsis showing that it happened.
  const used = out.join(" ").length;
  if (used < s.length && out.length) {
    out[out.length - 1] = clamp(`${out[out.length - 1]} ${s.slice(used).trim()}`, per);
  }
  return out;
}
