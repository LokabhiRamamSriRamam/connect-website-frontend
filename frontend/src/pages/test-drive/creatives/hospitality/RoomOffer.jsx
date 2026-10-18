import { C, CText, CtaPill, PriceBadge } from "../kit.jsx";

/**
 * Weekend escape — one of only two priced creatives in the hospitality set.
 *
 * A published room rate is a normal thing to advertise, unlike a welcome board
 * with a number on it. The manifest explains that choice for the set as a whole.
 *
 * Carries the plan's "star rating" motif, drawn as five stars above the bed:
 * the one place in the set where a hotel's own grading belongs.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */

/**
 * One five-pointed star, as a closed PATH about the origin at radius 7.
 *
 * Computed ONCE at module load rather than per render. The shape never varies —
 * only where each of the five sits — so the trigonometry is a constant, and
 * running it inside the component would redo fifty sin/cos calls every time a
 * visitor typed a character into the editor. Positioning is a translate.
 *
 * A <path> and not a <polygon>, though a polygon expresses this more directly.
 * check-creative-safety.mjs tokenises the rendered output and asserts every
 * element is one of eight inert SVG tags; polygon is not among them. That
 * allowlist is the feature's backstop against an element ever appearing in this
 * tree that can execute, fetch or hold markup, and widening it for one
 * decorative star would trade a security invariant for a nicer shape
 * primitive. The path draws the identical figure.
 */
const STAR_PATH = Array.from({ length: 10 }, (_, i) => {
  // Alternating outer and inner radius, starting at the top point.
  const rad = i % 2 === 0 ? 7 : 7 * 0.42;
  const a = (Math.PI / 5) * i - Math.PI / 2;
  const x = (rad * Math.cos(a)).toFixed(2);
  const y = (rad * Math.sin(a)).toFixed(2);
  return `${i === 0 ? "M" : "L"}${x} ${y}`;
})
  .join("")
  .concat("z");

export default function RoomOffer({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.gold;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.ink} />

      {/* Warm wall light behind the bed. */}
      <circle cx="248" cy="104" r="70" fill={accent} opacity="0.12" />

      {/* A bed, seen from the side: headboard, mattress, two pillows, valance. */}
      <g>
        <rect x="196" y="74" width="10" height="52" rx="3" fill={accent} opacity="0.85" />
        <rect x="206" y="104" width="98" height="18" rx="4" fill={C.white} />
        <rect x="206" y="122" width="98" height="10" rx="3" fill={C.white} opacity="0.45" />
        <rect x="212" y="92" width="30" height="14" rx="5" fill={C.white} opacity="0.9" />
        <rect x="246" y="92" width="30" height="14" rx="5" fill={C.white} opacity="0.7" />
        {/* Legs. */}
        <rect x="210" y="132" width="5" height="9" rx="2" fill={C.white} opacity="0.35" />
        <rect x="296" y="132" width="5" height="9" rx="2" fill={C.white} opacity="0.35" />
      </g>

      {/* Five stars above the bed, each the same precomputed polygon moved
          into place. */}
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={STAR_PATH}
          fill={accent}
          transform={`translate(${212 + i * 19} 60)`}
        />
      ))}

      <CText
        x="22"
        y="42"
        size={11}
        weight={800}
        fill={p.kicker || C.taupe}
        limit={limits.businessName}
      >
        {f.businessName}
      </CText>

      <CText
        x="22"
        y="78"
        size={20}
        weight={800}
        fill={p.fg || C.white}
        limit={limits.headline}
        lines={2}
      >
        {f.headline}
      </CText>

      <CText
        x="22"
        y="116"
        size={12}
        weight={700}
        fill={p.kicker || C.taupe}
        limit={limits.detail}
      >
        {f.detail}
      </CText>

      <PriceBadge cx="43" cy="150" r="19" bg={accent} fg={C.ink} limit={limits.price}>
        {f.price}
      </PriceBadge>

      <CtaPill x="70" y="142" h="17" bg={C.white} fg={C.ink} limit={limits.cta}>
        {f.cta}
      </CtaPill>
    </g>
  );
}
