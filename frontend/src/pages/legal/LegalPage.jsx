import TopNav from "../../components/TopNav";
import SBFooter from "../../components/screenbazaar/SBFooter";

export default function LegalPage({ title, effectiveDate, lastUpdated, sections }) {
  return (
    <div className="bg-white">
      <TopNav theme="light" />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-sb-ink sm:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-sb-ink/60">
          Effective Date: {effectiveDate}
          <br />
          Last Updated: {lastUpdated}
        </p>

        <div className="mt-10 space-y-10">
          {sections.map((section, i) => (
            <section key={i}>
              <h2 className="text-xl font-bold text-sb-ink">{section.heading}</h2>
              <div className="mt-3 space-y-4 text-[15px] leading-relaxed text-sb-ink/80">
                {section.body}
              </div>
            </section>
          ))}
        </div>
      </main>
      <SBFooter />
    </div>
  );
}
