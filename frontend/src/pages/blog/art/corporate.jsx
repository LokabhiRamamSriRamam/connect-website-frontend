import { Art, Display, Tx, Chip, Person, SKIN, HAIR, Traveller, Spark, Lock, Clock } from "./shared";
import { Seg, useCycle } from "../kit";

/* Blog 4 — Internal corporate communication screens. */

const INK = "#191919";
const BLUE = "#2563EB";
const TEAL = "#14B8A6";
const GOLD = "#F5C542";
const SKY = "#EAF1FF";
const GREEN = "#4CAF6E";
const SLATE = "#64748B";

/* Inbox and chat noise vs one screen everyone walks past. */
export function NoiseFigure({ inView }) {
  const [m, pick] = useCycle(2, 3800, inView);
  const screen = m === 1;
  return (
    <div>
      <div className="border-b-2 border-sb-ink bg-white px-4 py-3">
        <Seg label="Channel" options={["Inbox & chat", "The screen on the floor"]} value={m} onChange={pick} />
      </div>
      <Art viewBox="0 0 480 280" label={screen ? "One lobby screen that everyone walking past sees." : "An overflowing inbox and muted chat messages."}>
        <rect width="480" height="280" fill={screen ? SKY : "#F3F4F6"} style={{ transition: "fill 0.6s" }} />
        {!screen ? (
          <g key="inbox" className="bl-swap">
            <rect x="60" y="40" width="360" height="200" rx="12" fill="#fff" stroke={INK} strokeWidth="2.5" />
            <rect x="60" y="40" width="360" height="34" rx="12" fill={SLATE} />
            <Tx x={78} y={62} size={13} fill="#fff">Inbox</Tx>
            <circle cx="398" cy="57" r="13" fill="#EF4444" />
            <Tx x={398} y={62} size={12} anchor="middle" fill="#fff">47</Tx>
            {[0, 1, 2, 3].map((k) => (
              <g key={k} className="bl-float-sm" style={{ animationDelay: `${k * 0.3}s` }}>
                <rect x="76" y={90 + k * 36} width="328" height="28" rx="6" fill="#F3F4F6" />
                <circle cx="94" cy={104 + k * 36} r="7" fill="#D1D5DB" />
                <rect x="110" y={99 + k * 36} width={[180, 140, 200, 120][k]} height="6" rx="3" fill="#D1D5DB" />
                <rect x="110" y={109 + k * 36} width={[110, 90, 130, 80][k]} height="5" rx="2.5" fill="#E5E7EB" />
              </g>
            ))}
            {[0, 1].map((k) => (
              <g key={k} className="bl-drift" style={{ animationDelay: `${k * 0.9}s` }}>
                <rect x={330 + k * 60} y={20 + k * 180} width="54" height="34" rx="10" fill="#9CA3AF" />
                <path d={`M${344 + k * 60} 54l-8 12 18-12z`} fill="#9CA3AF" />
                <line x1={338 + k * 60} y1={28 + k * 180} x2={358 + k * 60} y2={48 + k * 180} stroke="#6B7280" strokeWidth="3" strokeLinecap="round" />
                <line x1={358 + k * 60} y1={28 + k * 180} x2={338 + k * 60} y2={48 + k * 180} stroke="#6B7280" strokeWidth="3" strokeLinecap="round" />
              </g>
            ))}
          </g>
        ) : (
          <g key="screen" className="bl-swap">
            <rect x="0" y="222" width="480" height="58" fill="#DCE6F8" />
            <Display x={120} y={36} w={240} h={150} glass={BLUE} mount>
              <Tx x={18} y={40} size={17} fill="#fff">TOWN HALL</Tx>
              <Tx x={18} y={64} size={13} weight={700} fill="#BFDBFE">Friday · 4:00 PM · Atrium</Tx>
              <rect x="18" y="80" width="110" height="10" rx="5" fill={GOLD} />
              <rect x="18" y="98" width="80" height="10" rx="5" fill="#fff" opacity="0.7" />
              <circle cx="190" cy="78" r="30" fill={TEAL} />
            </Display>
            {[0, 1, 2].map((k) => (
              <g key={k} className="bl-pulse" style={{ animationDelay: `${k * 0.6}s` }}>
                <circle cx="240" cy="110" r="40" fill="none" stroke={BLUE} strokeWidth="2" />
              </g>
            ))}
            <g className="bl-walk" style={{ animationDuration: "15s" }}>
              <Person x={0} y={266} s={0.9} top="#914BFA" skin={SKIN[1]} hair={HAIR[0]} walk />
            </g>
            <Person x={120} y={266} s={0.9} top={TEAL} skin={SKIN[3]} hair={HAIR[1]} hairStyle="long" pose="point" />
            <Person x={380} y={266} s={0.9} flip top="#F97316" skin={SKIN[0]} hair={HAIR[2]} hairStyle="bun" pose="point" />
          </g>
        )}
      </Art>
    </div>
  );
}

