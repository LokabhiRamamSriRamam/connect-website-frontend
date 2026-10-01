import { C, T, Screen } from "../../../components/screenbazaar/illustrations/kit";
import { Scene, Sticker, Person, Spark, SKIN, HAIR } from "./people";

/* Fitness & Wellness artwork: gym floor scene, workout stickers, use-case icons. Palette: ink, violet, gold. */

const d = (s) => ({ animationDelay: `${s}s` });
const first = (i) => (i === 0 ? { "data-first": "" } : {});

/* ---------- stickers ---------- */

export function DumbbellSticker({ size = 90, className = "" }) {
  return (
    <Sticker size={size} className={className}>
      <g className="sg-lift">
        <g transform="rotate(-20 40 40)">
          <rect x="18" y="37" width="44" height="6" rx="3" fill={C.slate} stroke={C.ink} strokeWidth="1.5" />
          <rect x="8" y="24" width="12" height="32" rx="4" fill={C.violet} stroke={C.ink} strokeWidth="2.5" />
          <rect x="60" y="24" width="12" height="32" rx="4" fill={C.violet} stroke={C.ink} strokeWidth="2.5" />
          <rect x="2" y="30" width="8" height="20" rx="3" fill={C.gold} stroke={C.ink} strokeWidth="2" />
          <rect x="70" y="30" width="8" height="20" rx="3" fill={C.gold} stroke={C.ink} strokeWidth="2" />
        </g>
      </g>
    </Sticker>
  );
}

export function BoltSticker({ size = 70, className = "" }) {
  return (
    <Sticker size={size} className={className}>
      <g className="sg-pop">
        <path d="M46 4L14 46h22l-6 30 36-44H42z" fill={C.gold} stroke={C.ink} strokeWidth="3" strokeLinejoin="round" />
      </g>
    </Sticker>
  );
}

export function BottleSticker({ size = 76, className = "" }) {
  return (
    <Sticker size={size} className={className}>
      <g className="sg-rock">
        <rect x="32" y="4" width="16" height="8" rx="2" fill={C.ink} />
        <path d="M30 12h20v8l6 8v44a6 6 0 0 1-6 6H30a6 6 0 0 1-6-6V28l6-8z" fill={C.lilac} stroke={C.ink} strokeWidth="2.5" strokeLinejoin="round" />
        <rect x="24" y="40" width="32" height="20" fill={C.violet} />
        {[0, 1, 2].map((i) => (
          <circle key={i} className="sg-rise" style={d(i * 0.8)} cx={34 + i * 6} cy="70" r="2" fill={C.white} />
        ))}
      </g>
    </Sticker>
  );
}

export function StopwatchSticker({ size = 78, className = "" }) {
  return (
    <Sticker size={size} className={className}>
      <rect x="34" y="4" width="12" height="8" rx="2" fill={C.ink} />
      <circle cx="40" cy="46" r="30" fill={C.white} stroke={C.ink} strokeWidth="3" />
      <path d="M40 46V20a26 26 0 0 1 22 13z" fill={C.violet} opacity="0.25" />
      <rect className="sg-hand" style={{ animationDuration: "2s" }} x="38.5" y="24" width="3" height="22" rx="1.5" fill="#EF4444" />
      <circle cx="40" cy="46" r="4" fill={C.ink} />
    </Sticker>
  );
}

/* ---------- scene: evening at the gym ---------- */

const CLASSES = [
  { k: "UP NEXT", t: "HIIT 30", s: "Floor · 6:30 PM", bg: C.violet },
  { k: "STUDIO A", t: "ZUMBA", s: "7:30 PM · 4 spots left", bg: C.indigo },
  { k: "OFFER", t: "BRING A FRIEND", s: "Joining fee waived", bg: "#B7791F" },
];

