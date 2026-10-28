import "./App.css";
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import WhatsAppFab from "./components/WhatsAppFab";
import SEO from "./components/SEO";
import GSAPWorldMap from "./components/GSAPWorldMap";
import LandingPage from "./pages/LandingPage";
import Industry from "./components/Industry";
import TopNav from "./components/TopNav";
import Features from "./components/Features";
import BrandsSection from "./components/BrandsSection";
import Numbers from "./components/numbers";
import FinalPoster from "./components/FinalPoster";
import IndustryHero from "./components/IndustryHero";
import Salon from "./pages/Industry/Salon";
import ConnectMindmap from "./components/ConnectMindMap";
import Restaurant from "./pages/Industry/Restaurant";
import Healthcare from "./pages/Industry/Healthcare";
import Ecommerce from "./pages/Industry/Ecommerce";
import Dentist from "./pages/Industry/Dentist";
import RealEstate from "./pages/Industry/RealEstate";
import Finance from "./pages/Industry/Finance";
import Education from "./pages/Industry/Education";
import DentalClinics from "./pages/Industry/DentalClinics";
import Pricing from "./pages/Pricing";
import IntegrationSection from "./components/IntegrationSection";
import Footer from "./components/Footer";
import Careers from "./pages/Careers";
import GetInTouch from "./pages/get-in-touch";
import ConnectRegistration from "./pages/Register";
import SaarthiGate from "./pages/SaarthiGate";
import SaarthiReport from "./pages/SaarthiReport";
import SaarthiSuccess from "./pages/SaarthiSuccess";
import SaarthiProduct from "./pages/Products/Saarthi";
import SaarthiContractors from "./pages/Products/SaarthiContractors";
import DigitalTCO from "./pages/Products/DigitalTCO";
import VitalAI from "./pages/Products/VitalAI";
import NexusCRM from "./pages/Products/NexusCRM";
import { INDUSTRIES, industryPath } from "./components/screenbazaar/content";
import SignageRetail from "./pages/signage/Retail";
import SignageRestaurants from "./pages/signage/Restaurants";
import SignageHealthcare from "./pages/signage/Healthcare";
import SignageHospitality from "./pages/signage/Hospitality";
import SignageFitness from "./pages/signage/Fitness";
import SignageEducation from "./pages/signage/Education";
import SignageAutomotive from "./pages/signage/Automotive";
import SignageRealEstate from "./pages/signage/RealEstate";
import SignageCorporate from "./pages/signage/Corporate";
import BlogIndex from "./pages/blog/BlogIndex";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsOfService from "./pages/legal/TermsOfService";
// The test drive is a heavy, self-contained app surface — keep it out of the main bundle.
const TestDrive = lazy(() => import("./pages/test-drive/TestDrive"));
import { BLOGS, BLOG_BASE, BLOG_INDEX, SITE_NAME as BLOG_SITE_NAME, blogPath, blogOgImage, blogSchema, blogIndexSchema } from "./pages/blog/meta";

// Blogs — each one lazy-loaded so the landing page doesn't download every article.
const BLOG_PAGES = {
  "digital-menu-boards-indian-restaurants-qsr": lazy(() => import("./pages/blog/posts/MenuBoards")),
  "multi-location-retail-digital-signage-campaigns": lazy(() => import("./pages/blog/posts/MultiLocationRetail")),
  "commercial-display-vs-consumer-tv-digital-signage": lazy(() => import("./pages/blog/posts/DisplayVsTv")),
  "corporate-office-communication-screens-multiple-floors": lazy(() => import("./pages/blog/posts/CorporateScreens")),
  "printed-standees-to-digital-displays-mistakes": lazy(() => import("./pages/blog/posts/StandeeMistakes")),
  "digital-signage-cms-features-checklist": lazy(() => import("./pages/blog/posts/CmsChecklist")),
};

