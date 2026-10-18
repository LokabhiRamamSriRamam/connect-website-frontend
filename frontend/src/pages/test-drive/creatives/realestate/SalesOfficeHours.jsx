import { C, CText } from "../kit.jsx";

/**
 * Sales-office hours — the real-estate set's INFORMATIONAL creative.
 *
 * Three fields, the same shape as the five hours cards already in the product.
 * Each library carries one: it is what a screen shows when there is nothing to
 * announce.
 *
 * Drawn as a HOUSE KEY on a key tag, distinct from the five hours cards
 * already shipped (clock, shopfront, day bar, suitcase, cup). The key fits the
 * industry's own object vocabulary — the sales office hands one over at the
 * end of the funnel — and the tag string carries the "KEYS" wordmark as a
 * drawn path, so the drawing's own text never widens with Hindi.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function SalesOfficeHours({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.indigo;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.mist} />
      <rect x="0" y="0" width="320" height="6" fill={accent} />

      {/* A key, laid at a slight tilt. Bow (the oval loop), shoulder, bit (the
          teeth), all drawn against a soft shadow line. */}
      <g transform="translate(252 100) rotate(14)">
        {/* Shadow line under the key. */}
        <rect x="-56" y="12" width="100" height="2" rx="1" fill={C.ink} opacity="0.1" />
        {/* The bow. */}
        <circle cx="-40" cy="0" r="20" fill={accent} />
        <circle cx="-40" cy="0" r="11" fill={p.bg || C.mist} />
        {/* The shaft. */}
        <rect x="-22" y="-4" width="60" height="8" rx="2" fill={accent} />
        {/* The teeth. */}
        <rect x="24" y="4" width="4" height="8" fill={accent} />
        <rect x="32" y="4" width="4" height="12" fill={accent} />
        <rect x="40" y="4" width="4" height="8" fill={accent} />
      </g>

      {/* The paper key-tag at the shaft's left, with a short loop of twine. */}
      <g>
        <rect x="196" y="130" width="38" height="22" rx="3" fill={C.white} opacity="0.95" />
        <rect x="196" y="130" width="38" height="22" rx="3" fill="none" stroke={accent} strokeWidth="1" opacity="0.5" />
        {/* A small eyelet in the tag. */}
        <circle cx="202" cy="141" r="2" fill={accent} opacity="0.55" />
        {/* The twine. */}
        <path
          d="M202 141q-10-6-14 0"
          fill="none"
          stroke={accent}
          strokeWidth="1.5"
          opacity="0.5"
        />
        {/* "KEYS" baked onto the tag as a drawn path, so the drawing's own
            wordmark never widens with Hindi. Centered around (215, 148). */}
        <g fill={accent}>
          {/* K */}
          <path d="M205 144h2v3l3-3h3l-4 4 4 5h-3l-3-3v3h-2z" />
          {/* E */}
          <path d="M214 144h5v1.5h-3.5v1.5h3v1.5h-3v1.5h3.5v1.5h-5z" />
          {/* Y */}
          <path d="M220 144h2l1.5 2.5 1.5-2.5h2l-2.5 4v4h-2v-4z" />
          {/* S */}
          <path d="M228 145.5c0-1 .8-1.5 2-1.5h2v1.5h-2v1l1.5 .5c1 .3 1.5 .8 1.5 1.5s-.8 1.5-2 1.5h-2v-1.5h2v-1l-1.5-.5c-1-.3-1.5-.8-1.5-1.5z" />
        </g>
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
        y="86"
        size={23}
        weight={800}
        fill={p.fg || C.ink}
        limit={limits.headline}
        lines={2}
      >
        {f.headline}
      </CText>

      <CText
        x="24"
        y="140"
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
