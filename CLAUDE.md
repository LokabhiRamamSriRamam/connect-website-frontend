# CLAUDE.md — Screen Bazaar (Connect Gen AI Website)

> ⚠️ **Much of this file predates the Screen Bazaar pivot and is stale.** The
> sections below marked ⚠️ describe the old AI-chatbot site. **`SCREEN_BAZAAR_PLAN.md`
> is the source of truth** for the site as it is now; `BLOGS_PLAN.md` for the blogs.
> Verify anything here against the code before relying on it.

## Project Overview

Marketing and lead-generation website for **Screen Bazaar** — a **digital signage**
business (hardware + a web/mobile app for scheduling content to screens). Slogan:
*Connect your screens to opportunity.*

**The no-AI rule:** the signage product has **no AI features** and must never be
pitched as having any. Connect Gen AI remains the parent company, and its other
products (Vital AI, Molaris AI, Saarthi, Nexus) live under an "Also from Connect
Gen AI" nav dropdown — but the signage pitch stays AI-free.

Careers has been scrapped as a site section.

### What exists now (not reflected in the stale sections below)

| Area | Location |
|------|----------|
| Landing page (the signage page) | `frontend/src/pages/LandingPage.jsx` |
| Screen Bazaar components | `frontend/src/components/screenbazaar/` (Hero, Features, Industries, Testimonials, Blogs, FinalCTA, SBFooter, `content.js`, `illustrations/`) |
| 9 bespoke signage industry pages | `frontend/src/pages/signage/` — Retail, Restaurants, Healthcare, Hospitality, Fitness, Education, Automotive, RealEstate, Corporate (+ `SignageChrome.jsx`, `art/`) |
| Blogs | `frontend/src/pages/blog/`, prerendered by `scripts/prerender-blogs.mjs` |
| **Test drive** (interactive demo) | `frontend/src/pages/test-drive/` — see the section below |
| Other products | `frontend/src/pages/Products/`, `/saarthi*` pages |

> Each signage industry page is **bespoke**, not one shared template with swapped
> content. Do not refactor them into a common component.

The old AI-era `/industry/*` pages (Salon, Dentist, Ecommerce, Finance…) still
exist and are listed in the stale section below; whether to retire or redirect
them is an open item in the plan.

---

## Test drive (`/test-drive`)

An interactive demo where the visitor operates the product: five virtual screens,
a content library, a schedule, active hours, role mirroring, a simulated clock.
Lives in `frontend/src/pages/test-drive/`. Full spec: **`SCREEN_BAZAAR_PLAN.md` §4e**.

### Creative libraries — the rules

Each industry has **8 creatives**: bespoke inline-SVG components, never one
template recoloured. All 10 industries built: `restaurant` (`r_`), `cafe` (`c_`),
`retail` (`rt_`), `healthcare` (`h_`), `hospitality` (`ho_`),
`realestate` (`re_`), `corporate` (`co_`), `fitness` (`f_`),
`education` (`e_`), `automotive` (`au_`).

**Safety is by construction, and must stay that way:**

- Visitor text reaches the DOM **only** as a JSX text child of `<text>`, via
  `CText` in `creatives/kit.jsx`. No token replacement (`svg.replace("{{x}}", …)`),
  no `dangerouslySetInnerHTML`, no concatenation into attributes, no SVG parsing.
- `CreativeFrame.jsx` is the **only** renderer. It allowlists fields against the
  manifest and `String()`-coerces them, and it owns the `<svg>` and viewBox —
  creatives never render their own.
- Only **eight** SVG elements may appear in output: `svg, g, rect, circle,
  ellipse, path, text, tspan`. `check-creative-safety.mjs` fails on anything
  else. Do not widen this allowlist; redraw the shape as a `path` instead.
- `creatives/registry.js` and every `creatives/*/index.js` must stay **plain .js
  with no JSX imports** — bare node imports them in the test scripts.
- Two separate trees: `creatives/` renders visitor text; `components/art/` never
  does. They have separate registries and must not import each other.

**Adding an industry** touches seven files plus two test tables — the list is in
`SCREEN_BAZAAR_PLAN.md` §4e. The checks enforce that they all agree.

**Character limits** are Hindi-safe (Devanagari sets ~10% wider; SVG `<text>`
neither wraps nor shrinks). Some caps are set by geometry instead — a centred
field grows in both directions, a field beside artwork must stop before it.

**No `Math.random()` in a drawing** — a creative must render identically on every
screen in a chain. Use literal coordinate tables.

### Gates — run all four after touching anything under `creatives/`

```bash
cd frontend
npm run check:td          # manifest/i18n/data consistency
npm run test:td           # reducer + library tests
npm run check:creatives   # XSS probes, element allowlist, overflow estimate
npm run check:td-render   # render-level checks
npm run check:td-geometry # text-vs-text overlap + frame bounds, both languages
```

