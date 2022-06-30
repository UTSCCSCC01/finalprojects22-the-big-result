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

function LandingPage(props) {
  return (
    <div className="landing-page">
      <Banner />
    </div>
  );
}

export default LandingPage;
