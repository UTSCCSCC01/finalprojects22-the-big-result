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

function LandingPage(props) {
  return (
    <div className="landing-page">
      <Banner />
      <HowItWorks />
    </div>
  );
}

export default LandingPage;
