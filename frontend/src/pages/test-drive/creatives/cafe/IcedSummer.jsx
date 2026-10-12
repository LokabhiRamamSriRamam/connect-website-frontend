import { C, CText, CtaPill, PriceBadge } from "../kit.jsx";

/**
 * Iced and cold brew. The one cool-palette creative in the café set — the rest
 * are warm, so this is what a visitor reaches for when the weather turns.
 */
export default function IcedSummer({ f, limits, palette }) {
  const p = palette || {};
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.iris} />
      {/* Condensation halo. */}
      <circle cx="252" cy="92" r="60" fill={C.white} opacity="0.12" />

      {/* A tall glass, tapering, with ice and a straw. */}
      <path d="M232 52h44l-6 86h-32z" fill={C.white} opacity="0.28" />
      <path d="M232 52h44l-6 86h-32z" fill="none" stroke={C.white} strokeWidth="2" />
      {/* Cold brew fills the lower two thirds. */}
      <path d="M235 78h38l-4 58h-30z" fill={p.accent || C.taupe} opacity="0.85" />
      {/* Ice cubes. */}
      <rect x="240" y="84" width="13" height="13" rx="2.5" fill={C.white} opacity="0.75" transform="rotate(-12 246 90)" />
      <rect x="256" y="98" width="12" height="12" rx="2.5" fill={C.white} opacity="0.65" transform="rotate(18 262 104)" />
      {/* Straw. */}
      <path d="M266 44l-12 94" stroke={C.alert} strokeWidth="4" strokeLinecap="round" />
      {/* The glass sits on a surface. */}
      <ellipse cx="254" cy="140" rx="24" ry="5" fill={C.ink} opacity="0.25" />

      <CText
        x="22"
        y="40"
        size={11}
        weight={800}
        /* C.mint, not an aqua: `aqua` belongs to the vt-* navy/teal palette,
           which is a different brand. The sb kit has no such key, so C.aqua
           would be undefined and the text would fall back to black on indigo. */
        fill={p.kicker || C.mint}
        limit={limits.businessName}
      >
        {f.businessName}
      </CText>

      <CText
        x="22"
        y="76"
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
        y="124"
        size={12}
        weight={700}
        fill={p.fg || C.white}
        opacity="0.85"
        limit={limits.offer}
      >
        {f.offer}
      </CText>

      <PriceBadge cx="44" cy="150" r="20" bg={C.white} fg={C.ink} limit={limits.price}>
        {f.price}
      </PriceBadge>

      <CtaPill x="72" y="142" h="19" bg={C.white} fg={p.bg || C.iris} limit={limits.cta}>
        {f.cta}
      </CtaPill>
    </g>
  );
}
