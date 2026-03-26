import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  ArrowRight, RotateCcw, TrendingDown, AlertTriangle,
  Lightbulb, Target, Download, Share2, MessageCircle,
  Mail, MessageSquare, Copy, Check, ChevronDown, ChevronUp,
} from "lucide-react";
import * as XLSX from "xlsx";

// ─── Helpers ────────────────────────────────────────────────────────────────

const formatINR = (num) =>
  `₹${Math.round(Number(num)).toLocaleString("en-IN")}`;

const calculateReport = ({ monthlySales, inventoryValue, slowStockPct, marginPct, restockDays }) => {
  const ms = Number(monthlySales);
  const iv = Number(inventoryValue);
  const ss = Number(slowStockPct);
  const mg = Number(marginPct);
  const rd = Number(restockDays);
  if (iv === 0) return null;
  const inventoryTurnover = ms / iv;
  const deadStock         = iv * (ss / 100);
  const daysToSell        = 30 / inventoryTurnover;
  const monthlyLeakage    = (deadStock * (mg / 100)) / 3;
  return {
    monthlySales: ms, inventoryValue: iv, slowStockPct: ss, marginPct: mg, restockDays: rd,
    inventoryTurnover: parseFloat(inventoryTurnover.toFixed(2)),
    deadStock:         Math.round(deadStock),
    daysToSell:        Math.round(daysToSell),
    monthlyLeakage:    Math.round(monthlyLeakage),
  };
};

const getInsights = (r) => {
  const insights = [];
  if (r.inventoryTurnover < 1) {
    insights.push("Inventory turnover अभी काफ़ी slow है। इसका मतलब यह है कि आपकी working capital माल में बंद है और liquidity पे असर पड़ रहा है।");
  } else if (r.inventoryTurnover < 2) {
    insights.push("माल घूम रहा है, लेकिन थोड़ा और तेज़ हो सकता है। कुछ items हैं जो slow चल रहे हैं — उन्हें थोड़ा push करना फ़ायदेमंद रहेगा।");
  } else {
    insights.push("आपका inventory turnover strong है — माल अच्छे से घूम रहा है। लेकिन deadstock की वजह से कुछ profit consistently leak हो रहा है।");
  }
  if (r.deadStock > r.monthlySales * 0.5) {
    insights.push(`आपका deadstock (${formatINR(r.deadStock)}) एक पूरी महीने की बिक्री के बराबर या ज़्यादा है। यह एक important signal है जिस पर ध्यान देना ज़रूरी है।`);
  } else {
    insights.push(`${formatINR(r.deadStock)} का माल थोड़ा रुका हुआ लग रहा है। इस वजह से करीब ${formatINR(r.monthlyLeakage)} का पैसा हर महीने सीधे हाथ में नहीं आ पा रहा।`);
  }
  if (r.daysToSell > r.restockDays) {
    insights.push(`आपका restock cycle ${r.restockDays} दिन का है, जबकि current pace पर माल sell होने में ${r.daysToSell} दिन लगते हैं। इससे overstock का risk naturally बढ़ जाता है।`);
  }
  return insights;
};

const getAsliSamasya = (r) => {
  if (r.inventoryTurnover < 1)
    return "ज़रूरत से ज़्यादा inventory hold करने की वजह से working capital ज़्यादा time तक tied up रहती है। यह एक common challenge है — और इसमें सही planning से काफ़ी सुधार लाया जा सकता है।";
  return "Business की growth अच्छी है — लेकिन deadstock की वजह से हर महीने कुछ profit silently leak होता रहता है। एक structured inventory review से यह situation काफ़ी बेहतर हो सकती है।";
};

const SEEDHE_UPAY = [
  "Deadstock का margin थोड़ा lower करो और अगर उन्हें fast-moving items के साथ combo या bundle में डाल दिया जाए — तो instant positive cash flow बढ़ जाएगा और माल भी घूम जाएगा।",
  "नया माल खरीदने से पहले check करो: क्या पुराना 70% बिक गया? सिर्फ़ तब order दो।",
  "एक 'dead stock list' बनाओ। हर हफ़्ते 15 minute review करो। बस इतना काफ़ी है शुरुआत के लिए।",
];

