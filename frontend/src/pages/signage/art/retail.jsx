import { C, T } from "../../../components/screenbazaar/illustrations/kit";
import { Scene, Sticker, Person, Spark, SKIN, HAIR } from "./people";

/* Retail artwork: high-street scene, shopping stickers, use-case icons. */

const d = (s) => ({ animationDelay: `${s}s` });

/* ---------- stickers ---------- */

export function PriceTagSticker({ size = 76, className = "" }) {
  return (
    <Sticker size={size} className={className}>
      <g className="sg-sway">
        <path d="M40 4v14" stroke={C.ink} strokeWidth="2.5" />
        <path d="M22 18h36l8 12v40a6 6 0 0 1-6 6H20a6 6 0 0 1-6-6V30z" fill={C.gold} stroke={C.ink} strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="40" cy="28" r="4" fill={C.cream} stroke={C.ink} strokeWidth="2" />
        <text x="40" y="56" textAnchor="middle" fontFamily="Manrope, sans-serif" fontWeight="800" fontSize="16" fill={C.ink}>₹499</text>
        <path d="M24 64h32" stroke={C.ink} strokeWidth="2" strokeDasharray="3 3" />
      </g>
    </Sticker>
  );
}

export function BagSticker({ size = 80, className = "" }) {
  return (
    <Sticker size={size} className={className}>
      <g className="sg-bob">
        <path d="M28 26v-6a12 12 0 0 1 24 0v6" fill="none" stroke={C.ink} strokeWidth="3" strokeLinecap="round" />
        <path d="M14 26h52l-4 46H18z" fill={C.violet} stroke={C.ink} strokeWidth="2.5" strokeLinejoin="round" />
        <g className="sg-pop">
          <path d="M40 58c-9-6-13-10-13-15a6 6 0 0 1 13-3 6 6 0 0 1 13 3c0 5-4 9-13 15z" fill={C.blush} stroke={C.ink} strokeWidth="2" />
        </g>
      </g>
    </Sticker>
  );
}

export function HangerSticker({ size = 72, className = "" }) {
  return (
    <Sticker size={size} className={className}>
      <g className="sg-rock">
        <path d="M40 22a6 6 0 1 1 6-6" fill="none" stroke={C.ink} strokeWidth="3" strokeLinecap="round" />
        <path d="M40 22l-30 18h60z" fill="none" stroke={C.ink} strokeWidth="3" strokeLinejoin="round" />
        <path d="M18 40l6 32h32l6-32" fill={C.lilac} stroke={C.ink} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M30 48h20" stroke={C.violet} strokeWidth="3" strokeLinecap="round" />
      </g>
    </Sticker>
  );
}

export function PercentSticker({ size = 84, className = "" }) {
  const pts = Array.from({ length: 20 }, (_, i) => {
    const r = i % 2 ? 31 : 38;
    const a = (Math.PI * 2 * i) / 20;
    return `${40 + r * Math.cos(a)},${40 + r * Math.sin(a)}`;
  }).join(" ");
  return (
    <Sticker size={size} className={className}>
      <g className="sg-spin">
        <polygon points={pts} fill={C.indigo} stroke={C.ink} strokeWidth="2" strokeLinejoin="round" />
      </g>
      <text x="40" y="47" textAnchor="middle" fontFamily="Manrope, sans-serif" fontWeight="800" fontSize="22" fill={C.white}>%</text>
    </Sticker>
  );
}

/* ---------- scene: a high street where every window screen is live ---------- */

const SHOPS = [
  { x: 20, name: "DENIM CO", awning: C.violet, promos: [["NEW IN", C.violet, C.white], ["40% OFF", C.gold, C.ink], ["DENIM", C.indigo, C.white]] },
  { x: 175, name: "SOLE", awning: C.gold, promos: [["SNEAKERS", C.ink, C.gold], ["BUY 2", C.blush, C.ink], ["₹1,999", C.violet, C.white]] },
  { x: 330, name: "GLOW", awning: C.indigo, promos: [["FESTIVE", C.indigo, C.gold], ["GIFTS", C.gold, C.ink], ["AISLE 4", C.lilac, C.indigo]] },
];

