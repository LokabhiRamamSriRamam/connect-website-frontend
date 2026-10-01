import { Art, Display, Tx, Chip, Cloud, Clock, Person, SKIN, HAIR, Traveller, Spark, Arrow } from "./shared";
import { Seg, useCycle } from "../kit";

/* Blog 1 — Digital menu boards. Figures are 480 wide so labels stay readable on phones. */

const INK = "#191919";
const TOMATO = "#E4572E";
const MUSTARD = "#F5C542";
const CHALK = "#1E2A23";
const CREAM = "#FFF1EA";

function MenuList({ title, items, x = 16, y = 30, color = MUSTARD, size = 15, gap = 22, text = "#F8F6F2" }) {
  return (
    <g>
      <Tx x={x} y={y} size={size + 2} fill={color}>
        {title}
      </Tx>
      {items.map((it, i) => (
        <g key={it}>
          <circle cx={x + 4} cy={y + 20 + i * gap - 4} r="3" fill={color} />
          <Tx x={x + 14} y={y + 20 + i * gap} size={size - 2} weight={700} fill={text}>
            {it}
          </Tx>
        </g>
      ))}
    </g>
  );
}

/* What a setup includes: cloud → player → screens. */
export function SetupDiagram() {
  const screens = [
    { x: 300, y: 34 },
    { x: 300, y: 128 },
    { x: 300, y: 222 },
  ];
  return (
    <Art viewBox="0 0 480 320" label="Diagram: menu content is managed in the cloud, sent to a media player, and shown on three menu screens.">
      <rect width="480" height="320" fill={CREAM} />
      <Cloud x={70} y={84} s={1.15} fill="#fff" />
      <Tx x={64} y={90} size={13} anchor="middle">Cloud CMS</Tx>
      <g className="bl-float">
        <rect x="26" y="168" width="92" height="66" rx="10" fill={INK} />
        <rect x="32" y="174" width="80" height="44" rx="4" fill="#fff" />
        <rect x="38" y="180" width="40" height="8" rx="3" fill={TOMATO} />
        <rect x="38" y="194" width="62" height="6" rx="3" fill="#E5E7EB" />
        <rect x="38" y="205" width="48" height="6" rx="3" fill="#E5E7EB" />
        <Tx x={72} y={258} size={12} anchor="middle">Templates &amp;</Tx>
        <Tx x={72} y={274} size={12} anchor="middle">scheduling</Tx>
      </g>
      <Arrow x1={72} y1={164} x2={72} y2={112} dashed />
      {/* player */}
      <rect x="160" y="128" width="88" height="62" rx="12" fill={INK} />
      <rect x="172" y="140" width="64" height="8" rx="4" fill="#4CAF6E" className="bl-glow" />
      <circle cx="180" cy="170" r="5" fill={MUSTARD} className="bl-blink" />
      <Tx x={204} y={212} size={12.5} anchor="middle">Media player</Tx>
      <path d="M110 90C150 90 150 150 160 156" fill="none" stroke={INK} strokeWidth="2.5" className="bl-dash" />
      <Traveller d="M110 90C150 90 150 150 160 156" r={5} fill={TOMATO} dur={1.8} />
      {screens.map((s, i) => {
        const d = `M248 159C270 159 276 ${s.y + 34} ${s.x} ${s.y + 34}`;
        return (
          <g key={i}>
            <path d={d} fill="none" stroke={INK} strokeWidth="2" className="bl-dash" />
            <Traveller d={d} r={4.5} fill={MUSTARD} dur={1.8} delay={0.6 + i * 0.25} />
            <Display x={s.x} y={s.y} w={156} h={72} glass={i === 1 ? TOMATO : CHALK}>
              {i === 1 ? (
                <g>
                  <Tx x={10} y={26} size={15} fill="#fff">TODAY'S</Tx>
                  <Tx x={10} y={46} size={15} fill={MUSTARD}>SPECIAL</Tx>
                  <circle cx="116" cy="34" r="20" fill={MUSTARD} />
                </g>
              ) : (
                <MenuList title={i === 0 ? "MAINS" : "DRINKS"} items={i === 0 ? ["Wraps", "Burgers"] : ["Coffee", "Shakes"]} y={20} size={12} gap={17} />
              )}
            </Display>
          </g>
        );
      })}
      <Tx x={378} y={312} size={12.5} anchor="middle">Menu screens</Tx>
    </Art>
  );
}

/* Dayparting: the day's four menus on one screen. */
const DAYPARTS = [
  { time: "7:00 AM – 11:30 AM", short: "Breakfast", name: "Breakfast Combos", items: ["Masala Omelette", "Breakfast Combo", "Aloo Paratha", "Coffee & Breakfast Deal"], sky: "#FFE7C2", body: "sun", pos: 0.18 },
  { time: "11:30 AM – 4:00 PM", short: "Lunch", name: "Lunch Combos & Meal Deals", items: ["Paneer Wrap Combo", "Chicken Burger Meal", "Loaded Fries", "Cold Coffee"], sky: "#CFE8FF", body: "sun", pos: 0.5 },
  { time: "4:00 PM – 7:00 PM", short: "Snacks", name: "Tea, Coffee & Snacks", items: ["Masala Chai", "Filter Coffee", "Samosa", "Veg Puff"], sky: "#FFCBA4", body: "sun", pos: 0.8 },
  { time: "7:00 PM onwards", short: "Dinner", name: "Dinner Menu & Family Combos", items: ["Butter Chicken", "Dal Makhani", "Garlic Naan", "Family Combo"], sky: "#27306B", body: "moon", pos: 0.5 },
];