const SAARTHI_ITEM_LEVEL = [
  { icon: "🔍", title: "Item-Level Visibility", desc: "हर SKU का अलग performance track होता है — कौनसा item fast है, कौनसा slow, कौनसा seasonal। Aggregate numbers के पीछे की सच्चाई समझने में मदद मिलती है।" },
  { icon: "📊", title: "Transaction-Level Analysis", desc: "हर sale, हर return, हर adjustment — सब कुछ analyze होता है। इससे वो patterns मिलते हैं जो normally नज़रअंदाज़ हो जाते हैं।" },
  { icon: "⚠️", title: "Anomaly Detection", desc: "Unusual patterns — जैसे sudden returns, pricing inconsistencies, या unexpected slow months — automatically flag हो जाते हैं before they compound into bigger losses." },
  { icon: "📅", title: "Reorder Intelligence", desc: "Saarthi exactly बताता है कब, कितना, और कौनसा माल खरीदना चाहिए — based on your actual sales velocity, not gut feeling." },
];

// ─── Excel Export ────────────────────────────────────────────────────────────

const downloadExcel = (report, user) => {
  const summaryData = [
    ["Saarthi Smart Report", ""],
    ["Company", user.companyName],
    ["Contact", user.name],
    ["Designation", user.designation],
    ["Mobile", user.mobile],
    ["Report Date", new Date().toLocaleDateString("en-IN")],
    ["", ""],
    ["BUSINESS INPUTS", ""],
    ["Monthly Sales", report.monthlySales],
    ["Total Inventory Value", report.inventoryValue],
    ["Slow Stock %", `${report.slowStockPct}%`],
    ["Average Margin %", `${report.marginPct}%`],
    ["Restock Frequency (days)", report.restockDays],
    ["", ""],
    ["CALCULATED METRICS", ""],
    ["Inventory Turnover (monthly)", report.inventoryTurnover],
    ["Dead / Slow-Moving Stock (₹)", report.deadStock],
    ["Days to Sell Inventory", report.daysToSell],
    ["Monthly Opportunity Cost (₹)", report.monthlyLeakage],
    ["", ""],
    ["ANALYSIS", ""],
    ...getInsights(report).map((i, n) => [`Insight ${n + 1}`, i]),
    ["असली समस्या", getAsliSamasya(report)],
    ["", ""],
    ["ACTION ITEMS", ""],
    ...SEEDHE_UPAY.map((u, n) => [`Step ${n + 1}`, u]),
    ["", ""],
    ["", "यह report Saarthi Smart Report tool द्वारा generate की गई है।"],
    ["", "Exact numbers अलग हो सकते हैं — direction सही है।"],
  ];

  const ws = XLSX.utils.aoa_to_sheet(summaryData);
  ws["!cols"] = [{ wch: 32 }, { wch: 60 }];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Saarthi Report");

  XLSX.writeFile(
    wb,
    `Saarthi_Report_${user.companyName.replace(/\s+/g, "_")}_${new Date().toISOString().slice(0, 10)}.xlsx`
  );
};

// ─── Share Text ───────────────────────────────────────────────────────────────

const buildShareText = (report, user) =>
  `📊 मेरी Saarthi Smart Report\n\n🏢 ${user.companyName}\n\n` +
  `• Dead Stock: ${formatINR(report.deadStock)}\n` +
  `• Monthly नुकसान: ${formatINR(report.monthlyLeakage)}\n` +
  `• Inventory Turnover: ${report.inventoryTurnover}x\n` +
  `• माल बिकने में: ${report.daysToSell} दिन\n\n` +
  `Saarthi आपके business को item-level पे analyze करता है और exact problem spots ढूंढ निकालता है।\n\n` +
  `👉 connectgenai.com/saarthi`;

