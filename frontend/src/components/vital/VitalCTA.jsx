import { Arrow, TRIAL_URL, VITAL_DEMO_URL } from "./VitalHero";
import { EcgLine, VMark } from "./art";

export default function VitalCTA() {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[36px] bg-vt-gradient px-6 py-16 text-center text-white sm:px-12 sm:py-20">
        <EcgLine className="pointer-events-none absolute inset-x-0 top-1/2 h-24 w-full -translate-y-1/2 opacity-25" color="#FFFFFF" width={2} />
        <svg className="pointer-events-none absolute -right-10 -top-10 h-64 w-56 opacity-15 sm:h-80 sm:w-64" viewBox="0 0 100 120" aria-hidden="true">
          <VMark tone="light" />
        </svg>

        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl">
            Your patients deserve your full attention.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/75">
            Let Vital handle the paperwork. Join clinicians already saving hours every week on documentation, coding and
            admin.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={TRIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-extrabold text-vt-navy transition-transform hover:-translate-y-0.5"
            >
              Start 14 Day Free Trial <Arrow />
            </a>
            <a
              href={VITAL_DEMO_URL}
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-8 py-4 text-sm font-extrabold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              Book a Free Demo
            </a>
          </div>
          <p className="mt-6 text-xs font-semibold text-white/60">No credit card required · HIPAA compliant · Cancel any time</p>
        </div>
      </div>
    </section>
  );
}
