import { useState } from "react";
import SignUpProvider from "../components/SignUpProvider/SignUpProvider";
import SignUpCustomer from "../components/SignUpCustomer/SignUpCustomer";
import "./SignUp.css";

function SignUp() {
  //set default type to customer
  const [type, setType] = useState("customer");

  const handleChange = (e) => {
    setType(e.target.id);
    e.target.classList.add("active");
    //remove active class from unclicked element
    if (e.target.id === "customer") {
      document.querySelector("#provider").classList.remove("active");
    } else {
      document.querySelector("#customer").classList.remove("active");
    }
  };
  return (
    <div id="signup">
      <h1>Sign up as a</h1>
      <div className="tabs">
        <button className="tab active" id="customer" onClick={handleChange}>
          Customer
        </button>
        <button className="tab" id="provider" onClick={handleChange}>
          Service Provider
        </button>
      </div>
      {/* Conditionally display provider or customer sign up based on selected tab */}
      {type === "customer" ? <SignUpCustomer /> : <SignUpProvider />}
    </div>
  );
}

export default SignUp;
