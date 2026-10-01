/* Shared drawing helpers for blog artwork. Coordinates are plain user space (no fill-box re-basing),
   so transform attributes behave normally; animated parts carry bl-* classes on their own <g>. */
export { C, FONT, T, Screen, Phone, Check, Pin } from "../../../components/screenbazaar/illustrations/kit";
export { Person, Spark, SKIN, HAIR } from "../../signage/art/people";

export function Art({ label, viewBox = "0 0 640 360", children, className = "" }) {
  return (
    <svg viewBox={viewBox} className={`bl-art ${className}`} role="img" aria-label={label}>
      {children}
    </svg>
  );
}

/* Decorative-only svg (inside a card that already has text). */
export function DecoArt({ viewBox = "0 0 640 360", children, className = "" }) {
  return (
    <svg viewBox={viewBox} className={`bl-art ${className}`} aria-hidden="true" focusable="false">
      {children}
    </svg>
  );
}

/* Soft dotted background grid. */
export function Dots({ id, w = 640, h = 360, color = "#191919", opacity = 0.08 }) {
  return (
    <>
      <defs>
        <pattern id={id} width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.4" fill={color} />
        </pattern>
      </defs>
      <rect width={w} height={h} fill={`url(#${id})`} opacity={opacity} />
    </>
  );
}

/* A rounded label chip. */
export function Chip({ x, y, w, h = 22, fill = "#191919", color = "#fff", size = 11, children, anchor = "middle", stroke }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} stroke={stroke} strokeWidth={stroke ? 2 : 0} />
      <text
        x={anchor === "middle" ? x + w / 2 : x + 10}
        y={y + h / 2 + size * 0.36}
        textAnchor={anchor}
        fontFamily="Manrope, Inter, sans-serif"
        fontWeight="800"
        fontSize={size}
        fill={color}
      >
        {children}
      </text>
    </g>
  );
}

/* Wall-mounted display with a black bezel; children draw inside the glass (0,0 = glass top-left). */
export function Display({ x, y, w, h, glass = "#fff", r = 8, children, stand = false, mount = false }) {
  const pad = Math.max(4, Math.round(Math.min(w, h) * 0.045));
  const gw = w - pad * 2;
  const gh = h - pad * 2;
  return (
    <g>
      {mount && <rect x={x + w / 2 - 14} y={y - 8} width="28" height="10" rx="2" fill="#4B5563" />}
      {stand && (
        <>
          <rect x={x + w / 2 - 5} y={y + h} width="10" height="14" fill="#4B5563" />
          <rect x={x + w / 2 - 28} y={y + h + 12} width="56" height="5" rx="2.5" fill="#4B5563" />
        </>
      )}
      <rect x={x} y={y} width={w} height={h} rx={r} fill="#191919" />
      <svg x={x + pad} y={y + pad} width={gw} height={gh} overflow="hidden">
        <rect width={gw} height={gh} rx={Math.max(2, r - 4)} fill={glass} />
        {typeof children === "function" ? children(gw, gh) : children}
      </svg>
    </g>
  );
}

/* Little text helper with sensible defaults. */
export function Tx({ x, y, size = 12, weight = 800, fill = "#191919", anchor = "start", children, ...rest }) {
  return (
    <text x={x} y={y} fontFamily="Manrope, Inter, sans-serif" fontSize={size} fontWeight={weight} fill={fill} textAnchor={anchor} {...rest}>
      {children}
    </text>
  );
}

/* Arrow line with a head. */
export function Arrow({ x1, y1, x2, y2, color = "#191919", width = 2.5, dashed = false, className = "" }) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const hx = x2 - Math.cos(a) * 9;
  const hy = y2 - Math.sin(a) * 9;
  const l = [hx + Math.cos(a + Math.PI / 2) * 5, hy + Math.sin(a + Math.PI / 2) * 5];
  const r = [hx + Math.cos(a - Math.PI / 2) * 5, hy + Math.sin(a - Math.PI / 2) * 5];
  return (
    <g>
      <line x1={x1} y1={y1} x2={hx} y2={hy} stroke={color} strokeWidth={width} strokeLinecap="round" className={dashed ? `bl-dash ${className}` : className} />
      <path d={`M${x2} ${y2}L${l[0]} ${l[1]}L${r[0]} ${r[1]}z`} fill={color} />
    </g>
  );
}

/* A dot that travels along a path (CSS offset-path). */
export function Traveller({ d, r = 5, fill = "#F5C542", dur = 2.4, delay = 0, stroke = "#191919" }) {
  return (
    <circle
      r={r}
      fill={fill}
      stroke={stroke}
      strokeWidth="1.5"
      className="bl-travel"
      style={{ offsetPath: `path("${d}")`, animationDuration: `${dur}s`, animationDelay: `${delay}s` }}
    />
  );
}

/* Wi-Fi symbol; `off` draws it struck through. */
export function Wifi({ x, y, s = 1, color = "#191919", off = false }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-14-4a20 20 0 0 1 28 0" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" opacity={off ? 0.35 : 1} />
      <path d="M-9 1a13 13 0 0 1 18 0" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" opacity={off ? 0.35 : 1} />
      <circle cx="0" cy="7" r="2.6" fill={color} opacity={off ? 0.35 : 1} />
      {off && <line x1="-14" y1="-12" x2="14" y2="12" stroke="#EF4444" strokeWidth="3.5" strokeLinecap="round" />}
    </g>
  );
}

/* Cloud shape centred on (x, y). */
export function Cloud({ x, y, s = 1, fill = "#fff", stroke = "#191919" }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path
        d="M-34 14h66a18 18 0 0 0 0-36 26 26 0 0 0-50-6 20 20 0 0 0-16 42z"
        fill={fill}
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </g>
  );
}

/* Padlock, open or shut. */
export function Lock({ x, y, s = 1, fill = "#F5C542", open = false }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path
        d={open ? "M-6-6v-6a6 6 0 0 1 12 0" : "M-6-4v-6a6 6 0 0 1 12 0v6"}
        fill="none"
        stroke="#191919"
        strokeWidth="2.6"
        strokeLinecap="round"
        transform={open ? "translate(-8 0)" : undefined}
      />
      <rect x="-9" y="-5" width="18" height="15" rx="3" fill={fill} stroke="#191919" strokeWidth="2" />
      <circle cx="0" cy="2" r="2" fill="#191919" />
    </g>
  );
}

/* Analog clock face. */
export function Clock({ x, y, r = 22, fill = "#fff", hour = 0, minute = 0, spin = false }) {
  const ha = (hour % 12) * 30 + minute * 0.5;
  const ma = minute * 6;
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={fill} stroke="#191919" strokeWidth="2.5" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * Math.PI) / 6;
        return <circle key={i} cx={x + Math.sin(a) * r * 0.78} cy={y - Math.cos(a) * r * 0.78} r={r * 0.045} fill="#191919" />;
      })}
      <g transform={`rotate(${ha} ${x} ${y})`}>
        <g className={spin ? "bl-hand-slow" : ""}>
          <line x1={x} y1={y} x2={x} y2={y - r * 0.5} stroke="#191919" strokeWidth="3" strokeLinecap="round" />
        </g>
      </g>
      <g transform={`rotate(${ma} ${x} ${y})`}>
        <g className={spin ? "bl-hand" : ""}>
          <line x1={x} y1={y} x2={x} y2={y - r * 0.72} stroke="#E4572E" strokeWidth="2" strokeLinecap="round" />
        </g>
      </g>
      <circle cx={x} cy={y} r={r * 0.08} fill="#191919" />
    </g>
  );
}
