import { C, CText } from "../kit.jsx";

/**
 * Store hours — the retail set's INFORMATIONAL creative, not an offer.
 *
 * Three fields rather than five, like the restaurant and café hours cards. Every
 * industry library carries one: it is what a screen shows when there is nothing
 * to sell, and it is the entry that proves the field allowlist is per-template
 * rather than global.
 *
 * Drawn as a shopfront with an OPEN sign rather than the clock the other two use,
 * so the three hours cards in the product do not read as one card recoloured.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function StoreHours({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.indigo;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.mist} />
      <rect x="0" y="0" width="320" height="6" fill={accent} />

      {/* Shopfront: awning, window, door. */}
      <g>
        {/* Awning, drawn as five scallops. */}
        <path d="M206 44h98v22H206z" fill={accent} />
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            d={`M${206 + i * 19.6} 66a9.8 9.8 0 0 0 19.6 0z`}
            fill={i % 2 ? C.white : accent}
          />
        ))}
        {/* Window and door. */}
        <rect x="212" y="82" width="54" height="54" rx="3" fill={C.white} />
        <rect x="272" y="82" width="26" height="54" rx="3" fill={C.white} opacity="0.75" />
        <circle cx="277" cy="110" r="2.5" fill={C.muted} />
        {/* The OPEN sign in the window — a decorative plate, never visitor text:
            what the shop is actually open for is the hours line on the left. */}
        <rect x="222" y="96" width="34" height="16" rx="3" fill={C.green} />
        <rect x="226" y="102" width="26" height="3" rx="1.5" fill={C.white} opacity="0.85" />
        {/* Pavement. */}
        <rect x="200" y="136" width="110" height="2.5" fill={C.taupe} opacity="0.6" />
      </g>

      <CText
        x="24"
        y="46"
        size={10.5}
        weight={800}
        fill={C.muted}
        limit={limits.businessName}
      >
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
        y="132"
        size={14}
        weight={700}
        fill={accent}
        limit={limits.hours}
        lines={2}
      >
        {f.hours}
      </CText>
    </g>
  );
}