/* The split-screen layout: Main 50%, Secondary 30%, Ticker 20%. */
const ZONES = [
  { key: "Main Zone", pct: "50%", desc: "HR broadcasts, town halls, spot awards, festive greetings" },
  { key: "Secondary Zone", pct: "30%", desc: "Room schedules, floor maps, shuttle timings" },
  { key: "Ticker Banner", pct: "20%", desc: "Company news, milestones, emergency alerts" },
];
const MAIN_SLIDES = [
  { t: ["Town Hall", "Friday 4:00 PM"], c: BLUE },
  { t: ["Spot Award", "Priya — Support"], c: TEAL },
  { t: ["Happy Diwali", "from the team"], c: "#E4572E" },
];
export function ZonesFigure({ inView }) {
  const [z, pick] = useCycle(3, 3000, inView);
  const [s] = useCycle(3, 2400, inView);
  const slide = MAIN_SLIDES[s];
  const on = (k) => (z === k ? 1 : 0.32);
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-sb-ink bg-white px-4 py-3">
        <Seg label="Highlight a zone" options={ZONES.map((x) => `${x.key} (${x.pct})`)} value={z} onChange={pick} />
      </div>
      <Art viewBox="0 0 480 320" label="A 55-inch screen split into three zones: a main zone at 50% for HR broadcasts, a secondary zone at 30% for schedules, maps and shuttle timings, and a 20% ticker for company news and emergency announcements.">
        <rect width="480" height="320" fill={SKY} />
        <Display x={24} y={20} w={432} h={250} glass="#0F172A" mount>
          {/* main zone */}
          <g className="bl-ease" style={{ opacity: on(0), transition: "opacity 0.4s" }}>
            <rect x="8" y="8" width="252" height="162" rx="6" fill={slide.c} className="bl-ease" style={{ transition: "fill 0.6s" }} />
            <g key={s} className="bl-swap">
              <Tx x={24} y={56} size={24} fill="#fff">{slide.t[0]}</Tx>
              <Tx x={24} y={86} size={15} weight={700} fill="#fff" opacity="0.85">{slide.t[1]}</Tx>
            </g>
            <rect x="24" y="104" width="90" height="12" rx="6" fill={GOLD} />
            <Tx x={24} y={154} size={11} fill="#fff" opacity="0.7">MAIN ZONE · 50%</Tx>
          </g>
          {/* secondary */}
          <g className="bl-ease" style={{ opacity: on(1), transition: "opacity 0.4s" }}>
            <rect x="268" y="8" width="148" height="100" rx="6" fill="#1E293B" />
            <Tx x={280} y={28} size={11} fill={TEAL}>MEETING ROOMS</Tx>
            {[["Ganga", "Free"], ["Yamuna", "Busy"], ["Kaveri", "Free"]].map(([r, st], k) => (
              <g key={r}>
                <Tx x={280} y={48 + k * 18} size={10.5} weight={700} fill="#fff">{r}</Tx>
                <circle cx={396} cy={44 + k * 18} r="4" fill={st === "Free" ? GREEN : "#EF4444"} />
              </g>
            ))}
            <rect x="268" y="112" width="148" height="58" rx="6" fill="#1E293B" />
            <Tx x={280} y={132} size={11} fill={GOLD}>NOTICES &amp; EVENTS</Tx>
            <rect x="280" y="140" width="100" height="6" rx="3" fill="#fff" opacity="0.6" />
            <rect x="280" y="152" width="76" height="6" rx="3" fill="#fff" opacity="0.4" />
            <Tx x={280} y={100} size={9.5} fill="#64748B">SECONDARY · 30%</Tx>
          </g>
          {/* ticker */}
          <g className="bl-ease" style={{ opacity: on(2), transition: "opacity 0.4s" }}>
            <rect x="8" y="178" width="408" height="38" rx="6" fill={GOLD} />
            <g className="bl-marquee" style={{ animationDuration: "14s" }}>
              <Tx x={20} y={203} size={13}>
                Shuttle 6:30 PM · Q3 results announced · Fire drill Thursday 11 AM · Welcome to our 500th employee · Shuttle 6:30 PM · Q3 results announced ·
              </Tx>
            </g>
            <Tx x={20} y={170} size={9.5} fill="#64748B">TICKER · 20%</Tx>
          </g>
        </Display>
        <g key={z} className="bl-swap">
          <Chip x={24} y={282} w={432} h={30} fill={INK} size={12.5}>
            {`${ZONES[z].key} — ${ZONES[z].desc}`}
          </Chip>
        </g>
      </Art>
    </div>
  );
}

