import { MotionConfig, motion } from "framer-motion";
import TopNav from "../../components/TopNav";
import FinalCTA from "../../components/screenbazaar/FinalCTA";
import SBFooter from "../../components/screenbazaar/SBFooter";
import { Sparkle, Squiggle } from "../../components/screenbazaar/Decor";
import BlogCard from "./BlogCard";
import { BLOGS } from "./meta";
import "../../components/screenbazaar/sb.css";
import "./blog.css";

/* Little animated scene for the index hero: a phone publishing to three screens. */
function HeroScene() {
  return (
    <svg viewBox="0 0 360 240" className="bl-art h-auto w-full" aria-hidden="true" focusable="false">
      <rect x="10" y="40" width="70" height="130" rx="14" fill="#191919" />
      <rect x="17" y="54" width="56" height="102" rx="6" fill="#fff" />
      <rect x="24" y="64" width="42" height="10" rx="4" fill="#914BFA" />
      <rect x="24" y="80" width="34" height="6" rx="3" fill="#EEE5FF" />
      <rect x="24" y="92" width="38" height="6" rx="3" fill="#EEE5FF" />
      <rect x="24" y="128" width="42" height="16" rx="8" fill="#F5C542" />
      {[0, 1, 2].map((i) => {
        const y = 22 + i * 72;
        const d = `M80 105C150 105 160 ${y + 30} 210 ${y + 30}`;
        return (
          <g key={i}>
            <path d={d} fill="none" stroke="#191919" strokeWidth="2" className="bl-dash" />
            <circle r="5" fill="#F5C542" stroke="#191919" strokeWidth="1.5" className="bl-travel" style={{ offsetPath: `path("${d}")`, animationDelay: `${i * 0.35}s` }} />
            <rect x="210" y={y} width="130" height="60" rx="8" fill="#191919" />
            <g className="bl-glow" style={{ animationDelay: `${i * 0.35 + 1}s` }}>
              <rect x="215" y={y + 5} width="120" height="50" rx="4" fill={["#E4572E", "#914BFA", "#1F30A0"][i]} />
            </g>
            <rect x="224" y={y + 16} width="56" height="8" rx="4" fill="#fff" />
            <rect x="224" y={y + 30} width="36" height="6" rx="3" fill="#fff" opacity="0.7" />
          </g>
        );
      })}
    </svg>
  );
}

export default function BlogIndex() {
  const [first, ...rest] = BLOGS;
  return (
    <MotionConfig reducedMotion="user">
      <div className="sb-root blog-root min-h-screen overflow-x-clip">
        <TopNav theme="cream" />
        <main>
          <section className="relative overflow-hidden bg-sb-warm pb-14 pt-32 sm:pt-40">
            <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8">
              <div className="relative">
                <Sparkle size={24} color="#914BFA" className="absolute -top-8 left-40" />
                <span className="inline-flex rounded-full border-2 border-sb-ink bg-sb-gold px-4 py-1.5 font-manrope text-xs font-extrabold uppercase tracking-[0.2em] text-sb-ink shadow-[3px_3px_0_#191919]">
                  The Screen Bazaar Blog
                </span>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 font-manrope text-4xl font-extrabold leading-[1.05] tracking-tight text-sb-ink sm:text-6xl"
                >
                  Digital signage guides for{" "}
                  <span className="relative inline-block">
                    <span className="sb-gradient-text">Indian businesses.</span>
                    <Squiggle className="absolute -bottom-3 left-0 h-4 w-full" />
                  </span>
                </motion.h1>
                <p className="mt-7 max-w-xl font-manrope text-lg font-semibold leading-relaxed text-sb-slate sm:text-xl">
                  Menu boards, multi-store campaigns, choosing the right display, office screens and signage software — explained for restaurants, retailers and offices.
                </p>
              </div>
              <div className="rounded-[28px] border-2 border-sb-ink bg-white p-4 shadow-[6px_6px_0_#191919]">
                <HeroScene />
              </div>
            </div>
          </section>

          <section aria-labelledby="all-blogs" className="pb-24 pt-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 id="all-blogs" className="sr-only">
                All blogs
              </h2>
              <BlogCard post={first} featured headingLevel={3} />
              <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((b) => (
                  <BlogCard key={b.slug} post={b} />
                ))}
              </div>
            </div>
          </section>
        </main>
        <FinalCTA />
        <SBFooter />
      </div>
    </MotionConfig>
  );
}
