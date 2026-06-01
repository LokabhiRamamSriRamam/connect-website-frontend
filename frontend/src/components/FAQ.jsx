import React, { useState } from "react";
import { gsap } from "gsap";

// --- FAQ DATA ---
const faqData = [
  {
    question: "Is VITAL.AI compliant with HIPAA and other healthcare data regulations?",
    answer:
      "Yes. VITAL.AI is fully HIPAA compliant, GDPR ready, and SOC 2 Type II certified. All patient data is encrypted at rest and in transit using 256-bit encryption. Your clinical data is never used to train public AI models — it stays within your private, isolated instance.",
  },
  {
    question: "Which EHR systems does VITAL.AI integrate with?",
    answer:
      "VITAL.AI integrates with major EHR platforms including Epic, Cerner, and others via secure API connectors. Notes, codes, and intake data flow directly into the patient chart — no copy-pasting or manual re-entry required. Custom field mapping is available for practice-specific workflows.",
  },
  {
    question: "Which dental practice management systems does Molaris.AI support?",
    answer:
      "Molaris.AI works alongside any PMS including Dentally, Dentrix, Eaglesoft, Open Dental, and SOE. It doesn't replace your existing software — it adds a voice-first documentation layer on top of it. Setup takes under 2 minutes and requires no special hardware.",
  },
  {
    question: "How does the 14-day free trial work?",
    answer:
      "Both VITAL.AI and Molaris.AI offer a full-featured 14-day free trial with no credit card required. You get access to all features from day one. If you decide not to continue, simply cancel before the trial ends — no charges, no questions asked.",
  },
  {
    question: "Can multiple clinicians in the same practice use VITAL.AI or Molaris.AI?",
    answer:
      "Yes. Both products support multi-user practices. Each clinician gets their own profile, preferences, and note history. Billing and practice analytics are aggregated at the practice level, while individual documentation remains private per clinician.",
  },
];

// --- ICON COMPONENT (Replaces material-icons-outlined for flexibility) ---
const ChevronIcon = ({ isOpen }) => (
  <svg
    className={`w-5 h-5 transition-transform duration-300 ${
      isOpen ? "rotate-180" : "rotate-0"
    }`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M19 9l-7 7-7-7"
    ></path>
  </svg>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    const isOpening = openIndex !== index;
    setOpenIndex(isOpening ? index : null);

    // If we are opening a new one, make it "pop" slightly
    if (isOpening) {
      gsap.fromTo(
        `.faq-item-${index}`,
        { scale: 0.97, translateY: 5 },
        { scale: 1, translateY: 0, duration: 0.5, ease: "back.out(2)" }
      );
    }
  };

  return (
    <div className="w-full py-16 px-4 sm:px-6 lg:px-8 font-sans smooth-font">
      <div className="container mx-auto max-w-4xl">
        {/* --- SECTION HEADER --- */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Find answers to common questions about our scaling solution.
          </p>
        </div>

        {/* --- FAQ ACCORDION CONTAINER --- */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              // Add the specific class below (faq-item-${index})
              className={`faq-item-${index} border border-gray-200 rounded-xl shadow-lg overflow-hidden bg-white/70 backdrop-blur-sm transition-all duration-300`}
            >
              <button
                className="flex justify-between items-center w-full text-left p-6 font-semibold text-lg text-gray-800 hover:bg-gray-50 transition-colors duration-200"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span>{item.question}</span>
                <ChevronIcon isOpen={openIndex === index} />
              </button>

              {/* --- ANSWER CONTENT --- */}
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index
                    ? "max-h-96 opacity-100 p-6 pt-0"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="text-base text-gray-600 border-t border-purple-200 pt-4">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- CTA AT BOTTOM --- */}
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-700 mb-6">
            Still have questions? Our team is ready to help.
          </p>
          <button className="bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-200 px-8 py-3.5 rounded-full font-semibold text-base shadow-lg inline-flex items-center">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
