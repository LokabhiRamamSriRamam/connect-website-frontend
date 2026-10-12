import { C, CText } from "../kit.jsx";

/**
 * Opening hours — an INFORMATIONAL creative, not an offer.
 *
 * The only one in the set with no price and no call to action: its manifest
 * declares three fields rather than five. That is deliberate, and it is what
 * proves the field allowlist is per-template rather than global — the editor
 * renders three inputs here and five everywhere else, driven by the manifest.
 */
export default function OpeningHours({ f, limits, palette }) {
  const p = palette || {};
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.ink} />
      <rect x="0" y="0" width="320" height="6" fill={p.accent || C.violet} />

      {/* A clock face. */}
      <circle cx="258" cy="92" r="42" fill="none" stroke={p.accent || C.violet} strokeWidth="3" />
      <circle cx="258" cy="92" r="3.5" fill={p.accent || C.violet} />
      <path
        d="M258 92V66M258 92l18 12"
        stroke={p.accent || C.violet}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {[0, 90, 180, 270].map((deg) => (
        <rect
          key={deg}
          x="256.5"
          y="54"
          width="3"
          height="8"
          rx="1.5"
          fill={p.accent || C.violet}
          transform={`rotate(${deg} 258 92)`}
        />
      ))}

      <CText x="24" y="44" size={10} weight={800} fill={C.taupe} limit={limits.businessName}>
        {f.businessName}
      </CText>

      <CText
        x="24"
        y="80"
        size={22}
        weight={800}
        fill={p.fg || C.white}
        limit={limits.headline}
        lines={2}
      >
        {f.headline}
      </CText>

      {/* The hours line is the payload here, so it is set larger than an offer
          line would be on an offer creative. */}
      <CText
        x="24"
        y="134"
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
