import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ConnectRegistration = () => {
  const { role } = useParams();
  
  const [form, setForm] = useState({
    role: role || "sales",
    companyName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (role && ["owner", "manager", "sales"].includes(role)) {
      setForm(prev => ({ ...prev, role }));
    }
  }, [role]);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [errors, setErrors] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitData, setSubmitData] = useState(null);

  const companies = [
    "Tatvan Research pvt. ltd. (Ahmedabad, Gujarat)",
    "Jay Telecom (Mau, UP)",
    "Harish Kitchen (Thane)",
    "Dr. Juhi's Confidental Clinic (Thane)",
    "Anna's Tiffin (Thane)",
    "Subject Buddy (Mumbai)",
    "The Fit Fork (Mumbai)",
    "The Central App (Mumbai)",
    "Kollect Care (Gurgaon)",
    "GRG (Delhi)"
  ];

  const roleConfig = {
    owner: { 
      title: "OWNER REGISTRATION", 
      subtitle: "Complete business owner access to POS platform.",
      emoji: "👑",
      color: "from-yellow-400 to-orange-500",
      badgeText: "OWNER Access - Full platform control"
    },
    manager: { 
      title: "MANAGER REGISTRATION", 
      subtitle: "Team oversight and operations management.",
      emoji: "🛠️",
      color: "from-blue-400 to-indigo-500", 
      badgeText: "MANAGER Access - Team oversight"
    },
    sales: { 
      title: "SALES REGISTRATION", 
      subtitle: "Daily sales operations and customer management.",
      emoji: "💼",
      color: "from-green-400 to-emerald-500",
      badgeText: "SALES Access - Daily operations"
    }
  };

  const currentRoleConfig = roleConfig[form.role] || roleConfig.sales;

  const validateForm = () => {
    const newErrors = {};
    if (!form.companyName) newErrors.companyName = "Please select a company";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email is invalid";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\+?\d{10,15}$/.test(form.phone.replace(/\s/g, ''))) newErrors.phone = "Phone must be 10-15 digits";
    if (form.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    else if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) {
      const updatedErrors = { ...errors };
      delete updatedErrors[name];
      setErrors(updatedErrors);
    }
  };

  // ✅ FIXED: Proper form submission flow
  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setSubmitData({ ...form, source: "website_connect_registration" });
    setShowConfirm(true);
  };

  const confirmSubmit = async () => {
    setShowConfirm(false);
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Registration failed");

      setStatus({ type: "success", message: "Registration successful! Check your email for verification." });
      setForm({ role: form.role, companyName: "", email: "", phone: "", password: "", confirmPassword: "" });
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    } finally {
      setLoading(false);
    }
  };

  const cancelSubmit = () => {
    setShowConfirm(false);
    setSubmitData(null);
  };

  return (
    <>
      <div className={`bg-gradient-to-br ${currentRoleConfig.color} min-h-screen py-20 px-6 text-gray-900`}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4">
            {currentRoleConfig.emoji} <br />
            {currentRoleConfig.title}
          </h1>
          <p className="text-lg font-medium opacity-80 mb-16">
            {currentRoleConfig.subtitle}
          </p>

          {/* ✅ FIXED: FORM WRAPPER ADDED */}
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-10 shadow-2xl text-left max-w-2xl mx-auto">
            
            {/* Role Badge */}
            <div className={`border-2 rounded-2xl p-6 mb-8 ${
              form.role === 'owner' ? 'border-yellow-300 bg-yellow-50' :
              form.role === 'manager' ? 'border-blue-300 bg-blue-50' :
              'border-green-300 bg-green-50'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 ${currentRoleConfig.color} rounded-2xl flex items-center justify-center font-black text-xl text-white shadow-lg`}>
                  {currentRoleConfig.emoji}
                </div>
                <div>
                  <h3 className="font-black text-xl text-gray-900">{currentRoleConfig.badgeText}</h3>
                  <p className="text-sm text-gray-600">Role confirmed</p>
                </div>
              </div>
            </div>

            {/* Status Messages */}
            {status.message && (
              <div className={`p-4 rounded-xl font-bold text-sm mb-6 ${
                status.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}>
                {status.message}
              </div>
            )}

            {/* Company Dropdown */}
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest mb-2">Company</label>
                <select
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
                  required
                  className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400 ${
                    errors.companyName ? "border-red-400 bg-red-50" : "border-gray-200"
                  }`}
                >
                  <option value="">Select Company</option>
                  {companies.map((company, index) => (
                    <option key={index} value={company}>{company}</option>
                  ))}
                </select>
                {errors.companyName && <p className="text-xs text-red-600 mt-1">{errors.companyName}</p>}
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest mb-2">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    required
                    onChange={handleChange}
                    className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400 ${
                      errors.email ? "border-red-400 bg-red-50" : "border-gray-200"
                    }`}
                    placeholder="business@company.com"
                  />
                  {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-widest mb-2">Phone / WhatsApp</label>
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    required
                    onChange={handleChange}
                    className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400 ${
                      errors.phone ? "border-red-400 bg-red-50" : "border-gray-200"
                    }`}
                    placeholder="+91 99673 92920"
                  />
                  {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Password + Confirm */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest mb-2">Password</label>
                  <input
                    name="password"
                    type="password"
                    value={form.password}
                    required
                    minLength={8}
                    onChange={handleChange}
                    className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400 ${
                      errors.password ? "border-red-400 bg-red-50" : "border-gray-200"
                    }`}
                    placeholder="At least 8 characters"
                  />
                  {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-widest mb-2">Confirm Password</label>
                  <input
                    name="confirmPassword"
                    type="password"
                    value={form.confirmPassword}
                    required
                    onChange={handleChange}
                    className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400 ${
                      errors.confirmPassword ? "border-red-400 bg-red-50" : "border-gray-200"
                    }`}
                    placeholder="Repeat password"
                  />
                  {errors.confirmPassword && <p className="text-xs text-red-600 mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>

              {/* ✅ FIXED: Submit button INSIDE form */}
              <button
                type="submit"  // ✅ This now works properly
                disabled={loading || showConfirm}
                className="w-full bg-yellow-500 hover:bg-yellow-600 py-4 rounded-xl font-black text-sm uppercase shadow-lg transition-all disabled:opacity-50 flex justify-center items-center"
              >
                {loading ? (
                  <span className="material-symbols-outlined animate-spin">sync</span>
                ) : (
                  "Review & Register"
                )}
              </button>
            </div>
          </form> {/* ✅ FORM CLOSED */}

          <p className="text-xs text-center text-gray-500 font-bold mt-6 max-w-md mx-auto">
            Get started with your POS system within minutes. We'll verify and activate your account.
          </p>
        </div>
      </div>

      {/* Confirmation Modal - EXACTLY SAME */}
      {showConfirm && submitData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <h2 className="text-2xl font-black mb-6 text-gray-900">Please review your details</h2>
            
            <div className="space-y-4 mb-8 text-sm">
              <div><span className="font-bold">Role:</span> {submitData.role.toUpperCase()}</div>
              <div><span className="font-bold">Company:</span> {submitData.companyName}</div>
              <div><span className="font-bold">Email:</span> {submitData.email}</div>
              <div><span className="font-bold">Phone:</span> {submitData.phone}</div>
              <div><span className="font-bold">Password:</span> {'•'.repeat(8)} (hidden)</div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={confirmSubmit}
                disabled={loading}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 py-3 px-6 rounded-xl font-black uppercase text-sm shadow-lg transition-all disabled:opacity-50"
              >
                {loading ? <span className="animate-spin">⏳</span> : "Confirm & Register"}
              </button>
              <button
                onClick={cancelSubmit}
                className="flex-1 bg-gray-200 hover:bg-gray-300 py-3 px-6 rounded-xl font-bold uppercase text-sm shadow-lg transition-all"
              >
                Edit Details
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConnectRegistration;
