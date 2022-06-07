import { useState } from "react";
import axios from "axios";
import "./Login.css";

function Login(props) {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [type, setType] = useState("customer");
  const [failedLogin, setFailedLogin] = useState(false);


  // idea add /token/${type} but also end of /profile
  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      //TODO: Create 2 different endpoints for the login in the backend
      url: `http://localhost:5000/token/${type}`,
      data: {
        email: loginForm.email,
        password: loginForm.password,
      },
    })
      //TODO: Integrate with backend
      .then((res) => {
        localStorage.setItem('token', res.data.access_token);
        // only go to profile tab when login is successful
        window.location = "/profile"

        setFailedLogin(false)
      })
      .catch((err) => {
        // diaplay "incorrect login" message
        setFailedLogin(true)
        console.log(err.response.status)
      });
    //reset form after submission
    setLoginForm({ email: "", password: "" });
    // setFailedLogin(false)
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
      {failedLogin && <div>Username or password is incorrect.</div>}
    </div>
  );
}

export default Login;
