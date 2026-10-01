import { MotionConfig } from "framer-motion";
import TopNav from "../../components/TopNav";
import {
  NexusAnatomy,
  NexusCTA,
  NexusFeatures,
  NexusFlow,
  NexusFooter,
  NexusHero,
  NexusProblem,
  NexusTicker,
} from "../../components/nexus/NexusSections";
import "../../components/vital/vital.css"; // shared SVG animation primitives
import "../../components/nexus/nexus.css";

/* Nexus CRM — interactions are the building block; AI logs them; stages move themselves. */
export default function NexusCRM() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="nx-root min-h-screen overflow-x-clip font-manrope">
        <TopNav theme="light" />
        <main>
          <NexusHero />
          <NexusTicker />
          <NexusProblem />
          <NexusAnatomy />
          <NexusFlow />
          <NexusFeatures />
          <NexusCTA />
        </main>
        <NexusFooter />
      </div>
    </MotionConfig>
  );
}
