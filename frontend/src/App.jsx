import React, { Component }  from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import SuccessLogin from "./components/SuccessLogin/SuccessLogin";
import ProvidersPage from "./views/ProvidersPage";
import SignUp from "./views/SignUp";
import Profile from "./components/Profile/Profile";
import Book from './components/Booking/Book'; // NEW
import CustomerCalendar from './components/Calender/CustomerCalendar/CustomerCalendar';
import ProfCalendarEdit from './components/Calender/ProfessionalCalendar/ProfCalendarEdit'
import ProfCalendarView from './components/Calender/ProfessionalCalendar/ProfCalendarView'
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import LandingPage from "./views/LandingPage";
import BookingConfirmation from "./views/BookingConfirmation";
import ServiceList from './components/Services/ServicesList'

function App() {
  return (
    
    
    <BrowserRouter>
      <>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/successLogin" element={<SuccessLogin />} />
          <Route path="/services" element={<ServiceList />} />
          <Route path="/serviceProviders" element={<ProvidersPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/booking" element={<Book />} /> 
          <Route path="/p/calendar/view" element={<ProfCalendarView />} /> 
          <Route path="/p/calendar/edit/recurr" element={<ProfCalendarEdit mode='RECURRING'/>} />
          <Route path="/p/calendar/edit/non-recurr" element={<ProfCalendarEdit mode='NON-RECURRING'/>} />
          <Route path="/c/calendar/view" element={<CustomerCalendar />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/confirmation" element={<BookingConfirmation />} />
        </Routes>
        <Footer />
      </>
    </BrowserRouter>
  );
}

export default App;