export function DaypartFigure({ inView }) {
  const [i, pick] = useCycle(DAYPARTS.length, 3200, inView);
  const d = DAYPARTS[i];
  const sx = 40 + d.pos * 400;
  const sy = 70 - Math.sin(d.pos * Math.PI) * 44;
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-sb-ink bg-white px-4 py-3">
        <Seg label="Choose a time of day" options={DAYPARTS.map((p) => p.short)} value={i} onChange={pick} />
        <span className="font-manrope text-xs font-extrabold uppercase tracking-[0.14em] text-sb-muted">Auto-switching</span>
      </div>
      <Art viewBox="0 0 480 330" label={`Menu screen during ${d.time}: ${d.name}.`}>
        <rect width="480" height="330" fill={d.sky} className="bl-ease" style={{ transition: "fill 0.8s ease" }} />
        <g className="bl-ease" style={{ transform: `translate(${sx}px, ${sy}px)` }}>
          {d.body === "sun" ? <circle r="20" fill={MUSTARD} stroke={INK} strokeWidth="2" /> : <path d="M6-18a18 18 0 1 0 12 30 15 15 0 1 1-12-30z" fill="#F8F6F2" stroke={INK} strokeWidth="2" />}
        </g>
        <Display x={60} y={96} w={360} h={170} glass={CHALK} mount>
          <g key={i} className="bl-swap">
            <Tx x={18} y={34} size={20} fill={i === 3 ? "#FF8A65" : MUSTARD}>
              {d.name}
            </Tx>
            {d.items.map((it, k) => (
              <g key={it}>
                <rect x={18} y={52 + k * 24} width="6" height="6" rx="1.5" fill={MUSTARD} />
                <Tx x={32} y={60 + k * 24} size={15} weight={700} fill="#F8F6F2">
                  {it}
                </Tx>
              </g>
            ))}
            <circle cx="288" cy="96" r="46" fill={i === 3 ? "#FF8A65" : MUSTARD} opacity="0.95" />
            <Tx x={288} y={101} size={13} anchor="middle" fill={INK}>
              {d.short.toUpperCase()}
            </Tx>
          </g>
        </Display>
        {/* timeline */}
        <rect x="40" y="292" width="400" height="12" rx="6" fill="#fff" stroke={INK} strokeWidth="2" />
        {DAYPARTS.map((p, k) => (
          <rect key={p.short} x={42 + k * 99} y={294} width="97" height="8" rx="4" fill={k === i ? TOMATO : "transparent"} className="bl-ease" />
        ))}
        <Tx x={40} y={324} size={12} weight={700} fill={i === 3 ? "#fff" : INK}>
          7 AM
        </Tx>
        <Tx x={440} y={324} size={12} weight={700} anchor="end" fill={i === 3 ? "#fff" : INK}>
          Closing
        </Tx>
        <Tx x={240} y={324} size={12.5} anchor="middle" fill={i === 3 ? "#fff" : INK}>
          {d.time}
        </Tx>
      </Art>
    </div>
  );
}

/* 11:29 → 11:30: the breakfast list flips to lunch on its own. */
export function FlipFigure({ inView }) {
  const [s] = useCycle(2, 3600, inView);
  const lunch = s === 1;
  const items = lunch ? ["Paneer Wrap Combo", "Chicken Burger Meal", "Loaded Fries", "Cold Coffee"] : ["Masala Omelette", "Breakfast Combo", "Aloo Paratha", "Coffee & Breakfast Deal"];
  return (
    <Art viewBox="0 0 480 300" label={`At ${lunch ? "11:30" : "11:29"} AM the screen shows the ${lunch ? "lunch" : "breakfast"} menu.`}>
      <rect width="480" height="300" fill={lunch ? "#FFE3D6" : "#FFF6DC"} style={{ transition: "fill 0.6s" }} />
      {/* flip clock */}
      <g>
        <rect x="24" y="82" width="140" height="96" rx="14" fill={INK} />
        <line x1="24" y1="130" x2="164" y2="130" stroke="#3A3A3A" strokeWidth="2" />
        <g key={s} className="bl-flip">
          <Tx x={94} y={147} size={46} anchor="middle" fill="#fff">
            {lunch ? "11:30" : "11:29"}
          </Tx>
        </g>
        <Tx x={94} y={204} size={14} anchor="middle">
          AM
        </Tx>
        <Chip x={34} y={222} w={120} h={26} fill={lunch ? TOMATO : "#fff"} color={lunch ? "#fff" : INK} stroke={INK} size={12}>
          {lunch ? "Switched itself" : "Breakfast ends"}
        </Chip>
      </g>
      <Arrow x1={176} y1={130} x2={204} y2={130} />
      <Display x={214} y={40} w={246} h={190} glass={CHALK} stand>
        <g key={s} className="bl-flip">
          <MenuList title={lunch ? "LUNCH" : "BREAKFAST"} items={items} y={36} size={16} gap={30} color={lunch ? "#FF8A65" : MUSTARD} />
        </g>
      </Display>
      <Tx x={337} y={286} size={13} anchor="middle" weight={700} fill="#4B5563">
        No employee needs to change the screen.
      </Tx>
    </Art>
  );
}

