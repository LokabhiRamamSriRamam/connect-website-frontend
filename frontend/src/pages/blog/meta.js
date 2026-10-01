/* Blog metadata — plain JS (no JSX, no imports) so both the app and
   scripts/prerender-blogs.mjs can read it. Blog texts and approved edits: BLOGS_PLAN.md §10–§11. */

export const SITE_URL = "https://connectgenai.in";
export const SITE_NAME = "Screen Bazaar";
export const BLOG_BASE = "/blogs";
export const blogPath = (slug) => `${BLOG_BASE}/${slug}`;
export const blogOgImage = (slug) => `${SITE_URL}/blog-og/${slug}.png`;
export const AUTHOR = "Screen Bazaar Team";

export const BLOG_INDEX = {
  title: "Screen Bazaar Blog — Digital Signage Guides for Indian Businesses",
  description:
    "Practical digital signage guides for Indian businesses: digital menu boards, multi-location retail campaigns, choosing displays, office screens and signage software.",
};

export const BLOGS = [
  {
    slug: "digital-menu-boards-indian-restaurants-qsr",
    title: "The Ultimate Guide to Digital Menu Boards for Indian Restaurants & QSRs",
    dek: "Digital Menu Boards for Restaurants, QSRs & Cafes in India",
    description:
      "How Indian restaurants, cafés and QSR chains use digital menu boards: dayparting, upselling, hardware, screen placement and multi-outlet menu management.",
    category: "Restaurants & QSRs",
    date: "2026-10-01",
    readMins: 12,
    accent: "#E4572E",
    tint: "#FFF1EA",
    related: { label: "Digital signage for restaurants & cafés", href: "/digital-signage/restaurants" },
    keywords: ["digital menu board", "digital menu boards India", "QSR digital signage", "restaurant digital signage", "dayparting"],
    faqs: [
      {
        q: "What is a digital menu board?",
        a: "A digital menu board is an electronic display used by restaurants, cafés, and QSRs to display menus, prices, promotions, images, videos, and other customer-facing information.",
      },
      {
        q: "How much does a digital menu board cost in India?",
        a: "The cost depends on factors such as display size, commercial-grade hardware, media players, mounting, software, installation, and the number of screens. Multi-outlet deployments can have different requirements from a single-store installation.",
      },
      {
        q: "Can digital menu boards change automatically?",
        a: "Yes. Digital signage platforms can use scheduling and dayparting to automatically change content at predetermined times.",
      },
      {
        q: "Can a restaurant manage multiple screens remotely?",
        a: "Depending on the digital signage platform, multiple screens can be managed centrally, allowing businesses to distribute and update content across different displays and locations.",
      },
      {
        q: "Can digital menu boards display videos?",
        a: "Yes. Digital menu boards can support video content alongside images, text, prices, promotions, and other visual elements, depending on the signage hardware and software.",
      },
      {
        q: "Are commercial displays better than normal TVs for restaurants?",
        a: "The appropriate choice depends on the installation environment and operating requirements. Restaurants should evaluate factors such as operating hours, brightness, warranty, durability, ventilation, and exposure to dust, heat, humidity, or splashes before selecting hardware.",
      },
    ],
  },
  {
    slug: "multi-location-retail-digital-signage-campaigns",
    title: "How Multi-Location Retailers Streamline In-Store Campaigns in Real Time",
    dek: "A practical guide to centralized digital signage, regional promotions, flash sales, and real-time campaign management for retail businesses",
    description:
      "How multi-location retailers in India run national, regional and store-level campaigns, flash sales and seasonal promotions on centrally managed digital signage.",
    category: "Retail",
    date: "2026-10-01",
    readMins: 11,
    accent: "#914BFA",
    tint: "#F6F1FF",
    related: { label: "Digital signage for retail", href: "/digital-signage/retail" },
    keywords: ["multi-location digital signage", "retail digital signage India", "in-store campaigns", "flash sale signage", "centralized digital signage"],
    faqs: [
      {
        q: "What is multi-location digital signage?",
        a: "Multi-location digital signage allows businesses to manage digital displays across multiple stores or branches from a centralized platform.",
      },
      {
        q: "Can different stores display different content?",
        a: "Yes. A digital signage system can be configured to distribute different content to different stores, regions, screen groups, or individual screens.",
      },
      {
        q: "Can regional managers control digital signage?",
        a: "Depending on the platform's permission structure, regional managers can be given access to manage approved local campaigns while corporate teams retain control over brand-level content.",
      },
      {
        q: "Can retailers run flash sales using digital signage?",
        a: "Yes. Digital signage can be used to publish time-sensitive promotional content and schedule it to appear and disappear at specific times.",
      },
      {
        q: "Can digital signage be managed remotely?",
        a: "Cloud-based digital signage systems can allow authorized users to manage content remotely rather than requiring physical access to each display.",
      },
      {
        q: "How can retailers measure digital signage performance?",
        a: "Retailers can compare relevant metrics such as foot traffic, conversion rate, average order value, promoted-product sales, and campaign-period performance against suitable baselines. Digital signage should be evaluated alongside other factors that influence retail performance.",
      },
      {
        q: "Is digital signage useful for franchise businesses?",
        a: "Yes. Franchise businesses can use centralized digital signage management to maintain brand standards while allowing individual locations or regions to run approved local campaigns.",
      },
    ],
  },
  {
    slug: "commercial-display-vs-consumer-tv-digital-signage",
    title: "Commercial Displays vs. Consumer TVs for Digital Signage: What You Need to Know",
    dek: "A practical guide to choosing the right display for digital signage in retail stores, restaurants, offices, QSRs and other commercial spaces",
    description:
      "Commercial display or consumer TV for digital signage? Compare duty cycle (16/7 vs 24/7), brightness in nits, RS-232, warranty, service and total cost.",
    category: "Hardware",
    date: "2026-10-01",
    readMins: 13,
    accent: "#1F30A0",
    tint: "#EAF2FF",
    related: { label: "See how Screen Bazaar puts screens to work", href: "/" },
    keywords: ["commercial display vs consumer TV", "digital signage display", "24/7 display", "how many nits digital signage", "RS-232 display"],
    faqs: [
      {
        q: "Can I use a normal TV for digital signage?",
        a: "Yes, a consumer TV can be used for some digital signage applications. However, businesses should verify the manufacturer's permitted usage, duty cycle, warranty terms, brightness, connectivity, and environmental requirements before deploying it commercially.",
      },
      {
        q: "What does 16/7 mean on a commercial display?",
        a: "16/7 generally indicates that the display is designed for operation for up to 16 hours per day, seven days per week, according to the manufacturer's specifications.",
      },
      {
        q: "What does 24/7 mean on a digital signage display?",
        a: "A 24/7-rated display is designed for continuous operation according to the manufacturer's specified conditions. Businesses should still follow installation, temperature, ventilation, and usage requirements.",
      },
      {
        q: "How many nits should a digital signage screen have?",
        a: "The appropriate brightness depends on the environment. Indoor offices may require less brightness, while bright retail environments or locations near windows may require substantially more. Evaluate ambient light and viewing conditions rather than selecting a brightness number in isolation.",
      },
      {
        q: "What is RS-232 used for in digital signage?",
        a: "RS-232 is a communication interface that can allow compatible professional displays to receive control commands from external systems, such as power, input selection, and other supported functions.",
      },
      {
        q: "Are commercial displays worth the extra cost?",
        a: "It depends on the deployment. For short-duration, low-demand applications, a consumer TV may be adequate. For long operating hours, multi-location deployments, high ambient light, professional control, and commercial support requirements, commercial displays may provide capabilities that justify the additional investment.",
      },
      {
        q: "Can Screen Bazaar work with different display brands?",
        a: "Digital signage compatibility depends on the display, media player, operating system, connectivity, and required management features. Hardware should therefore be checked against the specific Screen Bazaar deployment requirements before purchase.",
      },
    ],
  },
  {
    slug: "corporate-office-communication-screens-multiple-floors",
    title: "How to Set Up Internal Corporate Communication Screens Across Multiple Floors",
    dek: "Split-screen layouts, role-based access for HR and IT, and support that keeps every floor's screen running",
    description:
      "Set up internal communication screens across office floors: split-screen layout zones, role-based access for HR and IT, and support, warranty and maintenance.",
    category: "Corporate & Offices",
    date: "2026-10-01",
    readMins: 5,
    accent: "#2563EB",
    tint: "#EAF1FF",
    related: { label: "Digital signage for corporate offices", href: "/digital-signage/corporate" },
    keywords: ["corporate digital signage", "office communication screens", "internal communication digital signage", "split screen digital signage", "role-based access"],
    faqs: [
      {
        q: "What is corporate digital signage?",
        a: "Corporate digital signage uses screens in lobbies, cafeterias, corridors and meeting areas to share announcements, events, schedules and updates with employees and visitors.",
      },
      {
        q: "How do you manage office screens across multiple floors?",
        a: "With a cloud-based digital signage platform, screens on every floor can be grouped and managed from one dashboard, so a single update can reach one floor, several floors or every office.",
      },
      {
        q: "Can one office screen show more than one thing at a time?",
        a: "Yes. Screen Bazaar supports split-screen layouts, so one display can show a main announcement, a secondary zone such as room schedules or floor maps, and a ticker at the same time.",
      },
      {
        q: "Can HR update office screens without involving IT?",
        a: "Yes. With role-based access, HR can be allowed to publish to specific zones and playlists, while IT keeps control of device and network settings.",
      },
      {
        q: "What content works best on internal communication screens?",
        a: "HR updates, town hall highlights, employee recognition, festive greetings, event reminders, meeting room schedules, floor maps, shuttle timings and emergency notices.",
      },
      {
        q: "Does Screen Bazaar include support and maintenance?",
        a: "Yes. Screen Bazaar includes support, warranty and maintenance, so your office screens keep running without adding to your IT team's workload.",
      },
      {
        q: "Can I try Screen Bazaar before buying?",
        a: "Yes. You can try the Screen Bazaar cloud dashboard free for 14 days.",
      },
    ],
  },
  {
    slug: "printed-standees-to-digital-displays-mistakes",
    title: "5 Mistakes Businesses Make When Switching from Printed Standees to Digital Displays",
    dek: "Static content, glare, clutter, hidden print costs and forgotten support: what to avoid when your flex banners become screens",
    description:
      "Switching from printed standees and flex banners to digital screens? Avoid these 5 mistakes: static content, glare, clutter, hidden print costs and no support plan.",
    category: "Guides",
    date: "2026-10-01",
    readMins: 5,
    accent: "#F97316",
    tint: "#FFF4E8",
    related: { label: "Digital signage for retail", href: "/digital-signage/retail" },
    keywords: ["printed standee vs digital signage", "flex banner to digital screen", "digital signage mistakes", "digital signage ROI", "shopfront display brightness"],
    faqs: [
      {
        q: "Is digital signage better than printed standees?",
        a: "For businesses that change offers often or run more than one location, usually yes. Digital content can be updated remotely, scheduled in advance and changed without reprinting. For a single message that never changes, print can still work.",
      },
      {
        q: "How long should a digital signage slide be?",
        a: "Short motion loops of 5 to 10 seconds work well, because people walking past give a screen only a few seconds of attention.",
      },
      {
        q: "What should one digital signage slide include?",
        a: "One primary visual, one clear headline and one call-to-action. Rotate several focused slides in a scheduled playlist instead of fitting everything onto one.",
      },
      {
        q: "How bright should a shopfront digital display be?",
        a: "For most indoor spaces, 400–700 nits can work well. Screens facing a glass shopfront usually need a high-brightness commercial display of around 1,500 nits or more, and 2,500 nits or more in direct sunlight.",
      },
      {
        q: "How quickly does a digital screen pay for itself?",
        a: "By removing recurring printing, courier and installation costs, a digital screen typically pays for itself within 15 days. Actual savings depend on how often you print and how many locations you run.",
      },
      {
        q: "Where should digital screens be placed in a store?",
        a: "At eye level, along the paths customers actually walk, and away from direct glare.",
      },
      {
        q: "What support comes with Screen Bazaar?",
        a: "Screen Bazaar includes support, warranty and maintenance, so you have one team to call if a screen needs attention.",
      },
    ],
  },
  {
    slug: "digital-signage-cms-features-checklist",
    title: "The Checklist: What Features to Look For in an Enterprise Digital Signage CMS",
    dek: "Zones, scheduling, access control, reliability, compatibility, security and support — the questions to ask before you choose",
    description:
      "An enterprise digital signage CMS checklist: multi-zone layouts, dayparting, remote monitoring, role-based access, offline reliability, player support, security and support.",
    category: "Software",
    date: "2026-10-01",
    readMins: 6,
    accent: "#2E9E5B",
    tint: "#EAF8EF",
    related: { label: "What Screen Bazaar's screens can do", href: "/#features" },
    keywords: ["digital signage CMS", "enterprise digital signage software", "digital signage CMS features", "digital signage checklist", "proof of play"],
    faqs: [
      {
        q: "What is a digital signage CMS?",
        a: "A digital signage content management system (CMS) is the software used to upload, schedule and publish content to digital screens, and to manage those screens across locations.",
      },
      {
        q: "What features should an enterprise digital signage CMS have?",
        a: "Look for split-screen layouts, automated scheduling (dayparting), screen grouping by location, role-based access, remote management, reliable playback, hardware compatibility, security, and vendor support with warranty and maintenance.",
      },
      {
        q: "What is dayparting in digital signage?",
        a: "Dayparting means scheduling content to change automatically by time of day, for example switching a breakfast menu to lunch combos at 11:30 AM without anyone touching the screen.",
      },
      {
        q: "What is split-screen zoning?",
        a: "Split-screen zoning divides one display into separate areas so it can show several things at once, such as a promotional video, a ticker and brand content.",
      },
      {
        q: "Why does role-based access matter for digital signage?",
        a: "It lets different teams, such as head office, regional managers, store managers or HR, edit only the content they're responsible for, while core settings and brand campaigns stay protected.",
      },
      {
        q: "What is proof-of-play?",
        a: "Proof-of-play is a record of where and when content was scheduled and played, often used to show advertisers that their campaign ran.",
      },
      {
        q: "Does Screen Bazaar offer a free trial?",
        a: "Yes. Screen Bazaar offers a 14-day free trial of its cloud dashboard.",
      },
    ],
  },
];

