import { C, CText } from "../kit.jsx";

/**
 * Sold — the social-proof card.
 *
 * The one card in the set that uses the SOLD stamp motif the plan names. The
 * stamp is drawn as a tilted ring with the word "SOLD" baked in as a drawn
 * SVG path — not a CText — because the stamp's text is the industry's own and
 * never changes, and because baking it as text would widen the Hindi string
 * past the stamp's own diameter.
 *
 * `stat` carries the headline figure (72%, 48/60). Reserved for a number that
 * is not money: a percentage above a `price` box would read wrong, which is
 * why this field exists at all.
 *
 * Dark-grounded, like the retail members card: a card that claims scarcity has
 * to look expensive.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function SoldAnnouncement({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.alert;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.ink} />

      {/* The stamp — a tilted ring at the right, with a faint diagonal grain
          so it reads as rubber-stamped rather than printed. */}
      <g transform="translate(238 102) rotate(-12)">
        <circle cx="0" cy="0" r="48" fill="none" stroke={accent} strokeWidth="4" />
        <circle cx="0" cy="0" r="38" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.75" />
        {/* Four light scratches across the stamp. */}
        {[-26, -8, 10, 28].map((y, i) => (
          <rect key={i} x="-44" y={y} width="88" height="1.5" fill={C.ink} opacity="0.35" />
        ))}
        {/* The letters S O L D, drawn as paths so they survive the element
            allowlist and the Devanagari rendering of the manifest's text. The
            paths are flat glyph silhouettes at a size tuned to the ring's
            inner diameter. */}
        <g fill={accent}>
          {/* S */}
          <path d="M-28 -8c0-4 3-7 7-7h5v4h-5c-2 0-3 1-3 3s1 3 3 3h3c4 0 7 3 7 7s-3 7-7 7h-7v-4h7c2 0 3-1 3-3s-1-3-3-3h-3c-4 0-7-3-7-7z" />
          {/* O */}
          <path d="M-8 -8c0-4 3-7 7-7h2c4 0 7 3 7 7v6c0 4-3 7-7 7h-2c-4 0-7-3-7-7zm4 0v6c0 2 1 3 3 3h2c2 0 3-1 3-3v-6c0-2-1-3-3-3h-2c-2 0-3 1-3 3z" />
          {/* L */}
          <path d="M12 -15h4v18h8v4h-12z" />
          {/* D */}
          <path d="M26 -15h8c4 0 7 3 7 7v6c0 4-3 7-7 7h-8zm4 4v16h4c2 0 3-1 3-3v-10c0-2-1-3-3-3z" />
        </g>
      </g>

      <CText
        x="22"
        y="40"
        size={11}
        weight={800}
        fill={p.kicker || C.taupe}
        limit={limits.businessName}
      >
        {f.businessName}
      </CText>

      {/* Headline is ONE line here, not two. The first draft wrapped at
          lines=2 and the geometry audit flagged the second line clashing
          with the stat below; dropping to one line and shortening the cap
          (manifest side) solves it without stealing room from the stat. */}
      <CText
        x="22"
        y="74"
        size={20}
        weight={800}
        fill={p.fg || C.white}
        limit={limits.headline}
      >
        {f.headline}
      </CText>

      {/* The stat — the figure that is the point of the card — sits large and
          left-aligned, with the detail stacked below it rather than beside.
          Beside was the first draft and the geometry audit flagged it: at
          max-length the stat ran from x=22 past x=180 at size 32, which left
          no room for the detail at x=98. Stacking both on the left half keeps
          each clear of the stamp at the right. */}
      <CText
        x="22"
        y="124"
        size={28}
        weight={800}
        fill={C.gold}
        limit={limits.stat}
      >
        {f.stat}
      </CText>

      <CText
        x="22"
        y="152"
        size={11}
        weight={700}
        fill={p.kicker || C.taupe}
        limit={limits.detail}
      >
        {f.detail}
      </CText>
    </g>
  );
}
