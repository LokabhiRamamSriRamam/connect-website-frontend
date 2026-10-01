import { C, Svg, T, Screen, Phone, Check } from "./kit";

/*
 * Testimonial scenes. Each takes `mode` ("before" | "now") and draws both layers;
 * the inactive one fades out (see .sb-tt-layer in sb.css).
 */

const d = (s) => ({ animationDelay: `${s}s` });
const first = (i) => (i === 0 ? { "data-first": "" } : {});

function Layer({ on, children }) {
  return (
    <g className="sb-tt-layer" data-on={on ? "true" : "false"} aria-hidden={!on}>
      {children}
    </g>
  );
}

/* Standing figure; (x, y) = feet. Animation classes go on the inner group. */
function Person({ x, y, s = 1, fill = C.violet, className, style }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className={className} style={style}>
        <path d="M-13 0v-18a13 13 0 0 1 26 0v18z" fill={fill} />
        <circle cx="0" cy="-42" r="9" fill={C.taupe} />
      </g>
    </g>
  );
}

/* Pill-shaped caption chip. */
function Chip({ x, y, w, fill = C.white, children }) {
  return (
    <g>
      <rect x={x + 3} y={y + 3} width={w} height="30" rx="15" fill={C.ink} />
      <rect x={x} y={y} width={w} height="30" rx="15" fill={fill} stroke={C.ink} strokeWidth="2" />
      {children}
    </g>
  );
}

function ClockIcon({ cx, cy, r = 7 }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.ink} strokeWidth="2" />
      <path d={`M${cx} ${cy - r * 0.55}V${cy}l${r * 0.45} ${r * 0.3}`} fill="none" stroke={C.ink} strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* 1 · Retail — three branches updated from one phone                  */
/* ------------------------------------------------------------------ */

const BRANCHES = [
  { name: "THANE", x: 160, y: 24 },
  { name: "DADAR", x: 280, y: 24 },
  { name: "BRANCH 3", x: 220, y: 150 },
];
const SW = 104;
const SH = 66;

const RETAIL_PROMOS = [
  { t: "MONSOON", s: "SALE · 30% OFF", bg: C.violet, fg: C.white, rain: true },
  { t: "FESTIVE", s: "New arrivals", bg: C.gold, fg: C.ink },
  { t: "WEEKEND", s: "Buy 2, get 1", bg: C.indigo, fg: C.white },
];

function BranchScreens({ children }) {
  return BRANCHES.map((b) => (
    <g key={b.name}>
      <Screen x={b.x} y={b.y} w={SW} h={SH} r={6}>
        {children}
      </Screen>
      <T x={b.x + SW / 2} y={b.y + SH + 14} size={10} weight={800} fill={C.slate} anchor="middle" letterSpacing="1.5">
        {b.name}
      </T>
    </g>
  ));
}

