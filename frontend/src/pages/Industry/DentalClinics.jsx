import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Search, Calendar, Mic, FileText, MessageSquare, Star,
  CheckCircle, X, ChevronRight, ArrowRight, Stethoscope,
  Brain, TrendingUp, Shield, Clock, Users, Zap, Heart,
  Phone, Globe, Award, BarChart3
} from "lucide-react";
import TopNav from "../../components/TopNav";
import FinalPoster from "../../components/FinalPoster";
import Footer from "../../components/Footer";

// ─── Shared data for the Feedback Loop ────────────────────────────────────────
const LOOP_STEPS = [
  {
    id: 1,
    icon: Search,
    label: "Discovery",
    color: "#6366f1",
    bgColor: "bg-indigo-500",
    lightBg: "bg-indigo-50",
    borderColor: "border-indigo-200",
    headline: "Patients Find You First",
    body:
      "When someone searches 'dentist near me', your clinic dominates the results. Our reputation engine keeps your Google rating above 4.8★ and your profile optimized — so new patients choose you before scrolling.",
    stat: "3× more Google visibility",
    visual: "discovery",
  },
  {
    id: 2,
    icon: Calendar,
    label: "Booking",
    color: "#8b5cf6",
    bgColor: "bg-violet-500",
    lightBg: "bg-violet-50",
    borderColor: "border-violet-200",
    headline: "Zero-Friction Booking",
    body:
      "Patients book directly via WhatsApp, your website widget, or Instagram DM — no phone calls, no hold music. Appointments auto-confirm with reminders at 48h, 24h, and 2h before. No-shows drop by 60%.",
    stat: "60% fewer no-shows",
    visual: "booking",
  },
  {
    id: 3,
    icon: Mic,
    label: "Consultation",
    color: "#06b6d4",
    bgColor: "bg-cyan-500",
    lightBg: "bg-cyan-50",
    borderColor: "border-cyan-200",
    headline: "Molars.AI in the Chair",
    body:
      "The doctor speaks, Molars.AI listens. Every consultation is transcribed in real-time into structured clinical notes, treatment plans, and procedure codes — automatically. The doctor focuses on the patient, not the keyboard.",
    stat: "40 min saved per day",
    visual: "consultation",
  },
  {
    id: 4,
    icon: FileText,
    label: "Post-Consultation",
    color: "#10b981",
    bgColor: "bg-emerald-500",
    lightBg: "bg-emerald-50",
    borderColor: "border-emerald-200",
    headline: "Reports That Build Trust",
    body:
      "Patients receive a WhatsApp summary of their visit — treatment done, next steps, prescriptions, and a feedback prompt — within minutes of leaving the chair. Families feel informed. Patients feel cared for.",
    stat: "92% patient satisfaction rate",
    visual: "postconsult",
  },
  {
    id: 5,
    icon: MessageSquare,
    label: "Post-Treatment Care",
    color: "#f59e0b",
    bgColor: "bg-amber-500",
    lightBg: "bg-amber-50",
    borderColor: "border-amber-200",
    headline: "Care Doesn't Stop at the Door",
    body:
      "Automated WhatsApp drips send medication reminders, healing check-ins, and next-visit nudges at exactly the right moments. Patients feel like they have a personal dentist on call. Retention soars.",
    stat: "2.4× higher retention",
    visual: "caredrip",
  },
  {
    id: 6,
    icon: Star,
    label: "Reputation",
    color: "#f97316",
    bgColor: "bg-orange-500",
    lightBg: "bg-orange-50",
    borderColor: "border-orange-200",
    headline: "Happy Patients, Glowing Reviews",
    body:
      "At the perfect moment — after a successful treatment — patients are nudged to leave a Google review. One tap. Your rating climbs. New patients discover you. The loop begins again.",
    stat: "4.9★ average rating",
    visual: "reputation",
  },
];

