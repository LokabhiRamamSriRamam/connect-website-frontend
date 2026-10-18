import { C, CText } from "../kit.jsx";

/**
 * Amenity showcase — "everything inside the gate".
 *
 * The one card in the set with a drawn-icon strip: four small schematics for
 * the amenities that a project most often lists (clubhouse, pool, gym, kids'
 * area). The ICONS are decoration; the writable field is a dot-separated
 * sentence, so the visitor can change the list without changing the icons.
 *
 * This is a deliberate limitation — a card that let the visitor pick which
 * four icons appear would need either a repeater field or four coupled text
 * boxes, both of which complicate the editor for one creative in nine. The
 * icons stand for "amenities, generally"; the text names the specific four.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function AmenityShowcase({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.green;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.mint} />

      {/* An accent bar on the LEFT edge rather than the top: it anchors the
          icon strip, which runs vertically from top to bottom-right. */}
      <rect x="0" y="0" width="4" height="180" fill={accent} />

      {/* Icon strip, four tiles across the top. Each tile is a soft-cornered
          square with its symbol inside. */}
      <g>
        {/* Clubhouse — a simple roofed building. */}
        <g transform="translate(174 20)">
          <rect x="0" y="0" width="30" height="30" rx="4" fill={C.white} />
          <path d="M4 18l11-9 11 9v8H4z" fill={accent} />
          <rect x="12" y="20" width="6" height="6" fill={C.white} />
        </g>
        {/* Pool — three wave lines in a tile. */}
        <g transform="translate(208 20)">
          <rect x="0" y="0" width="30" height="30" rx="4" fill={C.white} />
          <path d="M4 14q5-3 10 0t10 0 8 0" fill="none" stroke={accent} strokeWidth="2" />
          <path d="M4 20q5-3 10 0t10 0 8 0" fill="none" stroke={accent} strokeWidth="2" />
          <path d="M4 26q5-3 10 0t10 0 8 0" fill="none" stroke={accent} strokeWidth="2" />
        </g>
        {/* Gym — a dumbbell. */}
        <g transform="translate(242 20)">
          <rect x="0" y="0" width="30" height="30" rx="4" fill={C.white} />
          <rect x="4" y="12" width="4" height="6" rx="1" fill={accent} />
          <rect x="22" y="12" width="4" height="6" rx="1" fill={accent} />
          <rect x="8" y="14" width="14" height="2" fill={accent} />
        </g>
        {/* Kids' area — a kite with a tail. */}
        <g transform="translate(276 20)">
          <rect x="0" y="0" width="30" height="30" rx="4" fill={C.white} />
          <path d="M15 6l8 8-8 10-8-10z" fill={accent} opacity="0.9" />
          <path d="M15 24l2 3-3 1 1-3z" fill={accent} />
          <path d="M15 24c-1 2-2 3-3 3" fill="none" stroke={accent} strokeWidth="1" />
        </g>
      </g>

      <CText
        x="22"
        y="40"
        size={11}
        weight={800}
        fill={p.kicker || C.muted}
        limit={limits.businessName}
      >
        {f.businessName}
      </CText>

      <CText
        x="22"
        y="88"
        size={22}
        weight={800}
        fill={p.fg || C.ink}
        limit={limits.headline}
        lines={2}
      >
        {f.headline}
      </CText>

      <CText
        x="22"
        y="150"
        size={12.5}
        weight={700}
        fill={accent}
        limit={limits.detail}
      >
        {f.detail}
      </CText>
    </g>
  );
}
