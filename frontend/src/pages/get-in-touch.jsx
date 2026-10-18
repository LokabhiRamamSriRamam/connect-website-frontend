import { useState } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { ArrowRight, Loader2, AlertCircle, MonitorPlay, RotateCcw } from "lucide-react";
import TopNav from "../components/TopNav";
import SBFooter from "../components/screenbazaar/SBFooter";
import { Squiggle, Sparkle, Blob, Burst } from "../components/screenbazaar/Decor";
import {
  MessageToScreen,
  RingingPhoneIcon,
  ChatBubbleIcon,
  EnvelopeIcon,
  MapPinIcon,
  ScreenOnSuccess,
  StepConnector,
} from "../components/screenbazaar/ContactArt";
import { INDUSTRIES } from "../components/screenbazaar/content";
import { inputCls, PillGroup, Field, useFormErrors } from "../components/forms/fields";
import {
  SERVICES,
  SB_SERVICE,
  VITAL_SERVICE,
  MOLARIS_SERVICE,
  NEXUS_SERVICE,
  SAARTHI_SERVICE,
  CONTRACTORS_SERVICE,
  BEAUTY_SERVICE,
  LEAD_SOURCE_CONTACT,
} from "../components/forms/services";
import { WA_PRIMARY, WA_SECONDARY, waDisplay, waLink } from "../lib/whatsapp";
import "../components/screenbazaar/sb.css";

/* Contact Us — Screen Bazaar. Same look as the landing page (see SCREEN_BAZAAR_PLAN.md §1). */

const PHONE_DISPLAY = "+91 82914 89909";
const PHONE_TEL = "+918291489909";
const WHATSAPP_NUMBERS = [WA_PRIMARY, WA_SECONDARY];

const CHANNELS = [
  {
    Icon: RingingPhoneIcon,
    title: "Call us",
    line: PHONE_DISPLAY,
    note: "Talk to our team directly",
    href: `tel:${PHONE_TEL}`,
    bg: "bg-sb-gold",
    rot: "-rotate-2",
  },
  {
    Icon: ChatBubbleIcon,
    title: "WhatsApp",
    note: "Send a photo of your space",
    links: WHATSAPP_NUMBERS.map((n) => ({
      label: waDisplay(n),
      href: waLink("contact", n),
    })),
    bg: "bg-sb-mint",
    rot: "rotate-1",
  },
  {
    Icon: EnvelopeIcon,
    title: "Email",
    line: "connectgenai@gmail.com",
    note: "Sales & support",
    href: "mailto:connectgenai@gmail.com",
    bg: "bg-sb-lilac",
    rot: "-rotate-1",
  },
  {
    Icon: MapPinIcon,
    title: "Visit us",
    line: "Ishwar Nagar, Mumbai",
    note: "LBS Marg, C/26 · 400078",
    href: "https://www.google.com/maps/search/?api=1&query=LBS+Marg+C%2F26+Ishwar+Nagar+Mumbai+400078",
    external: true,
    bg: "bg-white",
    rot: "rotate-2",
  },
];

const NEXT_STEPS = [
  { title: "We call you back", text: "Within 24 hours — to understand your space and what your screens should do." },
  { title: "We plan your setup", text: "Screen size, where it goes, what it shows and when it shows it." },
  { title: "Your screen goes to work", text: "Connected to the Screen Bazaar app, ready for you to update from your phone." },
];

const SCREEN_COUNTS = ["1", "2–5", "6–20", "20+", "Not sure"];


// Same options as "Shape your quote" on /pricing, so a visitor's choices carry over.
const SCREEN_SOURCES = ["Buy the screen from you", "Use my own screen"];
const SCREEN_KINDS = ["Compact — counters and desks", "Standard — menu boards and shop walls", "Large — lobbies and showrooms", "Help me choose"];
const SCALES = ["One location", "A few locations", "Many locations"];

