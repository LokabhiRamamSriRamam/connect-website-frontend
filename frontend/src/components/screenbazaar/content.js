/*
 * Screen Bazaar landing copy — owner-supplied text, see SCREEN_BAZAAR_PLAN.md §4 and §4b.
 * Modal bodies are lists of blocks:
 *   { p }            paragraph
 *   { lead, list }   intro line + bullet list
 *   { imagine }      "Imagine" scenario (array of lines)
 *   { table }        two-column rows
 *   { flow }         arrow flow, e.g. "Select → Publish → Done."
 *   { quote }        italic quote line
 *   { callout }      highlighted status line
 *   { outro }        closing bold line
 *
 * Each industry also has its own, individually designed page at /digital-signage/<slug>
 * (frontend/src/pages/signage/*). Those pages read their owner copy from here; `seo` is
 * the page title + meta description.
 */

export const industryPath = (slug) => `/digital-signage/${slug}`;
export const getIndustry = (slug) => INDUSTRIES.find((i) => i.slug === slug);

export const FEATURE_CHAPTERS = [
  {
    id: "control",
    label: "Chapter 01 — Control",
    title: "Take control of every screen.",
    features: [
      {
        n: "01",
        kicker: "Stop walking up to the screen",
        title: "Change what's playing without being there.",
        line: "Update every screen from your phone or laptop.",
        art: "RemoteUpdate",
        morph: "collapse",
        modal: {
          title: "Change what's playing without being there.",
          body: [
            { p: "You shouldn't need to carry a USB drive, visit every branch or ask someone on-site to change what's playing." },
            {
              lead: "With Screen Bazaar, you can:",
              list: [
                "Update a single screen remotely",
                "Update multiple screens at once",
                "Manage screens across different locations",
                "Publish content instantly",
                "Control everything from your phone or laptop",
              ],
            },
            {
              imagine: [
                "Your restaurant has five branches. At 11:30 AM, the lunch menu changes.",
                "Select all five branches → publish the new menu → done.",
                "No travel. No USB drives. No calling staff.",
              ],
            },
            { flow: "Select → Publish → Done." },
          ],
        },
      },
      {
        n: "02",
        kicker: "Manage 100 screens like one",
        title: "One update. Every location.",
        line: "Managing multiple screens shouldn't mean managing each screen individually.",
        art: "OneUpdate",
        morph: "collapse",
        modal: {
          title: "One update. Every location.",
          body: [
            { p: "Managing multiple screens shouldn't mean managing each screen individually." },
            {
              lead: "Screen Bazaar lets you organize your entire network by:",
              list: ["Business location", "Branch", "Screen", "Screen group", "Campaign"],
            },
            { p: "Then publish an update across the entire group with one action." },
            {
              imagine: [
                "Your retail business has 25 stores and 75 screens.",
                "A new promotion launches tomorrow.",
                "Instead of updating 75 screens individually:",
                "Select All Stores → Publish → Done.",
              ],
            },
            { outro: "Your entire network changes together." },
          ],
        },
      },
      {
        n: "03",
        kicker: "Know when something goes wrong",
        title: "Stop discovering a broken screen from your customers.",
        line: "A screen that's offline shouldn't become a problem you discover hours later.",
        art: "ScreenAlert",
        morph: "drop",
        modal: {
          title: "Know when something goes wrong.",
          body: [
            { p: "A screen that's offline shouldn't become a problem you discover hours later." },
            { p: "Screen Bazaar keeps an eye on your screen network and lets you know when something needs attention." },
            {
              lead: "You can see:",
              list: [
                "Which screens are online",
                "Which screens are offline",
                "When a screen last connected",
                "What content is currently playing",
                "Which location needs attention",
              ],
            },
            { p: "Where supported by the screen player, you can also take action remotely." },
            { p: "Instead of asking:" },
            { quote: "\"Why isn't the advertisement showing?\"" },
            { p: "You already know:" },
            { callout: "Andheri Store — Screen Offline" },
          ],
        },
      },
    ],
  },
  {
    id: "work",
    label: "Chapter 02 — Make your screen work",
    title: "Don't let your screen sit idle.",
    features: [
      {
        n: "04",
        kicker: "Turn one screen into many advertising opportunities",
        title: "One screen. Multiple messages.",
        line: "Your screen doesn't have to show the same thing all day.",
        art: "TimeSlots",
        morph: "fold",
        modal: {
          title: "One screen. Multiple messages.",
          body: [
            { p: "Your screen doesn't have to show the same thing all day." },
            { p: "Screen Bazaar lets you divide your screen time into programmable slots." },
            {
              lead: "For example:",
              table: [
                ["10 AM", "Your business"],
                ["12 PM", "Lunch promotion"],
                ["2 PM", "Partner advertisement"],
                ["5 PM", "Evening offer"],
                ["8 PM", "Third-party campaign"],
              ],
            },
            { p: "You decide what your screen displays and when." },
            { outro: "Your screen becomes programmable advertising real estate." },
          ],
        },
      },
      {
        n: "05",
        kicker: "Make your screens earn money",
        title: "Your screen doesn't have to sit idle.",
        line: "Your screen already occupies valuable space in your business.",
        art: "EarnMoney",
        morph: "drop",
        modal: {
          title: "Make your screens earn money.",
          body: [
            { p: "Your screen already occupies valuable space in your business." },
            { p: "Why should every minute of that space belong to your own content?" },
            { p: "With Screen Bazaar, you can potentially make unused screen inventory available for advertising." },
            {
              lead: "You can decide:",
              list: [
                "When your own content plays",
                "When advertising can appear",
                "Which screens participate",
                "How much inventory you make available",
                "Which campaigns run on your screens",
              ],
            },
            { p: "The idea is simple:" },
            { p: "Your screen becomes an asset that can generate revenue." },
            { p: "A café, clinic, salon, gym or retail store can turn unused screen time into an additional revenue opportunity." },
            { outro: "Your screen works for your business — even when you're not advertising yourself." },
          ],
        },
      },
      {
        n: "06",
        kicker: "Change your message depending on the moment",
        title: "The right message. At the right time.",
        line: "Your customers don't need to see the same message all day.",
        art: "RightMoment",
        morph: "spin",
        modal: {
          title: "The right message. At the right time.",
          body: [
            { p: "Your customers don't need to see the same message all day." },
            { p: "Create your content once and let Screen Bazaar decide when it appears." },
            {
              lead: "For example, a restaurant can automatically show:",
              table: [
                ["Morning", "Breakfast ₹199"],
                ["Afternoon", "Lunch Thali ₹249"],
                ["Evening", "Family Dinner"],
                ["Weekend", "Live Music Tonight"],
              ],
            },
            {
              lead: "You can schedule content by:",
              list: ["Time", "Date", "Day", "Location", "Screen", "Campaign"],
            },
            { outro: "Create once. Schedule once. Let your screens do the rest." },
          ],
        },
      },
    ],
  },
  {
    id: "network",
    label: "Chapter 03 — Build the network",
    title: "Turn individual screens into an advertising network.",
    features: [
      {
        n: "07",
        kicker: "Reach customers where they already are",
        title: "Don't just advertise online. Be there physically.",
        line: "Screen Bazaar brings advertising into the physical places people already visit.",
        art: "PhysicalReach",
        morph: "collapse",
        modal: {
          title: "Reach customers where they already are.",
          body: [
            { p: "Digital advertising can reach someone on a phone." },
            { p: "Screen Bazaar brings advertising into the physical places people already visit." },
            {
              lead: "Advertisers can potentially choose:",
              list: ["Location", "Area", "Venue type", "Screen", "Campaign period", "Time of day"],
            },
            {
              imagine: [
                "A dental clinic wants to reach people around Mumbai.",
                "Instead of simply targeting an online audience, it can potentially place its campaign on screens inside relevant physical venues.",
              ],
            },
            { flow: "Location → Venue → Screen → Time" },
            { outro: "The advertisement becomes part of the environment." },
          ],
        },
      },
      {
        n: "08",
        kicker: "Give every location its own voice",
        title: "One business. Different messages everywhere.",
        line: "Your brand may be the same everywhere. Your customers aren't.",
        art: "LocalVoice",
        morph: "rise",
        modal: {
          title: "One business. Different messages everywhere.",
          body: [
            { p: "Your brand may be the same everywhere." },
            { p: "Your customers aren't." },
            { p: "Screen Bazaar lets you manage a central network while giving individual locations the freedom to display what matters locally." },
            {
              lead: "For example:",
              table: [
                ["Mumbai", "Mumbai-specific promotion"],
                ["Pune", "Pune-specific promotion"],
                ["Delhi", "Delhi-specific promotion"],
              ],
            },
            { p: "Head office can control the network while locations can have their own content." },
            { outro: "One platform. Every location. Its own message." },
          ],
        },
      },
      {
        n: "09",
        kicker: "Give advertisers proof that their money was spent",
        title: "Know where every campaign played.",
        line: "When an advertiser pays for screen advertising, they need more than “Trust us. Your ad ran.”",
        art: "ProofOfPlay",
        morph: "fold",
        modal: {
          title: "Know where every campaign played.",
          body: [
            { p: "When an advertiser pays for screen advertising, they need more than:" },
            { quote: "\"Trust us. Your ad ran.\"" },
            { p: "Screen Bazaar can provide campaign delivery information showing where and when the campaign was scheduled and played." },
            {
              lead: "Advertisers can see:",
              list: [
                "Campaign duration",
                "Participating screens",
                "Locations",
                "Scheduled plays",
                "Completed plays",
                "Campaign delivery reports",
              ],
            },
            { p: "And receive a Proof of Play report." },
            { flow: "Campaign → Distribution → Playback → Report" },
            { outro: "Every campaign has a record." },
          ],
        },
      },
    ],
  },
];

