import { C, CText, CtaPill, PriceBadge } from "../kit.jsx";

/**
 * Tower launch — the one card in the real-estate set that is allowed to shout.
 *
 * Carries the plan's CRANE motif, drawn as the jib of a tower crane behind the
 * title, because a launch poster without a crane is a brochure and not a
 * launch. Blueprint-ground indigo on blueprint-ground indigo: the drawing is a
 * schematic, not a photograph of a building that does not exist yet.
 *
 * The payload is the booking amount — "₹2L booking" — and the launch date, so
 * the price badge sits with its explanation beside it rather than alone.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function TowerLaunch({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.gold;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.indigo} />

      {/* The blueprint grid: twenty-two faint vertical lines and six horizontals,
          laid wholly behind the artwork, so the surface reads as drafting paper
          rather than as a wash. Column spacing 14, which lands the leftmost at
          x=14 and the rightmost at x=308 — inside the 320 frame by 12 each side. */}
      {Array.from({ length: 22 }, (_, i) => (
        <rect key={`v${i}`} x={14 + i * 14} y="0" width="0.5" height="180" fill={C.white} opacity="0.08" />
      ))}
      {Array.from({ length: 6 }, (_, i) => (
        <rect key={`h${i}`} x="0" y={30 + i * 25} width="320" height="0.5" fill={C.white} opacity="0.08" />
      ))}

      {/* A tower crane at the right — mast, jib, counter-jib, cable, hook. The
          one SOLID element against the grid, so the eye lands on it. */}
      <g>
        {/* Mast. */}
        <rect x="280" y="40" width="4" height="100" fill={accent} />
        <rect x="276" y="140" width="12" height="4" fill={accent} />
        {/* Operator cabin. */}
        <rect x="272" y="46" width="18" height="10" rx="1" fill={accent} />
        {/* Jib (long arm, out to the left) and counter-jib. */}
        <path d="M232 40l56-6 0 8-56 2z" fill={accent} />
        <path d="M284 34l20 2 0 8-20-2z" fill={accent} />
        {/* The jib's lattice, as three short cross-struts, so it reads as a
            crane and not as a plank. */}
        <rect x="248" y="40" width="0.5" height="6" fill={C.ink} opacity="0.4" />
        <rect x="260" y="40" width="0.5" height="6" fill={C.ink} opacity="0.4" />
        <rect x="272" y="40" width="0.5" height="6" fill={C.ink} opacity="0.4" />
        {/* Cable and hook, dropping from near the jib's tip. */}
        <rect x="244" y="43" width="0.75" height="36" fill={accent} opacity="0.9" />
        <rect x="242" y="79" width="5" height="4" rx="1" fill={accent} />
      </g>

      <CText
        x="22"
        y="38"
        size={11}
        weight={800}
        fill={p.kicker || C.mist}
        limit={limits.businessName}
      >
        {f.businessName}
      </CText>

      <CText
        x="22"
        y="74"
        size={23}
        weight={800}
        fill={p.fg || C.white}
        limit={limits.headline}
      >
        {f.headline}
      </CText>

      <CText
        x="22"
        y="106"
        size={12}
        weight={700}
        fill={p.kicker || C.mist}
        limit={limits.detail}
      >
        {f.detail}
      </CText>

      <PriceBadge cx="43" cy="146" r="19" bg={accent} fg={C.ink} limit={limits.price}>
        {f.price}
      </PriceBadge>

      <CtaPill x="70" y="138" h="17" bg={C.white} fg={C.ink} limit={limits.cta}>
        {f.cta}
      </CtaPill>
    </g>
  );
}
