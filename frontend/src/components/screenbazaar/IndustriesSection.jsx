import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { INDUSTRIES, industryPath } from "./content";
import * as Art from "./illustrations/industries";
import StoryCard from "./StoryCard";
import StoryModal, { Bullets, Imagine } from "./StoryModal";
import { Sparkle } from "./Decor";

/* Googly eyes that look around — "people are already looking". */
function LookingEyes() {
  return (
    <span className="relative -mt-2 ml-2 inline-flex translate-y-1 items-center gap-1 align-middle" aria-hidden="true">
      {[0, 1].map((i) => (
        <span key={i} className="flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-sb-ink bg-white sm:h-12 sm:w-12">
          <motion.span
            className="block h-4 w-4 rounded-full bg-sb-ink sm:h-5 sm:w-5"
            animate={{ x: [-6, 6, 6, -6, 0, -6], y: [0, -3, 4, 4, 0, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      ))}
    </span>
  );
}

export default function IndustriesSection() {
  const [active, setActive] = useState(null);
  const close = useCallback(() => setActive(null), []);

  // Deep links from the Industries nav: /#industry-<slug> scrolls to the card.
  useEffect(() => {
    const go = () => {
      const m = window.location.hash.match(/^#industry-(.+)$/);
      if (!m) return;
      const el = document.getElementById(`industry-${m[1]}`);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 150);
    };
    go();
    window.addEventListener("hashchange", go);
    return () => window.removeEventListener("hashchange", go);
  }, []);

  return (
    <section id="industries" className="relative overflow-hidden bg-sb-ivory py-20 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(rgba(145,75,250,0.22) 1.2px, transparent 1.2px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-4xl text-center">
          <Sparkle size={24} color="#F5C542" className="absolute -top-8 left-8" />
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            className="font-manrope text-4xl font-extrabold leading-tight tracking-tight text-sb-ink sm:text-6xl"
          >
            People are already looking.
            <LookingEyes />
            <br />
            <span className="sb-gradient-text">What are you showing them?</span>
          </motion.h2>
          <p className="mx-auto mt-6 max-w-2xl font-manrope text-lg font-semibold text-sb-slate sm:text-xl">
            Whatever your business, turn that attention into{" "}
            <span className="sb-mark" data-tone="lilac">communication</span>,{" "}
            <span className="sb-mark" data-tone="lilac">promotion</span> and{" "}
            <span className="sb-mark">opportunity</span>.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((ind, i) => (
            <motion.div
              key={ind.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: (i % 3) * 0.1, type: "spring", stiffness: 160, damping: 20 }}
            >
              <StoryCard
                id={`industry-${ind.slug}`}
                badge={{ n: ind.n, label: ind.label }}
                title={ind.title}
                line={ind.line}
                Art={Art[ind.art]}
                morph={ind.morph}
                onOpen={() => setActive(ind)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <StoryModal
        open={!!active}
        onClose={close}
        eyebrow={active ? `${active.n} · ${active.label}` : ""}
        title={active?.modal.title}
        Art={active ? Art[active.art] : null}
      >
        {active && (
          <>
            <p>{active.modal.intro}</p>
            <div className="space-y-3">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-sb-ink">What your screen can do</p>
              <Bullets items={active.modal.can} />
            </div>
            <Imagine label="Imagine this" lines={active.modal.imagine} />
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-sb-ink">Who you reach</p>
              <span className="rounded-full border-2 border-sb-ink bg-sb-gold px-4 py-1.5 font-extrabold text-sb-ink shadow-[3px_3px_0_#191919]">
                {active.modal.reach}
              </span>
            </div>
            <a
              href={industryPath(active.slug)}
              className="group inline-flex items-center gap-2 font-extrabold text-sb-violet hover:text-sb-indigo"
            >
              See Screen Bazaar for {active.label}
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
          </>
        )}
      </StoryModal>
    </section>
  );
}
