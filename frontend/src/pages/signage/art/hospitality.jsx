import { C, T, Screen } from "../../../components/screenbazaar/illustrations/kit";
import { Scene, Sticker, Person, Spark, SKIN, HAIR } from "./people";

/* Hospitality artwork: evening hotel lobby, concierge stickers, use-case icons. Palette: deep indigo + gold. */

const d = (s) => ({ animationDelay: `${s}s` });
const first = (i) => (i === 0 ? { "data-first": "" } : {});
const NIGHT = "#141a4a";

/* ---------- stickers ---------- */

export function BellSticker({ size = 84, className = "" }) {
  return (
    <Sticker size={size} className={className}>
      <g className="sg-rock">
        <circle cx="40" cy="18" r="4" fill={C.gold} stroke={C.ink} strokeWidth="2" />
        <path d="M12 56a28 28 0 0 1 56 0z" fill={C.gold} stroke={C.ink} strokeWidth="2.5" />
        <path d="M24 44a18 18 0 0 1 10-12" fill="none" stroke={C.white} strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      </g>
      <rect x="6" y="56" width="68" height="8" rx="4" fill={C.ink} />
      {[0, 1].map((i) => (
        <path key={i} className="sg-twinkle" style={d(i * 0.4)} d={i ? "M66 20l6-6" : "M14 20l-6-6"} stroke={C.ink} strokeWidth="3" strokeLinecap="round" />
      ))}
    </Sticker>
  );
}

export function KeySticker({ size = 80, className = "" }) {
  return (
    <Sticker size={size} className={className}>
      <g className="sg-sway">
        <path d="M40 2v10" stroke={C.ink} strokeWidth="2" />
        <circle cx="40" cy="20" r="10" fill="none" stroke={C.gold} strokeWidth="5" />
        <path d="M40 30v36M40 52h8M40 60h6" stroke={C.gold} strokeWidth="5" strokeLinecap="round" />
        <rect x="26" y="36" width="28" height="12" rx="3" fill={C.violet} stroke={C.ink} strokeWidth="2" transform="rotate(-8 40 42)" />
      </g>
    </Sticker>
  );
}

export function SuitcaseSticker({ size = 78, className = "" }) {
  return (
    <Sticker size={size} className={className}>
      <g className="sg-bob">
        <path d="M30 20v-6a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v6" fill="none" stroke={C.ink} strokeWidth="3" />
        <rect x="12" y="20" width="56" height="44" rx="8" fill={C.violet} stroke={C.ink} strokeWidth="2.5" />
        <path d="M28 20v44M52 20v44" stroke={C.ink} strokeWidth="2" />
        <circle cx="40" cy="42" r="8" fill={C.gold} stroke={C.ink} strokeWidth="2" />
        <circle cx="22" cy="70" r="4" fill={C.ink} />
        <circle cx="58" cy="70" r="4" fill={C.ink} />
      </g>
    </Sticker>
  );
}

export function StarsSticker({ size = 96, className = "" }) {
  return (
    <Sticker size={size} className={className} viewBox="0 0 120 40">
      <rect x="2" y="4" width="116" height="32" rx="16" fill={C.white} stroke={C.ink} strokeWidth="2.5" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} transform={`translate(${22 + i * 19} 20)`}>
          <g className="sg-pop" style={d(i * 0.2)}>
            <path d="M0-8l2.4 5 5.6.8-4 3.9 1 5.5L0 4.6-5 7.2l1-5.5-4-3.9 5.6-.8z" fill={C.gold} stroke={C.ink} strokeWidth="1.2" />
          </g>
        </g>
      ))}
    </Sticker>
  );
}

/* ---------- scene: the lobby at dusk ---------- */

const WELCOME = [
  { k: "GOOD EVENING", t: "Welcome, Mehta family", s: "Room 412 is ready" },
  { k: "TONIGHT", t: "Sunset jazz", s: "Terrace · 7:30 PM" },
  { k: "POOL", t: "Open till 9 PM", s: "Level 3 · towels inside" },
];