/* Cold coffee: a printed line vs a screen built to sell it. */
export function ColdCoffeeFigure({ inView }) {
  const [m, pick] = useCycle(2, 4200, inView);
  return (
    <div>
      <div className="border-b-2 border-sb-ink bg-white px-4 py-3">
        <Seg label="Compare" options={["Printed listing", "Digital screen"]} value={m} onChange={pick} />
      </div>
      {m === 0 ? (
        <Art viewBox="0 0 480 300" label="A printed menu: Cold Coffee — ₹149 is one grey line among many.">
          <rect width="480" height="300" fill="#F2EEE7" />
          <g className="bl-swap">
            <rect x="120" y="18" width="240" height="236" rx="6" fill="#fff" stroke={INK} strokeWidth="2" />
            <Tx x={240} y={54} size={15} anchor="middle" fill="#6B7280">BEVERAGES</Tx>
            {["Masala Chai — ₹49", "Filter Coffee — ₹69", "Cold Coffee — ₹149", "Fresh Lime — ₹79", "Iced Tea — ₹99", "Lassi — ₹89"].map((t, k) => (
              <Tx key={t} x={144} y={90 + k * 30} size={14} weight={600} fill="#9CA3AF">
                {t}
              </Tx>
            ))}
            <Tx x={240} y={284} size={13} anchor="middle" weight={700} fill="#6B7280">
              Every item gets roughly the same treatment.
            </Tx>
          </g>
        </Art>
      ) : (
        <Art viewBox="0 0 480 300" label="A digital screen: a cold coffee animation next to the line ADD A COLD COFFEE FOR ₹149.">
          <rect width="480" height="300" fill="#2B1B12" />
          <g className="bl-swap">
            <Display x={30} y={26} w={420} h={236} glass="#5A3A26">
              <circle cx="300" cy="118" r="96" fill="#7A4E33" />
              {/* glass */}
              <g>
                <path d="M262 50h76l-10 160h-56z" fill="#fff" fillOpacity="0.25" stroke="#fff" strokeWidth="3" />
                <path d="M266 92h68l-7 116h-54z" fill="#C88A5A" />
                <path d="M266 92h68l-2 22h-64z" fill="#F3E3CF" />
                <rect x="306" y="20" width="8" height="96" rx="4" fill={TOMATO} transform="rotate(14 310 68)" />
                {[0, 1, 2].map((k) => (
                  <g key={k} className="bl-float-sm" style={{ animationDelay: `${k * 0.4}s` }}>
                    <rect x={278 + k * 16} y={100 + (k % 2) * 8} width="14" height="14" rx="3" fill="#fff" fillOpacity="0.75" />
                  </g>
                ))}
                {[0, 1].map((k) => (
                  <g key={k} className="bl-fall" style={{ animationDelay: `${k * 1.4}s` }}>
                    <path d={`M${264 + k * 70} 120q3 6 0 9q-3-3 0-9z`} fill="#fff" fillOpacity="0.8" />
                  </g>
                ))}
                {[0, 1, 2].map((k) => (
                  <g key={k} className="bl-rise" style={{ animationDelay: `${k * 0.9}s` }}>
                    <circle cx={290 + k * 12} cy={190} r="2.5" fill="#fff" fillOpacity="0.7" />
                  </g>
                ))}
              </g>
              <Tx x={20} y={64} size={22} fill="#fff">ADD A</Tx>
              <Tx x={20} y={92} size={22} fill="#fff">COLD COFFEE</Tx>
              <rect x="20" y="108" width="122" height="40" rx="20" fill={MUSTARD} />
              <Tx x={81} y={135} size={22} anchor="middle">₹149</Tx>
              <g className="bl-beat">
                <circle cx="210" cy="60" r="18" fill={TOMATO} />
              </g>
              <Tx x={210} y={65} size={11} anchor="middle" fill="#fff">HD</Tx>
            </Display>
            <Tx x={240} y={288} size={12.5} anchor="middle" weight={700} fill="#F5E6D8">
              A stronger focal point than a static text listing.
            </Tx>
          </g>
        </Art>
      )}
    </div>
  );
}

/* Upsell: burger → + fries & drink → make it a combo. */
const UPSELL = [
  { tab: "Main Product", line: "Classic Chicken Burger — ₹199" },
  { tab: "Upsell", line: "Add Loaded Fries + Cold Drink — ₹99" },
  { tab: "Meal Upgrade", line: "Make it a Combo — Add ₹79" },
];
export function UpsellFigure({ inView }) {
  const [s, pick] = useCycle(3, 2800, inView);
  return (
    <div>
      <div className="border-b-2 border-sb-ink bg-white px-4 py-3">
        <Seg label="Upsell step" options={UPSELL.map((u) => u.tab)} value={s} onChange={pick} />
      </div>
      <Art viewBox="0 0 480 300" label={`Menu screen showing: ${UPSELL.slice(0, s + 1).map((u) => u.line).join("; ")}.`}>
        <rect width="480" height="300" fill={CREAM} />
        <Display x={24} y={20} w={432} h={230} glass="#FFF8EE">
          {/* burger */}
          <g className="bl-float">
            <path d="M40 120a70 44 0 0 1 140 0z" fill="#E7A24A" stroke={INK} strokeWidth="2.5" />
            {[60, 90, 120, 150].map((x) => (
              <ellipse key={x} cx={x} cy={96 + (x % 3)} rx="4" ry="2.5" fill="#FFF3D6" />
            ))}
            <path d="M34 126h152l-8 10H42z" fill="#4CAF6E" stroke={INK} strokeWidth="2" />
            <rect x="38" y="136" width="144" height="18" rx="9" fill="#8A4B2A" stroke={INK} strokeWidth="2" />
            <path d="M36 154h148v8a14 14 0 0 1-14 14H50a14 14 0 0 1-14-14z" fill="#E7A24A" stroke={INK} strokeWidth="2.5" />
          </g>
          <Tx x={110} y={206} size={14} anchor="middle">Classic Chicken Burger</Tx>
          <Chip x={78} y={214} w={64} h={22} fill={TOMATO} size={13}>₹199</Chip>
          {/* fries + drink */}
          <g className="bl-ease" style={{ opacity: s >= 1 ? 1 : 0.12, transform: s >= 1 ? "none" : "translateX(30px)" }}>
            <path d="M232 100h56l-8 76h-40z" fill={TOMATO} stroke={INK} strokeWidth="2.5" />
            {[238, 248, 258, 268, 278].map((x, k) => (
              <rect key={x} x={x} y={74 + (k % 2) * 8} width="7" height="34" rx="2" fill={MUSTARD} stroke={INK} strokeWidth="1.5" />
            ))}
            <path d="M304 90h44l-6 86h-32z" fill="#fff" stroke={INK} strokeWidth="2.5" />
            <rect x="304" y="104" width="44" height="22" fill="#1F30A0" />
            <rect x="328" y="60" width="6" height="36" rx="3" fill={INK} />
            <Tx x={290} y={206} size={13} anchor="middle">Loaded Fries + Cold Drink</Tx>
            <Chip x={258} y={214} w={64} h={22} fill={INK} size={13}>+₹99</Chip>
          </g>
          {/* combo badge */}
          <g className="bl-ease" style={{ opacity: s >= 2 ? 1 : 0, transform: s >= 2 ? "scale(1)" : "scale(0.6)", transformOrigin: "center" }}>
            <g className="bl-wiggle">
              <circle cx="376" cy="64" r="44" fill={MUSTARD} stroke={INK} strokeWidth="2.5" />
              <Tx x={376} y={58} size={13} anchor="middle">MAKE IT A</Tx>
              <Tx x={376} y={76} size={15} anchor="middle">COMBO</Tx>
              <Tx x={376} y={93} size={12} anchor="middle" fill={TOMATO}>ADD ₹79</Tx>
            </g>
          </g>
        </Display>
        <g key={s} className="bl-swap">
          <Tx x={240} y={284} size={15} anchor="middle">
            {UPSELL[s].line}
          </Tx>
        </g>
      </Art>
    </div>
  );
}