/* Role-based access: three keycards unlocking different controls. */
const ROLES = [
  { name: "HR & Workplace", can: ["Upload media", "Edit announcement zone", "Schedule communications"], cant: ["Network settings", "Device configuration"], color: BLUE },
  { name: "IT Operations", can: ["Hardware settings", "Network configuration", "Screen management"], cant: [], color: "#0F172A" },
  { name: "Facility Leads", can: ["Floor-specific notices"], cant: ["Company-wide brand playlists"], color: TEAL },
];
export function RolesFigure({ inView }) {
  const [r, pick] = useCycle(3, 3000, inView);
  const role = ROLES[r];
  return (
    <div>
      <div className="border-b-2 border-sb-ink bg-white px-4 py-3">
        <Seg label="Signed in as" options={ROLES.map((x) => x.name)} value={r} onChange={pick} />
      </div>
      <Art viewBox="0 0 480 300" label={`${role.name} can ${role.can.join(", ").toLowerCase()}${role.cant.length ? `, but not ${role.cant.join(" or ").toLowerCase()}` : ""}.`}>
        <rect width="480" height="300" fill={SKY} />
        {/* keycard */}
        <g className="bl-float">
          <rect x="24" y="80" width="130" height="86" rx="10" fill={role.color} stroke={INK} strokeWidth="2.5" className="bl-ease" style={{ transition: "fill 0.5s" }} />
          <rect x="36" y="94" width="44" height="30" rx="4" fill={GOLD} />
          <g key={r} className="bl-swap">
            <Tx x={36} y={144} size={12} fill="#fff">{role.name.toUpperCase()}</Tx>
          </g>
          <circle cx="134" cy="150" r="7" fill="#fff" opacity="0.5" />
        </g>
        <path d="M158 122h40" stroke={INK} strokeWidth="2.5" className="bl-dash" />
        {/* dashboard */}
        <rect x="206" y="30" width="250" height="236" rx="12" fill="#fff" stroke={INK} strokeWidth="2.5" />
        <rect x="206" y="30" width="250" height="30" rx="12" fill={INK} />
        <Tx x={224} y={50} size={12} fill="#fff">Screen Bazaar dashboard</Tx>
        {[...role.can.map((t) => [t, true]), ...role.cant.map((t) => [t, false])].map(([t, allowed], k) => (
          <g key={t} className="bl-swap" style={{ animationDelay: `${k * 0.08}s` }}>
            <rect x="222" y={76 + k * 36} width="218" height="28" rx="7" fill={allowed ? "#EAF8EF" : "#F3F4F6"} stroke={allowed ? GREEN : "#D1D5DB"} strokeWidth="1.5" />
            <Tx x={238} y={95 + k * 36} size={12} weight={700} fill={allowed ? INK : "#9CA3AF"}>
              {t}
            </Tx>
            {allowed ? (
              <path d={`M414 ${89 + k * 36}l5 5 9-10`} fill="none" stroke={GREEN} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="bl-tick" style={{ animationDelay: `${k * 0.2}s` }} />
            ) : (
              <Lock x={420} y={92 + k * 36} s={0.75} fill="#D1D5DB" />
            )}
          </g>
        ))}
        <Tx x={240} y={288} size={12} weight={700} fill={SLATE}>
          No extra helpdesk tickets.
        </Tx>
      </Art>
    </div>
  );
}

