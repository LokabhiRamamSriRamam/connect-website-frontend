import TopNav from "../components/TopNav";
import Hero from "../components/screenbazaar/Hero";
import Steps from "../components/screenbazaar/Steps";
import FeaturesSection from "../components/screenbazaar/FeaturesSection";
import IndustriesSection from "../components/screenbazaar/IndustriesSection";
import TestimonialsSection from "../components/screenbazaar/TestimonialsSection";
import BlogsSection from "../components/screenbazaar/BlogsSection";
import FinalCTA from "../components/screenbazaar/FinalCTA";
import SBFooter from "../components/screenbazaar/SBFooter";
import "../components/screenbazaar/sb.css";

/* Landing page = Screen Bazaar (digital signage). See SCREEN_BAZAAR_PLAN.md. */
function LandingPage() {
  return (
    <div className="sb-root min-h-screen overflow-x-clip">
      <TopNav theme="cream" />
      <main>
        <Hero />
        <Steps />
        <FeaturesSection />
        <IndustriesSection />
        <TestimonialsSection />
        <BlogsSection />
        <FinalCTA />
      </main>
      <SBFooter />
    </div>
  );
}

export default LandingPage;
