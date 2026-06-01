import React, { useEffect, useRef, useState } from "react";

const SOAP_LINES = [
  { label: "S", text: "Patient reports persistent dry cough for 3 weeks, mild fatigue, no fever." },
  { label: "O", text: "BP 118/76, HR 72 bpm, SpO2 99%, lungs clear to auscultation bilaterally." },
  { label: "A", text: "Likely post-viral cough. Rule out ACE-inhibitor induced cough, GERD." },
  { label: "P", text: "Trial of honey/lemon, follow up in 2 weeks. CXR if no improvement." },
];

function TypedLine({ text, delay = 0, onDone }) {
  const [displayed, setDisplayed] = useState("");
  const idx = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        idx.current += 1;
        setDisplayed(text.slice(0, idx.current));
        if (idx.current >= text.length) {
          clearInterval(interval);
          if (onDone) onDone();
        }
      }, 18);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [text, delay]);

  return <span>{displayed}</span>;
}

function SOAPCard() {
  const [currentLine, setCurrentLine] = useState(0);

  return (
    <div
      className="rounded-2xl overflow-hidden shadow-2xl"
      style={{ backgroundColor: "#0D1F35", border: "1px solid rgba(14,165,233,0.2)" }}
    >
      {/* Header bar */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ backgroundColor: "#0A1628", borderBottom: "1px solid rgba(14,165,233,0.15)" }}
      >
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
        <div className="w-3 h-3 rounded-full bg-green-400/70" />
        <span className="ml-3 text-xs text-white/40 font-mono">vital_note_001.txt</span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(14,165,233,0.15)", color: "#0EA5E9" }}>
            AI generating…
          </span>
        </div>
      </div>

      {/* SOAP content */}
      <div className="p-5 font-mono text-sm space-y-4">
        {SOAP_LINES.map((line, i) => (
          <div key={line.label} className={`transition-opacity duration-300 ${i > currentLine ? "opacity-20" : "opacity-100"}`}>
            <div className="flex gap-3">
              <span
                className="font-bold text-xs px-2 py-0.5 rounded mt-0.5 h-fit shrink-0"
                style={{ backgroundColor: "rgba(14,165,233,0.2)", color: "#0EA5E9" }}
              >
                {line.label}
              </span>
              <p className="text-white/80 leading-relaxed text-xs">
                {i < currentLine ? (
                  line.text
                ) : i === currentLine ? (
                  <TypedLine
                    text={line.text}
                    delay={i * 100}
                    onDone={() => setTimeout(() => setCurrentLine((c) => Math.min(c + 1, SOAP_LINES.length - 1)), 400)}
                  />
                ) : null}
              </p>
            </div>
          </div>
        ))}

        {/* Cursor blink */}
        {currentLine < SOAP_LINES.length && (
          <span className="inline-block w-1.5 h-4 bg-sky-400 animate-pulse ml-1 align-middle" />
        )}
      </div>

      {/* Footer */}
      <div
        className="flex items-center justify-between px-4 py-2.5 text-xs text-white/30"
        style={{ borderTop: "1px solid rgba(14,165,233,0.1)" }}
      >
        <span>EHR-ready export</span>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span>Live transcription</span>
        </div>
      </div>
    </div>
  );
}

export default function VitalHero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      style={{ backgroundColor: "#0A1628" }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(14,165,233,0.12) 0%, transparent 70%)",
        }}
      />
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-24 w-full grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT — copy */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium"
            style={{ borderColor: "rgba(14,165,233,0.3)", color: "#0EA5E9", backgroundColor: "rgba(14,165,233,0.08)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            Now in early access
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
            Clinical intelligence<br />
            <span style={{ color: "#0EA5E9" }}>for every practice.</span>
          </h1>

          <p className="text-lg text-white/60 leading-relaxed max-w-lg">
            From consultation to billing, VITAL.AI works the way clinicians think —
            listening, documenting, coding, and coordinating so you can focus on patients.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="/get-in-touch"
              style={{ backgroundColor: "#0EA5E9" }}
              className="inline-flex items-center gap-2 text-white font-semibold px-7 py-3.5 rounded-full hover:opacity-90 transition-opacity text-sm"
            >
              Start Free
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="/get-in-touch"
              className="inline-flex items-center gap-2 text-white/70 font-medium px-7 py-3.5 rounded-full border border-white/15 hover:border-white/30 hover:text-white transition-all text-sm"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
                <path d="M6.5 5.5l4 2.5-4 2.5V5.5z" fill="currentColor" />
              </svg>
              Watch Demo
            </a>
          </div>

          <div className="flex items-center gap-6 pt-2">
            {[
              { val: "< 60s", label: "Note generation" },
              { val: "3+ hrs", label: "Saved daily" },
              { val: "HIPAA", label: "Compliant" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-xl font-bold text-white">{s.val}</p>
                <p className="text-xs text-white/40">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — animated SOAP note card */}
        <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
          <SOAPCard />
          {/* Floating mic badge */}
          <div
            className="mt-4 flex items-center gap-3 px-4 py-3 rounded-xl"
            style={{ backgroundColor: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.15)" }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: "rgba(14,165,233,0.2)" }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="5" y="1" width="6" height="9" rx="3" fill="#0EA5E9" />
                <path d="M2 7c0 3.314 2.686 6 6 6s6-2.686 6-6" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="8" y1="13" x2="8" y2="15" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-medium text-white/80">Dictate naturally in any language</p>
              <p className="text-xs text-white/40">VITAL.AI structures it for your EHR</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