// ─── Comparison data ──────────────────────────────────────────────────────────
const COMPARISON = [
  { feature: "Patient booking (WhatsApp + Web)", us: true, others: false },
  { feature: "AI clinical documentation (Molars.AI)", us: true, others: false },
  { feature: "Automated post-visit care drips", us: true, others: false },
  { feature: "Reputation & review automation", us: true, others: false },
  { feature: "Real-time revenue analytics", us: true, others: true },
  { feature: "Appointment reminders", us: true, others: true },
  { feature: "Patient record management", us: true, others: true },
  { feature: "WhatsApp-native interface", us: true, others: false },
  { feature: "Hinglish / regional language support", us: true, others: false },
  { feature: "Setup in under 48 hours", us: true, others: false },
];

// ─── Visual Illustrations inside the loop center ─────────────────────────────
const VisualDiscovery = () => (
  <div className="flex flex-col items-center gap-2">
    <div className="flex gap-2">
      {[5, 5, 5, 5, 4].map((_, i) => (
        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
    <div className="bg-white rounded-xl shadow p-3 text-xs text-gray-700 border border-gray-100 w-full max-w-xs">
      <p className="font-semibold text-gray-900">Smile Dental Clinic</p>
      <p className="text-gray-500">4.9 ★ · 212 reviews · "dentist near me"</p>
    </div>
    <div className="bg-white rounded-xl shadow p-3 text-xs text-gray-400 border border-gray-100 w-full max-w-xs">
      <p className="font-semibold text-gray-600">City Dental Studio</p>
      <p>4.1 ★ · 34 reviews</p>
    </div>
  </div>
);

const VisualBooking = () => (
  <div className="bg-green-50 rounded-2xl p-4 w-full max-w-xs border border-green-100">
    <div className="flex items-center gap-2 mb-3">
      <Phone className="w-4 h-4 text-green-600" />
      <span className="text-xs font-semibold text-green-700">WhatsApp Booking</span>
    </div>
    {["10:00 AM ✓", "11:30 AM ✓", "2:00 PM — Booked!"].map((slot, i) => (
      <div key={i} className={`text-xs px-3 py-2 rounded-lg mb-1.5 ${i === 2 ? "bg-green-500 text-white font-semibold" : "bg-white text-gray-500 border border-gray-100"}`}>
        {slot}
      </div>
    ))}
  </div>
);

const VisualConsultation = () => (
  <div className="bg-cyan-50 rounded-2xl p-4 w-full max-w-xs border border-cyan-100">
    <div className="flex items-center gap-2 mb-2">
      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
      <span className="text-xs font-semibold text-cyan-700">Recording...</span>
    </div>
    <p className="text-xs text-gray-500 italic mb-3">"Patient presents with sensitivity on upper-left molar..."</p>
    <div className="bg-white rounded-lg p-2 border border-cyan-100">
      <p className="text-xs font-semibold text-gray-700 mb-1">Auto-generated note</p>
      <p className="text-xs text-gray-500">Dx: Dentinal hypersensitivity #26</p>
      <p className="text-xs text-gray-500">Rx: Desensitizing paste, 2 weeks</p>
    </div>
  </div>
);

const VisualPostConsult = () => (
  <div className="bg-emerald-50 rounded-2xl p-4 w-full max-w-xs border border-emerald-100">
    <div className="flex items-center gap-2 mb-2">
      <MessageSquare className="w-4 h-4 text-emerald-600" />
      <span className="text-xs font-semibold text-emerald-700">WhatsApp Summary Sent</span>
    </div>
    <div className="bg-white rounded-lg p-2 border border-emerald-100 text-xs text-gray-600 space-y-1">
      <p>✅ Scaling done</p>
      <p>💊 Sensodyne — twice daily</p>
      <p>📅 Review in 2 weeks</p>
      <p>⭐ How was your visit?</p>
    </div>
  </div>
);

const VisualCareDrip = () => (
  <div className="space-y-2 w-full max-w-xs">
    {[
      { day: "Day 1", msg: "Take your medication after meals 💊", color: "bg-amber-50 border-amber-100" },
      { day: "Day 3", msg: "Any sensitivity? We're here to help 🦷", color: "bg-amber-50 border-amber-100" },
      { day: "Day 14", msg: "Time for your follow-up! Book now 📅", color: "bg-amber-500 text-white border-amber-400" },
    ].map((item, i) => (
      <div key={i} className={`rounded-xl px-3 py-2 border text-xs ${item.color}`}>
        <span className="font-semibold">{item.day} — </span>{item.msg}
      </div>
    ))}
  </div>
);

const VisualReputation = () => {
  const [count, setCount] = useState(4.1);
  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setCount(prev => {
          if (prev >= 4.9) { clearInterval(interval); return 4.9; }
          return Math.round((prev + 0.1) * 10) / 10;
        });
      }, 120);
      return () => clearInterval(interval);
    }, 400);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(i => (
          <Star key={i} className={`w-6 h-6 transition-all duration-300 ${count >= i ? "fill-yellow-400 text-yellow-400 scale-110" : "text-gray-200 fill-gray-200"}`} />
        ))}
      </div>
      <p className="text-3xl font-bold text-gray-900">{count.toFixed(1)} ★</p>
      <p className="text-xs text-gray-500">Google rating · climbing</p>
      <div className="text-xs text-orange-600 font-medium bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
        +14 new reviews this month
      </div>
    </div>
  );
};

