import { C, T, Screen } from "../../../components/screenbazaar/illustrations/kit";
import { Scene, Sticker, Person, Spark, SKIN, HAIR } from "./people";

/* Education artwork: campus corridor scene, stationery stickers, use-case icons. */

const d = (s) => ({ animationDelay: `${s}s` });
const first = (i) => (i === 0 ? { "data-first": "" } : {});
const CORK = "#C8A27A";

/* ---------- stickers ---------- */

export function PencilSticker({ size = 90, className = "" }) {
  return (
    <Sticker size={size} className={className}>
      <path className="sg-draw" d="M6 70q12-14 22-4t22-6 24-8" fill="none" stroke={C.violet} strokeWidth="3" strokeLinecap="round" />
      <g className="sg-rock">
        <g transform="rotate(35 48 30)">
          <rect x="40" y="0" width="16" height="44" rx="2" fill={C.gold} stroke={C.ink} strokeWidth="2.5" />
          <rect x="40" y="0" width="16" height="8" rx="2" fill={C.blush} stroke={C.ink} strokeWidth="2.5" />
          <path d="M40 44l8 14 8-14z" fill={C.sand} stroke={C.ink} strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M46 54l2 4 2-4z" fill={C.ink} />
        </g>
      </g>
    </Sticker>
  );
}

export function BookSticker({ size = 84, className = "" }) {
  return (
    <Sticker size={size} className={className}>
      <path d="M40 22C30 14 16 14 6 18v44c10-4 24-4 34 4 10-8 24-8 34-4V18c-10-4-24-4-34 4z" fill={C.white} stroke={C.ink} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M40 22v44" stroke={C.ink} strokeWidth="2" />
      <g transform="translate(40 22)">
        <g className="sg-sway" style={{ transformOrigin: "0% 50%", animationDuration: "2.4s" }}>
          <path d="M0 0c8-6 20-7 28-4v40c-8-3-20-2-28 4z" fill={C.lilac} stroke={C.ink} strokeWidth="2" />
        </g>
      </g>
      {[14, 22, 30].map((y) => (
        <path key={y} d={`M12 ${y + 10}h20`} stroke={C.line} strokeWidth="2" />
      ))}
    </Sticker>
  );
}

export function GradCapSticker({ size = 88, className = "" }) {
  return (
    <Sticker size={size} className={className}>
      <g className="sg-bob">
        <g className="sg-rock" style={{ animationDuration: "3.4s" }}>
          <path d="M40 14l36 14-36 14L4 28z" fill={C.indigo} stroke={C.ink} strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M20 36v14c0 6 40 6 40 0V36l-20 8z" fill={C.indigo} stroke={C.ink} strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M40 28l24 6v16" fill="none" stroke={C.gold} strokeWidth="2.5" />
          <circle cx="64" cy="54" r="4" fill={C.gold} stroke={C.ink} strokeWidth="1.5" />
        </g>
      </g>
    </Sticker>
  );
}

export function AtomSticker({ size = 80, className = "" }) {
  return (
    <Sticker size={size} className={className}>
      <g className="sg-spin">
        {[0, 60, 120].map((a) => (
          <ellipse key={a} cx="40" cy="40" rx="32" ry="12" fill="none" stroke={C.violet} strokeWidth="3" transform={`rotate(${a} 40 40)`} />
        ))}
      </g>
      <circle cx="40" cy="40" r="7" fill={C.gold} stroke={C.ink} strokeWidth="2" />
    </Sticker>
  );
}

/* ---------- scene: a campus corridor ---------- */

const NOTICES = [
  { k: "EVENTS", t: "Annual Fest", s: "Auditorium · Fri 4 PM", bg: C.violet, fg: C.white },
  { k: "UPDATED", t: "Seminar → 2 PM", s: "Moved to Auditorium", bg: C.gold, fg: C.ink },
  { k: "SPORTS", t: "Trials today", s: "Ground · 3:30 PM", bg: C.indigo, fg: C.white },
];

