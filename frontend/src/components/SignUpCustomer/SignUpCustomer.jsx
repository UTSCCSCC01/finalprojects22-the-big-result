import { useState } from "react";
import "../Form.css";
import { Link, useNavigate } from "react-router-dom";
import { signUpCustomer } from "../../APICalls";

function SignUpCustomer() {
  const navigate = useNavigate();
  const [signupForm, setSignupForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [failedSignup, setFailedSignup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    signUpCustomer({
      firstName: signupForm.firstName,
      lastName: signupForm.lastName,
      email: signupForm.email,
      password: signupForm.password,
    })
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        setFailedSignup(true);
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
      {failedSignup && <p className="error">User already exists.</p>}
      <button type="submit">Sign Up!</button>
      <p>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </form>
  );
}

export default SignUpCustomer;
