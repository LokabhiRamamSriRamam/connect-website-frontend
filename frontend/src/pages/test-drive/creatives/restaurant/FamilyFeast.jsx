import { C, CText, CtaPill, PriceBadge, Ribbon } from "../kit.jsx";

/** Family feast — warm, with a row of plates suggesting a shared table. */
export default function FamilyFeast({ f, limits, palette }) {
  const p = palette || {};
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || "#7A2E12"} />
      <rect y="0" width="320" height="56" fill={C.ink} opacity="0.18" />

      {/* Four place settings along the bottom. */}
      {[70, 130, 190, 250].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="146" r="17" fill={C.ivory} />
          <circle cx={cx} cy="146" r="9" fill={p.accent || C.gold} />
        </g>
      ))}

      <Ribbon x="0" y="16" w="112" h="22" bg={p.accent || C.gold} fg={C.ink} limit={limits.offer}>
        {f.offer}
      </Ribbon>

      <CText x="22" y="64" size={10} weight={800} fill={C.ivory} opacity="0.8" limit={limits.businessName}>
        {f.businessName}
      </CText>

      <CText
        x="22"
        y="92"
        size={22}
        weight={800}
        fill={p.fg || C.white}
        limit={limits.headline}
        lines={2}
      >
        {f.headline}
      </CText>

      <PriceBadge cx="272" cy="64" r="26" bg={p.accent || C.gold} fg={C.ink} limit={limits.price}>
        {f.price}
      </PriceBadge>

      <CtaPill x="22" y="150" h="20" bg={C.ivory} fg={C.ink} limit={limits.cta}>
        {f.cta}
      </CtaPill>
    </g>
  );
}