const blogRoutes = [
  {
    path: BLOG_BASE,
    element: (
      <div>
        <SEO
          title={BLOG_INDEX.title}
          description={BLOG_INDEX.description}
          path={BLOG_BASE}
          siteName={BLOG_SITE_NAME}
          image={blogOgImage("index")}
          schema={blogIndexSchema()}
        />
        <BlogIndex />
      </div>
    ),
  },
  ...BLOGS.map((post) => {
    const Page = BLOG_PAGES[post.slug];
    return {
      path: blogPath(post.slug),
      element: (
        <div>
          <SEO
            title={post.title}
            description={post.description}
            path={blogPath(post.slug)}
            siteName={BLOG_SITE_NAME}
            type="article"
            image={blogOgImage(post.slug)}
            publishedTime={post.date}
            modifiedTime={post.updated || post.date}
            section={post.category}
            schema={blogSchema(post)}
          />
          <Suspense fallback={<div className="min-h-screen bg-[#F8F6F2]" />}>
            <Page />
          </Suspense>
        </div>
      ),
    };
  }),
];

// Screen Bazaar industry pages — each one is its own, individually designed page.
const SIGNAGE_PAGES = {
  retail: SignageRetail,
  restaurants: SignageRestaurants,
  healthcare: SignageHealthcare,
  hospitality: SignageHospitality,
  fitness: SignageFitness,
  education: SignageEducation,
  automotive: SignageAutomotive,
  "real-estate": SignageRealEstate,
  corporate: SignageCorporate,
};

const signageRoutes = INDUSTRIES.map(({ slug, seo }) => {
  const Page = SIGNAGE_PAGES[slug];
  return {
    path: industryPath(slug),
    element: (
      <div>
        <SEO title={seo.title} description={seo.description} path={industryPath(slug)} />
        <Page />
      </div>
    ),
  };
});

/*
 * Pathless layout route: renders the matched page plus the chrome that belongs
 * on every page. The floating WhatsApp button lives here so it mounts once and
 * can read the current path (it hides itself on /test-drive).
 */
