import React, { useState, useEffect, useRef } from "react";

const CONNECT_LOGO_SRC = "/connect.png";

const THEMES = {
  salon: {
    bg: "bg-pink-600/90",
    text: "text-white",
  },
  healthcare: {
    bg: "bg-emerald-600/90",
    text: "text-white",
  },
  finance: {
    bg: "bg-indigo-700/90",
    text: "text-white",
  },
  light: {
    bg: "bg-white/80",
    text: "text-gray-900",
  },
  dark: {
    bg: "bg-gray-900/80",
    text: "text-white",
  },
};

const industries = [
  { name: "Healthcare & Dental", icon: "/industry/healthcare.svg", slug: "/industry/healthcare" },
  { name: "Wholesale & Distribution", icon: "/industry/d2c.svg", slug: "/industry/ecommerce" },
  { name: "Retail", icon: "/industry/salon.svg", slug: "/industry/salon" },
  { name: "Real Estate", icon: "/industry/realestate.svg", slug: "/industry/realestate" },
  { name: "D2C & E-commerce", icon: "/industry/d2c.svg", slug: "/industry/ecommerce" },
  { name: "Enterprise Solutions", icon: "/industry/finance.svg", slug: "/industry/finance" },
  { name: "Salon & Beauty", icon: "/industry/salon.svg", slug: "/industry/salon" },
];

const products = {
  core: [
    {
      name: "Saarthi.AI",
      desc: "Conversational ERP & BI for MSMEs and Enterprises",
      slug: "/products/saarthi",
    },
    {
      name: "DigitalTCO",
      desc: "Voice-first clinical documentation for dentists",
      slug: "/products/digitaltco",
    },
  ],
};

const desktopLinks = ["Pricing", "Careers", "Industries", "Products"];

const TopNav = ({ variant = "glass", theme = "dark" }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

  const themeClasses = THEMES[theme] || THEMES.light;

  return (
    <nav
      className={`
        fixed top-6 left-1/2 -translate-x-1/2 z-50
        w-[95%] max-w-6xl
        rounded-full px-4 py-2
        flex items-center justify-between
        transition-all duration-500 backdrop-blur-xl
        ${themeClasses.bg}
        ${themeClasses.text}
        ${variant === "solid" ? "shadow-xl" : "bg-opacity-40"}
      `}
    >
      {/* MOBILE */}
      <div className="flex lg:hidden items-center justify-between w-full relative">
        {/* Hamburger Button */}
        {/* Hamburger Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-full hover:bg-white/10"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Logo */}
        <a href="/">
          <img src={CONNECT_LOGO_SRC} alt="Connect" className="h-7" />
        </a>

        {/* Book Demo */}
        <a
          href="/get-in-touch"
          className="bg-purple-600 text-white text-xs px-4 py-2 rounded-full"
        >
          Book Demo
        </a>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900/90 backdrop-blur-xl rounded-xl shadow-xl p-4 flex flex-col space-y-2 z-50">
            {/* Desktop links */}
            {desktopLinks.map((link) => (
              <div key={link} className="relative">
                {link === "Industries" && (
                  <div>
                    <p className="font-semibold text-white mb-1">Industries</p>
                    {industries.map((ind) => (
                      <a
                        key={ind.name}
                        href={ind.slug}
                        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-800 text-white"
                      >
                        <img src={ind.icon} className="w-5 h-5 invert" />
                        <span>{ind.name}</span>
                      </a>
                    ))}
                  </div>
                )}

                {link === "Products" && (
                  <div>
                    <p className="font-semibold text-white mb-1">Products</p>
                    {products.core.map((item) => (
                      <a
                        key={item.name}
                        href={item.slug}
                        className="block px-3 py-2 rounded-lg hover:bg-gray-800 text-white"
                      >
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-white/50">{item.desc}</p>
                      </a>
                    ))}
                  </div>
                )}
                {link !== "Industries" && link !== "Products" && (
                  <a
                    href={
                      link === "Careers"
                        ? "/careers"
                        : link === "Pricing"
                        ? "/pricing"
                        : "#"
                    }
                    className="block px-3 py-2 rounded-lg hover:bg-gray-800 text-white"
                  >
                    {link}
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* DESKTOP */}
      <div className="hidden lg:flex items-center justify-between w-full">
        <a href="/">
          <img src={CONNECT_LOGO_SRC} alt="Connect" className="h-8 invert" />
        </a>

        <div className="flex items-center space-x-6">
          {desktopLinks.map((link) => (
            <div key={link} className="relative group">
              {link === "Industries" && (
                <>
                  <button className="text-sm font-medium">Industries</button>
                  <div className="absolute top-full left-0 mt-2 bg-gray-900 rounded-xl shadow-lg py-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                    {industries.map((ind) => (
                      <a
                        key={ind.name}
                        href={ind.slug} // <-- link to the industry page
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-800 text-white"
                      >
                        <img src={ind.icon} className="w-5 h-5 invert" />
                        <span>{ind.name}</span>
                      </a>
                    ))}
                  </div>
                </>
              )}

              {link === "Products" && (
                <>
                  <button className="text-sm font-medium">Products</button>
                  <div className="absolute top-full left-0 mt-2 w-72 bg-gray-900 rounded-xl shadow-xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                    <p className="text-xs uppercase text-white/50 mb-3 tracking-widest">
                      Our Products
                    </p>
                    {products.core.map((item) => (
                      <a
                        key={item.name}
                        href={item.slug}
                        className="block p-3 rounded-lg hover:bg-gray-800 text-white mb-1"
                      >
                        <p className="font-semibold text-sm">{item.name}</p>
                        <p className="text-xs text-white/50 mt-0.5">{item.desc}</p>
                      </a>
                    ))}
                  </div>
                </>
              )}

              {link !== "Industries" && link !== "Products" && (
                <a
                  href={
                    link === "Careers"
                      ? "/careers"
                      : link === "Pricing"
                      ? "/pricing"
                      : "#"
                  }
                  className="text-sm font-medium"
                >
                  {link}
                </a>
              )}
            </div>
          ))}
        </div>

        <a
          href="/get-in-touch"
          className="bg-purple-600 text-white text-sm px-6 py-2 rounded-full"
        >
          Book Demo
        </a>
      </div>
    </nav>
  );
};

export default TopNav;
