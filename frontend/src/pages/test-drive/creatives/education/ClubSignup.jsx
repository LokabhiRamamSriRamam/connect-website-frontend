import { C, CText, CtaPill } from "../kit.jsx";

/**
 * Club sign-up — the open-invite card.
 *
 * The plan's BOOK motif, drawn here differently from SeminarNotice's open
 * book: this one is a stack of three books lying flat, side-on, in the
 * educator's green-mint ground. The CTA sits on a mint pill and names the
 * action — "Sign up at reception" — because the point of the card is the
 * route, not the information.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function ClubSignup({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.green;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.mint} />

      {/* Stack of three books, right side. Each is a flat rectangle with a
          thin page-stripe at the front. Stacked at slight offsets. */}
      <g>
        {/* Bottom book — widest. */}
        <rect x="214" y="118" width="90" height="14" rx="1.5" fill="#4B3FD0" />
        <rect x="214" y="118" width="90" height="3" fill={C.white} opacity="0.4" />
        {/* Middle book. */}
        <rect x="222" y="100" width="78" height="14" rx="1.5" fill={accent} />
        <rect x="222" y="100" width="78" height="3" fill={C.white} opacity="0.4" />
        {/* Top book. */}
        <rect x="230" y="82" width="66" height="14" rx="1.5" fill="#F5C542" />
        <rect x="230" y="82" width="66" height="3" fill={C.ink} opacity="0.25" />
        {/* Spine marks: little horizontal rules on each book's spine. */}
        {[88, 106, 124].map((y, i) => (
          <rect key={i} x={222 - i * 8 + 10} y={y} width="10" height="1" fill={C.white} opacity="0.6" />
        ))}
      </g>

      <CText x="22" y="40" size={11} weight={800} fill={C.slate} limit={limits.businessName}>
        {f.businessName}
      </CText>

      <CText x="22" y="78" size={22} weight={800} fill={p.fg || C.ink} limit={limits.headline}>
        {f.headline}
      </CText>

      <CText x="22" y="110" size={12} weight={700} fill={p.kicker || C.slate} limit={limits.detail}>
        {f.detail}
      </CText>

      <CtaPill x="22" y="140" h="20" bg={accent} fg={C.white} limit={limits.cta}>
        {f.cta}
      </CtaPill>
    </g>
  );
}
