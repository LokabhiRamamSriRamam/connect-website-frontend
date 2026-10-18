import { C, CText } from "../kit.jsx";

/**
 * Event today — the terrace and banquet screen, and the card a hotel re-points
 * at something different every single day: a sangeet tonight, a conference
 * tomorrow, live music on Friday.
 *
 * Because it is re-edited daily, it is the set's clearest argument for the
 * product: changing it means typing a name, not reprinting a standee.
 *
 * Four fields and no call to action — the people who need this card are already
 * in the building and already invited.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */

/**
 * String-light positions along the top: x, and how far each bulb hangs.
 *
 * Literal rather than generated. A creative must render identically on every
 * screen in a chain, and the slight irregularity that makes a string of lights
 * look strung rather than printed has to be the SAME irregularity each time.
 */
const BULBS = [
  [26, 15], [58, 21], [90, 17], [122, 23], [154, 16],
  [186, 22], [218, 18], [250, 23], [282, 16], [310, 20],
];

export default function EventToday({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.gold;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.purple} />

      {/* The slack cable the bulbs hang from. */}
      <path
        d="M0 10q80 18 160 10t160 6"
        fill="none"
        stroke={C.white}
        strokeWidth="1.5"
        opacity="0.45"
      />
      {BULBS.map(([x, drop], i) => (
        <g key={i}>
          <rect x={x - 0.75} y={drop - 7} width="1.5" height="7" fill={C.white} opacity="0.4" />
          <circle cx={x} cy={drop + 3} r="3.6" fill={accent} opacity={i % 2 ? 0.75 : 1} />
          <circle cx={x} cy={drop + 3} r="7" fill={accent} opacity="0.18" />
        </g>
      ))}

      <CText
        x="24"
        y="56"
        size={11}
        weight={800}
        fill={p.kicker || C.lilac}
        limit={limits.businessName}
      >
        {f.businessName}
      </CText>

      {/* Two lines at 23px put the second baseline at 122, so the detail below
          sits at 136 rather than 128 — a wrapped headline overlapped it on the
          first pass. The kicker moves up to 56 to buy that room. */}
      <CText
        x="24"
        y="92"
        size={23}
        weight={800}
        fill={p.fg || C.white}
        limit={limits.headline}
        lines={2}
      >
        {f.headline}
      </CText>

      <CText
        x="24"
        y="134"
        size={12}
        weight={700}
        fill={p.kicker || C.lilac}
        limit={limits.detail}
      >
        {f.detail}
      </CText>

      {/* The start time on a gold plate — the one thing a guest crossing the
          lobby needs to catch at a glance.

          The plate is narrow and sits at the card's foot, clear of the detail
          line's baseline at 134. Five text elements in 180 units is the most
          crowded card in the product, so every band here is accounted for:
          56 kicker, 92-122 headline, 134 detail, 146-168 plate. */}
      <rect x="18" y="146" width="118" height="24" rx="12" fill={accent} />
      <CText x="29" y="162" size={12.5} weight={800} fill={C.ink} limit={limits.hours}>
        {f.hours}
      </CText>
    </g>
  );
}