// Vital.AI — healthcare documentation, any specialty (see VitalSpecialties.jsx).
const VITAL_SPECIALTIES = [
  "Family Medicine", "Cardiology", "Pediatrics", "Mental Health", "Dentistry", "Dermatology",
  "Orthopedics", "OB/GYN", "Internal Medicine", "Veterinary", "Other",
];
const CLINICIAN_COUNTS = ["Just me", "2–5", "6–20", "20+"];

// Molaris.AI — dental clinics specifically.
const CHAIR_COUNTS = ["1", "2–5", "6+"];

// Nexus CRM — team / pipeline sizing.
const TEAM_SIZES = ["Just me", "2–5", "6–20", "20+"];
const LEAD_VOLUMES = ["Under 50/month", "50–200/month", "200+/month"];

// Saarthi AI — MSMEs and other businesses running billing/stock/accounts.
const BUSINESS_TYPES = ["Retail / shop", "Wholesale / distribution", "Manufacturing", "Services", "Other"];

// Saarthi for Contractors — workers, attendance, payroll.
const WORKER_COUNTS = ["Under 10", "10–50", "50–200", "200+"];
const SITE_COUNTS = ["1", "2–5", "6+"];

// Beauty Manager — salons and spas.
const SALON_TYPES = ["Salon", "Spa", "Salon & spa", "Academy / training", "Other"];
const STYLIST_COUNTS = ["1–3", "4–10", "11–25", "25+"];
const BRANCH_COUNTS = ["1", "2–5", "6+"];

