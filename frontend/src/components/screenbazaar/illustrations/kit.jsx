/* Shared building blocks for Screen Bazaar illustrations (viewBox 0 0 400 300). */

export const C = {
  violet: "#914BFA",
  indigo: "#1F30A0",
  iris: "#4B3FD0",
  purple: "#793EF5",
  lavender: "#F6F1FF",
  lilac: "#EEE5FF",
  mist: "#E9E8F6",
  cream: "#F8F6F2",
  ivory: "#FFF9F1",
  sand: "#F2EEE7",
  taupe: "#BFB1A6",
  ink: "#191919",
  slate: "#4B5563",
  muted: "#6B7280",
  line: "#E5E7EB",
  green: "#4CAF6E",
  mint: "#F3FFF8",
  gold: "#F5C542",
  blush: "#FEE8EC",
  alert: "#EF4444",
  white: "#FFFFFF",
};

export const FONT = "Manrope, Inter, sans-serif";

export function Svg({ children, label }) {
  return (
    <svg viewBox="0 0 400 300" className="sb-anim w-full h-full" role="img" aria-label={label}>
      {children}
    </svg>
  );
}

export function T({ x, y, size = 11, weight = 700, fill = C.ink, anchor = "start", children, ...rest }) {
  return (
    <text x={x} y={y} fontFamily={FONT} fontSize={size} fontWeight={weight} fill={fill} textAnchor={anchor} {...rest}>
      {children}
    </text>
  );
}

/* A display with a bezel. Children are drawn in the screen's own coordinates (0,0 = top-left of the glass). */
export function Screen({ x, y, w, h, r = 6, stand = false, bezel = C.ink, children }) {
  const pad = Math.max(3, Math.round(Math.min(w, h) * 0.04));
  return (
    <g>
      {stand && (
        <>
          <rect x={x + w / 2 - 4} y={y + h} width="8" height="10" fill={C.slate} />
          <rect x={x + w / 2 - 20} y={y + h + 9} width="40" height="4" rx="2" fill={C.slate} />
        </>
      )}
      <rect x={x} y={y} width={w} height={h} rx={r} fill={bezel} />
      <svg x={x + pad} y={y + pad} width={w - pad * 2} height={h - pad * 2} overflow="hidden">
        <rect width={w - pad * 2} height={h - pad * 2} rx={Math.max(2, r - 3)} fill={C.lavender} />
        {children}
      </svg>
    </g>
  );
}

export function Phone({ x, y, w = 60, h = 110, children }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="12" fill={C.ink} />
      <svg x={x + 5} y={y + 10} width={w - 10} height={h - 20} overflow="hidden">
        <rect width={w - 10} height={h - 20} rx="6" fill={C.white} />
        {children}
      </svg>
      <rect x={x + w / 2 - 9} y={y + 4} width="18" height="3" rx="1.5" fill={C.slate} />
    </g>
  );
}

/* Generic menu/promo content that fills a screen of size w×h. */
export function Promo({ w, h, bg = C.violet, fg = C.white, accent = C.gold, title, sub }) {
  return (
    <g>
      <rect width={w} height={h} fill={bg} />
      <circle cx={w * 0.78} cy={h * 0.55} r={Math.min(w, h) * 0.26} fill={accent} opacity="0.9" />
      {title && (
        <T x={w * 0.08} y={h * 0.38} size={Math.max(7, h * 0.16)} weight={800} fill={fg}>
          {title}
        </T>
      )}
      {sub && (
        <T x={w * 0.08} y={h * 0.6} size={Math.max(5, h * 0.1)} weight={600} fill={fg} opacity="0.85">
          {sub}
        </T>
      )}
      <rect x={w * 0.08} y={h * 0.72} width={w * 0.3} height={Math.max(3, h * 0.1)} rx={2} fill={fg} opacity="0.9" />
    </g>
  );
}

/* Check badge. */
export function Check({ cx, cy, r = 8, fill = C.green }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={fill} />
      <path
        d={`M${cx - r * 0.45} ${cy}l${r * 0.3} ${r * 0.32}l${r * 0.55} -${r * 0.62}`}
        fill="none"
        stroke={C.white}
        strokeWidth={r * 0.28}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

/* Map pin. */
export function Pin({ x, y, fill = C.violet, className, style }) {
  return (
    <g className={className} style={style}>
      <path d={`M${x} ${y}c-8-10-12-15-12-21a12 12 0 0 1 24 0c0 6-4 11-12 21z`} fill={fill} />
      <circle cx={x} cy={y - 21} r="4.5" fill={C.white} />
    </g>
  );
}
