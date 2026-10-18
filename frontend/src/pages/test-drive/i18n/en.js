/** English copy for the test drive. hi.js must mirror this key tree exactly. */
export const en = {
  meta: {
    title: "Screen Bazaar — Test Drive",
    description:
      "Try a digital signage environment built for your business. Five virtual screens, real scheduling, instant previews.",
  },

  brand: { name: "Screen Bazaar", parent: "by Connect Gen-AI" },

  welcome: {
    kicker: "Screen Bazaar",
    title: "Welcome to your immersive experience.",
    line1: "Your business. Your screens. Your content. Your control.",
    line2: "Five screens. Endless possibilities.",
    cta: "Personalise my experience",
    support:
      "Explore a digital signage environment tailored to your business and learn how to manage every screen.",
    langLabel: "Language",
  },

  intake: {
    heading: "Let's personalise your experience",
    description:
      "Tell us a little about your business so we can build your digital signage environment.",
    businessName: "Business name",
    industry: "Industry",
    phone: "Phone number",
    email: "Business email",
    yourName: "Your name",
    industryPlaceholder: "Choose your industry",
    cta: "Enter my experience",
    submitting: "Building your environment…",
    privacy:
      "We'll use these details only to set up your test drive and to contact you about Screen Bazaar. No account needed.",
    err: {
      businessName: "Please tell us your business name.",
      industry: "Please choose your industry.",
      phone: "We need a number to reach you on.",
      phoneFormat: "Enter a valid phone number, e.g. +91 98765 43210.",
      email: "We need an email address.",
      emailFormat: "That email doesn't look right.",
    },
    leadFailed:
      "We couldn't save your details, but your test drive is ready. We'll retry in the background.",
  },

  industries: {
    restaurant: "Restaurant",
    cafe: "Café / Coffee Shop",
    retail: "Retail / Store",
    healthcare: "Clinic / Hospital",
    hospitality: "Hotel / Resort",
    realestate: "Real Estate / Developer",
    corporate: "Corporate / Office",
    fitness: "Gym / Fitness Studio",
    education: "School / College / Coaching",
    automotive: "Car Showroom / Service",
  },

  intro: {
    arrival: "Welcome to {business}",
    arrivalGeneric: "Welcome to your digital signage",
    reveal: "Every screen has a role. You decide what it displays.",
    control: "Choose a screen. Choose your content. Set your schedule. Let's begin.",
    skip: "Skip intro",
  },

  modes: { live: "Live Screen", control: "Control Panel" },

  sim: {
    badge: "Interactive simulation · 5 virtual screens",
    label: "Simulation",
    simulatedHealth: "Simulated screen health",
    virtualScreen: "Virtual screen",
    demoEnvironment: "Demo environment",
    time: "Preview time",
    play: "Play",
    pause: "Pause",
    now: "Now",
    speed: "Speed",
    // "1 minute per second", "1 hour per second" — the unit is what needs words;
    // the multiplier itself is a numeral and stays ASCII, like every other time
    // value in the feature.
    speedMin: "{n} min/sec",
    speedHour: "{n} hr/sec",
    note: "These are five virtual screens for your test drive, not connected hardware.",
  },

  screens: {
    title: "Your screens",
    /* The display name of a screen, numbered from its id. Rendered through t(),
       never stored: a label held in reducer state could not follow a language
       switch, which left "Screen 1" sitting in English on an otherwise Hindi
       console. */
    label: "Screen {n}",
    select: "Select screen",
    listView: "List",
    gridView: "Thumbnails",
    primary: "Primary screen",
    secondary: "Secondary screen",
    role: "Role",
    mirroring: "Mirroring {screen}",
    changePrimary: "Change primary screen",
    nowPlaying: "Now showing",
    online: "Online",
    offline: "Offline",
    playbackActive: "Playback active",
    playbackInactive: "Playback inactive",
    summaryAll: "All virtual screens online",
    summarySome: "{online} of {total} virtual screens online",
    secondaryNotice:
      "This screen mirrors {screen}. Manage its content and schedule through the primary screen.",
    promoteTitle: "Make this a primary screen?",
    promoteBody:
      "It will stop mirroring {screen} and start with a copy of that screen's schedule, which you can then edit independently.",
    promoteConfirm: "Make it primary",
    demoteTitle: "Make this a secondary screen?",
    demoteBody:
      "Its own schedule will be set aside and it will mirror the primary screen you choose.",
    demoteConfirm: "Make it secondary",
    followersWarning:
      "{count} other screen(s) mirror this one. They will follow its new primary.",
    cannotMirrorSelf: "A screen can't mirror itself.",
    cannotMirrorCycle: "That would make two screens mirror each other.",
    noPrimaries: "You need at least one primary screen.",
  },

  play: {
    idle: "Outside active hours",
    idleBody: "This screen is resting until {start}.",
    noContent: "Nothing scheduled",
    noContentBody: "No creative covers {time}.",
    offline: "Screen offline",
    offlineBody: "This is a simulated offline state.",
    brokenLink: "Mirror unavailable",
    reason: {
      offline: "Screen is offline (simulated)",
      primaryOffline: "The primary screen is offline (simulated)",
      outsideHours: "Outside active hours",
      gap: "No creative scheduled at this time",
      creativeMissing: "The scheduled creative was removed",
      notConfigured: "This screen has no configuration yet",
      cycle: "Mirror loop detected",
      unknownScreen: "Unknown screen",
    },
  },

  panel: {
    title: "Control Panel",
    creative: "Content",
    schedule: "Schedule",
    hours: "Active hours",
    mirror: "Role",
    health: "Health",
    close: "Close",
    forScreen: "For {screen}",
  },

  library: {
    title: "Content Library",
    subtitle: "Creatives designed for your industry",
    all: "All",
    svg: "Designs",
    image: "Images",
    video: "Videos",
    preview: "Preview creative",
    use: "Use this creative",
    assign: "Add to schedule",
    empty: "No creatives match this filter.",
    yours: "Your creatives",
    addNew: "Add content",
    editFields: "Customise",
    duplicate: "Duplicate",
    remove: "Remove",
    removeConfirm: "Remove this creative? Any schedule slots using it will be cleared.",
    fields: {
      businessName: "Business name",
      headline: "Headline",
      offer: "Offer text",
      price: "Price",
      cta: "Call to action",
      // Only the informational creatives declare this one.
      hours: "Opening hours",
      /* The healthcare set's own two. A clinic screen's payload is guidance and
         queue position, not an offer and a price, and the label above the box is
         the whole instruction a non-technical visitor gets — so these are their
         own fields rather than `offer` and `price` wearing different hats. */
      detail: "Details",
      token: "Token number",
      /* The hospitality set's own. A receptionist typing "Mr & Mrs Sharma"
         needs to see "Guest name" above the box, not "Headline". */
      guestName: "Guest name",
      /* The real-estate set's own, shared with corporate's metrics board. A
         figure that is the POINT of the card and is NOT a currency amount —
         "72% sold", "4 BHK", "NPS 72" — where "Price" above the editor box
         would read wrong. */
      stat: "Figure",
    },
    fieldHint: "Shown on the screen exactly as typed.",
  },

  /**
   * Creative names and descriptions, keyed by template id. These live here rather
   * than as literals in creatives/restaurant/index.js because the library has to
   * read in Hindi too, and a translated string must never be stored as data.
   */
  creatives: {
    r_thali_combo: {
      name: "Thali Combo",
      desc: "A full-plate meal offer with a price badge. Best for value messaging.",
    },
    r_lunch_special: {
      name: "Lunch Special",
      desc: "A light, time-limited offer with a corner ribbon.",
    },
    r_happy_hour: {
      name: "Happy Hours",
      desc: "An evening drinks offer on a dark background.",
    },
    r_todays_special: {
      name: "Today's Special",
      desc: "A centred menu card for the dish of the day.",
    },
    r_family_feast: {
      name: "Family Feast",
      desc: "A sharing offer for groups, with a saving ribbon.",
    },
    r_new_on_menu: {
      name: "New on the Menu",
      desc: "A bright announcement for a newly added dish.",
    },
    r_weekend_brunch: {
      name: "Weekend Brunch",
      desc: "A warm morning layout for weekend service.",
    },
    r_opening_hours: {
      name: "Opening Hours",
      desc: "Information rather than an offer: your trading hours, with a clock.",
    },
    c_coffee_of_day: {
      name: "Coffee of the Day",
      desc: "A single featured brew with a price badge. The café's everyday workhorse.",
    },
    c_morning_combo: {
      name: "Morning Combo",
      desc: "Coffee and a bake together, for the before-work rush.",
    },
    c_loyalty_card: {
      name: "Loyalty Card",
      desc: "Buy a few, get one free — drawn as stamps on a card.",
    },
    c_fresh_bakes: {
      name: "Fresh Bakes",
      desc: "Out-of-the-oven announcement, warm and bright.",
    },
    c_iced_summer: {
      name: "Iced & Cold Brew",
      desc: "A cool palette for cold drinks, with a tall glass.",
    },
    c_wifi_workspace: {
      name: "Wi-Fi & Workspace",
      desc: "For the laptop crowd: fast Wi-Fi and a seat to use it from.",
    },
    c_evening_unwind: {
      name: "Evening Unwind",
      desc: "A dark, calm layout for the last hours of the day.",
    },
    c_opening_hours: {
      name: "Café Hours",
      desc: "Informational: when you open and close, with a cup.",
    },
    rt_flash_sale: {
      name: "Flash Sale",
      desc: "The loudest card in the set: a discount on a starburst, for the window.",
    },
    rt_new_arrivals: {
      name: "New Arrivals",
      desc: "A drop announcement on a rail of hangers. No price — the swing tag has that.",
    },
    rt_buy_one_get_one: {
      name: "Buy One Get One",
      desc: "Two bags, one of them free, so the offer reads before the text does.",
    },
    rt_price_drop: {
      name: "Price Drop",
      desc: "Old price struck through, new price large. Factual rather than promotional.",
    },
    rt_weekend_offer: {
      name: "Weekend Special",
      desc: "A lit shop window on deep indigo, with a ribbon for the time window.",
    },
    rt_members_only: {
      name: "Members Save More",
      desc: "A membership card on black — the premium card in a library of sale shouting.",
    },
    rt_clearance_rack: {
      name: "Clearance",
      desc: "A rack of swing tags. Takes the longest discount text in the set.",
    },
    rt_store_hours: {
      name: "Store Hours",
      desc: "Informational: your trading hours, on a shopfront with an open sign.",
    },
    h_doctor_on_duty: {
      name: "Doctor on Duty",
      desc: "Who is in and until when — the waiting room's most-asked question.",
    },
    h_token_queue: {
      name: "Now Serving",
      desc: "The queue display: a large token number on a lit panel.",
    },
    h_health_tip: {
      name: "Tip of the Day",
      desc: "A line of advice over an ECG trace. Built for a repeating playlist.",
    },
    h_vaccination_drive: {
      name: "Vaccination Drive",
      desc: "A walk-in announcement, with a syringe on a shield.",
    },
    h_department_guide: {
      name: "Department Guide",
      desc: "Wayfinding: a destination and a route, on a corridor sign board.",
    },
    h_health_package: {
      name: "Check-up Package",
      desc: "A priced package as a clipboard of ticked tests.",
    },
    h_camp_notice: {
      name: "Health Camp",
      desc: "A community camp under a night sky. The price field often reads “FREE”.",
    },
    h_clinic_hours: {
      name: "OPD Timings",
      desc: "Informational: your consulting hours, drawn as a window inside the day.",
    },
    ho_lobby_welcome: {
      name: "Lobby Welcome",
      desc: "A guest greeted by name, on indigo and gold with two key cards.",
    },
    ho_room_offer: {
      name: "Room Offer",
      desc: "A priced weekend rate, with five stars over the bed.",
    },
    ho_amenity_hours: {
      name: "Pool & Spa Hours",
      desc: "Timings for an amenity, over still water. For the door it stands beside.",
    },
    ho_dinner_tonight: {
      name: "Dinner Tonight",
      desc: "What is on downstairs this evening — for a guest already staying.",
    },
    ho_spa_package: {
      name: "Spa Package",
      desc: "The calmest card in the set: a priced treatment over a candle bowl.",
    },
    ho_event_today: {
      name: "Event Today",
      desc: "Tonight's function under string lights. Re-pointed daily.",
    },
    ho_directions: {
      name: "Corridor Directions",
      desc: "Wayfinding: room numbers and a route, on a brushed sign plate.",
    },
    ho_checkout_info: {
      name: "Check-in & Check-out",
      desc: "Informational: the two times guests ask about, beside a packed suitcase.",
    },
    re_tower_launch: {
      name: "Tower Launch",
      desc: "The set's one card that shouts: a new project under a tower crane, with a booking amount.",
    },
    re_available_units: {
      name: "Available Units",
      desc: "A configuration and its per-sqft rate, with a floor plan laid beside the figure.",
    },
    re_site_visit: {
      name: "Site Visit",
      desc: "Weekend pick-up timings on a project-site hoarding sign.",
    },
    re_sold_announcement: {
      name: "Nearly Sold Out",
      desc: "Social proof: a figure under a tilted SOLD stamp.",
    },
    re_emi_offer: {
      name: "EMI Starts At",
      desc: "The affordability card: a monthly figure on a stack of coins.",
    },
    re_open_house: {
      name: "Open House",
      desc: "A model-flat opening with its address pinned on the map.",
    },
    re_amenity_showcase: {
      name: "Project Amenities",
      desc: "What is inside the gate — four icons across the top, with the list below.",
    },
    re_office_hours: {
      name: "Sales Office Hours",
      desc: "Informational: when the office is open, with a house key on its tag.",
    },
    co_all_hands: {
      name: "All-Hands",
      desc: "Deep indigo auditorium invite, with a mic on stage and a gold time plate.",
    },
    co_meeting_room: {
      name: "Meeting Room Status",
      desc: "A door with a lit indicator — the screen that sits outside a conference room.",
    },
    co_visitor_welcome: {
      name: "Visitor Welcome",
      desc: "The reception screen: a visitor greeted by name, with a lanyard badge.",
    },
    co_birthdays: {
      name: "Birthdays Today",
      desc: "Names on a tilted sticky note, pinned to the board.",
    },
    co_metrics: {
      name: "Metrics Board",
      desc: "The KPI monitor's card: one large figure with a rising bar chart.",
    },
    co_townhall: {
      name: "Townhall · AMA",
      desc: "A soft Q&A invite under two overlapping chat bubbles.",
    },
    co_notice: {
      name: "Facility Notice",
      desc: "A lift or washroom notice — a caution triangle and a workaround.",
    },
    co_office_hours: {
      name: "Office Hours",
      desc: "Informational: a Mon–Fri planner strip, with the working window marked.",
    },
    f_class_schedule: {
      name: "Tonight's Classes",
      desc: "The gym floor's at-a-glance: a hazard-stripe band over tonight's programme.",
    },
    f_membership_drive: {
      name: "Membership Drive",
      desc: "The one card that shouts: a dumbbell behind the headline, with a monthly rate.",
    },
    f_pt_offer: {
      name: "Personal Training",
      desc: "A session package priced per block, with a stopwatch dial drawn beside it.",
    },
    f_motivation: {
      name: "No Excuses",
      desc: "An ink-black motivational slab with a lightning bolt. No price, no CTA — the card is the message.",
    },
    f_hydration: {
      name: "Drink Water",
      desc: "A tall gym bottle beside a short wellness reminder, for the between-sets playlist.",
    },
    f_new_class: {
      name: "New Class",
      desc: "A quiet announcement for a new programme: a cycle wheel and a launch time.",
    },
    f_leaderboard: {
      name: "Challenge Board",
      desc: "A large figure under a medal — days on a streak, or members on a challenge.",
    },
    f_gym_hours: {
      name: "Gym Hours",
      desc: "Informational: your opening window, drawn as a stopwatch dial.",
    },
    e_seminar_notice: {
      name: "Guest Lecture",
      desc: "The campus seminar invite, under an open book on indigo and gold.",
    },
    e_exam_schedule: {
      name: "Exam Dates",
      desc: "End-of-semester dates on a ruled notebook page, with a tilted pencil at the corner.",
    },
    e_event_announcement: {
      name: "Fest · Event",
      desc: "A campus festival announcement with the atom's three orbits drawn behind the headline.",
    },
    e_timetable_change: {
      name: "Class Moved",
      desc: "The seminar-moved card: a paper plane with a dashed trail, and an attention badge.",
    },
    e_notice: {
      name: "Cork Board Notice",
      desc: "A tilted paper sheet pinned to a cork-textured ground. The whole card is the pinned notice.",
    },
    e_toppers: {
      name: "Results Board",
      desc: "A large figure under a mortarboard with a tassel — pass rate, toppers, distinctions.",
    },
    e_club_signup: {
      name: "Club Sign-up",
      desc: "An open-invite card with a stack of three books. The CTA names the route to join.",
    },
    e_office_hours: {
      name: "Admin Office Hours",
      desc: "Informational: your opening window on a ruled notebook page with a Mon–Sat date band.",
    },
    au_new_model: {
      name: "New Model",
      desc: "The dark-showroom hero: a side-profile car on a spot-lit turntable, with the on-road price.",
    },
    au_used_certified: {
      name: "Certified Pre-owned",
      desc: "A number plate spelling CERTIFIED beside a priced used car — the service-lounge comparison card.",
    },
    au_service_package: {
      name: "Service Package",
      desc: "A priced service bundle under a crossed spanner-and-screwdriver, in service-bay indigo.",
    },
    au_accessory: {
      name: "Accessory Bundle",
      desc: "A priced alloy-and-fit bundle beside a tyre-and-alloy drawn head-on.",
    },
    au_test_drive: {
      name: "Test Drive Invite",
      desc: "A key fob with a signal arc. No price — the invitation is the point of the card.",
    },
    au_spec_showcase: {
      name: "Standout Spec",
      desc: "One figure made large under a half-ring gauge: mileage, 0–60, boot volume.",
    },
    au_warranty: {
      name: "Warranty Years",
      desc: "A shield with a check mark on mint. The stat is a count of years, not money.",
    },
    au_showroom_hours: {
      name: "Showroom Hours",
      desc: "Informational: your opening window on a speedometer dial, with an odometer window below.",
    },
  },

  schedule: {
    title: "Content schedule",
    listView: "List view",
    timelineView: "Timeline view",
    addSlot: "Add a time slot",
    editSlot: "Edit slot",
    startTime: "Start time",
    endTime: "End time",
    duration: "Duration",
    creative: "Creative",
    /* The slot editor's own strings. It used to borrow library.empty ("No
       creatives match this filter") and library.use ("Use this creative") —
       the first named a filter the editor does not have, and the second read as
       a button rather than the "pick one" placeholder of a <select>. */
    chooseCreative: "Choose a creative",
    noCreativesYet: "Add a creative from the Content tab first.",
    empty: "Nothing scheduled yet. Add a time slot to get started.",
    gap: "Nothing scheduled",
    outsideHoursBadge: "Outside active hours",
    remove: "Remove",
    save: "Done",
    cancel: "Cancel",
    slotCount: "{count} of {max} slots used",
    hours24: "24-hour day",
    err: {
      startRequired: "Choose a start time.",
      endRequired: "Choose an end time.",
      endAfterStart: "The end time must be after the start time.",
      minFive: "A slot needs to be at least 5 minutes long.",
      pickCreative: "Choose a creative for this slot.",
      overlap: "This overlaps {creative} ({range}). Pick a free time.",
      tooMany: "You have used all {max} slots on this screen. Remove one first.",
    },
    warn: { outsideHours: "This slot sits outside active hours, so it will not play." },
  },

  hours: {
    title: "Active hours",
    description: "Your screens show scheduled content between these times.",
    start: "Opens at",
    end: "Closes at",
    outside: "Outside these hours the screen shows an idle state.",
    err: {
      endAfterStart: "Closing time must be after opening time.",
      tooShort: "Active hours need to be at least 30 minutes.",
    },
  },

  health: {
    title: "Screen health",
    disclaimer: "Health and connectivity values in this test drive are simulated.",
    connectivity: "Connectivity",
    playback: "Playback",
    lastSeen: "Last seen",
    uptime: "Uptime",
    currentContent: "Current content",
    none: "None",
    refresh: "Re-check",
  },

  save: {
    action: "Save",
    unsaved: "Unsaved changes",
    saving: "Saving…",
    saved: "Saved",
    applied: "Applied to virtual screens",
    error: "Could not save. Please try again.",
    success: "Changes saved. Your virtual screen previews have been updated.",
    discard: "Discard changes",
    discardConfirm: "Discard your unsaved changes?",
    clean: "All changes saved",
    note: "Changes apply to this simulation, not to physical displays.",
  },

  tutorial: {
    progress: "Step {current} of {total}",
    skip: "Skip tutorial",
    skipStep: "Skip this step",
    replay: "Replay",
    next: "Continue",
    prev: "Previous",
    finish: "Finish",
    done: "Done",
    help: "Help",
    exploreFreely: "Explore freely",
    restart: "Restart test drive",
    completeBadge: "Tutorial completed",
    actionNeeded: "Try the action above to continue.",
    m1: {
      title: "Explore your screens",
      body: "You have five virtual screens. Tap one to preview what it is showing. Switch between list and thumbnail views to see them all. Primary screens hold their own schedule; secondary screens mirror a primary you pick.",
      hint: "Select a screen, then try the other view.",
    },
    m2: {
      title: "Control Panel and health",
      body: "Open the Control Panel for your selected screen. This is where you manage its settings, active hours and content schedule. Start by checking its health.",
      hint: "Open the Control Panel and look at the health section.",
    },
    m3: {
      title: "Content library and schedule",
      body: "Open the content library and pick a creative made for your industry. Customise its text, then give it a start and end time.",
      hint: "Assign a creative and set a valid start and end time.",
    },
    m4: {
      title: "Primary and secondary screens",
      body: "A primary screen manages its own content. A secondary screen mirrors the primary you choose, so several displays can show the same thing without separate schedules.",
      hint: "Link a secondary screen to a primary screen.",
    },
    m5: {
      title: "Monitor your setup",
      body: "Use the screen overview to check connectivity and playback. In this test drive those readings are simulated to show how monitoring works.",
      hint: "Check the overview, then inspect one screen's status.",
    },
    m6: {
      title: "Save and see the result",
      body: "Save your changes and watch the matching virtual screen update straight away. Saved changes affect this simulation, not physical devices.",
      hint: "Press Save and watch the previews.",
    },
  },

  complete: {
    title: "You're in control.",
    body: "You've explored your screens, managed content and schedules, checked screen health, and saved your changes.",
    checklist: {
      explore: "Explore and select screens",
      schedule: "Choose creatives and schedule content",
      mirror: "Manage primary and secondary screens",
      monitor: "Monitor screen health",
      save: "Save changes and preview the result",
    },
    exploreFreely: "Explore Freely",
    replay: "Replay Tutorial",
    restart: "Restart Test Drive",
    talk: "Talk to Our Team",
  },

  audio: {
    play: "Play narration",
    pause: "Pause narration",
    replay: "Replay narration",
    mute: "Mute",
    unmute: "Unmute",
    unavailable: "Narration unavailable",
    transcript: "Transcript",
    loading: "Loading narration…",
  },

  restart: {
    title: "Restart your test drive?",
    body: "This clears your business details, screen setup, schedules and tutorial progress, and starts again from the beginning.",
    confirm: "Restart",
    cancel: "Keep going",
  },

  common: {
    back: "Back",
    cancel: "Cancel",
    confirm: "Confirm",
    close: "Close",
    optional: "optional",
    required: "required",
    menu: "Menu",
    of: "of",
    yes: "Yes",
    no: "No",
  },
};
