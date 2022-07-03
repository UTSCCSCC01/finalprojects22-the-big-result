import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import SuccessLogin from "./components/SuccessLogin/SuccessLogin";
import ProvidersPage from "./views/ProvidersPage";
import SignUp from "./views/SignUp";
import Profile from "./components/Profile/Profile";
import CustUpBookingsPage from "./views/CustUpBookingsPage"
import CustPastBookingsPage from "./views/CustPastBookingsPage"
import ProfessionalUpBookingsPage from "./views/ProfessionalUpBookingsPage";
import ProfessionalPastBookingsPage from "./views/ProfessionalPastBookingsPage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import LandingPage from "./views/LandingPage";
import ServiceList from './components/Services/ServicesList'
import CustomerBooking from './views/CustomerBooking';
import ProfessionalAvailability from './views/ProfessionalAvailability'

function App() {
  return (
    <BrowserRouter>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/successLogin" element={<SuccessLogin />} />
          <Route path="/services" element={<ServiceList />} />
          <Route path="/serviceProviders" element={<ProvidersPage />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/p/availability" element={<ProfessionalAvailability />} /> 
          <Route path="/c/booking" element={<CustomerBooking />} /> 
          <Route path="/customerUpcomingBookings" element={<CustUpBookingsPage/>} />
          <Route path="/customerPastBookings" element={<CustPastBookingsPage/>} />
          <Route path="/professionalUpcomingBookings" element={<ProfessionalUpBookingsPage/>}/>
          <Route path="/professionalPastBookings" element={<ProfessionalPastBookingsPage/>}/>
        </Routes>
        <Footer />
      </>
    </BrowserRouter>
  );
}

export default App;
