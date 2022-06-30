import { useEffect, useState } from "react";
import axios from "axios";
import "./Login.css";
import "../Form.css";

function Login() {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [type, setType] = useState("customer");
  const [failedLogin, setFailedLogin] = useState(false);

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:5000/verify-loggedin`,
    })
      // .then((res) => {
      //   console.log(res);
      //   window.location = "/successlogin";
      // })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: `http://localhost:5000/token/${type}`,
      data: {
        email: loginForm.email,
        password: loginForm.password,
      },
    })
      .then((res) => {
        localStorage.setItem("token", res.data.access_token);
        // only go to profile tab when login is successful
        window.location = "/successlogin";
        setFailedLogin(false);
      })
      .catch((err) => {
        // diaplay "incorrect login" message
        setFailedLogin(true);
        console.log(err.response.status);
      });
    // reset form after submission
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

  const handleTabs = (e) => {
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
    <div id="login" className="page">
      <h1>Login as a</h1>
      <div className="tabs">
        <button className="tab active" id="customer" onClick={handleTabs}>
          Customer
        </button>
        <button className="tab" id="provider" onClick={handleTabs}>
          Service Provider
        </button>
      </div>
      <form id="login-form" className="form" onSubmit={handleSubmit}>
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
      {failedLogin && (
        <p className="error">Username or password is incorrect.</p>
      )}
      <p>
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
}

export default Login;
