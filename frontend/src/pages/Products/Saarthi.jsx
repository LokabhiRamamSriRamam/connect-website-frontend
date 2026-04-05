import IndustryFAQ from "../../components/IndustryFAQ";
import IndustryHero from "../../components/IndustryHero";
import IndustryOverview from "../../components/IndustryOverview";
import IndustryProblems from "../../components/IndustryProblems";
import IndustrySolution from "../../components/IndustrySolution";
import IndustryOutcomes from "../../components/IndustryOutcomes";
import FinalPoster from "../../components/FinalPoster";
import Footer from "../../components/Footer";

const Saarthi = () => {
  return (
    <>
      <IndustryHero
        title={"Saarthi.AI\nThe Intelligent Business OS"}
        description="Stop fighting your ERP. Talk to your business in plain language — and get answers that actually drive decisions."
        bgImage="/ai/stark.png"
        theme="saarthi"
      />
      <IndustryOverview industry="saarthi" />
      <IndustryProblems industry="saarthi" />
      <IndustrySolution industry="saarthi" />
      <IndustryOutcomes industry="saarthi" />
      <IndustryFAQ industry="saarthi" />
      <FinalPoster />
      <Footer />
    </>
  );
};

export default Saarthi;
