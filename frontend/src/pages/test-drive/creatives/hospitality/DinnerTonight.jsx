import { C, CText, CtaPill } from "../kit.jsx";

/**
 * Dinner tonight — the restaurant stop on the plan's route.
 *
 * Deliberately NOT the restaurant industry's Today's Special. That card sells a
 * dish to someone still deciding where to eat; this one tells a guest who is
 * already staying here what is on downstairs tonight. Same meal, different job,
 * so: no price, a quieter ground, and a service time rather than an offer.
 *
 * The set's one light card, which it earns by being the one a guest reads in a
 * bright corridor rather than in an evening lobby.
 *
 * Carries the plan's "bell" motif — the dome of a cloche, which is the dining
 * room's version of the reception bell.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function DinnerTonight({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.indigo;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.cream} />
      <rect x="0" y="0" width="320" height="5" fill={accent} />

      {/* A cloche on a plate. */}
      <g>
        {/* Plate. */}
        <ellipse cx="250" cy="130" rx="58" ry="11" fill={C.white} />
        <ellipse cx="250" cy="130" rx="58" ry="11" fill="none" stroke={C.line} strokeWidth="1.5" />
        {/* Dome. */}
        <path d="M198 128a52 42 0 0 1 104 0z" fill={accent} />
        <path d="M198 128a52 42 0 0 1 104 0z" fill={C.white} opacity="0.12" />
        {/* Handle. */}
        <circle cx="250" cy="80" r="6" fill={accent} />
        <rect x="247" y="84" width="6" height="8" rx="3" fill={accent} />
        {/* A highlight along the dome's left shoulder, so it reads as metal. */}
        <path
          d="M214 122a40 32 0 0 1 20-28"
          fill="none"
          stroke={C.white}
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.5"
        />
      </g>

      <CText
        x="24"
        y="40"
        size={11}
        weight={800}
        fill={p.kicker || C.muted}
        limit={limits.businessName}
      >
        {f.businessName}
      </CText>

      <CText
        x="24"
        y="76"
        size={21}
        weight={800}
        fill={p.fg || C.ink}
        limit={limits.headline}
      >
        {f.headline}
      </CText>

      <CText
        x="24"
        y="104"
        size={12.5}
        weight={700}
        fill={C.slate}
        limit={limits.detail}
      >
        {f.detail}
      </CText>

      <CtaPill x="24" y="126" h="20" bg={accent} fg={C.white} limit={limits.cta}>
        {f.cta}
      </CtaPill>
    </g>
  );
}
