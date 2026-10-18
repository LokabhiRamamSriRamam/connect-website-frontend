import { C, CText } from "../kit.jsx";

/**
 * Timetable change — the "class moved" card.
 *
 * The plan's PAPER PLANE motif, drawn flying across the top right of the
 * card with a dashed-trail curve. Red accent (change / attention) rather
 * than the set's usual indigo, so the card reads as "look at this now"
 * without needing all-caps or a shout.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function TimetableChange({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || "#EF4444";
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.cream} />

      {/* Paper plane, upper right. Triangle folds drawn as paths. */}
      <g>
        <path d="M234 40l62 18l-52 10l-2 24l-10-18l-28-10z" fill={C.white} stroke={accent} strokeWidth="1.5" />
        <path d="M244 68l40-10" fill="none" stroke={accent} strokeWidth="1" opacity="0.6" />
        {/* Dashed trail, drawn as five short rects curving back to the left. */}
        {[
          [200, 70], [184, 76], [168, 80], [152, 82], [136, 82],
        ].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="8" height="1.4" rx="0.7" fill={accent} opacity={0.6 - i * 0.08} />
        ))}
      </g>

      {/* Attention badge, upper left — a small circle with an exclamation. */}
      <g>
        <circle cx="34" cy="36" r="10" fill={accent} />
        <rect x="33" y="30" width="2" height="8" rx="1" fill={C.white} />
        <circle cx="34" cy="41" r="1.3" fill={C.white} />
      </g>

      <CText x="52" y="40" size={11} weight={800} fill={C.muted} limit={limits.businessName}>
        {f.businessName}
      </CText>

      <CText x="22" y="86" size={22} weight={800} fill={p.fg || C.ink} limit={limits.headline}>
        {f.headline}
      </CText>

      <CText x="22" y="118" size={12} weight={700} fill={p.kicker || C.slate} limit={limits.detail}>
        {f.detail}
      </CText>

      <rect x="18" y="140" width="156" height="22" rx="11" fill={accent} />
      <CText x="30" y="156" size={12.5} weight={800} fill={C.white} limit={limits.hours}>
        {f.hours}
      </CText>
    </g>
  );
}
