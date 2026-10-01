import { C, T, Screen } from "../../../components/screenbazaar/illustrations/kit";
import { Scene, Sticker, Person, Spark, SKIN, HAIR } from "./people";

/* Corporate & Offices artwork: reception scene, desk stickers, use-case icons. Clean whites + iris. */

const d = (s) => ({ animationDelay: `${s}s` });
const first = (i) => (i === 0 ? { "data-first": "" } : {});

/* ---------- stickers ---------- */

export function MugSticker({ size = 76, className = "" }) {
  return (
    <Sticker size={size} className={className}>
      {[30, 42].map((x, i) => (
        <path key={x} className="sg-rise" style={d(i * 0.8)} d={`M${x} 24q-4-6 0-12t0-10`} fill="none" stroke={C.slate} strokeWidth="2.5" strokeLinecap="round" />
      ))}
      <path d="M58 36h4a8 8 0 0 1 0 16h-4" fill="none" stroke={C.ink} strokeWidth="3" />
      <rect x="16" y="28" width="42" height="42" rx="8" fill={C.iris} stroke={C.ink} strokeWidth="2.5" />
      <text x="37" y="56" textAnchor="middle" fontFamily="Manrope" fontWeight="800" fontSize="14" fill={C.white}>MON</text>
    </Sticker>
  );
}

export function ChartSticker({ size = 84, className = "" }) {
  return (
    <Sticker size={size} className={className}>
      <rect x="6" y="8" width="68" height="64" rx="10" fill={C.white} stroke={C.ink} strokeWidth="2.5" />
      {[
        [16, 26, C.lilac],
        [30, 34, C.violet],
        [44, 20, C.lilac],
        [58, 42, C.gold],
      ].map(([x, h, f], i) => (
        <rect key={x} className="sg-grow" style={d(i * 0.25)} x={x} y={62 - h} width="9" height={h} rx="2" fill={f} stroke={C.ink} strokeWidth="1.5" />
      ))}
    </Sticker>
  );
}

export function StickyNoteSticker({ size = 76, className = "" }) {
  return (
    <Sticker size={size} className={className}>
      <g className="sg-rock">
        <path d="M10 10h60v44L54 70H10z" fill="#FFF9C4" stroke={C.ink} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M54 70V54h16" fill="#F5E79E" stroke={C.ink} strokeWidth="2.5" strokeLinejoin="round" />
        <path className="sg-check" d="M20 32l6 6 12-12" fill="none" stroke={C.green} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 48h24" stroke={C.slate} strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
      </g>
    </Sticker>
  );
}

export function ChatSticker({ size = 84, className = "" }) {
  return (
    <Sticker size={size} className={className}>
      <g className="sg-bob">
        <path d="M6 12h46a6 6 0 0 1 6 6v22a6 6 0 0 1-6 6H24l-10 10V46H6z" fill={C.violet} stroke={C.ink} strokeWidth="2.5" strokeLinejoin="round" />
        {[20, 30, 40].map((x, i) => (
          <circle key={x} className="sg-twinkle" style={d(i * 0.25)} cx={x} cy="29" r="3.5" fill={C.white} />
        ))}
      </g>
      <g className="sg-pop" style={d(0.6)}>
        <path d="M48 44h22a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4h-4v8l-8-8H48a4 4 0 0 1-4-4V48a4 4 0 0 1 4-4z" fill={C.gold} stroke={C.ink} strokeWidth="2" strokeLinejoin="round" />
      </g>
    </Sticker>
  );
}

/* ---------- scene: Monday morning at reception ---------- */

const BOARD = [
  { k: "ANNOUNCEMENT", t: "All-hands Thursday", s: "4 PM · Town hall" },
  { k: "WELCOME", t: "Visitors from Acme", s: "Meeting room 3" },
  { k: "THIS WEEK", t: "Q3 at 112%", s: "Thank you, team" },
];

