import BlogShell from "../BlogShell";
import { getBlog } from "../meta";
import { H2, H3, Shown, Flow, Statement, Table, Figure, CtaCard } from "../kit";
import {
  SetupDiagram,
  DaypartFigure,
  FlipFigure,
  ColdCoffeeFigure,
  UpsellFigure,
  HierarchyFigure,
  HazardFigure,
  QueueFigure,
  ChainFigure,
  SoldOutFigure,
  MoreThanMenusFigure,
  CafeFigure,
} from "../art/menuBoards";

/* Blog 1 — owner's text (BLOGS_PLAN.md §10) with the approved edits in §11. */
const post = getBlog("digital-menu-boards-indian-restaurants-qsr");

const TOC = [
  { id: "what-is-a-digital-menu-board", label: "What is a digital menu board?" },
  { id: "why-digital-menu-boards-matter", label: "Why they matter in India" },
  { id: "dayparting", label: "1. Dayparting automation" },
  { id: "visual-upselling", label: "2. Visual upselling" },
  { id: "food-visuals", label: "3. HD food visuals" },
  { id: "digital-vs-printed-menus", label: "4. Digital vs printed menus" },
  { id: "choosing-hardware", label: "5. Choosing the right hardware" },
  { id: "screen-size-and-placement", label: "6. Screen size & placement" },
  { id: "qsr-chains", label: "7. QSR chains" },
  { id: "remote-content-management", label: "8. Remote content management" },
  { id: "more-than-menus", label: "9. More than just menus" },
  { id: "what-to-avoid", label: "10. What to avoid" },
  { id: "how-to-build", label: "11. How to build one" },
  { id: "cafes", label: "12. Indian cafés" },
  { id: "restaurant-chains", label: "13. Restaurant chains" },
  { id: "screen-bazaar", label: "Screen Bazaar" },
  { id: "the-future", label: "The future is digital" },
  { id: "get-started", label: "Get started" },
];

