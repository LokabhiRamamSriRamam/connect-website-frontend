import { C, CText, CtaPill, PriceBadge } from "../kit.jsx";

/**
 * Health camp — the set's dark card, and its community notice.
 *
 * Priced, but the figure is very often the word "FREE", which is why the
 * manifest's cap allows a word as readily as a number. A camp that charges
 * nothing still needs to say so loudly; leaving the field empty would read as an
 * omission rather than as free.
 *
 * Drawn as a tent under a night sky: a camp is the one healthcare event that
 * happens outside the building, and the picture should say so before the text
 * does.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function CampNotice({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.gold;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.ink} />

      {/* Sky: a scatter of fixed stars. Positions are literal, not random — a
          creative must render identically on every screen in a chain, and
          Math.random() in a render would make two screens disagree. */}
      {[
        [212, 28], [240, 44], [268, 22], [292, 52], [226, 62],
        [284, 80], [252, 34], [306, 34],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={i % 3 === 0 ? 1.8 : 1.2} fill={C.white} opacity="0.5" />
      ))}

      {/* Tent, with a cross on its flank. */}
      <g>
        <path d="M256 60l50 76h-100z" fill={accent} />
        {/* Doorway. */}
        <path d="M256 92l16 44h-32z" fill={C.ink} opacity="0.8" />
        {/* Cross above the door. */}
        <rect x="248" y="74" width="16" height="5" rx="2" fill={C.ink} opacity="0.8" />
        <rect x="253.5" y="68.5" width="5" height="16" rx="2" fill={C.ink} opacity="0.8" />
        {/* Ground line. */}
        <rect x="192" y="136" width="128" height="2.5" rx="1.25" fill={C.white} opacity="0.25" />
      </g>

      <CText
        x="24"
        y="42"
        size={11}
        weight={800}
        fill={p.kicker || C.taupe}
        limit={limits.businessName}
      >
        {f.businessName}
      </CText>

      {/* Two lines at 21px put the second baseline at 102, so the detail below
          starts at 124 rather than 112 — a wrapped headline would otherwise sit
          on top of it, which it did on the first pass. */}
      <CText
        x="24"
        y="74"
        size={21}
        weight={800}
        fill={p.fg || C.white}
        limit={limits.headline}
        lines={2}
      >
        {f.headline}
      </CText>

      <CText
        x="24"
        y="124"
        size={12}
        weight={700}
        fill={accent}
        limit={limits.detail}
      >
        {f.detail}
      </CText>

      <PriceBadge cx="43" cy="152" r="18" bg={accent} fg={C.ink} limit={limits.price}>
        {f.price}
      </PriceBadge>

      <CtaPill x="68" y="144" h="17" bg={C.white} fg={C.ink} limit={limits.cta}>
        {f.cta}
      </CtaPill>
    </g>
  );
}
