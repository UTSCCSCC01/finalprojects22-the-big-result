import React, { Component }  from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import SuccessLogin from "./components/SuccessLogin/SuccessLogin";
import ProviderPage from "./components/Provider/ProviderPage";
import SignUp from "./views/SignUp";
import ServiceList from "./views/ServicesList";
import Book from './components/Booking/Book'; // NEW
import ProfCalender from './components/Calender/ProfessionalCalendar/ProfCalender' // NEW
import CustCalender from './components/Calender/CustCalender';

function App() {
  return (
    
    
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/successlogin" element={<SuccessLogin />} />
        <Route path="/services" element={<ServiceList />} />
        <Route path="/listServiceProviders" element={<ProviderPage />} />
        <Route path="/profile" element={<ProviderPage />} />
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
