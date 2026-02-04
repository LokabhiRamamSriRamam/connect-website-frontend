import React from "react";

const Footer = ({ enableGradient = false }) => {
  return (
    <footer className="relative overflow-hidden py-12">
      {/* Optional Animated Gradient Overlay */}
      {enableGradient && (
        <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-purple-500 via-pink-500 to-blue-400 opacity-20 blur-3xl" />
      )}

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Connect-Gen AI
          </h1>
          <p className="text-sm text-gray-700">Connect. Convert. Grow.</p>
        </div>

        {/* Address */}
        <div className="space-y-1 text-sm text-gray-700">
          <p className="font-semibold text-gray-900">Headquarters</p>
          <p>Mumbai, Maharashtra</p>
          <p>
            LBS Marg, C/26, Ishwar Nagar,
            <br />
            Mumbai, Maharashtra 400078, IN
          </p>
        </div>

        {/* Contact */}
        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <span className="font-semibold text-gray-900">Phone:</span>{" "}
            +91 9967392920
          </p>
          <p>
            <span className="font-semibold text-gray-900">Email:</span>{" "}
            sales@connectgenai.in
          </p>
          <p>
            <span className="font-semibold text-gray-900">Support:</span>{" "}
            support@connectgenai.in
          </p>

          <div className="flex items-center gap-4">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/connect-gen-ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 hover:opacity-100 transition-opacity"
            >
              <img
                src="/Integrations/linkedin.svg"
                alt="Connect-Gen AI on LinkedIn"
                className="h-6 w-6"
              />
            </a>

            {/* Facebook */}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 hover:opacity-100 transition-opacity"
            >
              <img
                src="/Integrations/fb.png"
                alt="Connect-Gen AI on Facebook"
                className="h-6 w-6"
              />
            </a>

            {/* Instagram */}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 hover:opacity-100 transition-opacity"
            >
              <img
                src="/Integrations/ig.png"
                alt="Connect-Gen AI on Instagram"
                className="h-6 w-6"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 text-center text-xs text-gray-600 relative z-10">
        © {new Date().getFullYear()} Sreeji Growth Advisory. All rights reserved.
      </div>

      {/* Animation */}
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientShift 15s ease infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
