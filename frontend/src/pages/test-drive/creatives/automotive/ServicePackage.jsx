import { C, CText, CtaPill, PriceBadge } from "../kit.jsx";

/**
 * Service package — the service lounge's priced bundle.
 *
 * The plan's SPANNER motif, drawn as a crossed spanner-and-screwdriver pair
 * on indigo. The two tools cross behind the headline, so the drawing says
 * "service bay" before the words resolve.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function ServicePackage({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.gold;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.indigo} />

      {/* Crossed tools, right side. Spanner body + jaw head + screwdriver
          body + flat tip. Rotated so they cross each other. */}
      <g transform="translate(258 90)">
        {/* Spanner, rotated -30. */}
        <g transform="rotate(-30)">
          <rect x="-32" y="-3" width="46" height="6" rx="2" fill={accent} />
          <path d="M14 -6 h8 l4 4 l-4 4 h-8 z M14 -6 a9 9 0 0 1 0 12z" fill={accent} />
          <circle cx="18" cy="0" r="4" fill={p.bg || C.indigo} />
        </g>
        {/* Screwdriver, rotated 30. */}
        <g transform="rotate(30)">
          <rect x="-32" y="-2.5" width="34" height="5" rx="1" fill={accent} opacity="0.85" />
          <rect x="-10" y="-3.5" width="4" height="7" fill={C.ink} opacity="0.5" />
          <rect x="2" y="-1" width="20" height="2" fill={accent} />
          <path d="M22 -1 l6 1 l-6 1 z" fill={accent} />
        </g>
      </g>

      <CText x="22" y="40" size={11} weight={800} fill={p.kicker || C.mist} limit={limits.businessName}>
        {f.businessName}
      </CText>

      <CText x="22" y="78" size={22} weight={800} fill={p.fg || C.white} limit={limits.headline}>
        {f.headline}
      </CText>

      <CText x="22" y="110" size={12} weight={700} fill={p.kicker || C.mist} limit={limits.detail}>
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
