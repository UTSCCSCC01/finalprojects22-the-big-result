import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import SuccessLogin from "./components/SuccessLogin/SuccessLogin";
import ProviderPage from "./components/Provider/ProviderPage";
import SignUp from "./views/SignUp";
import ServiceList from "./views/ServicesList";
import Profile from "./components/Profile/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/successLogin" element={<SuccessLogin />} />
        <Route path="/services" element={<ServiceList />} />
        <Route path="/serviceProviders" element={<ProviderPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
