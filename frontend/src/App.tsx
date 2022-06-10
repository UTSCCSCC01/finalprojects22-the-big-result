import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ServiceList from './views/ServicesList'; 
import ProviderPage from './components/Provider/ProviderPage'

function App() {

  return (
    // BrowserRouter: keep your UI in sync with the URL
    <BrowserRouter>
    <Routes>
      {/* <div className="App"> */}
        <Route path="/services" element={<ServiceList />} />      
        <Route path="/listServiceProviders" element={<ProviderPage/>}/>
      {/* </div> */}
      </Routes>
    </BrowserRouter>

  );
}

export default App;