// ─── Gradient style ──────────────────────────────────────────────────────────

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
  @keyframes pulse-ring {
    0%   { transform: scale(0.85); opacity: 0.6; }
    50%  { transform: scale(1.15); opacity: 1; }
    100% { transform: scale(0.85); opacity: 0.6; }
  }
  @keyframes slide-in {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes scan-line {
    0%   { width: 0%; }
    100% { width: 100%; }
  }
  .pulse-ring  { animation: pulse-ring 1.8s ease-in-out infinite; }
  .slide-in    { animation: slide-in 0.4s ease forwards; }
  .scan-line   { animation: scan-line 11.5s ease-in-out forwards; }
`;

const glassCard = {
  background: "rgba(255,255,255,0.60)",
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  border: "1px solid rgba(255,255,255,0.70)",
};

// ─── Share Panel ─────────────────────────────────────────────────────────────

function SharePanel({ report, user, onClose }) {
  const [copied, setCopied] = useState(false);
  const text = buildShareText(report, user);
  const encoded = encodeURIComponent(text);

  const handleNativeShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: `Saarthi Report — ${user.companyName}`, text }); }
      catch (_) {}
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const options = [
    {
      label: "WhatsApp",
      color: "bg-green-500 hover:bg-green-600",
      icon: <MessageCircle className="w-5 h-5" />,
      href: `https://wa.me/?text=${encoded}`,
    },
    {
      label: "Email",
      color: "bg-blue-600 hover:bg-blue-700",
      icon: <Mail className="w-5 h-5" />,
      href: `mailto:?subject=Saarthi Report — ${encodeURIComponent(user.companyName)}&body=${encoded}`,
    },
    {
      label: "SMS",
      color: "bg-gray-700 hover:bg-gray-800",
      icon: <MessageSquare className="w-5 h-5" />,
      href: `sms:?body=${encoded}`,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-4 sm:pb-0">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full max-w-sm rounded-2xl p-6 shadow-2xl"
        style={glassCard}
      >
        <h3 className="text-lg font-extrabold text-gray-900 mb-1">Report Share करें</h3>
        <p className="text-xs text-gray-500 mb-5">अपनी team या mentor को भेजें</p>

        <div className="space-y-3">
          {options.map(({ label, color, icon, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 w-full text-white ${color} px-4 py-3 rounded-xl font-semibold text-sm transition-colors`}
            >
              {icon} {label} पर share करें
            </a>
          ))}

          {navigator.share && (
            <button
              onClick={handleNativeShare}
              className="flex items-center gap-3 w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-xl font-semibold text-sm transition-colors"
            >
              <Share2 className="w-5 h-5" /> और options देखें
            </button>
          )}

          <button
            onClick={handleCopy}
            className="flex items-center gap-3 w-full border-2 border-gray-200 bg-white hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-xl font-semibold text-sm transition-colors"
          >
            {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
            {copied ? "Copy हो गया!" : "Text copy करें"}
          </button>
        </div>

        <button onClick={onClose} className="mt-4 w-full text-xs text-gray-400 hover:text-gray-600">
          बंद करें
        </button>
      </div>
    </div>
  );
}

// ─── AI Loading Screen ────────────────────────────────────────────────────────

const LOADING_STEPS = [
  "आपका data scan हो रहा है...",
  "Inventory patterns analyze हो रहे हैं...",
  "Dead stock और leakage calculate किया जा रहा है...",
  "Saarthi आपकी report तैयार कर रहा है...",
];

function LoadingScreen({ companyName }) {
  const [visibleSteps, setVisibleSteps] = useState([0]);

  useEffect(() => {
    // Steps appear at 2.5s, 5.5s, 9s across the ~12s loading window
    const delays = [2500, 5500, 9000];
    const timers = delays.map((delay, i) =>
      setTimeout(() => {
        setVisibleSteps((prev) => [...prev, i + 1]);
      }, delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-gray-950 flex flex-col items-center justify-center px-6">
      {/* Pulsing orb with logo */}
      <div className="relative mb-10 flex items-center justify-center">
        <div className="pulse-ring absolute w-32 h-32 rounded-full bg-purple-500/15" />
        <div className="pulse-ring absolute w-24 h-24 rounded-full bg-purple-500/25" style={{ animationDelay: "0.3s" }} />
        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-xl shadow-purple-500/30 border border-purple-100">
          <img src="/Saarthi-Logo.png" alt="Saarthi" className="w-14 h-14 object-contain" />
        </div>
      </div>

      <p className="text-xs font-semibold tracking-[0.25em] text-purple-400 uppercase mb-2">
        Saarthi AI
      </p>
      <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mb-1 text-center">
        Report Generate हो रही है
      </h2>
      <p className="text-gray-400 text-sm mb-8 text-center">
        {companyName} के लिए personalized analysis...
      </p>

      {/* Scan progress bar */}
      <div className="w-full max-w-xs bg-gray-800 rounded-full h-1 mb-8 overflow-hidden">
        <div className="scan-line h-1 bg-gradient-to-r from-purple-500 to-pink-400 rounded-full" />
      </div>

      {/* Animated steps */}
      <div className="w-full max-w-xs space-y-3">
        {LOADING_STEPS.map((step, i) => (
          visibleSteps.includes(i) && (
            <div
              key={i}
              className="slide-in flex items-center gap-3"
              style={{ animationDelay: "0s" }}
            >
              <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                i < visibleSteps.length - 1
                  ? "bg-purple-500"
                  : "bg-purple-500/40 border border-purple-500"
              }`}>
                {i < visibleSteps.length - 1 ? (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                )}
              </div>
              <p className={`text-sm ${i < visibleSteps.length - 1 ? "text-gray-400 line-through" : "text-white font-medium"}`}>
                {step}
              </p>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function SaarthiReport() {
  const location = useLocation();
  const navigate  = useNavigate();
  const user = location.state?.user;

  useEffect(() => {
    if (!user) navigate("/saarthi", { replace: true });
  }, [user, navigate]);

  if (!user) return null;

  const [step, setStep] = useState(1);
  const [inputs, setInputs] = useState({
    monthlySales:   "",
    inventoryValue: "",
    slowStockPct:   "20",
    marginPct:      "15",
    restockDays:    "30",
  });
  const [inputErrors, setInputErrors] = useState({});
  const [report, setReport] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showItemLevel, setShowItemLevel] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
    if (inputErrors[name]) setInputErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateInputs = () => {
    const e = {};
    if (!inputs.monthlySales || Number(inputs.monthlySales) <= 0)
      e.monthlySales = "महीने की बिक्री डालें (0 से ज़्यादा)";
    if (!inputs.inventoryValue || Number(inputs.inventoryValue) <= 0)
      e.inventoryValue = "माल की कीमत डालें (0 से ज़्यादा)";
    return e;
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    const errs = validateInputs();
    if (Object.keys(errs).length > 0) { setInputErrors(errs); return; }
    const result = calculateReport(inputs);
    if (!result) { setInputErrors({ inventoryValue: "Valid value डालें" }); return; }
    // Show AI loading screen for ~12s, then reveal the report
    setGenerating(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      setReport(result);
      setGenerating(false);
      setStep(2);
    }, 12000);
  };

  const handleReset = () => {
    setStep(1);
    setReport(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style>{GRADIENT_STYLE}</style>
      {generating && <LoadingScreen companyName={user.companyName} />}
      {showShare && report && (
        <SharePanel report={report} user={user} onClose={() => setShowShare(false)} />
      )}

      <div className="saarthi-gradient min-h-screen pt-24 pb-12 px-4">
        <div className="max-w-lg mx-auto space-y-4">

          {/* ── STEP 1: INPUT FORM ─────────────────────────────── */}
          {step === 1 && (
            <div className="rounded-2xl p-5 sm:p-8 shadow-2xl" style={glassCard}>
              <div className="flex items-center gap-3 mb-5">
                <img src="/Saarthi-Logo.png" alt="Saarthi" className="h-7 w-auto object-contain" />
                <div className="flex items-center space-x-2">
                  <div className="h-1.5 w-4 bg-purple-500 rounded-full" />
                  <span className="text-xs font-semibold tracking-[0.2em] text-gray-500 uppercase">
                    आपके 5 सवाल
                  </span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 leading-tight mb-1">
                नमस्ते, {user.name.split(" ")[0]}!
              </h1>
              <p className="text-sm text-gray-500 font-light mb-6">
                नीचे 5 अंदाज़े डालें। Exact number ज़रूरी नहीं — roughly सही हो तो चलेगा।
              </p>

              <form onSubmit={handleCalculate} noValidate className="space-y-5">
                {/* Q1 */}
                <div>
                  <label className="block text-xs font-semibold tracking-[0.12em] text-gray-500 uppercase mb-1">
                    1. महीने का approx total बिक्री (₹)
                  </label>
                  <p className="text-xs text-gray-400 mb-1.5">अंदाज़ा चलेगा — exact नहीं चाहिए</p>
                  <input
                    type="number" name="monthlySales" value={inputs.monthlySales}
                    onChange={handleChange} placeholder="e.g. 500000"
                    min="0" inputMode="numeric"
                    className={`w-full border-2 rounded-xl px-4 py-3.5 text-gray-900 text-base placeholder-gray-400 focus:outline-none transition-colors ${
                      inputErrors.monthlySales ? "border-red-400 bg-red-50" : "border-gray-200 bg-white focus:border-purple-400"
                    }`}
                  />
                  {inputErrors.monthlySales && <p className="text-xs text-red-600 mt-1">{inputErrors.monthlySales}</p>}
                </div>

                {/* Q2 */}
                <div>
                  <label className="block text-xs font-semibold tracking-[0.12em] text-gray-500 uppercase mb-1">
                    2. दुकान + godown में total माल की कीमत (₹)
                  </label>
                  <p className="text-xs text-gray-400 mb-1.5">कितने का माल अभी आपके पास है?</p>
                  <input
                    type="number" name="inventoryValue" value={inputs.inventoryValue}
                    onChange={handleChange} placeholder="e.g. 800000"
                    min="0" inputMode="numeric"
                    className={`w-full border-2 rounded-xl px-4 py-3.5 text-gray-900 text-base placeholder-gray-400 focus:outline-none transition-colors ${
                      inputErrors.inventoryValue ? "border-red-400 bg-red-50" : "border-gray-200 bg-white focus:border-purple-400"
                    }`}
                  />
                  {inputErrors.inventoryValue && <p className="text-xs text-red-600 mt-1">{inputErrors.inventoryValue}</p>}
                </div>

                {/* Q3 */}
                <div>
                  <label className="block text-xs font-semibold tracking-[0.12em] text-gray-500 uppercase mb-1">
                    3. कितना % माल धीरे बिकता है या पड़ा रहता है?
                  </label>
                  <select name="slowStockPct" value={inputs.slowStockPct} onChange={handleChange}
                    className="w-full border-2 border-gray-200 bg-white rounded-xl px-4 py-3.5 text-gray-900 text-base focus:outline-none focus:border-purple-400 transition-colors">
                    <option value="10">10% — थोड़ा सा माल अटका है</option>
                    <option value="20">20% — ठीक ठाक अटका है</option>
                    <option value="30">30% — काफ़ी माल रुका हुआ है</option>
                    <option value="40">40%+ — बहुत माल पड़ा है</option>
                  </select>
                </div>

                {/* Q4 */}
                <div>
                  <label className="block text-xs font-semibold tracking-[0.12em] text-gray-500 uppercase mb-1">
                    4. आपका average मुनाफ़ा % (per product)
                  </label>
                  <select name="marginPct" value={inputs.marginPct} onChange={handleChange}
                    className="w-full border-2 border-gray-200 bg-white rounded-xl px-4 py-3.5 text-gray-900 text-base focus:outline-none focus:border-purple-400 transition-colors">
                    <option value="10">10% — कम margin</option>
                    <option value="15">15% — Average margin</option>
                    <option value="20">20% — अच्छा margin</option>
                    <option value="25">25%+ — बहुत अच्छा margin</option>
                  </select>
                </div>

                {/* Q5 */}
                <div>
                  <label className="block text-xs font-semibold tracking-[0.12em] text-gray-500 uppercase mb-1">
                    5. आप कितने दिन में नया माल खरीदते हो?
                  </label>
                  <select name="restockDays" value={inputs.restockDays} onChange={handleChange}
                    className="w-full border-2 border-gray-200 bg-white rounded-xl px-4 py-3.5 text-gray-900 text-base focus:outline-none focus:border-purple-400 transition-colors">
                    <option value="7">7 दिन — हर हफ़्ते</option>
                    <option value="15">15 दिन — हर 2 हफ़्ते</option>
                    <option value="30">30 दिन — महीने में एक बार</option>
                    <option value="45">45+ दिन — कम बार खरीदता हूँ</option>
                  </select>
                </div>

                <button type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white py-4 rounded-xl font-bold text-sm uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 mt-1">
                  मेरी Report बनाओ <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* ── STEP 2: REPORT OUTPUT ──────────────────────────── */}
          {step === 2 && report && (
            <>
              {/* Action bar — download + share */}
              <div className="flex gap-2">
                <button
                  onClick={() => downloadExcel(report, user)}
                  className="flex-1 flex items-center justify-center gap-2 bg-white/70 backdrop-blur-sm border border-gray-200 text-gray-700 font-semibold text-sm px-4 py-3 rounded-xl hover:bg-white transition-colors shadow-sm active:scale-95"
                >
                  <Download className="w-4 h-4 text-green-600" />
                  Excel Download
                </button>
                <button
                  onClick={() => setShowShare(true)}
                  className="flex-1 flex items-center justify-center gap-2 bg-white/70 backdrop-blur-sm border border-gray-200 text-gray-700 font-semibold text-sm px-4 py-3 rounded-xl hover:bg-white transition-colors shadow-sm active:scale-95"
                >
                  <Share2 className="w-4 h-4 text-purple-600" />
                  Share Report
                </button>
              </div>

              {/* 1. BIG HEADLINE */}
              <div className="bg-gray-900 text-white rounded-2xl p-5 sm:p-7 shadow-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <img src="/Saarthi-Logo.png" alt="Saarthi" className="h-7 w-auto object-contain brightness-0 invert" />
                  <div className="flex items-center space-x-2">
                    <div className="h-1.5 w-4 bg-yellow-400 rounded-full" />
                    <span className="text-xs font-semibold tracking-[0.2em] text-gray-400 uppercase">
                      आपकी Report
                    </span>
                  </div>
                </div>
                <p className="text-gray-400 text-xs mb-3">{user.companyName} · {user.designation}</p>
                <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-yellow-400 leading-tight mb-2">
                  {formatINR(report.deadStock)}
                </h2>
                <p className="text-lg font-semibold text-white mb-1">
                  का माल slow-moving category में है
                </p>
                <p className="text-gray-300 text-sm sm:text-base">
                  और लगभग{" "}
                  <span className="text-yellow-400 font-bold">{formatINR(report.monthlyLeakage)}</span>{" "}
                  हर महीने चुप-चाप नुकसान हो रहा है।
                </p>
              </div>

              {/* 2. BUSINESS SNAPSHOT */}
              <div className="rounded-2xl overflow-hidden shadow-xl" style={glassCard}>
                <div className="px-5 sm:px-7 pt-5 pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="h-1.5 w-5 bg-purple-500 rounded-full" />
                    <span className="text-xs font-semibold tracking-[0.2em] text-gray-500 uppercase">
                      Business Snapshot
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 divide-y divide-x divide-gray-200">
                  {[
                    { label: "महीने की बिक्री", value: formatINR(report.monthlySales) },
                    { label: "Total माल", value: formatINR(report.inventoryValue) },
                    { label: "अटका हुआ माल", value: formatINR(report.deadStock) },
                    { label: "Monthly नुकसान", value: formatINR(report.monthlyLeakage) },
                  ].map(({ label, value }) => (
                    <div key={label} className="p-4 sm:p-5 flex flex-col">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">{label}</p>
                      <p className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-900">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. SAARTHI KI PAKAD */}
              <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <TrendingDown className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <div className="h-1.5 w-4 bg-purple-500 rounded-full" />
                      <span className="text-xs font-semibold tracking-[0.2em] text-gray-500 uppercase">Saarthi की पकड़</span>
                    </div>
                    <p className="text-xs text-gray-400">आपके numbers का सीधा मतलब</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {getInsights(report).map((insight, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="mt-2 flex-shrink-0 w-1 h-auto rounded-full bg-purple-400 self-stretch min-h-[1rem]" />
                      <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. ASLI SAMASYA */}
              <div className="bg-gray-900 text-white rounded-2xl p-5 sm:p-7 shadow-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-yellow-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  </div>
                  <span className="text-xs font-semibold tracking-[0.2em] text-gray-400 uppercase">असली समस्या</span>
                </div>
                <p className="text-lg sm:text-xl font-extrabold tracking-tight leading-snug text-white">
                  {getAsliSamasya(report)}
                </p>
              </div>

              {/* 5. SEEDHE UPAY */}
              <div className="rounded-2xl p-5 sm:p-7 shadow-xl" style={glassCard}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <div className="h-1.5 w-4 bg-purple-500 rounded-full" />
                      <span className="text-xs font-semibold tracking-[0.2em] text-gray-500 uppercase">सीधे उपाय</span>
                    </div>
                    <p className="text-xs text-gray-400">3 काम जो आज से शुरू कर सकते हो</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {SEEDHE_UPAY.map((upay, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="flex-shrink-0 w-7 h-7 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold text-sm">
                        {i + 1}
                      </div>
                      <p className="text-gray-700 text-sm sm:text-base leading-relaxed pt-0.5">{upay}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 6. SAARTHI ITEM-LEVEL SECTION */}
              <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-1.5 w-5 bg-purple-500 rounded-full" />
                  <span className="text-xs font-semibold tracking-[0.2em] text-gray-500 uppercase">
                    यह सिर्फ़ surface है
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-900 mb-2">
                  Saarthi अंदर तक जाता है।
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  यह report आपके overall numbers पर based है। Saarthi हर item, हर transaction, हर pattern को individually scan करता है।
                </p>

                <button
                  onClick={() => setShowItemLevel((v) => !v)}
                  className="flex items-center gap-2 text-purple-600 font-semibold text-sm mb-4"
                >
                  {showItemLevel ? "कम देखें" : "और जानें"}
                  {showItemLevel ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {showItemLevel && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                    {SAARTHI_ITEM_LEVEL.map(({ icon, title, desc }) => (
                      <div key={title} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                        <div className="text-2xl mb-2">{icon}</div>
                        <h4 className="font-bold text-gray-900 text-sm mb-1">{title}</h4>
                        <p className="text-xs text-gray-600 leading-relaxed">{desc}</p>
                      </div>
                    ))}
                  </div>
                )}

                <p className="text-sm text-gray-600 mb-5">
                  इससे आप हर महीने{" "}
                  <span className="font-bold text-gray-900">
                    {formatINR(report.monthlyLeakage * 2)}–{formatINR(report.monthlyLeakage * 3)}
                  </span>{" "}
                  ज़्यादा बचाना या कमाना शुरू कर सकते हो।
                </p>

                {/* GET SAARTHI CTA */}
                <Link
                  to="/saarthi/get-saarthi"
                  state={{ user }}
                  className="block w-full bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white text-center px-6 py-4 rounded-xl font-bold text-sm uppercase tracking-wider shadow-lg transition-colors"
                >
                  Get Saarthi →
                </Link>

                <Link
                  to="/get-in-touch"
                  className="block w-full mt-3 text-center text-purple-600 font-semibold text-sm py-3 rounded-xl border border-purple-200 hover:bg-purple-50 transition-colors"
                >
                  पहले बात करें
                </Link>
              </div>

              {/* 7. DISCLAIMER */}
              <p className="text-xs text-gray-400 text-center px-2">
                यह report आपके दिए गए अंदाज़ों पर आधारित है। Exact numbers अलग हो सकते हैं, पर direction सही दिखाई गई है।
              </p>

              {/* RECALCULATE */}
              <div className="text-center pb-2">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 border border-gray-300 bg-white/70 backdrop-blur-sm text-gray-600 font-semibold px-6 py-3 rounded-full text-sm hover:bg-white transition-colors active:scale-95"
                >
                  <RotateCcw className="w-4 h-4" />
                  दोबारा Calculate करें
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
