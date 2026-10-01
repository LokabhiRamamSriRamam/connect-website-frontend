import { C, T, Screen } from "../../../components/screenbazaar/illustrations/kit";
import { Scene, Sticker, Person, Spark, SKIN, HAIR } from "./people";

/* Real Estate artwork: sales-office scene with skyline, construction stickers, use-case icons. Blueprint indigo + gold. */

const d = (s) => ({ animationDelay: `${s}s` });
const first = (i) => (i === 0 ? { "data-first": "" } : {});

/* ---------- stickers ---------- */

export function HouseSticker({ size = 84, className = "" }) {
  return (
    <Sticker size={size} className={className}>
      {[0, 1].map((i) => (
        <circle key={i} className="sg-rise" style={d(i * 1.2)} cx="56" cy="14" r="5" fill={C.taupe} />
      ))}
      <rect x="50" y="16" width="10" height="16" fill={C.slate} stroke={C.ink} strokeWidth="2" />
      <path d="M8 38L40 12l32 26" fill={C.violet} stroke={C.ink} strokeWidth="2.5" strokeLinejoin="round" />
      <rect x="16" y="36" width="48" height="36" fill={C.white} stroke={C.ink} strokeWidth="2.5" />
      <rect x="34" y="50" width="12" height="22" fill={C.gold} stroke={C.ink} strokeWidth="2" />
      <rect className="sg-twinkle" x="22" y="44" width="8" height="8" fill={C.gold} stroke={C.ink} strokeWidth="1.5" />
      <rect className="sg-twinkle" style={d(1)} x="50" y="44" width="8" height="8" fill={C.gold} stroke={C.ink} strokeWidth="1.5" />
    </Sticker>
  );
}

export function CraneSticker({ size = 96, className = "" }) {
  return (
    <Sticker size={size} className={className}>
      <path d="M20 76V10M14 76h14" stroke={C.gold} strokeWidth="5" strokeLinecap="round" />
      {[20, 34, 48, 62].map((y) => (
        <path key={y} d={`M16 ${y}l8 8M24 ${y}l-8 8`} stroke={C.ink} strokeWidth="1.5" />
      ))}
      <path d="M8 12h66" stroke={C.gold} strokeWidth="5" strokeLinecap="round" />
      <g transform="translate(62 12)">
        <g className="sg-sway">
          <path d="M0 0v30" stroke={C.ink} strokeWidth="1.5" />
          <rect x="-8" y="30" width="16" height="12" rx="2" fill={C.violet} stroke={C.ink} strokeWidth="2" />
        </g>
      </g>
    </Sticker>
  );
}

export function SoldSticker({ size = 90, className = "" }) {
  return (
    <Sticker size={size} className={className}>
      <path d="M22 76V30M58 76V30" stroke={C.ink} strokeWidth="4" strokeLinecap="round" />
      <path d="M16 20h48" stroke={C.ink} strokeWidth="3" />
      <g transform="translate(40 20)">
        <g className="sg-sway" style={{ animationDuration: "2.4s" }}>
          <path d="M-16 0v6M16 0v6" stroke={C.ink} strokeWidth="2" />
          <rect x="-26" y="6" width="52" height="26" rx="3" fill={C.gold} stroke={C.ink} strokeWidth="2.5" />
          <text x="0" y="24" textAnchor="middle" fontFamily="Manrope" fontWeight="800" fontSize="13" fill={C.ink}>SOLD</text>
        </g>
      </g>
    </Sticker>
  );
}

export function PinSticker({ size = 72, className = "" }) {
  return (
    <Sticker size={size} className={className}>
      <ellipse cx="40" cy="72" rx="14" ry="4" fill={C.ink} opacity="0.2" />
      <g className="sg-drop">
        <path d="M40 70C24 52 16 42 16 30a24 24 0 0 1 48 0c0 12-8 22-24 40z" fill={C.violet} stroke={C.ink} strokeWidth="2.5" />
        <circle cx="40" cy="30" r="9" fill={C.white} stroke={C.ink} strokeWidth="2" />
      </g>
    </Sticker>
  );
}

