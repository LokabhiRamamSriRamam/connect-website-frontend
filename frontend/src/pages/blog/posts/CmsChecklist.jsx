import BlogShell from "../BlogShell";
import { getBlog } from "../meta";
import { H2, H3, Figure, CtaCard, CheckList, ScoreRing, useChecklist, Statement } from "../kit";
import { ZoningFigure, LanguageFigure, HealthFigure, OfflineFigure, SecurityFigure } from "../art/cms";

/* Blog 6 — owner's text (BLOGS_PLAN.md §10) with the approved edits in §11:
   the Gen AI section/row removed, offline row removed, proof-of-play row narrowed,
   support/warranty/maintenance + free-trial rows added. */
const post = getBlog("digital-signage-cms-features-checklist");

const SECTIONS = [
  {
    id: "zones-and-scheduling",
    n: 1,
    title: "Multi-Zone Layouts & Dynamic Scheduling",
    lead: "A powerful CMS allows you to maximize screen real estate and deliver time-sensitive messaging automatically.",
    items: [
      ["Split-Screen Zoning", "The ability to partition a single screen into multiple independent zones—combining promo videos, live weather/news feeds, localized tickers, and static brand assets simultaneously."],
      ["Automated Dayparting", "Scheduling content to transition automatically throughout the day (e.g., swapping breakfast menus for lunch combos at 11:30 AM without manual intervention)."],
      ["Tag & Playlist Rules", 'Grouping screens by city, branch, or floor type (e.g., "Mumbai Stores" or "Cafeteria Displays") to push location-specific content with a single click.'],
    ],
  },
  {
    id: "content-creation",
    n: 2,
    title: "Content Creation & Design Tools",
    lead: "Content creation is often the biggest bottleneck in maintaining active, high-converting digital screens.",
    items: [
      ["Localization & Multi-Language Support", "Easy integration of multi-lingual text overlay (Hindi, English, regional scripts) for localized audience engagement."],
      ["Integrated Template Library", "Pre-built, customizable templates for retail promotions, menu boards, corporate announcements, and emergency notices."],
    ],
  },
  {
    id: "remote-management",
    n: 3,
    title: "Remote Management & Monitoring Diagnostics",
    lead: "Managing physical displays across multiple locations should never require on-site IT visits.",
    items: [
      ["Real-Time Health Monitoring", "A central dashboard displaying online/offline status, playback health, storage capacity, and screen temperature for every device in your network."],
      ["Remote Screen Control & Screenshots", "Ability to capture live screen proofs-of-play and trigger remote reboots or software updates directly from your smartphone or desktop."],
      ["Role-Based Access Control (RBAC)", "Setting custom permissions so department heads (e.g., HR or local store managers) can edit designated content zones without altering core device configurations or global playlists."],
    ],
  },
  {
    id: "offline-reliability",
    n: 4,
    title: "Offline Reliability & Bandwidth Optimization",
    lead: "Intermittent Wi-Fi or cellular network drops should never result in blank screens or buffering error icons.",
    items: [
      ["Offline-First Caching", "Automatic downloading of media files and playback schedules onto local device storage, ensuring uninterrupted 24/7 playback during network drops."],
      ["Background Syncing", "Quiet background synchronization during off-peak hours to avoid bandwidth bottlenecks during critical business hours."],
      ["Low-Bandwidth Modes", "Optimized media compression and delta-syncing (downloading only modified content assets instead of entire playlists)."],
    ],
  },
  {
    id: "hardware-and-security",
    n: 5,
    title: "Enterprise Hardware Compatibility & Security",
    lead: "Your CMS should fit into your existing hardware ecosystem seamlessly while enforcing strict data privacy standards.",
    items: [
      ["Cross-Platform Player Support", "Native compatibility across Android media boxes, Smart TVs (Android TV, WebOS, Tizen), Windows, and dedicated hardware media players."],
      ["Encrypted Data Transmission", "End-to-end SSL/TLS encryption for all content updates pushed from the cloud dashboard to display endpoints."],
      ["Secure Device Pairing", "OTP/PIN-based hardware pairing to prevent unauthorized screen hijacking or rogue device connection to your corporate network."],
    ],
  },
  {
    id: "support-warranty",
    n: 6,
    title: "Support, Warranty & Maintenance",
    lead: "Software is only half of a signage network. The other half is keeping every screen running.",
    items: [
      ["Vendor Support", "A team you can reach for setup, content questions and troubleshooting."],
      ["Hardware Warranty", "Clear warranty cover on the screens in your network."],
      ["Ongoing Maintenance", "Maintenance included, so screens don't quietly go dark between store visits."],
    ],
  },
];