export function RetailStory({ mode }) {
  const iw = SW - 8;
  const ih = SH - 8;
  return (
    <Svg label="Before: pen drives carried between store screens and standees reprinted. Now: one phone updates the Thane, Dadar and third branch screens together.">
      {/* BEFORE */}
      <Layer on={mode === "before"}>
        <BranchScreens>
          <rect width={iw} height={ih} fill={C.mist} />
          <T x={iw / 2} y={ih / 2 + 4} size={12} weight={800} fill={C.muted} anchor="middle">
            OLD OFFER
          </T>
          <rect x={iw / 2 - 36} y={ih / 2} width="72" height="2.5" fill={C.alert} />
        </BranchScreens>

        {/* pen drive hopping from screen to screen */}
        <g className="sb-tt-usb">
          <rect x="200" y="112" width="26" height="12" rx="3" fill={C.violet} stroke={C.ink} strokeWidth="1.5" />
          <rect x="226" y="115" width="8" height="6" fill={C.taupe} stroke={C.ink} strokeWidth="1.2" />
        </g>

        {/* reprinted standee */}
        <g>
          <path d="M40 232l22-150M100 232l-22-150" stroke={C.taupe} strokeWidth="4" strokeLinecap="round" />
          <rect x="34" y="70" width="72" height="104" rx="4" fill={C.white} stroke={C.ink} strokeWidth="2" />
          <T x="70" y="104" size={14} weight={800} fill={C.alert} anchor="middle">SALE</T>
          <rect x="46" y="116" width="48" height="5" rx="2.5" fill={C.line} />
          <rect x="46" y="126" width="34" height="5" rx="2.5" fill={C.line} />
          <g className="sb-wiggle" style={{ transformOrigin: "center" }}>
            <rect x="52" y="146" width="66" height="20" rx="4" fill={C.gold} stroke={C.ink} strokeWidth="1.5" />
            <T x="85" y="160" size={9} weight={800} anchor="middle">REPRINT #4</T>
          </g>
        </g>

        <Chip x={24} y={250} w={196} fill={C.blush}>
          <T x={122} y={269} size={11} weight={800} anchor="middle">Pen drives. Reprints. Monthly.</T>
        </Chip>
      </Layer>

      {/* NOW */}
      <Layer on={mode === "now"}>
        {/* publish signals */}
        {[
          "M102 140C130 140 136 57 160 57",
          "M102 152C200 142 250 78 280 78",
          "M102 166C150 166 180 183 220 183",
        ].map((p) => (
          <path key={p} d={p} fill="none" stroke={C.violet} strokeWidth="2.5" strokeLinecap="round" className="sb-dash" />
        ))}

        <BranchScreens>
          {RETAIL_PROMOS.map((p, i) => (
            <g key={p.t} className="sb-c3" style={d(i * 2.5)} {...first(i)}>
              <rect width={iw} height={ih} fill={p.bg} />
              {p.rain &&
                [14, 34, 58, 78, 88].map((x, k) => (
                  <path key={x} d={`M${x} ${6 + (k % 2) * 6}l-3 7`} stroke={C.white} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
                ))}
              <T x="9" y="30" size={15} weight={800} fill={p.fg}>{p.t}</T>
              <T x="9" y="46" size={9} weight={700} fill={p.fg}>{p.s}</T>
            </g>
          ))}
        </BranchScreens>

        <Phone x={24} y={92} w={78} h={140}>
          <T x="7" y="16" size={8} weight={800} fill={C.violet}>SCREEN BAZAAR</T>
          {["Thane", "Dadar", "Branch 3"].map((n, i) => (
            <g key={n}>
              <rect x="5" y={24 + i * 22} width="58" height="18" rx="5" fill={C.lavender} />
              <T x="10" y={36 + i * 22} size={8} weight={700}>{n}</T>
              <g className="sb-reveal" style={d(0.4 + i * 0.35)}>
                <Check cx={54} cy={33 + i * 22} r={5.5} />
              </g>
            </g>
          ))}
          <g className="sb-press">
            <rect x="5" y="96" width="58" height="18" rx="9" fill={C.violet} />
            <T x="34" y="108" size={8} weight={800} fill={C.white} anchor="middle">Publish</T>
          </g>
        </Phone>

        <Chip x={24} y={250} w={164}>
          <ClockIcon cx={44} cy={265} />
          <T x={58} y={269} size={11} weight={800}>Live in under 5 min</T>
        </Chip>
      </Layer>
    </Svg>
  );
}

/* ------------------------------------------------------------------ */
/* 2 · Corporate — four floors, 35 screens, one HR dashboard            */
/* ------------------------------------------------------------------ */

const FLOORS = [
  { f: "F4", a: "TOWN HALL", b: "Today · 4 PM" },
  { f: "F3", a: "WELCOME", b: "Visitors" },
  { f: "F2", a: "SCHEDULE", b: "Room 2B · 11 AM" },
  { f: "F1", a: "LOBBY", b: "Nexus news" },
];
const floorY = (i) => 40 + i * 57;

function Building({ children }) {
  return (
    <g>
      <rect x="24" y="28" width="226" height="242" rx="10" fill={C.sand} stroke={C.ink} strokeWidth="2" />
      {FLOORS.map((fl, i) => (
        <g key={fl.f}>
          {i > 0 && <path d={`M24 ${floorY(i) - 4}h226`} stroke={C.taupe} strokeWidth="2" />}
          <T x="34" y={floorY(i) + 29} size={10} weight={800} fill={C.slate}>{fl.f}</T>
        </g>
      ))}
      {children}
    </g>
  );
}

