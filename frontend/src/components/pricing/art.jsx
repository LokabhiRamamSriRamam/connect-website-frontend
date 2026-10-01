import { motion } from "framer-motion";

const INK = "#191919";
const VIOLET = "#914BFA";
const INDIGO = "#1F30A0";
const GOLD = "#F5C542";
const LILAC = "#EEE5FF";

/* ------------------------------------------------------------------ */
/* Live preview of the visitor's setup in the "shape your quote" tool. */

const N_SCREENS = { "1": 1, "2–5": 4, "6–20": 10, "20+": 18 };
const N_PLACES = { one: 1, few: 3, many: 5 };
const KIND_SCALE = { compact: 0.6, standard: 0.8, large: 1, unsure: 0.8 };

function Storefront({ x, w, i }) {
  const stripes = 4;
  return (
    <motion.g
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.08, type: "spring", stiffness: 260, damping: 20 }}
    >
      <rect x={x} y={52} width={w} height={46} rx={3} fill="#fff" stroke={INK} strokeWidth={2} />
      <rect x={x - 3} y={42} width={w + 6} height={13} rx={3} fill={GOLD} stroke={INK} strokeWidth={2} />
      {Array.from({ length: stripes }, (_, s) => (
        <rect key={s} x={x - 3 + ((w + 6) / stripes) * s + 3} y={44} width={(w + 6) / stripes / 2} height={9} fill={VIOLET} opacity={0.85} />
      ))}
      <rect x={x + 6} y={62} width={w * 0.46} height={20} rx={2} fill={VIOLET} stroke={INK} strokeWidth={1.5} />
      <rect x={x + 9} y={66} width={w * 0.2} height={3} rx={1.5} fill="#fff" className="sb-light" style={{ animationDelay: `${i * 0.4}s` }} />
      <rect x={x + w - w * 0.28 - 6} y={70} width={w * 0.28} height={28} rx={2} fill={LILAC} stroke={INK} strokeWidth={1.5} />
      {/* location pin */}
      <g className="sb-bounce" style={{ animationDelay: `${i * 0.25}s` }}>
        <path
          d={`M${x + w / 2} 36c-6-7-9-11-9-15a9 9 0 0118 0c0 4-3 8-9 15z`}
          fill={INDIGO}
          stroke={INK}
          strokeWidth={1.5}
        />
        <circle cx={x + w / 2} cy={21} r={3.2} fill="#fff" />
      </g>
    </motion.g>
  );
}

