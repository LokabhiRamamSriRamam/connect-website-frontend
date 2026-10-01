# Screen Bazaar — Website Restructure Plan

Status: **landing page built (2026-10-01)** — `frontend/src/pages/LandingPage.jsx` + `frontend/src/components/screenbazaar/`. Sections: nav → hero → ticker + "Get one / Connect it / Put it to work" steps → Features (9 SVG cards + modals) → Industries (9 SVG cards + modals) → closing CTA → footer. 18 bespoke animated SVGs in `screenbazaar/illustrations/`; logo in `screenbazaar/ScreenBazaarLogo.jsx` + `public/screen-bazaar/logo.svg`, `favicon.svg`. Not built yet (need owner input/assets): pain-vs-gain, app screenshots, savings calculator, hardware, proof, pricing teaser, FAQ.
Last updated: 2026-10-01

Legend: ✅ decided by owner · 💡 proposed by Claude, not yet confirmed · ⏳ waiting on owner

---

## 1. Direction

- ✅ The company's website focus moves from Vital.AI / Molaris.AI to **digital signage**.
- ✅ Service name: **Screen Bazaar**
- ✅ Slogan: **Connect your screens to opportunity.**
- ✅ **No AI anywhere** in the Screen Bazaar product or pitch. Do not use "X.AI" style naming.
- ✅ The pitch is about the customer's **presence, marketing and ROI**.
- ✅ Hero and headlines must present **immediate value to the customer**, not generic lines.
- ✅ Logo: Claude designs the Screen Bazaar logo.

### Brand note
💡 The company name "Connect Gen AI" still contains "AI". On Screen Bazaar pages, show **"Connect"** or **"Screen Bazaar by Connect"** so the signage pitch stays AI-free. The company brand itself is a separate decision for the owner. The nav dropdown label "Also from Connect Gen AI" is as the owner specified.

### What the product is (✅)
Everything needed for digital signage, in one package:
- The display hardware (TV, monitor, etc.)
- A mobile app and a web app to choose what plays on each screen
- Scheduling of content

### Colour scheme (✅ decided 2026-10-01)
All restructured and newly built pages use the colour scheme of https://www.superhealth.co.in/ (taken from its stylesheets).

| Role | Colour(s) |
|------|-----------|
| Primary accent | Violet `#914BFA` |
| Primary accent (pair) | Deep indigo-blue `#1F30A0` |
| **Signature gradient** (main CTAs, highlights) | `linear-gradient(328deg, #1F30A0 19%, #914BFA 81%)` |
| Secondary accents | Indigo `#4B3FD0`, `#473FB6`; hover/alt purple `#793EF5`, `#9D50BB` |
| Lavender fade | `linear-gradient(180deg, #FFFFFF, #E9E8F6 28%, #473FB6)` |
| Tinted cards / pills | Pale lavender `#F6F1FF`, `#EEE5FF` |
| Page backgrounds (warm) | Cream `#F8F6F2`, `#F9F7F3`, `#FBFAF7`; beige fade `rgba(239,229,214,.88)` → `#FFF9F1` |
| Sand / taupe | `#F6F2EA`, `#F2EEE7`, `#BFB1A6` |
| Neutral backgrounds | `#FFFFFF`, `#F7F7F7`, `#F3F4F6` |
| Main text | `#191919` (also `#14140F`, `#111827`) |
| Secondary text | `#374151`, `#4B5563`, `#6B7280` |
| Borders / dividers | `#E5E7EB`, `#D1D5DB` |
| Success / positive | Green `#4CAF6E`, `#43A047`; mint background `#F3FFF8` |
| Ratings / highlight | Gold `#F5C542` |
| Soft tints | Pink `#FEE8EC`, peach `#FFE9E2`, `#FFF7F4` |

💡 Fonts on that site: Graphik (licensed) and Manrope. Manrope is free on Google Fonts; font choice not yet confirmed by owner.

💡 Implementation: add these as named colours in `frontend/tailwind.config.js` (e.g. `sb-violet`, `sb-indigo`, `sb-cream`, `sb-ink`) plus a `bg-sb-gradient` utility, so every new page draws from one source. The current site's yellow sections (`bg-yellow-400` / `bg-yellow-200` around IntegrationSection, FinalPoster, Footer) will need recolouring on restructured pages.

---

## 2. Site structure

