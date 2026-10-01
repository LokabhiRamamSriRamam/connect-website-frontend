import { C, T, Screen } from "../../../components/screenbazaar/illustrations/kit";
import { Scene, Sticker, Person, Spark, SKIN, HAIR } from "./people";

/* Restaurants & Cafés artwork: café counter scene, food stickers, use-case icons. */

const d = (s) => ({ animationDelay: `${s}s` });
const first = (i) => (i === 0 ? { "data-first": "" } : {});

/* ---------- stickers ---------- */

export function CoffeeSticker({ size = 80, className = "" }) {
  return (
    <Sticker size={size} className={className}>
      {[30, 40, 50].map((x, i) => (
        <path key={x} className="sg-rise" style={d(i * 0.6)} d={`M${x} 26q-4-6 0-12t0-12`} fill="none" stroke={C.slate} strokeWidth="2.5" strokeLinecap="round" />
      ))}
      <path d="M16 32h44v18a18 18 0 0 1-18 18h-8a18 18 0 0 1-18-18z" fill={C.white} stroke={C.ink} strokeWidth="2.5" />
      <path d="M60 38h4a8 8 0 0 1 0 16h-5" fill="none" stroke={C.ink} strokeWidth="2.5" />
      <path d="M16 40h44" stroke={C.violet} strokeWidth="5" />
      <ellipse cx="38" cy="72" rx="26" ry="4" fill={C.ink} opacity="0.15" />
    </Sticker>
  );
}

export function CroissantSticker({ size = 84, className = "" }) {
  return (
    <Sticker size={size} className={className}>
      <g className="sg-rock">
        <path d="M8 50c4-20 20-32 32-32s28 12 32 32c-6-4-12-4-16-2-4-10-10-14-16-14s-12 4-16 14c-4-2-10-2-16 2z" fill={C.gold} stroke={C.ink} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M26 36l6 12M40 32v14M54 36l-6 12" stroke="#B7791F" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </Sticker>
  );
}

export function ClockSticker({ size = 72, className = "" }) {
  return (
    <Sticker size={size} className={className}>
      <circle cx="40" cy="40" r="32" fill={C.lilac} stroke={C.ink} strokeWidth="3" />
      {Array.from({ length: 12 }, (_, i) => (
        <path key={i} d="M40 12v5" stroke={C.ink} strokeWidth="2" transform={`rotate(${i * 30} 40 40)`} />
      ))}
      <g>
        <rect className="sg-tick" x="38.5" y="22" width="3" height="18" rx="1.5" fill={C.ink} />
      </g>
      <rect className="sg-hand" x="39" y="14" width="2" height="26" rx="1" fill={C.violet} />
      <circle cx="40" cy="40" r="3.5" fill={C.gold} stroke={C.ink} strokeWidth="1.5" />
    </Sticker>
  );
}

export function ChefHatSticker({ size = 76, className = "" }) {
  return (
    <Sticker size={size} className={className}>
      <g className="sg-bob">
        <path d="M22 46a14 14 0 0 1 2-27 16 16 0 0 1 32 0 14 14 0 0 1 2 27z" fill={C.white} stroke={C.ink} strokeWidth="2.5" strokeLinejoin="round" />
        <rect x="22" y="46" width="36" height="16" rx="3" fill={C.white} stroke={C.ink} strokeWidth="2.5" />
        <path d="M32 46v16M48 46v16" stroke={C.line} strokeWidth="2" />
      </g>
    </Sticker>
  );
}

/* ---------- scene: café counter under a menu board that follows the clock ---------- */

const MENUS = [
  { k: "BREAKFAST", items: [["Masala Omelette", "₹149"], ["Filter Coffee", "₹60"]], bg: C.ivory, fg: C.ink, sun: true },
  { k: "LUNCH", items: [["Lunch Thali", "₹249"], ["Paneer Bowl", "₹219"]], bg: C.gold, fg: C.ink, sun: true },
  { k: "DINNER", items: [["Chef's Special", "₹399"], ["Live music", "9 PM"]], bg: C.indigo, fg: C.white, sun: false },
];

