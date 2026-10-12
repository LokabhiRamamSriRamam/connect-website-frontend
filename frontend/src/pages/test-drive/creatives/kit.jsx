/**
 * Primitives for signage creatives. SEPARATE TREE from components/art/ on purpose.
 *
 * Everything here renders visitor-supplied text. Nothing in components/art/ ever
 * does. Keeping them in different directories with different registries is what
 * makes "which code touches customer input" answerable by looking at the import
 * path, rather than by auditing every file.
 *
 * The one rule: text reaches the DOM only as a JSX text child of <text>. React
 * escapes those and CANNOT coerce them into markup. There is no .replace(), no
 * dangerouslySetInnerHTML, no string concatenation into an attribute, and no raw
 * SVG parsing anywhere in this tree. A token system
 * (svg.replace("{{headline}}", userText)) would hand you SVG/XML escaping to
 * hand-roll forever, where one missed context is an XSS. Here there is no spot
 * to miss.
 *
 * Creatives do NOT render their own <svg> wrapper — CreativeFrame owns it, so all
 * three preview sizes go through one audited path.
 */
import { C, FONT } from "../../../components/screenbazaar/illustrations/kit.jsx";
import { clamp, wrapLines } from "./text.js";

export { C, FONT, clamp, wrapLines };

/**
 * Coerce a geometry prop to a number.
 *
 * JSX attribute syntax makes y="74" a STRING, and these primitives do arithmetic
 * on their coordinates (y + i * lineHeight, cy + size * 0.35). Without this,
 * "74" + 25.3 silently concatenates to "7425.3" and pushes the text thousands of
 * units off-canvas — valid SVG that renders blank, which is the worst kind of
 * bug. Caught by the safety probe's rendered output on the first run.
 *
 * Coercing here rather than fixing each call site makes it a guarantee instead of
 * a convention every future creative has to remember.
 */
const n = (value, fallback = 0) => {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
};

/**
 * Clamped text for creatives. The ONLY way visitor text is drawn.
 *
 * `children` is passed as a JSX text child — never an attribute, never innerHTML.
 * Returns null for empty input, so an unfilled field leaves a clean gap rather
 * than a stray baseline or the word "undefined".
 */
export function CText({
  x,
  y,
  size = 12,
  weight = 700,
  fill = C.ink,
  anchor = "start",
  limit = 40,
  lines = 1,
  lineHeight = 1.15,
  children,
  ...rest
}) {
  if (lines > 1) {
    const rows = wrapLines(children, Math.ceil(limit / lines), lines);
    if (!rows.length) return null;
    return (
      <g>
        {rows.map((row, i) => (
          <text
            key={i}
            x={x}
            y={n(y) + i * n(size) * n(lineHeight, 1.15)}
            fontFamily={FONT}
            fontSize={size}
            fontWeight={weight}
            fill={fill}
            textAnchor={anchor}
            {...rest}
          >
            {row}
          </text>
        ))}
      </g>
    );
  }

  const text = clamp(children, limit);
  if (!text) return null;
  return (
    <text
      x={x}
      y={y}
      fontFamily={FONT}
      fontSize={size}
      fontWeight={weight}
      fill={fill}
      textAnchor={anchor}
      {...rest}
    >
      {text}
    </text>
  );
}

/**
 * A price on a disc. Width tracks the text length so "₹99" and "₹1,299" both sit
 * centred with even padding instead of one rattling around a fixed pill.
 */
export function PriceBadge({ cx, cy, r = 26, bg = C.gold, fg = C.ink, limit = 8, children }) {
  const text = clamp(children, limit);
  if (!text) return null;
  const rad = n(r, 26);
  const size = text.length > 6 ? rad * 0.42 : text.length > 4 ? rad * 0.52 : rad * 0.62;
  return (
    <g>
      <circle cx={cx} cy={cy} r={rad} fill={bg} />
      <circle cx={cx} cy={cy} r={rad} fill="none" stroke={C.ink} strokeWidth="2" />
      <text
        x={cx}
        y={n(cy) + size * 0.35}
        fontFamily={FONT}
        fontSize={size}
        fontWeight="800"
        fill={fg}
        textAnchor="middle"
      >
        {text}
      </text>
    </g>
  );
}

/** A call-to-action pill. Sized from the text, for the same reason as PriceBadge. */
export function CtaPill({ x, y, h = 20, bg = C.ink, fg = C.white, limit = 22, children }) {
  const text = clamp(children, limit);
  if (!text) return null;
  const ht = n(h, 20);
  const size = ht * 0.5;
  const w = Math.max(ht * 1.8, text.length * size * 0.62 + ht * 0.9);
  return (
    <g>
      <rect x={x} y={y} width={w} height={ht} rx={ht / 2} fill={bg} />
      <text
        x={n(x) + w / 2}
        y={n(y) + ht * 0.68}
        fontFamily={FONT}
        fontSize={size}
        fontWeight="800"
        fill={fg}
        textAnchor="middle"
      >
        {text}
      </text>
    </g>
  );
}

/** A corner ribbon for an offer. Text is clamped short — the shape is fixed. */
export function Ribbon({ x, y, w = 92, h = 22, bg = C.alert, fg = C.white, limit = 16, children }) {
  const text = clamp(children, limit);
  if (!text) return null;
  const px = n(x);
  const py = n(y);
  const ht = n(h, 22);
  return (
    <g>
      <path
        d={`M${px} ${py}h${n(w, 92)}l-${ht * 0.5} ${ht / 2}l${ht * 0.5} ${ht / 2}H${px}z`}
        fill={bg}
      />
      <text
        x={px + 8}
        y={py + ht * 0.7}
        fontFamily={FONT}
        fontSize={ht * 0.5}
        fontWeight="800"
        fill={fg}
      >
        {text}
      </text>
    </g>
  );
}

/** A steaming cup. Decorative; the animation class is guarded in sb.css. */
export function SteamCup({ x, y, s = 1, fill = C.white, accent = C.taupe }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 0h34a2 2 0 0 1 2 2v12a16 16 0 0 1-32 0V2a2 2 0 0 1 2-2z" fill={fill} />
      <path d="M36 4h5a6 6 0 0 1 0 12h-5" fill="none" stroke={fill} strokeWidth="3" />
      <ellipse cx="18" cy="2" rx="18" ry="3" fill={accent} opacity="0.5" />
      <path
        d="M12 -8c-3-4 3-6 0-10M22 -8c-3-4 3-6 0-10"
        fill="none"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.75"
      />
    </g>
  );
}

/** A plate seen from above — the base of most food creatives. */
export function Plate({ cx, cy, r = 34, rim = C.white, food = C.gold }) {
  const rad = n(r, 34);
  return (
    <g>
      <circle cx={cx} cy={cy} r={rad} fill={rim} />
      <circle cx={cx} cy={cy} r={rad * 0.78} fill="none" stroke={C.line} strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r={rad * 0.52} fill={food} />
    </g>
  );
}

/** Soft decorative blob, for background interest behind text. */
export function Blob({ cx, cy, r, fill, opacity = 0.9 }) {
  return <circle cx={cx} cy={cy} r={r} fill={fill} opacity={opacity} />;
}
