import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import SuccessLogin from "./components/SuccessLogin/SuccessLogin";
import ProvidersPage from "./views/ProvidersPage";
import SignUp from "./views/SignUp";
import Profile from "./components/Profile/Profile";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import LandingPage from "./views/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/successLogin" element={<SuccessLogin />} />
          <Route path="/serviceProviders" element={<ProvidersPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