export function CafeScene() {
  return (
    <Scene label="A café counter with a barista, steaming coffee and a customer pointing at a menu board that switches from breakfast to lunch to dinner">
      <rect width="480" height="360" fill={C.ivory} />
      <rect y="0" width="480" height="230" fill="#F6F2EA" />
      {/* brick hints */}
      {Array.from({ length: 12 }, (_, i) => (
        <rect key={i} x={(i % 4) * 120 + (Math.floor(i / 4) % 2) * 60 + 10} y={30 + Math.floor(i / 4) * 60} width="50" height="14" rx="3" fill={C.taupe} opacity="0.25" />
      ))}
      {/* hanging lamps */}
      {[70, 240, 410].map((x, i) => (
        <g key={x} transform={`translate(${x} 0)`}>
          <g className="sg-sway" style={d(i * 0.5)}>
            <path d="M0 0v34" stroke={C.ink} strokeWidth="2" />
            <path d="M-16 50a16 16 0 0 1 32 0z" fill={i === 1 ? C.violet : C.indigo} stroke={C.ink} strokeWidth="2" />
            <ellipse className="sg-flicker" cx="0" cy="56" rx="10" ry="5" fill={C.gold} />
          </g>
        </g>
      ))}
      {/* menu board */}
      <Screen x={130} y={70} w={220} h={120} r={10}>
        {MENUS.map((m, i) => (
          <g key={m.k} className="sb-c3" style={d(i * 2.5)} {...first(i)}>
            <rect width="212" height="112" fill={m.bg} />
            {m.sun ? <circle cx="186" cy="26" r="12" fill={i === 0 ? C.gold : C.white} opacity="0.9" /> : <path d="M186 14a12 12 0 1 0 8 20 10 10 0 0 1-8-20z" fill={C.gold} />}
            <T x="14" y="30" size={17} weight={800} fill={m.fg}>{m.k}</T>
            {m.items.map(([n, p], k) => (
              <g key={n}>
                <T x="14" y={60 + k * 24} size={11} weight={700} fill={m.fg}>{n}</T>
                <T x="198" y={60 + k * 24} size={11} weight={800} fill={m.fg} anchor="end">{p}</T>
              </g>
            ))}
          </g>
        ))}
      </Screen>
      {/* barista behind the counter */}
      <Person x={250} y={300} s={0.95} top={C.indigo} bottom={C.ink} hairStyle="cap" hair={C.violet} skin={SKIN[2]} pose="hold" />
      {/* counter */}
      <rect x="0" y="250" width="480" height="18" fill={C.ink} />
      <rect x="0" y="268" width="480" height="92" fill={C.sand} />
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x={i * 60 + 6} y="278" width="48" height="72" rx="4" fill="none" stroke={C.taupe} strokeWidth="2" />
      ))}
      {/* coffee machine + steam */}
      <rect x="40" y="198" width="64" height="52" rx="6" fill={C.slate} stroke={C.ink} strokeWidth="2" />
      <rect x="50" y="206" width="44" height="10" rx="3" fill={C.ink} />
      <circle cx="90" cy="232" r="4" fill={C.gold} />
      {[58, 70].map((x, i) => (
        <path key={x} className="sg-rise" style={d(i * 0.9)} d={`M${x} 194q-4-6 0-12t0-12`} fill="none" stroke={C.taupe} strokeWidth="3" strokeLinecap="round" />
      ))}
      {/* cups */}
      {[150, 176, 330].map((x, i) => (
        <g key={x}>
          <path d={`M${x} 234h18v12a4 4 0 0 1-4 4h-10a4 4 0 0 1-4-4z`} fill={C.white} stroke={C.ink} strokeWidth="1.5" />
          <path className="sg-rise" style={d(0.4 + i * 0.7)} d={`M${x + 9} 230q-3-5 0-10`} fill="none" stroke={C.taupe} strokeWidth="2" strokeLinecap="round" />
        </g>
      ))}
      {/* customer pointing at the board */}
      <Person x={420} y={356} s={1.05} flip top={C.violet} bottom={C.indigo} hairStyle="long" hair={HAIR[2]} skin={SKIN[0]} pose="point" />
      <Spark x={380} y={70} r={10} />
      <Spark x={110} y={110} r={7} fill={C.violet} delay={1} />
    </Scene>
  );
}

