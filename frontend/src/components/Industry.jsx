import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

// ─── Markdown renderer ────────────────────────────────────────────────────────
function renderInline(text, key) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return (
    <span key={key}>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**"))
          return <strong key={i} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>;
        if (part.startsWith("*") && part.endsWith("*"))
          return <em key={i}>{part.slice(1, -1)}</em>;
        return part;
      })}
    </span>
  );
}

function parseMarkdown(text) {
  const lines = text.split("\n");
  const elements = [];
  let bulletBuf = [];
  let numberedBuf = [];

  const flushBullets = () => {
    if (!bulletBuf.length) return;
    elements.push(
      <ul key={elements.length} className="space-y-1.5 my-2 pl-1">
        {bulletBuf.map((item, i) => (
          <li key={i} className="flex gap-2 items-start text-sm text-gray-700 leading-relaxed">
            <span className="text-purple-500 font-bold mt-0.5 flex-shrink-0">•</span>
            <span>{renderInline(item, i)}</span>
          </li>
        ))}
      </ul>
    );
    bulletBuf = [];
  };

  const flushNumbered = () => {
    if (!numberedBuf.length) return;
    elements.push(
      <ol key={elements.length} className="space-y-1.5 my-2 pl-1">
        {numberedBuf.map((item, i) => (
          <li key={i} className="flex gap-2 items-start text-sm text-gray-700 leading-relaxed">
            <span className="text-purple-600 font-bold flex-shrink-0 min-w-[1.2rem]">{i + 1}.</span>
            <span>{renderInline(item, i)}</span>
          </li>
        ))}
      </ol>
    );
    numberedBuf = [];
  };

  for (const line of lines) {
    const t = line.trim();
    if (!t) {
      flushBullets(); flushNumbered();
      elements.push(<div key={elements.length} className="h-1.5" />);
      continue;
    }
    if (t.startsWith("### ")) {
      flushBullets(); flushNumbered();
      elements.push(<h4 key={elements.length} className="font-bold text-gray-900 text-sm mt-3 mb-0.5">{t.slice(4)}</h4>);
    } else if (t.startsWith("## ")) {
      flushBullets(); flushNumbered();
      elements.push(<h3 key={elements.length} className="font-extrabold text-gray-900 text-base mt-3 mb-1">{t.slice(3)}</h3>);
    } else if (t.startsWith("# ")) {
      flushBullets(); flushNumbered();
      elements.push(<h2 key={elements.length} className="font-extrabold text-gray-900 text-lg mt-3 mb-1">{t.slice(2)}</h2>);
    } else if (t.startsWith("- ") || t.startsWith("* ")) {
      flushNumbered();
      bulletBuf.push(t.slice(2));
    } else if (/^\d+\.\s/.test(t)) {
      flushBullets();
      numberedBuf.push(t.replace(/^\d+\.\s/, ""));
    } else {
      flushBullets(); flushNumbered();
      elements.push(<p key={elements.length} className="text-sm text-gray-700 leading-relaxed">{renderInline(t, elements.length)}</p>);
    }
  }
  flushBullets(); flushNumbered();
  return elements;
}
// import mindmapImg from "../assets/mindmap.png"; // Assuming you have this, otherwise using /mindmap.png as placeholder

const INDUSTRY_CONTEXT = {
  Healthcare: `
You are Stark, an AI business advisor for healthcare providers, built by Connect Gen AI.
Connect helps healthcare businesses with:
- Appointment scheduling
- Patient CRM
- Automated reminders via WhatsApp
- Billing, invoicing, and reports
- Staff management and analytics

Answer clearly and practically. Use markdown formatting: **bold** for key points, bullet lists for multiple items, and short headers (##) where helpful. Keep responses concise and actionable.
`,

  "Salon and Beauty": `
You are Stark, an AI growth and operations assistant for salons and beauty businesses, built by Connect Gen AI.
Connect helps salons with:
- Online bookings
- Stylist scheduling
- WhatsApp reminders and promotions
- Billing and POS
- Inventory tracking
- Customer loyalty and CRM

Be friendly, business-focused, and actionable. Use markdown: **bold** key terms, bullet lists for features, ## for section headers. Keep it concise.
`,

  "Dental Clinics": `
You are Stark, an AI operations and growth advisor for dental clinics, built by Connect Gen AI.
Connect helps dental clinics manage:
- Patient appointments
- Treatment tracking
- Automated follow-ups
- Billing and reports
- Staff scheduling

Keep responses professional and trust-oriented. Use markdown: **bold** for key points, bullet lists for multiple items, ## for section headers. Be concise.
`,

  // add more industries later
};

