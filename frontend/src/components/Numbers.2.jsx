import React from "react";

// --- CONFIGURATION ---
const SCALING_FEATURES = [
  {
    icon: "< 60s",
    title: "Note Generation",
    description: "Average time for VITAL.AI to produce a complete, structured SOAP note from a live consultation — before the patient leaves the room.",
  },
  {
    icon: "3+ hrs",
    title: "Saved Per Clinician Daily",
    description: "Average documentation time recovered every day across practices using VITAL.AI and Molaris.AI — time that goes back to patient care.",
  },
  {
    icon: "99.2%",
    title: "Transcription Accuracy",
    description: "Clinical-grade speech recognition trained on medical terminology across specialties, languages, and accents.",
  },
];

const Numbers2 = () => {
  
  // Styles for the light-blue gradient background
  const styles = `
    .smooth-font {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    /* Light white → sky blue moving background (from Industry.js) */
    .industry-bg {
      position: relative;
      overflow: hidden;
    }
    .industry-bg::before {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(
        120deg,
        rgba(255, 255, 255, 1),
        rgba(224, 242, 255, 1)
      );
      background-size: 300% 300%;
      animation: industryGradientDrift 5s ease-in-out infinite;
      z-index: -1;
    }
    @keyframes industryGradientDrift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      
      {/* --- MAIN WRAPPER (Applying the light blue theme) --- */}
      {/* Note: Removed padding here as it should be handled by the parent component 
         if you combine FinalPoster and Numbers1. However, to keep it functional as a standalone section, 
         I will keep the padding but remove the container/header logic. */}
      <div className="bg-transparent w-full py-16 px-4 sm:px-6 lg:px-8 font-sans smooth-font">
        <div className="container mx-auto max-w-6xl space-y-12">

          {/* --- FEATURE GRID (Three Columns) --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 w-full rounded-3xl overflow-hidden bg-transparent divide-y md:divide-y-0 md:divide-x divide-gray-200 shadow-xl">
            {SCALING_FEATURES.map((feature, index) => (
              <div 
                key={index}
                className="p-8 md:p-10 flex flex-col items-start hover:bg-gray-50 transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-6 text-purple-600">
                  <span className="material-icons-outlined text-xl">
                    {feature.icon}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-base leading-relaxed text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default Numbers2;