import { C, CText } from "../kit.jsx";

/**
 * Birthdays today — the sticky-note card.
 *
 * Carries the plan's STICKY NOTE motif, drawn as a tilted yellow square
 * pinned to the surface by a drawn pin at its top edge. The whole card is the
 * note; there is no second motif.
 *
 * Soft ivory ground: the one card in the set that reads like a cork board
 * rather than a dashboard.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function BirthdaysToday({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.gold;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.ivory} />

      {/* The sticky note itself — a tilted yellow square with a soft shadow
          and a curled corner. The curl is a small triangle at the lower
          right, lifted slightly off the main note. */}
      <g transform="translate(160 92) rotate(-4)">
        {/* Shadow under the note. */}
        <rect x="-72" y="-56" width="144" height="112" rx="2" fill={C.ink} opacity="0.08" transform="translate(2 3)" />
        {/* Main note. */}
        <rect x="-72" y="-56" width="144" height="112" rx="2" fill={accent} />
        {/* Faint top-edge highlight, so the note reads as paper and not as
            a slab of colour. */}
        <rect x="-72" y="-56" width="144" height="2" fill={C.white} opacity="0.4" />
        {/* Curled corner at the bottom-right. */}
        <path d="M60 44l12 12h-12z" fill={accent} opacity="0.75" />
        <path d="M60 44l12 12h-12z" fill="none" stroke={C.ink} strokeWidth="0.5" opacity="0.3" />
      </g>

      {/* The pin at the top of the note, drawn upright (not rotated), so it
          reads as fixed to the board rather than part of the paper. */}
      <g>
        <circle cx="162" cy="36" r="5" fill={C.alert} />
        <circle cx="160" cy="34" r="1.5" fill={C.white} opacity="0.6" />
        <rect x="161" y="40" width="2" height="4" fill={C.ink} opacity="0.5" />
      </g>

      <CText
        x="22"
        y="38"
        size={11}
        weight={800}
        fill={p.kicker || C.muted}
        limit={limits.businessName}
      >
        {f.businessName}
      </CText>

      {/* The headline sits over the note itself, slightly off-centre to track
          its tilt. Centred on x=160, which is the note's own x origin. */}
      <CText
        x="160"
        y="86"
        size={20}
        weight={800}
        fill={C.ink}
        anchor="middle"
        limit={limits.headline}
      >
        {f.headline}
      </CText>

      {/* The names list on the note, below the headline, same anchor. */}
      <CText
        x="160"
        y="124"
        size={12}
        weight={700}
        fill={C.ink}
        anchor="middle"
        limit={limits.detail}
        lines={2}
      >
        {f.detail}
      </CText>
    </g>
  );
}