export function CorporateStory({ mode }) {
  return (
    <Svg label="Before: screens on four office floors updated one by one, calling IT. Now: HR publishes to all 35 screens from one dashboard in 10 minutes.">
      {/* BEFORE */}
      <Layer on={mode === "before"}>
        <Building>
          {FLOORS.map((fl, i) => (
            <g key={fl.f}>
              {[58, 146].map((x) => (
                <g key={x}>
                  <rect x={x} y={floorY(i) + 6} width="78" height="40" rx="4" fill={C.ink} />
                  <T x={x + 39} y={floorY(i) + 30} size={8} weight={700} fill={C.muted} anchor="middle">NO SIGNAL</T>
                </g>
              ))}
            </g>
          ))}
          {/* someone climbing floor to floor */}
          <g className="sb-tt-climb">
            <Person x={236} y={266} s={0.55} fill={C.slate} />
          </g>
        </Building>

        {/* ringing phone */}
        <g className="sb-tt-ring">
          <rect x="296" y="78" width="54" height="92" rx="10" fill={C.ink} />
          <rect x="301" y="88" width="44" height="72" rx="5" fill={C.white} />
          <circle cx="323" cy="112" r="10" fill={C.alert} />
          <path d="M318 110q5 7 10 0" fill="none" stroke={C.white} strokeWidth="2" strokeLinecap="round" />
        </g>
        <g className="sb-blink">
          <rect x="270" y="178" width="110" height="26" rx="13" fill={C.white} stroke={C.ink} strokeWidth="1.5" />
          <T x="325" y="195" size={10} weight={800} anchor="middle">Calling IT…</T>
        </g>

        <Chip x={262} y={236} w={124} fill={C.blush}>
          <T x={324} y={255} size={10.5} weight={800} anchor="middle">Hours, floor by floor</T>
        </Chip>
      </Layer>

      {/* NOW */}
      <Layer on={mode === "now"}>
        <Building>
          {FLOORS.map((fl, i) => (
            <g key={fl.f}>
              {[58, 146].map((x) => (
                <rect key={x} x={x} y={floorY(i) + 6} width="78" height="40" rx="4" fill={C.ink} />
              ))}
              <g className="sb-reveal" style={d(i * 0.3)}>
                <rect x="61" y={floorY(i) + 9} width="72" height="34" rx="2" fill={i % 2 ? C.violet : C.indigo} />
                <T x="67" y={floorY(i) + 24} size={9} weight={800} fill={C.white}>{fl.a}</T>
                <T x="67" y={floorY(i) + 36} size={7} weight={700} fill={C.white} opacity="0.85">{fl.b}</T>
                <rect x="149" y={floorY(i) + 9} width="72" height="34" rx="2" fill={C.lilac} />
                <rect x="155" y={floorY(i) + 16} width="40" height="5" rx="2.5" fill={C.violet} />
                <rect x="155" y={floorY(i) + 26} width="56" height="4" rx="2" fill={C.taupe} />
                <rect x="155" y={floorY(i) + 34} width="30" height="4" rx="2" fill={C.taupe} />
              </g>
            </g>
          ))}
        </Building>

        {FLOORS.map((fl, i) => (
          <path key={fl.f} d={`M270 130C262 130 262 ${floorY(i) + 26} 250 ${floorY(i) + 26}`} fill="none" stroke={C.violet} strokeWidth="2" className="sb-dash" />
        ))}

        {/* HR laptop */}
        <g>
          <rect x="270" y="78" width="118" height="80" rx="6" fill={C.ink} />
          <rect x="275" y="83" width="108" height="70" rx="3" fill={C.white} />
          <T x="281" y="96" size={8} weight={800} fill={C.violet}>HR · PLAYLISTS</T>
          {["Town hall", "Visitors", "Schedules"].map((n, i) => (
            <g key={n}>
              <T x="281" y={110 + i * 11} size={7.5} weight={700}>{n}</T>
              <rect x="356" y={104 + i * 11} width="18" height="8" rx="4" fill={C.green} />
              <circle cx="370" cy={108 + i * 11} r="3" fill={C.white} />
            </g>
          ))}
          <path d="M262 158h134l-8 8H270z" fill={C.slate} />
        </g>

        {/* stopwatch */}
        <g>
          <rect x="265" y="187" width="124" height="58" rx="14" fill={C.ink} />
          <rect x="262" y="184" width="124" height="58" rx="14" fill={C.white} stroke={C.ink} strokeWidth="2" />
          <circle cx="290" cy="213" r="15" fill="none" stroke={C.lilac} strokeWidth="5" />
          <circle cx="290" cy="213" r="15" fill="none" stroke={C.violet} strokeWidth="5" strokeLinecap="round" className="sb-tt-timer" transform="rotate(-90 290 213)" />
          <T x="314" y="210" size={15} weight={800}>10 min</T>
          <T x="314" y="226" size={9} weight={700} fill={C.slate}>35 screens</T>
        </g>
      </Layer>
    </Svg>
  );
}

