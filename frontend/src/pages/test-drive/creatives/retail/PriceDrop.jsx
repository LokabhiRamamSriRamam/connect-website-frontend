import { C, CText, CtaPill } from "../kit.jsx";

/**
 * Price drop — the plan's "price tag" motif, hanging from a string.
 *
 * The one creative in the set drawn on white: a price claim reads as factual
 * where a coloured ground reads as promotional, and this card is making a
 * specific, checkable statement rather than a mood.
 *
 * The old price in `offer` is struck through with a drawn line rather than a text
 * decoration. textDecoration on SVG <text> is inconsistently honoured across
 * renderers, and the strike has to be reliable — it is the whole argument of the
 * creative. The line is sized from the clamped character count, so it tracks the
 * text it crosses out in both languages.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function PriceDrop({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.alert;

  /**
   * Width of the strike, derived the same way CText clamps: take the visible
   * characters, not the raw field. An over-long paste would otherwise draw a rule
   * far past the text that survived the clamp.
   */
  const oldPrice = String(f.offer || "").slice(0, limits.offer);
  const strikeW = oldPrice.length * 6.2;

  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.white} />
      <rect x="0" y="0" width="320" height="5" fill={accent} />

      {/* The tag, hung from a short string off the top edge. Rotated as one
          group so the hole, the body and the string stay registered. */}
      <g transform="translate(246 96) rotate(-12)">
        <path d="M12 -6l-56 0a10 10 0 0 0-10 10v44a10 10 0 0 0 10 10h56z" fill={accent} />
        <path d="M12 -6l34 32-34 32z" fill={accent} />
        {/* Eyelet. */}
        <circle cx="-30" cy="26" r="7" fill={C.white} />
        <circle cx="-30" cy="26" r="7" fill="none" stroke={C.ink} strokeWidth="1.5" opacity="0.25" />
      </g>
      <path
        d="M214 44c6 10 10 22 10 34"
        fill="none"
        stroke={C.muted}
        strokeWidth="2"
        strokeLinecap="round"
      />

      <CText
        x="22"
        y="40"
        size={11}
        weight={800}
        fill={p.kicker || C.muted}
        limit={limits.businessName}
      >
        {f.businessName}
      </CText>

      <CText
        x="22"
        y="76"
        size={24}
        weight={800}
        fill={p.fg || C.ink}
        limit={limits.headline}
      >
        {f.headline}
      </CText>

      {/* Old price, struck. Muted so the new price below wins the comparison. */}
      <CText x="22" y="102" size={13} weight={700} fill={C.muted} limit={limits.offer}>
        {f.offer}
      </CText>
      {oldPrice ? (
        <rect x="21" y="97.5" width={strikeW} height="2" rx="1" fill={C.muted} />
      ) : null}

      {/* The new price is the largest type on the card — larger than the
          headline, because it is the message. Baseline 132, so its descender
          clears the pill that starts at 142. */}
      <CText x="22" y="132" size={28} weight={800} fill={accent} limit={limits.price}>
        {f.price}
      </CText>

      <CtaPill x="22" y="142" h="18" bg={C.ink} fg={C.white} limit={limits.cta}>
        {f.cta}
      </CtaPill>
    </g>
  );
}
