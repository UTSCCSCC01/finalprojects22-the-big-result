import { useState } from "react";
import axios from "axios";
import "../Form.css";

function SignUpCustomer() {
  const [signupForm, setSignupForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      //TODO: Integrate with backend
      url: `http://localhost:5000/signupCustomer`,
      data: {
        firstName: signupForm.firstName,
        lastName: signupForm.lastName,
        email: signupForm.email,
        password: signupForm.password,
      },
    })
      .then((res) => {
        window.location = "/profile";
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
    });
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setSignupForm((prevLogin) => ({
      //spread operator leaves all unchanged parts of loginForm...unchanged
      ...prevLogin,
      [name]: value,
    }));
  };

  return (
    <form id="signup-customer" className="form" onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        placeholder="First name"
        type="text"
        name="firstName"
        value={signupForm.email}
        required
      />
      <input
        onChange={handleChange}
        placeholder="Last name"
        type="text"
        name="lastName"
        value={signupForm.email}
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
        placeholder="Password"
        type="password"
        name="password"
        value={signupForm.password}
        required
      />
      <button type="submit">Sign Up!</button>
    </form>
  );
}

export default SignUpCustomer;