- ✅ **Landing page (`/`) = the Screen Bazaar digital signage page.** There is no separate signage page.
- ✅ **Careers is scrapped.**
- ✅ Vital.AI, Molaris.AI, Saarthi and other products move under "Also from Connect Gen AI".
  - 💡 Keep their existing routes live so current customers and search rankings are not lost.
  - ✅ **Vital page (`/products/vital`) rebuilt 2026-10-01** in its own light clinical theme taken from the Vital logo (navy `#0B2B5C` → blue `#1D5FA8` → teal `#0FB2A4`, green `#3AA655`; Tailwind `vt-*` tokens, `bg-vt-gradient`), not the Screen Bazaar violet. Sections: hero (animated V·I·T·A·L orbit) → specialty ticker → interactive V·I·T·A·L workflow (5 animated scenes) → features bento (6 SVGs) → "Your evening, back" timeline + stats → specialties → compliance/testimonials → CTA → Vital footer. SVGs in `components/vital/art.jsx`, animations in `components/vital/vital.css`. Existing product claims (HIPAA/GDPR/SOC 2, Epic/Cerner, 99.2%, testimonials) were carried over unchanged and need owner verification.
  - ✅ **Molaris page (`/industry/dentalclinics`) rebuilt 2026-10-01** the same way, themed from the Molaris tooth logo (royal navy `#13307E` → `#2451C4` → cyan `#00B3C1`, warm coral `#FF7A8A` accent; Tailwind `mo-*`, `bg-mo-gradient`). Sections: hero (smiling tooth inside the animated 6-stage patient loop) → feature ticker → interactive patient-journey loop dial (6 animated scenes: discovery, WhatsApp booking, chairside consult, visit summary, after-care, reviews) → clinic-management dashboard → dental transcriber (FDI tooth chart → note) → comparison table → CTA → Molaris footer. SVGs in `components/molaris/art.jsx`, animations in `components/molaris/molaris.css` (reuses primitives from `vital/vital.css`). "Molars.AI" typos corrected. Claims carried over unchanged (200+ clinics, 40 min/day, 4.9★, 60% fewer no-shows, 3× visibility, 92% satisfaction, 2.4× retention) — owner to verify. Dropped the old "Learn more" link to `/products/digitaltco`.
  - ✅ **Nexus CRM page (`/products/nexus`) built new 2026-10-01** (no page existed; nav previously linked to Contact). Owner's positioning: interactions are the building block, AI saves them conversationally, leads/customers move through stages automatically, no manual logging. Theme: midnight indigo `#0F1024`/`#4338CA` → violet `#7C3AED`, "deal won" lime `#B5F23D` (Tailwind `nx-*`, `bg-nx-gradient`); node-"N" mark. Sections: hero (conversation → auto-logged → lead card moves) → ticker → the logging problem → anatomy of an interaction (dark) → "five conversations, zero updates" interactive timeline + pipeline (framer-motion shared layout) → 6 feature SVGs → CTA → Nexus footer. Files: `components/nexus/`, `pages/Products/NexusCRM.jsx`. All copy is Claude's from the owner's positioning — no stats/testimonials/integrations claimed; mock names are placeholders. ⏳ Owner to review copy; demo CTA goes to `/get-in-touch` (no trial URL known).
  - ✅ **Beauty Manager page (`/industry/salon`) rebuilt 2026-10-01** (was the old generic "AI for salons" template). Owner's lead USPs: WhatsApp automation, client records, invoice generation + sharing on WhatsApp, one-time setup cost, no maintenance; secondary USPs from the sales-chatbot prompt in `Industry.jsx`. Theme: plum `#4A1D3F` → berry → rose `#E05780`, gold `#C9A227` on nude (Tailwind `bp-*`, `bg-bp-gradient`); hand-mirror mark. Sections: hero (voice command → bill from appointment → paid → WhatsApp invoice) → ticker → 5 USP cards with SVGs → "a day at the salon" time ribbon (5 scenes) → Hinglish "ask your numbers" (example answers, labelled) → secondary features + trust strip → CTA → footer. Files: `components/beautypos/`, `pages/Industry/Salon.jsx`; SEO title updated. ⏳ No Beauty Manager plans on `/pricing`, so no pricing link.

### Top nav (✅)
| Item | Behaviour |
|------|-----------|
| **Connect** (logo) | Goes to the landing page (`/`) |
| **Screen Bazaar** | Goes to the landing page (`/`) |
| **Industries** (dropdown) | Replaced with digital-signage industries |
| **Pricing** | Goes to `/pricing` — page is being reworked (see §6) |
| **Also from Connect Gen AI** (dropdown) | Holds all the other products (Vital.AI, Molaris.AI, Saarthi, …) |

✅ Signage industries (from the Industries section, §4b): Retail · Restaurants & Cafés · Healthcare · Hospitality · Fitness & Wellness · Education · Automotive · Real Estate · Corporate & Offices.

✅ **Each industry has its own separate page.** The Industries dropdown links to these pages. Each page's hero uses the owner-supplied industry image (e.g. `retail hero image.png`, `healthcare hero image.png`).

✅ **Built 2026-10-01.** Nine pages at `/digital-signage/<slug>` (retail, restaurants, healthcare, hospitality, fitness, education, automotive, real-estate, corporate), one file each in `frontend/src/pages/signage/`. ✅ Owner rule: **every industry page is individually designed, not one shared template with swapped content.** Only the site chrome (`SignageChrome.jsx` = TopNav + FinalCTA + SBFooter) is shared; owner copy is read from `INDUSTRIES` in `content.js`. The old AI pages at `/industry/*` are untouched. Nav dropdown, footer and landing-page industry modals link to the new pages; all nine are in `sitemap.xml`.

| Page | Visual concept | Signature interaction |
|------|----------------|-----------------------|
| Retail | Shop window, swing tags, photo hero | Re-dress the window screen; publish weekend sale to 6 stores |
| Restaurants & Cafés | Chalk menu board, printed menu card | Drag a time-of-day slider; 11:30 flip clock |
| Healthcare | Calm mint, photo hero | Waiting-room screen playing the use cases as a playlist |
| Hospitality | Evening indigo + gold, key card | Guest's-day route: Lobby → Pool → Terrace → Restaurant → Corridor |
| Fitness & Wellness | Ink black, hazard stripes, caps | Tick-off workout "sets"; morning vs evening crowd switch |
| Education | Ruled notebook, cork board, pinned notices | Seminar moved → update 4 campus screens |
| Automotive | Dark showroom, spotlights, gauges, number plate | Model carousel on showroom screen |
| Real Estate | Blueprint grid, floor plan, site board | Tower availability lights up by unit type |
| Corporate & Offices | Clean product UI, Mon–Fri planner, ID badge | Move all-staff emails from inbox onto office screens |

Pages without a photo show an animated SVG scene in the hero; each file has a `HERO_IMAGE = null` constant to set when the photo (e.g. `industry-restaurants.webp`) arrives. Demo names/prices inside mockups (e.g. "Skyline Residences", "Aero S", store names) are placeholders.

**Artwork (built 2026-10-01, owner asked for SVGs + animation for a young, modern look):** each industry has its own asset file in `frontend/src/pages/signage/art/<industry>.jsx`: one animated scene, four floating stickers and five animated use-case icons (one per "What your screen can do" item). Shared helpers: `art/people.jsx` (scene frame, flat people, sparkles) and `art/signage.css` (animation keyframes; all motion stops under `prefers-reduced-motion`).

