import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import Pricing from "./pages/Pricing";
import IntegrationSection from "./components/IntegrationSection";
import Footer from "./components/Footer";
import Careers from "./pages/Careers";
import GetInTouch from "./pages/get-in-touch";
import ConnectRegistration from "./pages/Register";
import SaarthiGate from "./pages/SaarthiGate";
import SaarthiReport from "./pages/SaarthiReport";
import SaarthiSuccess from "./pages/SaarthiSuccess";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <div>
          <LandingPage />
        </div>
      </div>
    ),
  },
  {
    path: "/world-map",
    element: (
      <div>
        <div>
          <GSAPWorldMap />
        </div>
      </div>
    ),
  },
  {
    path: "/industry",
    element: (
      <div>
        <div>
          <Industry />
        </div>
      </div>
    ),
  },
  {
    path: "/topnav",
    element: (
      <div>
        <div>
          <TopNav />
        </div>
      </div>
    ),
  },
  {
    path: "/features",
    element: (
      <div>
        <div>
          <Features />
        </div>
      </div>
    ),
  },
  {
    path: "/brands",
    element: (
      <div>
        <div>
          <BrandsSection />
        </div>
      </div>
    ),
  },
  {
    path: "/numbers",
    element: (
      <div>
        <div>
          <Numbers />
        </div>
      </div>
    ),
  },
  {
    path: "/final-poster",
    element: (
      <div>
        <div>
          <FinalPoster />
        </div>
      </div>
    ),
  },
  {
    path: "/industry-hero",
    element: (
      <div>
        <div>
          <IndustryHero />
        </div>
      </div>
    ),
  },
  {
    path: "/connect-mindmap",
    element: (
      <div>
        <div>
          <ConnectMindmap />
        </div>
      </div>
    ),
  },
  {
    path: "/industry/salon",
    element: (
      <div>
        <div>
          <Salon />
        </div>
      </div>
    ),
  },
  {
    path: "/industry/restaurant",
    element: (
      <div>
        <div>
          <Restaurant />
        </div>
      </div>
    ),
  },
  {
    path: "/industry/healthcare",
    element: (
      <div>
        <div>
          <Healthcare />
        </div>
      </div>
    ),
  },
  {
    path: "/industry/ecommerce",
    element: (
      <div>
        <div>
          <Ecommerce />
        </div>
      </div>
    ),
  },
  {
    path: "/industry/dentist",
    element: (
      <div>
        <div>
          <Dentist />
        </div>
      </div>
    ),
  },
  {
    path: "/industry/realestate",
    element: (
      <div>
        <div>
          <RealEstate />
        </div>
      </div>
    ),
  },
    {
    path: "/industry/finance",
    element: (
      <div>
        <div>
          <Finance />
        </div>
      </div>
    ),
  },
      {
    path: "/industry/education",
    element: (
      <div>
        <div>
          <Education />
        </div>
      </div>
    ),
  },
        {
    path: "/pricing",
    element: (
      <div>
        <div>
        <TopNav />
          <Pricing />
          
          <div className = "bg-yellow-400">
            <IntegrationSection />
           <FinalPoster />
           </div>
           <div className="bg-yellow-200">
             <Footer />
           </div>
         
        </div>
      </div>
    ),
  },
          {
    path: "/careers",
    element: (
      <div>
        <div>
        <TopNav />
          <Careers />
          
          <div className = "bg-yellow-400">
            <IntegrationSection />
           <FinalPoster />
           </div>
           <div className="bg-yellow-200">
             <Footer />
           </div>
         
        </div>
      </div>
    ),
  },
         {
    path: "/get-in-touch",
    element: (
      <div>
        <div>
        <TopNav />
          <GetInTouch />
          
          <div className = "bg-yellow-400">
            <IntegrationSection />
           <FinalPoster />
           </div>
           <div className="bg-yellow-200">
             <Footer />
           </div>
         
        </div>
      </div>
    ),
  },
{
  path: "/saarthi",
  element: (
    <div>
      <TopNav />
      <SaarthiGate />
    </div>
  ),
},
{
  path: "/saarthi/smartreport",
  element: (
    <div>
      <TopNav />
      <SaarthiReport />
    </div>
  ),
},
{
  path: "/saarthi/get-saarthi",
  element: (
    <div>
      <TopNav />
      <SaarthiSuccess />
    </div>
  ),
},
{
  path: "/register/:role?",
  element: (
    <div>
      <div>
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