export function OfficeScene() {
  return (
    <Scene label="An office reception on Monday morning: an employee walks in with a laptop, the receptionist waves and the wall screen shows this week's announcements and results">
      <rect width="480" height="360" fill="#F7F7F7" />
      {/* window with blinds */}
      <rect x="360" y="30" width="100" height="130" rx="6" fill="#E0F2FE" stroke={C.ink} strokeWidth="2" />
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x="360" y={36 + i * 15} width="100" height="6" fill={C.white} opacity="0.9" />
      ))}
      <circle className="sg-bob" cx="430" cy="70" r="10" fill={C.gold} opacity="0.5" />
      {/* clock */}
      <g transform="translate(60 70)">
        <circle r="22" fill={C.white} stroke={C.ink} strokeWidth="2.5" />
        <rect className="sg-tick" x="-1.5" y="-12" width="3" height="12" rx="1.5" fill={C.ink} />
        <rect className="sg-hand" x="-1" y="-18" width="2" height="18" rx="1" fill={C.iris} />
        <circle r="2.5" fill={C.ink} />
      </g>
      {/* wall screen */}
      <Screen x={120} y={36} w={220} h={126} r={10}>
        <rect width="212" height="118" fill={C.white} />
        {BOARD.map((b, i) => (
          <g key={b.k} className="sb-c3" style={d(i * 2.5)} {...first(i)}>
            <rect x="8" y="8" width="120" height="102" rx="8" fill={i === 0 ? C.iris : i === 1 ? C.lavender : C.mint} />
            <T x="16" y="26" size={7} weight={800} fill={i === 0 ? C.gold : C.iris} letterSpacing="1.5">{b.k}</T>
            <T x="16" y="54" size={12} weight={800} fill={i === 0 ? C.white : C.ink}>{b.t.split(" ").slice(0, 2).join(" ")}</T>
            <T x="16" y="68" size={12} weight={800} fill={i === 0 ? C.white : C.ink}>{b.t.split(" ").slice(2).join(" ")}</T>
            <T x="16" y="92" size={8} weight={700} fill={i === 0 ? C.white : C.slate}>{b.s}</T>
          </g>
        ))}
        {[0, 1, 2, 3].map((k) => (
          <rect key={k} className="sg-grow" style={d(k * 0.3)} x={140 + k * 16} y={40} width="10" height="66" rx="3" fill={k === 3 ? C.gold : C.violet} opacity={0.5 + k * 0.15} />
        ))}
        <T x="140" y="26" size={7} weight={800} fill={C.muted}>TICKETS CLOSED</T>
      </Screen>
      {/* receptionist + desk */}
      <Person x={250} y={292} s={0.95} flip top={C.iris} bottom={C.ink} hairStyle="long" hair={HAIR[0]} skin={SKIN[2]} pose="wave" />
      <rect x="180" y="238" width="190" height="64" rx="10" fill={C.white} stroke={C.ink} strokeWidth="2" />
      <rect x="180" y="238" width="190" height="12" rx="6" fill={C.iris} />
      <g transform="translate(340 238)">
        <path d="M-8 0v-14h16V0" fill={C.gold} stroke={C.ink} strokeWidth="1.5" />
        <path className="sg-rise" d="M0-18q-3-5 0-10" fill="none" stroke={C.slate} strokeWidth="2" strokeLinecap="round" />
      </g>
      {/* floor */}
      <rect y="302" width="480" height="58" fill="#EDEDED" />
      <path d="M0 302h480" stroke={C.ink} strokeWidth="2" />
      {/* employee walking in with a laptop */}
      <g className="sg-walk-in">
        <Person x={110} y={350} s={1.05} walk top={C.gold} bottom={C.indigo} hairStyle="short" hair={HAIR[1]} skin={SKIN[0]} pose="hold">
          <rect x="22" y="-70" width="26" height="18" rx="3" fill={C.slate} stroke={C.ink} strokeWidth="1.5" />
        </Person>
        <g transform="translate(100 212)">
          <g className="sg-pop">
            <path d="M0 0h52a6 6 0 0 1 6 6v14a6 6 0 0 1-6 6H18l-8 8v-8H0a6 6 0 0 1-6-6V6a6 6 0 0 1 6-6z" fill={C.white} stroke={C.ink} strokeWidth="1.5" />
            <T x="26" y="17" anchor="middle" size={9} weight={800}>Morning!</T>
          </g>
        </g>
      </g>
      {/* plant */}
      <g transform="translate(440 302)">
        <rect x="-12" y="-30" width="24" height="30" rx="4" fill={C.white} stroke={C.ink} strokeWidth="1.5" />
        <g className="sg-rock">
          {[-40, -10, 20, 45].map((a) => (
            <path key={a} d="M0-30c-6-14-2-28 6-36 2 12 0 26-6 36z" fill={C.green} transform={`rotate(${a} 0 -30)`} />
          ))}
        </g>
      </g>
      <Spark x={350} y={196} r={8} />
      <Spark x={40} y={200} r={6} fill={C.violet} delay={1} />
    </Scene>
  );
}