export default function MenuBoards() {
  return (
    <BlogShell
      post={post}
      toc={TOC}
      afterFaq={
        <div className="mt-14 border-t-2 border-sb-ink pt-8 text-center">
          <p className="font-extrabold text-sb-ink">Screen Bazaar — Digital Signage by Connect</p>
          <p className="mt-1 italic">Digital menus. Digital promotions. Digital experiences.</p>
        </div>
      }
    >
      <p>Walk into a modern QSR, café, or restaurant today and there is a good chance you will see fewer printed menus and more digital screens.</p>
      <p>But a digital menu board is much more than a television displaying a list of food items.</p>
      <p>
        When implemented correctly,{" "}
        <strong>
          digital menu boards can help restaurants manage changing menus, promote high-margin products, run time-based offers, improve the customer experience, and keep menu
          content consistent across multiple outlets.
        </strong>
      </p>
      <p>
        For Indian restaurants and QSR chains, this becomes particularly valuable because menus frequently change based on breakfast, lunch, evening, weekends, festivals,
        promotions, combos, and seasonal products.
      </p>
      <p>
        This guide explains how restaurant owners and QSR managers can use <strong>digital signage and digital menu boards</strong> to build a more flexible and effective
        in-store ordering environment.
      </p>

      <H2 id="what-is-a-digital-menu-board">What Is a Digital Menu Board?</H2>
      <p>
        A <strong>digital menu board</strong> is an electronic display used to present a restaurant's menu, prices, promotions, food images, videos, and other customer-facing
        information.
      </p>
      <p>
        Instead of printing a static menu and replacing it whenever something changes, restaurants can manage their content digitally and display different information at
        different times.
      </p>
      <p>A typical digital menu board setup can include:</p>
      <ul className="bl-cols">
        <li>Commercial-grade display screens</li>
        <li>Digital signage media players</li>
        <li>Cloud-based content management</li>
        <li>Menu templates</li>
        <li>Food photography and videos</li>
        <li>Promotional banners</li>
        <li>Time-based scheduling</li>
        <li>Multiple-screen layouts</li>
        <li>Remote content updates</li>
      </ul>
      <Figure caption="A typical setup: menu content is managed in the cloud, sent to a media player and shown on the menu screens behind the counter.">
        <SetupDiagram />
      </Figure>
      <p>For a single café, this could mean managing two or three screens behind the counter.</p>
      <p>For a QSR chain, the same system can potentially allow menu content to be managed across multiple outlets from a central location.</p>

      <H2 id="why-digital-menu-boards-matter">Why Are Digital Menu Boards Becoming Important for Indian Restaurants?</H2>
      <p>The Indian food-service market is highly dynamic.</p>
      <p>
        Restaurants may change their offerings throughout the day, introduce limited-time promotions, create festival-specific menus, or run outlet-specific offers.
      </p>
      <p>A printed menu cannot adapt instantly.</p>
      <p>A digital menu board can.</p>
      <p>For example, a restaurant could display:</p>
      <dl className="grid gap-3 sm:grid-cols-2">
        {[
          ["7:00 AM – 11:30 AM", "Breakfast Combos"],
          ["11:30 AM – 4:00 PM", "Lunch Combos & Meal Deals"],
          ["4:00 PM – 7:00 PM", "Tea, Coffee & Snacks"],
          ["7:00 PM onwards", "Dinner Menu & Family Combos"],
        ].map(([t, d]) => (
          <div key={t} className="rounded-2xl border-2 border-sb-ink bg-white px-4 py-3">
            <dt className="font-extrabold text-sb-ink">{t}</dt>
            <dd className="m-0">{d}</dd>
          </div>
        ))}
      </dl>
      <p>The restaurant doesn't need someone to manually change the screens at each transition.</p>
      <p>The content can be scheduled in advance.</p>
      <p>
        This capability is known as <strong>dayparting</strong>.
      </p>

      <H2 id="dayparting" num={1}>
        Dayparting Automation: Show the Right Menu at the Right Time
      </H2>
      <p>One of the biggest advantages of digital menu boards is the ability to automatically change content based on the time of day.</p>
      <Figure caption="Dayparting: pick a time of day, or watch the screen move through the day on its own.">{(inView) => <DaypartFigure inView={inView} />}</Figure>
      <p>Imagine a café that serves breakfast until 11:30 AM.</p>
      <p>At 11:29 AM, the screens are displaying:</p>
      <Shown>
        <p>Masala Omelette</p>
        <p>Breakfast Combo</p>
        <p>Aloo Paratha</p>
        <p>Coffee &amp; Breakfast Deal</p>
      </Shown>
      <p>At exactly 11:30 AM, the menu automatically transitions to:</p>
      <Shown>
        <p>Paneer Wrap Combo</p>
        <p>Chicken Burger Meal</p>
        <p>Loaded Fries</p>
        <p>Cold Coffee</p>
      </Shown>
      <Figure caption="11:29 → 11:30: the breakfast list hands over to lunch by itself.">{(inView) => <FlipFigure inView={inView} />}</Figure>
      <p>No employee needs to change the screen.</p>

      <H3 id="how-dayparting-works">How Dayparting Works</H3>
      <p>A digital signage platform allows the restaurant to create a content schedule.</p>
      <p>For example:</p>
      <Table
        caption="Example dayparting schedule"
        head={["Time", "Digital Menu Content"]}
        rows={[
          ["7:00 AM – 11:30 AM", "Breakfast Menu"],
          ["11:30 AM – 4:00 PM", "Lunch Menu"],
          ["4:00 PM – 7:00 PM", "Snacks & Beverages"],
          ["7:00 PM – Closing", "Dinner Menu"],
        ]}
      />
      <p>The restaurant can configure these schedules beforehand.</p>
      <p>This becomes particularly useful for QSR chains where the same menu structure needs to be deployed across multiple outlets.</p>

      <H3 id="why-dayparting-matters">Why This Matters</H3>
      <p>Dayparting can help restaurants:</p>
      <ul className="bl-cols">
        <li>Reduce manual menu changes</li>
        <li>Promote time-sensitive products</li>
        <li>Highlight relevant combinations</li>
        <li>Keep menus consistent</li>
        <li>Reduce outdated promotional content</li>
        <li>Automate recurring campaigns</li>
      </ul>
      <p>Instead of asking staff to remember what should be displayed at 11:30 AM, the signage system handles the transition.</p>

      <H2 id="visual-upselling" num={2}>
        Visual Upselling: Make Your Most Valuable Products Impossible to Ignore
      </H2>
      <p>A traditional printed menu gives every item roughly the same visual treatment.</p>
      <p>Digital signage changes that.</p>
      <p>A digital menu board can combine:</p>
      <Statement>Food photography + animation + video + pricing + promotional messaging</Statement>
      <p>to draw attention toward selected products.</p>
      <p>Suppose a restaurant wants to increase sales of beverages.</p>
      <p>Instead of simply listing:</p>
      <Shown>
        <p>Cold Coffee — ₹149</p>
      </Shown>
      <p>the screen could show a short, high-definition video of a freshly prepared cold coffee alongside:</p>
      <Shown>
        <p>
          <strong>ADD A COLD COFFEE FOR ₹149</strong>
        </p>
      </Shown>
      <Figure caption="The same cold coffee, two treatments: one line on a printed menu, or the focal point of the screen.">
        {(inView) => <ColdCoffeeFigure inView={inView} />}
      </Figure>
      <p>The visual presentation creates a stronger focal point than a static text listing.</p>

      <H3 id="promote-high-margin-items">Promote High-Margin Items</H3>
      <p>Restaurants can use digital menu boards to give additional screen space to products they want customers to notice.</p>
      <p>For example:</p>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ["Main Product", "Classic Chicken Burger — ₹199"],
          ["Upsell", "Add Loaded Fries + Cold Drink — ₹99"],
          ["Meal Upgrade", "Make it a Combo — Add ₹79"],
        ].map(([h, t], k) => (
          <div key={h} className="rounded-2xl border-2 border-sb-ink bg-white p-4 shadow-[3px_3px_0_#191919]">
            <h4 className="text-sm font-extrabold uppercase tracking-[0.12em]" style={{ color: "var(--accent)" }}>
              {h}
            </h4>
            <p className="mt-1 font-extrabold leading-snug text-sb-ink">{t}</p>
            {k === 1 && <p className="mt-2 text-sm text-sb-muted">Or:</p>}
          </div>
        ))}
      </div>
      <Figure caption="Building the order on screen: the main product, then the upsell, then the meal upgrade.">{(inView) => <UpsellFigure inView={inView} />}</Figure>
      <p>This type of visual merchandising can be particularly useful for:</p>
      <ul className="bl-cols">
        <li>Beverages</li>
        <li>Fries and sides</li>
        <li>Desserts</li>
        <li>Combo meals</li>
        <li>Premium variants</li>
        <li>Limited-time products</li>
        <li>Seasonal products</li>
      </ul>
      <p>The objective isn't simply to display more products.</p>
      <p>
        It is to <strong>guide attention toward products and combinations that matter commercially.</strong>
      </p>

      <H2 id="food-visuals" num={3}>
        High-Definition Food Visuals Can Transform the Menu Experience
      </H2>
      <p>Food is inherently visual.</p>
      <p>A customer reading:</p>
      <Shown>
        <p>Butter Chicken — ₹299</p>
      </Shown>
      <p>receives information.</p>
      <p>A customer seeing a high-quality close-up video of creamy butter chicken being served with naan receives a visual cue about the product.</p>
      <p>Digital menu boards allow restaurants to use:</p>
      <ul className="bl-cols">
        <li>High-resolution food photography</li>
        <li>Short video loops</li>
        <li>Product animations</li>
        <li>Ingredient highlights</li>
        <li>Combo animations</li>
        <li>Limited-time offer graphics</li>
      </ul>
      <p>However, good digital signage does not mean putting as much animation as possible on the screen.</p>
      <p>Too much movement can make the menu difficult to read.</p>
      <p>The better approach is to create a hierarchy:</p>
      <Flow label="Visual hierarchy" items={["Product", "Price", "Offer", "Supporting Visual"]} />
      <Figure caption="The hierarchy in action: product, price, offer, then the supporting visual.">{(inView) => <HierarchyFigure inView={inView} />}</Figure>
      <p>The customer should understand the important information within seconds.</p>

      <H2 id="digital-vs-printed-menus" num={4}>
        Digital Menu Boards vs Traditional Printed Menus
      </H2>
      <p>The biggest difference is flexibility.</p>
      <Table
        caption="Printed menu vs digital menu board"
        head={["Feature", "Printed Menu", "Digital Menu Board"]}
        rows={[
          ["Change prices quickly", "Difficult", "Easy"],
          ["Time-based menus", "No", "Yes"],
          ["Video content", "No", "Yes"],
          ["Promotional campaigns", "Reprinting required", "Update digitally"],
          ["Multi-outlet management", "Manual", "Centralised"],
          ["Seasonal campaigns", "New prints", "Schedule content"],
          ["Visual merchandising", "Limited", "Highly flexible"],
          ["Remote updates", "No", "Possible"],
          ["Content scheduling", "No", "Yes"],
        ]}
      />
      <p>For restaurants that rarely change their menus, printed material may still have a role.</p>
      <p>For QSRs, café chains, food courts, and restaurants running frequent promotions, digital signage provides considerably more flexibility.</p>

      <H2 id="choosing-hardware" num={5}>
        Choosing the Right Hardware: Don't Treat a Commercial Display Like a Home TV
      </H2>
      <p>One of the most important decisions when implementing a digital menu board is choosing the display hardware.</p>
      <p>A common mistake is to assume that any large consumer television can be used as a commercial digital signage screen.</p>
      <p>That may not be appropriate for every installation.</p>
      <p>Restaurant environments can expose screens to:</p>
      <ul className="bl-cols">
        <li>Heat</li>
        <li>Dust</li>
        <li>Humidity</li>
        <li>Food particles</li>
        <li>Steam</li>
        <li>Grease</li>
        <li>Frequent operating hours</li>
        <li>Continuous usage</li>
      </ul>
      <p>
        This is why restaurants should evaluate <strong>commercial-grade digital signage displays</strong> based on their specific environment and operating requirements.
      </p>

      <H3 id="look-for-protection">Look for Appropriate Protection</H3>
      <p>Depending on where the screen is installed, businesses may need to consider characteristics such as:</p>
      <ul className="bl-cols">
        <li>Dust resistance</li>
        <li>Splash resistance</li>
        <li>Screen durability</li>
        <li>Brightness</li>
        <li>Viewing angle</li>
        <li>Operating hours</li>
        <li>Ventilation</li>
        <li>Mounting requirements</li>
        <li>Warranty and service availability</li>
      </ul>
      <p>
        For example, a screen installed near a kitchen or beverage preparation area may face very different environmental conditions from one installed inside a dry,
        air-conditioned dining area.
      </p>
      <Figure caption="Same screen, different conditions: near the kitchen it faces heat, steam and grease; in the dining area it doesn't.">
        {(inView) => <HazardFigure inView={inView} />}
      </Figure>
      <p>
        Hardware selection should therefore be based on <strong>installation conditions</strong>, not simply screen size.
      </p>

      <H2 id="screen-size-and-placement" num={6}>
        Screen Size and Placement Matter
      </H2>
      <p>A beautiful digital menu can still fail if customers cannot read it comfortably.</p>
      <p>Before purchasing displays, consider:</p>
      <H3 id="viewing-distance">Viewing Distance</H3>
      <p>How far will customers stand from the screen?</p>
      <p>A menu board viewed from several metres away needs appropriate screen size and text sizing.</p>
      <H3 id="number-of-screens">Number of Screens</H3>
      <p>Instead of placing every menu item on one screen, restaurants can divide content across multiple displays.</p>
      <p>For example:</p>
      <ul>
        <li>
          <strong>Screen 1:</strong> Main Meals
        </li>
        <li>
          <strong>Screen 2:</strong> Combos &amp; Upsells
        </li>
        <li>
          <strong>Screen 3:</strong> Beverages &amp; Desserts
        </li>
      </ul>
      <p>This can create a cleaner visual hierarchy.</p>
      <H3 id="counter-position">Counter Position</H3>
      <p>The screen should be visible while customers are:</p>
      <ul className="bl-cols">
        <li>Joining the queue</li>
        <li>Waiting to order</li>
        <li>Approaching the counter</li>
        <li>Reviewing their order</li>
      </ul>
      <Figure caption="Three screens, one queue: the menu stays in view from the moment a customer joins the line until they review their order.">
        {(inView) => <QueueFigure inView={inView} />}
      </Figure>
      <p>The objective is to give customers enough time to discover products before they reach the payment stage.</p>

      <H2 id="qsr-chains" num={7}>
        Digital Menu Boards for QSR Chains
      </H2>
      <p>For a single restaurant, updating a menu may take only a few minutes.</p>
      <p>For a chain with 20, 50, or 100 outlets, manually updating screens can become a significant operational problem.</p>
      <p>This is where centralised digital signage management becomes valuable.</p>
      <p>A QSR head office can potentially manage:</p>
      <Flow down label="Central to screen" items={["Central Menu", "Regional Content", "Outlet-Specific Promotions", "Individual Screens"]} />
      <p>This allows the business to maintain brand consistency while still allowing individual locations to run relevant promotions.</p>
      <p>For example:</p>
      <Shown>
        <p>
          <strong>National Campaign:</strong> New Burger Launch
        </p>
      </Shown>
      <p>could be deployed across every outlet.</p>
      <p>At the same time:</p>
      <Shown>
        <p>
          <strong>Outlet Campaign:</strong> Weekend Offer
        </p>
      </Shown>
      <p>could be configured for selected locations.</p>
      <Figure caption="One head office, two kinds of campaign: a national launch on every screen, or a weekend offer on selected outlets only.">
        {(inView) => <ChainFigure inView={inView} />}
      </Figure>

      <H2 id="remote-content-management" num={8}>
        Remote Content Management
      </H2>
      <p>Modern digital signage platforms can allow restaurant teams to manage content remotely.</p>
      <p>That means a marketing or operations team does not necessarily need to physically visit every outlet whenever the menu changes.</p>
      <p>For example, if a restaurant discovers that a particular product has sold out, the team can update the menu content from a central location.</p>
      <Figure caption="Sold out? One update from the central team, and every outlet's menu reflects it.">{(inView) => <SoldOutFigure inView={inView} />}</Figure>
      <p>Similarly, a price change can be reflected digitally without waiting for new printed materials.</p>
      <p>For multi-location businesses, this can make menu management significantly easier.</p>

      <H2 id="more-than-menus" num={9}>
        Digital Signage Is More Than Just Menus
      </H2>
      <p>Once a restaurant has digital screens installed, those screens don't have to display menus 100% of the time.</p>
      <p>They can also be used for:</p>
      <Figure caption="One screen, six jobs. Tap a type of message to see it on the screen.">{(inView) => <MoreThanMenusFigure inView={inView} />}</Figure>
      <div className="bl-grid grid gap-x-5 sm:grid-cols-2">
      {[
        ["Promotions", "20% OFF FAMILY COMBOS"],
        ["New Product Launches", "NEW — PERI PERI CHICKEN BURGER"],
        ["Brand Content", "Made Fresh. Served Fast."],
        ["Customer Information", "Scan to Join Our Loyalty Program"],
        ["Cross-Selling", "Don't Forget Dessert"],
        ["Social Media", "Follow Us on Instagram"],
      ].map(([h, t]) => (
        <div key={h}>
          <H3 id={`more-${h.toLowerCase().replace(/[^a-z]+/g, "-")}`}>{h}</H3>
          <Shown className="bl-shown-sm">
            <p>
              <strong>{t}</strong>
            </p>
          </Shown>
        </div>
      ))}
      </div>
      <p>
        This means the same hardware can become a broader <strong>in-store digital marketing channel</strong>.
      </p>

      <H2 id="what-to-avoid" num={10}>
        What Should Restaurants Avoid?
      </H2>
      <p>Digital signage is not automatically effective just because a screen has been installed.</p>
      <p>There are several common mistakes restaurants should avoid.</p>
      <H3 id="avoid-too-much-text">Too Much Text</H3>
      <p>Customers don't want to read a paragraph while standing at a QSR counter.</p>
      <p>Keep important information concise.</p>
      <H3 id="avoid-too-many-products">Too Many Products</H3>
      <p>Trying to display the entire menu on one screen can create visual clutter.</p>
      <p>Use multiple screens or structured layouts where appropriate.</p>
      <H3 id="avoid-low-quality-images">Low-Quality Food Images</H3>
      <p>Poor photography can make good food look unappealing.</p>
      <p>High-quality visuals are an important part of digital menu design.</p>
      <H3 id="avoid-constant-animation">Constant Animation</H3>
      <p>Movement should attract attention without making the menu difficult to understand.</p>
      <H3 id="avoid-outdated-promotions">Outdated Promotions</H3>
      <p>An expired offer appearing on a digital screen can create customer confusion.</p>
      <p>Scheduling and content management should therefore be treated as an operational process.</p>
      <H3 id="avoid-consumer-tvs">Consumer TVs in Unsuitable Environments</H3>
      <p>
        A low-cost television may look attractive initially, but businesses should consider operating conditions, duty cycle, warranty, brightness, and environmental exposure
        before choosing hardware.
      </p>

      <H2 id="how-to-build" num={11}>
        How to Build an Effective Digital Menu Board
      </H2>
      <p>A practical digital menu board strategy can follow this structure:</p>
      <ol className="relative space-y-6 border-l-[3px] border-dashed pl-6" style={{ borderColor: "var(--accent)" }}>
        <li className="relative">
          <span className="absolute -left-[38px] top-1 h-5 w-5 rounded-full border-2 border-sb-ink bg-white" aria-hidden="true" />
          <H3 id="step-1">Step 1 — Divide the Menu</H3>
          <p>Separate:</p>
          <ul className="bl-cols">
            <li>Core products</li>
            <li>Combos</li>
            <li>Beverages</li>
            <li>Sides</li>
            <li>Desserts</li>
            <li>Limited-time offers</li>
          </ul>
        </li>
        <li className="relative">
          <span className="absolute -left-[38px] top-1 h-5 w-5 rounded-full border-2 border-sb-ink bg-white" aria-hidden="true" />
          <H3 id="step-2">Step 2 — Identify Products to Promote</H3>
          <p>Determine which products deserve additional visual attention.</p>
        </li>
        <li className="relative">
          <span className="absolute -left-[38px] top-1 h-5 w-5 rounded-full border-2 border-sb-ink bg-white" aria-hidden="true" />
          <H3 id="step-3">Step 3 — Create the Visual Hierarchy</H3>
          <p>Make sure customers can quickly identify:</p>
          <Flow label="What customers should see" items={["What is it?", "How much does it cost?", "Why should I consider it?"]} />
        </li>
        <li className="relative">
          <span className="absolute -left-[38px] top-1 h-5 w-5 rounded-full border-2 border-sb-ink bg-white" aria-hidden="true" />
          <H3 id="step-4">Step 4 — Build Dayparting Schedules</H3>
          <p>Create breakfast, lunch, evening, and dinner content where relevant.</p>
        </li>
        <li className="relative">
          <span className="absolute -left-[38px] top-1 h-5 w-5 rounded-full border-2 border-sb-ink bg-white" aria-hidden="true" />
          <H3 id="step-5">Step 5 — Prepare Promotional Content</H3>
          <p>Create reusable templates for:</p>
          <ul className="bl-cols">
            <li>Offers</li>
            <li>New launches</li>
            <li>Combo upgrades</li>
            <li>Seasonal campaigns</li>
          </ul>
        </li>
        <li className="relative">
          <span className="absolute -left-[38px] top-1 h-5 w-5 rounded-full border-2 border-sb-ink bg-white" aria-hidden="true" />
          <H3 id="step-6">Step 6 — Test the Screens</H3>
          <p>Check:</p>
          <ul className="bl-cols">
            <li>Text readability</li>
            <li>Brightness</li>
            <li>Viewing distance</li>
            <li>Image quality</li>
            <li>Content transitions</li>
          </ul>
        </li>
        <li className="relative">
          <span className="absolute -left-[38px] top-1 h-5 w-5 rounded-full border-2 border-sb-ink" style={{ background: "var(--accent)" }} aria-hidden="true" />
          <H3 id="step-7">Step 7 — Monitor and Optimise</H3>
          <p>Digital signage becomes more valuable when the restaurant continually learns which products, promotions, and layouts perform well.</p>
        </li>
      </ol>

      <H2 id="cafes" num={12}>
        Digital Menu Boards for Indian Cafes
      </H2>
      <p>Digital signage isn't limited to large QSR chains.</p>
      <p>Cafés can use digital menu boards to promote:</p>
      <ul className="bl-cols">
        <li>Coffee</li>
        <li>Cold beverages</li>
        <li>Desserts</li>
        <li>Breakfast combos</li>
        <li>Sandwiches</li>
        <li>Seasonal drinks</li>
        <li>Loyalty offers</li>
      </ul>
      <p>For example, during the afternoon:</p>
      <Shown>
        <p>
          <strong>Feeling Sleepy?</strong>
        </p>
        <p>Cold Coffee + Chocolate Cookie</p>
        <p>
          <strong>₹199</strong>
        </p>
      </Shown>
      <p>The same screen could automatically change in the evening to promote:</p>
      <Shown>
        <p>
          <strong>Evening Coffee Combo</strong>
        </p>
        <p>Cappuccino + Garlic Bread</p>
        <p>
          <strong>₹249</strong>
        </p>
      </Shown>
      <Figure caption="Afternoon or evening: the café screen changes its offer while the screen itself stays put.">{(inView) => <CafeFigure inView={inView} />}</Figure>
      <p>The content changes while the physical screen stays the same.</p>

      <H2 id="restaurant-chains" num={13}>
        Digital Menu Boards for Indian Restaurant Chains
      </H2>
      <p>For growing restaurant chains, the real benefit goes beyond individual menu screens.</p>
      <p>A digital signage platform can become part of the chain's operational infrastructure.</p>
      <p>The central team can define:</p>
      <ul className="bl-cols">
        <li>Brand templates</li>
        <li>Menu layouts</li>
        <li>Promotional campaigns</li>
        <li>Product launches</li>
        <li>Daypart schedules</li>
        <li>Outlet-specific content</li>
      </ul>
      <p>This creates a more consistent customer-facing experience across locations.</p>
      <p>As the number of outlets increases, centralised content management can become increasingly important.</p>

      <H2 id="screen-bazaar">Screen Bazaar: Digital Signage for Modern Indian Businesses</H2>
      <p>
        <strong>Screen Bazaar by Connect</strong> is built around the idea that digital signage should be more than a screen playing static content.
      </p>
      <p>For restaurants, cafés, and QSRs, the objective is to create a system where content can be:</p>
      <Flow label="Screen Bazaar content cycle" items={["Created", "Scheduled", "Displayed", "Updated"]} />
      <p>without relying on manual screen-by-screen changes.</p>
      <p>
        Whether you operate a single café or are building a growing QSR chain, Screen Bazaar can be used as the digital signage layer for your customer-facing displays.
      </p>
      <p>The system can support use cases such as:</p>
      <ul className="bl-cols">
        <li>Digital menu boards</li>
        <li>Promotional signage</li>
        <li>Dayparting</li>
        <li>Product showcases</li>
        <li>Video advertising</li>
        <li>Multi-screen content</li>
        <li>Multi-location signage management</li>
        <li>Scheduled campaigns</li>
        <li>Support, warranty and maintenance</li>
      </ul>

      <H2 id="the-future">The Future of Restaurant Menus Is Digital</H2>
      <p>Restaurants are increasingly expected to deliver fast service while keeping their customer experience consistent.</p>
      <p>
        Digital menu boards provide a flexible way to combine <strong>menu management, visual merchandising, promotions, and customer communication</strong> on the same
        display infrastructure.
      </p>
      <p>For Indian restaurants and QSRs, the biggest opportunity is not simply replacing a printed menu with a screen.</p>
      <p>It is using that screen intelligently.</p>
      <ul>
        <li>Breakfast can become lunch automatically.</li>
        <li>A new promotion can appear across multiple outlets.</li>
        <li>A high-margin beverage can receive greater visual attention.</li>
        <li>A limited-time offer can disappear automatically when the campaign ends.</li>
        <li>And the same screen can become a digital marketing channel inside the restaurant.</li>
      </ul>
      <p>
        That is the difference between <strong>a screen displaying a menu and a digital menu system.</strong>
      </p>

      <CtaCard id="get-started" title="Ready to Move Beyond Static Menus?" label="Ask for the Free Digital Menu Board Template Pack">
        <p>
          If you're planning digital menu boards for your restaurant, café, or QSR, start with the right combination of{" "}
          <strong>commercial hardware, content strategy, scheduling, and digital signage management.</strong>
        </p>
        <p>
          <strong>Screen Bazaar by Connect</strong> helps businesses turn their screens into an always-updated digital communication channel.
        </p>
        <h3 className="!mt-5 text-lg font-extrabold text-white">Get Started</h3>
        <p>
          <strong>Ask us for our free Digital Menu Board Template Pack</strong> and explore practical layouts you can adapt for your restaurant, café, or QSR.
        </p>
      </CtaCard>
    </BlogShell>
  );
}
