import FooterWordmark from "../FooterWordmark";
import { Arrow, MOLARIS_DEMO_URL, TRIAL_URL } from "./MolarisHero";
import { MolarisWordmark, ToothMark } from "./art";

export function MolarisCTA() {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[36px] bg-mo-gradient px-6 py-16 text-center text-white sm:px-12 sm:py-20">
        <svg viewBox="0 0 100 100" className="vt-anim pointer-events-none absolute -bottom-10 -right-8 h-56 w-56 rotate-12 opacity-20 sm:h-72 sm:w-72" aria-hidden="true">
          <ToothMark size={100} tone="light" animated />
        </svg>
        <svg viewBox="0 0 100 100" className="pointer-events-none absolute -left-6 -top-8 h-32 w-32 -rotate-12 opacity-10" aria-hidden="true">
          <ToothMark size={100} tone="light" />
        </svg>
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl">
            Ready to build your clinic's growth engine?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/75">
            Join 200+ dental clinics already on Molaris. Setup in 48 hours. No lock&#8209;in.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={TRIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-extrabold text-mo-navy transition-transform hover:-translate-y-0.5"
            >
              Start 14 Day Free Trial <Arrow />
            </a>
            <a
              href={MOLARIS_DEMO_URL}
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-8 py-4 text-sm font-extrabold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              Book a Free Demo
            </a>
            <a href="/pricing" className="px-4 py-4 text-sm font-extrabold text-white/80 underline-offset-4 hover:text-white hover:underline">
              View pricing
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const PRODUCT = [
  { label: "Patient journey", href: "#journey" },
  { label: "Clinic management", href: "#clinic" },
  { label: "Dental transcriber", href: "#scribe" },
  { label: "Why Molaris", href: "#compare" },
  { label: "Pricing", href: "/pricing" },
];

const COMPANY = [
  { label: "Screen Bazaar", href: "/" },
  { label: "Vital AI", href: "/products/vital" },
  { label: "Saarthi AI", href: "/products/saarthi" },
  { label: "Nexus CRM", href: "/products/nexus" },
  { label: "Beauty Manager", href: "/industry/salon" },
  { label: "Contact us", href: "/get-in-touch" },
];

export function MolarisFooter() {
  return (
    <footer className="bg-mo-night text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <MolarisWordmark tone="light" className="h-11" animated />
          <p className="max-w-xs text-sm leading-relaxed text-white/60">
            The growth system for dental clinics. A Connect Gen AI product.
          </p>
        </div>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-mo-aqua">Molaris</p>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {PRODUCT.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="hover:text-white">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-mo-aqua">Also from Connect</p>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {COMPANY.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="hover:text-white">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-2 text-sm text-white/75">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-mo-aqua">Headquarters</p>
          <p className="pt-2">
            LBS Marg, C/26, Ishwar Nagar,
            <br />
            Mumbai, Maharashtra 400078, IN
          </p>
          <p><a href="tel:+919967392920" className="hover:text-white">+91 9967392920</a></p>
          <p><a href="mailto:connectgenai@gmail.com" className="hover:text-white">connectgenai@gmail.com</a></p>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Sreeji Growth Advisory. All rights reserved.
      </div>
      <FooterWordmark gradient="linear-gradient(328deg, #00B3C1 15%, #7FDDE4 55%, #FFE9EC 100%)" />
    </footer>
  );
}
