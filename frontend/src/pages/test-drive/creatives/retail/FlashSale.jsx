import { C, CText, CtaPill } from "../kit.jsx";

/**
 * Flash sale — the loudest creative in the retail set. 320x180 (16:9), drawn edge
 * to edge; CreativeFrame owns the <svg> and the viewBox.
 *
 * The plan's "% burst" motif, used here rather than a price disc: a discount is a
 * claim about the whole store, and a starburst reads as one from across a
 * pavement where a neat circle does not.
 *
 * `f` arrives already allowlisted and String()-coerced by CreativeFrame. Every
 * visible string goes through CText, so overflow is clamped and markup is
 * impossible.
 */

/**
 * The burst points, precomputed rather than generated at render.
 *
 * A 12-point star alternating between two radii. Writing the path literally keeps
 * the component free of the trigonometry that would otherwise run on every
 * render, and the shape never changes — only what is written on it.
 */
const BURST = [
  [0, -46], [9, -28], [23, -40], [21, -19], [41, -23], [31, -7],
  [48, 2], [30, 10], [40, 27], [21, 22], [20, 43], [6, 29],
  [-6, 45], [-16, 29], [-33, 38], [-30, 18], [-49, 16], [-35, 3],
  [-48, -9], [-29, -14], [-37, -32], [-19, -25], [-20, -45], [-6, -30],
]
  .map(([x, y], i) => `${i === 0 ? "M" : "L"}${232 + x} ${90 + y}`)
  .join("")
  .concat("z");

export default function FlashSale({ f, limits, palette }) {
  const p = palette || {};
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.alert} />

      {/* Diagonal hazard-free sheen across the red, so the flat fill has some
          depth without competing with the burst for attention. */}
      <path d="M0 0h120L40 180H0z" fill={C.white} opacity="0.07" />
      <path d="M150 0h60l-80 180h-60z" fill={C.white} opacity="0.05" />

      <path d={BURST} fill={p.accent || C.gold} />
      <path d={BURST} fill="none" stroke={C.ink} strokeWidth="2" opacity="0.25" />

      <CText
        x="22"
        y="36"
        size={11}
        weight={800}
        fill={p.kicker || C.blush}
        limit={limits.businessName}
      >
        {f.businessName}
      </CText>

      <CText
        x="22"
        y="78"
        size={24}
        weight={800}
        fill={p.fg || C.white}
        limit={limits.headline}
      >
        {f.headline}
      </CText>

      <CText
        x="22"
        y="104"
        size={11.5}
        weight={700}
        fill={p.kicker || C.blush}
        limit={limits.offer}
      >
        {f.offer}
      </CText>

      {/* The discount sits ON the burst, centred at its middle. Not a PriceBadge:
          that primitive draws its own disc, which would hide the star. */}
      <CText
        x="232"
        y="96"
        size={17}
        weight={800}
        fill={C.ink}
        anchor="middle"
        limit={limits.price}
      >
        {f.price}
      </CText>

      <CtaPill x="22" y="128" h="21" bg={C.ink} fg={C.white} limit={limits.cta}>
        {f.cta}
      </CtaPill>
    </g>
  );
}
