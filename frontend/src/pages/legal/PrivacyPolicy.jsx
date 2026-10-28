import LegalPage from "./LegalPage";

const H = ({ children }) => <h3 className="font-semibold text-sb-ink">{children}</h3>;
const P = ({ children }) => <p>{children}</p>;

const SECTIONS = [
  {
    heading: "1. Introduction",
    body: (
      <>
        <P>
          Welcome to Screen Bazaar, an application provided by Sreeji Growth Advisory
          (operating under the brand Connect). We respect your privacy and are committed to
          protecting the personal data and digital assets you share with us.
        </P>
        <P>
          This Privacy Policy explains how Screen Bazaar ("we," "us," or "our") collects, uses,
          stores, and protects your personal information and media files when you use our
          application and platform services.
        </P>
      </>
    ),
  },
  {
    heading: "2. Information We Collect",
    body: (
      <>
        <P>We collect several types of information from and about users of Screen Bazaar:</P>
        <H>A. Google User Data</H>
        <P>When you authenticate using Google OAuth, we request access to:</P>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Google Profile Information:</strong> Basic profile details (such as your
            name and profile picture).
          </li>
          <li>
            <strong>Email Address:</strong> Used to identify your account and send essential
            service communications.
          </li>
          <li>
            <strong>Google Drive Files:</strong> Access to select Google Drive permissions
            allowing you to upload and manage media assets via Screen Bazaar.
          </li>
        </ul>
        <H>B. Account &amp; Personal Details</H>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Contact Information:</strong> Phone number, full name, and billing details.
          </li>
          <li>
            <strong>Payment Information:</strong> Payment and billing transaction history
            processed for using our platform.
          </li>
        </ul>
        <H>C. Technical &amp; Device Data</H>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Device Identification:</strong> Device fingerprints, hardware models,
            operating system details, and network configurations.
          </li>
          <li>
            <strong>Network &amp; Usage Data:</strong> IP addresses, connection logs, feature
            usage statistics, and application analytics.
          </li>
          <li>
            <strong>Uploaded Content:</strong> Digital signage media, image files, video files,
            and associated metadata uploaded directly through or managed within Screen Bazaar.
          </li>
        </ul>
      </>
    ),
  },
  {
    heading: "3. How We Use Your Information",
    body: (
      <>
        <P>We use the collected information for the following specific purposes:</P>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Asset Management &amp; Cloud Integration:</strong> We access your Google
            Drive to enable seamless uploading, sync, and transparent storage of your media
            assets. Assets uploaded via Screen Bazaar are made accessible to you within our
            platform for playback, scheduling, and digital signage management.
          </li>
          <li>
            <strong>Account Management &amp; Authentication:</strong> To authenticate your
            identity, set up your account, and manage your access permissions.
          </li>
          <li>
            <strong>Core Application Functionality:</strong> To deliver, display, and schedule
            digital signage content across connected screens and authorized hardware devices.
          </li>
          <li>
            <strong>Billing &amp; Customer Support:</strong> To process transactions, provide
            technical assistance, and handle service inquiries.
          </li>
          <li>
            <strong>Security &amp; Performance:</strong> To monitor application uptime, detect
            fraudulent activity, verify authorized devices via device fingerprinting, and
            maintain system integrity on our self-hosted infrastructure.
          </li>
        </ul>
      </>
    ),
  },
  {
    heading: "4. Google Limited Use Disclosure",
    body: (
      <>
        <P>
          Screen Bazaar's use and transfer to any other app of information received from Google
          APIs will adhere to the{" "}
          <a
            href="https://developers.google.com/terms/api-services-user-data-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-sb-ink"
          >
            Google API Services User Data Policy
          </a>
          , including the Limited Use requirements.
        </P>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>No Data Selling:</strong> We do not sell, rent, or trade your Google user
            data or Google Drive files to third parties.
          </li>
          <li>
            <strong>No Advertising Use:</strong> We do not use or transfer your Google user data
            for serving personalized, retargeted, or interest-based advertisements.
          </li>
          <li>
            <strong>Human Inspection:</strong> Human staff do not read your Google Drive files
            unless explicit consent is provided for technical support, required for legal
            compliance, or necessary to resolve critical platform issues.
          </li>
        </ul>
      </>
    ),
  },
  {
    heading: "5. Storage & Security of Data",
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong>Self-Hosted Infrastructure:</strong> All user data, application logs, and
          system metrics are processed and stored securely on our proprietary, self-hosted
          servers.
        </li>
        <li>
          <strong>Third-Party Services:</strong> We do not utilize third-party analytics
          trackers, third-party user data brokers, or advertising network SDKs.
        </li>
        <li>
          <strong>Data Security:</strong> We implement industry-standard physical, technical,
          and administrative security measures (including secure HTTPS encryption in transit)
          to protect your personal information against unauthorized access, loss, or misuse.
        </li>
      </ul>
    ),
  },
  {
    heading: "6. Data Sharing & Disclosure",
    body: (
      <>
        <P>
          We do not sell, rent, or share user data with third parties for marketing or
          advertising purposes.
        </P>
        <P>We may only disclose your information in the following limited scenarios:</P>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Legal Requirements:</strong> If required by law, court order, or
            governmental regulations under applicable Indian law (including the Information
            Technology Act and rules thereunder).
          </li>
          <li>
            <strong>Protection of Rights:</strong> To enforce our terms, investigate fraud, or
            protect the rights, property, and safety of Sreeji Growth Advisory, our users, or
            the public.
          </li>
        </ul>
      </>
    ),
  },
  {
    heading: "7. Data Retention & Account Deletion",
    body: (
      <>
        <H>A. Retention Policy</H>
        <P>
          We retain your personal data and uploaded content for as long as your account remains
          active and connected to our services, or as necessary to fulfill the operational
          purposes outlined in this policy.
        </P>
        <H>B. User Rights &amp; Account Deletion Request</H>
        <P>
          You have the right to request access to your data or request the permanent deletion of
          your account and associated personal data at any time.
        </P>
        <P>
          <strong>How to Request Deletion:</strong> To request account and data deletion, send an
          email from your registered email address to:{" "}
          <a href="mailto:Connectgenai@gmail.com" className="underline hover:text-sb-ink">
            Connectgenai@gmail.com
          </a>
        </P>
        <P>
          <strong>Processing:</strong> Upon receiving your deletion request, we will verify your
          identity, process the request, and permanently remove your account data and stored
          credentials from our active databases within a reasonable timeframe, subject to any
          legal compliance retention obligations.
        </P>
      </>
    ),
  },
  {
    heading: "8. Jurisdiction & Governing Law",
    body: (
      <P>
        This Privacy Policy is governed by and construed in accordance with the laws of India.
        Any disputes arising under or in connection with this Privacy Policy shall be subject to
        the exclusive jurisdiction of the competent courts located in Mumbai, Maharashtra, India.
      </P>
    ),
  },
  {
    heading: "9. Contact Us",
    body: (
      <>
        <P>
          If you have any questions, concerns, or requests regarding this Privacy Policy or our
          privacy practices, please contact us at:
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
            <strong>Privacy &amp; Support Email:</strong>{" "}
            <a href="mailto:Connectgenai@gmail.com" className="underline hover:text-sb-ink">
              Connectgenai@gmail.com
            </a>
          </li>
        </ul>
      </>
    ),
  },
];

export default function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy for Screen Bazaar"
      effectiveDate="October 28, 2026"
      lastUpdated="October 28, 2026"
      sections={SECTIONS}
    />
  );
}
