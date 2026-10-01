import { C, T, Screen } from "../../../components/screenbazaar/illustrations/kit";
import { Scene, Sticker, Person, Spark, SKIN, HAIR } from "./people";

/* Automotive artwork: showroom scene, garage stickers, use-case icons. Palette: showroom black + spotlight. */

const d = (s) => ({ animationDelay: `${s}s` });
const first = (i) => (i === 0 ? { "data-first": "" } : {});
const FLOOR = "#0c0c14";

function Wheel({ cx, cy, r = 16 }) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <circle r={r} fill={C.ink} />
      <circle r={r * 0.55} fill={C.taupe} />
      <g className="sg-spin-fast">
        {[0, 72, 144, 216, 288].map((a) => (
          <rect key={a} x="-1.5" y={-r * 0.5} width="3" height={r * 0.5} fill={C.ink} transform={`rotate(${a})`} />
        ))}
      </g>
    </g>
  );
}

/* ---------- stickers ---------- */

export function SteeringSticker({ size = 84, className = "" }) {
  return (
    <Sticker size={size} className={className}>
      <g className="sg-rock" style={{ transformOrigin: "50% 50%" }}>
        <circle cx="40" cy="40" r="32" fill="none" stroke={C.ink} strokeWidth="8" />
        <circle cx="40" cy="40" r="32" fill="none" stroke={C.violet} strokeWidth="4" />
        <path d="M10 36h60M40 40v30" stroke={C.ink} strokeWidth="7" strokeLinecap="round" />
        <circle cx="40" cy="40" r="10" fill={C.gold} stroke={C.ink} strokeWidth="2.5" />
      </g>
    </Sticker>
  );
}

export function TyreSticker({ size = 80, className = "" }) {
  return (
    <Sticker size={size} className={className}>
      <g className="sg-roll">
        <circle cx="40" cy="40" r="30" fill={C.ink} />
        {Array.from({ length: 12 }, (_, i) => (
          <rect key={i} x="38" y="10" width="4" height="7" fill="#333" transform={`rotate(${i * 30} 40 40)`} />
        ))}
        <circle cx="40" cy="40" r="16" fill={C.white} stroke={C.ink} strokeWidth="2" />
        {[0, 72, 144, 216, 288].map((a) => (
          <path key={a} d="M40 40v-14" stroke={C.violet} strokeWidth="4" strokeLinecap="round" transform={`rotate(${a} 40 40)`} />
        ))}
      </g>
    </Sticker>
  );
}

export function KeyFobSticker({ size = 74, className = "" }) {
  return (
    <Sticker size={size} className={className}>
      {[0, 1, 2].map((i) => (
        <path key={i} className="sg-twinkle" style={d(i * 0.3)} d={`M${52 + i * 6} ${18 - i * 5}a${10 + i * 6} ${10 + i * 6} 0 0 1 ${6 + i * 3} ${12 + i * 6}`} fill="none" stroke={C.gold} strokeWidth="3" strokeLinecap="round" />
      ))}
      <g className="sg-sway">
        <circle cx="30" cy="10" r="7" fill="none" stroke={C.ink} strokeWidth="3" />
        <rect x="16" y="18" width="28" height="50" rx="12" fill={C.ink} />
        <circle cx="30" cy="34" r="6" fill={C.violet} />
        <circle cx="30" cy="52" r="5" fill={C.slate} />
      </g>
    </Sticker>
  );
}

export function SpannerSticker({ size = 78, className = "" }) {
  return (
    <Sticker size={size} className={className}>
      <g className="sg-rock">
        <g transform="rotate(45 40 40)">
          <rect x="34" y="18" width="12" height="52" rx="6" fill={C.slate} stroke={C.ink} strokeWidth="2.5" />
          <path d="M26 8a14 14 0 0 0 28 0v10H46v-8H34v8h-8z" fill={C.gold} stroke={C.ink} strokeWidth="2.5" strokeLinejoin="round" />
        </g>
      </g>
    </Sticker>
  );
}

/* ---------- scene: the showroom ---------- */

const MODELS = [
  { tag: "NEW LAUNCH", name: "Aero S", sub: "Hybrid · 22 km/l", bg: C.violet },
  { tag: "FESTIVE OFFER", name: "Terra X", sub: "₹50,000 off", bg: "#B7791F" },
  { tag: "NOW ELECTRIC", name: "Volt E", sub: "480 km range", bg: "#2F855A" },
];