export const INDUSTRIES = [
  {
    n: "01",
    slug: "retail",
    label: "Retail",
    title: "Make your store impossible to ignore.",
    line: "Turn screens into a constantly changing storefront for promotions, products and offers.",
    art: "RetailScene",
    morph: "collapse",
    seo: {
      title: "Digital Signage for Retail Stores",
      description:
        "Turn your store screens into a constantly changing storefront. Screen Bazaar gives retailers the screen, the app and the scheduling to promote products and offers in every branch.",
    },
    modal: {
      title: "Make every screen part of your store.",
      intro: "Your customers are already looking around. Use your screens to show them what they should see next.",
      can: [
        "Showcase new products",
        "Promote limited-time offers",
        "Highlight products customers may have missed",
        "Display seasonal campaigns",
        "Run partner advertisements",
      ],
      imagine: [
        "Your weekend sale starts tomorrow.",
        "Update every store's screens from one place and have the new promotion playing before the doors open.",
      ],
      reach: "Shoppers",
    },
  },
  {
    n: "02",
    slug: "restaurants",
    label: "Restaurants & Cafés",
    title: "Keep your menu moving with the moment.",
    line: "Breakfast, lunch, dinner, offers and events don't need the same screen all day.",
    art: "RestaurantScene",
    morph: "spin",
    seo: {
      title: "Digital Menu Boards for Restaurants & Cafés",
      description:
        "Menu boards that change with the time of day. Promote today's specials, new dishes and events on every screen, from your phone, with Screen Bazaar.",
    },
    modal: {
      title: "Keep your menu moving with the moment.",
      intro: "Breakfast, lunch, dinner, offers and events don't need the same screen all day.",
      can: [
        "Promote today's specials",
        "Change content by time of day",
        "Showcase new dishes",
        "Promote events and offers",
        "Run partner advertisements",
      ],
      imagine: ["At 11:30 AM, your breakfast promotion disappears and your lunch menu takes over — automatically."],
      reach: "Diners",
    },
  },
  {
    n: "03",
    slug: "healthcare",
    label: "Healthcare",
    title: "Make the waiting room work for you.",
    line: "A screen can do more than fill silence. It can inform patients, explain services and communicate what's happening around them.",
    art: "HealthcareScene",
    morph: "collapse",
    seo: {
      title: "Digital Signage for Hospitals & Clinics",
      description:
        "Make the waiting room work for you. Inform patients, explain services and share announcements on clinic and hospital screens with Screen Bazaar.",
    },
    modal: {
      title: "Make the waiting room work for you.",
      intro: "A screen can do more than fill silence. It can inform patients, explain services and communicate what's happening around them.",
      can: [
        "Display health information",
        "Explain treatments and services",
        "Promote departments and facilities",
        "Communicate announcements",
        "Run relevant partner advertisements",
      ],
      imagine: [
        "While patients wait for their appointment, your screen explains a service you offer — something your receptionist didn't have to explain again.",
      ],
      reach: "Patients & attendants",
    },
  },
  {
    n: "04",
    slug: "hospitality",
    label: "Hospitality",
    title: "Give every guest a better welcome.",
    line: "From the lobby to the room, screens can help guests know what's happening and what's available.",
    art: "HospitalityScene",
    morph: "rise",
    seo: {
      title: "Digital Signage for Hotels & Hospitality",
      description:
        "Give every guest a better welcome. Show facilities, dining offers, events and directions on lobby and room screens with Screen Bazaar.",
    },
    modal: {
      title: "Give every guest a better welcome.",
      intro: "From the lobby to the room, screens can help guests know what's happening and what's available.",
      can: [
        "Welcome guests",
        "Promote hotel facilities",
        "Display events and activities",
        "Showcase dining offers",
        "Provide directions and information",
      ],
      imagine: ["A guest walks into the lobby and immediately sees today's restaurant special, pool timings and evening event."],
      reach: "Guests",
    },
  },
  {
    n: "05",
    slug: "fitness",
    label: "Fitness & Wellness",
    title: "Keep your members engaged beyond the workout.",
    line: "Your screens can motivate, inform and promote what your facility has to offer.",
    art: "FitnessScene",
    morph: "drop",
    seo: {
      title: "Digital Signage for Gyms & Wellness Centres",
      description:
        "Keep members engaged beyond the workout. Show class schedules, membership offers, trainers and programs on your gym screens with Screen Bazaar.",
    },
    modal: {
      title: "Keep your members engaged beyond the workout.",
      intro: "Your screens can motivate, inform and promote what your facility has to offer.",
      can: [
        "Display class schedules",
        "Promote memberships",
        "Share fitness content",
        "Highlight trainers and programs",
        "Promote partner brands",
      ],
      imagine: ["The evening crowd walks in and the screen automatically switches to the night's class schedule and membership offer."],
      reach: "Members & visitors",
    },
  },
  {
    n: "06",
    slug: "education",
    label: "Education",
    title: "Turn every campus screen into a communication channel.",
    line: "Important information shouldn't depend on someone noticing a noticeboard.",
    art: "EducationScene",
    morph: "fold",
    seo: {
      title: "Digital Notice Boards for Schools & Colleges",
      description:
        "Turn every campus screen into a communication channel. Share notices, schedules and events across campus without printing a single notice, with Screen Bazaar.",
    },
    modal: {
      title: "Turn every campus screen into a communication channel.",
      intro: "Important information shouldn't depend on someone noticing a noticeboard.",
      can: ["Announce events", "Display schedules", "Share important notices", "Promote activities", "Communicate campus information"],
      imagine: ["A seminar schedule changes at the last minute. Update the screens across campus without printing a single notice."],
      reach: "Students, parents & staff",
    },
  },
  {
    n: "07",
    slug: "automotive",
    label: "Automotive",
    title: "Put your vehicles and services in the spotlight.",
    line: "Whether customers are browsing a showroom or waiting for their car, your screens can keep them informed and engaged.",
    art: "AutomotiveScene",
    morph: "fold",
    seo: {
      title: "Digital Signage for Car Showrooms & Service Centres",
      description:
        "Put your vehicles and services in the spotlight. Showcase models, offers and accessories to showroom visitors and waiting customers with Screen Bazaar.",
    },
    modal: {
      title: "Put your vehicles and services in the spotlight.",
      intro: "Whether customers are browsing a showroom or waiting for their car, your screens can keep them informed and engaged.",
      can: ["Showcase vehicles", "Highlight offers", "Promote accessories", "Explain services", "Entertain customers while they wait"],
      imagine: ["A customer waiting for a service sees a new model and its features on the screen beside them."],
      reach: "Customers & prospects",
    },
  },
  {
    n: "08",
    slug: "real-estate",
    label: "Real Estate",
    title: "Let your properties sell themselves.",
    line: "Your screens can bring projects, properties and possibilities to life while prospects are already in your space.",
    art: "RealEstateScene",
    morph: "rise",
    seo: {
      title: "Digital Signage for Real Estate Sales Offices",
      description:
        "Let your properties sell themselves. Show projects, walkthroughs, amenities and availability to prospects in your sales office with Screen Bazaar.",
    },
    modal: {
      title: "Let your properties sell themselves.",
      intro: "Your screens can bring projects, properties and possibilities to life while prospects are already in your space.",
      can: ["Showcase properties", "Display project walkthroughs", "Promote new launches", "Highlight amenities", "Display offers and availability"],
      imagine: ["A prospect walks into your sales office and sees your latest project, amenities and available units playing across the screen."],
      reach: "Buyers & investors",
    },
  },
  {
    n: "09",
    slug: "corporate",
    label: "Corporate & Offices",
    title: "Keep your workplace in the loop.",
    line: "From reception to the cafeteria, screens can keep employees and visitors informed without filling inboxes.",
    art: "CorporateScene",
    morph: "collapse",
    seo: {
      title: "Digital Signage for Offices & Workplaces",
      description:
        "Keep your workplace in the loop. Share announcements, events, visitor welcomes and dashboards on office screens without filling inboxes, with Screen Bazaar.",
    },
    modal: {
      title: "Keep your workplace in the loop.",
      intro: "From reception to the cafeteria, screens can keep employees and visitors informed without filling inboxes.",
      can: ["Share company announcements", "Display events", "Welcome visitors", "Show internal communications", "Display dashboards and updates"],
      imagine: ["It's Monday morning. Employees walk in to see this week's announcements, events and important updates already playing."],
      reach: "Employees & visitors",
    },
  },
];

