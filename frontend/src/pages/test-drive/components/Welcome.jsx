import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ScreenBazaarMark } from "../../../components/screenbazaar/ScreenBazaarLogo";
import { Sparkle, Squiggle } from "../../../components/screenbazaar/Decor";
import { useI18n } from "../i18n/I18nContext.jsx";
import WelcomeArt from "./art/WelcomeArt.jsx";

/** Stage 1: welcome + language choice, before any details are asked for. */
export default function Welcome({ onStart }) {
  const { t } = useI18n();
  const reduce = useReducedMotion();

  const rise = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: [0.65, 0, 0.35, 1] },
        };

  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      {/* Decorations are kept clear of the heading: the sparkle only appears from sm
          up, where there is room beside the text rather than behind it. */}
      <Squiggle className="pointer-events-none absolute right-6 top-4 w-24 opacity-70" loop />
      <Sparkle className="pointer-events-none absolute -left-1 top-6 hidden sm:block" delay={0.4} />

      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <motion.div {...rise(0)} className="flex items-center gap-2">
            <ScreenBazaarMark size={34} />
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-sb-violet">
              {t("welcome.kicker")}
            </p>
          </motion.div>

          <motion.h1
            {...rise(0.06)}
            className="mt-5 text-[2rem] font-extrabold leading-[1.12] tracking-tight sm:text-5xl"
          >
            {t("welcome.title")}
          </motion.h1>

          <motion.p {...rise(0.12)} className="mt-5 text-lg font-bold text-sb-ink sm:text-xl">
            {t("welcome.line1")}
          </motion.p>

          <motion.p
            {...rise(0.18)}
            className="mt-1.5 text-lg font-extrabold sb-gradient-text sm:text-xl"
          >
            {t("welcome.line2")}
          </motion.p>

          <motion.p {...rise(0.24)} className="mt-5 max-w-lg text-[15px] leading-relaxed text-sb-slate">
            {t("welcome.support")}
          </motion.p>

          <motion.div {...rise(0.3)} className="mt-8">
            <button
              type="button"
              onClick={onStart}
              data-td-target="welcome-cta"
              className="group inline-flex items-center gap-2.5 rounded-full border-2 border-sb-ink bg-sb-gradient px-7 py-4 font-manrope text-base font-extrabold text-white shadow-[5px_5px_0_#191919] transition-shadow hover:shadow-[7px_7px_0_#191919] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sb-violet/40 sm:text-lg"
            >
              {t("welcome.cta")}
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>

          <motion.p {...rise(0.36)} className="mt-4 text-[11px] font-bold uppercase tracking-wider text-sb-muted">
            {t("sim.badge")}
          </motion.p>
        </div>

        <motion.div
          {...(reduce
            ? {}
            : {
                initial: { opacity: 0, scale: 0.96 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 0.7, delay: 0.1, ease: [0.65, 0, 0.35, 1] },
              })}
          className="relative"
        >
          <div className="overflow-hidden rounded-[28px] border-2 border-sb-ink bg-white shadow-[8px_8px_0_#191919]">
            <WelcomeArt />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
