import { C, CText, CtaPill, PriceBadge } from "../kit.jsx";

/**
 * Membership drive — the one loud card in the set.
 *
 * The DUMBBELL the plan names, drawn at full size behind the type, so the
 * card reads as "lift" before the words resolve. Indigo + gold, the warmer
 * end of the set's palette — because joining IS the moment the gym gets a
 * new paying member, and the card has to feel like an opportunity rather
 * than an announcement.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function MembershipDrive({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.gold;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.indigo} />

      {/* The dumbbell, right side. Two large discs with a bar through them;
          the bar is a plain rect, the discs are circles, the handle sits
          between them. Rendered large: the drawing is the hero. */}
      <g>
        {/* Bar through the discs. */}
        <rect x="206" y="94" width="88" height="8" rx="2" fill={accent} opacity="0.9" />
        {/* Left disc stack. */}
        <rect x="212" y="76" width="10" height="44" rx="2" fill={accent} />
        <rect x="224" y="82" width="6" height="32" rx="1" fill={accent} opacity="0.85" />
        {/* Right disc stack, mirrored. */}
        <rect x="278" y="76" width="10" height="44" rx="2" fill={accent} />
        <rect x="270" y="82" width="6" height="32" rx="1" fill={accent} opacity="0.85" />
        {/* Collar rings. */}
        <circle cx="236" cy="98" r="2.5" fill={C.ink} opacity="0.4" />
        <circle cx="264" cy="98" r="2.5" fill={C.ink} opacity="0.4" />
      </g>

      <CText
        x="22"
        y="40"
        size={11}
        weight={800}
        fill={p.kicker || C.mist}
        limit={limits.businessName}
      >
        {f.businessName}
      </CText>

      <CText
        x="22"
        y="78"
        size={23}
        weight={800}
        fill={p.fg || C.white}
        limit={limits.headline}
      >
        {f.headline}
      </CText>

      <CText
        x="22"
        y="108"
        size={12}
        weight={700}
        fill={p.kicker || C.mist}
        limit={limits.detail}
      >
        {f.detail}
      </CText>

      <PriceBadge cx="43" cy="146" r="19" bg={accent} fg={C.ink} limit={limits.price}>
        {f.price}
      </PriceBadge>

      <CtaPill x="70" y="138" h="17" bg={C.white} fg={C.ink} limit={limits.cta}>
        {f.cta}
      </CtaPill>
    </g>
  );
}
