import React, { useState, useEffect } from "react";

const VitalLogo = () => (
  <a href="/products/vital" className="flex items-center gap-2">
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="28" height="28" rx="8" fill="#0EA5E9" fillOpacity="0.15" />
      <polyline
        points="4,14 8,14 10,8 13,20 16,10 18,16 20,14 24,14"
        stroke="#0EA5E9"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
    <span className="font-bold text-lg tracking-tight">
      <span className="text-white">VITAL</span>
      <span style={{ color: "#0EA5E9" }}>.AI</span>
    </span>
  </a>
);

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Specialties", href: "#specialties" },
  { label: "Compliance", href: "#trust" },
  { label: "Pricing", href: "/pricing" },
];

export default function VitalNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{ backgroundColor: scrolled ? "rgba(10,22,40,0.95)" : "rgba(10,22,40,0.7)" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl transition-all duration-300 border-b border-white/5"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <VitalLogo />

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="/get-in-touch"
            className="text-sm text-white/70 hover:text-white transition-colors"
          >
            Sign in
          </a>
          <a
            href="/get-in-touch"
            style={{ backgroundColor: "#0EA5E9" }}
            className="text-sm text-white font-semibold px-5 py-2 rounded-full hover:opacity-90 transition-opacity"
          >
            Get Early Access
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-white/70 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {mobileOpen ? (
              <>
                <line x1="4" y1="4" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="18" y1="4" x2="4" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </>
            ) : (
              <>
                <line x1="3" y1="7" x2="19" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="3" y1="13" x2="19" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ backgroundColor: "#0A1628" }} className="md:hidden border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm text-white/70 hover:text-white py-1"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="/get-in-touch"
            style={{ backgroundColor: "#0EA5E9" }}
            className="text-sm text-white font-semibold px-5 py-2.5 rounded-full text-center mt-2 hover:opacity-90"
            onClick={() => setMobileOpen(false)}
          >
            Get Early Access
          </a>
        </div>
      )}
    </nav>
  );
}
