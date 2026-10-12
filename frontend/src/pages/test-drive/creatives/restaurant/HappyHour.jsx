import { C, CText, CtaPill, PriceBadge } from "../kit.jsx";

/** Happy hour — dark, evening-toned, with glasses. */
export default function HappyHour({ f, limits, palette }) {
  const p = palette || {};
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || "#2B1055"} />
      <circle cx="270" cy="40" r="62" fill={p.accent || C.violet} opacity="0.22" />

      {/* Two cocktail glasses. */}
      <g stroke={p.accent || C.violet} strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M232 62l20 24v30M212 62h40M242 116h20" />
        <path d="M268 62l20 24v30M268 62h40M278 116h20" />
      </g>
      <path d="M214 63h36l-18 21z" fill={p.accent || C.violet} opacity="0.75" />
      <path d="M270 63h36l-18 21z" fill={C.gold} opacity="0.75" />

      <CText x="22" y="38" size={10} weight={800} fill={C.gold} limit={limits.businessName}>
        {f.businessName}
      </CText>

      <CText
        x="22"
        y="72"
        size={23}
        weight={800}
        fill={p.fg || C.white}
        limit={limits.headline}
        lines={2}
      >
        {f.headline}
      </CText>

      <CText x="22" y="122" size={11} weight={700} fill={C.white} opacity="0.8" limit={limits.offer}>
        {f.offer}
      </CText>

      <PriceBadge cx="46" cy="150" r="20" bg={C.gold} fg={C.ink} limit={limits.price}>
        {f.price}
      </PriceBadge>

      <CtaPill x="76" y="140" h="20" bg={p.accent || C.violet} fg={C.white} limit={limits.cta}>
        {f.cta}
      </CtaPill>
    </g>
  );
}