export function CampusScene() {
  return (
    <Scene label="A school corridor: students point at a wall screen showing the latest notices while paper notes on the cork board flutter and a paper plane glides past">
      <rect width="480" height="360" fill="#FBFAF7" />
      {Array.from({ length: 10 }, (_, i) => (
        <path key={i} d={`M0 ${24 + i * 26}h480`} stroke={C.mist} strokeWidth="1" />
      ))}
      {/* lockers */}
      {Array.from({ length: 4 }, (_, i) => (
        <g key={i}>
          <rect x={372 + (i % 2) * 50} y={130 + Math.floor(i / 2) * 84} width="46" height="80" rx="4" fill={i % 3 ? C.lilac : C.violet} stroke={C.ink} strokeWidth="2" />
          {[0, 1, 2].map((k) => (
            <path key={k} d={`M${382 + (i % 2) * 50} ${142 + Math.floor(i / 2) * 84 + k * 6}h24`} stroke={C.ink} strokeWidth="1.5" opacity="0.4" />
          ))}
          <rect x={406 + (i % 2) * 50} y={176 + Math.floor(i / 2) * 84} width="4" height="12" rx="2" fill={C.ink} />
        </g>
      ))}
      {/* cork board */}
      <rect x="20" y="60" width="120" height="120" rx="6" fill={CORK} stroke="#8B5E3C" strokeWidth="6" />
      {[
        [34, 74, "#FFF9C4", -6],
        [84, 78, C.white, 5],
        [40, 124, C.blush, 4],
        [90, 126, "#E0F2FE", -4],
      ].map(([x, y, f, r], i) => (
        <g key={i} transform={`translate(${x + 18} ${y})`}>
          <g className="sg-sway" style={{ ...d(i * 0.6), animationDuration: "2.8s" }}>
            <rect x="-18" y="0" width="36" height="40" fill={f} transform={`rotate(${r})`} />
            <circle cx="0" cy="4" r="3.5" fill={["#EF4444", C.violet, C.green, C.indigo][i]} stroke={C.ink} strokeWidth="1" />
            <path d="M-10 18h20M-10 26h14" stroke={C.slate} strokeWidth="2" opacity="0.4" />
          </g>
        </g>
      ))}
      {/* notice screen */}
      <Screen x={164} y={56} w={190} h={112} r={10}>
        {NOTICES.map((n, i) => (
          <g key={n.k} className="sb-c3" style={d(i * 2.5)} {...first(i)}>
            <rect width="182" height="104" fill={n.bg} />
            <rect x="12" y="14" width="56" height="16" rx="8" fill={n.fg} opacity="0.2" />
            <T x="40" y="26" anchor="middle" size={8} weight={800} fill={n.fg}>{n.k}</T>
            <T x="12" y="60" size={17} weight={800} fill={n.fg}>{n.t}</T>
            <T x="12" y="80" size={10} weight={700} fill={n.fg} opacity="0.85">{n.s}</T>
          </g>
        ))}
      </Screen>
      {/* floor */}
      <rect y="300" width="480" height="60" fill={C.sand} />
      <path d="M0 300h480" stroke={C.ink} strokeWidth="2" />
      {/* students */}
      <Person x={200} y={336} s={1} top={C.indigo} bottom={C.ink} hairStyle="curly" hair={HAIR[0]} skin={SKIN[3]} pose="point">
        <rect x="-22" y="-80" width="12" height="30" rx="4" fill={C.gold} stroke={C.ink} strokeWidth="1.5" />
      </Person>
      <Person x={276} y={340} s={0.95} flip top={C.blush} bottom={C.indigo} hairStyle="long" hair={HAIR[3]} skin={SKIN[0]} pose="hold" />
      <g className="sg-walk" style={d(-5)}>
        <Person x={0} y={352} s={0.85} walk top={C.green} bottom={C.slate} hairStyle="cap" hair={C.violet} skin={SKIN[1]} />
      </g>
      {/* paper plane */}
      <g className="sg-fly">
        <path d="M60 40l40 12-40 12 8-12z" fill={C.white} stroke={C.ink} strokeWidth="2" strokeLinejoin="round" />
        <path d="M68 52h32" stroke={C.ink} strokeWidth="1.5" />
      </g>
      <Spark x={372} y={100} r={9} />
      <Spark x={150} y={200} r={6} fill={C.violet} delay={1.1} />
    </Scene>
  );
}

/* ---------- use-case icons ---------- */

function Icon({ children }) {
  return (
    <svg viewBox="0 0 64 64" className="sb-anim sg-icon h-12 w-12" aria-hidden="true">
      {children}
    </svg>
  );
}

export const EDUCATION_ICONS = [
  // Announce events
  () => (
    <Icon>
      <path d="M12 58V8" stroke={C.ink} strokeWidth="3.5" strokeLinecap="round" />
      <g transform="translate(12 10)">
        <g className="sg-sway" style={{ transformOrigin: "0% 50%" }}>
          <path d="M0 0h40l-8 12 8 12H0z" fill={C.violet} stroke={C.ink} strokeWidth="2.5" strokeLinejoin="round" />
        </g>
      </g>
    </Icon>
  ),
  // Display schedules
  () => (
    <Icon>
      <rect x="6" y="10" width="52" height="46" rx="5" fill={C.white} stroke={C.ink} strokeWidth="2.5" />
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3].map((c) => <rect key={`${r}${c}`} x={12 + c * 11} y={20 + r * 11} width="8" height="8" rx="2" fill={C.line} />)
      )}
      <g className="sg-nudge" style={{ animationDuration: "2.2s" }}>
        <rect x="22" y="30" width="10" height="10" rx="2" fill={C.gold} stroke={C.ink} strokeWidth="1.5" />
      </g>
    </Icon>
  ),
  // Share important notices
  () => (
    <Icon>
      <g className="sg-rock">
        <rect x="12" y="10" width="40" height="46" fill="#FFF9C4" stroke={C.ink} strokeWidth="2.5" />
        <path d="M18 26h28M18 34h28M18 42h18" stroke={C.slate} strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="32" cy="12" r="5" fill="#EF4444" stroke={C.ink} strokeWidth="1.5" />
      </g>
    </Icon>
  ),
  // Promote activities
  () => (
    <Icon>
      <g className="sg-pop">
        <path d="M18 8h28v14a14 14 0 0 1-28 0z" fill={C.gold} stroke={C.ink} strokeWidth="2.5" />
        <path d="M18 12H8c0 10 6 14 10 14M46 12h10c0 10-6 14-10 14" fill="none" stroke={C.ink} strokeWidth="2.5" />
      </g>
      <path d="M28 36h8v10h-8z" fill={C.gold} stroke={C.ink} strokeWidth="2" />
      <rect x="18" y="46" width="28" height="10" rx="2" fill={C.indigo} stroke={C.ink} strokeWidth="2" />
    </Icon>
  ),
  // Communicate campus information
  () => (
    <Icon>
      <path d="M6 16l16-6 20 6 16-6v38l-16 6-20-6-16 6z" fill={C.lilac} stroke={C.ink} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M22 10v38M42 16v38" stroke={C.ink} strokeWidth="1.5" opacity="0.4" />
      <g className="sg-drop">
        <path d="M32 40c-6-7-9-11-9-15a9 9 0 0 1 18 0c0 4-3 8-9 15z" fill={C.violet} stroke={C.ink} strokeWidth="2" />
        <circle cx="32" cy="25" r="3" fill={C.white} />
      </g>
    </Icon>
  ),
];
