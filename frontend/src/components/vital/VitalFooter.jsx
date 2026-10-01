import { VitalWordmark } from "./art";
import FooterWordmark from "../FooterWordmark";

const PRODUCT = [
  { label: "Workflow", href: "#workflow" },
  { label: "Features", href: "#features" },
  { label: "Specialties", href: "#specialties" },
  { label: "Compliance", href: "#trust" },
  { label: "Pricing", href: "/pricing" },
];

const COMPANY = [
  { label: "Screen Bazaar", href: "/" },
  { label: "Molaris AI", href: "/industry/dentalclinics" },
  { label: "Saarthi AI", href: "/products/saarthi" },
  { label: "Saarthi for Contractors", href: "/products/saarthi/contractors" },
  { label: "Nexus CRM", href: "/products/nexus" },
  { label: "Beauty Manager", href: "/industry/salon" },
  { label: "Contact us", href: "/get-in-touch" },
];

export default function VitalFooter() {
  return (
    <footer className="bg-vt-deep text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <VitalWordmark tone="light" className="h-10" animated />
          <p className="max-w-xs text-sm leading-relaxed text-white/60">
            Because your best work happens beyond documentation. A Connect Gen AI product.
          </p>
        </div>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-vt-aqua">Vital</p>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {PRODUCT.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="hover:text-white">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-vt-aqua">Also from Connect</p>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {COMPANY.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="hover:text-white">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-2 text-sm text-white/75">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-vt-aqua">Headquarters</p>
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
      {/* navy footer: the default indigo gradient disappears, so use Vital's teal → aqua */}
      <FooterWordmark gradient="linear-gradient(328deg, #0FB2A4 15%, #5FD4C8 60%, #EAF1FA 100%)" />
    </footer>
  );
}