/* ---------- use-case icons (Mon–Fri) ---------- */

function Icon({ children }) {
  return (
    <svg viewBox="0 0 64 64" className="sb-anim sg-icon h-10 w-10" aria-hidden="true">
      {children}
    </svg>
  );
}

export const CORPORATE_ICONS = [
  // Share company announcements
  () => (
    <Icon>
      <g className="sg-pop">
        <path d="M8 10h48a4 4 0 0 1 4 4v26a4 4 0 0 1-4 4H26l-12 10V44H8a4 4 0 0 1-4-4V14a4 4 0 0 1 4-4z" fill={C.iris} stroke={C.ink} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M32 18v12" stroke={C.white} strokeWidth="5" strokeLinecap="round" />
        <circle cx="32" cy="37" r="3" fill={C.white} />
      </g>
    </Icon>
  ),
  // Display events
  () => (
    <Icon>
      <rect x="8" y="12" width="48" height="44" rx="6" fill={C.white} stroke={C.ink} strokeWidth="2.5" />
      <path d="M8 24h48" stroke={C.ink} strokeWidth="2.5" />
      <path d="M20 6v10M44 6v10" stroke={C.ink} strokeWidth="3" strokeLinecap="round" />
      <circle className="sg-pop" cx="32" cy="40" r="8" fill={C.gold} stroke={C.ink} strokeWidth="2" />
    </Icon>
  ),
  // Welcome visitors
  () => (
    <Icon>
      <path d="M24 4l8 12 8-12" fill="none" stroke={C.iris} strokeWidth="4" />
      <g transform="translate(32 16)">
        <g className="sg-sway">
          <rect x="-16" y="0" width="32" height="44" rx="5" fill={C.white} stroke={C.ink} strokeWidth="2.5" />
          <circle cx="0" cy="16" r="7" fill={C.lilac} stroke={C.ink} strokeWidth="1.5" />
          <rect x="-10" y="30" width="20" height="4" rx="2" fill={C.iris} />
        </g>
      </g>
    </Icon>
  ),
  // Show internal communications
  () => (
    <Icon>
      <path d="M4 10h36a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4H18l-8 8v-8H4z" fill={C.lilac} stroke={C.ink} strokeWidth="2" strokeLinejoin="round" />
      {[14, 22, 30].map((x, i) => (
        <circle key={x} className="sg-twinkle" style={d(i * 0.25)} cx={x} cy="22" r="2.5" fill={C.iris} />
      ))}
      <g className="sg-bob">
        <path d="M60 32H30a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h16l8 8v-8h6z" fill={C.gold} stroke={C.ink} strokeWidth="2" strokeLinejoin="round" />
      </g>
    </Icon>
  ),
  // Display dashboards and updates
  () => (
    <Icon>
      <path d="M8 56h50" stroke={C.ink} strokeWidth="2.5" strokeLinecap="round" />
      {[
        [12, 18],
        [24, 30],
        [36, 22],
        [48, 40],
      ].map(([x, h], i) => (
        <rect key={x} className="sg-grow" style={d(i * 0.25)} x={x} y={54 - h} width="8" height={h} rx="2" fill={i === 3 ? C.green : C.iris} />
      ))}
    </Icon>
  ),
];