function SiteLayout() {
  return (
    <>
      <Outlet />
      <WhatsAppFab />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
  {
    path: "/",
    element: (
      <div>
        <SEO
          title="Screen Bazaar — Digital Signage for Your Business"
          description="Your business needs a screen. Screen Bazaar gives you the screen, the app and the scheduling — control what plays on every screen, in every location, from your phone."
          path="/"
        />
        <LandingPage />
      </div>
    ),
  },
  ...signageRoutes,
  ...blogRoutes,
  {
    path: "/test-drive",
    element: (
      <div>
        {/* noindex: an app surface personalised per visitor, not a content page. */}
        <SEO
          title="Screen Bazaar — Test Drive"
          description="Try a digital signage environment built for your business. Five virtual screens, real scheduling, instant previews."
          path="/test-drive"
          noindex
        />
        <Suspense fallback={<div className="min-h-screen bg-[#F8F6F2]" />}>
          <TestDrive />
        </Suspense>
      </div>
    ),
  },
  {
    path: "/world-map",
    element: (
      <div>
        <SEO title="World Map" description="" path="/world-map" noindex />
        <GSAPWorldMap />
      </div>
    ),
  },
  {
    path: "/industry",
    element: (
      <div>
        <SEO
          title="Industries We Serve"
          description="Connect Gen AI serves salons, restaurants, dental clinics, healthcare, real estate, finance, e-commerce, and education with tailored AI automation."
          path="/industry"
        />
        <Industry />
      </div>
    ),
  },
  {
    path: "/topnav",
    element: (
      <div>
        <SEO title="Navigation" description="" path="/topnav" noindex />
        <TopNav />
      </div>
    ),
  },
  {
    path: "/features",
    element: (
      <div>
        <SEO title="Features" description="" path="/features" noindex />
        <Features />
      </div>
    ),
  },
  {
    path: "/brands",
    element: (
      <div>
        <SEO title="Brands" description="" path="/brands" noindex />
        <BrandsSection />
      </div>
    ),
  },
  {
    path: "/numbers",
    element: (
      <div>
        <SEO title="Numbers" description="" path="/numbers" noindex />
        <Numbers />
      </div>
    ),
  },
  {
    path: "/final-poster",
    element: (
      <div>
        <SEO title="Final Poster" description="" path="/final-poster" noindex />
        <FinalPoster />
      </div>
    ),
  },
  {
    path: "/industry-hero",
    element: (
      <div>
        <SEO title="Industry Hero" description="" path="/industry-hero" noindex />
        <IndustryHero />
      </div>
    ),
  },
  {
    path: "/connect-mindmap",
    element: (
      <div>
        <SEO title="Connect Mindmap" description="" path="/connect-mindmap" noindex />
        <ConnectMindmap />
      </div>
    ),
  },
  {
    path: "/industry/salon",
    element: (
      <div>
        <SEO
          title="Beauty Manager — Salon & Spa Management Software"
          description="Beauty Manager runs your salon: WhatsApp automation, client records, invoices shared on WhatsApp, packages, staff and stock. One-time setup, no maintenance."
          path="/industry/salon"
        />
        <Salon />
      </div>
    ),
  },
  {
    path: "/industry/restaurant",
    element: (
      <div>
        <SEO
          title="AI for Restaurants"
          description="Take reservations, handle menu queries, and automate customer follow-ups with Connect Gen AI for restaurants."
          path="/industry/restaurant"
        />
        <Restaurant />
      </div>
    ),
  },
  {
    path: "/industry/healthcare",
    element: (
      <div>
        <SEO
          title="AI for Healthcare"
          description="Streamline patient scheduling, appointment reminders, and communication with Connect Gen AI's AI-powered healthcare automation."
          path="/industry/healthcare"
        />
        <Healthcare />
      </div>
    ),
  },
  {
    path: "/industry/ecommerce",
    element: (
      <div>
        <SEO
          title="AI for E-Commerce"
          description="Boost sales, automate order updates, and handle customer queries 24/7 with Connect Gen AI for e-commerce businesses."
          path="/industry/ecommerce"
        />
        <Ecommerce />
      </div>
    ),
  },
  {
    path: "/industry/dentist",
    element: (
      <div>
        <SEO
          title="AI for Dental Clinics"
          description="Reduce no-shows, automate appointment reminders, and engage patients via WhatsApp with Connect Gen AI for dental clinics."
          path="/industry/dentist"
        />
        <Dentist />
      </div>
    ),
  },
  {
    path: "/industry/realestate",
    element: (
      <div>
        <SEO
          title="AI for Real Estate"
          description="Generate leads, schedule site visits, and follow up with prospects automatically using Connect Gen AI for real estate."
          path="/industry/realestate"
        />
        <RealEstate />
      </div>
    ),
  },
  {
    path: "/industry/finance",
    element: (
      <div>
        <SEO
          title="AI for Finance"
          description="Automate client communication, document collection, and follow-ups for financial advisors and businesses with Connect Gen AI."
          path="/industry/finance"
        />
        <Finance />
      </div>
    ),
  },
  {
    path: "/industry/education",
    element: (
      <div>
        <SEO
          title="AI for Education"
          description="Engage students, automate admissions queries, and send course reminders with Connect Gen AI for educational institutions."
          path="/industry/education"
        />
        <Education />
      </div>
    ),
  },
  {
    path: "/industry/dentalclinics",
    element: (
      <div>
        <SEO
          title="Molaris AI — Dental Clinic Management System"
          description="Molaris AI is a complete dental clinic management system with AI-powered WhatsApp automation, appointment reminders, follow-ups, and patient engagement."
          path="/industry/dentalclinics"
        />
        <DentalClinics />
      </div>
    ),
  },
  {
    path: "/pricing",
    element: (
      <div>
        <SEO
          title="Digital Signage Pricing — Screen Bazaar"
          description="Digital signage pricing from ₹15,000 one-time, display screen included, with a 12-month warranty. Apt, transparent pricing for your exact requirement."
          path="/pricing"
        />
        <Pricing />
      </div>
    ),
  },
  {
    path: "/careers",
    element: (
      <div>
        <SEO
          title="Careers"
          description="Join the Connect Gen AI team. We're building AI products that transform how businesses communicate and operate. View open positions."
          path="/careers"
        />
        <TopNav />
        <Careers />
        <div className="bg-yellow-400">
          <IntegrationSection />
          <FinalPoster />
        </div>
        <div className="bg-yellow-200">
          <Footer />
        </div>
      </div>
    ),
  },
  {
    path: "/get-in-touch",
    element: (
      <div>
        <SEO
          title="Contact Us — Screen Bazaar"
          description="Talk to the Screen Bazaar team about digital signage for your business. Tell us about your space and we'll call you back within 24 hours."
          path="/get-in-touch"
        />
        <GetInTouch />
      </div>
    ),
  },
  {
    path: "/products/vital",
    element: (
      <div>
        <SEO
          title="Vital AI — AI Medical Transcriber"
          description="Vital AI transcribes doctor-patient conversations in real-time and auto-generates clinical notes across 50+ medical specialties. Built for modern healthcare."
          path="/products/vital"
        />
        <VitalAI />
      </div>
    ),
  },
  {
    path: "/products/nexus",
    element: (
      <div>
        <SEO
          title="Nexus CRM — The CRM You Never Have to Update"
          description="Nexus is the CRM built on conversations. Calls, WhatsApp, email and meetings are saved as interactions by AI, and leads move through your pipeline on their own — no manual logging."
          path="/products/nexus"
        />
        <NexusCRM />
      </div>
    ),
  },
  {
    path: "/products/saarthi",
    element: (
      <div>
        <SEO
          title="Saarthi — Conversational ERP for Indian Businesses"
          description="Saarthi is the business software you run by asking. Billing, stock, ledgers and reports — ask in English or Hinglish and get the exact number, or the finished entry."
          path="/products/saarthi"
        />
        <SaarthiProduct />
      </div>
    ),
  },
  {
    path: "/products/saarthi/contractors",
    element: (
      <div>
        <SEO
          title="Saarthi for Contractors — Labour Attendance, Advances & Payroll"
          description="Manage workers, attendance, advances and automatic payroll across every site. Separate logins for owners, site managers and workers. Works in Hindi and English."
          path="/products/saarthi/contractors"
        />
        <SaarthiContractors />
      </div>
    ),
  },
  {
    path: "/products/digitaltco",
    element: (
      <div>
        <SEO
          title="Digital TCO"
          description="Calculate and optimize your total cost of ownership with Connect Gen AI's Digital TCO tool. Make smarter technology investment decisions."
          path="/products/digitaltco"
        />
        <TopNav />
        <DigitalTCO />
      </div>
    ),
  },
  {
    path: "/saarthi",
    element: (
      <div>
        <SEO
          title="Saarthi — Smart Business Reports"
          description="Access Saarthi's AI-powered smart reports and business intelligence dashboard for your retail or service business."
          path="/saarthi"
        />
        <TopNav />
        <SaarthiGate />
      </div>
    ),
  },
  {
    path: "/saarthi/smartreport",
    element: (
      <div>
        <SEO title="Saarthi Smart Report" description="View your Saarthi AI smart business report." path="/saarthi/smartreport" noindex />
        <TopNav />
        <SaarthiReport />
      </div>
    ),
  },
  {
    path: "/saarthi/get-saarthi",
    element: (
      <div>
        <SEO title="Get Saarthi" description="Get started with Saarthi by Connect Gen AI." path="/saarthi/get-saarthi" noindex />
        <TopNav />
        <SaarthiSuccess />
      </div>
    ),
  },
  {
    path: "/privacy-policy",
    element: (
      <div>
        <SEO
          title="Privacy Policy — Screen Bazaar"
          description="How Screen Bazaar collects, uses, stores, and protects your personal information and media files."
          path="/privacy-policy"
        />
        <PrivacyPolicy />
      </div>
    ),
  },
  {
    path: "/terms-of-service",
    element: (
      <div>
        <SEO
          title="Terms of Service — Screen Bazaar"
          description="The terms governing your access to and use of the Screen Bazaar application and platform services."
          path="/terms-of-service"
        />
        <TermsOfService />
      </div>
    ),
  },
  {
    path: "/register/:role?",
    element: (
      <div>
        <SEO
          title="Register"
          description="Create your Connect Gen AI account and start automating your business with AI-powered tools for communication, bookings, and more."
          path="/register"
        />
        <TopNav />
        <ConnectRegistration />
        <div className="bg-yellow-400">
          <IntegrationSection />
          <FinalPoster />
        </div>
        <div className="bg-yellow-200">
          <Footer />
        </div>
      </div>
    ),
  },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
           <h1 style={{
        position: 'absolute', 
        top: 0, 
        left: 0, 
        zIndex: -1, 
        color: 'transparent'
      }}>Jai Sri Ganesh</h1>
    </>
  );
}

export default App;