/*
 * Testimonials (owner-supplied copy, shown after the Industries section).
 * `headline` is split around the phrase that gets the marker highlight.
 */
export const TESTIMONIALS = [
  {
    slug: "rajesh-sharma",
    segment: "Retail",
    art: "RetailStory",
    headline: ["I can update monsoon sales across all three branches straight ", "from my phone", "."],
    body: "Earlier, updating digital offers meant moving pen drives between screens or re-printing standees every month. Now I launch new festive arrivals and weekend offers across our stores in Thane and Dadar in under five minutes. Our walk-in conversions jumped significantly because our promotions are always fresh.",
    name: "Rajesh Sharma",
    role: "Founder & MD",
    company: "Aura Fashion Retail",
    photo: "/screen-bazaar/testimonial-rajesh-sharma.webp",
    stats: ["3 branches", "Under 5 min"],
  },
  {
    slug: "priya-kulkarni",
    segment: "Corporate & Offices",
    art: "CorporateStory",
    headline: ["Managing 35 screens across four office floors used to take hours. Now it takes ", "10 minutes", "."],
    body: "We needed a central system for internal town hall updates, visitor welcome screens, and floor schedules. The dashboard is so simple that our HR team manages all playlists directly without calling IT. It’s completely plug-and-play and works without a hitch.",
    name: "Priya Kulkarni",
    role: "Lead Operations Manager",
    company: "Nexus Tech Solutions",
    photo: "/screen-bazaar/testimonial-priya-kulkarni.webp",
    stats: ["35 screens", "4 floors"],
  },
  {
    slug: "rohan-verma",
    segment: "Restaurants & Cafés",
    art: "CafeStory",
    headline: ["Our high-margin combos ", "sell out", " much faster now."],
    body: "Automated digital menu boards transformed our counters. Breakfast menus switch automatically to the lunch meal combos at 11:30 AM, and we display animated video clips of our signature drinks. Customers decide faster, queue times are down, and the screen clarity looks premium.",
    name: "Rohan Verma",
    role: "Co-Founder",
    company: "Urban Brew & Bites",
    photo: "/screen-bazaar/testimonial-rohan-verma.webp",
    stats: ["Auto-switch 11:30 AM", "Shorter queues"],
  },
];
