import BlogShell from "../BlogShell";
import { getBlog } from "../meta";
import { H2, Figure, CtaCard, ProblemFix, Table } from "../kit";
import { StaticVsMotionFigure, GlareFigure, ClutterFigure, PrintCostFigure, SupportFigure } from "../art/standees";

/* Blog 5 — owner's text (BLOGS_PLAN.md §10) with the approved edits in §11:
   AI lines removed, brightness aligned with blog 3, 6–9 months → 15 days, mistake 5 replaced. */
const post = getBlog("printed-standees-to-digital-displays-mistakes");

const MISTAKES = [
  { id: "static-content", n: 1, t: "Treating Digital Screens Like Printed Posters (Static Content Overload)" },
  { id: "sunlight-placement", n: 2, t: "Ignoring Sunlight, Viewing Angles, and Screen Placement" },
  { id: "clutter", n: 3, t: "Cluttering the Screen with Too Much Information" },
  { id: "print-costs", n: 4, t: "Underestimating Long-Term Printing vs. Digital Costs" },
  { id: "support", n: 5, t: "Forgetting About Support, Warranty and Maintenance" },
];

const TOC = [
  ...MISTAKES.map((m) => ({ id: m.id, label: `${m.n}. ${m.t.split(/[:(]/)[0].trim()}` })),
  { id: "upgrade", label: "Upgrade your storefront strategy" },
];

