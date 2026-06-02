import React from "react";
import TopNav from "../../components/TopNav";
import VitalHero from "../../components/vital/VitalHero";
import VitalFeatures from "../../components/vital/VitalFeatures";
import VitalSpecialties from "../../components/vital/VitalSpecialties";
import VitalTrust from "../../components/vital/VitalTrust";
import VitalCTA from "../../components/vital/VitalCTA";
import Footer from "../../components/Footer";

export default function VitalAI() {
  return (
    <div style={{ backgroundColor: "#0A1628" }}>
      <TopNav variant="glass" theme="dark" />
      <VitalHero />
      <VitalFeatures />
      <VitalSpecialties />
      <VitalTrust />
      <VitalCTA />
      <Footer />
    </div>
  );
}