`check:td-geometry` is a per-creative render-and-measure script committed with
the Real Estate build. It takes an optional industry slug (defaults to all)
and reports text-vs-text overlaps and anything landing outside the 320×180
frame; a soft touch (under 4 units) prints as `WARN`, a real collision as
`FAIL`. The heuristic has no font metric, so it is approximate — a flag means
"look at this one in a browser", not necessarily a bug.

> `npx eslint` on this tree reports many `react/prop-types` errors. They are
> pre-existing and repo-wide (~1600), not introduced by new creatives.

---

## Repository Structure ⚠️ stale

```
connect_website/
├── frontend/          # React + Vite SPA
│   ├── src/
│   │   ├── App.jsx          # Router definition (all routes)
│   │   ├── main.jsx         # React entry point
│   │   ├── pages/           # Full-page components
│   │   │   ├── LandingPage.jsx
│   │   │   ├── Pricing.jsx
│   │   │   ├── Careers.jsx
│   │   │   ├── get-in-touch.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Industry/    # Per-industry pages
│   │   │       ├── Salon.jsx
│   │   │       ├── Restaurant.jsx
│   │   │       ├── Healthcare.jsx
│   │   │       ├── Ecommerce.jsx
│   │   │       ├── Dentist.jsx
│   │   │       ├── RealEstate.jsx
│   │   │       ├── Finance.jsx
│   │   │       └── Education.jsx
│   │   └── components/      # Shared/reusable UI components
│   └── vercel.json          # SPA fallback: all routes -> index.html
│
├── backend/           # Express + MongoDB API
│   ├── api/
│   │   ├── index.js         # Vercel serverless handler (production entry)
│   │   ├── routes/
│   │   │   ├── gemini.routes.js    # POST /api/gemini/chat
│   │   │   ├── leads.routes.js     # POST/GET /api/leads
│   │   │   ├── careers.routes.js   # POST /api/careers
│   │   │   ├── register.routes.js  # POST /api/register
│   │   │   └── staff.routes.js     # GET /api/staff (+ /:id, /stats)
│   │   ├── models/
│   │   │   ├── Lead.model.js
│   │   │   ├── Application.model.js
│   │   │   └── Staff.model.js
│   │   └── utils/
│   │       ├── db.js               # MongoDB connection (Mongoose)
│   │       └── gemini.js           # Google Generative AI wrapper
│   ├── server.js            # Local dev server (all routes including careers + staff)
│   └── vercel.json          # Routes all /api/* and /* -> api/index.js
```

---

## Tech Stack

### Frontend
- **React 18** with **Vite** (ESM, no CJS)
- **React Router DOM v7** — `createBrowserRouter` / `RouterProvider`
- **Tailwind CSS v3** — utility-first styling
- **GSAP** — animations (world map, scroll effects)
- **Framer Motion** — component-level animations
- **D3** — data visualization
- **Lucide React** — icons
- **ReactFlow** — mind map / flow diagrams
- **Mermaid** — diagram rendering

### Backend
- **Node.js** with **Express 5** (ESM modules — `"type": "module"`)
- **MongoDB** via **Mongoose 9**
- **Google Generative AI SDK** — `gemini-2.5-flash` model
- **dotenv** — environment variables

---

## Frontend Routes ⚠️ stale

### Public pages (production)
| Path | Component | Layout |
|------|-----------|--------|
| `/` | `LandingPage` | Self-contained (all sections inline) |
| `/pricing` | `Pricing` | TopNav + page + IntegrationSection + FinalPoster + Footer |
| `/careers` | `Careers` | TopNav + page + IntegrationSection + FinalPoster + Footer |
| `/get-in-touch` | `GetInTouch` | TopNav + page + IntegrationSection + FinalPoster + Footer |
| `/register/:role?` | `ConnectRegistration` | TopNav + page + IntegrationSection + FinalPoster + Footer |
| `/industry` | `Industry` | Standalone |
| `/industry/salon` | `Salon` | Standalone |
| `/industry/restaurant` | `Restaurant` | Standalone |
| `/industry/healthcare` | `Healthcare` | Standalone |
| `/industry/ecommerce` | `Ecommerce` | Standalone |
| `/industry/dentist` | `Dentist` | Standalone |
| `/industry/realestate` | `RealEstate` | Standalone |
| `/industry/finance` | `Finance` | Standalone |
| `/industry/education` | `Education` | Standalone |

### Dev/test routes (not linked in production UI)
`/world-map`, `/topnav`, `/features`, `/brands`, `/numbers`, `/final-poster`, `/industry-hero`, `/connect-mindmap`

### Layout pattern for secondary pages
```jsx
<TopNav />
<PageComponent />
<div className="bg-yellow-400">
  <IntegrationSection />
  <FinalPoster />
</div>
<div className="bg-yellow-200">
  <Footer />
</div>
```

---

## Backend API Endpoints ⚠️ stale

### Production (Vercel serverless — `api/index.js`)
| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | API health check |
| GET | `/api/health` | Health check |
| POST | `/api/gemini/chat` | Gemini AI chatbot — body: `{ prompt }` |
| POST | `/api/leads` | Create a lead — body: `{ name, email, phone, source, message }` |
| GET | `/api/leads` | Get all leads (sorted by createdAt desc) |
| POST | `/api/register` | Register a business user — body: `{ role, companyName, email, phone, password, source }` |

