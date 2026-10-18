import { C, CText } from "../kit.jsx";

/**
 * Now serving — the queue display, and the only creative in the product whose
 * payload is a large number that is not money.
 *
 * Declares its own `token` field rather than borrowing `price`. The editor
 * labels every input from i18n (library.fields.<name>), so the field name IS the
 * instruction the visitor reads above the box; "Price" above a box where someone
 * types "A-24" is a worse bug than it looks.
 *
 * Drawn as a lit panel on deep indigo, which is what these displays actually
 * look like, and which gives the healthcare set its one dark-but-not-black
 * ground.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function TokenQueue({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.gold;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.indigo} />

      {/* Faint scanline band across the whole card, so the indigo reads as an
          illuminated display rather than a flat fill. */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <rect key={i} x="0" y={14 + i * 19} width="320" height="1" fill={C.white} opacity="0.05" />
      ))}

      <CText
        x="24"
        y="42"
        size={11}
        weight={800}
        fill={p.kicker || C.mist}
        limit={limits.businessName}
      >
        {f.businessName}
      </CText>

      <CText
        x="24"
        y="76"
        size={22}
        weight={800}
        fill={p.fg || C.white}
        limit={limits.headline}
      >
        {f.headline}
      </CText>

      <CText
        x="24"
        y="118"
        size={11.5}
        weight={700}
        fill={p.kicker || C.mist}
        limit={limits.detail}
        lines={2}
      >
        {f.detail}
      </CText>

      {/* The token itself, on its own panel at the right. Centred on the panel's
          midpoint so a two-character token and a five-character one both sit
          true rather than drifting left. */}
      <rect x="204" y="44" width="96" height="92" rx="10" fill={C.white} opacity="0.1" />
      <rect
        x="204"
        y="44"
        width="96"
        height="92"
        rx="10"
        fill="none"
        stroke={accent}
        strokeWidth="2"
        opacity="0.6"
      />
      {/* 28px, not 34: at six characters — the manifest's cap — a 34px token
          spans wider than its own 96-unit panel and reaches back across the
          headline. 28 keeps the worst case inside the panel, and a token is
          almost always three or four characters, where it still dominates the
          card as it should. */}
      <CText
        x="252"
        y="102"
        size={28}
        weight={800}
        fill={accent}
        anchor="middle"
        limit={limits.token}
      >
        {f.token}
      </CText>
    </g>
  );
}