/* Hierarchy: Product → Price → Offer → Supporting Visual, on a butter chicken screen. */
const HIER = ["Product", "Price", "Offer", "Supporting Visual"];
export function HierarchyFigure({ inView }) {
  const [h] = useCycle(4, 1800, inView);
  const on = (k) => ({ opacity: h === k ? 1 : 0.55, transform: h === k ? "scale(1.08)" : "none", transformOrigin: "center" });
  return (
    <Art viewBox="0 0 480 300" label="Menu screen for Butter Chicken ₹299 with numbered callouts: 1 product, 2 price, 3 offer, 4 supporting visual.">
      <rect width="480" height="300" fill="#FFF6EC" />
      <Display x={20} y={24} w={340} h={220} glass="#3A1E14">
        {/* supporting visual */}
        <g className="bl-ease" style={on(3)}>
          <ellipse cx="236" cy="150" rx="84" ry="30" fill="#fff" />
          <ellipse cx="236" cy="140" rx="70" ry="30" fill="#E56A2C" />
          <ellipse cx="226" cy="132" rx="30" ry="10" fill="#F6B26B" />
          <circle cx="250" cy="138" r="4" fill="#fff" />
          <circle cx="212" cy="144" r="3" fill="#4CAF6E" />
          <path d="M150 86c40-18 70 4 60 26-16-6-44-4-60-26z" fill="#F3D9A4" stroke="#B9874A" strokeWidth="2" />
          {[0, 1, 2].map((k) => (
            <g key={k} className="bl-steam" style={{ animationDelay: `${k * 0.8}s` }}>
              <path d={`M${214 + k * 20} 104c-5-8 5-12 0-20`} fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
            </g>
          ))}
        </g>
        <g className="bl-ease" style={on(0)}>
          <Tx x={16} y={40} size={22} fill="#fff">Butter Chicken</Tx>
        </g>
        <g className="bl-ease" style={on(1)}>
          <Tx x={16} y={78} size={30} fill={MUSTARD}>₹299</Tx>
        </g>
        <g className="bl-ease" style={on(2)}>
          <rect x="16" y="150" width="104" height="30" rx="15" fill={TOMATO} />
          <Tx x={68} y={170} size={12} anchor="middle" fill="#fff">Make it a Combo</Tx>
        </g>
      </Display>
      {HIER.map((t, k) => (
        <g key={t} className="bl-ease" style={{ opacity: h === k ? 1 : 0.5 }}>
          <circle cx="384" cy={52 + k * 52} r="15" fill={h === k ? TOMATO : "#fff"} stroke={INK} strokeWidth="2" />
          <Tx x={384} y={57 + k * 52} size={14} anchor="middle" fill={h === k ? "#fff" : INK}>
            {k + 1}
          </Tx>
          <Tx x={406} y={50 + k * 52} size={12.5}>
            {t.split(" ")[0]}
          </Tx>
          {t.includes(" ") && (
            <Tx x={406} y={65 + k * 52} size={12.5}>
              {t.split(" ")[1]}
            </Tx>
          )}
        </g>
      ))}
      <Tx x={190} y={280} size={13} anchor="middle" weight={700} fill="#4B5563">
        Understood within seconds.
      </Tx>
    </Art>
  );
}

