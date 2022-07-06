import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import MyProfile from "./components/MyProfile/MyProfile";
import ProvidersPage from "./views/ProvidersPage";
import SignUp from "./views/SignUp";
import Profile from "./components/Profile/Profile";
import CustUpBookingsPage from "./views/CustUpBookingsPage";
import CustPastBookingsPage from "./views/CustPastBookingsPage";
import ProfessionalUpBookingsPage from "./views/ProfessionalUpBookingsPage";
import ProfessionalPastBookingsPage from "./views/ProfessionalPastBookingsPage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import LandingPage from "./views/LandingPage";
import ServiceList from "./components/Services/ServicesList";
import CustomerBooking from "./views/CustomerBooking";
import ProfessionalAvailability from "./views/ProfessionalAvailability";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/services" element={<ServiceList />} />
          <Route path="/serviceProviders" element={<ProvidersPage />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/signup" element={<SignUp />} />
          {/* Protected route, should be accessible by both customers and providers*/}
          <Route element={<ProtectedRoutes />}>
            <Route path="/myProfile" element={<MyProfile />} />
          </Route>
          {/* Protected route, only accessible by customers*/}
          <Route element={<ProtectedRoutes role={"customer"} />}>
            <Route path="/c/booking" element={<CustomerBooking />} />
            <Route
              path="/c/upcomingBookings"
              element={<CustUpBookingsPage />}
            />
            <Route path="/c/pastBookings" element={<CustPastBookingsPage />} />
          </Route>
          {/* Protected route, only accessible by providers*/}
          <Route element={<ProtectedRoutes role={"provider"} />}>
            <Route
              path="/p/availability"
              element={<ProfessionalAvailability />}
            />
            <Route
              path="/p/upcomingBookings"
              element={<ProfessionalUpBookingsPage />}
            />
            <Route
              path="/p/pastBookings"
              element={<ProfessionalPastBookingsPage />}
            />
          </Route>
        </Routes>
        <Footer />
      </>
    </BrowserRouter>
  );
}

export default App;
