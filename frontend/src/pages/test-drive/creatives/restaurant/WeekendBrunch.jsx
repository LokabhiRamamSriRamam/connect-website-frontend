import { C, CText, CtaPill, PriceBadge, SteamCup } from "../kit.jsx";

/** Weekend brunch — soft morning palette, the only one using SteamCup. */
export default function WeekendBrunch({ f, limits, palette }) {
  const p = palette || {};
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || "#FDF0E2"} />
      {/* A low sun. */}
      <circle cx="272" cy="150" r="54" fill={p.accent || "#F28C28"} opacity="0.25" />
      <circle cx="272" cy="150" r="30" fill={p.accent || "#F28C28"} opacity="0.5" />

      <SteamCup x="226" y="76" s={1.1} fill={C.white} accent={C.taupe} />

      {/* A plate with a fried egg, to read unmistakably as brunch. */}
      <circle cx="152" cy="130" r="26" fill={C.white} />
      <circle cx="152" cy="130" r="10" fill={C.gold} />

      <CText x="22" y="38" size={10} weight={800} fill={C.muted} limit={limits.businessName}>
        {f.businessName}
      </CText>

      <CText
        x="22"
        y="70"
        size={21}
        weight={800}
        fill={p.fg || C.ink}
        limit={limits.headline}
        lines={2}
      >
        {f.headline}
      </CText>

      <CText x="22" y="116" size={11} weight={700} fill={C.slate} limit={limits.offer}>
        {f.offer}
      </CText>

      <PriceBadge cx="44" cy="146" r="20" bg={C.white} fg={C.ink} limit={limits.price}>
        {f.price}
      </PriceBadge>

      <CtaPill x="74" y="136" h="20" bg={p.accent || "#F28C28"} fg={C.white} limit={limits.cta}>
        {f.cta}
      </CtaPill>
    </g>
  );
}