/* Hazards: a screen near the kitchen vs one in an air-conditioned dining area. */
export function HazardFigure({ inView }) {
  const [m, pick] = useCycle(2, 4400, inView);
  const kitchen = m === 0;
  const tags = kitchen ? ["Heat", "Steam", "Grease", "Dust", "Humidity", "Food particles"] : ["Dry", "Air-conditioned", "Calm"];
  return (
    <div>
      <div className="border-b-2 border-sb-ink bg-white px-4 py-3">
        <Seg label="Where is the screen?" options={["Near the kitchen", "Dining area"]} value={m} onChange={pick} />
      </div>
      <Art viewBox="0 0 480 300" label={kitchen ? "A screen near the kitchen exposed to heat, steam, grease, dust, humidity and food particles." : "A screen in a dry, air-conditioned dining area."}>
        <rect width="480" height="300" fill={kitchen ? "#FFE3D2" : "#E3F1FF"} style={{ transition: "fill 0.6s" }} />
        <Display x={150} y={56} w={180} h={110} glass={CHALK} mount>
          <MenuList title="MENU" items={["Wraps", "Burgers", "Fries"]} y={28} size={13} gap={20} />
        </Display>
        {kitchen ? (
          <g key="k" className="bl-swap">
            {/* stove + pan below */}
            <rect x="130" y="236" width="220" height="64" fill="#4B5563" />
            <rect x="170" y="222" width="70" height="14" rx="4" fill={INK} />
            <rect x="240" y="226" width="40" height="5" rx="2" fill={INK} />
            {[0, 1, 2, 3].map((k) => (
              <g key={k} className="bl-steam" style={{ animationDelay: `${k * 0.6}s`, animationDuration: "3.2s" }}>
                <path d={`M${180 + k * 18} 214c-8-14 8-22 0-38`} fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity="0.9" />
              </g>
            ))}
            {[0, 1, 2].map((k) => (
              <g key={k} className="bl-rise" style={{ animationDelay: `${k * 0.9}s` }}>
                <circle cx={150 + k * 90} cy={200} r="4" fill="#C9A227" />
              </g>
            ))}
            {[[90, 80], [400, 120], [70, 200], [420, 60]].map(([x, y], k) => (
              <g key={k} className="bl-drift" style={{ animationDelay: `${k * 0.7}s` }}>
                <circle cx={x} cy={y} r="3" fill="#8A6B4E" opacity="0.6" />
              </g>
            ))}
            {/* thermometer */}
            <rect x="404" y="150" width="16" height="80" rx="8" fill="#fff" stroke={INK} strokeWidth="2" />
            <g className="bl-grow"><rect x="408" y="170" width="8" height="56" rx="4" fill={TOMATO} /></g>
            <circle cx="412" cy="234" r="12" fill={TOMATO} stroke={INK} strokeWidth="2" />
          </g>
        ) : (
          <g key="d" className="bl-swap">
            <rect x="170" y="10" width="140" height="30" rx="8" fill="#fff" stroke={INK} strokeWidth="2" />
            {[0, 1, 2].map((k) => (
              <g key={k} className="bl-fall" style={{ animationDelay: `${k * 0.8}s` }}>
                <path d={`M${200 + k * 40} 44v14`} stroke="#5AA9E6" strokeWidth="3" strokeLinecap="round" />
              </g>
            ))}
            <rect x="120" y="230" width="240" height="12" rx="6" fill="#8A5A3C" />
            <rect x="140" y="242" width="10" height="50" fill="#8A5A3C" />
            <rect x="330" y="242" width="10" height="50" fill="#8A5A3C" />
            <Person x={100} y={290} s={0.8} top="#914BFA" skin={SKIN[1]} hair={HAIR[0]} sit />
            <Person x={380} y={290} s={0.8} flip top="#4CAF6E" skin={SKIN[3]} hair={HAIR[1]} hairStyle="long" sit />
          </g>
        )}
        {tags.map((t, k) => {
          const pos = kitchen
            ? [[24, 40], [24, 96], [24, 152], [356, 40], [356, 96], [24, 208]][k]
            : [[24, 60], [356, 60], [24, 120]][k];
          return (
            <g key={t} className="bl-swap" style={{ animationDelay: `${k * 0.08}s` }}>
              <Chip x={pos[0]} y={pos[1]} w={104} h={26} fill="#fff" color={INK} stroke={INK} size={12}>
                {t}
              </Chip>
            </g>
          );
        })}
      </Art>
    </div>
  );
}

/* Placement: a queue walking toward three screens. */
const STAGES = ["Joining the queue", "Waiting to order", "Approaching the counter", "Reviewing their order"];
export function QueueFigure({ inView }) {
  const [s, pick] = useCycle(4, 2600, inView);
  const px = [70, 160, 250, 330][s];
  return (
    <div>
      <div className="border-b-2 border-sb-ink bg-white px-4 py-3">
        <Seg label="Where is the customer?" options={STAGES} value={s} onChange={pick} />
      </div>
      <Art viewBox="0 0 480 300" label={`Customer ${STAGES[s].toLowerCase()} can see three screens: Main Meals, Combos & Upsells, Beverages & Desserts.`}>
        <rect width="480" height="300" fill={CREAM} />
        {[
          ["Screen 1", "Main Meals", CHALK],
          ["Screen 2", "Combos & Upsells", TOMATO],
          ["Screen 3", "Beverages & Desserts", "#1F30A0"],
        ].map(([n, t, g], k) => (
          <g key={n}>
            <Display x={196 + k * 94} y={22} w={88} h={58} glass={g} mount>
              <Tx x={40} y={22} size={10} anchor="middle" fill="#fff" opacity="0.8">
                {n.toUpperCase()}
              </Tx>
              {t.split(" & ").map((w, j) => (
                <Tx key={w} x={40} y={36 + j * 12} size={10} anchor="middle" fill="#fff">
                  {j ? `& ${w}` : w}
                </Tx>
              ))}
            </Display>
            {/* sightline */}
            <line x1={px + 4} y1={196} x2={240 + k * 94} y2={84} stroke={TOMATO} strokeWidth="2" className="bl-dash" opacity="0.8" style={{ transition: "all 0.8s" }} />
          </g>
        ))}
        {/* counter */}
        <rect x="372" y="170" width="108" height="130" fill="#8A4B2A" />
        <rect x="362" y="160" width="118" height="14" fill={INK} />
        <rect x="396" y="132" width="40" height="28" rx="4" fill="#4B5563" />
        <Tx x={426} y={204} size={12} anchor="middle" fill="#fff">PAY</Tx>
        {/* queue rope */}
        <path d="M20 268H360" stroke={INK} strokeWidth="2" strokeDasharray="2 8" strokeLinecap="round" />
        {/* other people in queue */}
        <Person x={26} y={290} s={0.8} top="#4CAF6E" skin={SKIN[2]} hair={HAIR[1]} hairStyle="bun" />
        <g className="bl-ease" style={{ transform: `translateX(${px}px)`, transition: "transform 1.2s cubic-bezier(0.22,1,0.36,1)" }}>
          <Person x={0} y={290} s={0.88} top="#914BFA" skin={SKIN[0]} hair={HAIR[0]} walk pose="point" />
        </g>
        {STAGES.map((t, k) => (
          <circle key={t} cx={[70, 160, 250, 330][k]} cy={276} r="5" fill={k === s ? TOMATO : "#fff"} stroke={INK} strokeWidth="2" />
        ))}
      </Art>
    </div>
  );
}