/* ---------- scene: sales office at dusk ---------- */

const PROJECT = [
  { k: "NEW LAUNCH", t: "Skyline Residences", s: "2 & 3 BHK · Tower A" },
  { k: "AMENITIES", t: "Pool · Gym · Park", s: "Clubhouse on level 12" },
  { k: "AVAILABILITY", t: "23 units left", s: "Site visits daily" },
];

export function SalesOfficeScene() {
  return (
    <Scene label="A real estate sales office at dusk: a couple point at a screen where a new tower draws itself, with the city skyline and a swinging crane outside the window">
      <defs>
        <linearGradient id="re-sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#1F30A0" />
          <stop offset="1" stopColor="#914BFA" />
        </linearGradient>
      </defs>
      <rect width="480" height="360" fill={C.cream} />
      {/* window with skyline */}
      <rect x="20" y="20" width="440" height="190" rx="8" fill="url(#re-sky)" stroke={C.ink} strokeWidth="3" />
      {[
        [40, 110, 40],
        [86, 80, 34],
        [126, 130, 30],
        [300, 90, 36],
        [342, 120, 44],
        [392, 70, 48],
      ].map(([x, y, w], i) => (
        <g key={i}>
          <rect x={x} y={y} width={w} height={210 - y} fill="#141a4a" />
          {Array.from({ length: Math.floor((200 - y) / 18) }, (_, r) =>
            [0, 1].map((c) => (
              <rect key={`${r}${c}`} className="sg-twinkle" style={d(((r + c + i) % 5) * 0.5)} x={x + 6 + c * (w / 2 - 2)} y={y + 8 + r * 18} width="6" height="7" fill={C.gold} />
            ))
          )}
        </g>
      ))}
      {/* crane */}
      <path d="M180 210V60M170 62h110" stroke={C.gold} strokeWidth="4" />
      <g transform="translate(262 62)">
        <g className="sg-sway" style={{ animationDuration: "4s" }}>
          <path d="M0 0v50" stroke={C.gold} strokeWidth="1.5" />
          <rect x="-12" y="50" width="24" height="10" fill={C.gold} />
        </g>
      </g>
      <path d="M240 20v190M20 115h440" stroke={C.ink} strokeWidth="3" opacity="0.35" />
      {/* sales screen on the wall below the window */}
      <Screen x={214} y={222} w={170} h={96} r={8}>
        <rect width="162" height="88" fill={C.white} />
        <path className="sg-draw" d="M20 80V30l20-10 20 10v50M60 80V40l22-12 22 12v40M14 80h120" fill="none" stroke={C.indigo} strokeWidth="2.5" strokeLinejoin="round" />
        {PROJECT.map((p, i) => (
          <g key={p.k} className="sb-c3" style={d(i * 2.5)} {...first(i)}>
            <T x="112" y="20" size={6} weight={800} fill={C.violet} letterSpacing="1">{p.k}</T>
            <T x="112" y="36" size={8} weight={800}>{p.t.split(" ")[0]}</T>
            <T x="112" y="46" size={8} weight={800}>{p.t.split(" ").slice(1).join(" ")}</T>
            <T x="112" y="60" size={6} weight={700} fill={C.slate}>{p.s.split(" · ")[0]}</T>
          </g>
        ))}
      </Screen>
      {/* model on a table */}
      <rect x="400" y="290" width="70" height="8" fill={C.ink} />
      <path d="M408 298v40M462 298v40" stroke={C.ink} strokeWidth="4" />
      <g className="sg-bob">
        <rect x="412" y="258" width="14" height="32" fill={C.lilac} stroke={C.ink} strokeWidth="1.5" />
        <rect x="428" y="244" width="16" height="46" fill={C.violet} stroke={C.ink} strokeWidth="1.5" />
        <rect x="446" y="266" width="12" height="24" fill={C.lilac} stroke={C.ink} strokeWidth="1.5" />
      </g>
      {/* floor */}
      <rect y="338" width="480" height="22" fill={C.sand} />
      {/* couple + agent */}
      <Person x={70} y={350} s={1.05} top={C.indigo} bottom={C.ink} hairStyle="short" hair={HAIR[0]} skin={SKIN[1]} pose="point" />
      <Person x={130} y={350} s={1} top={C.gold} bottom={C.indigo} hairStyle="long" hair={HAIR[2]} skin={SKIN[0]} pose="hold" />
      <Person x={180} y={352} s={0.6} top={C.green} bottom={C.slate} hairStyle="curly" hair={HAIR[0]} skin={SKIN[1]} pose="wave" />
      <Spark x={70} y={50} r={8} />
      <Spark x={420} y={40} r={6} delay={0.8} fill={C.white} />
    </Scene>
  );
}

