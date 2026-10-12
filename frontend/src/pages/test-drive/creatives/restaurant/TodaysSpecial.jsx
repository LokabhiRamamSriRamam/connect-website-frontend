import { C, CText, CtaPill, PriceBadge, Plate } from "../kit.jsx";

/**
 * Today's special — a centred, symmetrical layout, the only one in the set that
 * centres its text. Variety here is functional: on a wall of five screens the
 * visitor needs to tell at a glance which creative is on which screen.
 */
export default function TodaysSpecial({ f, limits, palette }) {
  const p = palette || {};
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.lavender} />
      {/* A framed border, inset — reads as a chalkboard menu card. */}
      <rect
        x="10"
        y="10"
        width="300"
        height="160"
        rx="8"
        fill="none"
        stroke={p.accent || C.indigo}
        strokeWidth="2.5"
      />

      <CText
        x="160"
        y="40"
        size={10}
        weight={800}
        fill={C.muted}
        anchor="middle"
        limit={limits.businessName}
      >
        {f.businessName}
      </CText>

      <CText
        x="160"
        y="70"
        size={21}
        weight={800}
        fill={p.fg || C.ink}
        anchor="middle"
        limit={limits.headline}
        lines={2}
      >
        {f.headline}
      </CText>

      <Plate cx="160" cy="118" r="22" rim={C.white} food={p.accent || C.indigo} />

      <CText
        x="160"
        y="156"
        size={11}
        weight={700}
        fill={C.slate}
        anchor="middle"
        limit={limits.offer}
      >
        {f.offer}
      </CText>

      <PriceBadge cx="52" cy="120" r="21" bg={C.gold} fg={C.ink} limit={limits.price}>
        {f.price}
      </PriceBadge>

      <CtaPill x="210" y="110" h="20" bg={p.accent || C.indigo} fg={C.white} limit={limits.cta}>
        {f.cta}
      </CtaPill>
    </g>
  );
}