/* QSR chain: Central Menu → Regional → Outlet → Screens, with two campaign types. */
export function ChainFigure({ inView }) {
  const [m, pick] = useCycle(2, 4000, inView);
  const outlets = [70, 170, 310, 410];
  const selected = [1, 3];
  return (
    <div>
      <div className="border-b-2 border-sb-ink bg-white px-4 py-3">
        <Seg label="Campaign" options={["National: New Burger Launch", "Outlet: Weekend Offer"]} value={m} onChange={pick} />
      </div>
      <Art viewBox="0 0 480 320" label={m === 0 ? "The national New Burger Launch campaign reaches every outlet's screens." : "The Weekend Offer is configured for selected outlets only."}>
        <rect width="480" height="320" fill="#FFF8F2" />
        {/* central */}
        <rect x="190" y="44" width="100" height="36" rx="10" fill={INK} />
        <Tx x={240} y={67} size={13} anchor="middle" fill="#fff">Head office</Tx>
        {[120, 360].map((x, r) => (
          <g key={x}>
            <path d={`M240 80C240 100 ${x} 96 ${x} 118`} fill="none" stroke={INK} strokeWidth="2" />
            <rect x={x - 44} y="118" width="88" height="30" rx="9" fill="#fff" stroke={INK} strokeWidth="2" />
            <Tx x={x} y={138} size={12} anchor="middle">{r ? "South" : "West"}</Tx>
          </g>
        ))}
        {outlets.map((x, k) => {
          const parent = k < 2 ? 120 : 360;
          const lit = m === 0 || selected.includes(k);
          return (
            <g key={x}>
              <path d={`M${parent} 148C${parent} 166 ${x} 164 ${x} 190`} fill="none" stroke={INK} strokeWidth="2" />
              <rect x={x - 38} y="190" width="76" height="28" rx="8" fill={lit && m === 1 ? MUSTARD : "#fff"} stroke={INK} strokeWidth="2" className="bl-ease" />
              <Tx x={x} y={209} size={11.5} anchor="middle">Outlet {k + 1}</Tx>
              {[-20, 20].map((dx) => (
                <g key={dx}>
                  <path d={`M${x} 218V234`} stroke={INK} strokeWidth="2" />
                  <rect x={x + dx - 18} y="236" width="36" height="26" rx="4" fill={INK} />
                  <rect
                    x={x + dx - 15}
                    y="239"
                    width="30"
                    height="20"
                    rx="2"
                    fill={lit ? (m === 0 ? TOMATO : MUSTARD) : "#3A3A3A"}
                    className="bl-ease"
                  />
                  {lit && (
                    <g className="bl-glow">
                      <circle cx={x + dx} cy={249} r="4" fill="#fff" />
                    </g>
                  )}
                </g>
              ))}
            </g>
          );
        })}
        <g key={m} className="bl-swap">
          <Chip x={110} y={282} w={260} h={28} fill={m === 0 ? TOMATO : MUSTARD} color={m === 0 ? "#fff" : INK} stroke={INK} size={12.5}>
            {m === 0 ? "National Campaign: New Burger Launch" : "Outlet Campaign: Weekend Offer"}
          </Chip>
        </g>
      </Art>
    </div>
  );
}

/* Sold out: one tap on a phone updates every outlet's screen. */
export function SoldOutFigure({ inView }) {
  const [p] = useCycle(3, 2200, inView);
  const sold = p === 2;
  return (
    <Art viewBox="0 0 480 300" label="A team member marks Loaded Fries as sold out on a phone, and the item updates on three outlets' menu screens.">
      <rect width="480" height="300" fill={CREAM} />
      {/* phone */}
      <g className="bl-float">
        <rect x="14" y="40" width="140" height="210" rx="18" fill={INK} />
        <rect x="22" y="58" width="124" height="174" rx="8" fill="#fff" />
        <Tx x={32} y={80} size={11} fill="#6B7280">MENU ITEMS</Tx>
        {["Paneer Wrap", "Loaded Fries", "Cold Coffee"].map((t, k) => (
          <g key={t}>
            <rect x="30" y={92 + k * 40} width="108" height="32" rx="7" fill={k === 1 && p >= 1 ? "#FFE3D6" : "#F3F4F6"} className="bl-ease" />
            <Tx x={38} y={112 + k * 40} size={10.5} weight={700}>
              {t}
            </Tx>
          </g>
        ))}
        <rect x="106" y="138" width="26" height="14" rx="7" fill={p >= 1 ? TOMATO : "#D1D5DB"} className="bl-ease" />
        <circle cx={p >= 1 ? 125 : 113} cy="145" r="5" fill="#fff" />
        {p === 1 && (
          <g className="bl-pulse">
            <circle cx="119" cy="145" r="10" fill="none" stroke={TOMATO} strokeWidth="2" />
          </g>
        )}
      </g>
      {[0, 1, 2].map((k) => {
        const d = `M154 146C220 146 230 ${50 + k * 84} 290 ${50 + k * 84}`;
        return (
          <g key={k}>
            <path d={d} fill="none" stroke={INK} strokeWidth="2" className="bl-dash" opacity="0.5" />
            {p === 1 && <Traveller d={d} r={5} fill={TOMATO} dur={1.6} delay={k * 0.15} />}
            <Display x={290} y={18 + k * 84} w={170} h={68} glass={CHALK}>
              <Tx x={10} y={18} size={10} fill={MUSTARD}>OUTLET {k + 1}</Tx>
              {["Paneer Wrap", "Loaded Fries", "Cold Coffee"].map((t, j) => (
                <g key={t}>
                  <Tx x={10} y={34 + j * 12} size={10} weight={700} fill={j === 1 && sold ? "#9CA3AF" : "#F8F6F2"}>
                    {t}
                  </Tx>
                  {j === 1 && sold && <line x1="8" y1={43} x2="84" y2={43} stroke={TOMATO} strokeWidth="2" />}
                </g>
              ))}
              {sold && (
                <g className="bl-swap">
                  <g transform="rotate(-12 124 38)">
                    <rect x="92" y="26" width="66" height="22" rx="4" fill="none" stroke={TOMATO} strokeWidth="2.5" />
                    <Tx x={125} y={42} size={11} anchor="middle" fill={TOMATO}>SOLD OUT</Tx>
                  </g>
                </g>
              )}
            </Display>
          </g>
        );
      })}
      <Tx x={82} y={280} size={12.5} anchor="middle" weight={700} fill="#4B5563">
        Central team
      </Tx>
    </Art>
  );
}

