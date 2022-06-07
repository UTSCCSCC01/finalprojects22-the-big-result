import { useState } from "react";
import axios from "axios";
import "./Login.css";
// import {setToken} from '../useToken';

function Login(props) {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [type, setType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      //TODO: Create 2 different endpoints for the login in the backend
      url: `http://localhost:5000/token`,
      data: {
        email: loginForm.email,
        password: loginForm.password,
      },
    })
      //TODO: Integrate with backend
      .then((res) => {
        // console.log(res.data.access_token)
        localStorage.setItem('token', res.data.access_token);
        window.location = "/profile"
        
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
          <label for="type">Log in is a</label>
          <select
            name="type"
            required
            onChange={(e) => setType(e.target.value)}
          >
            <option selected="selected" value="customer">
              Customer
            </option>
            <option value="provider">Service Provider</option>
          </select>
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