| Page | Scene | Stickers |
|------|-------|----------|
| Retail | High street, window screens cycling offers, shoppers walking past (in "Who you reach") | Price tag, bag, hanger, % burst |
| Restaurants & Cafés | Café counter, swinging lamps, steam, menu board breakfast → lunch → dinner (hero) | Coffee, croissant, clock, chef hat |
| Healthcare | Waiting room, seated patients, ticking clock, health-tip screen (in "Who you reach") | Heartbeat, pill, cross, stethoscope |
| Hospitality | Evening lobby, chandelier, guest walking in, receptionist waving (hero) | Bell, key, suitcase, star rating |
| Fitness & Wellness | Gym floor, treadmill runner, overhead press, class screen (hero) | Dumbbell, bolt, bottle, stopwatch |
| Education | Corridor, lockers, fluttering cork-board notes, paper plane (hero) | Pencil, book, grad cap, atom |
| Automotive | Showroom, spotlights, car on turntable with spinning wheels (hero); model carousel moved to service-lounge section | Steering wheel, tyre, key fob, spanner |
| Real Estate | Sales office, twinkling skyline, swinging crane, tower drawing itself (hero) | House, crane, SOLD sign, pin |
| Corporate & Offices | Reception, visitor walking in, growing chart bars (hero) + reception ticker | Mug, chart, sticky note, chat |

All nine pages were checked at 375px (phone) and 1280px (desktop) in headless Edge: no horizontal overflow.

Original suggestion (superseded by the above): `/industry/restaurant` etc. rewritten for signage, so each can rank in Google searches such as "digital signage for restaurants". Build them on the existing `IndustryHero` / `IndustryProblems` / `IndustrySolution` / `IndustryOutcomes` / `IndustryFAQ` pattern driven by `IndustryConfig.js`. Example angles:
- Restaurants: menu boards that change by time of day
- Salons: service menus and offers
- Clinics: waiting-room screens, token/queue displays
- Retail: prices and promotions across branches
- Education: notice boards
- Offices: internal communications

---

## 3. Landing page — section order

💡 Proposed order (not yet confirmed):
1. **Hero** — ✅ copy and image decided (see below)
2. **Pain vs. gain** — printed posters (cost, delay, fading, missed offers) vs. a digital screen (instant, eye-catching, scheduled)
3. **Everything included, in 3 steps** — we install the screen → you pick content in the app → it plays on schedule
4. **Features: "Screens, put to work."** — ✅ fully specified in §4
5. **Control from anywhere** — mobile and web app screenshots
6. **Industries** — ✅ fully specified in §4b (9 industry cards + modals)
7. **Savings calculator** — monthly print spend × branches → yearly savings; doubles as a lead form
8. **Hardware** — screen sizes, mounting, what's in the box
9. **Proof** — installation photos, client logos, testimonials
10. **Pricing teaser**
11. **FAQ** — internet down? use my existing TV? how many screens? who installs?
12. **Final call to action + footer**

### Hero (✅ decided)
- **Eyebrow:** THE HOME OF BUSINESS SCREENS
- **Headline:** Your business needs a screen.
- **Subhead:** Get one. Connect it. Put it to work.
- **Button:** `Get Started →` — links to the Contact Us page (currently `/get-in-touch`).
- **Image:** ✅ `frontend/media/hero image.png` — two young women smiling and pointing at a portrait menu screen ("Good Food Good Mood", 20% off bowls, ₹99 smoothie). 1536×1024, transparent background.

### Owner-supplied images (`frontend/media/`, all transparent PNGs, 1536×1024, ~2 MB each)
| File | Shows | Use |
|------|-------|-----|
| `hero image.png` | Two women pointing at a café/restaurant menu screen | ✅ Landing page hero |
| `retail hero image.png` | Two women with shopping bags pointing at a fashion screen ("Just Dropped — up to 40% off"); soft warm glow behind them | ✅ Hero of the Retail industry page |
| `healthcare hero image.png` | Older couple pointing at a hospital wayfinding screen ("City Care Hospital — Welcome"); soft glow behind them | ✅ Hero of the Healthcare industry page |

Owner: "These are all transparent background pngs and can be used in a very creative way."

💡 Creative uses (not yet confirmed):
- **Live screen in the hero:** lay our own animated screen exactly over the screen in the photo and cycle content (menu → offer → event), so the hero itself demonstrates "change what's playing". The people keep pointing at whatever is showing.
- **People break out of the frame:** place the cut-out on a violet→indigo gradient shape or cream card, with heads and pointing arms overlapping its edge for depth.
- **Parallax:** people and screen as separate layers moving slightly on scroll/mouse move (would need the owner to supply them as separate layers, or approximate with one image + an overlaid screen).
- **Industry page heroes:** the industry cut-outs over the brand gradient glow, same treatment as the landing hero so the pages feel like one family.

✅ **Images vs SVGs:** photos are used only on the landing hero and the separate industry pages. The **Industries and Features sections on the landing page use SVG illustrations only.**
- The retail and healthcare images have a baked-in semi-transparent glow; check how it looks on the cream background before shipping.

Build notes:
- Rename without spaces (e.g. `hero.png`, `industry-retail.png`, `industry-healthcare.png`) and convert to WebP (keeping transparency) to cut ~2 MB each to a few hundred KB; serve from `frontend/public/` or import from `src/assets/`.
- Provide `alt` text describing each scene.

💡 Where the slogan "Connect your screens to opportunity." appears (under the logo, in the footer, or elsewhere) is not yet decided.

Superseded: Claude's earlier hero options ("Turn every screen into your best salesperson.", "Get noticed. Sell more. Stop printing posters.", "Your offers, impossible to miss.", "Change your shop's advertising in 10 seconds, not 10 days."), the world-map hero visual idea, the current hero copy ("Meet Your Business Partner"), and Claude's first draft ("Every screen in your business, running itself").

---

## 4. Features section (✅ decided)