/* More than menus: one screen, six kinds of message. */
const MORE = [
  { k: "Promotions", t: ["20% OFF", "FAMILY COMBOS"], bg: TOMATO, icon: "pct" },
  { k: "New Product Launches", t: ["NEW — PERI PERI", "CHICKEN BURGER"], bg: "#1F30A0", icon: "new" },
  { k: "Brand Content", t: ["Made Fresh.", "Served Fast."], bg: CHALK, icon: "chef" },
  { k: "Customer Information", t: ["Scan to Join Our", "Loyalty Program"], bg: "#2E9E5B", icon: "qr" },
  { k: "Cross-Selling", t: ["Don't Forget", "Dessert"], bg: "#B83280", icon: "cake" },
  { k: "Social Media", t: ["Follow Us on", "Instagram"], bg: "#914BFA", icon: "cam" },
];
function MoreIcon({ type }) {
  switch (type) {
    case "pct":
      return (
        <g>
          <circle r="40" fill={MUSTARD} stroke={INK} strokeWidth="2.5" />
          <Tx x={0} y={11} size={30} anchor="middle">%</Tx>
        </g>
      );
    case "new":
      return (
        <g>
          <polygon points={Array.from({ length: 16 }, (_, i) => `${Math.cos((i * Math.PI) / 8) * (i % 2 ? 30 : 42)},${Math.sin((i * Math.PI) / 8) * (i % 2 ? 30 : 42)}`).join(" ")} fill={MUSTARD} stroke={INK} strokeWidth="2.5" />
          <Tx x={0} y={6} size={16} anchor="middle">NEW</Tx>
        </g>
      );
    case "chef":
      return (
        <g>
          <path d="M-26 6a16 16 0 0 1 6-30 20 20 0 0 1 40 0 16 16 0 0 1 6 30z" fill="#fff" stroke={INK} strokeWidth="2.5" />
          <rect x="-22" y="6" width="44" height="18" rx="3" fill="#fff" stroke={INK} strokeWidth="2.5" />
        </g>
      );
    case "qr":
      return (
        <g>
          <rect x="-36" y="-36" width="72" height="72" rx="6" fill="#fff" stroke={INK} strokeWidth="2.5" />
          {[[-28, -28], [8, -28], [-28, 8]].map(([x, y], i) => (
            <g key={i}>
              <rect x={x} y={y} width="20" height="20" fill={INK} />
              <rect x={x + 5} y={y + 5} width="10" height="10" fill="#fff" />
            </g>
          ))}
          {[[10, 10], [22, 14], [14, 24], [26, 26], [4, 20]].map(([x, y], i) => (
            <rect key={i} x={x} y={y} width="6" height="6" fill={INK} />
          ))}
          <g className="bl-scan"><rect x="-34" y="-34" width="68" height="3" fill={TOMATO} /></g>
        </g>
      );
    case "cake":
      return (
        <g>
          <path d="M-34 20L30-14v34z" fill="#F9C6D3" stroke={INK} strokeWidth="2.5" />
          <path d="M-34 20L30-14l4-8-70 28z" fill="#fff" stroke={INK} strokeWidth="2" />
          <circle cx="22" cy="-24" r="7" fill={TOMATO} stroke={INK} strokeWidth="2" />
        </g>
      );
    default:
      return (
        <g>
          <rect x="-34" y="-30" width="68" height="60" rx="16" fill="#fff" stroke={INK} strokeWidth="2.5" />
          <circle r="14" fill="none" stroke={INK} strokeWidth="3" />
          <circle cx="20" cy="-18" r="3.5" fill={INK} />
          <g className="bl-beat">
            <path d="M38-36c4-8 16-4 10 6l-10 10-10-10c-6-10 6-14 10-6z" fill={TOMATO} />
          </g>
        </g>
      );
  }
}
export function MoreThanMenusFigure({ inView }) {
  const [i, pick] = useCycle(MORE.length, 2600, inView);
  const it = MORE[i];
  return (
    <div>
      <div className="border-b-2 border-sb-ink bg-white px-4 py-3">
        <Seg label="Type of message" options={MORE.map((x) => x.k)} value={i} onChange={pick} />
      </div>
      <Art viewBox="0 0 480 280" label={`The same screen showing ${it.k.toLowerCase()}: ${it.t.join(" ")}.`}>
        <rect width="480" height="280" fill={CREAM} />
        <Display x={40} y={20} w={400} h={220} glass={it.bg} mount>
          <g key={i} className="bl-swap">
            <Tx x={22} y={42} size={12} fill="#fff" opacity="0.8">
              {it.k.toUpperCase()}
            </Tx>
            <Tx x={22} y={92} size={26} fill="#fff">
              {it.t[0]}
            </Tx>
            <Tx x={22} y={124} size={26} fill={MUSTARD}>
              {it.t[1]}
            </Tx>
            <g transform="translate(300 110)">
              <MoreIcon type={it.icon} />
            </g>
          </g>
        </Display>
        <Tx x={240} y={270} size={12.5} anchor="middle" weight={700} fill="#4B5563">
          Same hardware. Different job.
        </Tx>
      </Art>
    </div>
  );
}

