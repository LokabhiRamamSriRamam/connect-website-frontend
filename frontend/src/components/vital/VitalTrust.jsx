import { motion } from "framer-motion";

const badges = [
  { label: "HIPAA", sub: "Compliant" },
  { label: "GDPR", sub: "Ready" },
  { label: "SOC 2", sub: "Type II" },
  { label: "256-bit", sub: "Encryption" },
];

const testimonials = [
  {
    quote: "I used to spend 2 hours after clinic just finishing notes. With Vital, I'm done before I leave the room.",
    author: "Dr. Priya Menon",
    role: "Family Medicine Physician",
  },
  {
    quote: "The billing suggestions alone have cut our denial rate by nearly a third. It pays for itself.",
    author: "Rahul Shah",
    role: "Practice Administrator, Mumbai Cardiology Centre",
  },
  {
    quote: "Finally an AI that understands dental terminology. The perio charting notes are spot-on.",
    author: "Dr. Anjali Desai",
    role: "Periodontist",
  },
];

/** Shield that draws itself, with a lock and an orbiting scan ring. */
function ShieldArt() {
  return (
    <svg viewBox="0 0 240 240" className="vt-anim h-full w-full" role="img" aria-label="Patient data protected">
      <defs>
        <linearGradient id="vt-shield" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#0B2B5C" />
          <stop offset="0.5" stopColor="#1D5FA8" />
          <stop offset="1" stopColor="#0FB2A4" />
        </linearGradient>
      </defs>
      <circle cx="120" cy="120" r="104" fill="none" stroke="#DCE6EC" strokeWidth="1.5" strokeDasharray="2 9" className="vt-orbit" style={{ "--o": "120px 120px" }} />
      <g className="vt-orbit" style={{ "--o": "120px 120px", animationDuration: "8s" }}>
        <circle cx="120" cy="16" r="6" fill="#0FB2A4" />
      </g>
      <path d="M120 30 L186 56 V116 C186 158 158 190 120 206 C82 190 54 158 54 116 V56 Z" fill="url(#vt-shield)" />
      <path d="M120 30 L186 56 V116 C186 158 158 190 120 206 C82 190 54 158 54 116 V56 Z" fill="none" stroke="#5FD4C8" strokeWidth="3" pathLength="420" className="vt-ecg" />
      <rect x="96" y="108" width="48" height="40" rx="8" fill="#FFFFFF" />
      <path d="M104 108 V96 a16 16 0 0 1 32 0 V108" fill="none" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" />
      <path d="M108 128 l8 8 l16 -16" fill="none" stroke="#3AA655" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function VitalTrust() {
  return (
    <section id="trust" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl space-y-20 px-4 sm:px-6">
        <div className="grid items-center gap-10 rounded-[32px] border border-vt-line bg-vt-mist p-6 sm:p-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="mx-auto aspect-square w-full max-w-[280px]">
            <ShieldArt />
          </div>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-vt-teal">Compliance</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-vt-ink sm:text-[2.4rem] sm:leading-tight">
              Compliance built in, <span className="vt-gradient-text">not bolted on.</span>
            </h2>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-vt-slate">
              Vital was designed with healthcare data governance at its core — so your practice stays protected without
              extra configuration.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {badges.map((b) => (
                <div key={b.label} className="rounded-2xl border border-vt-line bg-white px-4 py-3">
                  <p className="text-base font-extrabold text-vt-navy">{b.label}</p>
                  <p className="text-xs font-semibold text-vt-muted">{b.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="text-center">
            <h3 className="text-2xl font-extrabold tracking-tight text-vt-ink sm:text-3xl">Clinicians who've made the switch</h3>
            <p className="mt-2 text-sm text-vt-muted">Early access feedback from practices across India</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.figure
                key={t.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group flex flex-col rounded-[28px] border border-vt-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-vt-teal"
              >
                <svg width="34" height="24" viewBox="0 0 28 20" className="transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110" aria-hidden="true">
                  <path d="M0 20V12C0 5.373 3.627 1.493 10.88 0l1.12 2C8.72 3.093 6.667 5.44 6 9h6v11H0zm16 0V12c0-6.627 3.627-10.507 10.88-12L28 2c-3.28 1.093-5.333 3.44-6 7h6v11H16z" fill="#0FB2A4" opacity="0.35" />
                </svg>
                <blockquote className="mt-4 flex-1 text-[15.5px] font-semibold leading-relaxed text-vt-ink">"{t.quote}"</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-vt-line pt-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-vt-gradient text-sm font-extrabold text-white">
                    {t.author.replace("Dr. ", "").split(" ").map((w) => w[0]).join("")}
                  </span>
                  <span>
                    <span className="block text-sm font-extrabold text-vt-ink">{t.author}</span>
                    <span className="block text-xs text-vt-muted">{t.role}</span>
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
