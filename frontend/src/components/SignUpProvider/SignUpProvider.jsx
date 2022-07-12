import { useEffect, useState } from "react";
import Select from "react-select";
import "../Form.css";
import "./SignUpProvider.css";
import { Link, useNavigate } from "react-router-dom";
import { getServices, signUpProvider } from "../../APICalls";
import {
  MenuItem,
  InputLabel,
  FormControl,
  Select as MUISelect,
} from "@mui/material";

function SignUpProvider() {
  const navigate = useNavigate();
  const [servicesList, setServicesList] = useState([]);
  const [failedSignup, setFailedSignup] = useState(false);

  useEffect(() => {
    getServices().then((res) => {
      let services = [];
      res.data.services.forEach((element) =>
        services.push({
          label: element.service,
          value: element.service.toLowerCase(),
        })
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
    signUpProvider({
      firstName: signupForm.firstName,
      lastName: signupForm.lastName,
      email: signupForm.email,
      password: signupForm.password,
      servicesProvided: signupForm.servicesProvided,
      location: signupForm.location,
    })
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        setFailedSignup(true);
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
      {/* <input
        onChange={handleChange}
        placeholder="Location"
        type="text"
        name="location"
        value={signupForm.location}
        required
      /> */}
      <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
        <InputLabel id="location-label">Location</InputLabel>
        <MUISelect
          labelId="location-label"
          value={signupForm.location}
          label="location"
          name="location"
          onChange={handleChange}
        >
          <MenuItem value={"Toronto, Ontario"}>Toronto, Ontario</MenuItem>
          <MenuItem value={"Vaughn, Ontario"}>Vaughn, Ontario</MenuItem>
          <MenuItem value={"Waterloo, Ontario"}>
            Waterloo, Ontario
          </MenuItem>
        </MUISelect>
      </FormControl>

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
      {failedSignup && <p className="error">User already exists.</p>}
      <button type="submit">Sign Up!</button>
      <p>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </form>
  );
}

export default SignUpProvider;
