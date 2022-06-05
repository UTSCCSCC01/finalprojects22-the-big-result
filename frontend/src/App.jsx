import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";

function App() {
  return (
    // BrowserRouter: keep your UI in sync with the URL
    <BrowserRouter>
      <div className="App">
        <Login />
      </div>
    </BrowserRouter>
  );
}

export default App;
