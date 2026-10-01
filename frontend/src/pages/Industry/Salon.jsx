import { MotionConfig } from "framer-motion";
import TopNav from "../../components/TopNav";
import {
  BeautyAsk,
  BeautyCTA,
  BeautyDay,
  BeautyFeatures,
  BeautyFooter,
  BeautyHero,
  BeautyTicker,
  BeautyUSPs,
} from "../../components/beautypos/BeautySections";
import "../../components/vital/vital.css"; // shared SVG animation primitives
import "../../components/beautypos/beautypos.css";

/* Beauty Manager — salon & spa management (route: /industry/salon). */
export default function Salon() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="bp-root min-h-screen overflow-x-clip font-manrope">
        <TopNav theme="light" />
        <main>
          <BeautyHero />
          <BeautyTicker />
          <BeautyUSPs />
          <BeautyDay />
          <BeautyAsk />
          <BeautyFeatures />
          <BeautyCTA />
        </main>
        <BeautyFooter />
      </div>
    </MotionConfig>
  );
}
