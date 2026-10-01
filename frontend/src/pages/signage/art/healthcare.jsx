import { C, T, Screen } from "../../../components/screenbazaar/illustrations/kit";
import { Scene, Sticker, Person, Spark, SKIN, HAIR } from "./people";

/* Healthcare artwork: waiting-room scene, calm clinical stickers, use-case icons. Palette leans mint + violet. */

const d = (s) => ({ animationDelay: `${s}s` });
const first = (i) => (i === 0 ? { "data-first": "" } : {});
const MINT = "#CFF5DF";

/* ---------- stickers ---------- */

export function HeartbeatSticker({ size = 88, className = "" }) {
  return (
    <Sticker size={size} className={className}>
      <g className="sg-pop">
        <path d="M40 70C18 56 8 44 8 30a16 16 0 0 1 32-6 16 16 0 0 1 32 6c0 14-10 26-32 40z" fill={C.blush} stroke={C.ink} strokeWidth="2.5" />
      </g>
      <path className="sg-ecg" d="M10 40h14l5-10 7 20 6-26 6 16h22" fill="none" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </Sticker>
  );
}

export function PillSticker({ size = 72, className = "" }) {
  return (
    <Sticker size={size} className={className}>
      <g className="sg-rock">
        <g transform="rotate(-35 40 40)">
          <rect x="12" y="28" width="56" height="24" rx="12" fill={C.white} stroke={C.ink} strokeWidth="2.5" />
          <path d="M40 28h16a12 12 0 0 1 0 24H40z" fill={C.violet} stroke={C.ink} strokeWidth="2.5" />
        </g>
      </g>
    </Sticker>
  );
}

export function CrossSticker({ size = 70, className = "" }) {
  return (
    <Sticker size={size} className={className}>
      <circle cx="40" cy="40" r="32" fill={MINT} stroke={C.ink} strokeWidth="2.5" />
      <g className="sg-pop">
        <path d="M33 18h14v15h15v14H47v15H33V47H18V33h15z" fill={C.green} stroke={C.ink} strokeWidth="2.5" strokeLinejoin="round" />
      </g>
    </Sticker>
  );
}

export function StethoscopeSticker({ size = 76, className = "" }) {
  return (
    <Sticker size={size} className={className}>
      <g className="sg-sway">
        <path d="M22 8v20a14 14 0 0 0 28 0V8" fill="none" stroke={C.ink} strokeWidth="3.5" strokeLinecap="round" />
        <path d="M36 42v10a12 12 0 0 0 24 0v-6" fill="none" stroke={C.indigo} strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="60" cy="42" r="7" fill={C.gold} stroke={C.ink} strokeWidth="2.5" />
        <circle cx="22" cy="8" r="3" fill={C.ink} />
        <circle cx="50" cy="8" r="3" fill={C.ink} />
      </g>
    </Sticker>
  );
}

/* ---------- scene: a calm waiting room with a screen doing the talking ---------- */

const SLIDES = [
  { k: "HEALTH TIP", t: "Drink 8 glasses", s: "of water a day", bg: C.mint, fg: C.green },
  { k: "OUR SERVICES", t: "Full-body check-up", s: "in 90 minutes", bg: C.lavender, fg: C.violet },
  { k: "DEPARTMENTS", t: "Physiotherapy", s: "now on floor 2", bg: C.white, fg: C.indigo },
];