const VISUALS = {
  discovery: <VisualDiscovery />,
  booking: <VisualBooking />,
  consultation: <VisualConsultation />,
  postconsult: <VisualPostConsult />,
  caredrip: <VisualCareDrip />,
  reputation: <VisualReputation />,
};

// ─── Desktop Circular Feedback Loop ──────────────────────────────────────────
const DesktopLoop = ({ active, setActive }) => {
  const radius = 210;
  const cx = 300;
  const cy = 300;
  const n = LOOP_STEPS.length;

  return (
    <div className="relative w-[600px] h-[600px] shrink-0">
      {/* SVG connector lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 600">
        {LOOP_STEPS.map((_, i) => {
          const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
          const next = ((i + 1) / n) * 2 * Math.PI - Math.PI / 2;
          const x1 = cx + radius * Math.cos(angle);
          const y1 = cy + radius * Math.sin(angle);
          const x2 = cx + radius * Math.cos(next);
          const y2 = cy + radius * Math.sin(next);
          const isActive = active === i || active === (i + 1) % n;
          return (
            <line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={isActive ? LOOP_STEPS[i].color : "#e5e7eb"}
              strokeWidth={isActive ? 2.5 : 1.5}
              strokeDasharray={isActive ? "none" : "6 4"}
              className="transition-all duration-500"
            />
          );
        })}
        {/* Arrow indicators */}
        {LOOP_STEPS.map((step, i) => {
          const midAngle = ((i + 0.5) / n) * 2 * Math.PI - Math.PI / 2;
          const mx = cx + radius * Math.cos(midAngle);
          const my = cy + radius * Math.sin(midAngle);
          return (
            <circle
              key={`dot-${i}`}
              cx={mx} cy={my} r={3}
              fill={active === i ? step.color : "#d1d5db"}
              className="transition-all duration-500"
            />
          );
        })}
      </svg>

      {/* Center panel */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-52 h-52 rounded-full bg-white shadow-2xl border border-gray-100 flex flex-col items-center justify-center p-4 text-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center gap-2 w-full"
            >
              {VISUALS[LOOP_STEPS[active].visual]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Nodes */}
      {LOOP_STEPS.map((step, i) => {
        const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);
        const Icon = step.icon;
        const isActive = active === i;
        return (
          <button
            key={step.id}
            onClick={() => setActive(i)}
            className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
            style={{ left: x, top: y }}
          >
            <motion.div
              animate={{ scale: isActive ? 1.15 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`flex flex-col items-center gap-1.5`}
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${isActive ? "ring-4 ring-offset-2" : ""}`}
                style={{
                  backgroundColor: isActive ? step.color : "#fff",
                  border: `2px solid ${step.color}`,
                  ringColor: step.color,
                }}
              >
                <Icon
                  className="w-6 h-6 transition-colors duration-300"
                  style={{ color: isActive ? "#fff" : step.color }}
                />
              </div>
              <span
                className="text-xs font-semibold whitespace-nowrap transition-colors duration-300"
                style={{ color: isActive ? step.color : "#6b7280" }}
              >
                {step.label}
              </span>
            </motion.div>
          </button>
        );
      })}
    </div>
  );
};

// ─── Desktop Info Panel ───────────────────────────────────────────────────────
const DesktopInfoPanel = ({ step }) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={step.id}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-6 max-w-sm"
    >
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold w-fit`}
        style={{ backgroundColor: step.color + "18", color: step.color }}>
        <span>Step {step.id}</span>
        <ChevronRight className="w-3 h-3" />
        <span>{step.label}</span>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.headline}</h3>
        <p className="text-gray-600 leading-relaxed">{step.body}</p>
      </div>
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl"
        style={{ backgroundColor: step.color + "10", borderLeft: `3px solid ${step.color}` }}>
        <TrendingUp className="w-5 h-5 shrink-0" style={{ color: step.color }} />
        <span className="font-semibold text-gray-800">{step.stat}</span>
      </div>
      <div className="flex gap-2">
        {LOOP_STEPS.map((s, i) => (
          <div
            key={s.id}
            className="h-1 flex-1 rounded-full transition-all duration-300"
            style={{ backgroundColor: s.id === step.id ? step.color : "#e5e7eb" }}
          />
        ))}
      </div>
    </motion.div>
  </AnimatePresence>
);

// ─── Mobile Step Card ─────────────────────────────────────────────────────────
const MobileStepCard = ({ step, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-30% 0px -30% 0px", once: false });
  const Icon = step.icon;
  return (
    <motion.div
      ref={ref}
      animate={{ opacity: inView ? 1 : 0.3, y: inView ? 0 : 20 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-16 gap-8"
    >
      {/* Step badge */}
      <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full"
        style={{ backgroundColor: step.color + "18", color: step.color }}>
        <span>Step {step.id} of {LOOP_STEPS.length}</span>
      </div>

      {/* Icon */}
      <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-xl"
        style={{ backgroundColor: step.color }}>
        <Icon className="w-9 h-9 text-white" />
      </div>

      {/* Visual */}
      <div className="w-full flex justify-center">
        {VISUALS[step.visual]}
      </div>

      {/* Text */}
      <div className="text-center max-w-xs">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{step.headline}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{step.body}</p>
      </div>

      {/* Stat */}
      <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold"
        style={{ backgroundColor: step.color + "12", color: step.color }}>
        <TrendingUp className="w-4 h-4" />
        {step.stat}
      </div>

      {/* Connector arrow to next */}
      {index < LOOP_STEPS.length - 1 && (
        <div className="flex flex-col items-center gap-1 mt-4">
          <div className="w-0.5 h-8 bg-gray-200 rounded-full" />
          <ArrowRight className="w-4 h-4 text-gray-300 rotate-90" />
        </div>
      )}
    </motion.div>
  );
};

// ─── Mobile Progress Tracker ──────────────────────────────────────────────────
const MobileProgress = ({ active }) => (
  <div className="fixed top-20 left-1/2 -translate-x-1/2 z-30 flex gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-lg border border-gray-100">
    {LOOP_STEPS.map((step, i) => (
      <div
        key={step.id}
        className="w-2 h-2 rounded-full transition-all duration-300"
        style={{ backgroundColor: i === active ? step.color : "#d1d5db" }}
      />
    ))}
  </div>
);

// ─── Main Page Component ──────────────────────────────────────────────────────
const DentalClinics = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [mobileActiveStep, setMobileActiveStep] = useState(0);
  const stepRefs = useRef([]);

  // Auto-rotate on desktop
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % LOOP_STEPS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Track mobile scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = stepRefs.current.indexOf(entry.target);
            if (idx !== -1) setMobileActiveStep(idx);
          }
        });
      },
      { threshold: 0.5 }
    );
    stepRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <TopNav />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <style>{`
        @keyframes aurora1 {
          0%   { transform: translate(0%, 0%) scale(1);       }
          33%  { transform: translate(10%, -15%) scale(1.2);  }
          66%  { transform: translate(-8%, 10%) scale(0.9);   }
          100% { transform: translate(0%, 0%) scale(1);       }
        }
        @keyframes aurora2 {
          0%   { transform: translate(0%, 0%) scale(1);       }
          40%  { transform: translate(-12%, 8%) scale(1.25);  }
          70%  { transform: translate(6%, -10%) scale(0.85);  }
          100% { transform: translate(0%, 0%) scale(1);       }
        }
        @keyframes aurora3 {
          0%   { transform: translate(0%, 0%) scale(1);      }
          50%  { transform: translate(9%, 12%) scale(1.22);  }
          100% { transform: translate(0%, 0%) scale(1);      }
        }
        .aurora-1 { animation: aurora1 12s ease-in-out infinite; }
        .aurora-2 { animation: aurora2 16s ease-in-out infinite; }
        .aurora-3 { animation: aurora3 20s ease-in-out infinite; }
      `}</style>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950">
        {/* Background gradient — northern lights */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="aurora-1 absolute top-[15%] left-[10%] w-[600px] h-[600px] rounded-full blur-[100px]" style={{ background: "radial-gradient(circle, rgba(99,102,241,0.55) 0%, transparent 70%)" }} />
          <div className="aurora-2 absolute bottom-[10%] right-[5%] w-[520px] h-[520px] rounded-full blur-[90px]" style={{ background: "radial-gradient(circle, rgba(6,182,212,0.50) 0%, transparent 70%)", animationDelay: "2s" }} />
          <div className="aurora-3 absolute top-[40%] left-[40%] w-[480px] h-[480px] rounded-full blur-[110px]" style={{ background: "radial-gradient(circle, rgba(139,92,246,0.45) 0%, transparent 70%)", animationDelay: "1s" }} />
          <div className="aurora-1 absolute top-[60%] left-[20%] w-[420px] h-[420px] rounded-full blur-[80px]" style={{ background: "radial-gradient(circle, rgba(20,184,166,0.40) 0%, transparent 70%)", animationDelay: "6s" }} />
          <div className="aurora-2 absolute top-[20%] right-[15%] w-[360px] h-[360px] rounded-full blur-[80px]" style={{ background: "radial-gradient(circle, rgba(168,85,247,0.45) 0%, transparent 70%)", animationDelay: "4s" }} />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-24">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-white/80 mb-8"
          >
            <Stethoscope className="w-4 h-4" />
            Built by dentists. Powered by AI.
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6"
          >
            Turn Every Patient Into
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Your Marketing Engine
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Built by dentists, for dentists — to solve the biggest problems in clinics.
            From the first Google search to the fifth-star review, we automate the full patient journey.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="/get-in-touch"
              className="bg-indigo-500 hover:bg-indigo-400 text-white font-semibold px-8 py-4 rounded-full transition-all duration-200 flex items-center gap-2 justify-center"
            >
              Book a Free Demo <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/products/digitaltco"
              className="bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-8 py-4 rounded-full transition-all duration-200"
            >
              See Molars.AI
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { label: "Clinics Active", value: "200+", icon: Heart },
              { label: "Time Saved / Day", value: "40 min", icon: Clock },
              { label: "Avg Google Rating", value: "4.9 ★", icon: Star },
              { label: "No-show Reduction", value: "60%", icon: TrendingUp },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                <Icon className="w-5 h-5 text-indigo-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className="text-xs text-white/50 mt-1">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── DENTAL MANAGEMENT SOFTWARE ───────────────────────── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                <Globe className="w-3.5 h-3.5" /> Dental Management Software
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-6">
                While others help you{" "}
                <span className="text-gray-400">run</span> your clinic,
                <br />
                <span className="text-indigo-600">we become the marketing engine</span>{" "}
                for it.
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Every PMS helps you manage appointments and records. That's table stakes.
                Connect goes further — turning your clinic into a self-growing business through
                reputation automation, intelligent follow-ups, and real-time patient engagement.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Calendar, title: "Smart Scheduling", desc: "Multi-channel booking — WhatsApp, web, Instagram — with auto-reminders" },
                  { icon: BarChart3, title: "Revenue Intelligence", desc: "Live dashboard showing today's collections, pending treatments, and growth trends" },
                  { icon: Users, title: "Patient Relationship Management", desc: "Every patient's full journey — visits, treatments, feedback, and lifetime value" },
                  { icon: Zap, title: "Automated Growth Loops", desc: "Review requests, recall campaigns, and referral nudges — all on autopilot" },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{title}</p>
                      <p className="text-gray-500 text-sm mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual card */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-violet-100 rounded-3xl" />
              <div className="relative bg-white/80 backdrop-blur rounded-3xl p-8 shadow-xl border border-white m-4">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Today's Overview</p>
                    <p className="text-2xl font-black text-gray-900">₹48,200</p>
                    <p className="text-xs text-emerald-600 font-medium mt-0.5">↑ 18% vs last Tuesday</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500 flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  {[
                    { label: "Appointments booked", value: "14", bar: 87 },
                    { label: "Pending follow-ups", value: "3", bar: 20 },
                    { label: "Reviews requested", value: "8", bar: 60 },
                  ].map(({ label, value, bar }) => (
                    <div key={label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">{label}</span>
                        <span className="font-semibold text-gray-900">{value}</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-500 rounded-full"
                          style={{ width: `${bar}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-emerald-50 rounded-xl p-3 flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                  <p className="text-xs text-emerald-700 font-medium">
                    2 patients just left 5-star Google reviews ★
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MOLARS AI ─────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-gray-950 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Visual */}
            <div className="order-2 lg:order-1">
              <div className="bg-gray-900 rounded-3xl p-6 border border-white/10 shadow-2xl">
                {/* Recording indicator */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex gap-1 items-center">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-red-400 text-xs font-semibold">LIVE</span>
                  </div>
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-white/40 text-xs">Molars.AI · Active</span>
                </div>

                {/* Waveform bars */}
                <div className="flex items-center gap-1 mb-6 h-12">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-full bg-cyan-500"
                      style={{
                        height: `${20 + Math.sin(i * 0.7) * 15 + Math.random() * 10}%`,
                        opacity: 0.5 + Math.sin(i * 0.4) * 0.4,
                      }}
                    />
                  ))}
                </div>

                {/* Transcription */}
                <div className="bg-white/5 rounded-2xl p-4 mb-4 border border-white/10">
                  <p className="text-white/40 text-xs mb-2 uppercase tracking-widest">Doctor</p>
                  <p className="text-white/80 text-sm italic">"Tooth 26 shows early caries. We'll do a composite filling — Grade 2 procedure, shouldn't take more than 45 minutes."</p>
                </div>

                {/* Auto-generated note */}
                <div className="bg-cyan-950/50 rounded-2xl p-4 border border-cyan-800/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Brain className="w-4 h-4 text-cyan-400" />
                    <span className="text-cyan-400 text-xs font-semibold">Auto-generated Clinical Note</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-white/70">
                    <p><span className="text-white/40">Tooth:</span> 26 (Upper Left First Molar)</p>
                    <p><span className="text-white/40">Diagnosis:</span> Early Occlusal Caries</p>
                    <p><span className="text-white/40">Procedure:</span> Composite Resin Filling</p>
                    <p><span className="text-white/40">ICD Code:</span> K02.51</p>
                    <p><span className="text-white/40">Est. Time:</span> 45 min</p>
                    <p><span className="text-white/40">Consent:</span> Verbal — ✓ documented</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                <Brain className="w-3.5 h-3.5" /> Molars.AI
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-6">
                The AI that sits in
                <br />
                <span className="text-cyan-400">every consultation</span>
                <br />
                so you don't have to type.
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                Molars.AI is your digital treatment consultant — listening to every patient-doctor
                conversation and transforming it into structured clinical notes, procedure codes,
                and consent documents. Instantly. Accurately.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Mic, title: "Real-time transcription", desc: "Converts speech to structured notes in seconds — no typing, no delay" },
                  { icon: FileText, title: "ICD & procedure codes", desc: "Auto-assigns the right codes to every procedure documented" },
                  { icon: Shield, title: "Compliance-ready records", desc: "Every note timestamped, structured, and ready for audit" },
                  { icon: Globe, title: "Works in English & Hindi", desc: "Full Hinglish support — speak naturally, get professional notes" },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-4 items-start">
                    <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{title}</p>
                      <p className="text-white/40 text-sm mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <a
                href="/products/digitaltco"
                className="mt-8 inline-flex items-center gap-2 text-cyan-400 font-semibold text-sm hover:gap-3 transition-all"
              >
                Learn more about Molars.AI <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPARISON ────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              <Award className="w-3.5 h-3.5" /> Why clinics choose our platform
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              Not just software.
              <br />
              <span className="text-indigo-600">A growth system for your clinic.</span>
            </h2>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 bg-gray-900 text-white text-sm font-semibold">
              <div className="p-4 text-gray-400">Feature</div>
              <div className="p-4 text-center text-indigo-400 flex items-center justify-center gap-2">
                <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
                Connect Gen AI
              </div>
              <div className="p-4 text-center text-gray-500">Others</div>
            </div>

            {/* Rows */}
            {COMPARISON.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-3 border-b border-gray-50 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
              >
                <div className="p-4 text-sm text-gray-700 flex items-center">{row.feature}</div>
                <div className="p-4 flex items-center justify-center">
                  {row.us ? (
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <X className="w-5 h-5 text-gray-200" />
                  )}
                </div>
                <div className="p-4 flex items-center justify-center">
                  {row.others ? (
                    <CheckCircle className="w-5 h-5 text-gray-300" />
                  ) : (
                    <X className="w-5 h-5 text-red-200" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEEDBACK LOOP — DESKTOP ───────────────────────────── */}
      <section className="py-24 px-6 bg-white hidden lg:block">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              <ArrowRight className="w-3.5 h-3.5" /> The Complete Patient Journey
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              A loop that runs itself.
              <br />
              <span className="text-indigo-600">Every patient brings the next one.</span>
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              From the first search to the fifth-star review — Connect automates every step so your clinic grows while you focus on patient care.
            </p>
          </div>

          <div className="flex items-center justify-center gap-16">
            <DesktopLoop
              active={activeStep}
              setActive={(i) => {
                setActiveStep(i);
              }}
            />
            <DesktopInfoPanel step={LOOP_STEPS[activeStep]} />
          </div>

          <div className="flex justify-center gap-3 mt-12">
            {LOOP_STEPS.map((step, i) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(i)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 border-2"
                style={{
                  backgroundColor: activeStep === i ? step.color : "transparent",
                  borderColor: activeStep === i ? step.color : "#e5e7eb",
                  color: activeStep === i ? "#fff" : "#9ca3af",
                }}
              >
                {step.id}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEEDBACK LOOP — MOBILE ────────────────────────────── */}
      <section className="lg:hidden bg-white relative">
        <MobileProgress active={mobileActiveStep} />
        <div className="text-center pt-28 pb-8 px-6">
          <h2 className="text-2xl font-black text-gray-900 mb-2">
            A loop that runs itself.
          </h2>
          <p className="text-gray-500 text-sm">
            Every patient brings the next one.
          </p>
        </div>
        {LOOP_STEPS.map((step, index) => (
          <div
            key={step.id}
            ref={el => (stepRefs.current[index] = el)}
          >
            <MobileStepCard step={step} index={index} />
          </div>
        ))}
        {/* Loop back indicator */}
        <div className="flex flex-col items-center py-12 px-6 text-center">
          <div className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center mb-4 shadow-xl">
            <ArrowRight className="w-7 h-7 text-white rotate-[-90deg]" />
          </div>
          <p className="font-bold text-gray-900 mb-1">And the loop begins again.</p>
          <p className="text-gray-500 text-sm">Every satisfied patient feeds the next cycle.</p>
        </div>
      </section>

      {/* ── CTA BAND ─────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-indigo-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Ready to build your clinic's growth engine?
          </h2>
          <p className="text-indigo-200 text-lg mb-8">
            Join 200+ dental clinics already on Connect. Setup in 48 hours. No lock-in.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/get-in-touch"
              className="bg-white text-indigo-600 font-bold px-8 py-4 rounded-full hover:bg-indigo-50 transition-colors flex items-center gap-2 justify-center"
            >
              Book a Free Demo <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/pricing"
              className="border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-colors"
            >
              View Pricing
            </a>
          </div>
        </div>
      </section>

      <FinalPoster />
      <Footer />
    </>
  );
};

export default DentalClinics;
