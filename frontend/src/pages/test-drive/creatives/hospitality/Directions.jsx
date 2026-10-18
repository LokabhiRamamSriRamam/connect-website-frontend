import { C, CText } from "../kit.jsx";

/**
 * Corridor directions — the last stop on the plan's guest's-day route.
 *
 * Three fields and no call to action: an arrow IS the call to action, as on
 * healthcare's department guide.
 *
 * Shares that card's logic but not its drawing. Both are wayfinding, so both
 * put a destination on a bar with an arrow — but a hotel corridor sign is a
 * brushed plate screwed to a wall, not a hospital's painted chevron, and the
 * arrow here points LEFT because that is the direction hotel room numbering
 * actually sends you half the time. Two wayfinding cards that looked identical
 * would be a template wearing two names.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function Directions({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.indigo;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.sand} />

      {/* The plate, with a thin bevel line along its top edge and four fixing
          screws — the details that say "screwed to a wall" rather than
          "printed on paper". */}
      <rect x="20" y="52" width="280" height="76" rx="6" fill={accent} />
      <rect x="20" y="52" width="280" height="2" rx="1" fill={C.white} opacity="0.3" />
      {[
        [32, 64], [288, 64], [32, 116], [288, 116],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="2.6" fill={C.white} opacity="0.35" />
      ))}

      {/* The arrow, at the plate's left, pointing back down the corridor. */}
      <g>
        <path d="M56 90l16-12v24z" fill={C.white} />
        <rect x="70" y="87" width="28" height="6" rx="3" fill={C.white} />
      </g>

      <CText
        x="20"
        y="38"
        size={11}
        weight={800}
        fill={p.kicker || C.muted}
        limit={limits.businessName}
      >
        {f.businessName}
      </CText>

      {/* The destination, reversed out of the plate and set to the RIGHT of the
          arrow — the reading order a left-pointing sign implies. */}
      <CText
        x="112"
        y="97"
        size={19}
        weight={800}
        fill={C.white}
        limit={limits.headline}
      >
        {f.headline}
      </CText>

      <CText
        x="20"
        y="152"
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
