import { motion } from "framer-motion";
import { ClinicDashboard } from "./art";

const items = [
  {
    title: "Smart scheduling",
    desc: "Multi-channel booking — WhatsApp, web, Instagram — with automatic reminders.",
    icon: <path d="M4 6h16v14H4zM4 10h16M8 3v4M16 3v4" />,
  },
  {
    title: "Revenue intelligence",
    desc: "A live dashboard of today's collections, pending treatments and growth trends.",
    icon: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  },
  {
    title: "Patient relationships",
    desc: "Every patient's full journey — visits, treatments, feedback and lifetime value.",
    icon: <path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 21v-1a7 7 0 0 1 14 0v1M17 11a3 3 0 1 0 0-6M22 21v-1a5 5 0 0 0-4-4.9" />,
  },
  {
    title: "Automated growth loops",
    desc: "Review requests, recall campaigns and referral nudges — all on autopilot.",
    icon: <path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5" />,
  },
];

export default function MolarisManage() {
  return (
    <section id="clinic" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-mo-cyan">Dental management software</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-mo-ink sm:text-[2.5rem] sm:leading-tight">
            Others help you <span className="text-mo-muted line-through decoration-mo-coral decoration-[3px]">run</span> your
            clinic. <span className="mo-gradient-text">We help it grow.</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-mo-slate">
            Every practice system manages appointments and records — that's table stakes. Molaris goes further, turning
            your clinic into a self-growing business through reputation, follow-ups and real-time patient engagement.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {items.map((it, i) => (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="group rounded-[22px] border border-mo-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-mo-cyan"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-mo-ice text-mo-navy transition-colors group-hover:bg-mo-cyan group-hover:text-white">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {it.icon}
                  </svg>
                </span>
                <p className="mt-3 font-extrabold text-mo-ink">{it.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-mo-slate">{it.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="rounded-[32px] bg-gradient-to-br from-mo-ice via-white to-mo-blush/70 p-3 sm:p-6"
        >
          <div className="aspect-[4/3]">
            <ClinicDashboard />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
