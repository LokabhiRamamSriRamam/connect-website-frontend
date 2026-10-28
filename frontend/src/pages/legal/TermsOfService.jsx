import LegalPage from "./LegalPage";

const H = ({ children }) => <h3 className="font-semibold text-sb-ink">{children}</h3>;
const P = ({ children }) => <p>{children}</p>;

const SECTIONS = [
  {
    heading: "1. Acceptance of Terms",
    body: (
      <P>
        By accessing or using Screen Bazaar (the "Application" or "Service"), provided by
        Sreeji Growth Advisory operating under the brand Connect ("Company," "we," "us," or
        "our"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree
        to these Terms, you may not access or use the Service.
      </P>
    ),
  },
  {
    heading: "2. Description of Service",
    body: (
      <P>
        Screen Bazaar is a digital signage platform that allows users to upload, manage,
        schedule, and stream digital media assets across connected display screens and hardware
        devices. The Service integrates with Google OAuth and Google Drive to allow users to
        securely store and access media assets for playback within the application.
      </P>
    ),
  },
  {
    heading: "3. Account Registration & User Conduct",
    body: (
      <>
        <H>A. Account Creation</H>
        <P>
          To access and use Screen Bazaar, you must register for an account using a valid email
          address or via Google Authentication. You agree to provide accurate, complete, and
          updated information during the registration process.
        </P>
        <H>B. Account Security</H>
        <P>
          You are responsible for maintaining the confidentiality of your login credentials and
          for all activities that occur under your account. You agree to immediately notify us
          of any unauthorized access or security breach.
        </P>
        <H>C. Acceptable Use</H>
        <P>You agree not to use Screen Bazaar to:</P>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Upload, transmit, or display any content that is illegal, harmful, defamatory,
            infringing, profane, or otherwise objectionable.
          </li>
          <li>
            Upload content that infringes upon the intellectual property, copyright, trademark,
            or privacy rights of any third party.
          </li>
          <li>
            Attempt to gain unauthorized access to our self-hosted servers, network
            infrastructure, or other user accounts.
          </li>
          <li>Reverse engineer, decompile, or attempt to extract source code from the Application.</li>
          <li>
            Use the Application for any unlawful or unauthorized purpose under applicable Indian
            and international laws.
          </li>
        </ul>
      </>
    ),
  },
  {
    heading: "4. Google Drive & Third-Party Integration",
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong>OAuth Access:</strong> By authorizing Screen Bazaar to access your Google
          account, you grant us permission to interact with your Google Profile and selected
          Google Drive files solely to deliver core platform functionalities (such as media
          asset retrieval and display management).
        </li>
        <li>
          <strong>Compliance with Third-Party Terms:</strong> Your use of Google services in
          conjunction with Screen Bazaar is subject to Google's Terms of Service and Google API
          Services User Data Policy.
        </li>
      </ul>
    ),
  },
  {
    heading: "5. User Content & Intellectual Property",
    body: (
      <>
        <H>A. Ownership of Content</H>
        <P>
          You retain all ownership rights and intellectual property in the media files, assets,
          images, and content you upload or manage through Screen Bazaar.
        </P>
        <H>B. License to the Company</H>
        <P>
          By uploading or connecting content through Screen Bazaar, you grant Sreeji Growth
          Advisory (Connect) a worldwide, non-exclusive, royalty-free license to host, display,
          stream, format, and reproduce such content solely for the purpose of operating and
          delivering the Service to your authorized screens.
        </P>
        <H>C. Company Intellectual Property</H>
        <P>
          All rights, title, and interest in and to the Screen Bazaar application, software
          code, user interface, brand assets, logos, and trade names ("Connect", "Screen
          Bazaar", "Sreeji Growth Advisory") remain the exclusive property of Sreeji Growth
          Advisory.
        </P>
      </>
    ),
  },
  {
    heading: "6. Subscriptions, Fees & Payments",
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong>Payment Terms:</strong> Access to certain features, display limits, or service
          tiers may require payment of fees. All applicable fees and billing schedules will be
          communicated to you prior to purchase.
        </li>
        <li>
          <strong>Non-Refundable:</strong> Unless explicitly stated otherwise in writing or
          required by applicable law, all payment transactions are non-refundable.
        </li>
        <li>
          <strong>Service Changes:</strong> We reserve the right to modify pricing or alter
          available subscription packages upon reasonable advance notice.
        </li>
      </ul>
    ),
  },
  {
    heading: "7. Termination & Account Cancellation",
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong>Termination by You:</strong> You may stop using the Service at any time and
          request account deletion by contacting us at{" "}
          <a href="mailto:Connectgenai@gmail.com" className="underline hover:text-sb-ink">
            Connectgenai@gmail.com
          </a>
          .
        </li>
        <li>
          <strong>Termination by Us:</strong> We reserve the right to suspend or terminate your
          access to Screen Bazaar at our sole discretion, without prior notice, if you breach
          these Terms or engage in fraudulent or harmful activities.
        </li>
        <li>
          <strong>Effect of Termination:</strong> Upon account termination, your right to access
          the Application and display content will cease immediately.
        </li>
      </ul>
    ),
  },
  {
    heading: "8. Disclaimer of Warranties",
    body: (
      <>
        <P>
          The Service is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of
          any kind, whether express or implied, including but not limited to implied warranties
          of merchantability, fitness for a particular purpose, or non-infringement. We do not
          warrant that:
        </P>
        <ul className="list-disc space-y-2 pl-5">
          <li>The Service will meet your specific requirements uninterrupted or error-free.</li>
          <li>
            The playback or network connection to third-party screen hardware will be
            uninterrupted.
          </li>
          <li>Any errors or defects in the software will be corrected immediately.</li>
        </ul>
      </>
    ),
  },
  {
    heading: "9. Limitation of Liability",
    body: (
      <P>
        To the maximum extent permitted by applicable law, Sreeji Growth Advisory, its brand
        Connect, directors, employees, or partners shall not be liable for any indirect,
        incidental, special, consequential, or punitive damages—including loss of profits, data,
        goodwill, or business interruption—arising out of or related to your use of or inability
        to use the Service.
      </P>
    ),
  },
  {
    heading: "10. Governing Law & Dispute Resolution",
    body: (
      <P>
        These Terms shall be governed by and construed in accordance with the laws of India,
        without regard to its conflict of law principles. Any legal suit, action, or proceeding
        arising out of or related to these Terms or the Service shall be instituted exclusively
        in the competent courts located in Mumbai, Maharashtra, India.
      </P>
    ),
  },
  {
    heading: "11. Changes to Terms",
    body: (
      <P>
        We reserve the right to modify or update these Terms at any time. When updates are made,
        we will revise the "Last Updated" date at the top of this document. Continued use of
        Screen Bazaar after any such changes constitutes your acceptance of the new Terms.
      </P>
    ),
  },
  {
    heading: "12. Contact Information",
    body: (
      <>
        <P>
          For any questions, legal notices, or inquiries regarding these Terms of Service,
          please contact us at:
        </P>
        <ul className="list-none space-y-1">
          <li>
            <strong>Brand:</strong> Connect
          </li>
          <li>
            <strong>Company:</strong> Sreeji Growth Advisory
          </li>
          <li>
            <strong>App Name:</strong> Screen Bazaar
          </li>
          <li>
            <strong>Location:</strong> Mumbai, Maharashtra, India
          </li>
          <li>
            <strong>Support Email:</strong>{" "}
            <a href="mailto:Connectgenai@gmail.com" className="underline hover:text-sb-ink">
              Connectgenai@gmail.com
            </a>
          </li>
        </ul>
      </>
    ),
  },
];

export default function TermsOfService() {
  return (
    <LegalPage
      title="Terms of Service for Screen Bazaar"
      effectiveDate="October 28, 2026"
      lastUpdated="October 28, 2026"
      sections={SECTIONS}
    />
  );
}
