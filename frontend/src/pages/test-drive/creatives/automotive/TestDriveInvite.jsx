import { C, CText, CtaPill } from "../kit.jsx";

/**
 * Test drive invite — the on-floor conversion card.
 *
 * The plan's KEY FOB motif, drawn as a modern fob with a bar of buttons and
 * a short metal shank. Dark showroom ground so it sits in the same family
 * as the new-model hero.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function TestDriveInvite({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.gold;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.ink} />

      {/* Key fob, right side. Rounded black body with three circular
          buttons and a thin metal shank sticking out. */}
      <g transform="translate(258 90)">
        {/* Fob body. */}
        <rect x="-26" y="-28" width="52" height="52" rx="10" fill="#2A2A2A" stroke={accent} strokeWidth="1.5" />
        {/* Three buttons. */}
        <circle cx="0" cy="-14" r="5" fill={accent} opacity="0.85" />
        <circle cx="-10" cy="4" r="5" fill={accent} opacity="0.85" />
        <circle cx="10" cy="4" r="5" fill={accent} opacity="0.85" />
        {/* Brand strip at the bottom. */}
        <rect x="-20" y="16" width="40" height="4" rx="1" fill={accent} opacity="0.5" />
        {/* Metal shank sticking down. */}
        <rect x="-2" y="24" width="4" height="22" rx="1" fill="#BFB1A6" />
        <rect x="-6" y="42" width="12" height="6" rx="1" fill="#BFB1A6" />
      </g>

      {/* A soft signal arc coming off the fob — three concentric arcs. */}
      <g transform="translate(258 72)">
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M${-30 - i * 8} 0 A${30 + i * 8} ${30 + i * 8} 0 0 1 ${30 + i * 8} 0`}
            fill="none"
            stroke={accent}
            strokeWidth="1.5"
            opacity={0.4 - i * 0.1}
          />
        ))}
      </g>

      <CText x="22" y="40" size={11} weight={800} fill={p.kicker || C.taupe} limit={limits.businessName}>
        {f.businessName}
      </CText>

      <CText x="22" y="78" size={20} weight={800} fill={p.fg || C.white} limit={limits.headline} lines={2}>
        {f.headline}
      </CText>

      <CText x="22" y="124" size={12} weight={700} fill={p.kicker || C.taupe} limit={limits.detail}>
        {f.detail}
      </CText>

      <CtaPill x="22" y="146" h="20" bg={accent} fg={C.ink} limit={limits.cta}>
        {f.cta}
      </CtaPill>
    </g>
  );
}