const EMPTY = {
  name: "",
  businessName: "",
  phone: "",
  email: "",
  city: "",
  industry: "",
  service: "",
  screenSource: "",
  screenKind: "",
  scale: "",
  screens: "",
  specialty: "",
  clinicians: "",
  chairs: "",
  teamSize: "",
  leadVolume: "",
  businessType: "",
  workers: "",
  sites: "",
  salonType: "",
  stylists: "",
  branches: "",
  message: "",
  website: "", // honeypot — real people never see or fill this
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(f) {
  const e = {};
  if (f.name.trim().length < 2) e.name = "Please tell us your name.";
  const digits = f.phone.replace(/\D/g, "");
  if (!digits) e.phone = "We need a number to call you back on.";
  else if (!/^\+?[\d\s\-().]+$/.test(f.phone.trim()) || digits.length < 10 || digits.length > 15)
    e.phone = "Enter a valid phone number, e.g. +91 98765 43210.";
  if (!f.service) e.service = "Please choose what you're interested in.";
  if (!f.email.trim()) e.email = "We need an email to send your confirmation to.";
  else if (!EMAIL_RE.test(f.email.trim())) e.email = "That email doesn't look right.";
  if (f.message.length > 2000) e.message = "Please keep it under 2000 characters.";
  return e;
}

// Per-service qualifying questions shown under the service dropdown. Each field name must exist in EMPTY.
const SERVICE_QUESTIONS = {
  [SB_SERVICE]: [
    { legend: "Which screen?", name: "screenSource", options: SCREEN_SOURCES },
    { legend: "What kind of screen?", name: "screenKind", options: SCREEN_KINDS },
    { legend: "How many locations?", name: "scale", options: SCALES },
  ],
  [VITAL_SERVICE]: [
    { legend: "Specialty", name: "specialty", options: VITAL_SPECIALTIES },
    { legend: "How many clinicians?", name: "clinicians", options: CLINICIAN_COUNTS },
  ],
  [MOLARIS_SERVICE]: [
    { legend: "How many chairs?", name: "chairs", options: CHAIR_COUNTS },
  ],
  [NEXUS_SERVICE]: [
    { legend: "Sales team size", name: "teamSize", options: TEAM_SIZES },
    { legend: "Leads per month", name: "leadVolume", options: LEAD_VOLUMES },
  ],
  [SAARTHI_SERVICE]: [
    { legend: "Type of business", name: "businessType", options: BUSINESS_TYPES },
  ],
  [CONTRACTORS_SERVICE]: [
    { legend: "How many workers?", name: "workers", options: WORKER_COUNTS },
    { legend: "How many sites?", name: "sites", options: SITE_COUNTS },
  ],
  [BEAUTY_SERVICE]: [
    { legend: "Salon or spa?", name: "salonType", options: SALON_TYPES },
    { legend: "How many stylists?", name: "stylists", options: STYLIST_COUNTS },
    { legend: "How many branches?", name: "branches", options: BRANCH_COUNTS },
  ],
};

// Every field name that appears in any service's question list — used to strip the ones
// that don't apply to the chosen service before submitting.
const ALL_SERVICE_FIELDS = [...new Set(Object.values(SERVICE_QUESTIONS).flat().map((q) => q.name))];

function ContactForm() {
  // The pricing page links here with ?screens=…&message=… to carry the visitor's setup over.
  const [form, setForm] = useState(() => {
    if (typeof window === "undefined") return EMPTY;
    const q = new URLSearchParams(window.location.search);
    const screens = q.get("screens");
    return {
      ...EMPTY,
      screens: SCREEN_COUNTS.includes(screens) ? screens : "",
      service: SERVICES.includes(q.get("service")) ? q.get("service") : "",
      screenSource: SCREEN_SOURCES.includes(q.get("source")) ? q.get("source") : "",
      screenKind: SCREEN_KINDS.includes(q.get("kind")) ? q.get("kind") : "",
      scale: SCALES.includes(q.get("scale")) ? q.get("scale") : "",
      specialty: VITAL_SPECIALTIES.includes(q.get("specialty")) ? q.get("specialty") : "",
      clinicians: CLINICIAN_COUNTS.includes(q.get("clinicians")) ? q.get("clinicians") : "",
      chairs: CHAIR_COUNTS.includes(q.get("chairs")) ? q.get("chairs") : "",
      teamSize: TEAM_SIZES.includes(q.get("teamSize")) ? q.get("teamSize") : "",
      leadVolume: LEAD_VOLUMES.includes(q.get("leadVolume")) ? q.get("leadVolume") : "",
      businessType: BUSINESS_TYPES.includes(q.get("businessType")) ? q.get("businessType") : "",
      workers: WORKER_COUNTS.includes(q.get("workers")) ? q.get("workers") : "",
      sites: SITE_COUNTS.includes(q.get("sites")) ? q.get("sites") : "",
      salonType: SALON_TYPES.includes(q.get("salonType")) ? q.get("salonType") : "",
      stylists: STYLIST_COUNTS.includes(q.get("stylists")) ? q.get("stylists") : "",
      branches: BRANCH_COUNTS.includes(q.get("branches")) ? q.get("branches") : "",
      message: (q.get("message") || "").slice(0, 2000),
    };
  });
  const { errors, setErrors, shakeKey, formRef, fail, clearError, errProps } = useFormErrors();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [sent, setSent] = useState(null);

  const set = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    clearError(name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    const found = validate(form);
    if (Object.keys(found).length) {
      fail(found);
      return;
    }

    // Bot filled the hidden field — pretend it worked, send nothing.
    if (form.website) {
      setSent({ name: form.name.trim().split(" ")[0], phone: form.phone.trim() });
      return;
    }

    setLoading(true);
    try {
      // Keep only this service's own qualifying fields (plus industry/screens, which are SB-only).
      const activeFields = new Set((SERVICE_QUESTIONS[form.service] || []).map((q) => q.name));
      const sbOnlyFields = ["industry", "screens"];
      const body = Object.fromEntries(
        Object.entries(form)
          .filter(
            ([k]) =>
              k !== "website" &&
              (!ALL_SERVICE_FIELDS.includes(k) || activeFields.has(k)) &&
              (!sbOnlyFields.includes(k) || form.service === SB_SERVICE)
          )
          .map(([k, v]) => [k, v.trim()])
      );
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...body, source: LEAD_SOURCE_CONTACT }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (data.fields) setErrors(data.fields);
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setSent({ name: body.name.split(" ")[0], phone: body.phone });
      setForm(EMPTY);
      setErrors({});
    } catch (err) {
      setServerError(
        err instanceof TypeError
          ? `We couldn't reach our server. Please call or WhatsApp us on ${PHONE_DISPLAY}.`
          : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[32px] border-2 border-sb-ink bg-sb-gradient" aria-hidden="true" />
      <div className="relative rounded-[32px] border-2 border-sb-ink bg-sb-ivory p-6 sm:p-8">
        <AnimatePresence mode="wait" initial={false}>
          {sent ? (
            <motion.div
              key="sent"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="py-6 text-center"
              role="status"
              aria-live="polite"
            >
              <ScreenOnSuccess className="mx-auto h-44 w-auto" />
              <h2 className="mt-4 font-manrope text-3xl font-extrabold tracking-tight text-sb-ink">
                Thank you{sent.name ? `, ${sent.name}` : ""}!
              </h2>
              <p className="mx-auto mt-3 max-w-sm font-manrope text-base font-semibold text-sb-slate">
                We&apos;ve got your message. Someone from our team will call you on{" "}
                <span className="whitespace-nowrap font-extrabold text-sb-ink">{sent.phone}</span> within 24 hours.
              </p>
              <button
                type="button"
                onClick={() => setSent(null)}
                className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-sb-ink bg-white px-6 py-3 font-manrope text-sm font-extrabold text-sb-ink shadow-[3px_3px_0_#191919] transition-transform hover:-translate-y-0.5"
              >
                <RotateCcw size={16} /> Send another message
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              className="space-y-5"
            >
              <div>
                <h2 className="font-manrope text-2xl font-extrabold tracking-tight text-sb-ink">Tell us about your business</h2>
                <p className="mt-1 font-manrope text-sm font-semibold text-sb-muted">
                  Fields marked <span className="text-sb-violet">*</span> are required.
                </p>
              </div>

              <div className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="name" label={<span>Your name <span className="text-sb-violet">*</span></span>} error={errors.name} shakeKey={shakeKey}>
                    <input id="name" name="name" value={form.name} onChange={set} autoComplete="name" maxLength={100} placeholder="Priya Sharma" className={inputCls(errors.name)} {...errProps("name")} />
                  </Field>
                  <Field id="businessName" label="Business name" optional error={errors.businessName} shakeKey={shakeKey}>
                    <input id="businessName" name="businessName" value={form.businessName} onChange={set} autoComplete="organization" maxLength={150} placeholder="Sharma Sweets" className={inputCls(errors.businessName)} {...errProps("businessName")} />
                  </Field>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="phone" label={<span>Phone / WhatsApp <span className="text-sb-violet">*</span></span>} error={errors.phone} shakeKey={shakeKey}>
                    <input id="phone" name="phone" type="tel" inputMode="tel" value={form.phone} onChange={set} autoComplete="tel" maxLength={20} placeholder="+91 98765 43210" className={inputCls(errors.phone)} {...errProps("phone")} />
                  </Field>
                  <Field id="email" label={<span>Email <span className="text-sb-violet">*</span></span>} error={errors.email} shakeKey={shakeKey}>
                    <input id="email" name="email" type="email" inputMode="email" value={form.email} onChange={set} autoComplete="email" maxLength={200} placeholder="priya@sharmasweets.in" className={inputCls(errors.email)} {...errProps("email")} />
                  </Field>
                </div>

                <Field id="service" label={<span>What are you interested in? <span className="text-sb-violet">*</span></span>} error={errors.service} shakeKey={shakeKey}>
                  <select id="service" name="service" value={form.service} onChange={set} className={`${inputCls(errors.service)} appearance-none pr-10 ${form.service ? "" : "text-sb-muted/70"}`} {...errProps("service")}>
                    <option value="">Choose one</option>
                    {SERVICES.map((x) => (
                      <option key={x} value={x} className="text-sb-ink">{x}</option>
                    ))}
                  </select>
                </Field>

                {SERVICE_QUESTIONS[form.service] && (
                  <div className="space-y-5 rounded-2xl border-2 border-dashed border-sb-ink bg-white/60 p-4">
                    {SERVICE_QUESTIONS[form.service].map((q) => (
                      <PillGroup key={q.name} legend={q.legend} name={q.name} value={form[q.name]} options={q.options} onChange={set} />
                    ))}
                  </div>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="city" label="City" optional error={errors.city} shakeKey={shakeKey}>
                    <input id="city" name="city" value={form.city} onChange={set} autoComplete="address-level2" maxLength={100} placeholder="Mumbai" className={inputCls(errors.city)} {...errProps("city")} />
                  </Field>
                  {form.service === SB_SERVICE && (
                    <Field id="industry" label="Industry" optional error={errors.industry} shakeKey={shakeKey}>
                      <select id="industry" name="industry" value={form.industry} onChange={set} className={`${inputCls(errors.industry)} appearance-none bg-[length:18px] bg-[right_1rem_center] bg-no-repeat pr-10 ${form.industry ? "" : "text-sb-muted/70"}`} style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23191919' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")" }}>
                        <option value="">Choose one</option>
                        {INDUSTRIES.map((i) => (
                          <option key={i.slug} value={i.label} className="text-sb-ink">{i.label}</option>
                        ))}
                        <option value="Other" className="text-sb-ink">Other</option>
                      </select>
                    </Field>
                  )}
                </div>

                {form.service === SB_SERVICE && (
                  <PillGroup legend="How many screens?" name="screens" value={form.screens} options={SCREEN_COUNTS} onChange={set} optional />
                )}

                <Field
                  id="message"
                  label={form.service === SB_SERVICE ? "What should your screens do?" : "Anything else we should know?"}
                  optional
                  error={errors.message}
                  shakeKey={shakeKey}
                >
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={set}
                    rows={4}
                    maxLength={2000}
                    placeholder={form.service === SB_SERVICE ? "e.g. Show our daily menu and weekend offers across 3 branches." : "Tell us a bit more about what you need."}
                    className={`${inputCls(errors.message)} resize-y`}
                    {...errProps("message")}
                  />
                </Field>
              </div>

              {/* honeypot */}
              <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="website">Leave this empty</label>
                <input id="website" name="website" value={form.website} onChange={set} tabIndex={-1} autoComplete="off" />
              </div>

              {serverError && (
                <div role="alert" className="flex items-start gap-2 rounded-2xl border-2 border-red-500 bg-sb-blush px-4 py-3 font-manrope text-sm font-bold text-red-700">
                  <AlertCircle size={18} className="mt-0.5 shrink-0" /> {serverError}
                </div>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={loading ? undefined : { scale: 1.02, rotate: -0.5 }}
                whileTap={loading ? undefined : { scale: 0.98 }}
                className="group flex w-full items-center justify-center gap-3 rounded-full border-2 border-sb-ink bg-sb-gradient px-8 py-4 font-manrope text-lg font-extrabold text-white shadow-[5px_5px_0_#191919] transition-shadow hover:shadow-[7px_7px_0_#191919] disabled:cursor-wait disabled:opacity-80"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} /> Sending…
                  </>
                ) : (
                  <>
                    Send message
                    <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} />
                  </>
                )}
              </motion.button>
              <p className="text-center font-manrope text-xs font-bold text-sb-muted">
                We usually respond within 24 hours.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function GetInTouch() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="sb-root min-h-screen overflow-x-clip">
        <TopNav theme="cream" />
        <main>
          {/* ---------- hero + form ---------- */}
          <section className="relative overflow-hidden bg-sb-warm pb-20 pt-32 sm:pt-36">
            <Blob className="absolute -left-24 top-24 h-72 w-72 bg-sb-lilac opacity-70 blur-2xl" />
            <Blob className="absolute -right-20 -top-16 h-96 w-96 bg-sb-violet/25 blur-3xl" style={{ animationDelay: "-4s" }} />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.35]"
              style={{
                backgroundImage: "radial-gradient(rgba(75,63,208,0.18) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
                maskImage: "linear-gradient(180deg, black, transparent 80%)",
                WebkitMaskImage: "linear-gradient(180deg, black, transparent 80%)",
              }}
            />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-sb-ink bg-white px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-sb-ink shadow-[3px_3px_0_#191919]"
                >
                  <Sparkle size={14} color="#914BFA" />
                  Contact us
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-6 font-manrope text-5xl font-extrabold leading-[1.04] tracking-tight text-sb-ink sm:text-6xl lg:text-7xl"
                >
                  Let&apos;s put your{" "}
                  <span className="relative inline-block">
                    <span className="sb-gradient-text">screen</span>
                    <Squiggle className="absolute -bottom-3 left-0 h-4 w-full sm:-bottom-4 sm:h-5" />
                  </span>{" "}
                  to work.
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mx-auto mt-8 max-w-xl font-manrope text-lg font-bold text-sb-slate sm:text-xl"
                >
                  Tell us a little about your business. We&apos;ll call you back and help you <span className="sb-mark">pick the right setup.</span>
                </motion.p>
              </div>

              <div className="mt-14 grid items-start gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, type: "spring", stiffness: 140, damping: 20 }}
                >
                  <ContactForm />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.7 }}
                  className="relative order-first lg:order-none lg:sticky lg:top-28"
                >
                  <MessageToScreen className="mx-auto block w-full max-w-lg" />
                  <Burst label="Reply within 24 hrs" size={104} className="absolute -top-4 left-0 hidden sm:block" />
                </motion.div>
              </div>
            </div>
          </section>

          {/* ---------- other ways to reach us ---------- */}
          <section className="relative bg-sb-cream px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <div className="text-center">
                <p className="font-manrope text-xs font-extrabold uppercase tracking-[0.2em] text-sb-violet">Rather talk now?</p>
                <h2 className="mt-3 font-manrope text-4xl font-extrabold tracking-tight text-sb-ink sm:text-5xl">
                  Pick your <span className="sb-gradient-text">channel.</span>
                </h2>
              </div>

              <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {CHANNELS.map(({ Icon, title, line, note, href, external, links, bg, rot }, i) =>
                  links ? (
                    <motion.div
                      key={title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ delay: i * 0.1, type: "spring", stiffness: 200, damping: 20 }}
                      whileHover={{ rotate: 0, y: -6 }}
                      className={`group relative flex flex-col rounded-[28px] border-2 border-sb-ink p-6 text-sb-ink shadow-[6px_6px_0_#191919] transition-shadow hover:shadow-[9px_9px_0_#191919] ${bg} ${rot}`}
                    >
                      <Icon size={64} />
                      <h3 className="mt-4 font-manrope text-2xl font-extrabold tracking-tight">{title}</h3>
                      <div className="mt-1 flex flex-col gap-1">
                        {links.map((l) => (
                          <a
                            key={l.href}
                            href={l.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="break-words font-manrope text-base font-extrabold underline-offset-2 hover:underline"
                          >
                            {l.label}
                          </a>
                        ))}
                      </div>
                      <p className="mt-1 font-manrope text-sm font-semibold opacity-70">{note}</p>
                      <span className="mt-5 inline-flex items-center gap-1.5 font-manrope text-sm font-extrabold text-sb-violet">
                        Open
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </motion.div>
                  ) : (
                    <motion.a
                      key={title}
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ delay: i * 0.1, type: "spring", stiffness: 200, damping: 20 }}
                      whileHover={{ rotate: 0, y: -6 }}
                      className={`group relative flex flex-col rounded-[28px] border-2 border-sb-ink p-6 text-sb-ink shadow-[6px_6px_0_#191919] transition-shadow hover:shadow-[9px_9px_0_#191919] ${bg} ${rot}`}
                    >
                      <Icon size={64} />
                      <h3 className="mt-4 font-manrope text-2xl font-extrabold tracking-tight">{title}</h3>
                      <p className="mt-1 break-words font-manrope text-base font-extrabold">{line}</p>
                      <p className="mt-1 font-manrope text-sm font-semibold opacity-70">{note}</p>
                      <span className="mt-5 inline-flex items-center gap-1.5 font-manrope text-sm font-extrabold text-sb-violet">
                        {external ? "Open" : title === "Call us" ? "Call now" : "Write to us"}
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </motion.a>
                  )
                )}
              </div>
            </div>
          </section>

          {/* ---------- what happens next ---------- */}
          <section className="relative overflow-hidden bg-sb-cream px-4 pb-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl rounded-[36px] border-2 border-sb-ink bg-white px-6 py-14 shadow-[8px_8px_0_#191919] sm:px-10">
              <div className="text-center">
                <p className="font-manrope text-xs font-extrabold uppercase tracking-[0.2em] text-sb-violet">After you hit send</p>
                <h2 className="mt-3 font-manrope text-4xl font-extrabold tracking-tight text-sb-ink sm:text-5xl">What happens next.</h2>
              </div>

              <div className="relative mt-14">
                <StepConnector className="pointer-events-none absolute left-[8%] right-[8%] top-3 hidden h-12 md:block" />
                <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
                  {NEXT_STEPS.map((s, i) => (
                    <motion.li
                      key={s.title}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ delay: i * 0.15, type: "spring", stiffness: 200, damping: 20 }}
                      className="text-center"
                    >
                      <span
                        className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-sb-ink font-manrope text-2xl font-extrabold shadow-[4px_4px_0_#191919] ${
                          i === 0 ? "bg-sb-gold text-sb-ink" : i === 1 ? "bg-sb-lilac text-sb-ink" : "bg-sb-gradient text-white"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <h3 className="mt-5 font-manrope text-2xl font-extrabold tracking-tight text-sb-ink">{s.title}</h3>
                      <p className="mx-auto mt-2 max-w-xs font-manrope text-base font-semibold text-sb-slate">{s.text}</p>
                    </motion.li>
                  ))}
                </ol>
              </div>

              {/* Below the form on purpose: for someone who scrolled past without
                  sending, this is a second chance, not a competing CTA. */}
              <div className="mt-12 border-t-2 border-dashed border-sb-line pt-10 text-center">
                <p className="font-manrope text-lg font-extrabold text-sb-ink">
                  Not ready to talk yet?
                </p>
                <p className="mx-auto mt-2 max-w-md font-manrope text-base font-semibold text-sb-slate">
                  Take a test drive instead — schedule content across five screens yourself and see
                  how it works. No signup, about two minutes.
                </p>
                <a
                  href="/test-drive"
                  className="group mt-6 inline-flex items-center gap-2.5 rounded-full border-2 border-sb-ink bg-white px-7 py-3.5 font-manrope text-base font-extrabold text-sb-ink shadow-[4px_4px_0_#191919] transition-transform hover:-translate-y-0.5"
                >
                  <MonitorPlay size={18} className="text-sb-violet" />
                  Take a test drive
                  <ArrowRight className="transition-transform group-hover:translate-x-1" size={18} />
                </a>
              </div>
            </div>
          </section>
        </main>
        <SBFooter />
      </div>
    </MotionConfig>
  );
}
