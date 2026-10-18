import { C, CText, CtaPill } from "../kit.jsx";

/**
 * Fest announcement — the campus festival card.
 *
 * The ATOM motif the plan names, drawn as a nucleus with three elliptical
 * orbits behind the headline. Iris violet ground, so the card reads as
 * event-energy rather than quiet notice. The cta carries an "Open to all"
 * line because the invitation is the point of the card.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function FestAnnouncement({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.gold;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.iris} />

      {/* Atom, right side. Nucleus + three ellipses at 60-degree rotations. */}
      <g transform="translate(260 90)">
        <ellipse cx="0" cy="0" rx="46" ry="18" fill="none" stroke={accent} strokeWidth="2" opacity="0.6" />
        <ellipse cx="0" cy="0" rx="46" ry="18" fill="none" stroke={accent} strokeWidth="2" opacity="0.6" transform="rotate(60)" />
        <ellipse cx="0" cy="0" rx="46" ry="18" fill="none" stroke={accent} strokeWidth="2" opacity="0.6" transform="rotate(120)" />
        <circle cx="0" cy="0" r="7" fill={accent} />
        {/* Three electrons on the orbits, visually distinct from the nucleus. */}
        <circle cx="46" cy="0" r="3" fill={C.white} />
        <circle cx="-23" cy="-32" r="3" fill={C.white} opacity="0.9" />
        <circle cx="-23" cy="32" r="3" fill={C.white} opacity="0.9" />
      </g>

      <CText x="22" y="40" size={11} weight={800} fill={p.kicker || C.lilac} limit={limits.businessName}>
        {f.businessName}
      </CText>

      <CText x="22" y="80" size={23} weight={800} fill={p.fg || C.white} limit={limits.headline}>
        {f.headline}
      </CText>

      <CText x="22" y="114" size={12} weight={700} fill={p.kicker || C.lilac} limit={limits.detail}>
        {f.detail}
      </CText>

      <CtaPill x="22" y="140" h="20" bg={accent} fg={C.ink} limit={limits.cta}>
        {f.cta}
      </CtaPill>
    </g>
  );
}
