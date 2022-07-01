import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import SuccessLogin from "./components/SuccessLogin/SuccessLogin";
import ProvidersPage from "./views/ProvidersPage";
import SignUp from "./views/SignUp";
import ServiceList from "./views/ServicesList";
import Profile from "./components/Profile/Profile";
import ProfessionalUpBookingsPage from "./views/ProfessionalUpBookingsPage";
import ProfessionalPastBookingsPage from "./views/ProfessionalPastBookingsPage";

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
        <Route path="/professionalUpcomingBookings" element={<ProfessionalUpBookingsPage/>}/>
        <Route path="/professionalPastBookings" element={<ProfessionalPastBookingsPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
