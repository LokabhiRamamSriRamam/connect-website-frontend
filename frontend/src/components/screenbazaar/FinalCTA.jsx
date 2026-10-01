import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Burst, Sparkle, ScreenSticker } from "./Decor";

export default function FinalCTA() {
  return (
    <section className="bg-sb-cream px-4 pb-20 pt-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ type: "spring", stiffness: 140, damping: 20 }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[36px] border-2 border-sb-ink bg-sb-gradient px-6 py-16 text-center text-white shadow-[8px_8px_0_#191919] sm:px-12 sm:py-20"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{ backgroundImage: "radial-gradient(#fff 1.2px, transparent 1.2px)", backgroundSize: "24px 24px" }}
        />
        <Sparkle size={34} color="#F5C542" className="absolute left-8 top-8" />
        <Sparkle size={22} color="#fff" delay={0.7} className="absolute bottom-10 right-1/3" />
        <ScreenSticker size={70} className="absolute bottom-6 left-6 hidden sm:block" />
        <Burst label="Screen + app + scheduling" size={120} className="absolute -right-2 -top-2 hidden sm:block" />

        <h2 className="relative mx-auto max-w-3xl font-manrope text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
          Connect your screens to <span className="text-sb-gold">opportunity.</span>
        </h2>
        <p className="relative mx-auto mt-5 max-w-xl font-manrope text-lg font-semibold text-white/85">
          Your business needs a screen. Get one. Connect it. Put it to work.
        </p>
        <motion.a
          href="/get-in-touch"
          whileHover={{ scale: 1.05, rotate: 1 }}
          whileTap={{ scale: 0.97 }}
          className="group relative mt-10 inline-flex items-center gap-3 rounded-full border-2 border-sb-ink bg-sb-gold px-9 py-4 font-manrope text-lg font-extrabold text-sb-ink shadow-[5px_5px_0_#191919]"
        >
          Get Started
          <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} />
        </motion.a>
      </motion.div>
    </section>
  );
}
