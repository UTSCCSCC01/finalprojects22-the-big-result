import { AppBar, createTheme, ThemeProvider, Toolbar } from "@mui/material";
import { MenuItem, InputLabel, FormControl, Select, Menu } from "@mui/material";
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

  //All for menu items in navbar, code from https://mui.com/material-ui/react-menu/
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    //Just uses context to check if current user exists
    if (user) setLoggedIn(true);
    else setLoggedIn(false);
  }, [user]);

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="sticky">
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
                {/*<Link to="/myProfile">My Profile</Link>*/}
                <Link to="/profileSettings">Settings</Link>
              </>
            )}
            {loggedIn && user && user.type === "provider" && (
              <>
                <button id="provider-menu-btn" onClick={handleClick}>
                  My Bookings
                </button>
                <Menu
                  id="provider-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem>
                    <Link to="/p/availability">Add Availability</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/p/upcomingBookings">Upcoming Bookings</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/p/pastAndCancelledBookings">Past and Cancelled Bookings</Link>
                  </MenuItem>
                </Menu>
              </>
            )}
            {loggedIn && user && user.type === "customer" && (
              <>
                <button id="customer-menu-btn" onClick={handleClick}>
                  My Bookings
                </button>
                <Menu
                  id="customer-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem>
                    <Link to="/c/upcomingBookings">Upcoming Bookings</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/c/pastAndCancelledBookings">Past and Cancelled Bookings</Link>
                  </MenuItem>
                </Menu>
              </>
            )}
            {loggedIn ? (
              <Logout />
            ) : (
              <>
                <Link to="/signup">
                  <button className="signup-btn">Sign Up</button>
                </Link>
                <Link to="/login">
                  <button className="login-btn">Login</button>
                </Link>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default Navbar;
