import { C, CText, SteamCup } from "../kit.jsx";

/**
 * Café hours — INFORMATIONAL, not an offer.
 *
 * Declares three fields rather than five, like the restaurant set's OpeningHours.
 * Two templates of a different shape across the two industries is what keeps the
 * field allowlist honestly per-template: the editor renders what the manifest
 * declares, and CreativeFrame allowlists against the same list, with no
 * special-casing anywhere.
 */
export default function CafeHours({ f, limits, palette }) {
  const p = palette || {};
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.sand} />
      <rect x="0" y="0" width="320" height="6" fill={p.accent || C.violet} />

      {/* A cup instead of the restaurant card's clock — same job, café's voice. */}
      <circle cx="254" cy="98" r="48" fill={C.white} opacity="0.6" />
      <SteamCup x="232" y="86" s="1.25" fill={C.white} accent={p.accent || C.violet} />

      <CText x="24" y="46" size={10} weight={800} fill={C.muted} limit={limits.businessName}>
        {f.businessName}
      </CText>

      <CText
        x="24"
        y="82"
        size={22}
        weight={800}
        fill={p.fg || C.ink}
        limit={limits.headline}
        lines={2}
      >
        {f.headline}
      </CText>

      {/* The hours line is the payload, so it is set larger than an offer line
          would be on an offer creative. */}
      <CText
        x="24"
        y="136"
        size={15}
        weight={700}
        fill={p.accent || C.violet}
        limit={limits.hours}
        lines={2}
      >
        {f.hours}
      </CText>
    </g>
  );
}
