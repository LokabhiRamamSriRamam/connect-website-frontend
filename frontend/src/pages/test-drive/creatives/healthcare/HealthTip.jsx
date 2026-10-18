import { C, CText, CtaPill } from "../kit.jsx";

/**
 * Tip of the day — the plan's "heartbeat" motif, and the creative the waiting-room
 * playlist is really built around: something worth reading on the fourth time you
 * see it.
 *
 * Set on white rather than mint. In a library where five cards are tinted, the
 * advisory one earns the clean ground: it is the card with the most text and the
 * least decoration, and it should read like a page, not a poster.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function HealthTip({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.green;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.white} />

      {/* A soft mint field behind the text block, bounded well clear of the
          trace below it. Painted BEFORE the trace: these are stacked in document
          order, and drawing the field second would hide the line entirely. */}
      <rect x="0" y="0" width="320" height="130" fill={C.mint} />

      {/* The ECG trace across the foot of the card: flat line, one QRS spike,
          flat again. Drawn rather than repeated, because a real trace is mostly
          baseline and that is what makes the spike read. */}
      <path
        d="M0 158h86l7-13 6 29 8-44 7 28h10l5-9h181"
        fill="none"
        stroke={accent}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />

      <CText
        x="24"
        y="36"
        size={11}
        weight={800}
        fill={p.kicker || C.muted}
        limit={limits.businessName}
      >
        {f.businessName}
      </CText>

      {/* A heart, small, at the top right — the kicker's visual partner rather
          than the card's hero. The trace is the hero. */}
      <path
        d="M286 30c0-6 9-10 13-3 4-7 13-3 13 3 0 8-13 15-13 15s-13-7-13-15z"
        fill={accent}
      />

      <CText
        x="24"
        y="66"
        size={20}
        weight={800}
        fill={p.fg || C.ink}
        limit={limits.headline}
      >
        {f.headline}
      </CText>

      <CText
        x="24"
        y="92"
        size={13}
        weight={700}
        fill={C.slate}
        limit={limits.detail}
        lines={2}
      >
        {f.detail}
      </CText>

      {/* The detail runs to two lines ending near y=110, and the mint field ends
          at 130, so the pill sits in the gap between them. Below the field it
          would land on the ECG trace and read as a fault in the line. */}
      <CtaPill x="24" y="112" h="18" bg={accent} fg={C.white} limit={limits.cta}>
        {f.cta}
      </CtaPill>
    </g>
  );
}
