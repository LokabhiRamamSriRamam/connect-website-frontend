import { C, CText, CtaPill } from "../kit.jsx";

/**
 * Buy a few, get one free — drawn as stamps on a card.
 *
 * The stamp count is FIXED at six rather than parsed out of the offer text. A
 * creative that read "buy 9" from a free-text field would be guessing at the
 * visitor's meaning, and would draw the wrong card the moment the wording
 * changed or arrived in Hindi. The number lives in the copy; the card is a
 * picture of a loyalty card, not a readout of it.
 */
const STAMPS = 6;

export default function LoyaltyCard({ f, limits, palette }) {
  const p = palette || {};
  const stamped = STAMPS - 1; // the last one is the free cup, still open
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.mint} />

      <CText
        x="22"
        y="36"
        size={10}
        weight={800}
        fill={p.kicker || C.muted}
        limit={limits.businessName}
      >
        {f.businessName}
      </CText>

      <CText
        x="22"
        y="66"
        size={20}
        weight={800}
        fill={p.fg || C.ink}
        limit={limits.headline}
        lines={1}
      >
        {f.headline}
      </CText>

      {/* The card itself. */}
      <rect
        x="20"
        y="80"
        width="222"
        height="46"
        rx="8"
        fill={C.white}
        stroke={C.ink}
        strokeWidth="2"
      />
      {Array.from({ length: STAMPS }, (_, i) => {
        const cx = 44 + i * 35;
        const filled = i < stamped;
        return (
          <g key={i}>
            <circle
              cx={cx}
              cy="103"
              r="13"
              fill={filled ? p.accent || C.green : C.white}
              stroke={C.ink}
              strokeWidth="1.5"
              strokeDasharray={filled ? "0" : "3 2.5"}
            />
            {/* A tick inside a collected stamp; the open one stays empty. */}
            {filled && (
              <path
                d={`M${cx - 5} 103l3.5 4 6.5-7.5`}
                fill="none"
                stroke={C.white}
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </g>
        );
      })}

      <CText x="22" y="146" size={12} weight={700} fill={C.slate} limit={limits.offer}>
        {f.offer}
      </CText>

      {/*
        The pill sits in the right gutter, not beside the card.
        CtaPill's width grows with its text, so anchoring it at x=248 put a
        14-character CTA past the 320 edge — caught by the limit-length check in
        both languages. Right-ish of the card with room to grow leftward is the
        only place on this layout that fits, since the card itself is 222 wide.
      */}
      <CtaPill x="196" y="150" h="20" bg={p.fg || C.ink} fg={C.white} limit={limits.cta}>
        {f.cta}
      </CtaPill>
    </g>
  );
}
