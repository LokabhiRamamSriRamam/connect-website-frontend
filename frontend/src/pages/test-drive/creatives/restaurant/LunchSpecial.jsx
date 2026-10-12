import { C, CText, CtaPill, PriceBadge, Ribbon } from "../kit.jsx";

/**
 * Lunch special — a light, cream layout, deliberately unlike ThaliCombo's dark
 * one so two creatives on adjacent screens are obviously different content and
 * not a rendering glitch.
 */
export default function LunchSpecial({ f, limits, palette }) {
  const p = palette || {};
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.ivory} />
      {/* A band of colour anchoring the lower third. */}
      <rect y="132" width="320" height="48" fill={p.accent || C.violet} />

      <circle cx="268" cy="66" r="46" fill={p.accent || C.violet} opacity="0.14" />
      {/* A simple bowl with steam. */}
      <path d="M232 66h72a36 36 0 0 1-72 0z" fill={p.accent || C.violet} />
      <ellipse cx="268" cy="66" rx="36" ry="5" fill={C.ink} opacity="0.12" />
      <path
        d="M256 50c-4-6 4-8 0-14M268 50c-4-6 4-8 0-14M280 50c-4-6 4-8 0-14"
        fill="none"
        stroke={p.accent || C.violet}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.6"
      />

      <Ribbon x="0" y="18" w="104" h="22" bg={p.ribbon || C.alert} limit={limits.offer}>
        {f.offer}
      </Ribbon>

      <CText x="22" y="70" size={10} weight={800} fill={C.muted} limit={limits.businessName}>
        {f.businessName}
      </CText>

      <CText
        x="22"
        y="98"
        size={21}
        weight={800}
        fill={p.fg || C.ink}
        limit={limits.headline}
        lines={2}
      >
        {f.headline}
      </CText>

      <PriceBadge cx="46" cy="156" r="19" bg={C.white} fg={C.ink} limit={limits.price}>
        {f.price}
      </PriceBadge>

      <CtaPill x="76" y="146" h="20" bg={C.white} fg={p.accent || C.violet} limit={limits.cta}>
        {f.cta}
      </CtaPill>
    </g>
  );
}
