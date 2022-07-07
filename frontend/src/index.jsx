import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./context/AuthProvider";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* Authprovider allows ALL components within App to have access to the current user rather than passing them separately into each component */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
