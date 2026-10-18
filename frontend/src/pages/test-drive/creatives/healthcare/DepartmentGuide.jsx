import { C, CText } from "../kit.jsx";

/**
 * Department guide — wayfinding, which the plan names as the healthcare hero's
 * own subject ("City Care Hospital — Welcome" on a hospital wayfinding screen).
 *
 * Three fields and no call to action. A direction sign that ends in "find out
 * more" has failed at being a direction sign; the arrow is the call to action.
 *
 * The arrow is drawn, not typed, for the same reason the whole creative tree
 * avoids token substitution: an arrow glyph depends on the font resolving, and
 * these render on whatever a cheap Android stick has installed.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function DepartmentGuide({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.iris;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.cream} />

      {/* The sign board: a broad bar with a chevron point, the shape every
          hospital corridor already uses. */}
      <path d="M0 58h252l36 32-36 32H0z" fill={accent} />

      {/* The arrow, inside the bar at its right, pointing the way. */}
      <g>
        <rect x="214" y="87" width="32" height="6" rx="3" fill={C.white} />
        <path d="M242 78l18 12-18 12z" fill={C.white} />
      </g>

      <CText
        x="24"
        y="36"
        size={11}
        weight={800}
        fill={p.kicker || C.muted}
        limit={limits.businessName}
      >
        {f.businessName}
      </CText>

      {/* The destination, reversed out of the bar. One line, large: this is
          read at a walking pace from across a corridor. */}
      <CText
        x="24"
        y="97"
        size={19}
        weight={800}
        fill={C.white}
        limit={limits.headline}
      >
        {f.headline}
      </CText>

      {/* The route, below the bar in ink — the detail you read once you have
          found your destination on the board above. */}
      <CText
        x="24"
        y="146"
        size={13}
        weight={700}
        fill={p.fg || C.ink}
        limit={limits.detail}
      >
        {f.detail}
      </CText>
    </g>
  );
}
