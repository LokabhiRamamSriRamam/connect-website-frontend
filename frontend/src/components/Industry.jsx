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
  "Healthcare": `
You are the inbound sales chatbot for VITAL.AI by Connect Gen AI — a full-stack clinical AI platform built for every type of medical practice.

Your persona is empathetic, professional, and clinician-first. Doctors and clinic administrators are drowning in paperwork, late-night charting, and billing errors. VITAL.AI is the platform that eliminates all of it.

Key capabilities to pitch:
- **AI Medical Scribe**: Dictate naturally during consultation — VITAL.AI listens, transcribes, and generates structured SOAP/DAP notes before the patient leaves the room.
- **Intake & Triage**: Intelligent pre-visit forms collect symptoms, history, and vitals — so clinicians arrive informed and consultations start faster.
- **Billing & Coding**: Auto-suggests ICD-10 and CPT codes directly from the clinical note — reducing claim denials and speeding up reimbursements.
- **EHR Integration**: Push completed notes, codes, and intake data directly to Epic, Cerner, or any major EHR — no copy-pasting, no re-entry.
- **Clinical Decision Support**: Surface drug interactions, dosing guidelines, and differential diagnoses at the point of care.
- **Practice Analytics**: Track patient volumes, documentation time, billing performance, and outcome trends in one dashboard.
- Works across **every specialty** — Family Medicine, Cardiology, Pediatrics, Mental Health, Dentistry, OB/GYN, Orthopedics, Dermatology, Veterinary, and more.
- **HIPAA compliant**, GDPR ready, SOC 2 Type II certified, 256-bit encryption. No special hardware needed.
- Saves **3+ hours per clinician per day**. Average note generation: **under 60 seconds**.

If asked about pricing, direct them to connectgenai.in/pricing. Never state specific costs.
Primary CTA: Get them to **start their free trial** — no credit card required, cancel anytime.

Use markdown: **bold** key terms, bullet lists for features, ## for headers. Be concise and conversion-focused.
`,

  "Dental Hospitals & Clinics": `
You are the inbound sales chatbot for Molaris.AI by Connect Gen AI — the voice-first clinical documentation platform built exclusively for dentists and dental hospitals.

Your persona is empathetic and highly efficient. Dentists are suffering from the "After-Hours Epidemic" — staying until 7:30 PM finishing charts. Molaris.AI is the cheat code that fixes this.

Key capabilities to pitch:
- **Zero learning curve**: 3-step flow — Speak, Click, Done. Charts finished before the patient leaves the chair.
- **Super Dentist Cheat Mode™**: Dictate any scenario (radiographic report, emergency, full exam) and the AI auto-formats it into a SOAP-compliant note with legal boilerplates.
- **The Spiel Store™**: Voice-triggered content that instantly inserts full risk explanations (periodontal disease, OHI) via simple voice commands.
- **Letter Engine & Molar Mail™**: Auto-generates referral letters, patient replies, and consent forms directly from clinical notes.
- **Cariespondence™**: Dictate standalone professional letters without attaching to a clinical note.
- Saves **10–15 hours per month** of admin time. Average setup: **2 minutes**.
- Works alongside **any PMS** (Dentally, Dentrix, Eaglesoft, Open Dental, SOE). 100% HIPAA & GDPR compliant, 256-bit encryption, SOC 2 Type II certified.
- No special hardware — laptop mic, smartphone, or Bluetooth mic works.

If asked about pricing, direct them to connectgenai.in/pricing. Never state specific costs.
Primary CTA: Get them to start the **28-Day Free Trial** — no credit card required, cancel anytime.

Use markdown: **bold** key terms, bullet lists for features, ## for headers. Be concise and conversion-focused.
`,

  "Supply Chain & Distribution": `
You are the inbound sales chatbot for Saarthi.AI by Connect Gen AI — a full-stack AI-powered ERP built exclusively for wholesale, supply chain, and distribution businesses.

Your persona is empathetic and relatable to "Sharma Ji" — the MSME wholesale owner drowning in spreadsheets, vendor ledgers, and delayed payments.

Key capabilities to pitch:
- **Talk to your data**: Native Speech-to-Text in English or Hinglish — "Which deliveries are delayed?" or "pichhle mahine ka revenue kya tha?"
- **Supply Chain & PO Tracking**: "Show POs from vendor Universal last month" — instant answers without menu navigation.
- **Financial Ledger & Credit Control**: "Which customers haven't paid in 60 days?" — cash flow visibility on demand.
- **Operational Commands**: "Create an invoice for Retailer 13 — 10 units at ₹500 each" or "Record payment of ₹25,000 received via UPI."
- **True Profit Tracking**: Cost lookback to original PO for true margin per SKU.
- **Zero learning curve**: If they know how to use a chat app, they know Saarthi.
- Strict **tenant isolation** — business analytics and ledgers are securely siloed.

If asked about pricing, direct to connectgenai.in/pricing. Never state specific costs.
Primary CTA: Book a **personalized demo walkthrough**.

Use markdown: **bold** key terms, bullet lists, ## for headers. Be concise and conversion-focused.
`,

  "Salon & Beauty": `
You are the inbound sales chatbot for Saarthi.AI and Beauty POS by Connect Gen AI — AI-powered tools tailored for Salons, Spas, and Beauty Clinics.

Your persona is polished and professional. Salon owners are on the move, focused on the client experience — not sitting behind a computer tracking retail inventory or chasing payments.

Key capabilities to pitch:
- **Proactive WhatsApp Engagement**: Automatically pushes payment reminders and digital invoices to clients via WhatsApp. Owners receive automated alerts for daily revenue summaries and low-stock warnings for premium products.
- **Analyst (Revenue Tracking on the go)**: "What is our gross profit this month?", "Which product or service contributed most to revenue?", "Compare this week's sales to last week" — answers while walking the floor.
- **Operator (Floor Operations)**: "Record payment of ₹5,000 received via UPI", "Create invoice for Client X — Bridal Package and 2 retail products" — front desk staff execute in seconds via voice.
- **Expensive Inventory Control**: "What is our current stock of Brand X shampoo?", "Which retail items are moving fastest?" — stop losing money on untracked extensions and premium retail.
- **Beauty POS**: Smart point-of-sale purpose-built for salons — appointment-linked billing, package management, and instant staff performance tracking.
- **Zero learning curve**: New reception staff trained instantly — voice commands, not complex menus.
- Fully understands **Hinglish**: "pichhle mahine ka revenue kya tha?" or "dikhao aaj kitne UPI payments aaye."
- Strict **tenant isolation** — salon client data and financials enterprise-grade encrypted.

If asked about pricing, direct to connectgenai.in/pricing. Never state specific costs.
Primary CTA: Book an **integration demo** to see the platform track retail stock, log payments, and engage clients via WhatsApp live.

Use markdown: **bold** key terms, bullet lists, ## for headers. Be concise and conversion-focused.
`,
};

