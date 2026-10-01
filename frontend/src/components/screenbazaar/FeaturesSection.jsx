import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { FEATURE_CHAPTERS } from "./content";
import * as Art from "./illustrations/features";
import StoryCard from "./StoryCard";
import StoryModal, { Blocks } from "./StoryModal";
import { Sparkle, Squiggle } from "./Decor";

export default function FeaturesSection() {
  const [active, setActive] = useState(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <section id="features" className="relative overflow-hidden bg-sb-cream py-20 sm:py-28">
      <div className="pointer-events-none absolute -right-32 top-40 h-80 w-80 rounded-full bg-sb-lilac blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-40 h-80 w-80 rounded-full bg-sb-blush blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* section heading */}
        <div className="relative mx-auto max-w-3xl text-center">
          <Sparkle size={30} className="absolute -left-2 -top-6 sm:left-10" />
          <Sparkle size={20} color="#F5C542" delay={0.8} className="absolute right-4 top-2 sm:right-16" />
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            className="font-manrope text-4xl font-extrabold tracking-tight text-sb-ink sm:text-6xl"
          >
            Screens, <span className="sb-mark">put to work.</span>
          </motion.h2>
          <p className="mt-6 font-manrope text-lg font-semibold text-sb-slate sm:text-xl">
            Control what they show. Decide when they show it.{" "}
            <span className="relative inline-block text-sb-ink">
              Make them count.
              <Squiggle className="absolute -bottom-2 left-0 h-3 w-full" color="#4B3FD0" loop />
            </span>
          </p>
        </div>

        {/* chapters */}
        <div className="mt-16 space-y-20">
          {FEATURE_CHAPTERS.map((ch, ci) => (
            <div key={ch.id}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
              >
                <div>
                  <span
                    className={`inline-block rounded-full border-2 border-sb-ink px-4 py-1 font-manrope text-xs font-extrabold uppercase tracking-[0.18em] shadow-[3px_3px_0_#191919] ${
                      ["bg-sb-gold text-sb-ink", "bg-sb-violet text-white", "bg-sb-indigo text-white"][ci]
                    }`}
                  >
                    {ch.label}
                  </span>
                  <h3 className="mt-4 font-manrope text-3xl font-extrabold tracking-tight text-sb-ink sm:text-4xl">{ch.title}</h3>
                </div>
              </motion.div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {ch.features.map((f, i) => (
                  <motion.div
                    key={f.n}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ delay: i * 0.1, type: "spring", stiffness: 160, damping: 20 }}
                  >
                    <StoryCard
                      eyebrow={`${f.n} · ${f.kicker}`}
                      title={f.title}
                      line={f.line}
                      Art={Art[f.art]}
                      morph={f.morph}
                      onOpen={() => setActive(f)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <StoryModal
        open={!!active}
        onClose={close}
        eyebrow={active ? `${active.n} · ${active.kicker}` : ""}
        title={active?.modal.title}
        Art={active ? Art[active.art] : null}
      >
        {active && <Blocks body={active.modal.body} />}
      </StoryModal>
    </section>
  );
}