/* Café: the same screen in the afternoon and in the evening. */
export function CafeFigure({ inView }) {
  const [m, pick] = useCycle(2, 4200, inView);
  const eve = m === 1;
  return (
    <div>
      <div className="border-b-2 border-sb-ink bg-white px-4 py-3">
        <Seg label="Time of day" options={["Afternoon", "Evening"]} value={m} onChange={pick} />
      </div>
      <Art viewBox="0 0 480 300" label={eve ? "Evening: Evening Coffee Combo, Cappuccino + Garlic Bread, ₹249." : "Afternoon: Feeling Sleepy? Cold Coffee + Chocolate Cookie, ₹199."}>
        <rect width="480" height="300" fill={eve ? "#2A2550" : "#FFF0D9"} style={{ transition: "fill 0.8s" }} />
        {/* window */}
        <rect x="24" y="30" width="120" height="120" rx="8" fill={eve ? "#1B1840" : "#BFE3FF"} stroke={INK} strokeWidth="3" style={{ transition: "fill 0.8s" }} />
        <line x1="84" y1="30" x2="84" y2="150" stroke={INK} strokeWidth="3" />
        <line x1="24" y1="90" x2="144" y2="90" stroke={INK} strokeWidth="3" />
        {eve ? (
          <g key="moon" className="bl-swap">
            <path d="M60 50a16 16 0 1 0 14 24 13 13 0 1 1-14-24z" fill="#F8F6F2" />
            <Spark x={118} y={60} r={6} fill="#fff" />
            <Spark x={110} y={120} r={5} fill="#fff" delay={0.6} />
          </g>
        ) : (
          <g key="sun" className="bl-swap">
            <circle cx="60" cy="60" r="16" fill={MUSTARD} />
            <g className="bl-spin">
              {Array.from({ length: 8 }, (_, k) => (
                <rect key={k} x="58" y="34" width="4" height="8" rx="2" fill={MUSTARD} transform={`rotate(${k * 45} 60 60)`} />
              ))}
            </g>
          </g>
        )}
        {/* lamp in the evening */}
        {eve && (
          <g className="bl-sway">
            <line x1="200" y1="0" x2="200" y2="20" stroke="#F8F6F2" strokeWidth="2" />
            <path d="M184 20h32l8 16h-48z" fill={MUSTARD} />
            <circle cx="200" cy="40" r="22" fill={MUSTARD} opacity="0.25" />
          </g>
        )}
        <Display x={236} y={30} w={220} h={170} glass={eve ? "#3B2A6E" : "#7A4E33"} mount>
          <g key={m} className="bl-swap">
            <Tx x={14} y={34} size={18} fill="#fff">
              {eve ? "Evening Coffee" : "Feeling Sleepy?"}
            </Tx>
            {eve && <Tx x={14} y={56} size={18} fill="#fff">Combo</Tx>}
            <Tx x={14} y={eve ? 84 : 62} size={12.5} weight={700} fill="#F3E3CF">
              {eve ? "Cappuccino + Garlic Bread" : "Cold Coffee + Chocolate Cookie"}
            </Tx>
            <rect x="14" y={eve ? 100 : 78} width="82" height="32" rx="16" fill={MUSTARD} />
            <Tx x={55} y={eve ? 122 : 100} size={17} anchor="middle">
              {eve ? "₹249" : "₹199"}
            </Tx>
            {eve ? (
              <g>
                <path d="M138 108h46v14a20 20 0 0 1-20 20h-6a20 20 0 0 1-20-20z" fill="#fff" />
                <ellipse cx="161" cy="108" rx="23" ry="6" fill="#C88A5A" />
                <g className="bl-steam"><path d="M156 100c-4-6 4-10 0-16" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" /></g>
              </g>
            ) : (
              <g>
                <path d="M140 80h30l-5 62h-20z" fill="#C88A5A" stroke="#fff" strokeWidth="2.5" />
                <circle cx="184" cy="132" r="13" fill="#8A5A3C" />
                {[[180, 126], [188, 134], [182, 138]].map(([x, y], k) => (
                  <circle key={k} cx={x} cy={y} r="2" fill="#3B2416" />
                ))}
              </g>
            )}
          </g>
        </Display>
        {/* customer */}
        <Person x={190} y={296} s={0.85} top={eve ? "#14B8A6" : "#914BFA"} skin={SKIN[1]} hair={HAIR[2]} hairStyle="long" pose={eve ? "point" : "stand"} />
        {!eve && (
          <g>
            {["z", "Z"].map((z, k) => (
              <g key={z} className="bl-rise" style={{ animationDelay: `${k * 1.1}s` }}>
                <Tx x={208 + k * 10} y={190} size={14 + k * 4} fill="#6B7280">
                  {z}
                </Tx>
              </g>
            ))}
          </g>
        )}
        <rect x="0" y="262" width="200" height="38" fill={eve ? "#3B2A6E" : "#8A5A3C"} />
        <Tx x={100} y={286} size={12.5} anchor="middle" weight={800} fill="#fff">
          Same screen. New content.
        </Tx>
      </Art>
    </div>
  );
}