export function ShowroomScene() {
  return (
    <Scene label="A car showroom: spotlights sweep over a car on a turntable while a wall screen cycles through new models and customers point at it">
      <rect width="480" height="360" fill={FLOOR} />
      {/* spotlights */}
      {[120, 360].map((x, i) => (
        <g key={x}>
          <rect x={x - 10} y="0" width="20" height="10" fill={C.slate} />
          <path className="sg-flicker" style={d(i * 1.2)} d={`M${x - 8} 10L${x - 70} 300h140L${x + 8} 10z`} fill={i ? C.violet : C.white} opacity="0.12" />
        </g>
      ))}
      {/* wall screen */}
      <Screen x={150} y={30} w={180} h={104} r={10} bezel="#000">
        {MODELS.map((m, i) => (
          <g key={m.name} className="sb-c3" style={d(i * 2.5)} {...first(i)}>
            <rect width="172" height="96" fill={m.bg} />
            <T x="12" y="22" size={8} weight={800} fill={C.gold} letterSpacing="2">{m.tag}</T>
            <T x="12" y="52" size={22} weight={800} fill={C.white}>{m.name}</T>
            <T x="12" y="72" size={10} weight={700} fill={C.white} opacity="0.85">{m.sub}</T>
            <path d="M104 80c0-6 4-10 10-11l10-2 8-7h22l10 8 6 2v10z" fill={C.white} opacity="0.35" />
          </g>
        ))}
      </Screen>
      {/* turntable */}
      <ellipse cx="240" cy="296" rx="150" ry="22" fill="#1b1b2e" />
      <ellipse className="sg-ecg" cx="240" cy="296" rx="150" ry="22" fill="none" stroke={C.violet} strokeWidth="3" style={{ strokeDasharray: "80 400" }} />
      {/* car */}
      <g className="sg-bob" style={{ animationDuration: "4s" }}>
        <path
          d="M120 270c0-12 8-20 22-22l40-6 38-26c8-5 16-8 26-8h64c12 0 22 4 30 12l26 24 20 4c8 2 14 8 14 16v12H120z"
          fill={C.violet}
          stroke={C.ink}
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path d="M228 222h44v22h-70zM282 222h32c6 0 12 3 16 8l12 14h-60z" fill={C.mist} stroke={C.ink} strokeWidth="2.5" strokeLinejoin="round" />
        <rect className="sg-flicker" x="386" y="256" width="14" height="7" rx="3" fill={C.gold} />
        <path d="M150 262h40" stroke={C.white} strokeOpacity="0.4" strokeWidth="3" strokeLinecap="round" />
        <Wheel cx={172} cy={282} />
        <Wheel cx={344} cy={282} />
      </g>
      {/* customers */}
      <Person x={60} y={352} s={1} top={C.gold} bottom={C.indigo} hairStyle="short" hair={HAIR[0]} skin={SKIN[2]} pose="point" />
      <Person x={100} y={354} s={0.95} top={C.blush} bottom={C.ink} hairStyle="long" hair={HAIR[1]} skin={SKIN[0]} pose="hold" />
      {/* salesperson */}
      <Person x={440} y={352} s={1} flip top={C.indigo} bottom={C.ink} hairStyle="bun" hair={HAIR[0]} skin={SKIN[3]} pose="wave" />
      <Spark x={100} y={60} r={9} />
      <Spark x={390} y={80} r={6} fill={C.violet} delay={0.7} />
    </Scene>
  );
}

/* ---------- use-case icons ---------- */

function Icon({ children }) {
  return (
    <svg viewBox="0 0 64 64" className="sb-anim sg-icon mx-auto h-12 w-12" aria-hidden="true">
      {children}
    </svg>
  );
}

export const AUTOMOTIVE_ICONS = [
  // Showcase vehicles
  () => (
    <Icon>
      <g className="sg-nudge">
        <path d="M4 42c0-5 3-8 8-9l8-2 8-8h14l8 8 6 1c3 1 4 4 4 7v5H4z" fill={C.violet} stroke={C.white} strokeWidth="2" strokeLinejoin="round" />
        <circle cx="16" cy="46" r="5" fill={C.white} />
        <circle cx="46" cy="46" r="5" fill={C.white} />
      </g>
      <g transform="translate(52 12)">
        <g className="sg-pop">
          <path d="M0-8c.8 4 3 6 7 7-4 1-6.2 3-7 7-.8-4-3-6-7-7 4-1 6.2-3 7-7z" fill={C.gold} />
        </g>
      </g>
    </Icon>
  ),
  // Highlight offers
  () => (
    <Icon>
      <g className="sg-pop">
        <path d="M8 12h48v30H30l-12 10v-10H8z" fill={C.gold} stroke={C.white} strokeWidth="2" strokeLinejoin="round" />
        <text x="32" y="33" textAnchor="middle" fontFamily="Manrope" fontWeight="800" fontSize="15" fill={C.ink}>-20%</text>
      </g>
    </Icon>
  ),
  // Promote accessories
  () => (
    <Icon>
      <g className="sg-spin" style={{ animationDuration: "4s" }}>
        <circle cx="32" cy="32" r="24" fill="none" stroke={C.white} strokeWidth="4" />
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <path key={a} d="M32 32V12" stroke={C.violet} strokeWidth="4" strokeLinecap="round" transform={`rotate(${a} 32 32)`} />
        ))}
        <circle cx="32" cy="32" r="6" fill={C.gold} />
      </g>
    </Icon>
  ),
  // Explain services
  () => (
    <Icon>
      <g className="sg-spin" style={{ animationDuration: "6s" }}>
        <path d="M32 14l4 0 2 6 5 2 5-4 4 4-4 5 2 5 6 2v4l-6 2-2 5 4 5-4 4-5-4-5 2-2 6h-4l-2-6-5-2-5 4-4-4 4-5-2-5-6-2v-4l6-2 2-5-4-5 4-4 5 4 5-2z" fill={C.slate} stroke={C.white} strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="34" cy="36" r="6" fill={FLOOR} />
      </g>
    </Icon>
  ),
  // Entertain customers while they wait
  () => (
    <Icon>
      {[22, 32, 42].map((x, i) => (
        <circle key={x} className="sg-rise" style={d(i * 0.5)} cx={x} cy="20" r="5" fill="#FFF3C4" />
      ))}
      <path d="M14 22h36l-5 36H19z" fill={C.white} />
      {[20, 30, 40].map((x) => (
        <path key={x} d={`M${x} 22l1 36`} stroke="#EF4444" strokeWidth="4" />
      ))}
    </Icon>
  ),
];