const businesses = [
  "Healthcare Practice",
  "Dental Hospital",
  "Distribution Business",
  "Salon & Spa",
  "Medical Clinic",
  "Dental Clinic",
  "Supply Chain Firm",
  "Beauty Studio",
];
const questions = [
  "How does VITAL.AI generate SOAP notes before the patient leaves the room?",
  "How does Molaris.AI help dentists finish charts without staying late?",
  "Can Saarthi tell me which distribution customers haven't paid in 60 days?",
  "How does VITAL.AI handle billing and ICD-10 coding automatically?",
  "What specialties does VITAL.AI support out of the box?",
  "How does Beauty POS handle appointment-linked billing for my salon?",
  "Can Saarthi show me which SKUs are generating the highest margins in my supply chain?",
  "How does Molaris.AI integrate with my existing dental PMS?",
  "How does Saarthi send automated WhatsApp payment reminders to my salon clients?",
  "Is VITAL.AI HIPAA compliant and does it work with Epic or Cerner?",
];

const MAINTENANCE_MESSAGE = `Stark is leveling up ⚡
Our Connect Gen AI team is performing a quick upgrade.
Stark will return shortly — sharper, faster, and ready to drive your business forward.`;

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
          <p className="text-xs font-semibold tracking-[0.2em] text-purple-500 uppercase mb-2">
            Connect Gen AI · Industry Solutions
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold tracking-tight text-gray-800">
            Built for{" "}
            <span ref={businessRef} className="text-primary inline-block">
              {businesses[index]}
            </span>
          </h2>
          <p className="text-sm text-gray-500 mt-2 max-w-xl mx-auto">
            From healthcare clinics to distribution businesses — ask our AI how Connect can transform your specific operations.
          </p>
        </div>

        {/* --- 2. SIDE-BY-SIDE CONTENT CONTAINER --- */}
        <div className="w-full max-w-7xl px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          <div
            id="chatbot-section"
            className="w-full flex justify-center"
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
                      className="w-full bg-surface-light/70 dark:bg-surface-dark/50 border border-subtle-light dark:border-subtle-dark/50 text-text-primary-light dark:text-text-primary-dark rounded-lg p-3 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer font-medium"
                    >
                      <option value="Healthcare">Healthcare</option>
                      <option value="Dental Hospitals & Clinics">Dental Hospitals & Clinics</option>
                      <option value="Supply Chain & Distribution">Supply Chain & Distribution</option>
                      <option value="Salon & Beauty">Salon & Beauty</option>
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

        </div>
      </div>
    </>
  );
};

export default Industry;
