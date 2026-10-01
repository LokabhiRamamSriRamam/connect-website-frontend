import { Art, Display, Tx, Chip, Traveller, Wifi, Cloud, Lock, Spark } from "./shared";
import { Seg, useCycle } from "../kit";

/* Blog 6 — Enterprise digital signage CMS checklist. */

const INK = "#191919";
const GREEN = "#2E9E5B";
const BLUE = "#2563EB";
const VIOLET = "#914BFA";
const GOLD = "#F5C542";
const MINT = "#EAF8EF";
const RED = "#EF4444";
const SLATE = "#64748B";

/* Multi-zone layout + dayparting + tags. */
const TABS = ["Split-screen zoning", "Automated dayparting", "Tag & playlist rules"];
const DAYPARTS = [
  { t: "7:00 AM", h: "Breakfast Menu", c: "#E4572E" },
  { t: "11:30 AM", h: "Lunch Combos", c: GOLD },
  { t: "7:00 PM", h: "Dinner Menu", c: VIOLET },
];
export function ZoningFigure({ inView }) {
  const [tab, pick] = useCycle(3, 3400, inView);
  const [d] = useCycle(3, 2200, inView);
  const tagged = [0, 2, 3, 5];
  return (
    <div>
      <div className="border-b-2 border-sb-ink bg-white px-4 py-3">
        <Seg label="Capability" options={TABS} value={tab} onChange={pick} />
      </div>
      <Art viewBox="0 0 480 290" label={`${TABS[tab]} shown on screen.`}>
        <rect width="480" height="290" fill={MINT} />
        {tab === 0 && (
          <g key="zones" className="bl-swap">
            <Display x={60} y={24} w={360} h={210} glass="#0F172A">
              <rect x="8" y="8" width="214" height="126" rx="5" fill={BLUE} />
              <Tx x={22} y={44} size={16} fill="#fff">Promo video</Tx>
              <g className="bl-beat">
                <path d="M96 70l34 20-34 20z" fill="#fff" />
              </g>
              <rect x="230" y="8" width="114" height="60" rx="5" fill="#1E293B" />
              <Tx x={242} y={30} size={10.5} fill={GOLD}>WEATHER / NEWS</Tx>
              <circle cx="266" cy="48" r="9" fill={GOLD} />
              <rect x="282" y="43" width="50" height="6" rx="3" fill="#fff" opacity="0.6" />
              <rect x="230" y="74" width="114" height="60" rx="5" fill="#1E293B" />
              <Tx x={242} y={96} size={10.5} fill={GREEN}>BRAND</Tx>
              <rect x="242" y="104" width="60" height="18" rx="4" fill="#fff" opacity="0.8" />
              <rect x="8" y="142" width="336" height="32" rx="5" fill={GOLD} />
              <g className="bl-marquee" style={{ animationDuration: "12s" }}>
                <Tx x={18} y={163} size={12}>Localized ticker · store offers · announcements · localized ticker · store offers · announcements ·</Tx>
              </g>
            </Display>
            <Chip x={60} y={248} w={360} h={28} fill={INK} size={12}>
              One screen, several independent zones
            </Chip>
          </g>
        )}
        {tab === 1 && (
          <g key="daypart" className="bl-swap">
            <Display x={100} y={24} w={280} h={170} glass={DAYPARTS[d].c} mount>
              <g key={d} className="bl-flip">
                <Tx x={20} y={54} size={15} fill="#fff" opacity="0.85">{DAYPARTS[d].t}</Tx>
                <Tx x={20} y={96} size={26} fill="#fff">{DAYPARTS[d].h}</Tx>
                <rect x="20" y="112" width="90" height="12" rx="6" fill="#fff" opacity="0.8" />
              </g>
            </Display>
            <rect x="60" y="216" width="360" height="12" rx="6" fill="#fff" stroke={INK} strokeWidth="2" />
            {DAYPARTS.map((x, k) => (
              <g key={x.t}>
                <circle cx={80 + k * 160} cy={222} r={k === d ? 11 : 7} fill={k === d ? x.c : "#fff"} stroke={INK} strokeWidth="2.5" className="bl-ease" />
                <Tx x={80 + k * 160} y={254} size={11.5} anchor="middle">{x.t}</Tx>
              </g>
            ))}
            <Chip x={150} y={266} w={180} h={22} fill={INK} size={10.5}>
              no manual intervention
            </Chip>
          </g>
        )}
        {tab === 2 && (
          <g key="tags" className="bl-swap">
            <Chip x={30} y={30} w={140} h={30} fill={VIOLET} stroke={INK} size={12}>
              Mumbai Stores
            </Chip>
            <Chip x={190} y={30} w={170} h={30} fill={GREEN} stroke={INK} size={12}>
              Cafeteria Displays
            </Chip>
            {Array.from({ length: 12 }, (_, k) => {
              const x = 44 + (k % 6) * 68;
              const y = 110 + Math.floor(k / 6) * 76;
              const on = tagged.includes(k);
              return (
                <g key={k}>
                  <rect x={x} y={y} width="54" height="38" rx="4" fill={INK} />
                  <rect x={x + 3} y={y + 3} width="48" height="32" rx="2" fill={on ? VIOLET : "#CBD5E1"} className="bl-ease" />
                  {on && (
                    <g className="bl-pulse">
                      <circle cx={x + 27} cy={y + 19} r="16" fill="none" stroke={VIOLET} strokeWidth="2" />
                    </g>
                  )}
                </g>
              );
            })}
            <Chip x={100} y={254} w={280} h={28} fill={INK} size={12}>
              One click → every screen with that tag
            </Chip>
          </g>
        )}
      </Art>
    </div>
  );
}