export function GymScene() {
  return (
    <Scene label="A gym floor at night: a runner on a treadmill and a member lifting dumbbells in front of a wall screen showing the next class">
      <rect width="480" height="360" fill="#101014" />
      {/* hazard stripe band */}
      <g opacity="0.25">
        {Array.from({ length: 22 }, (_, i) => (
          <path key={i} d={`M${i * 24 - 20} 250l20-20h12l-20 20z`} fill={C.gold} />
        ))}
      </g>
      {/* wall screen */}
      <Screen x={130} y={40} w={220} h={124} r={10} bezel="#000">
        {CLASSES.map((c, i) => (
          <g key={c.k} className="sb-c3" style={d(i * 2.5)} {...first(i)}>
            <rect width="212" height="116" fill={c.bg} />
            <T x="14" y="26" size={9} weight={800} fill={C.gold} letterSpacing="2">{c.k}</T>
            <T x="14" y="62" size={c.t.length > 10 ? 18 : 26} weight={800} fill={C.white}>{c.t}</T>
            <T x="14" y="84" size={10} weight={700} fill={C.white} opacity="0.8">{c.s}</T>
          </g>
        ))}
      </Screen>
      <path className="sg-ecg" d="M130 186h70l8-14 10 26 9-20 7 8h126" fill="none" stroke={C.violet} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {/* floor */}
      <rect y="300" width="480" height="60" fill="#1c1c24" />
      {/* treadmill + runner */}
      <g>
        <path d="M40 300l24-60h8l-18 56" fill="none" stroke={C.slate} strokeWidth="6" strokeLinecap="round" />
        <rect x="56" y="232" width="30" height="12" rx="4" fill={C.slate} />
        <rect className="sg-flicker" x="60" y="235" width="22" height="6" rx="2" fill={C.green} />
        <rect x="40" y="296" width="130" height="12" rx="6" fill={C.slate} />
        <rect x="46" y="298" width="118" height="8" rx="4" fill="#333" />
        <g className="sg-bob" style={{ animationDuration: "0.7s" }}>
          <Person x={112} y={298} s={0.95} walk top={C.violet} bottom={C.ink} hairStyle="bun" hair={HAIR[2]} skin={SKIN[1]} pose="hold" />
        </g>
      </g>
      {/* lifter */}
      <Person x={360} y={320} s={1.05} top={C.gold} bottom={C.indigo} hairStyle="short" hair={HAIR[0]} skin={SKIN[3]} pose="lift" armClass="sg-lift" />
      <g className="sg-lift">
        <g transform={`translate(${360 + 11.5 * 1.05} ${320 - 110 * 1.05})`}>
          <rect x="-18" y="-3" width="36" height="6" rx="3" fill={C.slate} />
          <rect x="-24" y="-10" width="8" height="20" rx="3" fill={C.violet} stroke={C.ink} strokeWidth="1.5" />
          <rect x="16" y="-10" width="8" height="20" rx="3" fill={C.violet} stroke={C.ink} strokeWidth="1.5" />
        </g>
      </g>
      {/* kettlebells */}
      {[420, 448].map((x, i) => (
        <g key={x}>
          <path d={`M${x - 6} 304a6 6 0 0 1 12 0`} fill="none" stroke={C.ink} strokeWidth="3" />
          <circle cx={x} cy="314" r="11" fill={i ? C.gold : C.violet} stroke={C.ink} strokeWidth="1.5" />
        </g>
      ))}
      <Spark x={404} y={60} r={10} />
      <Spark x={80} y={90} r={7} fill={C.violet} delay={0.9} />
    </Scene>
  );
}

/* ---------- use-case icons ---------- */

function Icon({ children }) {
  return (
    <svg viewBox="0 0 64 64" className="sb-anim sg-icon h-11 w-11 shrink-0" aria-hidden="true">
      {children}
    </svg>
  );
}

export const FITNESS_ICONS = [
  // Display class schedules
  () => (
    <Icon>
      <rect x="8" y="12" width="48" height="44" rx="6" fill={C.white} stroke={C.ink} strokeWidth="2.5" />
      <rect x="8" y="12" width="48" height="12" rx="6" fill={C.violet} stroke={C.ink} strokeWidth="2.5" />
      <path className="sg-check" d="M22 40l6 6 14-14" fill="none" stroke={C.green} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  ),
  // Promote memberships
  () => (
    <Icon>
      <g className="sg-rock">
        <rect x="6" y="16" width="52" height="34" rx="6" fill={C.gold} stroke={C.ink} strokeWidth="2.5" />
        <rect x="6" y="24" width="52" height="7" fill={C.ink} />
        <rect x="12" y="38" width="20" height="5" rx="2.5" fill={C.ink} opacity="0.5" />
        <circle cx="48" cy="41" r="4" fill={C.violet} />
      </g>
    </Icon>
  ),
  // Share fitness content
  () => (
    <Icon>
      <rect x="6" y="10" width="52" height="36" rx="6" fill={C.ink} />
      <g className="sg-pop">
        <path d="M27 20l14 8-14 8z" fill={C.gold} />
      </g>
      {[10, 20, 30, 40, 50].map((x, i) => (
        <rect key={x} className="sg-grow" style={d(i * 0.2)} x={x - 3} y="50" width="6" height="10" rx="2" fill={C.violet} />
      ))}
    </Icon>
  ),
  // Highlight trainers and programs
  () => (
    <Icon>
      <path d="M22 4l10 20 10-20" fill="none" stroke={C.indigo} strokeWidth="5" strokeLinejoin="round" />
      <g transform="translate(32 24)">
        <g className="sg-sway">
          <circle cx="0" cy="18" r="14" fill={C.gold} stroke={C.ink} strokeWidth="2.5" />
          <path d="M0 10l2.5 5 5.5.8-4 3.9 1 5.5L0 22.6l-5 2.6 1-5.5-4-3.9 5.5-.8z" fill={C.white} />
        </g>
      </g>
    </Icon>
  ),
  // Promote partner brands
  () => (
    <Icon>
      <g className="sg-nudge">
        <path d="M6 46c0-8 4-14 10-18l10-8c4 6 12 8 18 6l10 8c4 3 6 8 6 12v4H6z" fill={C.violet} stroke={C.ink} strokeWidth="2.5" strokeLinejoin="round" />
        <rect x="4" y="48" width="56" height="8" rx="4" fill={C.white} stroke={C.ink} strokeWidth="2" />
        <path d="M22 34l4 4M28 30l4 4" stroke={C.white} strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </Icon>
  ),
];
