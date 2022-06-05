import { useState } from "react";
import axios from "axios";
import "./Login.css";

function Login(props) {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://localhost:5000/token",
      data: {
        email: loginForm.email,
        password: loginForm.password,
      },
    })
      //TODO: Integrate with backend
      .then((res) => {
        props.setToken(res.data.token);
      })
      .catch((err) => {
        console.log(err);
      });
    //reset form after submission
    setLoginForm({ email: "", password: "" });
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setLoginForm((prevLogin) => ({
      //spread operator leaves all unchanged parts of loginForm...unchanged
      ...prevLogin,
      [name]: value,
    }));
  };

  return (
    <div id="login">
      <div className="container">
        <h1>Login</h1>
        <form id="login-form" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            placeholder="Your email..."
            type="email"
            name="email"
            value={loginForm.email}
            required
          />
          <input
            onChange={handleChange}
            placeholder="Your password..."
            type="password"
            name="password"
            value={loginForm.password}
            required
          />
          <button type="submit">Login</button>
        </form>
        {/* TODO: Add link to signup*/}
        <small>
          Already have an account? <a>Sign Up</a>
        </small>
      </div>
    </div>
  );
}

export default Login;
