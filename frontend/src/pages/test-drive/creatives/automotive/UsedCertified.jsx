import { C, CText, CtaPill, PriceBadge } from "../kit.jsx";

/**
 * Used certified — the lounge comparison card.
 *
 * The plan's NUMBER PLATE motif, drawn as a UK/Indian-style white plate
 * with embossed caps-and-digits — but the "plate" here spells CERTIFIED
 * as drawn paths, because the plate's text is the industry's own and
 * never changes under Hindi. On a cream (service-lounge) ground.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function UsedCertified({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.indigo;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.cream} />

      {/* The number plate, right side. White ground, dark border, embossed
          letters as paths. */}
      <g transform="translate(200 36)">
        <rect x="0" y="0" width="104" height="34" rx="4" fill={C.white} stroke={C.ink} strokeWidth="1.5" />
        {/* Two bolt circles. */}
        <circle cx="8" cy="4" r="1.5" fill={C.ink} />
        <circle cx="96" cy="4" r="1.5" fill={C.ink} />
        {/* "CERTIFIED" drawn as flat glyphs. 9 letters at 10 units each,
            x=8..98. */}
        <g fill={C.ink} transform="translate(10 10)">
          {/* C */}
          <path d="M6 2c0-1 1-2 2-2h4v2h-4v10h4v2h-4c-1 0-2-1-2-2z" />
          {/* E */}
          <path d="M14 0h6v2h-4v3h3v2h-3v3h4v2h-6z" />
          {/* R */}
          <path d="M22 0h4c1 0 2 1 2 2v3c0 1-0.5 2-1.5 2l2 5h-2l-2-5h-0.5v5h-2zm2 2v3h2v-3z" />
          {/* T */}
          <path d="M30 0h6v2h-2v12h-2v-12h-2z" />
          {/* I */}
          <path d="M37 0h2v14h-2z" />
          {/* F */}
          <path d="M41 0h6v2h-4v3h3v2h-3v7h-2z" />
          {/* I */}
          <path d="M49 0h2v14h-2z" />
          {/* E */}
          <path d="M53 0h6v2h-4v3h3v2h-3v3h4v2h-6z" />
          {/* D */}
          <path d="M61 0h4c1 0 2 1 2 2v10c0 1-1 2-2 2h-4zm2 2v10h2v-10z" />
        </g>
      </g>

      {/* A small ribbon badge above the plate, orange-check. */}
      <g>
        <path d="M196 20h30l-6 10l6 10h-30z" fill={accent} />
        <path d="M204 32l4 4l8-8" fill="none" stroke={C.white} strokeWidth="2" />
      </g>

      <CText x="22" y="40" size={11} weight={800} fill={p.kicker || C.muted} limit={limits.businessName}>
        {f.businessName}
      </CText>

      <CText x="22" y="80" size={22} weight={800} fill={p.fg || C.ink} limit={limits.headline}>
        {f.headline}
      </CText>

      <CText x="22" y="110" size={12} weight={700} fill={p.kicker || C.muted} limit={limits.detail}>
        {f.detail}
      </CText>

      <PriceBadge cx="43" cy="146" r="19" bg={accent} fg={C.white} limit={limits.price}>
        {f.price}
      </PriceBadge>

      <CtaPill x="70" y="138" h="17" bg={accent} fg={C.white} limit={limits.cta}>
        {f.cta}
      </CtaPill>
    </g>
  );
}
