import { useEffect, useState } from "react";
import Select from "react-select";
import "../Form.css";
import "./SignUpProvider.css";
import { Link, useNavigate } from "react-router-dom";
import { getServices, signUpProvider } from "../../APICalls";
import ServiceInfo from "../Profile/ServiceInfo";
import {
  TextField,
  OutlinedInput,
  Dialog,
  DialogActions,
  DialogTitle,
  MenuItem,
  InputLabel,
  FormControl,
  Autocomplete,
  Select as MUISelect,
} from "@mui/material";
import Location from "../Location/Location";
import { ScriptElementKindModifier } from "typescript";



function SignUpProvider() {
  const navigate = useNavigate();
  const [servicesList, setServicesList] = useState([]);
  const [errors, setErrors] = useState("");

  const [signupForm, setSignupForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    servicesProvided: [],
    location: "",
    description: "",
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFormClose();
    signUpProvider({
      firstName: signupForm.firstName,
      lastName: signupForm.lastName,
      email: signupForm.email,
      password: signupForm.password,
      servicesProvided: signupForm.servicesProvided,
      location: signupForm.location,
      description: signupForm.description,
      servicesDesc: servicesDesc,
    })
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        setErrors("User already exists");
      });
    //reset form after submission
    setSignupForm({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      servicesProvided: [],
      location: "",
      description: "",
      servicesDesc: [],
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

  const [formOpen, setFormOpen] = useState(false);
  const [servicesDesc, setServicesDesc] = useState([]);

  const handleFormOpen = (e) => {
    e.preventDefault();
    if (signupForm.servicesProvided.length === 0) {
      setErrors("Must select at least one service");
    } else {
      setFormOpen(true);
      //Set the initial values for the services selected
      let servicesOffered = [];
      signupForm.servicesProvided.forEach((svc) => {
        servicesOffered.push({ service: svc, desc: "", price: 0 });
      });
      setServicesDesc(servicesOffered);
    }
  };

  //Onchange to any of the new forms, update the servicesOffered descriptions and prices as required
  const addToServicesDesc = (newDesc) => {
    let newServicesDesc = [];
    servicesDesc.forEach((desc) => {
      if (desc.service !== newDesc.service) {
        newServicesDesc.push(desc);
      } else newServicesDesc.push(newDesc);
    });
    setServicesDesc(newServicesDesc);
  };

  const handleFormClose = () => {
    setFormOpen(false);
  };

  return (
    <>
      <form id="signup-provider" className="form" onSubmit={handleFormOpen}>
        <OutlinedInput
          onChange={handleChange}
          placeholder="First name"
          type="text"
          name="firstName"
          value={signupForm.firstName}
          required
        />
        <OutlinedInput
          onChange={handleChange}
          placeholder="Last name"
          type="text"
          name="lastName"
          value={signupForm.lastName}
          required
        />
        <OutlinedInput
          onChange={handleChange}
          placeholder="Email"
          type="email"
          name="email"
          value={signupForm.email}
          required
        />
        <OutlinedInput
          onChange={handleChange}
          placeholder="Password (6 characters minimum)"
          type="password"
          name="password"
          minLength={6}
          value={signupForm.password}
          required
        />
        <Location />
        {/* <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
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
            <MenuItem value={"Waterloo, Ontario"}>Waterloo, Ontario</MenuItem>
          </MUISelect>
        </FormControl> */}
        <br />
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
        <TextField
          multiline
          placeholder="Description"
          onChange={handleChange}
          name="description"
          value={signupForm.description}
          rows="5"
        />
        <br />
        {errors && <p className="error">{errors}</p>}
        {/* {failedSignup && <p className="error">User already exists.</p>} */}
        <button type="submit">Sign Up!</button>
        <p>
          Already have an account? <Link to="/login">Log In</Link>
        </p>
        <Dialog open={formOpen} onClose={handleFormClose} scroll="paper">
          <DialogTitle>Enter Additional Information For Services</DialogTitle>
          {signupForm.servicesProvided &&
            signupForm.servicesProvided.map((arg) => (
              <ServiceInfo
                addToServicesDesc={addToServicesDesc}
                service={arg}
              />
            ))}
          <DialogActions>
            <button onClick={handleSubmit}>Submit</button>
          </DialogActions>
        </Dialog>
      </form>
    </>
  );
}

export default SignUpProvider;
