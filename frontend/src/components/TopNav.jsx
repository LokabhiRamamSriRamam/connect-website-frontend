import { useState, useRef } from "react";
import { ChevronDown, Menu, MonitorPlay, X } from "lucide-react";
import { ScreenBazaarMark } from "./screenbazaar/ScreenBazaarLogo";
import { INDUSTRIES, industryPath } from "./screenbazaar/content";

const CONNECT_LOGO_SRC = "/connect-wordmark.png";

const THEMES = {
  salon: { bg: "bg-pink-600/90", text: "text-white", dark: true },
  healthcare: { bg: "bg-emerald-600/90", text: "text-white", dark: true },
  finance: { bg: "bg-indigo-700/90", text: "text-white", dark: true },
  light: { bg: "bg-white/80 border border-sb-line", text: "text-sb-ink", dark: false },
  cream: { bg: "bg-white/75 border-2 border-sb-ink shadow-[4px_4px_0_#191919]", text: "text-sb-ink", dark: false },
  dark: { bg: "bg-gray-900/80", text: "text-white", dark: true },
};

const industries = INDUSTRIES.map((i) => ({ name: i.label, href: industryPath(i.slug) }));

const otherProducts = [
  { name: "Vital AI", desc: "Clinical AI platform for every medical practice", href: "/products/vital" },
  { name: "Molaris AI", desc: "Voice-first clinical documentation for dentists", href: "/industry/dentalclinics" },
  { name: "Saarthi AI", desc: "Conversational ERP & BI for MSMEs and Enterprises", href: "/products/saarthi" },
  { name: "Saarthi for Contractors", desc: "Workers, attendance, advances and automatic payroll", href: "/products/saarthi/contractors" },
  { name: "Nexus CRM", desc: "The CRM you never have to update", href: "/products/nexus" },
  { name: "Beauty Manager", desc: "Billing, clients & WhatsApp for salons and spas", href: "/industry/salon" },
];

const OTHERS_LABEL = "Also from Connect Gen AI";

function Dropdown({ open, children, width = "w-64", align = "left-0" }) {
  if (!open) return null;
  return (
    <div className={`absolute top-full ${align} z-50 pt-3`}>
      <div className={`${width} rounded-2xl border-2 border-sb-ink bg-white p-2 text-sb-ink shadow-[5px_5px_0_#191919]`}>{children}</div>
    </div>
  );
}