### Heading
**Screens, put to work.**
Control what they show. Decide when they show it. Make them count.

### Layout
- 3 chapters × 3 outcomes (not 9 random features).
- Desktop: each chapter is a heading followed by a row of **3 tall cards**; the SVG takes the top two-thirds of each card.
- Mobile: cards stack.
- Each card contains: feature number, short headline, one supporting line, a bespoke SVG illustration.

### Interaction
- The **SVG is the hero** of each card. It tells the feature's story; it is not decoration.
- **Hover:** the SVG animates and transforms into a large **"?"**, with the label **"Click to know more"** (same label on all nine cards).
- **Click:** opens a modal with the fuller story (copy below).

---

### CHAPTER 01 — CONTROL
**Take control of every screen.**
*(Establishes the immediate operational value.)*

#### 01 — Stop walking up to the screen
**Change what's playing without being there.**

- **SVG:** a person holding a phone → cloud/control centre → multiple screens changing simultaneously.
- **Hover:** the phone and screens animate toward the centre and become a large ?

**Modal**

> **Change what's playing without being there.**
>
> You shouldn't need to carry a USB drive, visit every branch or ask someone on-site to change what's playing.
>
> With Screen Bazaar, you can:
> - Update a single screen remotely
> - Update multiple screens at once
> - Manage screens across different locations
> - Publish content instantly
> - Control everything from your phone or laptop
>
> **Imagine:**
> Your restaurant has five branches. At 11:30 AM, the lunch menu changes.
> Select all five branches → publish the new menu → done.
> No travel. No USB drives. No calling staff.
>
> **Select → Publish → Done.**

#### 02 — Manage 100 screens like one
**One update. Every location.**

- **SVG:** one central control point branching into 9/12/16 screens, all receiving the same update.
- **Hover:** all screen icons collapse into one large ?

**Modal**

> **One update. Every location.**
>
> Managing multiple screens shouldn't mean managing each screen individually.
>
> Screen Bazaar lets you organize your entire network by:
> - Business location
> - Branch
> - Screen
> - Screen group
> - Campaign
>
> Then publish an update across the entire group with one action.
>
> **Imagine:**
> Your retail business has 25 stores and 75 screens.
> A new promotion launches tomorrow.
> Instead of updating 75 screens individually:
> Select All Stores → Publish → Done.
>
> **Your entire network changes together.**

#### 03 — Know when something goes wrong
**Stop discovering a broken screen from your customers.**

- **SVG:** a network of screens, one turning red → a notification appearing on a phone.
- **Hover:** the red alert pulses and transforms into ?

**Modal**

> **Know when something goes wrong.**
>
> A screen that's offline shouldn't become a problem you discover hours later.
>
> Screen Bazaar keeps an eye on your screen network and lets you know when something needs attention.
>
> You can see:
> - Which screens are online
> - Which screens are offline
> - When a screen last connected
> - What content is currently playing
> - Which location needs attention
>
> Where supported by the screen player, you can also take action remotely.
>
> Instead of asking:
> *"Why isn't the advertisement showing?"*
>
> You already know:
> **Andheri Store — Screen Offline**

---

### CHAPTER 02 — MAKE YOUR SCREEN WORK
**Don't let your screen sit idle.**
*(Where Screen Bazaar starts becoming more than signage software.)*

#### 04 — Turn one screen into many advertising opportunities
**One screen. Multiple messages.**

- **SVG:** one physical screen divided into a timeline 10 AM → 12 PM → 2 PM → 5 PM → 8 PM, with a different creative in each slot.
- **Hover:** the timeline folds into a ?

**Modal**

> **One screen. Multiple messages.**
>
> Your screen doesn't have to show the same thing all day.
>
> Screen Bazaar lets you divide your screen time into programmable slots.
>
> For example:
>
> | Time | Content |
> |------|---------|
> | 10 AM | Your business |
> | 12 PM | Lunch promotion |
> | 2 PM | Partner advertisement |
> | 5 PM | Evening offer |
> | 8 PM | Third-party campaign |
>
> You decide what your screen displays and when.
>
> **Your screen becomes programmable advertising real estate.**

#### 05 — Make your screens earn money
**Your screen doesn't have to sit idle.**

- **SVG:** a screen showing an advertisement → coins/₹ flowing from the screen into a business wallet.
- **Hover:** the ₹/coins disappear and become a ?

**Modal**

> **Make your screens earn money.**
>
> Your screen already occupies valuable space in your business.
>
> Why should every minute of that space belong to your own content?
>
> With Screen Bazaar, you can potentially make unused screen inventory available for advertising.
>
> You can decide:
> - When your own content plays
> - When advertising can appear
> - Which screens participate
> - How much inventory you make available
> - Which campaigns run on your screens
>
> The idea is simple:
> Your screen becomes an asset that can generate revenue.
>
> A café, clinic, salon, gym or retail store can turn unused screen time into an additional revenue opportunity.
>
> **Your screen works for your business — even when you're not advertising yourself.**

#### 06 — Change your message depending on the moment
**The right message. At the right time.**

- **SVG:** one screen changing through morning → afternoon → evening → weekend.
- **Hover:** the sun/time elements rotate and resolve into ?

**Modal**

> **The right message. At the right time.**
>
> Your customers don't need to see the same message all day.
>
> Create your content once and let Screen Bazaar decide when it appears.
>
> For example, a restaurant can automatically show:
>
> | When | Content |
> |------|---------|
> | Morning | Breakfast ₹199 |
> | Afternoon | Lunch Thali ₹249 |
> | Evening | Family Dinner |
> | Weekend | Live Music Tonight |
>
> You can schedule content by:
> - Time
> - Date
> - Day
> - Location
> - Screen
> - Campaign
>
> **Create once. Schedule once. Let your screens do the rest.**

---

### CHAPTER 03 — BUILD THE NETWORK
**Turn individual screens into an advertising network.**
*(Explains the bigger Screen Bazaar ecosystem.)*