/* ---------- use-case icons ---------- */

function Icon({ children }) {
  return (
    <svg viewBox="0 0 64 64" className="sb-anim sg-icon h-12 w-12 shrink-0" aria-hidden="true">
      {children}
    </svg>
  );
}

export const RESTAURANT_ICONS = [
  // Promote today's specials
  () => (
    <Icon>
      <g className="sg-pop">
        <path d="M32 6l7 15 16 2-12 11 3 16-14-8-14 8 3-16L9 23l16-2z" fill={C.gold} stroke={C.ink} strokeWidth="2.5" strokeLinejoin="round" />
      </g>
    </Icon>
  ),
  // Change content by time of day
  () => (
    <Icon>
      <g className="sg-spin" style={{ animationDuration: "6s" }}>
        <path d="M32 10a22 22 0 0 1 0 44z" fill={C.indigo} />
        <path d="M32 10a22 22 0 0 0 0 44z" fill={C.gold} />
        <circle cx="42" cy="26" r="2" fill={C.white} />
        <circle cx="38" cy="40" r="1.5" fill={C.white} />
      </g>
      <circle cx="32" cy="32" r="22" fill="none" stroke={C.ink} strokeWidth="2.5" />
    </Icon>
  ),
  // Showcase new dishes
  () => (
    <Icon>
      <ellipse cx="32" cy="50" rx="26" ry="5" fill={C.white} stroke={C.ink} strokeWidth="2" />
      <circle cx="32" cy="44" r="6" fill={C.violet} />
      <g className="sg-lift">
        <path d="M10 44a22 22 0 0 1 44 0z" fill={C.lilac} stroke={C.ink} strokeWidth="2.5" />
        <circle cx="32" cy="20" r="3" fill={C.ink} />
      </g>
    </Icon>
  ),
  // Promote events and offers
  () => (
    <Icon>
      <path d="M8 56l12-34 22 22z" fill={C.violet} stroke={C.ink} strokeWidth="2.5" strokeLinejoin="round" />
      {[
        [44, 12, C.gold],
        [54, 26, C.blush],
        [36, 6, C.indigo],
        [56, 10, C.green],
      ].map(([x, y, f], i) => (
        <rect key={i} className="sg-twinkle" style={d(i * 0.35)} x={x} y={y} width="6" height="6" rx="1.5" fill={f} transform={`rotate(${i * 25} ${x + 3} ${y + 3})`} />
      ))}
    </Icon>
  ),
  // Run partner advertisements
  () => (
    <Icon>
      <rect x="6" y="12" width="52" height="34" rx="5" fill={C.ink} />
      <rect x="10" y="16" width="44" height="26" rx="3" fill={C.lavender} />
      <g className="sg-pop">
        <rect x="20" y="22" width="24" height="14" rx="7" fill={C.gold} stroke={C.ink} strokeWidth="1.5" />
        <text x="32" y="33" textAnchor="middle" fontFamily="Manrope" fontWeight="800" fontSize="10" fill={C.ink}>AD</text>
      </g>
      <rect x="28" y="46" width="8" height="8" fill={C.slate} />
      <rect x="20" y="53" width="24" height="4" rx="2" fill={C.slate} />
    </Icon>
  ),
];
