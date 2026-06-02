import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import DigitalTCO from "./pages/Products/DigitalTCO";
import VitalAI from "./pages/Products/VitalAI";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <SEO
          title="AI-Powered Business Automation"
          description="Connect Gen AI helps businesses automate customer communication, bookings, and workflows using AI. Trusted by salons, restaurants, dental clinics, and more."
          path="/"
        />
        <LandingPage />
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
          title="AI for Salons & Spas"
          description="Automate bookings, manage stylists, send reminders, and grow your salon with Connect Gen AI's WhatsApp AI chatbot."
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
          title="Pricing — Vital AI & Molaris AI Plans"
          description="Simple, transparent pricing for Vital AI and Molaris AI. Plans starting at ₹999/month. Find the right plan for your clinic or practice."
          path="/pricing"
        />
        <TopNav />
        <Pricing />
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
          title="Get in Touch"
          description="Contact the Connect Gen AI sales team. Get a demo, ask questions, or find the right AI automation plan for your business."
          path="/get-in-touch"
        />
        <TopNav />
        <GetInTouch />
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
    path: "/products/saarthi",
    element: (
      <div>
        <SEO
          title="Saarthi — AI Business Assistant"
          description="Saarthi is Connect Gen AI's intelligent business assistant for retail and service businesses. Automate operations, track performance, and grow faster."
          path="/products/saarthi"
        />
        <TopNav />
        <SaarthiProduct />
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
