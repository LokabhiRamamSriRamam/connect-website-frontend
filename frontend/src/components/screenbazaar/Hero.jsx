import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock3, Wifi } from "lucide-react";
import { Squiggle, Sparkle, StickerBadge, DoodleArrow, ScreenSticker, Blob } from "./Decor";

const CHIPS = [
  { icon: CheckCircle2, text: "Lunch menu live · 5 branches", tone: "text-sb-green" },
  { icon: Clock3, text: "Weekend sale scheduled · Sat 9 AM", tone: "text-sb-violet" },
  { icon: Wifi, text: "All screens online", tone: "text-sb-indigo" },
];

const words = ["Get one.", "Connect it.", "Put it to work."];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-sb-warm pb-16 pt-32 sm:pt-36 lg:pb-24">
      {/* background shapes */}
      <Blob className="absolute -left-24 top-24 h-72 w-72 bg-sb-lilac opacity-70 blur-2xl" />
      <Blob className="absolute -right-20 -top-16 h-96 w-96 bg-sb-violet/25 blur-3xl" style={{ animationDelay: "-4s" }} />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(rgba(75,63,208,0.18) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "linear-gradient(180deg, black, transparent 80%)",
          WebkitMaskImage: "linear-gradient(180deg, black, transparent 80%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:px-8">
        {/* copy */}
        <div className="relative z-10 text-center lg:text-left">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border-2 border-sb-ink bg-white px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-sb-ink shadow-[3px_3px_0_#191919]"
          >
            <Sparkle size={14} color="#914BFA" />
            The home of business screens
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-5xl font-extrabold leading-[1.02] tracking-tight text-sb-ink sm:text-6xl lg:text-7xl"
          >
            Your business needs a{" "}
            <span className="relative inline-block">
              <span className="sb-gradient-text">screen.</span>
              <Squiggle className="absolute -bottom-3 left-0 h-4 w-full sm:-bottom-4 sm:h-5" />
              <Sparkle size={26} color="#F5C542" className="absolute -right-7 -top-4" delay={0.4} />
            </span>
          </motion.h1>

          <p className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-1 text-xl font-bold text-sb-slate sm:text-2xl lg:justify-start">
            {words.map((w, i) => (
              <motion.span
                key={w}
                initial={{ opacity: 0, y: 14, rotate: -4 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ delay: 0.45 + i * 0.25, type: "spring", stiffness: 260, damping: 18 }}
                className={i === 2 ? "text-sb-ink" : ""}
              >
                {i === 2 ? <span className="sb-mark">{w}</span> : w}
              </motion.span>
            ))}
          </p>

          <div className="relative mt-10 inline-flex flex-col items-center lg:items-start">
            <motion.a
              href="/get-in-touch"
              whileHover={{ scale: 1.04, rotate: -1 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-3 rounded-full border-2 border-sb-ink bg-sb-gradient px-8 py-4 text-lg font-extrabold text-white shadow-[5px_5px_0_#191919] transition-shadow hover:shadow-[7px_7px_0_#191919]"
            >
              Get Started
              <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} />
            </motion.a>
            <div className="pointer-events-none absolute -right-52 -top-1 hidden items-start gap-1 sm:flex">
              <DoodleArrow className="h-14 w-20" flip />
              <span className="mt-8 -rotate-6 font-manrope text-sm font-extrabold text-sb-violet">psst… it&apos;s that easy</span>
            </div>
          </div>
        </div>

        {/* visual — arch sits behind the people; its flat base meets the photo's cropped edge */}
        <div className="relative mx-auto w-full max-w-2xl pt-6">
          <div className="relative">
            <div className="absolute bottom-0 left-[3%] top-[6%] w-[60%] translate-x-3 translate-y-3 rounded-t-full border-2 border-sb-ink bg-sb-gold" />
            <div className="absolute bottom-0 left-[3%] top-[6%] w-[60%] overflow-hidden rounded-t-full border-2 border-sb-ink bg-sb-gradient">
              <div
                className="absolute inset-0 opacity-25"
                style={{ backgroundImage: "radial-gradient(#fff 1.2px, transparent 1.2px)", backgroundSize: "18px 18px" }}
              />
            </div>
            <motion.img
              src="/screen-bazaar/hero.webp"
              alt="Two customers smiling and pointing at a digital menu screen showing a 20% off offer on bowls"
              width="1536"
              height="1024"
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ transformOrigin: "bottom center" }}
              className="relative z-10 block w-full drop-shadow-[0_24px_30px_rgba(31,48,160,0.3)]"
              fetchpriority="high"
            />
            <div className="absolute -bottom-[2px] left-0 right-0 z-10 h-[3px] rounded-full bg-sb-ink" />

          {/* rotating sticker */}
          <StickerBadge
            size={116}
            className="absolute -top-6 left-[52%] z-20 hidden sm:block"
            center={<ScreenSticker size={50} />}
          />

          {/* live status chips cycling */}
          <div className="absolute -bottom-8 left-1/2 z-20 h-14 w-[300px] -translate-x-1/2 sm:left-auto sm:right-2 sm:w-[330px] sm:translate-x-0">
            {CHIPS.map(({ icon: Icon, text, tone }, i) => (
              <div
                key={text}
                className="sb-chip absolute inset-0 flex items-center gap-3 rounded-2xl border-2 border-sb-ink bg-white px-4 shadow-[4px_4px_0_#191919]"
                style={{ animationDelay: `${i * 3}s` }}
                {...(i === 0 ? { "data-first": "" } : {})}
              >
                <Icon className={tone} size={22} />
                <span className="whitespace-nowrap text-sm font-extrabold text-sb-ink">{text}</span>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
