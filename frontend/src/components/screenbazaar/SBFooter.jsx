import ScreenBazaarLogo from "./ScreenBazaarLogo";
import FooterWordmark from "../FooterWordmark";
import { INDUSTRIES, industryPath } from "./content";

const OTHER_PRODUCTS = [
  { name: "Vital AI", href: "/products/vital" },
  { name: "Molaris AI", href: "/industry/dentalclinics" },
  { name: "Saarthi AI", href: "/products/saarthi" },
  { name: "Saarthi for Contractors", href: "/products/saarthi/contractors" },
  { name: "Nexus CRM", href: "/products/nexus" },
  { name: "Beauty Manager", href: "/industry/salon" },
];

export default function SBFooter() {
  return (
    <footer className="border-t-2 border-sb-ink bg-sb-ink font-manrope text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="space-y-4">
          <ScreenBazaarLogo tone="light" size={40} showSlogan />
          <p className="text-sm text-white/60">A Connect Gen AI product.</p>
        </div>

        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-sb-gold">Industries</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-white/75">
            {INDUSTRIES.map((i) => (
              <li key={i.slug}>
                <a href={industryPath(i.slug)} className="hover:text-white">
                  {i.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-sb-gold">Company</p>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li><a href="/pricing" className="hover:text-white">Pricing</a></li>
            <li><a href="/blogs" className="hover:text-white">Blogs</a></li>
            <li><a href="/test-drive" className="hover:text-white">Test Drive</a></li>
            <li><a href="/get-in-touch" className="hover:text-white">Contact us</a></li>
            {OTHER_PRODUCTS.map((p) => (
              <li key={p.name}>
                <a href={p.href} className="hover:text-white">{p.name}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2 text-sm text-white/75">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-sb-gold">Headquarters</p>
          <p className="pt-2">
            LBS Marg, C/26, Ishwar Nagar,
            <br />
            Mumbai, Maharashtra 400078, IN
          </p>
          <p>
            <a href="tel:+919967392920" className="hover:text-white">+91 9967392920</a>
          </p>
          <p>
            <a href="mailto:connectgenai@gmail.com" className="hover:text-white">connectgenai@gmail.com</a>
          </p>
          <a
            href="https://www.linkedin.com/company/connect-gen-ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block pt-2 font-bold text-white hover:text-sb-gold"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Sreeji Growth Advisory. All rights reserved.
      </div>
      <FooterWordmark />
    </footer>
  );
}
