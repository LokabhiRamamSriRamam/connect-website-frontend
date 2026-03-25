import React from "react";
import { useLocation, Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";

const GRADIENT_STYLE = `
  .saarthi-gradient {
    background: linear-gradient(120deg, rgba(255,240,245,1), rgba(224,240,255,1), rgba(255,255,255,1));
    background-size: 300% 300%;
    animation: saarthiGradientShift 15s ease infinite;
  }
  @keyframes saarthiGradientShift {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const glassCard = {
  background: "rgba(255,255,255,0.60)",
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  border: "1px solid rgba(255,255,255,0.70)",
};

export default function SaarthiSuccess() {
  const location = useLocation();
  const user = location.state?.user;

  const firstName = user?.name?.split(" ")[0] || "Aap";

  return (
    <>
      <style>{GRADIENT_STYLE}</style>
      <div className="saarthi-gradient min-h-screen pt-24 pb-12 px-4 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="rounded-2xl p-7 sm:p-10 shadow-2xl text-center" style={glassCard}>

            {/* Success icon */}
            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-purple-600" />
              </div>
            </div>

            {/* Section label */}
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="h-1.5 w-5 bg-purple-500 rounded-full" />
              <span className="text-xs font-semibold tracking-[0.2em] text-gray-500 uppercase">
                Saarthi · Shukriya
              </span>
              <div className="h-1.5 w-5 bg-purple-500 rounded-full" />
            </div>

            {/* Heading */}
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 mb-3">
              {firstName} ji, aapki request mil gayi!
            </h1>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-2">
              Hamari Saarthi team ne aapki details note kar li hain.
            </p>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
              Hum jald hi aapse personally sampark karenge — aur aapke business ke liye ek customized plan taiyaar karenge.
            </p>

            {/* User detail card */}
            {user && (
              <div className="bg-gray-50 rounded-xl p-4 text-left mb-7 border border-gray-100 space-y-2">
                {[
                  { label: "Naam", value: user.name },
                  { label: "Company", value: user.companyName },
                  { label: "Mobile", value: user.mobile },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-gray-400 font-medium">{label}</span>
                    <span className="text-gray-800 font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* What happens next */}
            <div className="text-left mb-7">
              <p className="text-xs font-semibold tracking-[0.15em] text-gray-500 uppercase mb-3">
                Aage kya hoga
              </p>
              <div className="space-y-3">
                {[
                  "Hamara ek Saarthi specialist 24 ghante ke andar call karega.",
                  "Aapke business ki specific situation samjhi jaayegi.",
                  "Ek personalized plan suggest kiya jaayega — bilkul free.",
                ].map((step, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold text-xs">
                      {i + 1}
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA back home */}
            <Link
              to="/"
              className="flex items-center justify-center gap-2 w-full bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white py-4 rounded-xl font-bold text-sm uppercase tracking-wider shadow-lg transition-colors"
            >
              Connect Gen AI Homepage <ArrowRight className="w-4 h-4" />
            </Link>

            <p className="text-xs text-gray-400 mt-4">
              Koi sawaal ho toh{" "}
              <Link to="/get-in-touch" className="text-purple-500 underline">
                yahan likhein
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