#### 07 — Reach customers where they already are
**Don't just advertise online. Be there physically.**

- **SVG:** advertiser on one side → map/location pins → real-world venues → screens displaying the advertisement.
- **Hover:** the location pins converge into ?

**Modal**

> **Reach customers where they already are.**
>
> Digital advertising can reach someone on a phone.
>
> Screen Bazaar brings advertising into the physical places people already visit.
>
> Advertisers can potentially choose:
> - Location
> - Area
> - Venue type
> - Screen
> - Campaign period
> - Time of day
>
> **Imagine:**
> A dental clinic wants to reach people around Mumbai.
> Instead of simply targeting an online audience, it can potentially place its campaign on screens inside relevant physical venues.
>
> **Location → Venue → Screen → Time**
>
> The advertisement becomes part of the environment.

#### 08 — Give every location its own voice
**One business. Different messages everywhere.**

- **SVG:** a central brand logo/control centre branching to Mumbai, Pune and Delhi screens, each showing different content.
- **Hover:** the three locations converge into ?

**Modal**

> **One business. Different messages everywhere.**
>
> Your brand may be the same everywhere.
> Your customers aren't.
>
> Screen Bazaar lets you manage a central network while giving individual locations the freedom to display what matters locally.
>
> For example:
>
> | Location | Content |
> |----------|---------|
> | Mumbai | Mumbai-specific promotion |
> | Pune | Pune-specific promotion |
> | Delhi | Delhi-specific promotion |
>
> Head office can control the network while locations can have their own content.
>
> **One platform. Every location. Its own message.**

#### 09 — Give advertisers proof that their money was spent
**Know where every campaign played.**

- **SVG:** a vertical flow:
  Campaign ↓ 40 Screens ↓ 12 Locations ↓ 18,400 Scheduled Plays ↓ 18,120 Completed Plays ↓ Report
- **Hover:** the analytics collapse into ?

**Modal**

> **Know where every campaign played.**
>
> When an advertiser pays for screen advertising, they need more than:
> *"Trust us. Your ad ran."*
>
> Screen Bazaar can provide campaign delivery information showing where and when the campaign was scheduled and played.
>
> Advertisers can see:
> - Campaign duration
> - Participating screens
> - Locations
> - Scheduled plays
> - Completed plays
> - Campaign delivery reports
>
> And receive a **Proof of Play** report.
>
> **Campaign → Distribution → Playback → Report**
>
> Every campaign has a record.

---

## 4b. Industries section (✅ decided 2026-10-01)

### Heading (✅)
**People are already looking. What are you showing them?**
Whatever your business, turn that attention into communication, promotion and opportunity.

