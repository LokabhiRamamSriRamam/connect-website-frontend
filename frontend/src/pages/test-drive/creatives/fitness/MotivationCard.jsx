import { C, CText } from "../kit.jsx";

/**
 * Motivation card — the ink-black motivational slab.
 *
 * The BOLT motif the plan names, drawn as a lightning path at the right edge,
 * cutting diagonally through the card. The whole card is the message — no
 * price, no CTA — because this is what plays on the gym floor between
 * programmed slots.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function MotivationCard({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.gold;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.ink} />

      {/* A giant lightning bolt, right side. Drawn as a single path with
          sharp zigs so the shape is unmistakable. Positioned so the body
          text has clear room on the left half. */}
      <g>
        <path
          d="M258 20l-26 56h20l-18 68 42-62h-22l24-62z"
          fill={accent}
        />
        {/* A faint glow behind the bolt. */}
        <circle cx="264" cy="90" r="54" fill={accent} opacity="0.08" />
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

      {/* The headline wraps across two lines so the quote reads as weight.
          The second line gets a thin accent underline below. */}
      <CText
        x="22"
        y="86"
        size={20}
        weight={800}
        fill={p.fg || C.white}
        limit={limits.headline}
        lines={2}
      >
        {f.headline}
      </CText>

      {/* Accent rule between quote and the softer line below. */}
      <rect x="22" y="134" width="48" height="2" rx="1" fill={accent} />

      <CText
        x="22"
        y="156"
        size={11.5}
        weight={700}
        fill={p.kicker || C.taupe}
        limit={limits.detail}
      >
        {f.detail}
      </CText>
    </g>
  );
}