/* Localization: one banner, three scripts. */
const LANGS = [
  { label: "English", h: "WELCOME", s: "Today's special inside" },
  { label: "हिन्दी", h: "स्वागत है", s: "आज का विशेष अंदर" },
  { label: "मराठी", h: "स्वागत आहे", s: "आजचे विशेष आत" },
];
export function LanguageFigure({ inView }) {
  const [i, pick] = useCycle(3, 2400, inView);
  const l = LANGS[i];
  return (
    <div>
      <div className="border-b-2 border-sb-ink bg-white px-4 py-3">
        <Seg label="Language overlay" options={LANGS.map((x) => x.label)} value={i} onChange={pick} />
      </div>
      <Art viewBox="0 0 480 220" label={`The same banner with a ${l.label} text overlay: ${l.h}.`}>
        <rect width="480" height="220" fill={MINT} />
        <Display x={90} y={20} w={300} h={160} glass={BLUE}>
          <circle cx="232" cy="80" r="52" fill={GOLD} opacity="0.9" />
          <g key={i} className="bl-swap">
            <Tx x={22} y={70} size={30} fill="#fff">{l.h}</Tx>
            <Tx x={22} y={100} size={14} weight={700} fill="#fff" opacity="0.85">{l.s}</Tx>
          </g>
          <rect x="22" y="112" width="70" height="10" rx="5" fill={GREEN} />
        </Display>
        <Tx x={240} y={206} size={12} anchor="middle" weight={700} fill={SLATE}>
          Same layout. Different script.
        </Tx>
      </Art>
    </div>
  );
}

