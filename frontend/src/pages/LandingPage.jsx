import React from "react";
import GSAPWorldMap from "../components/GSAPWorldMap";
import Industry from "../components/Industry";
import BrandsSection from "../components/BrandsSection";
import HomeProducts from "../components/HomeProducts";
import FinalPoster from "../components/FinalPoster";
import Numbers2 from "../components/Numbers.2";
import FAQ from "../components/FAQ.jsx";
import Footer from "../components/Footer";
import IntegrationSection from "../components/IntegrationSection";

function LandingPage() {
  return (
    <>
      <style>{`
  .landing-gradient {
    background: linear-gradient(
      120deg,
      rgba(255, 240, 245, 1),
      rgba(224, 240, 255, 1),
      rgba(255, 255, 255, 1)
    );
    background-size: 300% 300%;
    animation: gradientShift 15s ease infinite;
  }
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`}</style>

      <div className="relative min-h-screen overflow-hidden">
        <div className="fixed inset-0 -z-10 landing-gradient" />

        <GSAPWorldMap />
        <HomeProducts />
        <Numbers2 />
        <Industry />
        <BrandsSection />
        <FinalPoster />
        <IntegrationSection />
        <FAQ />
        <Footer />
      </div>
    </>
  );
}

export default LandingPage;
