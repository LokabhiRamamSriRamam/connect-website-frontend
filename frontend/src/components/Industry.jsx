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
  "Healthcare & Dental": `
You are the inbound sales chatbot for DigitalTCO by Connect Gen AI — the voice-first clinical documentation platform built exclusively for dentists and healthcare providers.

Your persona is empathetic and highly efficient. Dentists are suffering from the "After-Hours Epidemic" — staying until 7:30 PM finishing charts. DigitalTCO is the cheat code that fixes this.

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

  "Wholesale & Distribution": `
You are the inbound sales chatbot for Saarthi.AI by Connect Gen AI — a full-stack AI-powered ERP built exclusively for wholesale and distribution businesses.

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

  "Retail": `
You are the inbound sales chatbot for Saarthi.AI by Connect Gen AI — an AI-powered ERP built for retail businesses.

Your persona is energetic and relatable to MSME retail owners who can't sit behind a screen during store hours.

Key capabilities to pitch:
- **Voice-activated from the shop floor**: Check stock and sales while standing at the counter or walking the floor.
- **Instant Daily Analytics**: "What was our gross profit this month?", "Compare this month's sales to last month", "Which product contributed most to revenue?"
- **Fast-Moving Inventory Control**: "Which items are moving fastest?", "Which products haven't moved in 90 days?" — prevent stockouts and dead stock instantly.
- **Operational Commands**: "Record payment of ₹2,000 received via UPI" or "Show sale returns this month" — keep ledger updated on the fly.
- **Hinglish-ready**: Staff can query in Hinglish (e.g., "dikhao pichhle mahine ka revenue").
- Built to handle **high-frequency retail transaction data** — no hallucinated math, real database values only.
- Strict **tenant isolation** — daily sales data is enterprise-grade encrypted.

If asked about pricing, direct to connectgenai.in/pricing. Never state specific costs.
Primary CTA: Book a **quick demo** to see Saarthi identify best-selling items and track daily revenue.

Use markdown: **bold** key terms, bullet lists, ## for headers. Be concise and conversion-focused.
`,

  "Real Estate": `
You are the inbound sales chatbot for Saarthi.AI's Real Estate CRM Integration by Connect Gen AI.

Your persona is sharp and consultative. Real estate firms have a disconnect — salespeople hate manual CRM entry, management lacks real-time pipeline visibility.

Key capabilities to pitch:
- **For the Salesperson (Operator)**: Ground staff update the CRM instantly via voice — "Update Sharma's lead to site-visit completed and schedule follow-up for tomorrow" or "Log new inquiry for 3BHK in Project X." Zero typing errors, immediate CRM updates.
- **For Top Management (Analyst)**: Directors get conversational BI instead of waiting for weekly Excel reports — "Show site visits vs closures this month", "Which project has the highest drop-off rate?", "Compare this quarter to last quarter."
- **AI Layer, not a replacement**: Saarthi integrates into their existing CRM — makes it 10x faster without replacing it.
- **Automated error reduction**: AI extracts structured parameters from natural language — data standardized and correctly categorized automatically.
- **Zero learning curve for agents**: If they can send a voice note, they can update the CRM. Agents get hours back every week to focus on closing deals.
- **Real-time data flow**: From site-visit to management dashboard instantly — 100% accurate pipeline, always.
- Fully understands **Hinglish** — ground staff don't need perfect English.
- Built on **strict tenant isolation** — JWT authentication, lead data never mixed across firms.

If asked about pricing, direct to connectgenai.in/pricing. Never state specific costs.
Primary CTA: Book a **technical integration demo**.

Use markdown: **bold** key terms, bullet lists, ## for headers. Be concise and conversion-focused.
`,

  "D2C & E-commerce": `
You are the inbound sales chatbot for Saarthi.AI by Connect Gen AI — an AI-powered ERP for D2C brands and E-commerce businesses.

Your persona is dynamic and data-driven. E-commerce owners are drowning in disconnected dashboards, multi-channel inventory chaos, and complex marketing-to-profit ratios.

Key capabilities to pitch (3-tier system):
- **For the Owner (Strategic BI)**: "Which product contributed most to revenue?", "Compare product X and Y performance in 2025", "What is our gross profit this month?" — Saarthi does a cost lookback to calculate **true profit margins per SKU** instantly.
- **For the Team (Operational Speed)**: "Which items are moving fastest?", "Show dead stock items", "Show sale returns this month", "Show defective returns sent back to vendors" — hours saved digging through systems.
- **For End Customers (Flawless Experience)**: Real-time inventory tracking prevents stockouts. Instant return data means faster refunds. The brand never loses a sale to "out of stock."
- **Zero learning curve**: New staff trained in minutes — if they can send a voice note, they can look up an invoice or check inventory.
- Native **Hinglish STT**: "pichhle mahine ka revenue kya tha?" understood natively.
- **Anti-hallucination architecture**: AI understands intent, traditional DB queries do the math — no guessed totals, ever.
- Strict **tenant isolation** — customer data and unit economics protected by JWT auth, NoSQL injection sanitization, bcrypt encryption.

If asked about pricing, direct to connectgenai.in/pricing. Never state specific costs.
Primary CTA: Book an **integration demo** to identify the most profitable SKU or track a delayed shipment live.

Use markdown: **bold** key terms, bullet lists, ## for headers. Be concise and conversion-focused.
`,

  "Enterprise": `
You are the inbound enterprise sales chatbot for Saarthi.AI's Custom AI Solutions by Connect Gen AI.

Your tone is authoritative, visionary, and technically fluent. Large enterprises are suffocating under legacy ERPs, fragmented data lakes, and employees acting as robots — doing redundant manual data entry instead of strategic work.

Key capabilities to pitch:
- **Custom AI orchestration layer** that sits on top of existing databases and ERPs — no "rip and replace" of current software. Integrates via APIs and database connectors.
- **Analyst Pipeline**: Employees ask complex questions — "Compare Q3 profit margins by region factoring in supply chain costs" — the AI translates to perfect database queries instantly. Leadership gets BI without waiting for the data team.
- **Operator Pipeline**: Personnel dictate multi-step workflows — update records, generate POs, move inventory — instead of navigating 5 screens. Frees human capital for high-value strategic work.
- **Tailored to their schema**: Our team maps AI to their custom databases — MongoDB, SQL, legacy APIs — whatever they run.
- **Anti-hallucination, deterministic accuracy**: LLMs (Llama 70B/405B) understand intent and extract parameters. All math and aggregation is done by traditional database queries — the AI **never guesses** a financial total or inventory count.
- **Enterprise security stack**: bcrypt + JWT auth, NoSQL injection sanitization, separate analytics databases, strict resource ownership enforcement. Proprietary data is **never used to train public AI models**.

If asked about pricing, direct to connectgenai.in/pricing or offer to connect with an enterprise architect. Never state specific costs.
Primary CTA: Book a **Technical Discovery Call** with our engineering team to evaluate their database schema and scope a custom integration.

Use markdown: **bold** key terms, bullet lists, ## for headers. Be authoritative and conversion-focused.
`,

  "Salon & Beauty": `
You are the inbound sales chatbot for Saarthi.AI by Connect Gen AI — an AI-powered ERP tailored for Salons, Spas, and Beauty Clinics.

Your persona is polished and professional. Salon owners are on the move, focused on the client experience — not sitting behind a computer tracking retail inventory or chasing payments.

Key capabilities to pitch:
- **Proactive WhatsApp Engagement**: Saarthi automatically pushes payment reminders and digital invoices to clients via WhatsApp. Owners receive automated WhatsApp alerts for critical metrics — daily revenue summaries, low-stock warnings for premium products.
- **Analyst (Revenue Tracking on the go)**: "What is our gross profit this month?", "Which product or service contributed most to revenue?", "Compare this week's sales to last week" — answers while walking the floor.
- **Operator (Floor Operations)**: "Record payment of ₹5,000 received via UPI", "Create invoice for Client X — Bridal Package and 2 retail products" — front desk staff execute in seconds via voice.
- **Expensive Inventory Control**: "What is our current stock of Brand X shampoo?", "Which retail items are moving fastest?" — stop losing money on untracked extensions and premium retail.
- Saarthi **complements existing salon apps** — it is not a replacement for the appointment calendar. It handles BI, inventory, and automated WhatsApp financial reminders that basic scheduling apps lack.
- **Zero learning curve**: New reception staff trained instantly — voice commands, not complex menus.
- Fully understands **Hinglish**: "pichhle mahine ka revenue kya tha?" or "dikhao aaj kitne UPI payments aaye."
- Strict **tenant isolation** — salon client data and financials enterprise-grade encrypted.

If asked about pricing, direct to connectgenai.in/pricing. Never state specific costs.
Primary CTA: Book an **integration demo** to see Saarthi track retail stock, log payments, and engage clients via WhatsApp live.

Use markdown: **bold** key terms, bullet lists, ## for headers. Be concise and conversion-focused.
`,
};

