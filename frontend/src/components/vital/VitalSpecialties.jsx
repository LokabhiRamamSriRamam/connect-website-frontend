import { motion } from "framer-motion";
import { VITAL_DEMO_URL } from "./VitalHero";

const I = (children) => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

const specialties = [
  { name: "Family Medicine", note: "SOAP · Chronic disease · Preventive", icon: I(<><path d="M12 2a5 5 0 015 5v2a5 5 0 01-10 0V7a5 5 0 015-5z" /><path d="M4 22c0-4.418 3.582-8 8-8s8 3.582 8 8" /></>) },
  { name: "Cardiology", note: "Echo reports · Stress tests · Telemetry", icon: I(<><path d="M12 21C7 17 3 13.5 3 9a5 5 0 019-3 5 5 0 019 3c0 4.5-4 8-9 12z" /><path d="M6 11h3l1.5-3 2 6 1.5-3h4" /></>) },
  { name: "Pediatrics", note: "Growth charts · Vaccination · Milestones", icon: I(<><circle cx="12" cy="7" r="4" /><path d="M6 21v-1a6 6 0 0112 0v1" /><path d="M10 7h.01M14 7h.01" /></>) },
  { name: "Mental Health", note: "DAP · BIRP · Progress notes", icon: I(<><path d="M9 3a6 6 0 00-6 6c0 2 1 3.5 2 4.5V21h8v-3h3a2 2 0 002-2v-3l2-1-2-3.5A6 6 0 009 3z" /></>) },
  { name: "Dentistry", note: "Perio charts · Treatment plans · X-rays", icon: I(<><path d="M7 3c-2.5 0-4 2-4 4.5 0 3 1.5 5 2 8 .4 2.6 1 5.5 2.5 5.5S9.5 17 12 17s3 4 4.5 4 2.1-2.9 2.5-5.5c.5-3 2-5 2-8C21 5 19.5 3 17 3c-2 0-3 1-5 1S9 3 7 3z" /></>) },
  { name: "Dermatology", note: "Lesion mapping · Biopsy notes · Photos", icon: I(<><circle cx="12" cy="12" r="9" /><circle cx="9" cy="10" r="1.5" /><circle cx="15" cy="14" r="2" /><circle cx="14" cy="8" r=".8" /></>) },
  { name: "Orthopedics", note: "Surgical notes · Rehab plans · Imaging", icon: I(<><path d="M8 4a2 2 0 10-3 2.6L16.4 18a2 2 0 102.6 3 2 2 0 103-2.6L10.6 7A2 2 0 108 4z" /></>) },
  { name: "OB/GYN", note: "Prenatal records · Delivery notes · Cycles", icon: I(<><circle cx="12" cy="9" r="6" /><path d="M12 15v7M9 19h6" /></>) },
  { name: "Internal Medicine", note: "Complex histories · Multi-system notes", icon: I(<><path d="M6 3v6a6 6 0 0012 0V3" /><circle cx="18" cy="16" r="3" /><path d="M12 15v2a4 4 0 004 4" /></>) },
  { name: "Veterinary", note: "Species templates · Drug dosing · SOAP", icon: I(<><circle cx="6" cy="10" r="2" /><circle cx="10" cy="5.5" r="2" /><circle cx="14" cy="5.5" r="2" /><circle cx="18" cy="10" r="2" /><path d="M12 11c-3 0-5 4-5 6.5 0 2 2 2.5 5 1.5 3 1 5 .5 5-1.5C17 15 15 11 12 11z" /></>) },
];

/** Scrolling strip of specialty names (sits under the hero). */
export function SpecialtyTicker() {
  const row = [...specialties, ...specialties];
  return (
    <div className="vt-marquee-wrap overflow-hidden border-y border-vt-line bg-white py-4" aria-label="Specialties supported">
      <div className="vt-marquee gap-3">
        {row.map((s, i) => (
          <span
            key={i}
            aria-hidden={i >= specialties.length}
            className="flex shrink-0 items-center gap-2 rounded-full bg-vt-mist px-4 py-2 text-sm font-extrabold text-vt-navy"
          >
            <span className="text-vt-teal [&_svg]:h-[18px] [&_svg]:w-[18px]">{s.icon}</span>
            {s.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function VitalSpecialties() {
  return (
    <section id="specialties" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-vt-teal">Specialties</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-vt-ink sm:text-[2.6rem] sm:leading-tight">
            Built for every specialty, <span className="vt-gradient-text">not just primary care.</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-vt-slate">
            Specialty-specific templates, terminology and workflows out of the box — tailored to how each practice
            actually works.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {specialties.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 5) * 0.05 }}
              className="vt-spec group rounded-[22px] border border-vt-line bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-vt-teal hover:shadow-[0_20px_40px_-24px_rgba(15,178,164,0.6)]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-vt-mist text-vt-navy transition-colors group-hover:bg-vt-teal group-hover:text-white">
                {s.icon}
              </span>
              <p className="mt-4 text-[15px] font-extrabold text-vt-ink">{s.name}</p>
              <p className="mt-1 text-xs leading-relaxed text-vt-muted">{s.note}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-vt-mint px-2.5 py-1 text-[11px] font-extrabold text-vt-teal">
                <span className="h-1.5 w-1.5 rounded-full bg-vt-teal" />
                Templates ready
              </span>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-vt-muted">
          Don't see your specialty?{" "}
          <a href={VITAL_DEMO_URL} className="font-extrabold text-vt-blue hover:underline">
            Request custom templates →
          </a>
        </p>
      </div>
    </section>
  );
}