/* ------------------------------------------------------------------ */
/* 3 · Café — breakfast board flips to lunch combos at 11:30            */
/* ------------------------------------------------------------------ */

function WallClock({ label, cycle }) {
  return (
    <g>
      <circle cx="334" cy="62" r="34" fill={C.white} stroke={C.ink} strokeWidth="3" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * Math.PI) / 6;
        return <circle key={i} cx={334 + 27 * Math.sin(a)} cy={62 - 27 * Math.cos(a)} r="1.6" fill={C.slate} />;
      })}
      <rect x="332.5" y="44" width="3" height="18" rx="1.5" fill={C.ink} className={cycle ? "sb-tt-hour" : undefined} style={{ transformOrigin: "50% 100%" }} />
      <rect x="333" y="36" width="2" height="26" rx="1" fill={C.violet} className={cycle ? "sb-tt-minute" : undefined} style={{ transformOrigin: "50% 100%" }} />
      <circle cx="334" cy="62" r="3" fill={C.ink} />
      {label}
    </g>
  );
}

function Counter() {
  return <rect x="16" y="204" width="264" height="12" rx="4" fill={C.taupe} stroke={C.ink} strokeWidth="1.5" />;
}

export function CafeStory({ mode }) {
  const bw = 244;
  const bh = 146;
  return (
    <Svg label="Before: a hand-written chalkboard menu and a long queue. Now: a digital menu board switches from breakfast to lunch combos at 11:30 AM, with a drink video screen and a shorter queue.">
      {/* BEFORE */}
      <Layer on={mode === "before"}>
        <rect x="16" y="20" width="264" height="166" rx="8" fill="#8B6B4A" stroke={C.ink} strokeWidth="2" />
        <rect x="26" y="30" width="244" height="146" rx="4" fill="#2F3B35" />
        <T x="148" y="60" size={20} weight={800} fill={C.white} anchor="middle" opacity="0.85" fontStyle="italic">Menu</T>
        {[80, 98, 116, 134].map((y, i) => (
          <path key={y} d={`M46 ${y}q20 -5 40 0t40 0 40 0${i % 2 ? "" : " 30 0"}`} fill="none" stroke={C.white} strokeWidth="2" opacity="0.5" strokeLinecap="round" />
        ))}
        <g transform="rotate(-6 214 150)">
          <rect x="180" y="132" width="78" height="36" fill={C.gold} stroke={C.ink} strokeWidth="1.2" />
          <T x="219" y="147" size={8.5} weight={800} anchor="middle">Change board</T>
          <T x="219" y="160" size={8.5} weight={800} anchor="middle">at 11:30!</T>
        </g>
        <WallClock
          label={<T x="334" y="116" size={11} weight={800} fill={C.alert} anchor="middle">11:30?</T>}
        />
        <rect x="302" y="130" width="64" height="92" rx="4" fill={C.white} stroke={C.line} strokeWidth="2" />
        <T x="334" y="180" size={9} weight={700} fill={C.muted} anchor="middle">poster</T>
        <Counter />
        {[40, 78, 116, 154, 192, 230].map((x, i) => (
          <Person key={x} x={x} y={292} s={0.9} fill={[C.violet, C.indigo, C.gold, C.slate, C.violet, C.iris][i]} className="sb-float" style={d(i * 0.3)} />
        ))}
        <Chip x={262} y={250} w={124} fill={C.blush}>
          <T x={324} y={269} size={10.5} weight={800} anchor="middle">Still deciding…</T>
        </Chip>
      </Layer>

      {/* NOW */}
      <Layer on={mode === "now"}>
        <Screen x={16} y={20} w={264} h={166} r={8}>
          {/* breakfast */}
          <g className="sb-c2" data-first="">
            <rect width={bw + 10} height={bh + 10} fill={C.indigo} />
            <T x="14" y="30" size={17} weight={800} fill={C.gold}>BREAKFAST</T>
            {[
              ["Masala omelette", "₹149"],
              ["Filter coffee", "₹79"],
              ["Poha bowl", "₹99"],
            ].map(([n, p], i) => (
              <g key={n}>
                <T x="14" y={58 + i * 22} size={11} weight={700} fill={C.white}>{n}</T>
                <T x="190" y={58 + i * 22} size={11} weight={800} fill={C.gold} anchor="end">{p}</T>
              </g>
            ))}
            <circle cx="224" cy="120" r="18" fill={C.gold} opacity="0.9" />
          </g>
          {/* lunch combos */}
          <g className="sb-c2" style={d(3)}>
            <rect width={bw + 10} height={bh + 10} fill={C.violet} />
            <T x="14" y="30" size={17} weight={800} fill={C.white}>LUNCH COMBOS</T>
            <T x="14" y="62" size={11.5} weight={700} fill={C.white}>Paneer wrap</T>
            <T x="14" y="78" size={11.5} weight={700} fill={C.white}>+ Cold coffee</T>
            <T x="14" y="112" size={24} weight={800} fill={C.gold}>₹249</T>
            <g className="sb-wiggle" style={{ transformOrigin: "center" }}>
              <circle cx="196" cy="92" r="32" fill={C.gold} stroke={C.ink} strokeWidth="2" />
              <T x="196" y="89" size={11} weight={800} anchor="middle">BEST</T>
              <T x="196" y="103" size={11} weight={800} anchor="middle">SELLER</T>
            </g>
          </g>
        </Screen>

        <WallClock
          cycle
          label={
            <>
              <T x="334" y="116" size={11} weight={800} fill={C.indigo} anchor="middle" className="sb-c2" data-first="">8:00 AM</T>
              <T x="334" y="116" size={11} weight={800} fill={C.violet} anchor="middle" className="sb-c2" style={d(3)}>11:30 AM</T>
            </>
          }
        />

        {/* signature-drink video */}
        <Screen x={298} y={128} w={72} h={104} r={7}>
          <rect width="64" height="96" fill={C.lilac} />
          {[22, 32, 42].map((x, i) => (
            <path key={x} d={`M${x} 40q-4 -6 0 -12t0 -12`} fill="none" stroke={C.violet} strokeWidth="2" strokeLinecap="round" className="sb-steam" style={d(i * 0.5)} />
          ))}
          <path d="M14 46h36l-4 30a6 6 0 0 1-6 5H24a6 6 0 0 1-6-5z" fill={C.violet} />
          <path d="M50 52h4a6 6 0 0 1 0 12h-6" fill="none" stroke={C.violet} strokeWidth="3" />
          <circle cx="52" cy="12" r="8" fill={C.ink} className="sb-float" />
          <path d="M50 8.5v7l5.5-3.5z" fill={C.white} />
        </Screen>

        <Counter />
        {[70, 108].map((x, i) => (
          <Person key={x} x={x} y={292} s={0.9} fill={[C.violet, C.gold][i]} />
        ))}
        <Chip x={150} y={250} w={116}>
          <path d="M170 258v14m-5-5 5 5 5-5" fill="none" stroke={C.green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <T x={184} y={269} size={11} weight={800}>Queue time</T>
        </Chip>
      </Layer>
    </Svg>
  );
}