const businesses = [
  "Spa",
  "Salon & Beauty",
  "Hospitality",
  "F&B",
  "Healthcare",
  "Retail",
  "Education",
  "Real Estate",
  "Dental Clinic",
];
const questions = [
  "How can Connect help me grow my sales and revenue?",
  "Can Connect make my day‑to‑day operations more efficient?",
  "How does Connect help me keep track of my expenses and profits?",
  "Can Connect help me manage my staff and their schedules better?",
  "How will Connect improve the experience my customers have with my business?",
  "Can Connect bring my bookings, billing, and reports into one place?",
  "How does Connect reduce the manual work my team does every day?",
  "Can Connect work with the tools and systems I already use?",
  "How will Connect give me clear insights into how my business is performing?",
  "Is Connect easy for my team to learn and start using quickly?",
];

const MAINTENANCE_MESSAGE = `Stark is leveling up ⚡
Our Connect team is performing a quick maintenance upgrade.
Stark will return shortly with improved insights to serve your business better.`;

const Industry = () => {
  const businessRef = useRef(null);

  const [error, setError] = useState(false);

  const scrollRef = useRef(null); // Ref for the scrollable area
  const [index, setIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [industry, setIndustry] = useState("Healthcare");
  const [userPrompt, setUserPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  // States for the streaming effect
  const [fullResponse, setFullResponse] = useState("");
  const [displayedResponse, setDisplayedResponse] = useState("");

  // Auto-scroll to bottom when text changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayedResponse, loading]);

  // Typewriter / Streaming Effect
  useEffect(() => {
    if (fullResponse) {
      let i = 0;
      setDisplayedResponse(""); // Clear previous
      const interval = setInterval(() => {
        setDisplayedResponse((prev) => prev + fullResponse.charAt(i));
        i++;
        if (i >= fullResponse.length) clearInterval(interval);
      }, 15); // Adjust speed here (ms per character)
      return () => clearInterval(interval);
    }
  }, [fullResponse]);

  const handleAsk = async () => {
    if (!userPrompt.trim()) return;

    setLoading(true);
    setError(false);
    setDisplayedResponse("");
    setFullResponse("");

    setResponse("");

    const systemPrompt = INDUSTRY_CONTEXT[industry] || "";
    const finalPrompt = `${systemPrompt}\n\nUser question:\n${userPrompt}`;

    console.log("--- Frontend Debug ---");
    console.log(
      "Target URL:",
      `${import.meta.env.VITE_API_URL}/api/gemini/chat`
    );
    console.log("Sending Prompt:", finalPrompt);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/gemini/chat`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: finalPrompt }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setFullResponse(data.response); // Trigger the typewriter effect
    } catch (err) {
      console.error(err);

      setError(true);
      setFullResponse(MAINTENANCE_MESSAGE);
    } finally {
      setLoading(false);
    }
  };

  // Rotate questions
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuestion((prev) => (prev + 1) % questions.length);
    }, 4000); // change every 4 seconds
    return () => clearInterval(interval);
  }, []);

  // Rotate business index every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % businesses.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Animate text whenever it changes
  useEffect(() => {
    if (businessRef.current) {
      gsap.fromTo(
        businessRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [index]);

  return (
    <>
      <style>{`


.custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
        .animate-gradient { background-size: 200% 200%; animation: gradientShift 15s ease infinite; }
        @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
  .smooth-font {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Light white → sky blue moving background */
  .industry-bg {
    position: relative;
    overflow: hidden;
  }
  .industry-bg::before {
    content: "";
    position: absolute;
    inset: 0;
    background: "transparent";
    background-size: 300% 300%;
    animation: industryGradientDrift 5s ease-in-out infinite;
    z-index: -1;
  }
  @keyframes industryGradientDrift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  /* Chat UI Gradient Animation */
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

      {/* --- MAIN WRAPPER --- */}
      <div className="bg-transparent w-full py-12 flex flex-col font-display smooth-font items-center">
        {/* --- 1. COMMON HEADING (Moved outside the columns) --- */}
        <div className="w-full max-w-6xl px-6 lg:px-8 mb-12 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold tracking-tight text-gray-800">
            Naturally Integrates into your{" "}
            <span ref={businessRef} className="text-primary inline-block">
              {businesses[index]}
            </span>{" "}
            Business
          </h2>
        </div>

        {/* --- 2. SIDE-BY-SIDE CONTENT CONTAINER --- */}
        <div className="w-full max-w-7xl px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          {/* --- LEFT COLUMN: CHAT UI --- */}
          {/* Added h-[550px] for fixed height and w-full lg:w-1/2 for equal width columns */}
          {/* --- LEFT COLUMN: CHAT UI --- */}
          <div
            id="chatbot-section"
            className="w-full lg:w-1/2 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-xl h-[550px] rounded-xl shadow-2xl overflow-hidden">
              {/* Moving Gradient Background */}
              <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-purple-500 via-pink-500 to-blue-400 opacity-30 blur-3xl"></div>

              <div className="absolute inset-0 bg-surface-light dark:bg-surface-dark/60 border border-subtle-light dark:border-subtle-dark/50 backdrop-blur-lg rounded-xl z-10 p-6 flex flex-col">
                {/* 1. WRAPPER FOR SCROLLABLE CONTENT */}
                {/* flex-1 makes this take up all available space; overflow-y-auto enables the scrollbar */}
                <div
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto custom-scrollbar pr-2"
                >
                  {/* Instruction Line */}
                  <div className="text-center text-text-secondary-light dark:text-text-secondary-dark mb-6 z-20 relative">
                    <p className="text-sm sm:text-base font-medium">
                      Select your business type, then ask Stark anything about
                      your business.
                    </p>
                  </div>

                  {/* Dropdown */}
                  <div className="w-full mx-auto mb-6 relative z-20">
                    <select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full bg-surface-light/70 dark:bg-surface-dark/50 border border-subtle-light dark:border-subtle-dark/50 text-text-primary-light dark:text-text-primary-dark rounded-lg p-3 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                    >
                      {Object.keys(INDUSTRY_CONTEXT).map((key) => (
                        <option key={key}>{key}</option>
                      ))}
                    </select>
                  </div>

                  {/* Center Suggested Questions Box */}
                  <div className="flex items-center justify-center z-20 my-4">
                    <div className="w-full bg-surface-light/80 dark:bg-surface-dark/70 border border-subtle-light/80 dark:border-subtle-dark/70 rounded-xl px-4 py-4 shadow-sm flex items-start space-x-3 min-h-[100px]">
                      <span className="material-symbols-outlined text-primary mt-1">
                        lightbulb
                      </span>
                      <div className="flex-1 flex items-center h-full">
                        <p
                          key={currentQuestion}
                          className="text-sm sm:text-base font-medium text-text-primary-light dark:text-text-primary-dark italic animate-fadeIn"
                        >
                          “{questions[currentQuestion]}”
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* AI Response Display (Inside the scroll area) */}
                  {(displayedResponse || loading) && (
                    <div className="flex flex-col space-y-2 pb-4">
                      <div className="flex items-center space-x-2 text-primary">
                        <span className="material-symbols-outlined text-sm">auto_awesome</span>
                        <span className="text-xs font-bold uppercase tracking-wider">Stark AI</span>
                      </div>
                      <div
                        className={`rounded-2xl px-4 py-3 ${
                          error
                            ? "bg-yellow-50 border border-yellow-200 text-yellow-800"
                            : "bg-primary/5 border border-primary/10"
                        }`}
                      >
                        {loading && !displayedResponse ? (
                          <div className="flex items-center gap-2 text-sm text-gray-500 py-1">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                            <span className="ml-1">Analyzing...</span>
                          </div>
                        ) : error ? (
                          <p className="text-sm leading-relaxed text-center">{displayedResponse}</p>
                        ) : (
                          <div>{parseMarkdown(displayedResponse)}</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. YOUR ORIGINAL INPUT AREA (Outside the scrollable div, so it stays fixed at bottom) */}
                <div className="w-full bg-surface-light/70 dark:bg-surface-dark/50 p-3 rounded-xl border border-subtle-light dark:border-subtle-dark/50 backdrop-blur-lg flex items-center space-x-3 relative z-20 mt-4 shrink-0">
                  <span className="material-symbols-outlined text-primary ml-2">
                    auto_awesome
                  </span>
                  <textarea
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleAsk();
                      }
                    }}
                    className="flex-1 bg-transparent border-none focus:ring-0 resize-none text-text-primary-light dark:text-text-primary-dark placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark text-base font-light py-2 focus:outline-none"
                    placeholder="Ask anything about your business..."
                    rows={1}
                  />
                  <button
                    onClick={handleAsk}
                    disabled={loading}
                    className="w-10 h-10 flex items-center justify-center bg-primary rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-black">
                      {loading ? "hourglass_top" : "arrow_upward"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: MindMap Image --- */}
          {/* Added h-[550px] to match the chat UI height precisely */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
            <div className="w-full max-w-xl h-[550px] flex items-center justify-center p-4 rounded-xl relative">
              {/* Optional: Add a subtle background or shadow to the image container to match the chat UI box feel */}
              {/* <div className="absolute inset-0 bg-white/30 backdrop-blur-md rounded-xl shadow-xl z-0"></div> */}

              <img
                src="/mindmap.png"
                alt="MindMap Integration"
                // object-contain ensures the image fits within the 550px height without stretching
                className="w-full h-full object-contain relative z-10 drop-shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Industry;
