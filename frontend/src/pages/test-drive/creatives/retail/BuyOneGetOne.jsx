import { C, CText, CtaPill, PriceBadge } from "../kit.jsx";

/**
 * Buy one get one — the plan's "bag" motif, drawn as two: the one you pay for and
 * the one you do not.
 *
 * The second bag is deliberately the accent colour and carries the free badge, so
 * the mechanic is legible as a picture before any of the text is read. That is
 * the point of a window screen seen for two seconds from a pavement.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */

/** A shopping bag. Decorative; no visitor text passes through here. */
function Bag({ x, y, s = 1, fill, handle = C.ink }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path
        d="M-9 -14a9 11 0 0 1 18 0"
        fill="none"
        stroke={handle}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M-20 -14h40l4 48a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4z" fill={fill} />
      {/* A fold line across the front, so the bag reads as paper and not a box. */}
      <path d="M-21 2h42" stroke={C.ink} strokeWidth="1.5" opacity="0.18" />
    </g>
  );
}

export default function BuyOneGetOne({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.green;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.ivory} />

      {/* A halo behind the pair, warming the cream ground where they sit. */}
      <circle cx="238" cy="96" r="66" fill={accent} opacity="0.14" />

      {/* Floor shadows, so the bags stand rather than float. */}
      <ellipse cx="212" cy="148" rx="26" ry="6" fill={C.taupe} opacity="0.4" />
      <ellipse cx="266" cy="150" rx="28" ry="6" fill={C.taupe} opacity="0.4" />

      <Bag x="212" y="96" s="0.74" fill={C.taupe} />
      <Bag x="266" y="94" s="0.84" fill={accent} />

      <CText
        x="22"
        y="38"
        size={11}
        weight={800}
        fill={p.kicker || C.muted}
        limit={limits.businessName}
      >
        {f.businessName}
      </CText>

      <CText
        x="22"
        y="78"
        size={23}
        weight={800}
        fill={p.fg || C.ink}
        limit={limits.headline}
      >
        {f.headline}
      </CText>

      <CText
        x="22"
        y="102"
        size={12}
        weight={700}
        fill={C.slate}
        limit={limits.offer}
      >
        {f.offer}
      </CText>

      {/* The badge sits on the second bag — the free one — rather than beside the
          headline, which is what ties the word to the picture. */}
      <PriceBadge cx="286" cy="78" r="22" bg={C.gold} limit={limits.price}>
        {f.price}
      </PriceBadge>

      <CtaPill x="22" y="128" h="21" bg={p.fg || C.ink} fg={C.white} limit={limits.cta}>
        {f.cta}
      </CtaPill>
    </g>
  );
}