> **Note:** `careers` and `staff` routes are in `server.js` (local only) but NOT wired in `api/index.js` (Vercel). To expose them in production, they must be added to `api/index.js`.

### Local dev only (`server.js`, port 5000)
| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/careers` | Submit job application |
| GET | `/api/staff` | List staff (supports `?companyName, role, isActive, limit, page`) |
| GET | `/api/staff/:id` | Get single staff member |
| GET | `/api/staff/stats` | Aggregated staff statistics by role |

---

## MongoDB Models ⚠️ stale

### Lead
```js
{ name, email, phone, source (default: "website"), message, timestamps }
```

### Application (careers)
```js
{ name, email, phone, role, resumeUrl, coverLetter, timestamps }
```

### Staff (registrations)
```js
{
  role: enum["owner", "manager", "sales"],  // required
  companyName,   // required
  email,         // required, unique, lowercase
  phone,         // required
  password,      // required, minlength 8 — stored plain text
  source,        // default: "website"
  isVerified,    // default: false
  isActive,      // default: false
  timestamps
}
```

---

## Environment Variables

### Backend (`.env`)
```
MONGO_URI=<MongoDB connection string>   # NOT MONGODB_URI — see backend/src/utils/db.js
GEMINI_API_KEY=<Google AI Studio API key>
PORT=5000  # local dev only
```

> ⚠️ **`backend/` is a git submodule.** Commit inside it separately; a commit in
> the parent repo only records the submodule pointer. Its live code is under
> `backend/src/`, not the `backend/api/` paths in the stale sections above.

---

## Development

### Frontend
```bash
cd frontend
npm install
npm run dev       # Vite dev server (usually http://localhost:5173)
npm run build     # Production build
npm run preview   # Preview production build
```

### Backend (local)
```bash
cd backend
npm install
npm run dev       # nodemon api/index.js (starts on PORT 5000)
```

> Local dev uses `server.js` as the entry but `package.json` scripts point to `api/index.js`. Run `node server.js` directly for the full local server with all routes.

---

## Deployment

Both frontend and backend are deployed as **separate Vercel projects**.

- **Frontend Vercel**: SPA — `frontend/vercel.json` rewrites all routes to `index.html`
- **Backend Vercel**: Serverless — `backend/vercel.json` routes all requests to `api/index.js` which exports a default `handler(req, res)` function

---

## Key Components ⚠️ stale

| Component | Purpose |
|-----------|---------|
| `Navigation.jsx` | Main nav links |
| `TopNav.jsx` | Top navigation bar (used on all secondary pages) |
| `Footer.jsx` | Site footer |
| `GSAPWorldMap.jsx` | Animated world map (GSAP-powered) |
| `ConnectMindMap.jsx` | Mind map visualization (ReactFlow) |
| `Industry.jsx` | Industry selector/overview with AI chatbot |
| `IndustryHero.jsx` | Hero section for industry pages |
| `IndustryConfig.js` | Configuration data for all industry pages |
| `Features.jsx` | Product features showcase |
| `BrandsSection.jsx` | Partner/brand logos |
| `Numbers.jsx` / `Numbers.2.jsx` | Stats/metrics display |
| `IntegrationSection.jsx` | Integrations showcase |
| `FinalPoster.jsx` | CTA poster section |
| `FAQ.jsx` / `IndustryFAQ.jsx` | FAQ accordions |
| `GlassSection.jsx` | Glass-morphism UI section |

---

## Known Issues / Notes

- **Passwords stored as plain text** in the `Staff` model — this is intentional per current requirements but should be hashed before any serious production auth use.
- `backend/api/index.js` (Vercel) is missing `careerRoutes` and `staffRoutes` compared to `server.js`. These need to be added to `api/index.js` to work in production.
- Several routes (`/world-map`, `/topnav`, etc.) appear to be development/testing routes and are not linked from the main UI.
- The `register.routes.js` file is duplicated — both `backend/api/routes/register.routes.js` and referenced in `server.js` contain the same logic.

### Current (verified)

- **`backend/` is a git submodule** — commit inside it, and the env var is
  `MONGO_URI`. The `backend/api/*` paths above are stale; live code is `backend/src/`.
- **SMTP credentials are rejected by Gmail** — the contact form's app password
  needs regenerating (also logged in `SCREEN_BAZAAR_PLAN.md` §8, row 18).
- **~1600 `react/prop-types` eslint errors repo-wide.** Pre-existing and not
  enforced in practice; don't treat them as a regression in new work.
- **The signage industry pages are deliberately bespoke** — nine separate files,
  no shared template. Same for test-drive creatives.
- **Plans are the source of truth and must be kept current:**
  `SCREEN_BAZAAR_PLAN.md` (site), `BLOGS_PLAN.md` (blogs, 6 signage posts).
