import { C, CText } from "../kit.jsx";

/**
 * Site visit — the weekend pick-up board.
 *
 * Drawn as a project-site HOARDING sign on two wooden posts, which is the
 * object a sales office uses for exactly this message. No cta: the headline IS
 * the ask (come on Sunday), and the hours line answers "when".
 *
 * The posts and the sign's drop-shadow make this the only card in the set with
 * a declared sense of ground, so it reads as outdoors signage against the
 * other cards' indoor surfaces.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function SiteVisit({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.iris;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.sand} />

      {/* A faint ground line, so the posts have something to stand in. */}
      <rect x="0" y="162" width="320" height="18" fill={C.ink} opacity="0.06" />

      {/* The two posts the sign stands on. Drawn first so the plate sits on
          top with no seam. */}
      <rect x="94" y="118" width="6" height="46" fill={C.muted} />
      <rect x="220" y="118" width="6" height="46" fill={C.muted} />

      {/* The sign plate, with a thin top-edge bevel so it reads as a board and
          not a flat rectangle. The whole plate's content lives inside it —
          the text goes on top at CText below. */}
      <rect x="60" y="38" width="200" height="86" rx="3" fill={accent} />
      <rect x="60" y="38" width="200" height="3" fill={C.white} opacity="0.4" />
      {/* Four fixing bolts at the plate's corners. */}
      {[[72, 50], [248, 50], [72, 112], [248, 112]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="2.5" fill={C.white} opacity="0.5" />
      ))}

      {/* The business name floats above the plate — it is the sign's owner,
          not the sign's message. */}
      <CText
        x="60"
        y="28"
        size={11}
        weight={800}
        fill={p.kicker || C.muted}
        limit={limits.businessName}
      >
        {f.businessName}
      </CText>

      {/* The headline is reversed out of the plate. One line, at a size that
          clears the plate's left and right margins at Hindi width. */}
      <CText
        x="76"
        y="72"
        size={19}
        weight={800}
        fill={C.white}
        limit={limits.headline}
      >
        {f.headline}
      </CText>

      <CText
        x="76"
        y="94"
        size={12}
        weight={700}
        fill={C.white}
        opacity="0.9"
        limit={limits.detail}
      >
        {f.detail}
      </CText>

      {/* The timing is the operational line — put it on a small chip, bottom
          left of the plate, so the eye finds it after the headline. */}
      <rect x="72" y="104" width="140" height="16" rx="8" fill={C.white} opacity="0.95" />
      <CText x="82" y="115" size={11} weight={800} fill={accent} limit={limits.hours}>
        {f.hours}
      </CText>
    </g>
  );
}