export function WaitingRoomScene() {
  return (
    <Scene label="A calm waiting room: patients seated in a row watch a wall screen that cycles through health tips, services and departments">
      <rect width="480" height="360" fill="#F3FFF8" />
      <rect y="262" width="480" height="98" fill={MINT} />
      <path d="M0 262h480" stroke={C.ink} strokeWidth="2" />
      {/* window */}
      <rect x="24" y="40" width="80" height="100" rx="6" fill={C.white} stroke={C.ink} strokeWidth="2" />
      <path d="M64 40v100M24 90h80" stroke={C.ink} strokeWidth="2" />
      <circle className="sg-bob" cx="48" cy="64" r="8" fill={C.gold} opacity="0.7" />
      {/* clock */}
      <g transform="translate(410 70)">
        <circle r="24" fill={C.white} stroke={C.ink} strokeWidth="2.5" />
        <rect className="sg-tick" x="-1.5" y="-14" width="3" height="14" rx="1.5" fill={C.ink} />
        <rect className="sg-hand" x="-1" y="-20" width="2" height="20" rx="1" fill={C.green} />
        <circle r="3" fill={C.ink} />
      </g>
      {/* wall screen */}
      <Screen x={140} y={40} w={200} h={116} r={10}>
        {SLIDES.map((sl, i) => (
          <g key={sl.k} className="sb-c3" style={d(i * 2.5)} {...first(i)}>
            <rect width="192" height="108" fill={sl.bg} />
            <T x="14" y="26" size={9} weight={800} fill={sl.fg} letterSpacing="1.5">{sl.k}</T>
            <T x="14" y="56" size={17} weight={800} fill={C.ink}>{sl.t}</T>
            <T x="14" y="76" size={11} weight={700} fill={C.slate}>{sl.s}</T>
            <rect x="14" y="88" width="50" height="8" rx="4" fill={sl.fg} />
          </g>
        ))}
      </Screen>
      <path className="sg-ecg" d="M140 176h60l8-12 10 24 8-18 6 6h108" fill="none" stroke={C.green} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {/* chairs + seated patients */}
      {[110, 190, 270, 350].map((x) => (
        <g key={x}>
          <rect x={x - 22} y="220" width="44" height="46" rx="8" fill={C.violet} opacity="0.85" />
          <rect x={x - 24} y="258" width="48" height="12" rx="6" fill={C.indigo} />
          <rect x={x - 18} y="270" width="4" height="26" fill={C.slate} />
          <rect x={x + 14} y="270" width="4" height="26" fill={C.slate} />
        </g>
      ))}
      <Person x={110} y={300} s={0.9} sit top={C.gold} bottom={C.slate} hairStyle="short" hair={HAIR[4]} skin={SKIN[1]} pose="point" />
      <Person x={190} y={300} s={0.9} sit top={C.blush} bottom={C.indigo} hairStyle="bun" hair={HAIR[4]} skin={SKIN[0]} />
      <Person x={350} y={300} s={0.9} sit top={C.green} bottom={C.ink} hairStyle="curly" hair={HAIR[0]} skin={SKIN[3]} />
      {/* attendant standing */}
      <Person x={440} y={336} s={1} flip top={C.indigo} bottom={C.ink} hairStyle="long" hair={HAIR[1]} skin={SKIN[2]} pose="hold" />
      {/* plant */}
      <g transform="translate(40 300)">
        <path d="M-14 0h28l-4 30h-20z" fill={C.taupe} stroke={C.ink} strokeWidth="2" />
        <g className="sg-rock">
          <path d="M0 0c-4-20-16-30-24-32 4 12 10 22 24 32zM0 0c2-24 12-36 22-38-2 14-8 28-22 38zM0 0c0-18-2-30-4-42" fill={C.green} stroke={C.ink} strokeWidth="1.5" />
        </g>
      </g>
      <Spark x={360} y={34} r={8} fill={C.green} />
      <Spark x={126} y={196} r={6} fill={C.violet} delay={1.2} />
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

export const HEALTHCARE_ICONS = [
  // Display health information
  () => (
    <Icon>
      <g className="sg-pop">
        <path d="M32 56C12 44 4 34 4 22a13 13 0 0 1 28-5 13 13 0 0 1 28 5c0 12-8 22-28 34z" fill={C.blush} stroke={C.ink} strokeWidth="2.5" />
      </g>
      <path className="sg-ecg" d="M8 30h12l4-8 6 16 5-20 5 12h16" fill="none" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  ),
  // Explain treatments and services
  () => (
    <Icon>
      <rect x="12" y="8" width="40" height="50" rx="5" fill={C.white} stroke={C.ink} strokeWidth="2.5" />
      <rect x="24" y="4" width="16" height="8" rx="3" fill={C.violet} stroke={C.ink} strokeWidth="2" />
      {[24, 36, 48].map((y, i) => (
        <g key={y}>
          <path className="sg-check" style={d(i * 0.5)} d={`M18 ${y}l4 4 7-8`} fill="none" stroke={C.green} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="32" y={y - 2} width="14" height="4" rx="2" fill={C.line} />
        </g>
      ))}
    </Icon>
  ),
  // Promote departments and facilities
  () => (
    <Icon>
      <rect x="10" y="20" width="44" height="38" rx="3" fill={C.lavender} stroke={C.ink} strokeWidth="2.5" />
      <rect x="26" y="42" width="12" height="16" fill={C.indigo} />
      {[16, 42].map((x) => (
        <rect key={x} className="sg-twinkle" x={x} y="28" width="6" height="6" rx="1" fill={C.gold} />
      ))}
      <g className="sg-pop">
        <circle cx="32" cy="14" r="10" fill={C.white} stroke={C.ink} strokeWidth="2" />
        <path d="M30 8h4v4h4v4h-4v4h-4v-4h-4v-4h4z" fill="#EF4444" />
      </g>
    </Icon>
  ),
  // Communicate announcements
  () => (
    <Icon>
      <g transform="translate(32 8)">
        <g className="sg-sway">
          <path d="M-16 34c0-18 4-26 16-26s16 8 16 26l4 6h-40z" fill={C.gold} stroke={C.ink} strokeWidth="2.5" strokeLinejoin="round" />
          <circle cx="0" cy="46" r="5" fill={C.ink} />
        </g>
      </g>
    </Icon>
  ),
  // Run relevant partner advertisements
  () => (
    <Icon>
      <rect x="18" y="16" width="28" height="42" rx="6" fill={C.white} stroke={C.ink} strokeWidth="2.5" />
      <rect x="16" y="8" width="32" height="10" rx="3" fill={C.green} stroke={C.ink} strokeWidth="2" />
      <rect x="22" y="30" width="20" height="14" rx="3" fill={C.lavender} />
      <path d="M30 33h4v3h3v4h-3v3h-4v-3h-3v-4h3z" fill={C.violet} />
      <g transform="translate(50 12)">
        <g className="sg-pop">
          <path d="M0-8c.8 4 3 6 7 7-4 1-6.2 3-7 7-.8-4-3-6-7-7 4-1 6.2-3 7-7z" fill={C.gold} stroke={C.ink} strokeWidth="1.5" />
        </g>
      </g>
    </Icon>
  ),
];