### Purpose
- Principle: don't overload the industry cards.
- The section answers: **"What could Screen Bazaar do for a business like mine?"**
- The card sells the idea; the modal carries the industry-specific depth.
- **Distinction from Features:** Features cards explain *what Screen Bazaar does* ("Change what's playing without being there."). Industries cards show *what Screen Bazaar means for that particular business* ("Make every screen part of your store."). "That distinction will stop the two sections from feeling repetitive even though they use the same SVG → question mark → modal interaction." (owner's words)

### Card structure (as clean as the Features cards)
Each card contains only:
1. **Industry label**, e.g. `01 · RETAIL` — shown as a large gold pill (number chip + name) on the illustration's top-left, which stays visible during the hover morph (owner asked for bigger, more highlighted names, 2026-10-01)
2. **Short headline**, e.g. *Make your store impossible to ignore.*
3. **One-line detail**, e.g. *Turn screens into a constantly changing storefront for promotions, products and offers.*
4. **SVG illustration**
5. **Hover → ?** (label "Click to know more", same as Features)
6. **Click → industry modal**

💡 Layout: same as Features — 3 × 3 grid of tall cards on desktop, stacked on mobile.

✅ **Card text source:** for every industry, the card's headline is the industry's one-liner (its headline) and the card's description is the explanation paragraph under it. Example — Healthcare card: *Make the waiting room work for you.* / *A screen can do more than fill silence. It can inform patients, explain services and communicate what's happening around them.* Retail is the one exception: its card uses its own lines ("Make your store impossible to ignore." / "Turn screens into a constantly changing storefront for promotions, products and offers.").

### Modal structure (same rhythm for all 9)
1. **Industry headline** — a strong, industry-specific statement
2. **Short explanation** — 2–3 sentences on why screens matter in that environment
3. **WHAT YOUR SCREEN CAN DO** — 4–5 industry-specific use cases
4. **IMAGINE THIS** — one relatable scenario showing Screen Bazaar in action
5. **WHO YOU REACH** — the people actually viewing the screen

### The 9 industries — modal copy (owner's copy, use as written)

#### 01 · RETAIL
Card headline: **Make your store impossible to ignore.**
Card detail: Turn screens into a constantly changing storefront for promotions, products and offers.

> **Make every screen part of your store.**
>
> Your customers are already looking around. Use your screens to show them what they should see next.
>
> **WHAT YOUR SCREEN CAN DO**
> - Showcase new products
> - Promote limited-time offers
> - Highlight products customers may have missed
> - Display seasonal campaigns
> - Run partner advertisements
>
> **IMAGINE THIS**
> Your weekend sale starts tomorrow.
> Update every store's screens from one place and have the new promotion playing before the doors open.
>
> **WHO YOU REACH**
> Shoppers

#### 02 · RESTAURANTS & CAFÉS
Card: headline = the modal headline below; description = the explanation paragraph below.

> **Keep your menu moving with the moment.**
>
> Breakfast, lunch, dinner, offers and events don't need the same screen all day.
>
> **WHAT YOUR SCREEN CAN DO**
> - Promote today's specials
> - Change content by time of day
> - Showcase new dishes
> - Promote events and offers
> - Run partner advertisements
>
> **IMAGINE THIS**
> At 11:30 AM, your breakfast promotion disappears and your lunch menu takes over — automatically.
>
> **WHO YOU REACH**
> Diners

#### 03 · HEALTHCARE
Card: headline = the modal headline below; description = the explanation paragraph below.

> **Make the waiting room work for you.**
>
> A screen can do more than fill silence. It can inform patients, explain services and communicate what's happening around them.
>
> **WHAT YOUR SCREEN CAN DO**
> - Display health information
> - Explain treatments and services
> - Promote departments and facilities
> - Communicate announcements
> - Run relevant partner advertisements
>
> **IMAGINE THIS**
> While patients wait for their appointment, your screen explains a service you offer — something your receptionist didn't have to explain again.
>
> **WHO YOU REACH**
> Patients & attendants

#### 04 · HOSPITALITY
Card: headline = the modal headline below; description = the explanation paragraph below.

> **Give every guest a better welcome.**
>
> From the lobby to the room, screens can help guests know what's happening and what's available.
>
> **WHAT YOUR SCREEN CAN DO**
> - Welcome guests
> - Promote hotel facilities
> - Display events and activities
> - Showcase dining offers
> - Provide directions and information
>
> **IMAGINE THIS**
> A guest walks into the lobby and immediately sees today's restaurant special, pool timings and evening event.
>
> **WHO YOU REACH**
> Guests

#### 05 · FITNESS & WELLNESS
Card: headline = the modal headline below; description = the explanation paragraph below.

> **Keep your members engaged beyond the workout.**
>
> Your screens can motivate, inform and promote what your facility has to offer.
>
> **WHAT YOUR SCREEN CAN DO**
> - Display class schedules
> - Promote memberships
> - Share fitness content
> - Highlight trainers and programs
> - Promote partner brands
>
> **IMAGINE THIS**
> The evening crowd walks in and the screen automatically switches to the night's class schedule and membership offer.
>
> **WHO YOU REACH**
> Members & visitors

#### 06 · EDUCATION
Card: headline = the modal headline below; description = the explanation paragraph below.

> **Turn every campus screen into a communication channel.**
>
> Important information shouldn't depend on someone noticing a noticeboard.
>
> **WHAT YOUR SCREEN CAN DO**
> - Announce events
> - Display schedules
> - Share important notices
> - Promote activities
> - Communicate campus information
>
> **IMAGINE THIS**
> A seminar schedule changes at the last minute. Update the screens across campus without printing a single notice.
>
> **WHO YOU REACH**
> Students, parents & staff

#### 07 · AUTOMOTIVE
Card: headline = the modal headline below; description = the explanation paragraph below.

> **Put your vehicles and services in the spotlight.**
>
> Whether customers are browsing a showroom or waiting for their car, your screens can keep them informed and engaged.
>
> **WHAT YOUR SCREEN CAN DO**
> - Showcase vehicles
> - Highlight offers
> - Promote accessories
> - Explain services
> - Entertain customers while they wait
>
> **IMAGINE THIS**
> A customer waiting for a service sees a new model and its features on the screen beside them.
>
> **WHO YOU REACH**
> Customers & prospects

#### 08 · REAL ESTATE
Card: headline = the modal headline below; description = the explanation paragraph below.

> **Let your properties sell themselves.**
>
> Your screens can bring projects, properties and possibilities to life while prospects are already in your space.
>
> **WHAT YOUR SCREEN CAN DO**
> - Showcase properties
> - Display project walkthroughs
> - Promote new launches
> - Highlight amenities
> - Display offers and availability
>
> **IMAGINE THIS**
> A prospect walks into your sales office and sees your latest project, amenities and available units playing across the screen.
>
> **WHO YOU REACH**
> Buyers & investors

#### 09 · CORPORATE & OFFICES
Card: headline = the modal headline below; description = the explanation paragraph below.

> **Keep your workplace in the loop.**
>
> From reception to the cafeteria, screens can keep employees and visitors informed without filling inboxes.
>
> **WHAT YOUR SCREEN CAN DO**
> - Share company announcements
> - Display events
> - Welcome visitors
> - Show internal communications
> - Display dashboards and updates
>
> **IMAGINE THIS**
> It's Monday morning. Employees walk in to see this week's announcements, events and important updates already playing.
>
> **WHO YOU REACH**
> Employees & visitors

### Still to settle
- ⏳ SVG concept for each industry card (Claude to propose unless owner specifies).

---

## 4c. Testimonials section (✅ built 2026-10-01)

Sits directly after Industries on the landing page. Component: `frontend/src/components/screenbazaar/TestimonialsSection.jsx`; copy in `content.js` → `TESTIMONIALS` (owner's text, verbatim); scenes in `illustrations/testimonials.jsx`.

- Heading (Claude's): eyebrow "FROM BUSINESSES LIKE YOURS" / "Don’t take our word for it. Take theirs." / "A store owner, an office manager and a café founder on what changed once their screens were connected."
- Three cards: Rajesh Sharma (Aura Fashion Retail), Priya Kulkarni (Nexus Tech Solutions), Rohan Verma (Urban Brew & Bites). Pull quote with marker highlight, full quote, two stat chips, name/role/company.
- Portraits: `frontend/media/* profile.png` cropped to 480×480 square WebP (transparent) → `public/screen-bazaar/testimonial-<slug>.webp` (~30 KB each). Shown large (~176 px) as a cut-out standing on a gradient arch in the card's bottom-right corner, beside the name (owner asked for bigger portraits).
- Each card has an animated SVG scene that **loops automatically** between Before (4 s) and Now (7.5 s) while on screen, with a thin progress bar showing the next flip. The Before / Now toggle lets a visitor pick a side; that holds for 12 s, then the loop resumes. Reduced-motion visitors see Now, no loop. Cards tilt toward the mouse; the portrait pops on hover.
  - Retail: pen drive hopping between screens + reprinted standee → phone publishes to Thane / Dadar / Branch 3 at once (Monsoon → Festive → Weekend).
  - Corporate: dark screens, someone climbing floors, "Calling IT…" → HR laptop lights all 4 floors, 10-min stopwatch.
  - Café: chalkboard + long queue → menu board flips Breakfast → Lunch combos as the clock reaches 11:30, drink-video screen, shorter queue.
- Menu items/prices inside the café scene (₹149 omelette, ₹249 combo etc.) are placeholders.

---

## 4d. Blogs (⏳ in progress)

Six digital-signage blogs, a Blogs section after Testimonials on the landing page, and a **Blogs** nav item. Full plan, blog texts and per-blog status: **`BLOGS_PLAN.md`**.

✅ Product facts confirmed by the owner while reviewing the blogs (2026-10-01), valid site-wide:
- No-AI rule stands.
- Real features: **split-screen layouts**, **role-based access** (different access per team), **14-day free trial**, **support, warranty and maintenance**.
- Screens: Screen Bazaar **supplies them, or the customer brings their own compatible display** (both).
- Not confirmed (don't claim): offline caching/sync, RSS/news/weather feeds, template library, multi-language, storage/temperature monitoring, remote screenshots/reboots/updates, named player platforms, TLS, OTP pairing.

---

## 5. Assets needed from the owner (⏳)

Most important first: **#1, #2, #3, #10**. Placeholders will be used until assets arrive.

| # | Asset | Where it goes | Format |
|---|-------|---------------|--------|
| 1 | 10–20 s video of a screen playing content inside a real business, from the customer's view | Hero background | MP4, landscape, 1080p+, no audio needed |
| 2 | Installation photos, 2–3 per business type | Uses by business type, Proof | JPG, landscape, well lit, screen switched on |
| 3 | App screenshots — upload, schedule, screen list, preview (mobile and web) | Control from anywhere | PNG, full resolution, realistic data, no personal info |
| 4 | Hardware photos — screen front, side/mount, player box, full kit | Hardware | PNG, clean or transparent background |
| 5 | Sample content as it plays on screen — menu board, offer, announcement, portrait poster | Hero mockup, Uses by business type | 16:9 and 9:16 images or short MP4s |
| 6 | Before/after pair — old printed poster, then the same spot with a screen | Pain vs. gain | 2 JPGs, same angle |
| 7 | Client logos (with permission) | Proof | SVG or transparent PNG |
| 8 | ✅ 3 testimonials with photos — supplied 2026-10-01 (§4c) | Proof | Text + PNG |
| 9 | Real numbers — screens installed, cities, clients, typical print savings | Numbers strip, calculator defaults | Figures |
| 10 | Pricing — plans, per-screen cost, hardware bought or rented | Pricing teaser, Pricing page | Text |

The nine feature SVGs are built by Claude in code; no assets needed for those.

---

## 6. Pricing page (✅ built 2026-10-01)

✅ Owner's brief: remodel in the style of the product pages (Vital, Saarthi); digital signage pricing in the spotlight.

✅ Owner's pricing facts (use as written, never invent figures):
- Get in touch for digital signage pricing as per your requirements.
- Pricing cannot be uniform (everyone has separate requirements) but will be **apt and transparent** regardless.
- **Starts from ₹15,000 one-time**, directly followed by **"Includes the display screen"**.
- **Annual maintenance charges as and when applicable.**
- **12-month warranty** on the products.
- Pricing is one-time and transparent, so customers can be carefree about it.
- Price varies with: the **kind of screen** (if buying the screen too), the **number of screens**, the **size of the project**.

Built: `frontend/src/pages/Pricing.jsx` (wrapped in `SignageChrome`), `components/pricing/art.jsx`, `pricing.css`, `OtherProductsPricing.jsx`. Sections: hero ("Priced to your requirement." + swinging ₹15,000 price tag) → ticker → "Shape your quote" (3 factor cards + live SVG of shops and screens; CTA prefills `/get-in-touch` via `?screens=&message=`) → pricing promise (One-time / Transparent / 12-month warranty / Carefree) → pricing FAQ (includes the 14-day free trial) → Vital AI & Molaris AI plans (old tabs, moved under "Also from Connect Gen AI") → closing CTA → footer. SEO title "Digital Signage Pricing — Screen Bazaar".
- 💡 Claude's, needs owner review: headline wording; screen-kind options (Compact / Standard / Large / Help me choose) and their hints; location options (One / A few / Many).

---

## 7. Implementation notes (codebase)

Files that will change:

| Area | File(s) | Change |
|------|---------|--------|
| Landing page | `frontend/src/pages/LandingPage.jsx` | Rebuild as the Screen Bazaar page (sections in §3) |
| Hero | `frontend/src/components/GSAPWorldMap.jsx` | Replace current hero ("Meet Your Business Partner") or swap for a new Screen Bazaar hero component |
| Products block | `frontend/src/components/HomeProducts.jsx` | Remove from landing; Vital/Molaris move to "Also from Connect Gen AI" |
| Features | new component(s), e.g. `frontend/src/components/screenbazaar/` | 9 cards, 9 SVGs, hover → ?, modal |
| Top nav | `frontend/src/components/TopNav.jsx` | New items per §2; `industries` list replaced; `Products` → "Also from Connect Gen AI"; remove Careers |
| Old nav | `frontend/src/components/Navigation.jsx` | Remove Careers link (or retire component if unused) |
| Routes | `frontend/src/App.jsx` | Remove `/careers`; update home SEO title/description to Screen Bazaar; update Pricing SEO ("Vital AI & Molaris AI Plans") |
| Industry pages | `frontend/src/components/IndustryConfig.js`, `frontend/src/pages/Industry/*` | Signage versions for the new Industries dropdown |
| Leftover page | `frontend/src/pages/Products/DigitalTCO.jsx` | Contains copied dental content — repoint or remove |
| Careers page | `frontend/src/pages/Careers.jsx` | Delete |
| Logo | `frontend/public/` | New Screen Bazaar logo (SVG) + favicon |
| Leads | forms → `POST /api/leads` | Use `source: "screen-bazaar"` to track signage leads |

💡 Also check `Footer.jsx`, `FinalPoster.jsx`, `FAQ.jsx`, `Numbers.2.jsx`, `BrandsSection.jsx`, `IntegrationSection.jsx` and SEO/sitemap files for AI, Vital/Molaris or Careers wording.

---

## 8. Decision log (this session)

| # | Owner said | Result |
|---|-----------|--------|
| 1 | Move focus from Vital.AI / Molaris.AI to digital signage; asked for name, hero, landing structure, signage page ideas | Claude found no signage page existed (`DigitalTCO.jsx` holds dental content) and proposed names, hero, structure |
| 2 | Drop AI altogether; hero must present value immediately; landing is all signage, presence, marketing, ROI | AI removed from pitch and naming; new value-first hero options; asset list drafted |
| 3 | Product = hardware + mobile/web app + scheduling; no AI features; owner will supply assets | Recorded in §1 and §5 |
| 4 | Name **Screen Bazaar**, slogan **Connect your screens to opportunity.**; logo needed; nav = Connect logo, Screen Bazaar, Industries (signage), Pricing (rework), Also from Connect Gen AI; careers scrapped | Recorded in §1–§2 |
| 5 | Features section spec: 3 × 3 cards, SVG as hero, hover → ?, click → modal; full copy for all 9 | Recorded in §4 |
| 6 | Heading "Screens, put to work." + "Control what they show. Decide when they show it. Make them count."; hover label "Click to know more"; 3-tall-cards-per-chapter layout approved; Screen Bazaar nav item → landing page | Recorded in §2 and §4 |
| 7 | Save everything in a plan file | This file |
| 8 | Use the exact colour scheme of superhealth.co.in for the pages being restructured and built | Recorded in §1 (Colour scheme) |
| 9 | Hero: eyebrow "THE HOME OF BUSINESS SCREENS", headline "Your business needs a screen.", subhead "Get one. Connect it. Put it to work.", button "Get Started →" to Contact Us; hero PNG coming in `media/` | Recorded in §3 (Hero) |
| 10 | Industries section: 9 industry cards (label, headline, one line, SVG, hover → ?, click → modal); modal rhythm Headline / Explanation / WHAT YOUR SCREEN CAN DO / IMAGINE THIS / WHO YOU REACH; full copy for all 9 | Recorded in §4b |
| 11 | Industries heading: "People are already looking. What are you showing them?" / "Whatever your business, turn that attention into communication, promotion and opportunity." (industry copy resent in full; unchanged) | Recorded in §4b (Heading) |
| 12 | Every industry already has its card text: one-liner = headline, description = explanation paragraph (e.g. Healthcare) | Recorded in §4b (Card text source) |
| 13 | Added `frontend/media/`: `hero image.png` is the landing hero; retail and healthcare images also supplied; all transparent PNGs to be used creatively | Recorded in §3 (Owner-supplied images) |
| 14 | Retail and healthcare images are for each industry's separate page; SVGs (not photos) are used in the Industries and Features sections | Recorded in §2 and §3 |
| 15 | Build a separate page per industry; each page must be distinct, not one reused component with changing content | Nine bespoke pages built; see §2 |
| 16 | Three testimonials (retail owner, corporate workplace manager, café owner) with photos in `media/`; place after Industries; animated, interactive SVGs on the cards | Built; see §4c |
| 17 | Testimonials: move profile pictures so they can be bigger; transition between Before and Now automatically | Large cut-out portraits beside the name; continuous Before ⇄ Now loop; see §4c |
| 18 | Redesign Contact Us (`/get-in-touch`) in the landing page's style, with SVGs + animations; correct form fields; check Mongo, routes, nodemailer | Built: hero + form, phone→screen SVG scene, 4 channel cards, "What happens next". Fields: name*, phone*, business, email, city, industry, screen count, message (+ honeypot). Lead model + email updated to match. SMTP credentials currently rejected by Gmail — app password must be regenerated |

### Rejected / superseded ideas
- Names Drishti, Darpan, Kanvas.AI, Connect Screens → replaced by **Screen Bazaar**.
- Any AI features (AI content generation, AI design) → product has **no AI**.
- A separate `/digital-signage` product page → the **landing page is** the signage page.
- Vital/Molaris strip on the landing page → they live in the **"Also from Connect Gen AI"** nav dropdown instead.
- Alternative feature headings ("What can your screens do for you?", "Your screens can do more.") and hover labels ("How does it work?", "What does this mean?", "Know more →") → replaced by the decided versions in §4.

### Unconfirmed earlier suggestions (only use if owner approves)
- Integrations: Saarthi POS price sync, Google Sheets, YouTube, Instagram feed, Google Reviews wall.
- QR code on screens that opens a WhatsApp chat for lead capture.
- Template gallery by business type with full-screen preview.
- Plans for "Use your own TV" vs "We supply the kit".

---

## 9. Open items

- ⏳ Hero images for the other 7 industry pages (Restaurants & Cafés, Hospitality, Fitness & Wellness, Education, Automotive, Real Estate, Corporate & Offices) — drop into `frontend/public/screen-bazaar/` as WebP and set `HERO_IMAGE` in that page's file
- ⏳ Owner review of the nine industry pages (built from the §4b copy; short connective headings such as "One screen. The whole day." are Claude's)
- ⏳ Whether the old AI `/industry/*` pages should be retired or redirected
- ⏳ Where the slogan appears
- ⏳ Industries: SVG concepts (§4b)
- ⏳ Landing section order (§3) — proposed, not confirmed
- ⏳ Signage industries list for the dropdown (§2)
- ⏳ Owner review of the rebuilt Pricing page (§6)
- ⏳ Assets (§5)
- ⏳ Logo concepts for owner review (§1)
- ⏳ Which, if any, of the unconfirmed suggestions in §8 to keep
- ⏳ Go-ahead to start building
