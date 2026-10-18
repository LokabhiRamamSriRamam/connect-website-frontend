import { C, CText, CtaPill, PriceBadge } from "../kit.jsx";

/**
 * New model launch — the dark-showroom hero.
 *
 * The car on a spot-lit TURNTABLE, drawn as a side-profile silhouette with
 * two wheels and a windscreen rake. A soft gold pool of light from above
 * so the car reads as spot-lit rather than floating on black.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function NewModelLaunch({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.gold;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.ink} />

      {/* Spotlight pool from the top-right. */}
      <circle cx="256" cy="20" r="86" fill={accent} opacity="0.1" />
      {/* Turntable disc — a flat ellipse at the car's base. */}
      <ellipse cx="240" cy="128" rx="68" ry="8" fill={accent} opacity="0.35" />
      <ellipse cx="240" cy="128" rx="52" ry="5" fill={accent} opacity="0.5" />

      {/* The car. Side profile drawn as a single path: bonnet rising to
          windscreen rake, roofline, tapered boot, bumper, and two wheel
          arches cut by circles. */}
      <g>
        <path
          d="M180 120 L188 100 Q196 86 212 86 L252 86 Q264 86 272 100 L288 116 L300 120 L302 128 L182 128 Z"
          fill={accent}
        />
        {/* Windscreen glass — a lighter inset above the beltline. */}
        <path d="M212 92 L222 92 Q238 92 246 100 L252 110 L212 110 Z" fill={C.white} opacity="0.6" />
        {/* Door line. */}
        <rect x="238" y="100" width="1.2" height="20" fill={C.ink} opacity="0.5" />
        {/* Wheel arches / wheels — two black discs with a lighter rim. */}
        <circle cx="202" cy="128" r="10" fill={C.ink} />
        <circle cx="202" cy="128" r="6" fill={accent} opacity="0.9" />
        <circle cx="202" cy="128" r="3" fill={C.ink} />
        <circle cx="276" cy="128" r="10" fill={C.ink} />
        <circle cx="276" cy="128" r="6" fill={accent} opacity="0.9" />
        <circle cx="276" cy="128" r="3" fill={C.ink} />
      </g>

      <CText x="22" y="40" size={11} weight={800} fill={p.kicker || C.taupe} limit={limits.businessName}>
        {f.businessName}
      </CText>

      <CText x="22" y="76" size={22} weight={800} fill={p.fg || C.white} limit={limits.headline}>
        {f.headline}
      </CText>

      <CText x="22" y="108" size={12} weight={700} fill={p.kicker || C.taupe} limit={limits.detail}>
        {f.detail}
      </CText>

      <PriceBadge cx="43" cy="146" r="19" bg={accent} fg={C.ink} limit={limits.price}>
        {f.price}
      </PriceBadge>

      <CtaPill x="70" y="138" h="17" bg={C.white} fg={C.ink} limit={limits.cta}>
        {f.cta}
      </CtaPill>
    </g>
  );
}