/* Health monitoring dashboard. */
export function HealthFigure({ inView }) {
  const [p] = useCycle(2, 3000, inView);
  const rows = [
    ["Andheri Store", "Online", 68, "32°C"],
    ["Dadar Store", p === 1 ? "Offline" : "Online", 54, "34°C"],
    ["Thane Store", "Online", 81, "31°C"],
    ["BKC Office", "Online", 44, "29°C"],
  ];
  return (
    <Art viewBox="0 0 480 280" label="A monitoring dashboard listing each screen's online status, storage and temperature; one store shows as offline.">
      <rect width="480" height="280" fill={MINT} />
      <rect x="24" y="24" width="432" height="232" rx="14" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <rect x="24" y="24" width="432" height="36" rx="14" fill={INK} />
      <Tx x={44} y={47} size={13} fill="#fff">Screen health</Tx>
      <Tx x={436} y={47} size={12} anchor="end" fill={p === 1 ? RED : GREEN}>
        {p === 1 ? "1 needs attention" : "All online"}
      </Tx>
      {["Location", "Status", "Storage", "Temp"].map((h, k) => (
        <Tx key={h} x={[44, 190, 280, 400][k]} y={82} size={10.5} fill={SLATE}>
          {h.toUpperCase()}
        </Tx>
      ))}
      {rows.map(([n, st, store, temp], k) => {
        const y = 100 + k * 38;
        const off = st === "Offline";
        return (
          <g key={n}>
            <rect x="36" y={y} width="408" height="32" rx="8" fill={off ? "#FFF1F2" : "#F8FAFC"} className="bl-ease" />
            <Tx x={44} y={y + 21} size={12}>{n}</Tx>
            <circle cx="196" cy={y + 16} r="5" fill={off ? RED : GREEN} />
            {off && (
              <g className="bl-pulse">
                <circle cx="196" cy={y + 16} r="5" fill="none" stroke={RED} strokeWidth="2" />
              </g>
            )}
            <Tx x={208} y={y + 21} size={11.5} weight={700} fill={off ? RED : GREEN}>{st}</Tx>
            <rect x="280" y={y + 11} width="90" height="10" rx="5" fill="#E2E8F0" />
            <rect x="280" y={y + 11} width={0.9 * store} height="10" rx="5" fill={BLUE} />
            <Tx x={400} y={y + 21} size={11.5} weight={700} fill={SLATE}>{temp}</Tx>
          </g>
        );
      })}
    </Art>
  );
}

/* Offline playback and delta sync. */
export function OfflineFigure({ inView }) {
  const [p, pick] = useCycle(3, 3000, inView);
  const down = p === 1;
  return (
    <div>
      <div className="border-b-2 border-sb-ink bg-white px-4 py-3">
        <Seg label="Network" options={["Connected", "Wi-Fi drops", "Back online"]} value={p} onChange={pick} />
      </div>
      <Art viewBox="0 0 480 270" label={down ? "The Wi-Fi drops but the screen keeps playing from locally cached content." : p === 2 ? "Connectivity returns and only the changed files download." : "Content and schedules download to local storage on the player."}>
        <rect width="480" height="270" fill={MINT} />
        <Cloud x={86} y={66} s={1.1} />
        <Tx x={78} y={72} size={12} anchor="middle">Cloud</Tx>
        <Wifi x={240} y={76} s={1.5} off={down} color={down ? "#9CA3AF" : GREEN} />
        {!down && <Traveller d="M130 70H200" r={5} fill={p === 2 ? GOLD : BLUE} dur={1.2} />}
        {p === 2 && (
          <g className="bl-swap">
            <Chip x={176} y={110} w={128} h={24} fill={GOLD} color={INK} stroke={INK} size={10.5}>
              only changed files
            </Chip>
          </g>
        )}
        <Display x={286} y={34} w={168} h={110} glass={VIOLET} mount>
          <Tx x={16} y={44} size={17} fill="#fff">STILL PLAYING</Tx>
          <rect x="16" y="56" width="70" height="10" rx="5" fill={GOLD} />
          <rect x="16" y="72" width="46" height="8" rx="4" fill="#fff" opacity="0.7" />
        </Display>
        {/* local storage */}
        <rect x="286" y="172" width="168" height="66" rx="10" fill="#fff" stroke={INK} strokeWidth="2.5" />
        <Tx x={300} y={196} size={12}>Local storage</Tx>
        {[0, 1, 2, 3].map((k) => (
          <rect key={k} x={300 + k * 38} y="206" width="30" height="20" rx="4" fill={k < 3 || p !== 0 ? BLUE : "#E2E8F0"} className="bl-ease" style={{ transitionDelay: `${k * 100}ms` }} />
        ))}
        <path d="M370 144v24" stroke={INK} strokeWidth="2.5" className="bl-dash" />
        <g key={p} className="bl-swap">
          <Chip x={24} y={210} w={230} h={30} fill={down ? GREEN : INK} size={12}>
            {["Cached ahead of time", "No buffering icon. No blank screen.", "Syncs quietly in the background"][p]}
          </Chip>
        </g>
      </Art>
    </div>
  );
}

