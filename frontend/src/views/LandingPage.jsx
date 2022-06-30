import { useEffect, useState } from "react";
import axios from "axios";
import {
  Slider,
  Rating,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
} from "@mui/material";

import Banner from "../components/Banner/Banner";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import ProviderPage from "./ProvidersPage";

function LandingPage(props) {
  return (
    <div className="landing-page">
      <Banner />
      <ProviderPage/>
      <HowItWorks />
    </div>
  );
}

export default LandingPage;
