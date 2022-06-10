import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import "../Form.css";
import "./SignUpProvider.css";

function SignUpProvider() {
  const [servicesList, setServicesList] = useState([]);
  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:5000/services-list`,
    }).then((res) => {
      let services = [];
      res.data.services.forEach((element) =>
        services.push({ label: element, value: element.toLowerCase() })
      );
      setServicesList(services);
    });
  }, []);

  const [signupForm, setSignupForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    servicesProvided: [],
    location: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: `http://localhost:5000/signup/provider`,
      data: {
        firstName: signupForm.firstName,
        lastName: signupForm.lastName,
        email: signupForm.email,
        password: signupForm.password,
        servicesProvided: signupForm.servicesProvided,
        location: signupForm.location,
      },
    })
      .then(() => {
        window.location = "/login";
      })
      .catch((err) => {
        console.log(err);
      });
    //reset form after submission
    setSignupForm({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      servicesProvided: [],
      location: "",
    });
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setSignupForm((prevSignup) => ({
      ...prevSignup,
      [name]: value,
    }));
  };

  const handleSelect = (e) => {
    setSignupForm((prevSignup) => ({
      ...prevSignup,
      servicesProvided: Array.isArray(e) ? e.map((option) => option.value) : [],
    }));
  };

  return (
    <form id="signup-provider" className="form" onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        placeholder="First name"
        type="text"
        name="firstName"
        value={signupForm.firstName}
        required
      />
      <input
        onChange={handleChange}
        placeholder="Last name"
        type="text"
        name="lastName"
        value={signupForm.lastName}
        required
      />
      <input
        onChange={handleChange}
        placeholder="Email"
        type="email"
        name="email"
        value={signupForm.email}
        required
      />
      <input
        onChange={handleChange}
        placeholder="Password (6 characters minimum)"
        type="password"
        name="password"
        minLength={6}
        value={signupForm.password}
        required
      />
      <input
        onChange={handleChange}
        placeholder="Location"
        type="text"
        name="location"
        value={signupForm.location}
        required
      />
      {servicesList && (
        <Select
          placeholder="Services Offered"
          value={servicesList.filter((option) =>
            signupForm.servicesProvided.includes(option.value)
          )}
          onChange={handleSelect}
          isMulti
          isClearable
          options={servicesList}
        />
      )}
      <button type="submit">Sign Up!</button>
      <small>
        Already have an account? <a href="/login">Log In</a>
      </small>
    </form>
  );
}

export default SignUpProvider;
