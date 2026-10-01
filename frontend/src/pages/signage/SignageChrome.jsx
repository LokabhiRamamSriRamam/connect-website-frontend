import { MotionConfig } from "framer-motion";
import TopNav from "../../components/TopNav";
import FinalCTA from "../../components/screenbazaar/FinalCTA";
import SBFooter from "../../components/screenbazaar/SBFooter";
import "../../components/screenbazaar/sb.css";
import "./art/signage.css";

/* Site chrome only (nav, closing CTA, footer). Every industry page designs its own content. */
export default function SignageChrome({ children, className = "" }) {
  return (
    <MotionConfig reducedMotion="user">
      <div className={`sb-root min-h-screen overflow-x-clip ${className}`}>
        <TopNav theme="cream" />
        <main>{children}</main>
        <FinalCTA />
        <SBFooter />
      </div>
    </MotionConfig>
  );
}
