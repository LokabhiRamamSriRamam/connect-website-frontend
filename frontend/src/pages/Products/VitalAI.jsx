import React from "react";
import VitalNav from "../../components/vital/VitalNav";
import VitalHero from "../../components/vital/VitalHero";
import VitalFeatures from "../../components/vital/VitalFeatures";
import VitalSpecialties from "../../components/vital/VitalSpecialties";
import VitalTrust from "../../components/vital/VitalTrust";
import VitalCTA from "../../components/vital/VitalCTA";
import Footer from "../../components/Footer";

export default function VitalAI() {
  return (
    <div style={{ backgroundColor: "#0A1628" }}>
      <VitalNav />
      <VitalHero />
      <VitalFeatures />
      <VitalSpecialties />
      <VitalTrust />
      <VitalCTA />
      <Footer />
    </div>
  );
}
