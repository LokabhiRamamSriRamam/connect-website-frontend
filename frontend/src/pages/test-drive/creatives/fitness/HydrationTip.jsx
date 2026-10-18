import { C, CText } from "../kit.jsx";

/**
 * Hydration tip — the between-sets wellness card.
 *
 * The WATER-BOTTLE motif the plan names, drawn as a tall gym bottle with a
 * screw cap, a measurement band, and a sloshing waterline. Lavender ground
 * so the card reads calm — the opposite of the ink-black motivation slab.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function HydrationTip({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.indigo;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.lilac} />

      {/* The bottle, right side. Cap + neck + body + waterline + measurement
          marks on the side. */}
      <g>
        {/* Cap. */}
        <rect x="258" y="24" width="22" height="10" rx="2" fill={accent} />
        {/* Neck. */}
        <rect x="261" y="34" width="16" height="8" rx="1" fill={accent} opacity="0.9" />
        {/* Body. */}
        <rect x="248" y="42" width="42" height="106" rx="6" fill={C.white} stroke={accent} strokeWidth="2" />
        {/* Waterline — about 60 percent full. */}
        <rect x="250" y="88" width="38" height="58" rx="4" fill={accent} opacity="0.3" />
        {/* Measurement marks on the right side of the bottle. */}
        {[62, 82, 102, 122].map((y, i) => (
          <rect key={i} x="282" y={y} width="6" height="1.5" fill={accent} opacity="0.6" />
        ))}
        {/* Grip ring in the middle. */}
        <rect x="246" y="96" width="46" height="4" rx="1" fill={accent} opacity="0.15" />
      </g>

      <CText
        x="22"
        y="46"
        size={11}
        weight={800}
        fill={p.kicker || C.muted}
        limit={limits.businessName}
      >
        {f.businessName}
      </CText>

      <CText
        x="22"
        y="86"
        size={22}
        weight={800}
        fill={p.fg || C.ink}
        limit={limits.headline}
      >
        {f.headline}
      </CText>

      <CText
        x="22"
        y="124"
        size={12}
        weight={700}
        fill={p.kicker || C.muted}
        limit={limits.detail}
        lines={2}
      >
        {f.detail}
      </CText>
    </g>
  );
}
