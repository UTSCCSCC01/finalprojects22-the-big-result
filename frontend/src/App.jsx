import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./views/SignUp";
import ProviderPage from "./components/Provider/ProviderPage";
import ServiceList from "./views/ServicesList";
import Profile from "./components/Profile/Profile";

function App() {
  return (
    // BrowserRouter: keep your UI in sync with the URL
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/listServiceProviders" element={<ProviderPage />} />
        <Route path="/services" element={<ServiceList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/listServiceProviders" element={<ProviderPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
