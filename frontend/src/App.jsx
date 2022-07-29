import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import SignUp from "./views/SignUp";
import ProfilePage from "./views/ProfilePage";
import CustPastAndCancelledBookingsPage from "./views/CustPastAndCancelledBookingsPage";
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
import LeaveReview from "./components/LeaveReview/LeaveReview";
import ProfileSettingsPage from "./views/ProfileSettingsPage";
import AllReviews from "./views/AllReviews.jsx";
import RequestsPage from "./views/RequestsPage";
import Deactivated from "./views/Deactivated";
import Location from "./components/Location/Location";

function App() {
  return (
    <BrowserRouter>
      <>
        <Navbar />
        <Routes>
          <Route path="/location" element={<Location />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/services" element={<ServiceList />} />
          <Route path="/serviceProviders" element={<ProvidersPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/getAllReviews/:id" element={<AllReviews />} />
          <Route path="/signup" element={<SignUp />} />
          
          {/*<Route path="/profileSettings" element={<ProfileSettingsPage />} />*/}

          <Route path="/deactivated" element={<Deactivated />} />
          {/* Protected route, should be accessible by both customers and providers*/}
          <Route element={<ProtectedRoutes />}>
            <Route path="/profileSettings" element={<ProfileSettingsPage />} />
          </Route>
          {/* Protected route, should be accessible by both customers and providers*/}
          <Route element={<ProtectedRoutes />}>
            <Route path="/myProfile" element={<MyProfile />} />
          </Route>
          {/* Protected route, only accessible by customers*/}

          <Route element={<ProtectedRoutes role={"customer"} />}>
            <Route path="/requests" element={<RequestsPage />} />
            <Route path="/c/booking/:profId" element={<CustomerBooking />} />
            <Route
              path="/c/upcomingBookings"
              element={<CustUpBookingsPage />}
            />
            <Route
              path="/c/pastAndCancelledBookings"
              element={<CustPastAndCancelledBookingsPage />}
            />
            <Route path="/c/leaveReview" element={<LeaveReview />} />
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
