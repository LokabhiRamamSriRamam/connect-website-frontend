import { C, CText, CtaPill, PriceBadge } from "../kit.jsx";

/**
 * Available units — the sales-office workhorse.
 *
 * The one card in the set that puts a FLOOR PLAN on screen, because that is
 * what a visitor standing in the model flat is comparing the figure against. A
 * schematic plan drawn as four rooms with doors, not a photograph: the plan is
 * a label on the price, not a sell by itself.
 *
 * On a cream (drafting-paper) ground rather than the launch card's indigo —
 * the set runs light-grounded for the informational cards and dark-grounded
 * for the loud ones, as retail does.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function AvailableUnits({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.indigo;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.cream} />

      {/* The floor plan, upper right. Three rooms + a central hallway, with a
          door-swing arc on the main entry so it reads as a plan rather than as
          four coloured rectangles. Walls as a single outer stroke. */}
      <g>
        {/* Outer footprint. */}
        <rect x="194" y="30" width="104" height="68" fill={C.white} stroke={accent} strokeWidth="1.5" />
        {/* Interior walls splitting it into four rooms, with gaps for doorways. */}
        <rect x="194" y="62" width="52" height="1.5" fill={accent} opacity="0.55" />
        <rect x="258" y="62" width="40" height="1.5" fill={accent} opacity="0.55" />
        <rect x="236" y="30" width="1.5" height="20" fill={accent} opacity="0.55" />
        <rect x="236" y="58" width="1.5" height="40" fill={accent} opacity="0.55" />
        <rect x="266" y="30" width="1.5" height="32" fill={accent} opacity="0.55" />
        {/* A tile pattern in the smaller room, so one room reads as bathroom
            and the plan is more than four empty rectangles. */}
        {[0, 1, 2].map((i) =>
          [0, 1, 2].map((j) => (
            <rect
              key={`t${i}${j}`}
              x={271 + i * 8}
              y={35 + j * 8}
              width="6"
              height="6"
              fill={accent}
              opacity="0.12"
            />
          )),
        )}
        {/* A bed, in the top-left room, as a soft rectangle. */}
        <rect x="200" y="36" width="30" height="20" rx="2" fill={accent} opacity="0.25" />
        {/* A sofa in the lower-left room. */}
        <rect x="200" y="70" width="30" height="10" rx="2" fill={accent} opacity="0.3" />
        <rect x="200" y="80" width="30" height="4" rx="1" fill={accent} opacity="0.2" />
        {/* Door-swing arc on the main entry (bottom edge of the top-right room). */}
        <path d="M252 62a10 10 0 0 1 10 10" fill="none" stroke={accent} strokeWidth="1" opacity="0.7" />
      </g>

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
        size={21}
        weight={800}
        fill={p.fg || C.ink}
        limit={limits.headline}
      >
        {f.headline}
      </CText>

      <CText
        x="22"
        y="110"
        size={12}
        weight={700}
        fill={p.kicker || C.muted}
        limit={limits.detail}
      >
        {f.detail}
      </CText>

      <PriceBadge cx="43" cy="146" r="19" bg={accent} fg={C.white} limit={limits.price}>
        {f.price}
      </PriceBadge>

      <CtaPill x="70" y="138" h="17" bg={accent} fg={C.white} limit={limits.cta}>
        {f.cta}
      </CtaPill>
    </g>
  );
}
