import { MotionConfig } from "framer-motion";
import TopNav from "../../components/TopNav";
import MolarisHero, { MolarisTicker } from "../../components/molaris/MolarisHero";
import MolarisJourney from "../../components/molaris/MolarisJourney";
import MolarisManage from "../../components/molaris/MolarisManage";
import MolarisScribe from "../../components/molaris/MolarisScribe";
import MolarisCompare from "../../components/molaris/MolarisCompare";
import { MolarisCTA, MolarisFooter } from "../../components/molaris/MolarisCTA";
import "../../components/vital/vital.css"; // shared SVG animation primitives
import "../../components/molaris/molaris.css";

/* Molaris AI — dental clinic growth system (route: /industry/dentalclinics). */
export default function DentalClinics() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="mo-root min-h-screen overflow-x-clip font-manrope">
        <TopNav theme="light" />
        <main>
          <MolarisHero />
          <MolarisTicker />
          <MolarisJourney />
          <MolarisManage />
          <MolarisScribe />
          <MolarisCompare />
          <MolarisCTA />
        </main>
        <MolarisFooter />
      </div>
    </MotionConfig>
  );
}