/* ---------- use-case icons ---------- */

function Icon({ children }) {
  return (
    <svg viewBox="0 0 64 64" className="sb-anim sg-icon h-10 w-10 shrink-0" aria-hidden="true">
      {children}
    </svg>
  );
}

export const REALESTATE_ICONS = [
  // Showcase properties
  () => (
    <Icon>
      <path d="M6 30L32 8l26 22" fill="none" stroke={C.indigo} strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round" />
      <rect x="14" y="28" width="36" height="28" fill={C.lilac} stroke={C.indigo} strokeWidth="2.5" />
      <rect className="sg-flicker" x="27" y="38" width="10" height="18" fill={C.gold} />
    </Icon>
  ),
  // Display project walkthroughs
  () => (
    <Icon>
      <rect x="6" y="12" width="52" height="38" rx="5" fill={C.indigo} />
      <path className="sg-draw" d="M14 44V26l10-6 10 6v18M34 44V30l8-5 8 5v14" fill="none" stroke={C.white} strokeWidth="2" />
      <g className="sg-pop">
        <circle cx="46" cy="50" r="9" fill={C.gold} stroke={C.ink} strokeWidth="2" />
        <path d="M43 45l7 5-7 5z" fill={C.ink} />
      </g>
    </Icon>
  ),
  // Promote new launches
  () => (
    <Icon>
      <g className="sg-bob" style={{ animationDuration: "1.6s" }}>
        <path d="M32 4c10 8 14 20 12 34H20C18 24 22 12 32 4z" fill={C.white} stroke={C.indigo} strokeWidth="2.5" />
        <circle cx="32" cy="22" r="5" fill={C.violet} />
        <path d="M20 30l-8 10h8M44 30l8 10h-8" fill={C.gold} stroke={C.indigo} strokeWidth="2" strokeLinejoin="round" />
        <path className="sg-flicker" d="M24 40l8 18 8-18z" fill={C.gold} />
      </g>
    </Icon>
  ),
  // Highlight amenities
  () => (
    <Icon>
      <circle className="sg-pop" cx="48" cy="14" r="7" fill={C.gold} />
      <g className="sg-rock">
        <path d="M18 44V30" stroke="#6B4226" strokeWidth="3" />
        <circle cx="18" cy="24" r="10" fill={C.green} />
      </g>
      <rect x="28" y="36" width="30" height="12" rx="6" fill="#7DD3FC" stroke={C.indigo} strokeWidth="2" />
      <path className="sg-nudge" d="M6 56q6-4 12 0t12 0 12 0 12 0" fill="none" stroke={C.indigo} strokeWidth="3" strokeLinecap="round" />
    </Icon>
  ),
  // Display offers and availability
  () => (
    <Icon>
      <rect x="14" y="6" width="36" height="52" fill={C.lilac} stroke={C.indigo} strokeWidth="2.5" />
      {Array.from({ length: 12 }, (_, i) => (
        <rect key={i} className={i % 3 === 1 ? "sg-twinkle" : ""} style={d(i * 0.2)} x={19 + (i % 3) * 10} y={11 + Math.floor(i / 3) * 11} width="7" height="7" fill={i % 3 === 1 ? C.gold : C.indigo} opacity={i % 3 === 1 ? 1 : 0.35} />
      ))}
    </Icon>
  ),
];
