import { C, CText, CtaPill, PriceBadge } from "../kit.jsx";

/** Out-of-the-oven announcement. Bright, and the warmest palette in the set. */
export default function FreshBakes({ f, limits, palette }) {
  const p = palette || {};
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.ivory} />
      {/* A band of oven warmth along the bottom. */}
      <rect x="0" y="132" width="320" height="48" fill={p.accent || C.gold} opacity="0.3" />

      {/* A tray of three bakes. */}
      <rect x="196" y="118" width="104" height="8" rx="4" fill={C.taupe} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <ellipse
            cx={216 + i * 32}
            cy="108"
            rx="15"
            ry="12"
            fill={p.accent || C.gold}
            stroke={C.ink}
            strokeWidth="1.5"
          />
          {/* A score mark across the top of each. */}
          <path
            d={`M${209 + i * 32} 103q7-5 14 0`}
            fill="none"
            stroke={C.ink}
            strokeWidth="1.2"
            opacity="0.5"
          />
        </g>
      ))}

      {/* Heat rising off the tray. */}
      <path
        d="M212 88c-3-5 3-7 0-12M248 86c-3-5 3-7 0-12M284 88c-3-5 3-7 0-12"
        fill="none"
        stroke={C.taupe}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.8"
      />

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
        size={22}
        weight={800}
        fill={p.fg || C.ink}
        limit={limits.headline}
        lines={2}
      >
        {f.headline}
      </CText>

      <CText x="22" y="124" size={12} weight={700} fill={C.slate} limit={limits.offer}>
        {f.offer}
      </CText>

      <PriceBadge cx="44" cy="152" r="20" bg={C.white} limit={limits.price}>
        {f.price}
      </PriceBadge>

      <CtaPill x="72" y="144" h="19" bg={p.fg || C.ink} fg={C.white} limit={limits.cta}>
        {f.cta}
      </CtaPill>
    </g>
  );
}
