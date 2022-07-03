
import Banner from "../components/Banner/Banner";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import ProviderPage from "./ProvidersPage";

function LandingPage() {
  return (
    <div className="landing-page">
      <Banner />
      <ProviderPage />
      <HowItWorks />
    </div>
  );
}

export default LandingPage;
