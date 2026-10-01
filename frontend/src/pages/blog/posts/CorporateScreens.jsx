import BlogShell from "../BlogShell";
import { getBlog } from "../meta";
import { H2, H3, Figure, CtaCard } from "../kit";
import { NoiseFigure, ZonesFigure, RolesFigure, SupportFigure } from "../art/corporate";

/* Blog 4 — owner's text (BLOGS_PLAN.md §10) with the approved edits in §11:
   AI lines removed, unconfirmed capabilities dropped, section 3 replaced with support/warranty/maintenance. */
const post = getBlog("corporate-office-communication-screens-multiple-floors");

const TOC = [
  { id: "split-screen-matrix", label: "1. Split-screen content matrix" },
  { id: "role-based-access", label: "2. Role-based access control" },
  { id: "support-warranty-maintenance", label: "3. Support, warranty & maintenance" },
  { id: "streamline", label: "Streamline your displays" },
];

function ZoneBlock({ title, pct, children }) {
  return (
    <div className="rounded-2xl border-2 border-sb-ink bg-white p-5 shadow-[3px_3px_0_#191919]">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="m-0 text-lg font-extrabold text-sb-ink" style={{ marginTop: 0 }}>
          {title}
        </h3>
        <span className="rounded-full border-2 border-sb-ink px-3 py-0.5 text-xs font-extrabold text-white" style={{ background: "var(--accent)" }}>
          {pct}
        </span>
      </div>
      <p className="mt-2">{children}</p>
    </div>
  );
}

export default function CorporateScreens() {
  return (
    <BlogShell post={post} toc={TOC}>
      <p>
        In modern Indian corporate hubs—from Cyber City in Gurugram to BKC in Mumbai and Outer Ring Road in Bengaluru—internal communication has moved far beyond flooded
        Outlook inboxes and overlooked Slack messages. With hybrid work schedules, multi-floor campuses, and rapid team scaling, ensuring every employee sees critical HR
        updates, town hall announcements, and operational alerts requires a high-visibility, real-time approach.
      </p>
      <Figure caption="The same announcement, two routes: one competes with 47 unread emails, the other is simply there as people walk past.">
        {(inView) => <NoiseFigure inView={inView} />}
      </Figure>
      <p>
        This is where multi-screen digital signage transforms corporate workplaces. Our digital signage platform, Screen Bazaar, enables workplace experience managers, HR
        leaders, and IT operations teams to control multi-floor display networks seamlessly from a single dashboard.
      </p>

      <H2 id="split-screen-matrix" num={1}>
        Designing a Split-Screen Content Matrix
      </H2>
      <p>
        Running a static slide on a 55-inch display in an office lobby or cafeteria wastes valuable screen real estate. Screen Bazaar features dynamic split-screen layout
        zoning, allowing you to run multiple content streams simultaneously tailored to Indian workplace culture and daily schedules.
      </p>

      <H3 id="recommended-layout-zones">Recommended Layout Zones for Indian Corporate Offices</H3>
      <div className="grid gap-4">
        <ZoneBlock title="Main Zone" pct="50% Screen Area">
          High-impact HR broadcasts, quarterly town hall highlights, employee spot-award recognitions, and festive greeting campaigns (e.g., Diwali, Independence Day,
          regional holidays).
        </ZoneBlock>
        <ZoneBlock title="Secondary Zone" pct="30% Screen Area">
          Meeting room schedules, floor maps, and shuttle/cab timing updates for corporate parks.
        </ZoneBlock>
        <ZoneBlock title="Ticker Banner" pct="20% Screen Area">
          Industry news, company milestone updates, and emergency alerts.
        </ZoneBlock>
      </div>
      <Figure caption="The layout running live. Pick a zone to see what it carries.">{(inView) => <ZonesFigure inView={inView} />}</Figure>

      <H2 id="role-based-access" num={2}>
        Granular Role-Based Access Control (RBAC)
      </H2>
      <p>
        A common challenge during office digital signage rollouts is managing user permissions between departments. HR needs quick publishing access, while IT operations must
        safeguard network settings, device security, and player configurations.
      </p>
      <p>Screen Bazaar addresses this split with granular Role-Based Access Control (RBAC):</p>
      <Figure caption="One dashboard, three keycards: each team sees the controls it owns.">{(inView) => <RolesFigure inView={inView} />}</Figure>
      <ul>
        <li>
          <strong>HR &amp; Workplace Experience Team:</strong> Granted permissions exclusively to upload media, edit specific playlist zones (like the announcement zone), and
          schedule time-sensitive communications.
        </li>
        <li>
          <strong>IT Operations &amp; Admin Team:</strong> Retains full control over hardware settings, network configurations, and screen management across all floors and
          branch offices.
        </li>
        <li>
          <strong>Facility Leads:</strong> Permitted to update floor-specific operational notices without risking changes to company-wide brand playlists.
        </li>
      </ul>
      <p>This clear segregation ensures HR stays agile without placing unnecessary support tickets on the IT helpdesk.</p>

      <H2 id="support-warranty-maintenance" num={3}>
        Support, Warranty &amp; Maintenance
      </H2>
      <p>
        A display network is only useful while every screen is running. When a screen on the fourth floor stops working, your IT helpdesk shouldn't have to turn into a TV
        repair desk.
      </p>
      <Figure caption="A screen needs attention on the fourth floor — and it isn't your IT team's problem to solve.">{(inView) => <SupportFigure inView={inView} />}</Figure>
      <p>Screen Bazaar includes:</p>
      <ul>
        <li>
          <strong>Support:</strong> A team to help with setup, content questions and troubleshooting.
        </li>
        <li>
          <strong>Warranty:</strong> Warranty cover on the screens supplied with Screen Bazaar.
        </li>
        <li>
          <strong>Maintenance:</strong> Ongoing maintenance, so your screens keep running without adding to your IT team's workload.
        </li>
      </ul>

      <CtaCard id="streamline" title="Streamline Your Corporate Displays Today" label="Try our cloud dashboard free for 14 days">
        <p>
          Upgrading your multi-floor office communications doesn't require complex server installations or ongoing IT maintenance. With Screen Bazaar, you can set up, manage,
          and scale your workplace display network across India.
        </p>
        <p>Experience seamless multi-screen management, split-screen layouts, and role-based access firsthand.</p>
      </CtaCard>
    </BlogShell>
  );
}
