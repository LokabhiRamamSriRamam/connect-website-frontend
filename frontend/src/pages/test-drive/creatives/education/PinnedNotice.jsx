import { C, CText, CtaPill } from "../kit.jsx";

/**
 * Pinned notice — the cork board card.
 *
 * The plan's CORK + PIN motif, drawn as a tilted paper note pinned to a
 * cork-textured ground. The whole card IS the pinned sheet; the business
 * name sits above the pin, the headline and detail sit on the sheet.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function PinnedNotice({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.indigo;
  return (
    <g>
      {/* Cork ground: a sand base with a scatter of darker specks for texture.
          Specks are fixed-position rects so every chain renders identically. */}
      <rect width="320" height="180" fill={p.bg || C.ivory} />
      {[
        [30, 24], [70, 50], [112, 20], [160, 48], [210, 24],
        [260, 46], [296, 28], [40, 96], [96, 118], [172, 132],
        [240, 108], [284, 136], [60, 152], [128, 160], [220, 158],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={1.5} fill="#C9A24A" opacity="0.35" />
      ))}

      {/* The pinned sheet. Tilted a touch so it reads as paper on cork rather
          than as another background rect. */}
      <g transform="translate(32 36) rotate(-2)">
        <rect x="0" y="0" width="260" height="118" rx="2" fill={C.white} stroke={accent} strokeWidth="0.5" opacity="0.95" />
        {/* Corner shadow — a small path under the top edge. */}
        <path d="M0 0h260v2H0z" fill={C.ink} opacity="0.08" />
      </g>

      {/* The push-pin at the top centre of the sheet. */}
      <g>
        <circle cx="162" cy="38" r="6" fill="#EF4444" />
        <circle cx="160.5" cy="36.5" r="2" fill={C.white} opacity="0.7" />
        <rect x="161" y="42" width="2" height="4" fill={C.ink} opacity="0.5" />
      </g>

      <CText x="48" y="76" size={11} weight={800} fill={C.muted} limit={limits.businessName}>
        {f.businessName}
      </CText>

      <CText x="48" y="100" size={20} weight={800} fill={p.fg || C.ink} limit={limits.headline}>
        {f.headline}
      </CText>

      <CText x="48" y="128" size={12} weight={700} fill={C.slate} limit={limits.detail}>
        {f.detail}
      </CText>

      <CtaPill x="48" y="146" h="16" bg={accent} fg={C.white} limit={limits.cta}>
        {f.cta}
      </CtaPill>
    </g>
  );
}
