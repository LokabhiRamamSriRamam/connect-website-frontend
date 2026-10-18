import { C, CText, CtaPill } from "../kit.jsx";

/**
 * Clearance — a rack of swing tags, where PriceDrop hangs a single one.
 *
 * The discount goes on the front tag rather than in a disc, because "UP TO 70%"
 * is the longest `price` value in the retail manifest and a tag grows sideways
 * where a circle cannot. Three overlapping tags say "rack" in a way one cannot.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */

/**
 * A swing tag, point to the left. Decorative; text is drawn over it, not in it.
 *
 * `w` and `h` are declared as NUMBER props at every call site, not JSX string
 * attributes, because the path does arithmetic on them. That is the same hazard
 * kit.jsx's n() guards against for the shared primitives: h="54" would make
 * h / 2 evaluate to 27 but w - h / 2 silently misbehave on a string, and the
 * result is valid SVG that draws the wrong shape.
 */
function Tag({ x, y, rot = 0, w = 96, h = 54, fill, opacity = 1 }) {
  const half = h / 2;
  const body = w - half;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={opacity}>
      <path
        d={`M0 0l${half} -${half}h${body}a6 6 0 0 1 6 6v${h - 12}a6 6 0 0 1-6 6h-${body}z`}
        fill={fill}
      />
      <circle cx={half + 8} cy="0" r="5" fill={C.white} opacity="0.9" />
    </g>
  );
}

export default function ClearanceRack({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.alert;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.sand} />

      {/* The rail the tags hang from. */}
      <rect x="150" y="28" width="160" height="3" rx="1.5" fill={C.taupe} />

      {/* Two tags behind, pale and tilted, then the live one square on top. */}
      <Tag x="178" y="78" rot={-14} w={86} h={46} fill={C.taupe} opacity="0.55" />
      <Tag x="190" y="118" rot={10} w={80} h={42} fill={C.muted} opacity="0.35" />
      <Tag x="172" y="96" rot={-3} w={134} h={52} fill={accent} />

      {/* Strings from the rail to the two visible tag eyelets. */}
      <path d="M196 31c0 14 -4 28 -10 40" fill="none" stroke={C.muted} strokeWidth="1.5" />
      <path d="M204 31c-2 22 -2 44 -2 62" fill="none" stroke={C.muted} strokeWidth="1.5" />

      {/* The discount, set on the front tag. */}
      <CText x="252" y="102" size={17} weight={800} fill={C.white} anchor="middle" limit={limits.price}>
        {f.price}
      </CText>

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
        y="82"
        size={25}
        weight={800}
        fill={p.fg || C.ink}
        limit={limits.headline}
      >
        {f.headline}
      </CText>

      <CText
        x="22"
        y="108"
        size={12}
        weight={700}
        fill={C.slate}
        limit={limits.offer}
      >
        {f.offer}
      </CText>

      <CtaPill x="22" y="130" h="20" bg={accent} fg={C.white} limit={limits.cta}>
        {f.cta}
      </CtaPill>
    </g>
  );
}
