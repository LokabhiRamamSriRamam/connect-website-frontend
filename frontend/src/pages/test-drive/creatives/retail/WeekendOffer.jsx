import { C, CText, CtaPill, PriceBadge, Ribbon } from "../kit.jsx";

/**
 * Weekend special — the set's one deep-indigo card, for the window after dark.
 *
 * Carries the ribbon, as the restaurant set's Lunch Special does: a timed window
 * ("Sat & Sun") is the kind of short, fixed claim a ribbon is shaped for, which
 * is why this creative's `offer` limit is the tightest in the retail manifest.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function WeekendOffer({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.gold;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.indigo} />

      {/* A lit shop window on the right: the plan's retail scene, reduced to the
          one element that survives at tile size. */}
      <rect x="206" y="30" width="96" height="118" rx="4" fill={C.white} opacity="0.1" />
      <rect x="216" y="42" width="76" height="62" rx="3" fill={accent} opacity="0.85" />
      <rect x="216" y="112" width="52" height="7" rx="3.5" fill={C.white} opacity="0.5" />
      <rect x="216" y="124" width="34" height="7" rx="3.5" fill={C.white} opacity="0.3" />
      {/* Pavement line under the window. */}
      <rect x="196" y="152" width="116" height="2" fill={C.white} opacity="0.2" />

      <CText
        x="22"
        y="38"
        size={11}
        weight={800}
        fill={p.kicker || C.mist}
        limit={limits.businessName}
      >
        {f.businessName}
      </CText>

      <CText
        x="22"
        y="76"
        size={23}
        weight={800}
        fill={p.fg || C.white}
        limit={limits.headline}
        lines={2}
      >
        {f.headline}
      </CText>

      <Ribbon
        x="22"
        y="100"
        w="88"
        h="21"
        bg={p.ribbon || C.alert}
        fg={C.white}
        limit={limits.offer}
      >
        {f.offer}
      </Ribbon>

      <PriceBadge cx="44" cy="150" r="21" bg={accent} limit={limits.price}>
        {f.price}
      </PriceBadge>

      <CtaPill x="74" y="141" h="19" bg={C.white} fg={C.ink} limit={limits.cta}>
        {f.cta}
      </CtaPill>
    </g>
  );
}
