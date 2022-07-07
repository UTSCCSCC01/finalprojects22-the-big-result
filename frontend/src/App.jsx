import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import MyProfile from "./components/MyProfile/MyProfile";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import ServiceList from "./components/Services/ServicesList";
import CustomerBooking from "./views/CustomerBooking";
import CustPastBookingsPage from "./views/CustPastBookingsPage";
import CustUpBookingsPage from "./views/CustUpBookingsPage";
import LandingPage from "./views/LandingPage";
import ProfessionalAvailability from "./views/ProfessionalAvailability";
import ProfessionalPastBookingsPage from "./views/ProfessionalPastBookingsPage";
import ProfessionalUpBookingsPage from "./views/ProfessionalUpBookingsPage";
import ProvidersPage from "./views/ProvidersPage";
import SignUp from "./views/SignUp";

function App() {
  //TODO: 

  // const authAxios = axios.create({
  //   baseURL: "http://localhost:5000",
  //   headers: {
  //     Authorization: `Bearer ${access_token}`

  //   }
  // })

  return (
    <BrowserRouter>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/services" element={<ServiceList />} />
          <Route path="/serviceProviders" element={<ProvidersPage />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/signup" element={<SignUp />} />
          {/* Protected route, should be accessible by both customers and providers*/}
          <Route element={<ProtectedRoutes />}>
            <Route path="/myProfile" element={<MyProfile />} />
          </Route>
          {/* Protected route, only accessible by customers*/}
          <Route element={<ProtectedRoutes role={"customer"} />}>
            <Route path="/c/booking" element={<CustomerBooking />} />
            <Route
              path="/c/upcomingBookings"
              element={<CustUpBookingsPage />}
            />
            <Route path="/c/pastBookings" element={<CustPastBookingsPage />} />
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
              path="/p/pastBookings"
              element={<ProfessionalPastBookingsPage />}
            />
          </Route>
        </Routes>
        <Footer />
      </>
    </BrowserRouter>
  );
}

export default App;
