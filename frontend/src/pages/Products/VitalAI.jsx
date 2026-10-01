import React from "react";
import { MotionConfig } from "framer-motion";
import TopNav from "../../components/TopNav";
import VitalHero from "../../components/vital/VitalHero";
import VitalWorkflow from "../../components/vital/VitalWorkflow";
import VitalFeatures from "../../components/vital/VitalFeatures";
import VitalEvening from "../../components/vital/VitalEvening";
import VitalSpecialties, { SpecialtyTicker } from "../../components/vital/VitalSpecialties";
import VitalTrust from "../../components/vital/VitalTrust";
import VitalCTA from "../../components/vital/VitalCTA";
import VitalFooter from "../../components/vital/VitalFooter";
import "../../components/vital/vital.css";

export default function VitalAI() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="vt-root min-h-screen overflow-x-clip font-manrope">
        <TopNav theme="light" />
        <main>
          <VitalHero />
          <SpecialtyTicker />
          <VitalWorkflow />
          <VitalFeatures />
          <VitalEvening />
          <VitalSpecialties />
          <VitalTrust />
          <VitalCTA />
        </main>
        <VitalFooter />
      </div>
    </MotionConfig>
  );
}