export default function StandeeMistakes() {
  return (
    <BlogShell post={post} toc={TOC}>
      <p>
        Across commercial hubs in India—from high-street retail markets in Dadar and Bandra to tech parks in BKC and Gurugram—businesses are rapidly replacing static flex
        banners and vinyl standees with dynamic digital screens.
      </p>
      <p>
        While making the transition to digital signage promises higher customer engagement and lower long-term recurring print costs, many business owners end up treating
        digital screens like electronic posters.
      </p>
      <p>If you are upgrading your physical displays using Screen Bazaar, avoid these five common pitfalls to maximize your return on investment.</p>

      {/* quick scan strip */}
      <nav aria-label="The five mistakes" className="not-prose my-8 grid gap-2 sm:grid-cols-5">
        {MISTAKES.map((m) => (
          <a
            key={m.id}
            href={`#${m.id}`}
            className="group flex flex-col gap-1 rounded-2xl border-2 border-sb-ink bg-white p-3 no-underline shadow-[3px_3px_0_#191919] transition-transform hover:-translate-y-0.5"
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-sb-ink text-sm font-extrabold text-white" style={{ background: "var(--accent)" }}>
              {m.n}
            </span>
            <span className="font-manrope text-[13px] font-extrabold leading-snug text-sb-ink">{m.t.split(/[:(]/)[0].trim()}</span>
          </a>
        ))}
      </nav>

      <H2 id="static-content" num={1}>
        Treating Digital Screens Like Printed Posters (Static Content Overload)
      </H2>
      <p>The biggest advantage of a digital screen over a printed flex standee is movement. Yet, many businesses simply upload a high-resolution PDF or static JPEG of their print poster onto the display.</p>
      <Figure caption="A poster file on a screen is still a poster. A short loop is what turns heads.">{(inView) => <StaticVsMotionFigure inView={inView} />}</Figure>
      <ProblemFix
        problem=" Static text and crowded graphic posters blend into the background, failing to catch the eye of walking shoppers or passing employees."
        fix=" Use short 5 to 10-second motion graphic loops, subtle video animations, or dynamic transitions."
      />

      <H2 id="sunlight-placement" num={2}>
        Ignoring Sunlight, Viewing Angles, and Screen Placement
      </H2>
      <p>A display that looks brilliant inside an air-conditioned office lobby might turn into an unreadable mirror when placed near a glass storefront in direct afternoon sunlight.</p>
      <Figure caption="Afternoon sun on a glass shopfront, with the wrong screen and the right one.">{(inView) => <GlareFigure inView={inView} />}</Figure>
      <ProblemFix
        problem=" Using standard household consumer TVs, built for living rooms rather than bright shopfronts, leads to severe glare and washed-out visuals. Placing screens too high above eye level also causes viewing fatigue."
        fix=" Match screen hardware to the environment. For most indoor spaces, displays in the 400–700 nit range can work well. For screens facing a glass shopfront, select high-brightness commercial displays — typically 1,500 nits or more, and 2,500 nits or more in direct sunlight — and position displays directly at eye level along key customer foot-traffic paths."
      />

      <H2 id="clutter" num={3}>
        Cluttering the Screen with Too Much Information
      </H2>
      <p>When switching from print, it is tempting to cram every product line, daily discount, QR code, and terms &amp; conditions onto a single screen layout.</p>
      <Figure caption="Three to five seconds is all you get. Spend them on one message.">{(inView) => <ClutterFigure inView={inView} />}</Figure>
      <ProblemFix
        problem=" Viewers only give a digital screen 3 to 5 seconds of attention as they walk past. A cluttered layout creates cognitive overload, causing potential customers to look away entirely."
        fix=" Follow the 3x5 Rule: keep your messaging focused on one primary visual, one clear headline, and one call-to-action (CTA) per slide. Use scheduled playlists in Screen Bazaar to rotate through multiple focused messages throughout the day instead of displaying everything at once."
      />

      <H2 id="print-costs" num={4}>
        Underestimating Long-Term Printing vs. Digital Costs
      </H2>
      <p>Business owners often look at the initial hardware purchase of a commercial screen and hesitate, overlooking the continuous, hidden expenses of physical print marketing.</p>
      <Table
        caption="Printed standees and flex compared with digital signage"
        head={["Printed Standees & Flex", "Digital Signage (Screen Bazaar)"]}
        rows={[
          ["Monthly print & shipping fees", "One-time screen investment"],
          ["Manual setup & courier delays", "Instant remote updates via phone"],
          ["Wasted stock on ended sales", "Zero recurring material waste"],
          ["Distorted colour after sunlight", "Sharp, bright playback all day"],
        ]}
      />
      <Figure caption="Four campaigns, four reprints — or four updates to the same screen.">{(inView) => <PrintCostFigure inView={inView} />}</Figure>
      <ProblemFix
        problem=" Printing vinyl standees for every seasonal campaign, monsoon sale, or festive offer costs thousands of rupees every quarter—plus courier delays and installation overhead across multiple branches."
        fix=" Calculate your total cost of ownership (TCO). A digital screen typically pays for itself within 15 days simply by eliminating recurring printing, logistics, and manual labor costs."
      />

      <H2 id="support" num={5}>
        Forgetting About Support, Warranty and Maintenance
      </H2>
      <p>A screen is a long-term piece of business equipment, not a one-time purchase.</p>
      <Figure caption="When a screen goes down mid-sale, the question is who you call.">{(inView) => <SupportFigure inView={inView} />}</Figure>
      <ProblemFix
        problem=" Many businesses buy screens without checking who will fix them, how long the warranty lasts, or who will keep them running. When a screen fails in the middle of a festive sale, there is no one to call, and the display stays blank."
        fix=" Choose a solution that includes support, warranty and maintenance. Screen Bazaar includes all three, so when something goes wrong you have one team to call instead of a TV brand, an installer and a software vendor."
      />

      <CtaCard id="upgrade" title="Upgrade Your Storefront Strategy" label="Find out your annual printing savings — talk to us">
        <p>
          Switching from printed standees to digital screens shouldn't mean copying old habits onto new technology. By pairing motion-rich content with smart scheduling and
          dependable support, you can transform static displays into active sales drivers.
        </p>
        <p>See how quickly switching to Screen Bazaar pays for itself across your locations.</p>
      </CtaCard>
    </BlogShell>
  );
}