/* Support, warranty and maintenance across the floors. */
export function SupportFigure({ inView }) {
  const [p] = useCycle(3, 2400, inView);
  return (
    <Art viewBox="0 0 480 280" label="A screen on the fourth floor needs attention; support, warranty and maintenance handle it instead of the internal IT helpdesk.">
      <rect width="480" height="280" fill={SKY} />
      {/* tower */}
      <rect x="30" y="30" width="190" height="230" rx="8" fill="#fff" stroke={INK} strokeWidth="2.5" />
      {[0, 1, 2, 3].map((f) => {
        const y = 42 + f * 56;
        const bad = f === 0 && p < 2;
        return (
          <g key={f}>
            <line x1="30" y1={y + 48} x2="220" y2={y + 48} stroke="#E5E7EB" strokeWidth="2" />
            <Tx x={42} y={y + 16} size={9.5} fill={SLATE}>FLOOR {4 - f}</Tx>
            <rect x="140" y={y + 4} width="64" height="38" rx="4" fill={INK} />
            <rect x="143" y={y + 7} width="58" height="32" rx="2" fill={bad ? "#3A3A3A" : BLUE} className="bl-ease" />
            {bad && (
              <g className="bl-blink">
                <Tx x={172} y={y + 28} size={11} anchor="middle" fill="#EF4444">!</Tx>
              </g>
            )}
            {!bad && f === 0 && p === 2 && (
              <g className="bl-swap">
                <circle cx="196" cy={y + 13} r="5" fill={GREEN} />
              </g>
            )}
            <Person x={70} y={y + 48} s={0.42} top={["#914BFA", TEAL, "#F97316", BLUE][f]} skin={SKIN[f]} hair={HAIR[f % 3]} />
          </g>
        );
      })}
      {/* three pillars */}
      {[
        ["Support", "a team to call"],
        ["Warranty", "cover on the screens"],
        ["Maintenance", "kept running"],
      ].map(([t, d], k) => (
        <g key={t} className="bl-ease" style={{ opacity: p >= 0 ? 1 : 0.4 }}>
          <rect x="256" y={40 + k * 76} width="196" height="60" rx="12" fill="#fff" stroke={INK} strokeWidth="2.5" />
          <circle cx="288" cy={70 + k * 76} r="16" fill={[BLUE, GOLD, TEAL][k]} />
          <Tx x={288} y={76 + k * 76} size={16} anchor="middle" fill={k === 1 ? INK : "#fff"}>
            {["☎", "✓", "⚙"][k]}
          </Tx>
          <Tx x={316} y={66 + k * 76} size={14}>{t}</Tx>
          <Tx x={316} y={84 + k * 76} size={11.5} weight={700} fill={SLATE}>{d}</Tx>
        </g>
      ))}
      {p === 1 && <Traveller d="M256 70C230 70 210 60 206 60" r={5} fill={GOLD} dur={1.2} />}
    </Art>
  );
}
