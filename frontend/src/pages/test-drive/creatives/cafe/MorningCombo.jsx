import { C, CText, CtaPill, PriceBadge, Ribbon, SteamCup } from "../kit.jsx";

/** Coffee + a bake, for the before-work rush. A timed offer, so it gets a ribbon. */
export default function MorningCombo({ f, limits, palette }) {
  const p = palette || {};
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.lavender} />

      {/* A low sun behind the pairing — morning, said with shape not words. */}
      <circle cx="248" cy="124" r="56" fill={p.accent || C.gold} opacity="0.3" />

      {/* The cup, and a croissant beside it: the "combo" is two objects. */}
      <SteamCup x="206" y="96" s="1.05" fill={C.white} accent={C.taupe} />
      <path
        d="M268 128c-10-4-14-14-10-22 3-6 11-8 17-4 4-9 16-11 23-4 6 6 5 16-2 21l-28 9z"
        fill={p.accent || C.gold}
        stroke={C.ink}
        strokeWidth="1.5"
      />

      <Ribbon x="0" y="18" w="104" h="21" bg={p.ribbon || C.violet} limit={limits.offer}>
        {f.offer}
      </Ribbon>

      <CText
        x="22"
        y="62"
        size={10}
        weight={800}
        fill={p.kicker || C.muted}
        limit={limits.businessName}
      >
        {f.businessName}
      </CText>

      <CText
        x="22"
        y="92"
        size={20}
        weight={800}
        fill={p.fg || C.ink}
        limit={limits.headline}
        lines={2}
      >
        {f.headline}
      </CText>

      <PriceBadge cx="44" cy="146" r="20" bg={p.fg || C.ink} fg={C.white} limit={limits.price}>
        {f.price}
      </PriceBadge>

      <CtaPill x="72" y="138" h="19" bg={p.accent || C.gold} fg={C.ink} limit={limits.cta}>
        {f.cta}
      </CtaPill>
    </g>
  );
}