export function HighStreetScene() {
  return (
    <Scene label="A high street of three shops whose window screens change offers on their own while shoppers walk past">
      <rect width="480" height="360" fill={C.ivory} />
      <circle cx="400" cy="60" r="34" fill={C.gold} opacity="0.35" />
      {SHOPS.map((s, i) => (
        <g key={s.name}>
          <rect x={s.x} y="70" width="130" height="220" rx="8" fill={C.sand} stroke={C.ink} strokeWidth="2" />
          <rect x={s.x + 10} y="78" width="110" height="20" rx="4" fill={C.white} stroke={C.ink} strokeWidth="1.5" />
          <T x={s.x + 65} y="92" anchor="middle" size={11} weight={800}>{s.name}</T>
          {Array.from({ length: 6 }, (_, k) => (
            <path key={k} d={`M${s.x + k * 21.6} 104h21.6v10a10.8 10.8 0 0 1-21.6 0z`} fill={k % 2 ? C.white : s.awning} stroke={C.ink} strokeWidth="1" />
          ))}
          {/* window with portrait screen */}
          <rect x={s.x + 10} y="130" width="110" height="110" rx="4" fill="#E9E8F6" stroke={C.ink} strokeWidth="1.5" />
          <rect x={s.x + 45} y="138" width="44" height="80" rx="4" fill={C.ink} />
          <svg x={s.x + 48} y="141" width="38" height="74" overflow="hidden">
            {s.promos.map(([t, bg, fg], k) => (
              <g key={t} className="sb-c3" style={d(k * 2.5 + i * 0.8)} {...(k === 0 ? { "data-first": "" } : {})}>
                <rect width="38" height="74" fill={bg} />
                <circle cx="19" cy="50" r="12" fill={fg} opacity="0.2" />
                <T x="19" y="30" anchor="middle" size={t.length > 6 ? 7 : 9} weight={800} fill={fg}>{t}</T>
              </g>
            ))}
          </svg>
          <rect x={s.x + 60} y="218" width="14" height="10" fill={C.slate} />
          {/* door */}
          <rect x={s.x + 20} y="246" width="36" height="44" rx="3" fill={C.white} stroke={C.ink} strokeWidth="1.5" />
          <circle cx={s.x + 50} cy="270" r="2" fill={C.ink} />
          <rect x={s.x + 70} y="252" width="44" height="18" rx="4" fill={C.lilac} />
        </g>
      ))}
      {/* pavement */}
      <rect x="0" y="290" width="480" height="70" fill={C.taupe} opacity="0.35" />
      <path d="M0 292h480" stroke={C.ink} strokeWidth="2" />
      {/* walkers */}
      <g className="sg-walk">
        <Person x={0} y={340} s={0.72} walk top={C.violet} bottom={C.indigo} hairStyle="long" hair={HAIR[1]} skin={SKIN[1]} pose="hold">
          <g transform="translate(36 -64)">
            <path d="M4 4v-3a4 4 0 0 1 8 0v3" fill="none" stroke={C.ink} strokeWidth="1.5" />
            <rect x="0" y="4" width="16" height="18" rx="2" fill={C.gold} stroke={C.ink} strokeWidth="1.5" />
          </g>
        </Person>
      </g>
      <g className="sg-walk" style={d(-8)}>
        <Person x={0} y={346} s={0.78} walk top={C.gold} bottom={C.ink} hairStyle="curly" hair={HAIR[0]} skin={SKIN[3]} />
      </g>
      <Spark x={150} y={40} r={10} />
      <Spark x={310} y={30} r={7} fill={C.violet} delay={0.8} />
    </Scene>
  );
}

/* ---------- use-case icons (order matches the owner's list) ---------- */

function Icon({ children }) {
  return (
    <svg viewBox="0 0 64 64" className="sb-anim sg-icon h-14 w-14" aria-hidden="true">
      {children}
    </svg>
  );
}

export const RETAIL_ICONS = [
  // Showcase new products
  () => (
    <Icon>
      <path d="M12 26l20-10 20 10v22L32 58 12 48z" fill={C.lilac} stroke={C.ink} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M12 26l20 10 20-10M32 36v22" fill="none" stroke={C.ink} strokeWidth="2.5" strokeLinejoin="round" />
      <g className="sg-pop">
        <path d="M46 4c.8 4 3 6 7 7-4 1-6.2 3-7 7-.8-4-3-6-7-7 4-1 6.2-3 7-7z" fill={C.gold} stroke={C.ink} strokeWidth="1.5" />
      </g>
    </Icon>
  ),
  // Promote limited-time offers
  () => (
    <Icon>
      <g className="sg-rock">
        <path d="M8 30L30 8h24v24L32 54z" fill={C.gold} stroke={C.ink} strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="44" cy="18" r="4" fill={C.white} stroke={C.ink} strokeWidth="2" />
        <text x="30" y="38" textAnchor="middle" fontFamily="Manrope" fontWeight="800" fontSize="15" fill={C.ink}>%</text>
      </g>
    </Icon>
  ),
  // Highlight products customers may have missed
  () => (
    <Icon>
      <rect x="6" y="40" width="52" height="16" rx="3" fill={C.sand} stroke={C.ink} strokeWidth="2" />
      <rect x="12" y="30" width="10" height="10" rx="2" fill={C.violet} />
      <rect x="28" y="26" width="10" height="14" rx="2" fill={C.blush} stroke={C.ink} strokeWidth="1" />
      <rect x="44" y="32" width="8" height="8" rx="2" fill={C.indigo} />
      <g className="sg-scan">
        <circle cx="20" cy="18" r="10" fill="#fff" fillOpacity="0.6" stroke={C.ink} strokeWidth="3" />
        <path d="M27 25l7 7" stroke={C.ink} strokeWidth="4" strokeLinecap="round" />
      </g>
    </Icon>
  ),
  // Display seasonal campaigns
  () => (
    <Icon>
      <g className="sg-spin">
        {[0, 60, 120].map((a) => (
          <g key={a} transform={`rotate(${a} 32 32)`}>
            <path d="M32 8v48M32 16l-6-6M32 16l6-6M32 48l-6 6M32 48l6 6" stroke={C.indigo} strokeWidth="3.5" strokeLinecap="round" fill="none" />
          </g>
        ))}
      </g>
      <circle cx="32" cy="32" r="5" fill={C.gold} stroke={C.ink} strokeWidth="2" />
    </Icon>
  ),
  // Run partner advertisements
  () => (
    <Icon>
      <path d="M8 26h10l22-12v36L18 38H8z" fill={C.violet} stroke={C.ink} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M14 38l4 14h8l-3-14" fill={C.lilac} stroke={C.ink} strokeWidth="2" strokeLinejoin="round" />
      {[0, 1, 2].map((i) => (
        <path key={i} className="sg-twinkle" style={d(i * 0.3)} d={`M${46 + i * 5} ${24 - i * 4}q${5 + i * 2} ${8 + i * 4} 0 ${16 + i * 8}`} fill="none" stroke={C.ink} strokeWidth="2.5" strokeLinecap="round" />
      ))}
    </Icon>
  ),
];
