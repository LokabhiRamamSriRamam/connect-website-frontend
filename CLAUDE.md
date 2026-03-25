# CLAUDE.md — Connect Gen AI Website

## Project Overview

Official marketing and lead-generation website for **Connect Gen AI** — an AI-powered chatbot/automation platform for businesses. The site showcases the product, targets specific industries, captures leads, handles job applications, and provides a business registration flow.

---

## Repository Structure

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

## Frontend Routes

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

## Backend API Endpoints

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

## MongoDB Models

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
MONGODB_URI=<MongoDB connection string>
GEMINI_API_KEY=<Google AI Studio API key>
PORT=5000  # local dev only
```

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

## Key Components

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
