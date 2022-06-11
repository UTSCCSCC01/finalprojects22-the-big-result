import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import SuccessLogin from "./components/SuccessLogin/SuccessLogin";
import ProviderPage from "./components/Provider/ProviderPage";
import SignUp from "./views/SignUp";
import ServiceList from "./views/ServicesList";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
