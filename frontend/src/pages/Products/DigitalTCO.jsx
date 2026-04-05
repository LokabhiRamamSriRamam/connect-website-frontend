import IndustryFAQ from "../../components/IndustryFAQ";
import IndustryHero from "../../components/IndustryHero";
import IndustryOverview from "../../components/IndustryOverview";
import IndustryProblems from "../../components/IndustryProblems";
import IndustrySolution from "../../components/IndustrySolution";
import IndustryOutcomes from "../../components/IndustryOutcomes";
import FinalPoster from "../../components/FinalPoster";
import Footer from "../../components/Footer";

const DigitalTCO = () => {
  return (
    <>
      <IndustryHero
        title={"DigitalTCO\nThe Cheat Code for Modern Dentistry"}
        description="Voice-first clinical documentation built exclusively for dentists. Charts done before the patient leaves the chair."
        bgImage="/images/dentist-hero.jpg"
        theme="dentist"
      />
      <IndustryOverview industry="digitaltco" />
      <IndustryProblems industry="digitaltco" />
      <IndustrySolution industry="digitaltco" />
      <IndustryOutcomes industry="digitaltco" />
      <IndustryFAQ industry="digitaltco" />
      <FinalPoster />
      <Footer />
    </>
  );
};

export default DigitalTCO;
