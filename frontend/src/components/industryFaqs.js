// industryFaqs.js

const industryFaqs = {
  salon: [
    {
      question: "How can AI help manage appointment bookings and walk-ins?",
      answer:
        "Connect uses AI-driven demand prediction to balance online bookings and walk-in traffic in real time, reducing overbooking, idle staff time, and customer wait times.",
    },
    {
      question: "Can this help optimize staff scheduling?",
      answer:
        "Yes. Connect analyzes historical traffic, seasonal trends, and live demand to dynamically recommend staffing levels, helping salons operate efficiently without manual planning.",
    },
    {
      question: "How does Connect improve customer experience?",
      answer:
        "By adapting instantly to demand spikes, Connect ensures faster check-ins, smoother appointment flows, and consistent service quality during peak hours.",
    },
    {
      question: "Does this integrate with existing POS or booking systems?",
      answer:
        "Connect integrates via APIs and SDKs, allowing it to work alongside your existing booking, POS, and CRM systems without requiring replacement.",
    },
  ],

  ecommerce: [
    {
      question: "How does Connect handle flash sales and traffic spikes?",
      answer:
        "Connect scales instantly at the application layer using AI-driven orchestration, preventing slowdowns or crashes during flash sales and promotional events.",
    },
    {
      question: "Can it reduce cart abandonment caused by latency?",
      answer:
        "Yes. By maintaining consistent response times during high load, Connect helps reduce checkout latency, directly improving conversion rates.",
    },
    {
      question: "Does this work across global regions?",
      answer:
        "Connect intelligently routes traffic and resources across regions, ensuring reliable performance for global customers.",
    },
  ],

  fintech: [
    {
      question: "Is Connect suitable for real-time financial transactions?",
      answer:
        "Yes. Connect is designed for low-latency, high-throughput workloads such as payments, trading activity, and transaction processing.",
    },
    {
      question: "How does AI help in financial scaling decisions?",
      answer:
        "Instead of static thresholds, Connect uses AI to predict transaction bursts and allocate resources before bottlenecks occur.",
    },
    {
      question: "Can this work with regulated environments?",
      answer:
        "Connect supports secure isolation, auditability, and integration with compliance-focused infrastructure commonly used in regulated industries.",
    },
  ],

  healthcare: [
    {
      question: "How does Connect support healthcare workloads?",
      answer:
        "Connect ensures reliable performance for patient portals, appointment systems, and real-time data access, even during demand surges.",
    },
    {
      question: "Can it scale during emergencies or peak usage?",
      answer:
        "Yes. Connect reacts instantly to sudden spikes in usage without requiring pre-provisioned infrastructure.",
    },
    {
      question: "Is data security considered in scaling decisions?",
      answer:
        "Security and isolation are built into Connect’s architecture, ensuring sensitive healthcare data remains protected at scale.",
    },
  ],

  gaming: [
    {
      question: "How does Connect handle sudden player spikes?",
      answer:
        "Connect scales in real time at the application layer, preventing matchmaking delays and server overload during launches or live events.",
    },
    {
      question: "Does this reduce latency for real-time gameplay?",
      answer:
        "Yes. AI-driven routing ensures consistent low-latency performance even during peak concurrent usage.",
    },
  ],

  saarthi: [
    {
      question: "Does Saarthi.AI replace my existing ERP or accounting software?",
      answer:
        "No. Saarthi is an AI orchestration layer that integrates on top of your existing databases and systems via APIs. It makes your current software dramatically faster and easier to use — there is no rip-and-replace involved.",
    },
    {
      question: "Will it understand my team's Hinglish commands?",
      answer:
        "Yes. Saarthi's Speech-to-Text engine natively understands mixed English-Hindi queries — 'pichhle mahine ka revenue kya tha?' is understood just as naturally as 'What was last month's revenue?' Your team can work in the language they think in.",
    },
    {
      question: "How accurate is the financial data Saarthi returns?",
      answer:
        "Saarthi uses a hybrid architecture: AI is used only to understand your intent and extract parameters. All math and data aggregation is done deterministically by traditional database queries — the AI never guesses or hallucinates a financial total.",
    },
    {
      question: "Is my business data secure?",
      answer:
        "Saarthi is built on strict tenant isolation. Your inventory logs, ledgers, and business analytics are securely siloed using JWT authentication, NoSQL injection sanitization, and bcrypt encryption. Your data is never mixed with another business's data and never used to train public AI models.",
    },
    {
      question: "How quickly can my team start using Saarthi?",
      answer:
        "If your team can send a voice note, they can use Saarthi. There is no complex training required. Most teams are fully operational within a day of integration — the interface is conversational by design.",
    },
    {
      question: "How does Saarthi handle high-volume retail or wholesale transactions?",
      answer:
        "Saarthi is purpose-built for high-frequency data environments. It pulls real database values and computes aggregations sequentially — whether you have 100 or 100,000 daily transactions, the answer is always based on exact data, not estimates.",
    },
  ],

  digitaltco: [
    {
      question: "Does DigitalTCO work with my existing Practice Management System?",
      answer:
        "Yes. DigitalTCO works alongside any PMS including Dentally, Dentrix, Eaglesoft, Open Dental, SoftDent, and SOE. It is an AI documentation layer — it does not replace your existing clinical workflow, it accelerates it.",
    },
    {
      question: "Do I need special hardware or microphones?",
      answer:
        "No special hardware is required. DigitalTCO works with your laptop's built-in microphone, your smartphone, or an optional clip-on Bluetooth mic. Setup takes an average of 2 minutes.",
    },
    {
      question: "Is the clinical documentation HIPAA and GDPR compliant?",
      answer:
        "Yes. DigitalTCO is 100% HIPAA compliant, GDPR compliant, uses 256-bit encryption, and holds SOC 2 Type II certification. Patient data never trains the AI models.",
    },
    {
      question: "How is DigitalTCO different from generic medical scribes like Heidi?",
      answer:
        "DigitalTCO's AI is trained exclusively on US and UK dental terminology — including tooth numbering systems, material names (e.g., 'MOD composite'), and procedure codes. Generic medical scribes are trained on broad medical language and consistently mishandle dental-specific dictation.",
    },
    {
      question: "How long does it take to generate a clinical note?",
      answer:
        "Notes are generated the moment you finish dictating — formatted into a SOAP-compliant structure with legal boilerplates automatically. The chart is done before the patient leaves the chair.",
    },
    {
      question: "What is included in the 28-day free trial?",
      answer:
        "The free trial includes full access to all features — unlimited notes, letters, and forms — with no credit card required. You can cancel anytime with one click. Average setup is 2 minutes so you can stop typing your notes tonight.",
    },
  ],

  default: [
    {
      question: "How does Connect work across different industries?",
      answer:
        "Connect operates at the application layer using AI-driven orchestration, allowing it to adapt to different workloads without industry-specific infrastructure changes.",
    },
    {
      question: "What makes Connect an AI-first platform?",
      answer:
        "AI continuously drives scaling, routing, and resource allocation decisions based on live system behavior instead of static rules.",
    },
    {
      question: "Can Connect integrate with existing systems?",
      answer:
        "Yes. Connect integrates via APIs and SDKs and works alongside existing infrastructure and tools.",
    },
  ],
};

export default industryFaqs;
