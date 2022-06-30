import { useEffect, useState } from "react";
import axios from "axios";
import { AppBar, Toolbar, ThemeProvider, createTheme } from "@mui/material";

import Logout from "../Logout/Logout";
import "./Navbar.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);

  //TODO: Fix this in next sprint, it should be calling verify-loggedin,
  //but the jwt decoding and such isn't working as expected
  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:5000/successlogin`,
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((res) => {
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false);
      });
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static">
        <Toolbar id="navbar">
          <div className="navbar-left">
            <a href="/">
              <h2>Amorr</h2>
            </a>
          </div>
          <div className="navbar-right">
            <a href="/serviceProviders">Service Providers</a>
            {loggedIn && (
              <>
                <a href="/successlogin">My Profile</a>
                <a href="/bookings">My Bookings</a>
              </>
            )}
            {loggedIn ? (
              <Logout />
            ) : (
              <>
                <button className="signup-btn">
                  <a href="/signup">Sign Up</a>
                </button>
                <button className="login-btn">
                  <a href="/login">Login</a>
                </button>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default Navbar;
