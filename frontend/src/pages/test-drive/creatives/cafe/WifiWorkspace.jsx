import { C, CText, CtaPill } from "../kit.jsx";

/**
 * Wi-Fi and a seat to work from. Informational-leaning, so no price badge: four
 * fields rather than five, driven by its manifest entry.
 */
export default function WifiWorkspace({ f, limits, palette }) {
  const p = palette || {};
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.mist} />

      {/* A Wi-Fi fan, built from arcs rather than an icon font. */}
      <g transform="translate(252 104)">
        <circle cx="0" cy="26" r="5" fill={p.accent || C.violet} />
        {[14, 26, 38].map((r, i) => (
          <path
            key={r}
            d={`M${-r} ${26 - r * 0.72}a${r * 1.35} ${r * 1.35} 0 0 1 ${r * 2} 0`}
            fill="none"
            stroke={p.accent || C.violet}
            strokeWidth="4"
            strokeLinecap="round"
            opacity={0.95 - i * 0.22}
          />
        ))}
      </g>

      {/* A laptop under it — the seat, implied. */}
      <path d="M198 142h56l6 10h-68z" fill={C.ink} opacity="0.85" />
      <rect x="206" y="112" width="40" height="30" rx="2.5" fill={C.white} stroke={C.ink} strokeWidth="2" />

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
        y="76"
        size={21}
        weight={800}
        fill={p.fg || C.ink}
        limit={limits.headline}
        lines={2}
      >
        {f.headline}
      </CText>

      <CText x="22" y="126" size={12} weight={700} fill={C.slate} limit={limits.offer} lines={2}>
        {f.offer}
      </CText>

      <CtaPill x="22" y="150" h="20" bg={p.accent || C.violet} fg={C.white} limit={limits.cta}>
        {f.cta}
      </CtaPill>
    </g>
  );
}