export function QuotePreview({ source, kind, count, scale }) {
  const own = source === "own";
  const n = N_SCREENS[count] ?? 1;
  const places = N_PLACES[scale] ?? 1;
  const k = own ? 0.8 : KIND_SCALE[kind] ?? 0.8;

  // storefront row
  const gap = 14;
  const shopW = Math.min(76, (420 - gap * (places - 1)) / places);
  const rowW = places * shopW + gap * (places - 1);
  const shopX0 = 240 - rowW / 2;

  // screen grid
  const cols = n === 1 ? 1 : n <= 4 ? 2 : n <= 10 ? 5 : 6;
  const rows = Math.ceil(n / cols);
  const cellW = Math.min(420 / cols, 170);
  const cellH = Math.min(168 / rows, 124);
  const gx = 240 - (cols * cellW) / 2;
  const gy = 138 + (168 - rows * cellH) / 2;
  const sw = Math.min(cellW * 0.84, (cellH - 14) / 0.62) * k;
  const sh = sw * 0.62;

  const key = `${source}-${kind}-${count}`;

  return (
    <svg viewBox="0 0 480 320" className="sb-anim block h-auto w-full" role="img" aria-label={`Illustration: ${n === 18 ? "20 or more" : n} screen${n > 1 ? "s" : ""} across ${places} location${places > 1 ? "s" : ""}`}>
      <defs>
        <linearGradient id="pr-screen" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0.19" stopColor={INDIGO} />
          <stop offset="0.81" stopColor={VIOLET} />
        </linearGradient>
        <pattern id="pr-dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.1" fill="rgba(75,63,208,0.18)" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="480" height="320" fill="url(#pr-dots)" />

      {/* locations */}
      <line x1="20" y1="98" x2="460" y2="98" stroke={INK} strokeWidth="2" strokeLinecap="round" />
      {Array.from({ length: places }, (_, i) => (
        <Storefront key={`${scale}-${i}`} x={shopX0 + i * (shopW + gap)} w={shopW} i={i} />
      ))}

      {/* connection from the shops to the screens */}
      <path d="M240 104v26" stroke={VIOLET} strokeWidth="2.5" strokeLinecap="round" className="sb-dash" />

      {/* screens */}
      {Array.from({ length: n }, (_, i) => {
        const c = i % cols;
        const r = Math.floor(i / cols);
        const cx = gx + c * cellW + cellW / 2;
        const cy = gy + r * cellH + cellH / 2 - 5;
        const x = cx - sw / 2;
        const y = cy - sh / 2;
        return (
          <motion.g
            key={`${key}-${i}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.05 + i * 0.035, type: "spring", stiffness: 320, damping: 18 }}
          >
            <rect x={cx - 1.5} y={y + sh} width={3} height={6} fill={INK} />
            <rect x={cx - sw * 0.16} y={y + sh + 5} width={sw * 0.32} height={3} rx={1.5} fill={INK} />
            <rect
              x={x}
              y={y}
              width={sw}
              height={sh}
              rx={Math.max(3, sw * 0.06)}
              fill={own ? "#fff" : "url(#pr-screen)"}
              stroke={INK}
              strokeWidth={2}
              strokeDasharray={own ? "5 3" : undefined}
            />
            <rect x={x + sw * 0.12} y={y + sh * 0.24} width={sw * 0.5} height={Math.max(2, sh * 0.12)} rx={1} fill={own ? VIOLET : "#fff"} className="sb-light" style={{ animationDelay: `${(i % 5) * 0.3}s` }} />
            <rect x={x + sw * 0.12} y={y + sh * 0.5} width={sw * 0.32} height={Math.max(2, sh * 0.1)} rx={1} fill={own ? LILAC : GOLD} />
          </motion.g>
        );
      })}

      {count === "20+" && (
        <g>
          <circle cx="446" cy="292" r="16" fill={GOLD} stroke={INK} strokeWidth="2" />
          <path d="M446 285v14M439 292h14" stroke={INK} strokeWidth="2.6" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Pricing promise icons (72×72). */

function Frame({ children, label }) {
  return (
    <svg viewBox="0 0 72 72" width="72" height="72" className="sb-anim" role="img" aria-label={label}>
      {children}
    </svg>
  );
}

export function IconOneTime() {
  return (
    <Frame label="A receipt stamped paid">
      <path d="M16 8h34v52l-5.7-4-5.6 4-5.7-4-5.7 4-5.6-4L16 60z" fill="#fff" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M23 19h20M23 27h14M23 35h17" stroke={INK} strokeWidth="2.5" strokeLinecap="round" opacity="0.35" />
      <g className="pr-stamp">
        <circle cx="46" cy="44" r="15" fill={GOLD} stroke={INK} strokeWidth="2.5" />
        <circle cx="46" cy="44" r="11" fill="none" stroke={INK} strokeWidth="1.2" strokeDasharray="2 2" />
        <text x="46" y="47.5" textAnchor="middle" fontFamily="Manrope, sans-serif" fontWeight="800" fontSize="9" fill={INK}>
          PAID
        </text>
      </g>
    </Frame>
  );
}

export function IconTransparent() {
  return (
    <Frame label="A magnifying glass over a clear bill">
      <rect x="10" y="8" width="38" height="52" rx="6" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <path d="M17 20h16M17 29h24M17 38h12" stroke={INK} strokeWidth="2.5" strokeLinecap="round" opacity="0.35" />
      <path d="M36 20h5M35 38h6" stroke={VIOLET} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M17 49h24" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      <g className="pr-scan">
        <circle cx="38" cy="32" r="12" fill="rgba(238,229,255,0.65)" stroke={INK} strokeWidth="2.5" />
        <path d="M47 41l9 9" stroke={INK} strokeWidth="4.5" strokeLinecap="round" />
      </g>
    </Frame>
  );
}

export function IconWarranty() {
  return (
    <Frame label="A shield marked 12 months">
      <circle cx="36" cy="36" r="30" fill={VIOLET} className="pr-glow" opacity="0.35" />
      <path d="M36 8l22 8v16c0 15-9.5 25-22 31C23.5 57 14 47 14 32V16z" fill="url(#pr-shield)" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <defs>
        <linearGradient id="pr-shield" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0.19" stopColor={INDIGO} />
          <stop offset="0.81" stopColor={VIOLET} />
        </linearGradient>
      </defs>
      <text x="36" y="37" textAnchor="middle" fontFamily="Manrope, sans-serif" fontWeight="800" fontSize="17" fill="#fff">
        12
      </text>
      <text x="36" y="48" textAnchor="middle" fontFamily="Manrope, sans-serif" fontWeight="800" fontSize="7" letterSpacing="1" fill={GOLD}>
        MONTHS
      </text>
    </Frame>
  );
}

export function IconCarefree() {
  return (
    <Frame label="A relaxed smiling face">
      <circle cx="34" cy="40" r="22" fill={GOLD} stroke={INK} strokeWidth="2.5" />
      <path d="M24 37c2-3 6-3 8 0M37 37c2-3 6-3 8 0" stroke={INK} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M25 46c4 6 14 6 18 0" stroke={INK} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <g className="pr-rise">
        <circle cx="57" cy="20" r="8" fill="#fff" stroke={INK} strokeWidth="2" />
        <path d="M53.5 20l2.5 2.5 4.5-5" stroke={VIOLET} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <circle cx="50" cy="8" r="3" fill={VIOLET} className="pr-rise" style={{ animationDelay: "1.4s" }} />
    </Frame>
  );
}
