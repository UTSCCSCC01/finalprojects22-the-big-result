import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import SignUp from "./views/SignUp";
import ProfilePage from "./views/ProfilePage";
import CustPastAndCancelledBookingsPage from "./views/CustPastAndCancelledBookingsPage"
import ProfessionalUpBookingsPage from "./views/ProfessionalUpBookingsPage";
import ProfessionalPastAndCancelledBookingsPage from "./views/ProfessionalPastAndCancelledBookingsPage";
import Navbar from "./components/Navbar/Navbar";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import ServiceList from "./components/Services/ServicesList";
import CustomerBooking from "./views/CustomerBooking";
import CustUpBookingsPage from "./views/CustUpBookingsPage";
import LandingPage from "./views/LandingPage";
import ProfessionalAvailability from "./views/ProfessionalAvailability";
import ProvidersPage from "./views/ProvidersPage";
import MyProfile from "./components/MyProfile/MyProfile";

function App() {
  return (
    <BrowserRouter>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/services" element={<ServiceList />} />
          <Route path="/serviceProviders" element={<ProvidersPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/signup" element={<SignUp />} />
          {/* Protected route, should be accessible by both customers and providers*/}
          <Route element={<ProtectedRoutes />}>
            <Route path="/myProfile" element={<MyProfile />} />
          </Route>
          {/* Protected route, only accessible by customers*/}
          
          <Route element={<ProtectedRoutes role={"customer"} />}>
            <Route path="/c/booking/:profId" element={<CustomerBooking />} />
            <Route
              path="/c/upcomingBookings"
              element={<CustUpBookingsPage />}
            />
            <Route path="/c/pastAndCancelledBookings" element={<CustPastAndCancelledBookingsPage />} />
          </Route>
          {/* Protected route, only accessible by providers*/}
          <Route element={<ProtectedRoutes role={"provider"} />}>
            <Route
              path="/p/availability"
              element={<ProfessionalAvailability />}
            />
            <Route
              path="/p/upcomingBookings"
              element={<ProfessionalUpBookingsPage />}
            />
            <Route
              path="/p/pastAndCancelledBookings"
              element={<ProfessionalPastAndCancelledBookingsPage />}
            />
          </Route>
        </Routes>
        <Footer />
      </>
    </BrowserRouter>
  );
}

export default App;