export function LobbyScene() {
  return (
    <Scene label="An evening hotel lobby: a guest walks in with a suitcase, the receptionist waves, and a wall screen welcomes them by name">
      <rect width="480" height="360" fill={NIGHT} />
      {/* arched windows with stars */}
      {[40, 380].map((x) => (
        <g key={x}>
          <path d={`M${x} 200V90a30 30 0 0 1 60 0v110z`} fill="#1F30A0" stroke={C.gold} strokeWidth="2" />
          {[0, 1, 2].map((k) => (
            <circle key={k} className="sg-twinkle" style={d(k * 0.7 + x / 200)} cx={x + 14 + k * 16} cy={96 + (k % 2) * 30} r="2" fill={C.gold} />
          ))}
          <path className="sg-bob" d={`M${x + 36} 112a10 10 0 1 0 8 16 8 8 0 0 1-8-16z`} fill={C.gold} opacity="0.8" />
        </g>
      ))}
      {/* chandelier */}
      <g transform="translate(240 0)">
        <g className="sg-sway" style={{ animationDuration: "5s" }}>
          <path d="M0 0v22" stroke={C.gold} strokeWidth="2" />
          <path d="M-34 30h68l-10 12h-48z" fill={C.gold} stroke={C.ink} strokeWidth="1.5" />
          {[-28, -14, 0, 14, 28].map((x, i) => (
            <g key={x}>
              <path d={`M${x} 42v8`} stroke={C.gold} strokeWidth="1.5" />
              <circle className="sg-flicker" style={d(i * 0.3)} cx={x} cy="54" r="4" fill="#FFF3C4" />
            </g>
          ))}
        </g>
      </g>
      {/* welcome screen */}
      <Screen x={140} y={80} w={200} h={112} r={10} bezel="#0b0f33">
        {WELCOME.map((w, i) => (
          <g key={w.k} className="sb-c3" style={d(i * 2.5)} {...first(i)}>
            <rect width="192" height="104" fill={C.indigo} />
            <circle cx="170" cy="20" r="40" fill={C.violet} opacity="0.5" />
            <T x="14" y="28" size={8} weight={800} fill={C.gold} letterSpacing="2">{w.k}</T>
            <T x="14" y="56" size={w.t.length > 16 ? 13 : 17} weight={800} fill={C.white}>{w.t}</T>
            <T x="14" y="78" size={10} weight={700} fill={C.white} opacity="0.75">{w.s}</T>
          </g>
        ))}
      </Screen>
      {/* floor */}
      <rect y="262" width="480" height="98" fill="#0e1238" />
      {[290, 320, 350].map((y) => (
        <path key={y} d={`M0 ${y}h480`} stroke={C.gold} strokeOpacity="0.15" />
      ))}
      {/* receptionist behind the desk */}
      <Person x={330} y={296} s={0.95} flip top={C.violet} bottom={C.ink} hairStyle="bun" hair={HAIR[0]} skin={SKIN[2]} pose="wave" />
      <rect x="250" y="240" width="160" height="60" rx="6" fill={C.gold} stroke={C.ink} strokeWidth="2" />
      <rect x="250" y="240" width="160" height="10" fill="#B7791F" />
      <g transform="translate(386 240)">
        <path d="M-10 0a10 10 0 0 1 20 0z" fill={C.white} stroke={C.ink} strokeWidth="1.5" />
      </g>
      {/* palm */}
      <g transform="translate(440 300)">
        <rect x="-14" y="0" width="28" height="30" rx="4" fill={C.gold} stroke={C.ink} strokeWidth="1.5" />
        <g className="sg-rock">
          <path d="M0 0V-50" stroke="#6B4226" strokeWidth="4" />
          {[-60, -25, 15, 50].map((a) => (
            <path key={a} d="M0-50c10-4 24-2 32 6-12-1-22 0-32-6z" fill={C.green} transform={`rotate(${a} 0 -50)`} />
          ))}
        </g>
      </g>
      {/* guest walks in with a suitcase */}
      <g className="sg-walk-in">
        <Person x={110} y={346} s={1.05} top={C.gold} bottom={C.indigo} hairStyle="short" hair={HAIR[1]} skin={SKIN[0]} walk pose="stand" />
        <rect x="126" y="296" width="30" height="40" rx="5" fill={C.violet} stroke={C.ink} strokeWidth="2" />
        <path d="M134 296v-8h14v8" fill="none" stroke={C.ink} strokeWidth="2" />
        <circle cx="132" cy="340" r="3" fill={C.ink} />
        <circle cx="150" cy="340" r="3" fill={C.ink} />
      </g>
      <Spark x={120} y={40} r={9} />
      <Spark x={370} y={220} r={6} delay={1} />
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

export const HOSPITALITY_ICONS = {
  // keyed by the journey stop, so each stop keeps its own icon
  Lobby: () => (
    <Icon>
      <g transform="translate(16 50)">
        <g className="sg-wave">
          <path d="M0 0v-30a5 5 0 0 1 10 0v-6a5 5 0 0 1 10 0v4a5 5 0 0 1 10 0v6a5 5 0 0 1 10 0v18c0 12-8 20-20 20H10C4 12 0 6 0 0z" fill={C.gold} stroke={C.ink} strokeWidth="2.5" strokeLinejoin="round" />
        </g>
      </g>
    </Icon>
  ),
  "Spa & pool": () => (
    <Icon>
      <path d="M20 8v34M44 8v34M20 18h24M20 30h24" stroke={C.ink} strokeWidth="3" strokeLinecap="round" />
      {[44, 54].map((y, i) => (
        <path key={y} className="sg-nudge" style={d(i * 0.4)} d={`M4 ${y}q7-6 14 0t14 0 14 0 14 0`} fill="none" stroke={C.indigo} strokeWidth="3.5" strokeLinecap="round" />
      ))}
    </Icon>
  ),
  Terrace: () => (
    <Icon>
      <rect x="8" y="14" width="48" height="42" rx="6" fill={C.white} stroke={C.ink} strokeWidth="2.5" />
      <rect x="8" y="14" width="48" height="12" rx="6" fill={C.violet} stroke={C.ink} strokeWidth="2.5" />
      <path d="M20 8v10M44 8v10" stroke={C.ink} strokeWidth="3" strokeLinecap="round" />
      <g className="sg-pop">
        <path d="M32 32l3 6 6 1-4.5 4 1 6-5.5-3-5.5 3 1-6-4.5-4 6-1z" fill={C.gold} stroke={C.ink} strokeWidth="1.5" />
      </g>
    </Icon>
  ),
  Restaurant: () => (
    <Icon>
      <circle cx="32" cy="36" r="20" fill={C.white} stroke={C.ink} strokeWidth="2.5" />
      <circle cx="32" cy="36" r="12" fill={C.lilac} />
      <g className="sg-rock">
        <path d="M6 10v16M2 10v8a4 4 0 0 0 8 0v-8M6 26v30" stroke={C.ink} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </g>
      <g className="sg-rock" style={d(-1.3)}>
        <path d="M58 10c-6 4-6 14 0 18v28" stroke={C.ink} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </g>
    </Icon>
  ),
  Corridor: () => (
    <Icon>
      <path d="M32 6v52" stroke={C.ink} strokeWidth="3" strokeLinecap="round" />
      <g className="sg-nudge">
        <path d="M32 12h20l6 6-6 6H32z" fill={C.gold} stroke={C.ink} strokeWidth="2" strokeLinejoin="round" />
      </g>
      <g className="sg-nudge" style={{ animationDirection: "reverse" }}>
        <path d="M32 30H12l-6 6 6 6h20z" fill={C.violet} stroke={C.ink} strokeWidth="2" strokeLinejoin="round" />
      </g>
    </Icon>
  ),
};
