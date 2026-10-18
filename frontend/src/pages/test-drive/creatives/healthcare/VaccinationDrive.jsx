import { C, CText, CtaPill } from "../kit.jsx";

/**
 * Vaccination drive — the plan's "pill" motif reinterpreted as a syringe, which
 * is the honest picture for a flu shot.
 *
 * No price: a walk-in drive is an announcement, and the clinic's reception
 * handles what it costs. Four fields.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function VaccinationDrive({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.indigo;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.mist} />

      {/* A shield behind the syringe: vaccination as protection, which is the
          one idea this card has to land in two seconds. */}
      <path
        d="M248 36l46 14v34c0 28-20 46-46 54-26-8-46-26-46-54V50z"
        fill={accent}
        opacity="0.14"
      />

      {/* Syringe, angled, pointing down-left toward the text. */}
      <g transform="translate(248 96) rotate(-38)">
        {/* Barrel. */}
        <rect x="-34" y="-9" width="58" height="18" rx="3" fill={C.white} />
        <rect x="-34" y="-9" width="58" height="18" rx="3" fill="none" stroke={accent} strokeWidth="2.5" />
        {/* Fluid inside. */}
        <rect x="-31" y="-6" width="34" height="12" rx="2" fill={accent} opacity="0.55" />
        {/* Graduation marks. */}
        <rect x="-18" y="-9" width="2" height="6" fill={accent} opacity="0.7" />
        <rect x="-6" y="-9" width="2" height="6" fill={accent} opacity="0.7" />
        <rect x="6" y="-9" width="2" height="6" fill={accent} opacity="0.7" />
        {/* Plunger behind, needle and hub in front. */}
        <rect x="-48" y="-5" width="14" height="10" rx="2" fill={accent} />
        <rect x="-54" y="-10" width="6" height="20" rx="2" fill={accent} />
        <rect x="24" y="-5" width="10" height="10" rx="2" fill={accent} />
        <rect x="34" y="-1.5" width="26" height="3" rx="1.5" fill={accent} />
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
        lines={2}
      >
        {f.headline}
      </CText>

      <CText
        x="24"
        y="120"
        size={12.5}
        weight={700}
        fill={C.slate}
        limit={limits.detail}
      >
        {f.detail}
      </CText>

      <CtaPill x="24" y="136" h="20" bg={accent} fg={C.white} limit={limits.cta}>
        {f.cta}
      </CtaPill>
    </g>
  );
}
