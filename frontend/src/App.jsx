import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import SuccessLogin from "./components/SuccessLogin/SuccessLogin";
import ProvidersPage from "./views/ProvidersPage";
import SignUp from "./views/SignUp";
import ServiceList from "./views/ServicesList";
import Profile from "./components/Profile/Profile";
import CustUpBookingsPage from "./views/CustUpBookingsPage"
import CustPastBookingsPage from "./views/CustPastBookingsPage"
// import BookingsPage from "./views/BookingsPage"

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
        {/* <Route path="/customerUpcomingBookings" element={<BookingsPage type="Upcoming" />} />
        <Route path="/customerPastBookings" element={<BookingsPage type="Past" />} /> */}
        <Route path="/customerUpcomingBookings" element={<CustUpBookingsPage/>} />
        <Route path="/customerPastBookings" element={<CustPastBookingsPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