const ALL = SECTIONS.flatMap((s) => s.items.map(([t]) => t));
const idFor = (t) => `cms-${t.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;

const TOC = [
  ...SECTIONS.map((s) => ({ id: s.id, label: `${s.n}. ${s.title}` })),
  { id: "comparison", label: "Feature comparison" },
  { id: "scale", label: "Scale with confidence" },
  { id: "compare-plans", label: "Compare plans" },
];

const COMPARISON = [
  ["Multi-Zone Split Layouts", "No", "Native"],
  ["Automated Multi-Location Dayparting", "No", "Native"],
  ["Multi-Tier Role-Based Access (RBAC)", "No", "Native"],
  ["Proof-of-Play Reports", "No", "Native"],
  ["Support, Warranty & Maintenance", "No", "Included"],
  ["14-Day Free Trial", "No", "Yes"],
];

function Scorecard({ ticks, toggle }) {
  const done = ALL.filter((t) => ticks[idFor(t)]).length;
  return (
    <div className="not-prose my-8 rounded-[24px] border-2 border-sb-ink bg-white p-5 shadow-[6px_6px_0_#191919] sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="m-0 font-manrope text-lg font-extrabold text-sb-ink">How does your current setup score?</p>
          <p className="m-0 mt-1 text-sm font-semibold text-sb-muted">Tick each capability as you read. Your ticks stay in this browser only.</p>
        </div>
        <ScoreRing done={done} total={ALL.length} label="capabilities covered" />
      </div>
    </div>
  );
}

export default function CmsChecklist() {
  const [ticks, toggle] = useChecklist("sb-blog-cms-checklist");
  const figures = {
    "zones-and-scheduling": { node: (inView) => <ZoningFigure inView={inView} />, cap: "Three capabilities on one screen: zoning, dayparting and tag-based publishing." },
    "content-creation": { node: (inView) => <LanguageFigure inView={inView} />, cap: "One layout, several scripts." },
    "remote-management": { node: () => <HealthFigure />, cap: "Status, storage and temperature for every screen in one list." },
    "offline-reliability": { node: (inView) => <OfflineFigure inView={inView} />, cap: "The connection drops; the screen doesn't." },
    "hardware-and-security": { node: () => <SecurityFigure />, cap: "Player platforms, encrypted delivery and PIN-based pairing." },
  };
  return (
    <BlogShell post={post} toc={TOC}>
      <p>
        As businesses across India upgrade from basic media players to multi-screen display networks, choosing the right Digital Signage Content Management System (CMS)
        becomes a critical operational decision. Whether you are running digital menu boards across a restaurant chain, managing promotional displays in retail outlets, or
        handling multi-floor corporate communications, the software behind your screens determines how smoothly your operations run.
      </p>
      <p>Selecting a CMS isn't just about finding a tool that plays videos; it's about network security, content automation, scale, and ease of deployment.</p>
      <p>Screen Bazaar offers an enterprise signage management platform tailored to modern business requirements. Use this comprehensive checklist to evaluate digital signage CMS software before making your decision.</p>

      <Scorecard ticks={ticks} toggle={toggle} />

      {SECTIONS.map((s) => {
        const fig = figures[s.id];
        return (
          <section key={s.id}>
            <H2 id={s.id} num={s.n}>
              {s.title}
            </H2>
            <p>{s.lead}</p>
            {fig && <Figure caption={fig.cap}>{(inView) => fig.node(inView)}</Figure>}
            <div className="not-prose mt-5 grid gap-3">
              {s.items.map(([t, d]) => {
                const id = idFor(t);
                return (
                  <label
                    key={t}
                    htmlFor={id}
                    className="flex cursor-pointer gap-3 rounded-2xl border-2 border-sb-ink bg-white p-4 shadow-[3px_3px_0_#191919] transition-transform hover:-translate-y-0.5"
                  >
                    <input id={id} type="checkbox" className="sr-only" checked={!!ticks[id]} onChange={() => toggle(id)} />
                    <span
                      aria-hidden="true"
                      className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-md border-2 border-sb-ink transition-colors"
                      style={{ background: ticks[id] ? "var(--accent)" : "#fff" }}
                    >
                      <svg width="13" height="13" viewBox="0 0 12 12" style={{ opacity: ticks[id] ? 1 : 0 }}>
                        <path d="M2 6.5l2.6 2.5L10 3.2" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="font-manrope">
                      <span className="block font-extrabold text-sb-ink">{t}</span>
                      <span className="mt-1 block text-[15px] leading-relaxed text-sb-slate">{d}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </section>
        );
      })}

      <H2 id="comparison">The Feature Comparison Checklist</H2>
      <div className="bl-table">
        <table>
          <caption className="sr-only">A basic media player compared with Screen Bazaar</caption>
          <thead>
            <tr>
              <th scope="col">Feature / Capability</th>
              <th scope="col">Basic Player</th>
              <th scope="col">Screen Bazaar</th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON.map(([f, basic, sb]) => (
              <tr key={f}>
                <td>{f}</td>
                <td>
                  <span className="inline-flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                      <circle cx="9" cy="9" r="8" fill="#FEE2E2" stroke="#EF4444" strokeWidth="1.5" />
                      <path d="M6 6l6 6M12 6l-6 6" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    {basic}
                  </span>
                </td>
                <td>
                  <span className="inline-flex items-center gap-2 font-extrabold text-sb-ink">
                    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                      <circle cx="9" cy="9" r="8" fill="#2E9E5B" />
                      <path d="M5.4 9.3l2.4 2.4 4.8-5.2" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="bl-tick" />
                    </svg>
                    {sb}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H2 id="scale">Scale Your Display Network with Confidence</H2>
      <p>Choosing the right digital signage CMS transforms your screens from passive displays into powerful engagement and revenue channels.</p>
      <p>
        With Screen Bazaar, you get a complete cloud management solution designed for seamless deployment, multi-screen control, and ongoing support, warranty and
        maintenance.
      </p>

      <CtaCard id="compare-plans" title="Start your 14-day free trial" label="Start your free trial or request a custom enterprise quote">
        <p>Book a live walkthrough with our solutions team to see how Screen Bazaar can simplify your multi-screen setup.</p>
      </CtaCard>
    </BlogShell>
  );
}
