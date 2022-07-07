import { AppBar, createTheme, ThemeProvider, Toolbar } from "@mui/material";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

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
  const { user } = useContext(AuthContext);
  //TODO: Fix this in next sprint, it should be calling verify-loggedin,
  //but the jwt decoding and such isn't working as expected
  useEffect(() => {
    console.log(user);
    //Just uses context to check if current user exists
    if (user) setLoggedIn(true);
    else setLoggedIn(false);
  }, [user]);

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static">
        <Toolbar id="navbar">
          <div className="navbar-left">
            <Link to="/">
              <h2>Amorr</h2>
            </Link>
          </div>
          <div className="navbar-right">
            <Link to="/serviceProviders">Service Providers</Link>
            {loggedIn && (
              <>
                <Link to="/myProfile">My Profile</Link>
                <Link to="/bookings">My Bookings</Link>
              </>
            )}
            {loggedIn && user.type === "provider" && (
              <Link to="/p/availability">Add Availability</Link>
            )}
            {loggedIn ? (
              <Logout />
            ) : (
              <>
                <button className="signup-btn">
                  <Link to="/signup">Sign Up</Link>
                </button>
                <button className="login-btn">
                  <Link to="/login">Login</Link>
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