export const getBlog = (slug) => BLOGS.find((b) => b.slug === slug);

/* Structured data (JSON-LD) for one blog: BlogPosting + BreadcrumbList + FAQPage. */
export function blogSchema(post) {
  const url = `${SITE_URL}${blogPath(post.slug)}`;
  const publisher = {
    "@type": "Organization",
    name: "Screen Bazaar by Connect",
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/screen-bazaar/logo.svg` },
  };
  const graph = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      image: [blogOgImage(post.slug)],
      datePublished: post.date,
      dateModified: post.updated || post.date,
      author: { "@type": "Organization", name: AUTHOR, url: SITE_URL },
      publisher,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      url,
      articleSection: post.category,
      keywords: post.keywords.join(", "),
      inLanguage: "en-IN",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Blogs", item: `${SITE_URL}${BLOG_BASE}` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];
  if (post.faqs?.length) {
    graph.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }
  return graph;
}

/* Structured data for the /blogs index. */
export function blogIndexSchema() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Screen Bazaar Blog",
      description: BLOG_INDEX.description,
      url: `${SITE_URL}${BLOG_BASE}`,
      inLanguage: "en-IN",
      blogPost: BLOGS.map((b) => ({
        "@type": "BlogPosting",
        headline: b.title,
        url: `${SITE_URL}${blogPath(b.slug)}`,
        datePublished: b.date,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Blogs", item: `${SITE_URL}${BLOG_BASE}` },
      ],
    },
  ];
}
