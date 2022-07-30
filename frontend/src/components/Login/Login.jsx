import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./Login.css";
import "../Form.css";
import { AuthContext } from "../../context/AuthProvider";
//Note redirects don't persisted the setUser in context, hence the need for navigate
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  //Sets the user globally so that context is updated for all components
  const { user, setUser } = useContext(AuthContext);

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [type, setType] = useState("customer");
  const [errors, setErrors] = useState("");
  const [failedLogin, setFailedLogin] = useState(false);

  //TODO: Just put this under a protectedRoute with role "not logged in", or something similar?
  useEffect(() => {
    //From useContext, if user already exists, no need to login
    if (user) navigate("/myProfile");
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
      //Need this to be true in order to set the refresh_token cookie
      withCredentials: true,
    })
      .then((res) => {
        if (res.status === 200) {
          //TODO: Update everywhere where localStorage is being set, change to httpOnly cookie
          setUser({
            type: res.data.type,
            access_token: res.data.access_token,
          });
          // only go to profile tab when login is successful
          navigate("/");
          setFailedLogin(false);
        } else {
          setFailedLogin(true);
          // setErrors(res.data.error);
        }
      })
      .catch((err) => {
        // diaplay "incorrect login" message
        setFailedLogin(true);
        setErrors(err.response.data.error);
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
      {failedLogin && <p className="error">{errors}</p>}
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;
