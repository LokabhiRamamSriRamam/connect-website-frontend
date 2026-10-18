import { C, CText } from "../kit.jsx";

/**
 * Check-in & check-out — the hospitality set's INFORMATIONAL creative.
 *
 * Three fields, like the restaurant, café, retail and healthcare hours cards.
 * Every industry library carries one: it is what a screen shows when there is
 * nothing to announce, and it is the entry that proves the field allowlist is
 * per-template rather than global.
 *
 * Here the "hours" are the two times a hotel is asked about more than any
 * other. Drawn as a suitcase — the plan's fourth hospitality motif, and the
 * object that marks both ends of a stay — so the five hours cards in the
 * product stay five different drawings rather than one recoloured.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function CheckoutInfo({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.green;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.mint} />
      <rect x="0" y="0" width="320" height="6" fill={accent} />

      {/* A suitcase, standing, with a handle, two latches and a travel sticker. */}
      <g>
        {/* Handle. */}
        <path
          d="M238 56a14 10 0 0 1 28 0"
          fill="none"
          stroke={C.slate}
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Body. */}
        <rect x="212" y="58" width="80" height="78" rx="9" fill={accent} />
        <rect x="212" y="58" width="80" height="78" rx="9" fill="none" stroke={C.ink} strokeWidth="2" opacity="0.2" />
        {/* The belt across its middle, and the two latches on it. */}
        <rect x="212" y="88" width="80" height="11" fill={C.ink} opacity="0.18" />
        <rect x="228" y="86" width="9" height="15" rx="2" fill={C.gold} />
        <rect x="266" y="86" width="9" height="15" rx="2" fill={C.gold} />
        {/* A sticker, tilted — the one thing that makes it a travelled case. */}
        <g transform="translate(272 118) rotate(-14)">
          <rect x="-13" y="-9" width="26" height="18" rx="3" fill={C.white} opacity="0.85" />
          <rect x="-9" y="-4" width="18" height="2.5" rx="1.25" fill={C.slate} opacity="0.5" />
          <rect x="-9" y="1" width="12" height="2.5" rx="1.25" fill={C.slate} opacity="0.5" />
        </g>
        {/* Feet. */}
        <rect x="220" y="136" width="10" height="6" rx="2" fill={C.slate} opacity="0.55" />
        <rect x="274" y="136" width="10" height="6" rx="2" fill={C.slate} opacity="0.55" />
      </g>

      <CText
        x="24"
        y="46"
        size={11}
        weight={800}
        fill={C.muted}
        limit={limits.businessName}
      >
        {f.businessName}
      </CText>

      <CText
        x="24"
        y="82"
        size={21}
        weight={800}
        fill={p.fg || C.ink}
        limit={limits.headline}
        lines={2}
      >
        {f.headline}
      </CText>

      {/* The two times are the payload, so they are set larger than a
          supporting line would be on an offer creative. */}
      <CText
        x="24"
        y="130"
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
