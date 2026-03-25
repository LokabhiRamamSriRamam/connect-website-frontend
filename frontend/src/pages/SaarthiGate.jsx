import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Loader } from "lucide-react";

const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/;

const DESIGNATIONS = [
  "CEO",
  "Owner / Proprietor",
  "Managing Partner",
  "General Manager",
  "Manager",
  "Director",
  "Other",
];

export default function SaarthiGate() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    designation: "",
    companyName: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [mobileChecking, setMobileChecking] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleMobileBlur = async () => {
    const mobile = form.mobile.trim();
    if (!INDIAN_MOBILE_REGEX.test(mobile)) return;
    setMobileChecking(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/saarthi/check-mobile/${mobile}`
      );
      const data = await res.json();
      if (data.exists) {
        setErrors((prev) => ({
          ...prev,
          mobile: "Yeh number pehle se registered hai. Koi doosra number use karein.",
        }));
      }
    } catch (_) {
      // silently ignore — submit will catch it
    } finally {
      setMobileChecking(false);
    }
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Naam zaroori hai";
    if (!form.mobile.trim()) {
      e.mobile = "Mobile number zaroori hai";
    } else if (!INDIAN_MOBILE_REGEX.test(form.mobile.trim())) {
      e.mobile = "10 digit ka valid Indian mobile number daalein (6–9 se shuru)";
    }
    if (!form.designation) e.designation = "Designation select karein";
    if (!form.companyName.trim()) e.companyName = "Company ka naam zaroori hai";
    if (
      form.email.trim() &&
      !/\S+@\S+\.\S+/.test(form.email.trim())
    ) {
      e.email = "Valid email address daalein";
    }
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/saarthi`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          mobile: form.mobile.trim(),
          email: form.email.trim() || undefined,
          designation: form.designation,
          companyName: form.companyName.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Kuch galat ho gaya");
      navigate("/saarthi/smartreport", { state: { user: data.user } });
    } catch (err) {
      if (
        err.message.toLowerCase().includes("already registered") ||
        err.message.toLowerCase().includes("mobile")
      ) {
        setErrors((prev) => ({ ...prev, mobile: err.message }));
      } else {
        setStatus({ type: "error", message: err.message });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .saarthi-gradient {
          background: linear-gradient(
            120deg,
            rgba(255, 240, 245, 1),
            rgba(224, 240, 255, 1),
            rgba(255, 255, 255, 1)
          );
          background-size: 300% 300%;
          animation: saarthiGradientShift 15s ease infinite;
        }
        @keyframes saarthiGradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <div className="saarthi-gradient min-h-screen pt-28 pb-16 px-4">
        <div className="max-w-xl mx-auto">
          {/* Glass card */}
          <div
            className="rounded-3xl p-8 md:p-10 shadow-2xl"
            style={{
              background: "rgba(255,255,255,0.55)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.65)",
            }}
          >
            {/* Section label */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="h-1.5 w-6 bg-purple-500 rounded-full" />
              <span className="text-xs font-semibold tracking-[0.2em] text-gray-500 uppercase">
                Saarthi · Smart Report
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight mb-2">
              Apni Dukaan Ki Asli Tasveer Dekhein
            </h1>
            <p className="text-gray-500 font-light mb-8">
              5 sawaalon mein jaanein aapke vyapar ki sacchai — bilkul muft.
            </p>

            {/* Status message */}
            {status.message && (
              <div
                className={`mb-6 px-4 py-3 rounded-xl text-sm font-medium ${
                  status.type === "error"
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold tracking-[0.15em] text-gray-500 uppercase mb-1.5">
                  Aapka Naam *
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Ramesh Kumar"
                  className={`w-full border-2 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none transition-colors ${
                    errors.name
                      ? "border-red-400 bg-red-50"
                      : "border-gray-200 bg-white focus:border-purple-400"
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-red-600 mt-1">{errors.name}</p>
                )}
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-xs font-semibold tracking-[0.15em] text-gray-500 uppercase mb-1.5">
                  Mobile Number * (10 digit)
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    onBlur={handleMobileBlur}
                    placeholder="9876543210"
                    maxLength={10}
                    inputMode="numeric"
                    className={`w-full border-2 rounded-xl px-4 py-3 pr-10 text-gray-900 placeholder-gray-400 focus:outline-none transition-colors ${
                      errors.mobile
                        ? "border-red-400 bg-red-50"
                        : "border-gray-200 bg-white focus:border-purple-400"
                    }`}
                  />
                  {mobileChecking && (
                    <Loader
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400 animate-spin"
                    />
                  )}
                </div>
                {errors.mobile && (
                  <p className="text-xs text-red-600 mt-1">{errors.mobile}</p>
                )}
              </div>

              {/* Email (optional) */}
              <div>
                <label className="block text-xs font-semibold tracking-[0.15em] text-gray-500 uppercase mb-1.5">
                  Email Address{" "}
                  <span className="normal-case font-normal text-gray-400">(optional)</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="aap@example.com"
                  className={`w-full border-2 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none transition-colors ${
                    errors.email
                      ? "border-red-400 bg-red-50"
                      : "border-gray-200 bg-white focus:border-purple-400"
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                )}
              </div>

              {/* Designation */}
              <div>
                <label className="block text-xs font-semibold tracking-[0.15em] text-gray-500 uppercase mb-1.5">
                  Aapka Designation *
                </label>
                <select
                  name="designation"
                  value={form.designation}
                  onChange={handleChange}
                  className={`w-full border-2 rounded-xl px-4 py-3 text-gray-900 focus:outline-none transition-colors appearance-none bg-white ${
                    errors.designation
                      ? "border-red-400 bg-red-50"
                      : "border-gray-200 focus:border-purple-400"
                  }`}
                >
                  <option value="">-- Select karo --</option>
                  {DESIGNATIONS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                {errors.designation && (
                  <p className="text-xs text-red-600 mt-1">{errors.designation}</p>
                )}
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-xs font-semibold tracking-[0.15em] text-gray-500 uppercase mb-1.5">
                  Company / Dukaan Ka Naam *
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
                  placeholder="Sharma Traders"
                  className={`w-full border-2 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none transition-colors ${
                    errors.companyName
                      ? "border-red-400 bg-red-50"
                      : "border-gray-200 bg-white focus:border-purple-400"
                  }`}
                />
                {errors.companyName && (
                  <p className="text-xs text-red-600 mt-1">{errors.companyName}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl font-bold text-sm uppercase tracking-wider shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Thoda ruko...
                  </>
                ) : (
                  <>
                    Report Dekhein
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-center text-xs text-gray-400 pt-1">
                Aapki jankari safe hai. Kisi ke saath share nahi hogi.
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