/* Players, encryption, pairing. */
export function SecurityFigure({ inView }) {
  const [p] = useCycle(3, 2600, inView);
  const code = "4 7 2 9";
  return (
    <Art viewBox="0 0 480 280" label="Player platforms, encrypted content delivery from the cloud, and PIN-based screen pairing.">
      <rect width="480" height="280" fill={MINT} />
      {/* players */}
      {["Android box", "Smart TV", "Windows PC", "Media player"].map((t, k) => (
        <g key={t}>
          <rect x={24 + k * 112} y="30" width="88" height="54" rx="8" fill="#fff" stroke={INK} strokeWidth="2.5" />
          {k === 0 && <rect x={44 + k * 112} y="44" width="48" height="26" rx="5" fill={GREEN} />}
          {k === 1 && (
            <>
              <rect x={40} y={0} width="0" height="0" />
              <rect x={44 + k * 112} y="42" width="48" height="30" rx="3" fill={BLUE} />
            </>
          )}
          {k === 2 && (
            <>
              <rect x={42 + k * 112} y="40" width="52" height="30" rx="3" fill={INK} />
              <rect x={45 + k * 112} y="43" width="46" height="24" rx="2" fill={VIOLET} />
            </>
          )}
          {k === 3 && <rect x={46 + k * 112} y="46" width="44" height="22" rx="6" fill={SLATE} />}
          <Tx x={68 + k * 112} y={100} size={11} anchor="middle">{t}</Tx>
        </g>
      ))}
      {/* encrypted pipe */}
      <Cloud x={90} y={170} s={0.9} />
      <path d="M140 172H330" stroke={INK} strokeWidth="2.5" className="bl-dash" />
      <g className="bl-travel" style={{ offsetPath: 'path("M140 172H330")', animationDuration: "2.4s" }}>
        <g transform="translate(-9 -9)">
          <rect width="18" height="18" rx="4" fill={GOLD} stroke={INK} strokeWidth="2" />
          <path d="M6 7V5a3 3 0 0 1 6 0v2" fill="none" stroke={INK} strokeWidth="1.6" />
        </g>
      </g>
      <Tx x={236} y={160} size={11.5} anchor="middle" weight={700} fill={SLATE}>
        SSL / TLS
      </Tx>
      {/* pairing */}
      <Display x={330} y={134} w={126} h={80} glass={INK}>
        <g key={p} className="bl-swap">
          {p < 2 ? (
            <>
              <Tx x={57} y={34} size={10} anchor="middle" fill="#9CA3AF">PAIRING CODE</Tx>
              <Tx x={57} y={60} size={22} anchor="middle" fill={GOLD}>{code}</Tx>
            </>
          ) : (
            <>
              <path d="M44 38l9 9 18-20" fill="none" stroke={GREEN} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="bl-tick" />
              <Tx x={57} y={66} size={11} anchor="middle" fill="#fff">Paired</Tx>
            </>
          )}
        </g>
      </Display>
      <g className="bl-float">
        <rect x="286" y="212" width="34" height="58" rx="7" fill={INK} />
        <rect x="290" y="220" width="26" height="42" rx="3" fill="#fff" />
        {p >= 1 && <Tx x={303} y={246} size={11} anchor="middle">{code.replace(/ /g, "")}</Tx>}
      </g>
      <Lock x={450} y={248} s={1} fill={GREEN} />
    </Art>
  );
}
