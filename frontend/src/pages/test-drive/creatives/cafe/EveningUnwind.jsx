import { C, CText, CtaPill, PriceBadge, SteamCup } from "../kit.jsx";

/**
 * The last hours of the day. Dark ground, so this is the café set's counterpart
 * to the restaurant's Happy Hours — a screen that reads calmly in a dim room
 * rather than glaring.
 */
export default function EveningUnwind({ f, limits, palette }) {
  const p = palette || {};
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.ink} />

      {/* A hanging pendant lamp, pooling light over the cup. */}
      <path d="M252 0v26" stroke={C.taupe} strokeWidth="2" />
      <path d="M232 26h40l-8 16h-24z" fill={p.accent || C.gold} />
      {/* The light itself, as a soft cone. */}
      <path d="M240 42h24l26 76h-76z" fill={p.accent || C.gold} opacity="0.16" />

      <SteamCup x="236" y="104" s="1.1" fill={C.white} accent={C.taupe} />

      <CText
        x="22"
        y="40"
        size={11}
        weight={800}
        fill={p.kicker || C.gold}
        limit={limits.businessName}
      >
        {f.businessName}
      </CText>

      <CText
        x="22"
        y="78"
        size={22}
        weight={800}
        fill={p.fg || C.white}
        limit={limits.headline}
        lines={2}
      >
        {f.headline}
      </CText>

      <CText
        x="22"
        y="126"
        size={12}
        weight={700}
        fill={p.fg || C.white}
        opacity="0.8"
        limit={limits.offer}
      >
        {f.offer}
      </CText>

      <PriceBadge cx="44" cy="152" r="20" bg={p.accent || C.gold} limit={limits.price}>
        {f.price}
      </PriceBadge>

      <CtaPill x="72" y="144" h="19" bg={C.white} fg={p.bg || C.ink} limit={limits.cta}>
        {f.cta}
      </CtaPill>
    </g>
  );
}
