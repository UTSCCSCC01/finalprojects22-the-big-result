import React, { Component }  from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import SuccessLogin from "./components/SuccessLogin/SuccessLogin";
import ProvidersPage from "./views/ProvidersPage";
import SignUp from "./views/SignUp";
import ServiceList from "./views/ServicesList";
import Profile from "./components/Profile/Profile";
import Book from './components/Booking/Book'; // NEW
import ProfCalender from './components/Calender/ProfessionalCalendar/ProfCalender' // NEW
import CustCalender from './components/Calender/CustCalender';

function App() {
  return (
    
    
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/successLogin" element={<SuccessLogin />} />
        <Route path="/services" element={<ServiceList />} />
        <Route path="/serviceProviders" element={<ProvidersPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/booking" element={<Book />} /> // new
        <Route path="/p/calendar" element={<ProfCalender />} /> // new
        {/* <Route path="/c/calendar" element={<CustCalender />} /> // new */}
        {/* <Route path="/c/calender" element={<CustCalender />} /> // new */}
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