const TopNav = ({ variant = "glass", theme = "dark" }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const closeTimer = useRef(null);

  const t = THEMES[theme] || THEMES.light;

  const openMenu = (name) => {
    clearTimeout(closeTimer.current);
    setOpenDropdown(name);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 140);
  };

  const hoverProps = (name) => ({
    onMouseEnter: () => openMenu(name),
    onMouseLeave: scheduleClose,
    onFocus: () => openMenu(name),
    onBlur: scheduleClose,
  });

  const logo = (cls) => (
    <a href="/" aria-label="Connect — home">
      <img src={CONNECT_LOGO_SRC} alt="Connect" className={`${cls} ${t.dark ? "invert" : ""}`} />
    </a>
  );

  return (
    <nav
      className={`fixed left-1/2 top-5 z-50 flex w-[95%] max-w-6xl -translate-x-1/2 items-center justify-between rounded-full px-4 py-2 font-manrope backdrop-blur-xl transition-all duration-500 ${t.bg} ${t.text} ${
        variant === "solid" ? "shadow-xl" : ""
      }`}
    >
      {/* MOBILE */}
      <div className="relative flex w-full items-center justify-between lg:hidden">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-full p-2"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        {logo("h-5")}
        <a href="/get-in-touch" className="rounded-full bg-sb-gradient px-4 py-2 text-xs font-extrabold text-white">
          Get Started
        </a>

        {mobileOpen && (
          <div className="absolute left-0 right-0 top-full z-50 mt-4 max-h-[75vh] overflow-y-auto rounded-3xl border-2 border-sb-ink bg-white p-3 text-sb-ink shadow-[5px_5px_0_#191919]">
            <a href="/" className="flex items-center gap-2 rounded-xl px-3 py-3 font-bold hover:bg-sb-lavender">
              <ScreenBazaarMark size={22} /> Screen Bazaar
            </a>
            {[
              { key: "Industries", items: industries },
              { key: OTHERS_LABEL, items: otherProducts },
            ].map(({ key, items }) => (
              <div key={key}>
                <button
                  onClick={() => setMobileSection(mobileSection === key ? null : key)}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-3 font-bold hover:bg-sb-lavender"
                  aria-expanded={mobileSection === key}
                >
                  {key}
                  <ChevronDown size={18} className={`transition-transform ${mobileSection === key ? "rotate-180" : ""}`} />
                </button>
                {mobileSection === key && (
                  <div className="pb-2 pl-3">
                    {items.map((it) => (
                      <a
                        key={it.name}
                        href={it.href}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-xl px-3 py-2 text-sm font-semibold text-sb-slate hover:bg-sb-lavender hover:text-sb-ink"
                      >
                        {it.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a href="/pricing" className="block rounded-xl px-3 py-3 font-bold hover:bg-sb-lavender">
              Pricing
            </a>
            <a href="/blogs" className="block rounded-xl px-3 py-3 font-bold hover:bg-sb-lavender">
              Blogs
            </a>
            <a href="/test-drive" className="flex items-center gap-2 rounded-xl px-3 py-3 font-bold text-sb-violet hover:bg-sb-lavender">
              <MonitorPlay size={17} /> Test Drive
            </a>
          </div>
        )}
      </div>

      {/* DESKTOP */}
      <div className="hidden w-full items-center justify-between lg:flex">
        {logo("h-6")}

        <div className="flex items-center gap-7 text-sm font-bold">
          <a href="/" className="flex items-center gap-1.5 hover:opacity-80">
            <ScreenBazaarMark size={22} /> Screen Bazaar
          </a>

          <div className="relative" {...hoverProps("Industries")}>
            <button className="flex items-center gap-1 hover:opacity-80" aria-expanded={openDropdown === "Industries"}>
              Industries <ChevronDown size={15} />
            </button>
            <Dropdown open={openDropdown === "Industries"} width="w-[420px]">
              <div className="grid grid-cols-2 gap-1">
                {industries.map((ind) => (
                  <a key={ind.name} href={ind.href} className="rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-sb-lavender">
                    {ind.name}
                  </a>
                ))}
              </div>
            </Dropdown>
          </div>

          <a href="/pricing" className="hover:opacity-80">
            Pricing
          </a>

          <a href="/blogs" className="hover:opacity-80">
            Blogs
          </a>

          <a href="/test-drive" className="flex items-center gap-1.5 text-sb-violet hover:opacity-80">
            <MonitorPlay size={16} /> Test Drive
          </a>

          <div className="relative" {...hoverProps("Others")}>
            <button className="flex items-center gap-1 hover:opacity-80" aria-expanded={openDropdown === "Others"}>
              {OTHERS_LABEL} <ChevronDown size={15} />
            </button>
            <Dropdown open={openDropdown === "Others"} width="w-80" align="right-0">
              {otherProducts.map((p) => (
                <a key={p.name} href={p.href} className="block rounded-xl p-3 hover:bg-sb-lavender">
                  <p className="text-sm font-extrabold">{p.name}</p>
                  <p className="mt-0.5 text-xs font-medium text-sb-muted">{p.desc}</p>
                </a>
              ))}
            </Dropdown>
          </div>
        </div>

        <a
          href="/get-in-touch"
          className="rounded-full border-2 border-sb-ink bg-sb-gradient px-6 py-2 text-sm font-extrabold text-white transition-transform hover:-translate-y-0.5"
        >
          Get Started
        </a>
      </div>
    </nav>
  );
};

export default TopNav;
