import { C, CText, CtaPill, PriceBadge } from "../kit.jsx";

/** New on the menu — clean and bright, with a "new" burst. */
export default function NewOnMenu({ f, limits, palette }) {
  const p = palette || {};
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.white} />
      <rect x="0" y="0" width="12" height="180" fill={p.accent || C.green} />

      {/* A starburst behind the price, drawn as a rotated square pair. */}
      <g transform="translate(262 56)">
        <rect x="-26" y="-26" width="52" height="52" rx="6" fill={p.accent || C.green} opacity="0.2" />
        <rect
          x="-26"
          y="-26"
          width="52"
          height="52"
          rx="6"
          fill={p.accent || C.green}
          opacity="0.2"
          transform="rotate(45)"
        />
      </g>

      {/* A fork and knife, minimal. */}
      <g stroke={p.accent || C.green} strokeWidth="2.5" strokeLinecap="round" fill="none">
        <path d="M250 112v42M244 112v12a6 6 0 0 0 12 0v-12" />
        <path d="M278 112v42M278 112c8 4 8 18 0 22" />
      </g>

      <CText x="30" y="40" size={10} weight={800} fill={C.muted} limit={limits.businessName}>
        {f.businessName}
      </CText>

      <CText
        x="30"
        y="76"
        size={22}
        weight={800}
        fill={p.fg || C.ink}
        limit={limits.headline}
        lines={2}
      >
        {f.headline}
      </CText>

      <CText x="30" y="126" size={11} weight={700} fill={C.slate} limit={limits.offer}>
        {f.offer}
      </CText>

      <PriceBadge cx="262" cy="56" r="22" bg={p.accent || C.green} fg={C.white} limit={limits.price}>
        {f.price}
      </PriceBadge>

      <CtaPill x="30" y="142" h="20" bg={p.fg || C.ink} fg={C.white} limit={limits.cta}>
        {f.cta}
      </CtaPill>
    </g>
  );
}
