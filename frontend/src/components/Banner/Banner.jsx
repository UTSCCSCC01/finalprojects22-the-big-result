import { useEffect, useState } from "react";
import axios from "axios";
import "./Banner.css";
import banner from "../../media/banner-img.svg";

function Banner() {
  return (
    <div id="banner">
      <div>
        <h1>Find the perfect service provider for you.</h1>
        <h2>Anywhere. Anytime.</h2>
        <a href="#providers">
          <button id="get-started">Get Started</button>
        </a>{" "}
        <a href="#how-it-works">
          <button>How It Works</button>
        </a>
      </div>
      <img className="banner-img" src={banner} alt="banner"></img>
    </div>
  );
}

export default Banner;
