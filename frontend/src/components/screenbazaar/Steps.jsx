import { motion } from "framer-motion";
import { Monitor, Smartphone, CalendarClock } from "lucide-react";
import { Ticker, Sparkle } from "./Decor";

const STEPS = [
  {
    icon: Monitor,
    title: "Get one.",
    text: "The screen comes with it — a TV, a monitor, whatever fits your space.",
    bg: "bg-sb-gold",
    rot: "-rotate-2",
  },
  {
    icon: Smartphone,
    title: "Connect it.",
    text: "Pair it with the Screen Bazaar mobile app or web app.",
    bg: "bg-sb-lilac",
    rot: "rotate-1",
  },
  {
    icon: CalendarClock,
    title: "Put it to work.",
    text: "Choose what plays, schedule when it plays, change it any time.",
    bg: "bg-sb-violet text-white",
    rot: "-rotate-1",
  },
];

const TICKER = [
  "Update from your phone",
  "Schedule by time of day",
  "One update, every location",
  "Screen + app + scheduling included",
  "Earn from unused screen time",
  "Proof of play for advertisers",
];

export default function Steps() {
  return (
    <section className="relative overflow-hidden bg-sb-cream pt-3">
      <div className="-mx-6 -rotate-1 border-y-2 border-sb-ink bg-sb-ink py-3 font-manrope text-base font-extrabold uppercase tracking-wider text-white">
        <Ticker items={TICKER} className="[&_svg]:text-sb-gold" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, text, bg, rot }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.12, type: "spring", stiffness: 200, damping: 20 }}
              whileHover={{ rotate: 0, y: -6 }}
              className={`relative rounded-[28px] border-2 border-sb-ink p-7 shadow-[6px_6px_0_#191919] ${bg} ${rot}`}
            >
              <span className="absolute -top-5 right-6 flex h-11 w-11 items-center justify-center rounded-full border-2 border-sb-ink bg-white font-manrope text-lg font-extrabold text-sb-ink">
                {i + 1}
              </span>
              <Icon size={34} strokeWidth={2.2} />
              <h3 className="mt-5 font-manrope text-3xl font-extrabold tracking-tight">{title}</h3>
              <p className="mt-2 font-manrope text-base font-semibold opacity-80">{text}</p>
              {i === 2 && <Sparkle size={28} color="#F5C542" className="absolute -bottom-3 -left-3" />}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