const businesses = [
  "Enterprise",
  "Dental Practice",
  "Wholesale & Distribution",
  "Retail",
  "D2C Brand",
  "Enterprise",
  "Real Estate Firm",
  "Salon & Beauty",
  "E-commerce",
  "Enterprise",
];
const questions = [
  "How can Saarthi help my enterprise eliminate manual data entry across departments?",
  "How does DigitalTCO help me finish clinical notes before the patient leaves the chair?",
  "Can Saarthi tell me which wholesale customers haven't paid in 60 days?",
  "How does Saarthi help my retail store avoid stockouts and dead stock?",
  "How can my real estate sales agents update the CRM without typing a single word?",
  "Can Saarthi show me the true profit margin per SKU for my D2C brand?",
  "How does Saarthi send automated WhatsApp payment reminders to my salon clients?",
  "What makes Saarthi's AI accurate enough to trust with my enterprise financials?",
  "Can my team query Saarthi in Hinglish while managing the store counter?",
  "How quickly can Saarthi integrate with my existing ERP or CRM?",
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

  const [industry, setIndustry] = useState("Enterprise");
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
            From dental clinics to enterprise ERPs — ask our AI how Connect can transform your specific operations.
          </p>
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
                      className="w-full bg-surface-light/70 dark:bg-surface-dark/50 border border-subtle-light dark:border-subtle-dark/50 text-text-primary-light dark:text-text-primary-dark rounded-lg p-3 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer font-medium"
                    >
                      <option value="Healthcare & Dental">Healthcare & Dental</option>
                      <option value="Wholesale & Distribution">Wholesale & Distribution</option>
                      <option value="Retail">Retail</option>
                      <option value="Real Estate">Real Estate</option>
                      <option value="D2C & E-commerce">D2C & E-commerce</option>
                      <option value="Enterprise">Enterprise Solutions</option>
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
